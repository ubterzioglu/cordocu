insert into links (added_by, type, description, link)
select seed.added_by, seed.type, seed.description, seed.link
from (
  values
    ('UBT', 'Dosya', 'TEKNOLOJI — rag_database_v1.md', 'https://drive.google.com/open?id=1W2VkDRxPTFr0gQ1cL3dn285pthcFeA8m'),
    ('UBT', 'Dosya', 'TOPLULUK — Topluluk Liderlerine Davet-Whatsapp', 'https://drive.google.com/open?id=1leB6HKm5IjaiUQiM_rW61Mc6IELs0LbOX0PrBKOO3oI'),
    ('UBT', 'Dosya', 'GORSEL — CROUSEL 10.jpeg', 'https://drive.google.com/open?id=10cVzJKmng5Ykk3CGqj2yfZ82-AfXMBoF'),
    ('UBT', 'Dosya', 'SISTEM — BOS.docx', 'https://drive.google.com/open?id=1I74kDBPGlZzn0TwasJD609--7SkPk-Vc'),
    ('UBT', 'Dosya', 'GORSEL — CROUSEL 9.jpeg', 'https://drive.google.com/open?id=1BAd6I1eULKJhrDnWo1c8KdVLiB7YTJPI'),
    ('UBT', 'Dosya', 'GORSEL — CROUSEL 7.jpeg', 'https://drive.google.com/open?id=1SV5mpD0moWMwznuMU1EscUt5ZVAPcdsR'),
    ('UBT', 'Dosya', 'IS BIRLIGI — Formal Mail Influencer Lansman Davet Mail', 'https://drive.google.com/open?id=1po5Gf9gx3zbHkfAEIvVHDVxnmSvUk8-h6vutgzSWHmA'),
    ('UBT', 'Dosya', 'DUYURU — 02_Sosyal_Medya_Blogger_Duyuru_Paketi.docx', 'https://drive.google.com/open?id=1a6Lh8Bzpsdj8fOr2cHzQ5vy-SBIv5WrP'),
    ('UBT', 'Dosya', 'FINANS — SPARE DOMAINS.PAYMENT LIST csv', 'https://drive.google.com/open?id=1pj-Rmh39BRs_xFGdH7d_o7DEaISL31C0'),
    ('UBT', 'Dosya', 'KILAVUZ — Basit Whatsapp Guide.docx', 'https://drive.google.com/open?id=1oBvrfujpIn8Z70gT2PLoErUBibkLb7A0'),
    ('UBT', 'Dosya', 'GORSEL — CROUSEL 5.jpeg', 'https://drive.google.com/open?id=1jsoSMB6digazEac6rQtMvji3inkT5o3c'),
    ('UBT', 'Dosya', 'BROSUR — CONTR STR PART COM LEAD BROSUR (PNG)', 'https://drive.google.com/open?id=1f2rjjIDKPrDZBWuHNz-ZmZCRmzL-rwNK'),
    ('UBT', 'Dosya', 'DUYURU — 02_Sosyal_Medya_Vlogger_Duyuru_Paketi.docx', 'https://drive.google.com/open?id=1AWyaB7QSfBdLaVEDT3B0yQg4SwqIw-3p'),
    ('UBT', 'Dosya', 'OPERASYON — 06_Vlogger_Eposta_Operasyon_ve_Takip_Sablonlari.docx', 'https://drive.google.com/open?id=1t0uDSwCdm8qaM2xGjpC2kg9r0Rhe8eFR')
) as seed(added_by, type, description, link)
where not exists (
  select 1
  from links existing
  where existing.link = seed.link
);
