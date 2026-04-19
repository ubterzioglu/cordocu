insert into links (added_by, description, link)
select seed.added_by, seed.description, seed.link
from (
  values
    ('UBT', 'ARGE — Değerleme Araştırması', 'https://drive.google.com/open?id=10x18k0L6XZnbQuUNLs8fB-8XcsatHclYuFuRohBHc6w'),
    ('UBT', 'ARGE — Toplantı Kayıtları', 'https://drive.google.com/open?id=1wFxcqmaTznXN-r-CYufzMpDgSIqxV272rPrzoYOkWII'),
    ('UBT', 'HR — EKİP/ÜCRET/HİSSE', 'https://drive.google.com/open?id=1iBU6P27-fEgvxOU0-lr84zM7Y7PXqn2A6yoPRGp_KTk'),
    ('UBT', 'HR — CorteQS_ESOP_Rehberi (1).pdf', 'https://drive.google.com/open?id=1DBEFIappHMENvesOanOYRbJEYxtKKPDL'),
    ('UBT', 'HR — Ornek ESOP', 'https://drive.google.com/open?id=1GJAHZ9w0CSqQwwCh2Wd4KZawIxxMlJpKiV7AEEWGnRg'),
    ('UBT', 'HR — Cihan Akinci CV - Eng2.pdf', 'https://drive.google.com/open?id=1uDJyE11XxMns71t5X46u9FPnkqgmewDh'),
    ('UBT', 'HR — Cihan Akinci Head of Growth & Content', 'https://drive.google.com/open?id=1pDeia2jSr5qbRVeO0PRzkNNG-PmiMyqy-I1-_hKOsOM'),
    ('UBT', 'HR — CMO Seren Uzluer teklif', 'https://drive.google.com/open?id=1XeVCUWounKq6MyeHHBSAsf8aaKyGcUIa9-79edB2oi4'),
    ('UBT', 'MARKETING — Dijital Pazarlama', 'https://drive.google.com/open?id=1nfXH7OP3nSqD-L12bGZmgYKV7KVHApx8C8ZXhb1L81U'),
    ('UBT', 'MARKETING — Turk Influencerlar Icin Sehir Elcileri Arayisi', 'https://drive.google.com/open?id=1tCHkjvrj6uGbuK2rEmEMg_mwhzN6TcLebvkq9walpxs'),
    ('UBT', 'MARKETING — Ambassador/Partner/Manager ve User Retention Fikirleri', 'https://drive.google.com/open?id=16MPy_H6IRAbqUscRVuoJXXGodCMXM7Ua-0E8yB66bns'),
    ('UBT', 'MARKETING — Corteqs Ambassador.docx', 'https://drive.google.com/open?id=13sJqSbpow5r3zWym8FMzw-vVFc8bud-P'),
    ('UBT', 'PROJE YONETIMI — CORTEQS Proje Takibi', 'https://drive.google.com/open?id=1G5s79JZgNaETxLzeadiy0_MxoNaJGWn9GVr1_QxMtmU'),
    ('UBT', 'PROJE YONETIMI — To do list', 'https://drive.google.com/open?id=1NIP81rXWKSq6Afoq3LYQ8eFSJZ9rKykHxbgi4Bg34P0'),
    ('UBT', 'PROJE YONETIMI — CorteQS_CapTable_v2.docx', 'https://drive.google.com/open?id=1OYYQwOhPbhaEmorJn7frNsmM8prpavPF'),
    ('UBT', 'PROJE YONETIMI — CorteQS TR Cap Table V1.docx', 'https://drive.google.com/open?id=1Vor3kGT5uRqHzap6sbf9QUgsoJUQ3FWA'),
    ('UBT', 'TEKNOLOJI — dokumentasyon_v1_ubt.md', 'https://drive.google.com/open?id=1b9lqGIBcV4-g7QrYDP-R3JZhTyXlOZ4N'),
    ('UBT', 'TEKNOLOJI — CORTEQS MVP DOC.docx', 'https://drive.google.com/open?id=1zOeZCRetchpm3S0b_eyZCabGvQsWRVBT'),
    ('UBT', 'TEKNOLOJI — TOOLS', 'https://drive.google.com/open?id=1n91iq02qePZm14GylzQFnjSaF2lKQ0r_hgeHIPtOdyM'),
    ('UBT', 'TEKNOLOJI — whatsapp Bot.docx', 'https://drive.google.com/open?id=1KrJ5y-PFcDVaBE39irVse8fiyXnKwenE')
) as seed(added_by, description, link)
where not exists (
  select 1
  from links existing
  where existing.description = seed.description
    and existing.link = seed.link
);
