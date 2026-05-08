create table if not exists public.command_center_items (
  id uuid primary key default gen_random_uuid(),
  item_type text not null check (item_type in ('todo', 'meeting_note')),
  title text not null,
  detail text not null,
  category_label text not null default '',
  assignee text not null default 'Atanmadi',
  status text not null default 'Baslanmadi',
  due_date date,
  urgent boolean not null default false,
  legacy_source_type text,
  legacy_source_code text,
  legacy_source_date_label text,
  legacy_source_category text,
  legacy_source_title text,
  sort_order integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint command_center_items_assignee_check
    check (assignee in ('Atanmadi', 'UBT', 'Burak')),
  constraint command_center_items_status_check
    check (status in ('Baslanmadi', 'Beklemede', 'Devam ediyor', 'Tamamlandi')),
  constraint command_center_items_title_length_check
    check (char_length(title) between 1 and 160),
  constraint command_center_items_detail_length_check
    check (char_length(detail) between 1 and 5000)
);

create table if not exists public.command_center_legacy_map (
  id uuid primary key default gen_random_uuid(),
  command_center_item_id uuid not null references public.command_center_items(id) on delete cascade,
  legacy_table text not null,
  legacy_row_id uuid not null,
  migration_batch text not null,
  created_at timestamp with time zone not null default now(),
  constraint command_center_legacy_map_unique unique (legacy_table, legacy_row_id)
);

create or replace function public.set_command_center_items_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_command_center_items_updated_at on public.command_center_items;

create trigger set_command_center_items_updated_at
before update on public.command_center_items
for each row
execute function public.set_command_center_items_updated_at();

alter table public.command_center_items enable row level security;
alter table public.command_center_legacy_map enable row level security;

drop policy if exists "command_center_items_select_public" on public.command_center_items;
drop policy if exists "command_center_items_all_open" on public.command_center_items;
create policy "command_center_items_select_public"
  on public.command_center_items
  for select
  to anon, authenticated
  using (true);
create policy "command_center_items_all_open"
  on public.command_center_items
  for all
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "command_center_legacy_map_select_public" on public.command_center_legacy_map;
drop policy if exists "command_center_legacy_map_all_authenticated" on public.command_center_legacy_map;
create policy "command_center_legacy_map_select_public"
  on public.command_center_legacy_map
  for select
  to anon, authenticated
  using (true);
create policy "command_center_legacy_map_all_authenticated"
  on public.command_center_legacy_map
  for all
  to anon, authenticated
  using (true)
  with check (true);

create index if not exists idx_command_center_items_type on public.command_center_items(item_type);
create index if not exists idx_command_center_items_category on public.command_center_items(category_label);
create index if not exists idx_command_center_items_assignee on public.command_center_items(assignee);
create index if not exists idx_command_center_items_status on public.command_center_items(status);
create index if not exists idx_command_center_items_legacy_source_code on public.command_center_items(legacy_source_code);
create index if not exists idx_command_center_items_created_at on public.command_center_items(created_at desc);

with source_todos as (
  select
    t.*,
    left(coalesce(nullif(trim(t.ayrinti), ''), nullif(trim(t.konu), ''), 'Todo item'), 160) as normalized_title,
    coalesce(nullif(trim(t.ayrinti), ''), nullif(trim(t.konu), ''), 'Todo item') as normalized_detail,
    coalesce(nullif(trim(t.konu), ''), 'Genel') as normalized_category,
    row_number() over (
      partition by
        left(coalesce(nullif(trim(t.ayrinti), ''), nullif(trim(t.konu), ''), 'Todo item'), 160),
        coalesce(nullif(trim(t.ayrinti), ''), nullif(trim(t.konu), ''), 'Todo item'),
        coalesce(nullif(trim(t.konu), ''), 'Genel'),
        t.kim,
        t.durum,
        coalesce(t.acil, false),
        coalesce(t.created_at, now())
      order by t.id
    ) as match_rank
  from public.todo_items t
  where not exists (
    select 1
    from public.command_center_legacy_map m
    where m.legacy_table = 'todo_items'
      and m.legacy_row_id = t.id
  )
), inserted_todos as (
  insert into public.command_center_items (
    item_type,
    title,
    detail,
    category_label,
    assignee,
    status,
    due_date,
    urgent,
    legacy_source_type,
    legacy_source_title,
    created_at,
    updated_at
  )
  select
    'todo',
    st.normalized_title,
    st.normalized_detail,
    st.normalized_category,
    st.kim,
    st.durum,
    st.ne_zaman,
    coalesce(st.acil, false),
    'todo_items',
    null,
    coalesce(st.created_at, now()),
    coalesce(st.updated_at, coalesce(st.created_at, now()))
  from source_todos st
  returning
    id,
    legacy_source_type,
    title,
    detail,
    category_label,
    assignee,
    status,
    urgent,
    created_at
), inserted_todos_ranked as (
  select
    it.*,
    row_number() over (
      partition by
        it.title,
        it.detail,
        it.category_label,
        it.assignee,
        it.status,
        it.urgent,
        it.created_at
      order by it.id
    ) as match_rank
  from inserted_todos it
), todo_pairs as (
  select
    it.id as command_center_item_id,
    st.id as legacy_row_id,
    it.match_rank
  from inserted_todos_ranked it
  join source_todos st
    on it.legacy_source_type = 'todo_items'
   and it.title = st.normalized_title
   and it.detail = st.normalized_detail
   and it.category_label = st.normalized_category
   and it.assignee = st.kim
   and it.status = st.durum
   and it.urgent = coalesce(st.acil, false)
   and it.created_at = coalesce(st.created_at, it.created_at)
   and it.match_rank = st.match_rank
)
insert into public.command_center_legacy_map (
  command_center_item_id,
  legacy_table,
  legacy_row_id,
  migration_batch
)
select
  command_center_item_id,
  'todo_items',
  legacy_row_id,
  '20260508120000_create_command_center_items'
