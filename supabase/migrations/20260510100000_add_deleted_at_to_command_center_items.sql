alter table public.command_center_items
  add column if not exists deleted_at timestamp with time zone;

create index if not exists idx_command_center_items_deleted_at
  on public.command_center_items(deleted_at);
