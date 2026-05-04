alter table public.todo_items
  add column if not exists acil boolean not null default false;
