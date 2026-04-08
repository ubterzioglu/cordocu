# Session 04 - Category Routing

## Objective
- Documentation hub için kategori bazlı route yüzeyini tanımla.
- `index` ve `/[category]` arasında temiz bir navigation akışı oluştur.

## In Scope
- `src/pages/[category].tsx` sayfa kontratı
- Geçerli slug doğrulaması
- Fallback veya kontrollü boş durum davranışı
- Ana sayfa kartlarından kategori sayfasına geçiş akışı

## Out of Scope
- Gerçek içerik yönetimi
- Search implementasyonu
- Supabase’ten veri çekme
- Son görsel polish

## Tasks
- Sadece tanımlı kategori slug’larının geçerli olduğu bir route sözleşmesi belirle.
- Geçersiz slug durumunda 404 benzeri davranış veya kontrollü fallback yaklaşımını seç.
- `index` sayfası ile `[category]` sayfasının aynı shell içinde nasıl yeniden kullanılacağını netleştir.
- Kategori sayfasında hangi üst başlık, açıklama ve bölüm özetlerinin gösterileceğini tanımla.
- Navigation linklerinin canonical slug kullanımını doğrula.
- Geri dönüş akışı için ana hub’a yönlendiren tutarlı bir desen belirle.

## Dependencies
- Giriş bağımlılığı: `1775646829603-playful-cactus-session-03-sidebar-navigation.md`
- Sonraki session referansı: `1775646829603-playful-cactus-session-05-main-content-cards.md`
- Sonraki session referansı: `1775646829603-playful-cactus-session-07-supabase-prep.md`

## Acceptance Criteria
- `/[category]` sayfa yüzeyi yalnızca tanımlı slug’larla çalışacak.
- Ana hub ve kategori detay görünümü arasında yönlendirme akışı net olacak.
- Geçersiz route kullanıcıyı belirsiz bir boş ekrana düşürmeyecek.
- Shell yapısı `index` ve category page arasında tutarlı kalacak.

## Handoff Notes
- Session 05 içerik modlarını tasarlarken bu route sözleşmesini baz almalı.
- Session 07 gerçek veri bağlarken slug doğrulama kararını bozmamalı.
