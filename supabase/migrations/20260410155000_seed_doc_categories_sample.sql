insert into public.doc_categories (
  slug,
  label,
  short_description,
  icon_key,
  default_expanded,
  sort_order
)
values (
  'sample-docs',
  'Sample Docs',
  'Initial sample category created from Codex to verify the first Supabase table setup.',
  'book',
  true,
  1
)
on conflict (slug) do update
set
  label = excluded.label,
  short_description = excluded.short_description,
  icon_key = excluded.icon_key,
  default_expanded = excluded.default_expanded,
  sort_order = excluded.sort_order,
  updated_at = timezone('utc', now());
