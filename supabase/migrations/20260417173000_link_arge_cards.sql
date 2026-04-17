alter table public.arge_links
add column if not exists card_id uuid references public.arge_cards (id) on delete set null;

alter table public.arge_files
add column if not exists card_id uuid references public.arge_cards (id) on delete set null;

create index if not exists arge_links_card_id_idx on public.arge_links (card_id);
create index if not exists arge_files_card_id_idx on public.arge_files (card_id);
