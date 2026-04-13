create table if not exists user_cvs (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  role text,
  file_path text not null,
  file_name text not null,
  created_at timestamp with time zone not null default now()
);

alter table user_cvs enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'user_cvs' and policyname = 'Allow all'
  ) then
    execute 'create policy "Allow all" on user_cvs for all using (true) with check (true)';
  end if;
end
$$;
