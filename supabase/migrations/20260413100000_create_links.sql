create table if not exists links (
  id uuid primary key default gen_random_uuid(),
  added_by text not null default 'UBT',
  description text,
  link text,
  created_at timestamp with time zone not null default now(),
  constraint links_added_by_check
    check (added_by in ('Şahin', 'UBT', 'Baran'))
);

alter table links enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'links' and policyname = 'Allow all'
  ) then
    execute 'create policy "Allow all" on links for all using (true) with check (true)';
  end if;
end
$$;
