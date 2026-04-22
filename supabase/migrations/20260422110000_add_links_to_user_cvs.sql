alter table public.user_cvs
add column if not exists linkedin_url text,
add column if not exists instagram_url text,
add column if not exists website_url text;
