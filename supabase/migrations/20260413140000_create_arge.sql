create table if not exists arge_links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  url text not null,
  created_by text not null default 'UBT',
  created_at timestamp with time zone not null default now(),
  constraint arge_links_created_by_check
    check (created_by in ('UBT', 'Burak', 'Diğer'))
);

create table if not exists arge_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  content text,
  created_by text not null default 'UBT',
  created_at timestamp with time zone not null default now(),
  constraint arge_cards_created_by_check
    check (created_by in ('UBT', 'Burak', 'Diğer'))
);

create table if not exists arge_files (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_path text not null,
  file_name text not null,
  created_by text not null default 'UBT',
  created_at timestamp with time zone not null default now(),
  constraint arge_files_created_by_check
    check (created_by in ('UBT', 'Burak', 'Diğer'))
);

alter table arge_links enable row level security;
alter table arge_cards enable row level security;
alter table arge_files enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'arge_links' and policyname = 'Allow all') then
    execute 'create policy "Allow all" on arge_links for all using (true) with check (true)';
  end if;
  if not exists (select 1 from pg_policies where tablename = 'arge_cards' and policyname = 'Allow all') then
    execute 'create policy "Allow all" on arge_cards for all using (true) with check (true)';
  end if;
  if not exists (select 1 from pg_policies where tablename = 'arge_files' and policyname = 'Allow all') then
    execute 'create policy "Allow all" on arge_files for all using (true) with check (true)';
  end if;
end
$$;
