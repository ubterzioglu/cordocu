create table if not exists public.resource_entries (
  id uuid primary key default gen_random_uuid(),
  department text not null,
  record_kind text not null,
  added_by text not null default 'UBT',
  title text not null,
  description text,
  url text,
  storage_bucket text,
  storage_path text,
  file_name text,
  person_first_name text,
  person_last_name text,
  person_role text,
  linkedin_url text,
  instagram_url text,
  website_url text,
  created_at timestamp with time zone not null default now(),
  constraint resource_entries_department_check
    check (department in ('Genel', 'İnsan Kaynakları', 'ARGE')),
  constraint resource_entries_record_kind_check
    check (record_kind in ('Link', 'Dosya', 'CV')),
  constraint resource_entries_added_by_check
    check (added_by in ('Şahin', 'UBT', 'Baran', 'Burak', 'Diğer')),
  constraint resource_entries_url_check
    check (url is null or url ~ '^https?://[^[:space:]]+$'),
  constraint resource_entries_linkedin_url_check
    check (linkedin_url is null or linkedin_url ~ '^https?://[^[:space:]]+$'),
  constraint resource_entries_instagram_url_check
    check (instagram_url is null or instagram_url ~ '^https?://[^[:space:]]+$'),
  constraint resource_entries_website_url_check
    check (website_url is null or website_url ~ '^https?://[^[:space:]]+$'),
  constraint resource_entries_storage_consistency_check
    check (
      (storage_bucket is null and storage_path is null and file_name is null)
      or
      (storage_bucket is not null and storage_path is not null and file_name is not null)
    )
);

alter table public.resource_entries enable row level security;

drop policy if exists "Allow all" on public.resource_entries;
drop policy if exists "resource_entries_select_public" on public.resource_entries;
drop policy if exists "resource_entries_all_authenticated" on public.resource_entries;

create policy "resource_entries_select_public"
on public.resource_entries
for select
to anon, authenticated
using (true);

create policy "resource_entries_all_authenticated"
on public.resource_entries
for all
to authenticated
using (true)
with check (true);

insert into public.resource_entries (
  id,
  department,
  record_kind,
  added_by,
  title,
  description,
  url,
  created_at
)
select
  links.id,
  'Genel',
  links.type,
  links.added_by,
  coalesce(nullif(trim(links.description), ''), 'Genel Kaynak'),
  null,
  links.link,
  links.created_at
from public.links
on conflict (id) do nothing;

insert into public.resource_entries (
  id,
  department,
  record_kind,
  added_by,
  title,
  description,
  storage_bucket,
  storage_path,
  file_name,
  person_first_name,
  person_last_name,
  person_role,
  linkedin_url,
  instagram_url,
  website_url,
  created_at
)
select
  user_cvs.id,
  'İnsan Kaynakları',
  'CV',
  'UBT',
  trim(concat(user_cvs.first_name, ' ', user_cvs.last_name)),
  null,
  'cv-files',
  user_cvs.file_path,
  user_cvs.file_name,
  user_cvs.first_name,
  user_cvs.last_name,
  user_cvs.role,
  user_cvs.linkedin_url,
  user_cvs.instagram_url,
  user_cvs.website_url,
  user_cvs.created_at
from public.user_cvs
on conflict (id) do nothing;

insert into public.resource_entries (
  id,
  department,
  record_kind,
  added_by,
  title,
  description,
  url,
  created_at
)
select
  arge_links.id,
  'ARGE',
  'Link',
  arge_links.created_by,
  arge_links.title,
  arge_links.description,
  arge_links.url,
  arge_links.created_at
from public.arge_links
on conflict (id) do nothing;

insert into public.resource_entries (
  id,
  department,
  record_kind,
  added_by,
  title,
  description,
  storage_bucket,
  storage_path,
  file_name,
  created_at
)
select
  arge_files.id,
  'ARGE',
  'Dosya',
  arge_files.created_by,
  arge_files.title,
  arge_files.description,
  'arge-files',
  arge_files.file_path,
  arge_files.file_name,
  arge_files.created_at
from public.arge_files
on conflict (id) do nothing;
