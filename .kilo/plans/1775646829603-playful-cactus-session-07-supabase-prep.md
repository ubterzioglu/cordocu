# Session 07 - Supabase Preparation

## Objective
- Gerçek veri entegrasyonu öncesinde Supabase için güvenli ve düşük riskli bir hazırlık katmanı tanımla.
- UI’nin env değerleri eksik olduğunda bozulmamasını garanti edecek sınırları netleştir.

## In Scope
- `src/lib/supabase.ts` çevresindeki kullanım sınırı
- Env-safe adapter yaklaşımı
- Gelecekteki content fetch ve auth entegrasyonu için hazırlık notları
- Mock data ile gerçek veri katmanı arasındaki geçiş noktası

## Out of Scope
- Gerçek Supabase sorguları
- Auth akışı
- Content management paneli
- Search entegrasyonu

## Tasks
- Mevcut Supabase client’in hangi katman tarafından tüketileceğini netleştir.
- Env değerleri boş olduğunda doğrudan kırılma yerine kontrollü fallback yaklaşımı tanımla.
- Mock config verisinden gerçek veri kaynağına geçişte hangi adapter yüzeyinin korunacağını belirle.
- Route slug, category ve content item alanlarının gelecekte Supabase şemasına nasıl bağlanabileceğini not et.
- Bu session’da yapılmayacak işleri açıkça sınırla: auth, RLS, gerçek fetch, admin içerik girişi.

## Dependencies
- Giriş bağımlılığı: `1775646829603-playful-cactus-session-01-information-architecture.md`
- Tercihen sonrası için referans: `1775646829603-playful-cactus-session-04-category-routing.md`
- Sonraki session referansı: `1775646829603-playful-cactus-session-08-accessibility-qa.md`

## Acceptance Criteria
- Supabase hazırlığı gerçek entegrasyon yapılmadan da anlamlı olacak.
- UI env eksikliğinden dolayı runtime’da çökme riski taşımayacak.
- Mock data yapısı ile gelecekteki veri kaynağı arasında makul bir geçiş sınırı tanımlanmış olacak.
- Scope net kalacak; bu session yanlışlıkla backend geliştirme işine dönüşmeyecek.

## Handoff Notes
- Gelecek implementasyonlarda gerçek veri fetch eklenirse bu session’ın scope dışı kararları yeniden açılmalı.
- Session 08 kalite kontrolü env eksikliği senaryosunu özellikle doğrulamalı.

## Implementation Notes
- `src/lib/supabase.ts` artık env eksikse doğrudan patlayan singleton yerine status üreten ve gerektiğinde `null` dönebilen güvenli bir browser client factory içeriyor.
- `src/lib/docs-data.ts`, UI için tek veri erişim yüzeyi olarak tanımlandı; sayfalar, sidebar ve content render katmanı Supabase yerine bu adapter modülünü tüketiyor.
- Bu session’da docs runtime kaynağı bilinçli olarak `mock` kaldı; Supabase env dolu olsa bile gerçek query, auth ve RLS kararları netleşmeden live fetch açılmıyor.
- Gelecek şema eşlemesi için route slug alanı `doc_categories.slug`, kategori metadatası `doc_categories.*`, içerik item alanları ise `doc_content_items.*` yüzeyi üzerinden notlandı.
- Bu uygulama özellikle auth, RLS, gerçek content fetch ve admin içerik girişini kapsam dışında bırakır; sonraki backend session’ları bu sınırı bilinçli şekilde yeniden açmalıdır.
