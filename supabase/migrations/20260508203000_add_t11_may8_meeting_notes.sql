alter table public.meeting_notes drop constraint if exists meeting_notes_source_check;

alter table public.meeting_notes add constraint meeting_notes_source_check
  check (source in ('T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'WA', 'NO', 'MAN'));

insert into public.meeting_notes (title, content, date, category, source, sort_order) values
('Diaspora ağı odak doğrulaması', 'CorteQS’in global Türk diasporasını bir araya getiren, sosyal bağ ve fırsat görünürlüğü üreten bir ağ olarak konumlanması tekrar netleştirildi.', '8 Mayıs', 'topluluk-yonetimi', 'T11', 800),
('Command Center operasyon merkezi', 'Command Center’ın toplantı notları, todo''lar, WhatsApp özetleri ve kararların tek merkezden takip edildiği ana operasyon alanı olması kararlaştırıldı.', '8 Mayıs', 'veritabani-tasarimi', 'T11', 801),
('Kayıt temizliği hedefi', 'Command Center''daki yaklaşık 500 kaydın sadeleştirilip 50-100 anlamlı aksiyona indirgenmesi gerektiği not edildi.', '8 Mayıs', 'audit-kayitlari', 'T11', 802),
('Emergent süresi değerlendirilecek', 'Emergent üyeliğinde kalan ek süre bitmeden 2-3 adet end-to-end çıktı alınarak Cortex Engine fikri somutlaştırılacak.', '8 Mayıs', 'ekip-ve-isbirligi', 'T11', 803),
('Cortex Engine teknikleştirme', 'Burak’ın AI destekli iç kaynak yönetim sistemi fikri teknik dokümana dönüştürüldü ve Emergent üzerinde ilk ürün taslaklarına çevrilecek.', '8 Mayıs', 'veritabani-tasarimi', 'T11', 804),
('Tek database prensibi', 'Landing page, MVP ve admin panelin farklı veritabanları yerine aynı temel database üzerinde çalışması gerektiği tekrar teyit edildi.', '8 Mayıs', 'veritabani-tasarimi', 'T11', 805),
('Admin paneli sona yakın şekillenecek', 'Admin panelinin erken tamamlanması yerine önce kullanıcı profilleri, dashboard akışları ve temel feature''ların netleştirilmesi yaklaşımı benimsendi.', '8 Mayıs', 'mvp-hedefleri', 'T11', 806),
('Feature havuzu ve yetki matrisi', 'Admin, contributor, danışman, işletme, kuruluş, vlogger ve şehir elçisi gibi roller için ortak feature havuzu ve rol bazlı görünürlük modeli kurulacak.', '8 Mayıs', 'veritabani-tasarimi', 'T11', 807),
('Sosyal medya operasyon merkezi', 'Logo, görsel, post arşivi, içerik planı ve AI destekli içerik optimizasyonunu barındıracak ayrı bir sosyal medya operasyon paneli fikri yeniden gündeme alındı.', '8 Mayıs', 'reklam-modeli', 'T11', 808),
('İnsan destekli sosyal medya dağıtımı', 'Tam otomasyon yerine contributor destekli, manuel like, repost ve paylaşım odaklı sosyal medya operasyonunun şu aşamada daha gerçekçi olduğu vurgulandı.', '8 Mayıs', 'reklam-modeli', 'T11', 809),
('Cihan lansman planı gözden geçirildi', 'Cihan’ın Almanya ve Avrupa odaklı influencer, Meta reklamı ve operasyon önerileri değerlendirildi; katkı isteği pozitif görüldü.', '8 Mayıs', 'influencer-partnerlikleri', 'T11', 810),
('10 bin Euro için erken uyarı', 'Platform tam hazır olmadığı için yaklaşık 10.000 Euro''luk büyüme bütçesinin henüz erken olabileceği ve geri dönüş hesabının netleşmesi gerektiği konuşuldu.', '8 Mayıs', 'audit-kayitlari', 'T11', 811),
('Hisse yerine danışman modeli', 'Cihan benzeri katkılar için kısa vadede hisse yerine paket bazlı veya part-time danışmanlık/ödeme modeli daha uygun görüldü; equity için cliff ve vesting mantığı korundu.', '8 Mayıs', 'ekip-ve-isbirligi', 'T11', 812),
('Erken gelir ihtiyacı', 'Stripe aktivasyonu ve Founding 1000 benzeri üyelik modelleriyle erken gelir yaratılmasının operasyonel hız ve motivasyon için kritik olduğu vurgulandı.', '8 Mayıs', 'reklam-modeli', 'T11', 813),
('Contributor çekirdek ekip mesajı', 'Contributor grubunun çekirdek ekip gibi ele alınması ve Burak’ın vizyon mesajıyla grubun yeniden aktive edilmesi gerektiği konuşuldu.', '8 Mayıs', 'ekip-ve-isbirligi', 'T11', 814),
('Sehir elcileri contributor yapisina katilacak', 'Admin panelde görülen şehir elçilerinin contributor yapısıyla konsolide edilmesi ve tek sosyal medya etki ağı içinde değerlendirilmesi önerildi.', '8 Mayıs', 'topluluk-yonetimi', 'T11', 815),
('Sosyal medya etki formu', 'Contributor ve şehir elçileri için ülke, şehir, profil linkleri ve takipçi sayılarını toplayan kısa bir sosyal medya etki formu hazırlanacak.', '8 Mayıs', 'topluluk-yonetimi', 'T11', 816),
('Contributor tanisma toplantisi', 'Contributor tanışma toplantısının en kısa sürede yapılıp 19 Mayıs planı, sosyal medya katkısı ve coğrafi dağılımın birlikte konuşulması kararlaştırıldı.', '8 Mayıs', 'ekip-ve-isbirligi', 'T11', 817),
('19 Mayis kampanyasi ekseni', '19 Mayıs kampanyasının kullanıcıyı siteye sokan, kayıt toplayan ve diaspora ruhunu görünür kılan birkaç net aksiyon etrafında kurulması benimsendi.', '8 Mayıs', 'mvp-hedefleri', 'T11', 818),
('Global diaspora haritasi onceligi', '19 Mayıs için en güçlü fikir olarak kullanıcıların, işletmelerin ve toplulukların pin ekleyebileceği global diaspora haritası önceliklendirildi.', '8 Mayıs', 'mvp-hedefleri', 'T11', 819),
('19 kelimelik fikir formu', 'Diaspora bağlarını güçlendirecek fikirleri toplamak için 19 kelimelik kısa fikir ve açıklama formu ikinci aksiyon olarak önerildi.', '8 Mayıs', 'mvp-hedefleri', 'T11', 820),
('Ani ve fotograf toplama', '19 Mayıs anıları ve fotoğrafları kullanıcıdan link veya görsel yoluyla toplanıp sosyal medyada değerlendirilecek üçüncü aksiyon olarak tanımlandı.', '8 Mayıs', 'mvp-hedefleri', 'T11', 821),
('Pilot sehirlerle gercek veri', 'Berlin, Londra ve Dubai için gerçek kişi, grup, işletme ve medya verilerinin toplanarak demo kartlar yerine gerçek kartların gösterilmesi hedeflendi.', '8 Mayıs', 'veritabani-tasarimi', 'T11', 822),
('Public profil listeleme yaklaşımı', 'Açık web sitesi ve sosyal medya profillerine sahip kişi ve kurumların başlangıçta görünür listelenebileceği, kaldırma talebi gelirse sonradan düzenlenebileceği not edildi.', '8 Mayıs', 'audit-kayitlari', 'T11', 823),
('Haber otomasyonu sonraya kaldi', 'CNN, BBC ve Deutsche Welle gibi kaynaklardan haber çekme otomasyonu ileride yapılacak iş olarak bırakıldı; öncelik gerçek veri ve kampanya akışlarına verildi.', '8 Mayıs', 'veritabani-tasarimi', 'T11', 824),
('Siralı teslim yaklaşimi', 'Harita, 19 kelimelik fikir formu ve anı/fotoğraf akışlarının aynı anda değil sırayla tamamlanıp yayına alınması gerektiği konusunda mutabık kalındı.', '8 Mayıs', 'ekip-ve-isbirligi', 'T11', 825)
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
  '20260508203000_add_t11_may8_meeting_notes'
from note_pairs
on conflict (legacy_table, legacy_row_id) do nothing;
