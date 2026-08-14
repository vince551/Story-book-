create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  bio text default '',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  description text default '',
  cover_url text,
  genre text,
  published_year int,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  body text not null,
  created_at timestamptz not null default now(),
  unique(book_id, user_id)
);

create table if not exists public.review_likes (
  review_id uuid not null references public.reviews(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(review_id, user_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.reviews(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.shelves (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  status text not null check(status in ('want_to_read','reading','finished','favorite')),
  progress int not null default 0 check(progress between 0 and 100),
  created_at timestamptz not null default now(),
  unique(user_id, book_id)
);

create table if not exists public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(follower_id, following_id),
  check(follower_id <> following_id)
);

create index if not exists reviews_book_idx on public.reviews(book_id, created_at desc);
create index if not exists reviews_user_idx on public.reviews(user_id, created_at desc);
create index if not exists shelves_user_idx on public.shelves(user_id, status);
create index if not exists comments_review_idx on public.comments(review_id, created_at);

alter table public.profiles enable row level security;
alter table public.books enable row level security;
alter table public.reviews enable row level security;
alter table public.review_likes enable row level security;
alter table public.comments enable row level security;
alter table public.shelves enable row level security;
alter table public.follows enable row level security;

create policy "profiles are public" on public.profiles for select using (true);
create policy "users create own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id);

create policy "books are public" on public.books for select using (true);
create policy "reviews are public" on public.reviews for select using (true);
create policy "users create own reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "users update own reviews" on public.reviews for update using (auth.uid() = user_id);
create policy "users delete own reviews" on public.reviews for delete using (auth.uid() = user_id);

create policy "likes are public" on public.review_likes for select using (true);
create policy "users manage own likes" on public.review_likes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "comments are public" on public.comments for select using (true);
create policy "users create own comments" on public.comments for insert with check (auth.uid() = user_id);
create policy "users manage own comments" on public.comments for update using (auth.uid() = user_id);
create policy "users delete own comments" on public.comments for delete using (auth.uid() = user_id);

create policy "users manage own shelves" on public.shelves for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own shelves are readable" on public.shelves for select using (auth.uid() = user_id);

create policy "follows are public" on public.follows for select using (true);
create policy "users manage own follows" on public.follows for all using (auth.uid() = follower_id) with check (auth.uid() = follower_id);
