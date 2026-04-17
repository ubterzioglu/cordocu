alter table public.user_cvs enable row level security;

drop policy if exists "Allow all" on public.user_cvs;
drop policy if exists "user_cvs_select_public" on public.user_cvs;
drop policy if exists "user_cvs_insert_public" on public.user_cvs;
drop policy if exists "user_cvs_update_public" on public.user_cvs;
drop policy if exists "user_cvs_delete_public" on public.user_cvs;

create policy "user_cvs_select_public"
on public.user_cvs
for select
to anon, authenticated
using (true);

create policy "user_cvs_insert_public"
on public.user_cvs
for insert
to anon, authenticated
with check (true);

create policy "user_cvs_update_public"
on public.user_cvs
for update
to anon, authenticated
using (true)
with check (true);

create policy "user_cvs_delete_public"
on public.user_cvs
for delete
to anon, authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('cv-files', 'cv-files', false)
on conflict (id) do nothing;

drop policy if exists "cv_files_select_public" on storage.objects;
drop policy if exists "cv_files_insert_public" on storage.objects;
drop policy if exists "cv_files_update_public" on storage.objects;
drop policy if exists "cv_files_delete_public" on storage.objects;

create policy "cv_files_select_public"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'cv-files');

create policy "cv_files_insert_public"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'cv-files');

create policy "cv_files_update_public"
on storage.objects
for update
to anon, authenticated
using (bucket_id = 'cv-files')
with check (bucket_id = 'cv-files');

create policy "cv_files_delete_public"
on storage.objects
for delete
to anon, authenticated
using (bucket_id = 'cv-files');
