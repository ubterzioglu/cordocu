create table if not exists meeting_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  date text not null,
  category text not null,
  source text not null,
  sort_order integer default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint meeting_notes_source_check
    check (source in ('T1', 'T2', 'T3', 'WA'))
);

alter table meeting_notes enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'meeting_notes' and policyname = 'Allow all') then
    execute 'create policy "Allow all" on meeting_notes for all using (true) with check (true)';
  end if;
end
$$;

create index if not exists idx_meeting_notes_category on meeting_notes(category);
create index if not exists idx_meeting_notes_source on meeting_notes(source);
