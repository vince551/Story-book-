-- StoryBook database v2
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  bio text default '',
  avatar_url text,
  role text not null default 'reader' check (role in ('reader','moderator','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  genre text not null,
  description text default '',
  cover_url text,
  rating numeric(2,1) not null default 0 check (rating >= 0 and rating <= 5),
  review_count integer not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  body text not null check (char_length(body) between 20 and 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.review_likes (
  review_id uuid not null references public.reviews(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (review_id,user_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.reviews(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id,following_id),
  check (follower_id <> following_id)
);

create table if not exists public.shelves (
  user_id uuid not null references public.profiles(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  shelf text not null check (shelf in ('want_to_read','reading','finished','favorite')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id,book_id)
);

create table if not exists public.reading_challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  target integer not null check (target > 0),
  starts_at date not null default current_date,
  ends_at date,
  badge text,
  created_at timestamptz not null default now()
);

create table if not exists public.challenge_progress (
  challenge_id uuid not null references public.reading_challenges(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  progress integer not null default 0 check (progress >= 0),
  completed_at timestamptz,
  primary key (challenge_id,user_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  type text not null,
  entity_id uuid,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  entity_type text not null check (entity_type in ('review','comment','profile','book')),
  entity_id uuid not null,
  reason text not null,
  status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
  created_at timestamptz not null default now()
);

create index if not exists books_genre_idx on public.books(genre);
create index if not exists books_title_idx on public.books using gin(to_tsvector('english', title || ' ' || author || ' ' || coalesce(description,'')));
create index if not exists reviews_book_idx on public.reviews(book_id,created_at desc);
create index if not exists reviews_user_idx on public.reviews(user_id,created_at desc);
create index if not exists comments_review_idx on public.comments(review_id,created_at);
create index if not exists notifications_user_idx on public.notifications(user_id,created_at desc);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end; $$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists books_updated_at on public.books;
create trigger books_updated_at before update on public.books for each row execute function public.set_updated_at();
drop trigger if exists reviews_updated_at on public.reviews;
create trigger reviews_updated_at before update on public.reviews for each row execute function public.set_updated_at();
drop trigger if exists comments_updated_at on public.comments;
create trigger comments_updated_at before update on public.comments for each row execute function public.set_updated_at();
drop trigger if exists shelves_updated_at on public.shelves;
create trigger shelves_updated_at before update on public.shelves for each row execute function public.set_updated_at();

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id,display_name,username) values (new.id,coalesce(new.raw_user_meta_data->>'display_name','Reader'),nullif(lower(regexp_replace(coalesce(new.raw_user_meta_data->>'username',''), '[^a-zA-Z0-9_]', '', 'g')),'')) on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.refresh_book_stats() returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.books b set review_count=(select count(*) from public.reviews r where r.book_id=b.id), rating=coalesce((select round(avg(r.rating)::numeric,1) from public.reviews r where r.book_id=b.id),0) where b.id=coalesce(new.book_id,old.book_id);
  return coalesce(new,old);
end; $$;

drop trigger if exists refresh_book_stats on public.reviews;
create trigger refresh_book_stats after insert or update or delete on public.reviews for each row execute function public.refresh_book_stats();

alter table public.profiles enable row level security;
alter table public.books enable row level security;
alter table public.reviews enable row level security;
alter table public.review_likes enable row level security;
alter table public.comments enable row level security;
alter table public.follows enable row level security;
alter table public.shelves enable row level security;
alter table public.reading_challenges enable row level security;
alter table public.challenge_progress enable row level security;
alter table public.notifications enable row level security;
alter table public.reports enable row level security;

-- Public discovery data.
create policy "profiles are public" on public.profiles for select using (true);
create policy "books are public" on public.books for select using (true);
create policy "reviews are public" on public.reviews for select using (true);
create policy "review likes are public" on public.review_likes for select using (true);
create policy "comments are public" on public.comments for select using (true);
create policy "follows are public" on public.follows for select using (true);
create policy "challenges are public" on public.reading_challenges for select using (true);

-- Authenticated users can create and manage their own content.
create policy "users create own profile" on public.profiles for insert to authenticated with check (id=auth.uid());
create policy "users update own profile" on public.profiles for update to authenticated using (id=auth.uid()) with check (id=auth.uid());
create policy "users create books" on public.books for insert to authenticated with check (created_by=auth.uid());
create policy "users update own books" on public.books for update to authenticated using (created_by=auth.uid()) with check (created_by=auth.uid());
create policy "users delete own books" on public.books for delete to authenticated using (created_by=auth.uid());
create policy "users create reviews" on public.reviews for insert to authenticated with check (user_id=auth.uid());
create policy "users update own reviews" on public.reviews for update to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "users delete own reviews" on public.reviews for delete to authenticated using (user_id=auth.uid());
create policy "users manage likes" on public.review_likes for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "users create comments" on public.comments for insert to authenticated with check (user_id=auth.uid());
create policy "users update own comments" on public.comments for update to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "users delete own comments" on public.comments for delete to authenticated using (user_id=auth.uid());
create policy "users manage follows" on public.follows for all to authenticated using (follower_id=auth.uid()) with check (follower_id=auth.uid());
create policy "users manage shelves" on public.shelves for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "users view own progress" on public.challenge_progress for select to authenticated using (user_id=auth.uid());
create policy "users manage own progress" on public.challenge_progress for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "users view own notifications" on public.notifications for select to authenticated using (user_id=auth.uid());
create policy "users update own notifications" on public.notifications for update to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "users create reports" on public.reports for insert to authenticated with check (reporter_id=auth.uid());
create policy "users view own reports" on public.reports for select to authenticated using (reporter_id=auth.uid());

-- Seed books (safe to run repeatedly).
insert into public.books(title,author,genre,description,rating,review_count) values
('Atomic Habits','James Clear','Self-growth','Tiny changes, remarkable results. A practical guide to building better habits.',4.8,1824),
('The Alchemist','Paulo Coelho','Fiction','A timeless story about following a dream, listening to your heart and finding meaning.',4.7,1420),
('Deep Work','Cal Newport','Productivity','Rules for focused success in a distracted world.',4.6,987),
('Things Fall Apart','Chinua Achebe','African literature','A landmark novel about culture, identity, change and the cost of pride.',4.9,2210),
('The Design of Everyday Things','Don Norman','Design','A classic exploration of human-centered design and why everyday products work—or fail.',4.7,763),
('The Psychology of Money','Morgan Housel','Business','Timeless lessons on wealth, greed, risk and behavior.',4.8,1106),
('Start With Why','Simon Sinek','Business','Discover the purpose that inspires people and creates lasting momentum.',4.5,641),
('The Power of Now','Eckhart Tolle','Mindfulness','A guide to presence, awareness and stepping outside the noise of the mind.',4.4,901)
on conflict do nothing;

insert into public.reading_challenges(title,description,target,badge) values
('10 books in 2026','Build a consistent reading habit.',10,'Bookworm'),
('Read Africa','Read five books by African authors.',5,'AfroReader'),
('Deep reader','Complete twenty focused reading sessions.',20,'Deep Reader')
on conflict do nothing;