from todo_pairs
on conflict (legacy_table, legacy_row_id) do nothing;

with source_notes as (
  select
    mn.*,
    left(coalesce(nullif(trim(mn.title), ''), trim(mn.content), 'Meeting note'), 160) as normalized_title,
    coalesce(nullif(trim(mn.content), ''), 'Meeting note') as normalized_detail,
    coalesce(nullif(trim(mn.date), ''), 'Tarihsiz') as normalized_category,
    row_number() over (
      partition by
        left(coalesce(nullif(trim(mn.title), ''), trim(mn.content), 'Meeting note'), 160),
        coalesce(nullif(trim(mn.content), ''), 'Meeting note'),
        coalesce(nullif(trim(mn.date), ''), 'Tarihsiz'),
        mn.source,
        mn.category,
        coalesce(mn.sort_order, 0),
        coalesce(mn.created_at, now())
      order by mn.id
    ) as match_rank
  from public.meeting_notes mn
  where not exists (
    select 1
    from public.command_center_legacy_map m
    where m.legacy_table = 'meeting_notes'
      and m.legacy_row_id = mn.id
  )
), inserted_notes as (
  insert into public.command_center_items (
    item_type,
    title,
    detail,
    category_label,
    assignee,
    status,
    due_date,
    urgent,
    legacy_source_type,
    legacy_source_code,
    legacy_source_date_label,
    legacy_source_category,
    legacy_source_title,
    sort_order,
    created_at,
    updated_at
  )
  select
    'meeting_note',
    sn.normalized_title,
    sn.normalized_detail,
    sn.normalized_category,
    'UBT',
    'Beklemede',
    null,
    false,
    'meeting_notes',
    sn.source,
    sn.date,
    sn.category,
    sn.title,
    coalesce(sn.sort_order, 0),
    coalesce(sn.created_at, now()),
    coalesce(sn.updated_at, coalesce(sn.created_at, now()))
  from source_notes sn
  returning
    id,
    legacy_source_type,
    title,
    detail,
    category_label,
    legacy_source_code,
    legacy_source_category,
    sort_order,
    created_at
), inserted_notes_ranked as (
  select
    inote.*,
    row_number() over (
      partition by
        inote.title,
        inote.detail,
        inote.category_label,
        inote.legacy_source_code,
        inote.legacy_source_category,
        inote.sort_order,
        inote.created_at
      order by inote.id
    ) as match_rank
  from inserted_notes inote
), note_pairs as (
  select
    it.id as command_center_item_id,
    sn.id as legacy_row_id,
    it.match_rank
  from inserted_notes_ranked it
  join source_notes sn
    on it.legacy_source_type = 'meeting_notes'
   and it.title = sn.normalized_title
   and it.detail = sn.normalized_detail
   and it.category_label = sn.normalized_category
   and it.legacy_source_code = sn.source
   and it.legacy_source_category = sn.category
   and it.sort_order = coalesce(sn.sort_order, 0)
   and it.created_at = coalesce(sn.created_at, it.created_at)
   and it.match_rank = sn.match_rank
)
insert into public.command_center_legacy_map (
  command_center_item_id,
  legacy_table,
  legacy_row_id,
  migration_batch
)
select
  command_center_item_id,
  'meeting_notes',
  legacy_row_id,
  '20260508120000_create_command_center_items'
from note_pairs
on conflict (legacy_table, legacy_row_id) do nothing;
