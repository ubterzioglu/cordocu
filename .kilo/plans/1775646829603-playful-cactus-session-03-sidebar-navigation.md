# Session 03 - Sidebar Navigation

## Objective
- Sidebar etkileşimlerini gerçek navigation davranışına yaklaştır.
- Expand/collapse, active state ve mobile overlay kapanma kurallarını netleştir.

## In Scope
- `Sidebar`, `SidebarCategory`, `SidebarItem` bileşenleri
- Active kategori ve active item davranışı
- Mobile overlay açma/kapama davranışı
- Gerekliyse keyboard ile temel kullanım

## Out of Scope
- Dynamic route sayfasının tam implementasyonu
- Main content görsel polish
- Search işlevi
- Gerçek veri çekme

## Tasks
- Active state’in URL veya route bilgisinden türemesi için yaklaşımı belirle.
- Category expand/collapse durumunun default ve kullanıcı etkileşimi sonrası davranışını netleştir.
- Mobile’da overlay, backdrop click ve close action akışını tanımla.
- Sidebar item tıklanınca navigation sonrası mobile menünün kapanma kuralını belirle.
- `SidebarItem` için button vs link kararını route davranışına uygun şekilde netleştir.
- Geçerli category altında olmayan item’ların görünürlüğü veya highlight davranışını tanımla.

## Dependencies
- Giriş bağımlılığı: `1775646829603-playful-cactus-session-02-layout-shell.md`
- Sonraki session referansı: `1775646829603-playful-cactus-session-04-category-routing.md`
- Sonraki session referansı: `1775646829603-playful-cactus-session-08-accessibility-qa.md`

## Acceptance Criteria
- Sidebar açık kategori ve aktif item durumunu kararlı şekilde gösterecek.
- Mobile’da sidebar kapatma davranışı tutarlı olacak.
- Navigation state component-local karmaşaya dönüşmeden okunabilir kalacak.
- Etkileşimler route yapısı geldiğinde tekrar tasarlanmak zorunda kalmayacak.

## Handoff Notes
- Session 04 implementasyonu active state mantığını yeniden icat etmemeli; bu session’daki kararları kullanmalı.
- Session 08, keyboard ve ARIA kontrollerini bu davranışların üstüne eklemeli.
