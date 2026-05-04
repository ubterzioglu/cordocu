drop policy if exists "todo_items_all_authenticated" on public.todo_items;
drop policy if exists "todo_items_all_open" on public.todo_items;

create policy "todo_items_all_open"
  on public.todo_items
  for all
  to anon, authenticated
  using (true)
  with check (true);
