alter table public.command_center_items
  add column if not exists priority integer;

update public.command_center_items
set priority = 5
where priority is null;

alter table public.command_center_items
  alter column priority set default 5;

alter table public.command_center_items
  alter column priority set not null;

alter table public.command_center_items
  drop constraint if exists command_center_items_priority_check;

alter table public.command_center_items
  add constraint command_center_items_priority_check
  check (priority between 1 and 10);

create index if not exists idx_command_center_items_priority
  on public.command_center_items(priority desc);
