insert into links (added_by, type, description, link)
select seed.added_by, seed.type, seed.description, seed.link
from (
  values
    ('UBT', 'Dosya', 'YARIŞMA — 00_Klasor_Indeksi (Blogger)', 'https://drive.google.com/open?id=1hRpyi1Y3lsAXhMT_QctHfY7APeM0rzie'),
    ('UBT', 'Dosya', 'YARIŞMA — 00_Klasor_Indeksi (Vlogger)', 'https://drive.google.com/open?id=1Bn6919LFOsubvxjkg2af8BNsdbUe2K1d'),
    ('UBT', 'Dosya', 'YARIŞMA — 01_Web_Sitesi_Blogger_Yarisma_Sayfasi.docx', 'https://drive.google.com/open?id=1TXlDp7mHpbmUO0j3XbEYwqBkP7EDq_eO'),
    ('UBT', 'Dosya', 'YARIŞMA — 03_Vlogger_Katilim_Sartlari_ve_Onay_Metinleri.docx', 'https://drive.google.com/open?id=1WCwHtjxAXs5w706XT_p9FJly0M2bzQRd'),
    ('UBT', 'Dosya', 'YARIŞMA — 04_Blogger_Kayit_Formu_Akisi_ve_Soru_Seti_REV.docx', 'https://drive.google.com/open?id=1N06bOzPUHcr8D2bebCTekd6m_BoJiFh0'),
    ('UBT', 'Dosya', 'YARIŞMA — 04_Vlogger_Kayit_Formu_Akisi_ve_Soru_Seti.docx', 'https://drive.google.com/open?id=1fSks-pjPgbYuIsrP5l5goe8R8n7Ll5Z5'),
    ('UBT', 'Dosya', 'YARIŞMA — 06_Blogger_Eposta_Operasyon_ve_Takip_Sablonlari.docx', 'https://drive.google.com/open?id=1rYE6au0bVyiiKsXHTRnpIpLhZ_y7BCy6'),
    ('UBT', 'Dosya', 'TEKNOLOJI — CorteQS GPT Özet Döküman BURAK', 'https://drive.google.com/open?id=1R7tFHNG7ABH2XAmZ5V4IKN_qyIcKY9h2sRa_MRN4m1k'),
    ('UBT', 'Dosya', 'STRATEJI — CorteQS Founding 1000 Kampanya Metinleri', 'https://drive.google.com/open?id=1Zp43GTPyXydpT6GwFbDiN_UYjZSUaffJdu96JspkbtA'),
    ('UBT', 'Dosya', 'STRATEJI — Turkish Diaspora Platforms Ecosystem.pdf', 'https://drive.google.com/open?id=1TFQzPC3x9vImNJ6HWQVbaf9PHMRpXho4')
) as seed(added_by, type, description, link)
where not exists (
  select 1
  from links existing
  where existing.description = seed.description
    and existing.link = seed.link
);
