-- Run after supabase/schema.sql.
alter table public.books alter column created_by set default auth.uid();
create unique index if not exists books_title_author_unique on public.books(lower(title),lower(author));
create unique index if not exists challenges_title_unique on public.reading_challenges(lower(title));
