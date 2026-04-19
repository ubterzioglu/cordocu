alter table links
add column if not exists type text;

update links
set type = 'Dosya'
where type is null;

alter table links
alter column type set default 'Dosya';

alter table links
alter column type set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'links_type_check'
  ) then
    alter table links
    add constraint links_type_check
    check (type in ('Dosya', 'Link'));
  end if;
end
$$;
