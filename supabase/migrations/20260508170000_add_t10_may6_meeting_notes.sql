alter table public.meeting_notes drop constraint if exists meeting_notes_source_check;

alter table public.meeting_notes add constraint meeting_notes_source_check
  check (source in ('T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'WA', 'NO', 'MAN'));

insert into public.meeting_notes (title, content, date, category, source, sort_order) values
('90 günlük büyüme planı', 'Cihan, Cortex için 90 gün içinde 5.000 kullanıcıya ulaşmayı hedefleyen 10.000 € bütçeli büyüme planını sundu.', '6 Mayıs', 'mvp-hedefleri', 'T10', 700),
('Almanya öncelikli başlangıç', 'Kritik kullanıcı yoğunluğu oluşturmak için ilk odak Berlin, Hamburg ve Münih olmak üzere Almanya pazarı olarak belirlendi.', '6 Mayıs', 'mvp-hedefleri', 'T10', 701),
('Web sitesi ön koşulu', 'Pazarlama planının başlaması, web sitesinin stabil ve tam çalışır hale gelmesine bağlandı; mevcut durumda yapılandırılmış büyüme için erken olduğu vurgulandı.', '6 Mayıs', 'veritabani-tasarimi', 'T10', 702),
('Akıllı landing page evrimi', 'Mevcut Smart Landing Page, tam lansmana kadar kullanıcıyı tutacak bir platform önizlemesine dönüştürülecek.', '6 Mayıs', 'mvp-hedefleri', 'T10', 703),
('Tam lansman hedefi', 'Tam işlevli platform lansman tarihi 30 Ağustos olarak hedeflendi.', '6 Mayıs', 'mvp-hedefleri', 'T10', 704),
('Önce kullanıcı traksiyonu', 'İşletme ve yatırımcı ilgisini çekebilmek için öncelik bireysel kullanıcı kazanımı ve görünür kullanıcı traksiyonu olarak netleştirildi.', '6 Mayıs', 'topluluk-yonetimi', 'T10', 705),
('Marka kimliği yenileme', '20-35 yaş arası global Türk kitleye hitap etmek için markanın görsel dili modernize edilecek ve güven inşa eden bir ton manifestosu hazırlanacak.', '6 Mayıs', 'reklam-modeli', 'T10', 706),
('Canva ve içerik sistemi', 'Tutarlı sosyal medya üretimi için master Canva şablonları hazırlanacak ve içerik takvimi 30 gün önceden planlanacak.', '6 Mayıs', 'reklam-modeli', 'T10', 707),
('İçerik ritmi', 'Aylık 12-15 post ile düzenli içerik üretimi, marka güveni ve tekrar eden görünürlük için temel ritim olarak önerildi.', '6 Mayıs', 'reklam-modeli', 'T10', 708),
('Mikro influencer modeli', 'Almanya''da 30K-250K takipçili 2-3 mikro influencer ile, gerçek problem çözen ve güven üreten içerik ortaklıkları kurulacak.', '6 Mayıs', 'influencer-partnerlikleri', 'T10', 709),
('Performans pazarlama', 'Instagram ve Facebook odaklı Meta reklamlarıyla Almanya''daki Türkçe konuşan kitleye erişilip kayıt akışı tetiklenecek.', '6 Mayıs', 'reklam-modeli', 'T10', 710),
('Çift tetik kullanıcı akışı', 'Kullanıcı edinim akışı sosyal reklamdan kayıt formuna, oradan platform üyeliği ve WhatsApp/Telegram topluluk üyeliğine bağlanacak.', '6 Mayıs', 'topluluk-yonetimi', 'T10', 711),
('Founding 1000 teklifi', 'İlk 1.000 işletmeye indirimli yıllık üyelik ve 6 aylık ücretsiz global tanıtım paketi sunan Founding 1000 kurgusu ana monetizasyon denemelerinden biri olarak konumlandırıldı.', '6 Mayıs', 'reklam-modeli', 'T10', 712),
('Yarışma gelir modeli', 'Blog ve vlog yarışmaları 25 € katılım ücretiyle hem gelir hem de Diaspora Library için kaliteli içerik üretim mekanizması olarak planlandı.', '6 Mayıs', 'reklam-modeli', 'T10', 713),
('Topluluk verisi toplama', 'WhatsApp ve Telegram topluluklarında akıllı anketler ve yoklamalarla kullanıcı ihtiyaçları toplanarak talep sinyalleri üretilecek.', '6 Mayıs', 'topluluk-yonetimi', 'T10', 714),
('LP v2 platform önizlemesi', 'Landing page''in ikinci versiyonunda Relocation Engine ve danışman dizini gibi ana özelliklerin interaktif demoları gösterilecek.', '6 Mayıs', 'veritabani-tasarimi', 'T10', 715),
('Site hatalarının önceliği', 'Pagination ve erişilebilirlik problemleri, pazarlama bütçesi aktive edilmeden önce çözülmesi gereken öncelikli teknik riskler olarak işaretlendi.', '6 Mayıs', 'veritabani-tasarimi', 'T10', 716),
('Danışmanlık bazlı iş modeli', 'Cihan planı ücretli work package modeliyle danışman olarak yönetecek; 5.000 kullanıcı KPI''ı gibi başarı eşiği sonrası daha kalıcı ve hisse bazlı rol tekrar değerlendirilecek.', '6 Mayıs', 'ekip-ve-isbirligi', 'T10', 717),
('Erken hisse kısıtı', 'Yatırımcıların dayattığı vesting yapıları nedeniyle erken equity verilmesinin zor olduğu ve kısa vadede danışman modelinin daha uygulanabilir olduğu not edildi.', '6 Mayıs', 'audit-kayitlari', 'T10', 718),
('10 bin € bütçe dağılımı', 'Bütçenin yaklaşık 3.000 €''su influencer''lara, 3.000 €''su Meta reklamlara ve 3.000 €''su da tasarımcı, içerik üreticisi ve yöneticiden oluşan 4-5 kişilik ekibe ayrılacak şekilde çerçevelendi.', '6 Mayıs', 'audit-kayitlari', 'T10', 719),
('Operasyonel sonraki adımlar', 'Barış ile plan paylaşımı, web sitesinin stabilize edilmesi, 10.000 € bütçenin netleştirilmesi ve Stripe aktif olunca Founding 1000 ile yarışmaların açılması sonraki adımlar olarak belirlendi.', '6 Mayıs', 'audit-kayitlari', 'T10', 720),
('Pazarlama ekibi kurulumu', 'Cihan 4-5 kişilik pazarlama ekibini kuracak; ilk lansman dönemi için detaylı içerik takvimi ve yaratıcı konseptleri hazırlayacak.', '6 Mayıs', 'ekip-ve-isbirligi', 'T10', 721)
on conflict do nothing;

with source_notes as (
  select
    mn.*,
    left(coalesce(nullif(trim(mn.title), ''), trim(mn.content), 'Meeting note'), 160) as normalized_title,
    coalesce(nullif(trim(mn.content), ''), 'Meeting note') as normalized_detail,
    coalesce(nullif(trim(mn.date), ''), 'Tarihsiz') as normalized_category,
    row_number() over (
      partition by
        left(coalesce(nullif(trim(mn.title), ''), trim(mn.content), 'Meeting note'), 160),
        coalesce(nullif(trim(mn.content), ''), 'Meeting note'),
        coalesce(nullif(trim(mn.date), ''), 'Tarihsiz'),
        mn.source,
        mn.category,
        coalesce(mn.sort_order, 0),
        coalesce(mn.created_at, now())
      order by mn.id
    ) as match_rank
  from public.meeting_notes mn
  where not exists (
    select 1
    from public.command_center_legacy_map m
    where m.legacy_table = 'meeting_notes'
      and m.legacy_row_id = mn.id
  )
), inserted_notes as (
  insert into public.command_center_items (
    item_type,
    title,
    detail,
    category_label,
    assignee,
    status,
    due_date,
    urgent,
    legacy_source_type,
    legacy_source_code,
    legacy_source_date_label,
    legacy_source_category,
    legacy_source_title,
    sort_order,
    created_at,
    updated_at
  )
  select
    'meeting_note',
    sn.normalized_title,
    sn.normalized_detail,
    sn.normalized_category,
    'UBT',
    'Beklemede',
    null,
    false,
    'meeting_notes',
    sn.source,
    sn.date,
    sn.category,
    sn.title,
    coalesce(sn.sort_order, 0),
    coalesce(sn.created_at, now()),
    coalesce(sn.updated_at, coalesce(sn.created_at, now()))
  from source_notes sn
  returning
    id,
    legacy_source_type,
    title,
    detail,
    category_label,
    legacy_source_code,
    legacy_source_category,
    sort_order,
    created_at
), inserted_notes_ranked as (
  select
    inote.*,
    row_number() over (
      partition by
        inote.title,
        inote.detail,
        inote.category_label,
        inote.legacy_source_code,
        inote.legacy_source_category,
        inote.sort_order,
        inote.created_at
      order by inote.id
    ) as match_rank
  from inserted_notes inote
), note_pairs as (
  select
    it.id as command_center_item_id,
    sn.id as legacy_row_id,
    it.match_rank
  from inserted_notes_ranked it
  join source_notes sn
    on it.legacy_source_type = 'meeting_notes'
   and it.title = sn.normalized_title
   and it.detail = sn.normalized_detail
   and it.category_label = sn.normalized_category
   and it.legacy_source_code = sn.source
   and it.legacy_source_category = sn.category
   and it.sort_order = coalesce(sn.sort_order, 0)
   and it.created_at = coalesce(sn.created_at, it.created_at)
   and it.match_rank = sn.match_rank
)
insert into public.command_center_legacy_map (
  command_center_item_id,
  legacy_table,
  legacy_row_id,
  migration_batch
)
select
  command_center_item_id,
  'meeting_notes',
  legacy_row_id,
  '20260508170000_add_t10_may6_meeting_notes'
from note_pairs
on conflict (legacy_table, legacy_row_id) do nothing;
