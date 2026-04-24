alter table public.meeting_notes drop constraint if exists meeting_notes_source_check;

alter table public.meeting_notes add constraint meeting_notes_source_check
  check (source in ('T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'WA', 'NO', 'MAN'));
