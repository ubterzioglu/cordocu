with ranked_notes as (
  select
    id,
    row_number() over (
      partition by lower(trim(content)), lower(trim(date))
      order by sort_order asc, created_at asc, id asc
    ) as duplicate_rank
  from public.meeting_notes
)
delete from public.meeting_notes
where id in (
  select id
  from ranked_notes
  where duplicate_rank > 1
);

create unique index if not exists idx_meeting_notes_content_date_unique
on public.meeting_notes (lower(trim(content)), lower(trim(date)));
