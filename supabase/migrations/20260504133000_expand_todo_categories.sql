alter table public.todo_items
  drop constraint if exists todo_items_konu_check;

update public.todo_items
set
  konu = case
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(bot|whatsapp|rag|corebot| dm | otomasyon)%'
      then 'Bot & Otomasyon'
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(dashboard|admin panel|profil| ui | ux |contributor dashboard)%'
      then 'Dashboard, Admin & UX'
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(landing| web | site | form | sayfa)%'
      then 'Landing Page & Web'
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(seo| geo |blog|içerik|social|instagram|linkedin post|youtube|launch paketi)%'
      then 'İçerik, SEO & Sosyal Medya'
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(influencer|ambassador|partner|contributor|community leader|city partner)%'
      then 'Influencer, Ambassador & Partnerlikler'
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(referral|onboarding|community|kanal|grup|welcome|duyuru)%'
      then 'Topluluk, Referral & Onboarding'
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(crm|analytics|clarity|search console|source|tracking|data strategy)%'
      then 'Veri, CRM & Analytics'
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(hr|aday|işe alım|görev tanımı|ekip datası|görüşme)%'
      then 'İnsan Kaynakları & Hiring'
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(teklif|offer|contract|sözleşme|compensation|hourly|deferred|umbrella)%'
      then 'Teklif, Sözleşme & Compensation'
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(stripe|payment|ein|delaware|llc|cap table|bütçe|gelir modeli|valuation)%'
      then 'Finans, Legal & Şirketleşme'
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(drive|doküman|toplantı notu|arge klasörü|paylaşım sistemi|organize et)%'
      then 'Dokümantasyon, Drive & Operasyon'
    when lower(concat_ws(' ', coalesce(konu, ''), coalesce(ayrinti, ''))) similar to '%(pilot ülke|roadmap|launch planı|rasci|fizibilite|strateji)%'
      then 'Strateji, Roadmap & PMO'
    when coalesce(ayrinti, '') = 'Teknik & Ürün'
      then 'Dashboard, Admin & UX'
    when coalesce(ayrinti, '') = 'Strateji & Planlama'
      then 'Strateji, Roadmap & PMO'
    when coalesce(ayrinti, '') = 'İnsan Kaynakları'
      then 'İnsan Kaynakları & Hiring'
    when coalesce(ayrinti, '') = 'Marketing & Growth'
      then 'İçerik, SEO & Sosyal Medya'
    when coalesce(ayrinti, '') = 'Operasyon & Dokümantasyon'
      then 'Dokümantasyon, Drive & Operasyon'
    else 'Strateji, Roadmap & PMO'
  end,
  ayrinti = coalesce(nullif(trim(konu), ''), nullif(trim(ayrinti), ''), 'Todo detayı eksik');

alter table public.todo_items
  add constraint todo_items_konu_check
    check (
      konu in (
        'Bot & Otomasyon',
        'Dashboard, Admin & UX',
        'Landing Page & Web',
        'İçerik, SEO & Sosyal Medya',
        'Influencer, Ambassador & Partnerlikler',
        'Topluluk, Referral & Onboarding',
        'Veri, CRM & Analytics',
        'İnsan Kaynakları & Hiring',
        'Teklif, Sözleşme & Compensation',
        'Finans, Legal & Şirketleşme',
        'Strateji, Roadmap & PMO',
        'Dokümantasyon, Drive & Operasyon'
      )
    );
