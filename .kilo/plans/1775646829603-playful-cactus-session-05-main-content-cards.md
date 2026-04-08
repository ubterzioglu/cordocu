# Session 05 - Main Content and Cards

## Objective
- `MainContent` ve `ContentCard` bileşenlerini hub overview ve category detail kullanımına uygun hale getir.
- İçerik sunumunu config-driven ve yeniden kullanılabilir bir yapıya taşı.

## In Scope
- `MainContent` görünüm modları
- `ContentCard` veri sözleşmesi ve CTA davranışları
- Hub ana görünümü ile kategori detay görünümü arasındaki sunum farkları
- Section ve card yoğunluğu

## Out of Scope
- Nihai görsel polish
- Arama işlevi
- Supabase entegrasyonu
- Accessibility final geçişi

## Tasks
- `MainContent` için en az iki mod tanımla: hub overview ve category detail.
- Hub görünümünde kategori kartları; category görünümünde ilgili item/section kompozisyonunu tanımla.
- `ContentCard` için title, description, badge/category ve click target davranışlarını netleştir.
- Boş state veya henüz içerik olmayan kategori görünümüne nasıl davranılacağını belirle.
- Reusable section heading ve açıklama bloklarının ihtiyaç duyulup duyulmadığını değerlendir.
- Search input yalnızca placeholder UI olarak kalacaksa bu sınırı açıkça koru.

## Dependencies
- Giriş bağımlılığı: `1775646829603-playful-cactus-session-04-category-routing.md`
- Sonraki session referansı: `1775646829603-playful-cactus-session-06-visual-polish-responsive.md`
- Sonraki session referansı: `1775646829603-playful-cactus-session-08-accessibility-qa.md`

## Acceptance Criteria
- `MainContent` aynı temel bileşenlerle iki görünüm modunu destekleyebilecek.
- `ContentCard` tekrar kullanılabilir ve route-aware kullanım için yeterli olacak.
- Hub ve kategori detay görünümleri içerik açısından farklı ama yapısal olarak tutarlı kalacak.
- Placeholder search alanı yanlışlıkla işlevsel özellik gibi ele alınmayacak.

## Handoff Notes
- Session 06 yalnızca burada tanımlanan içerik yapısını güzelleştirmeli, yeni içerik modeli üretmemeli.
- Session 08 focus state ve semantics kontrolünü bu bileşenlerin son hali üzerinden yapmalı.
