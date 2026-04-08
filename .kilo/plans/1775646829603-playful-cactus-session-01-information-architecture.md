# Session 01 - Information Architecture

## Objective
- Documentation hub için tek veri kaynağını tanımla.
- Kategori slug, başlık, alt item, kart içeriği ve ikon eşlemesini typed bir yapı olarak planla.
- Sonraki session’ların hardcoded JSX yerine aynı config üzerinden ilerlemesini mümkün kıl.

## In Scope
- Kategori listesi: `general`, `testfall`, `planung`, `architecture`, `tests`
- Sidebar ve content area için ortak metadata şeması
- Önerilen `type` veya `interface` yapısı
- Mock veri düzeni ve naming convention

## Out of Scope
- Görsel düzenleme
- Route implementasyonu
- Gerçek markdown parse etme
- Gerçek Supabase veri çekme

## Tasks
- Kategorilerin canonical slug, label ve kısa açıklamalarını tanımla.
- Sidebar item yapısı için zorunlu alanları belirle: örnek olarak `id`, `label`, `href`, `description`, `categorySlug`.
- Hub kartları için ortak alanları belirle: örnek olarak `title`, `description`, `categorySlug`, `ctaLabel`.
- İkon kullanımını veri içinde JSX taşımadan yönetmek için ikon anahtarı yaklaşımını netleştir.
- Mevcut `Sidebar.tsx` ve `MainContent.tsx` içindeki sabit listeleri yeni yapıdan besleyecek veri akışını tarif et.
- Mock content verisinin nerede tutulacağını kararlaştır: tek config dosyası veya data modulu.

## Dependencies
- Başlangıç session’ı; dış bağımlılığı yok.
- Sonraki session’lar için referans: `1775646829603-playful-cactus-session-02-layout-shell.md`
- Sonraki session’lar için referans: `1775646829603-playful-cactus-session-05-main-content-cards.md`

## Acceptance Criteria
- Tüm kategori ve içerik ilişkileri tek kaynakta tanımlanmış olacak.
- `Sidebar` ve `MainContent` aynı veri şemasını tüketebilecek kadar net bir kontrat oluşacak.
- Slug isimleri URL kullanımı için güvenli ve tutarlı olacak.
- İkon eşleme çözümü, veri katmanı ile sunum katmanını birbirine gereksiz bağlamayacak.

## Handoff Notes
- Bu session tamamlanmadan layout veya route oturumlarında yeni hardcoded liste eklenmemeli.
- Session 02 ve Session 03 uygulayıcıları yeni veri kaynağını layout/navigation için tek otorite kabul etmeli.
- Session 07 bu veri modelini ileride Supabase satır yapısına çevrilebilir olacak şekilde düşünmeli.
