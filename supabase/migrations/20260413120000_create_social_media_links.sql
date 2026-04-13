create table if not exists social_media_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null default 'Diğer',
  description text,
  link text,
  added_by text not null default 'UBT',
  created_at timestamp with time zone not null default now(),
  constraint social_media_links_platform_check
    check (platform in ('Instagram', 'LinkedIn', 'Twitter (X)', 'YouTube', 'TikTok', 'Facebook', 'Reddit', 'Discord', 'Diğer')),
  constraint social_media_links_added_by_check
    check (added_by in ('UBT', 'Burak', 'Diğer'))
);

alter table social_media_links enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'social_media_links' and policyname = 'Allow all'
  ) then
    execute 'create policy "Allow all" on social_media_links for all using (true) with check (true)';
  end if;
end
$$;
