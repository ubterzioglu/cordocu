# Session 02 - Layout Shell

## Objective
- Documentation hub için sabit header, sol sidebar ve ana content alanından oluşan temel shell yapısını netleştir.
- Desktop ve mobile düzenler arasında kaymasız çalışan bir iskelet oluştur.

## In Scope
- `Header`, `Sidebar`, ana container ve spacing/offset kararı
- Header yüksekliği ve sidebar genişliği için tutarlı layout sistemi
- Mobile ve desktop breakpoint davranışları
- Page-level state ile shell bileşenlerinin bağlanması

## Out of Scope
- Route-aware active state
- Dynamic category pages
- Görsel polish ve son tasarım dokunuşları
- Supabase hazırlığı

## Tasks
- `src/pages/index.tsx` içinde shell kompozisyonunu sade ve genişleyebilir hale getirecek yapı tanımla.
- Header yüksekliği ve sidebar genişliği için CSS variable veya tek kaynak Tailwind yaklaşımını seç.
- Main content alanının desktop’ta sidebar offset’ini, mobile’da ise tam genişlik kullanımını netleştir.
- Sidebar açık/kapalı state’inin shell seviyesinde tutulup tutulmayacağını kararlaştır.
- İçerik alanı için max-width, padding ve üst boşluk davranışını belirle.
- Shell yapısının kategori detail sayfasında da yeniden kullanılabileceğini göz önünde bulundur.

## Dependencies
- Giriş bağımlılığı: `1775646829603-playful-cactus-session-01-information-architecture.md`
- Sonraki session referansı: `1775646829603-playful-cactus-session-03-sidebar-navigation.md`
- Sonraki session referansı: `1775646829603-playful-cactus-session-04-category-routing.md`

## Acceptance Criteria
- Desktop görünümde header ve sidebar sabit, content alanı taşmasız görünmeli.
- Mobile görünümde content alanı overlay sidebar kapalıyken tam genişlikte kalmalı.
- Shell düzeni sadece `index` için değil, ileride `[category]` sayfası için de tekrar kullanılabilir olmalı.
- Spacing ve offset mantığı component içine dağılmış magic number’lara bağlı kalmamalı.

## Handoff Notes
- Session 03, burada tanımlanan shell state sınırlarını korumalı; navigation davranışlarını bunun üstüne eklemeli.
- Session 06 polish yaparken bu shell kararlarını bozmak yerine yalnızca görünümü iyileştirmeli.
