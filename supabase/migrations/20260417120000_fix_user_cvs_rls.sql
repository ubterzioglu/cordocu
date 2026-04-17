do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'user_cvs' and policyname = 'Allow all'
  ) then
    execute 'create policy "Allow all" on user_cvs for all using (true) with check (true)';
  end if;
end
$$;
