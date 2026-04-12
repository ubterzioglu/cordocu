create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  contact text not null,
  telefon text,
  websitesi text,
  tur text,
  sorumlu text,
  durum text,
  durum_dm text,
  durum_customer text,
  yorumlar text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create or replace function public.set_contacts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_contacts_updated_at on contacts;

create trigger set_contacts_updated_at
before update on contacts
for each row
execute function public.set_contacts_updated_at();

alter table contacts enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where tablename = 'contacts'
    and policyname = 'Allow all'
  ) then
    execute 'create policy "Allow all" on contacts for all using (true) with check (true)';
  end if;
end $$;
