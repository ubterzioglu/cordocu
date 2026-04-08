# Session 08 - Accessibility and QA

## Objective
- Documentation hub için kapanış kalitesi sağlayacak accessibility ve QA kontrol paketini tanımla.
- Önceki session’larda çıkan yapıyı teslim edilebilir hale getir.

## In Scope
- Keyboard erişimi
- ARIA ve semantik yapı kontrolleri
- Lint ve temel smoke QA
- Son temizlik ve handoff checklist

## Out of Scope
- Yeni özellik geliştirme
- Yeni görsel konsept
- Gerçek arama özelliği
- Gerçek Supabase auth/content entegrasyonu

## Tasks
- Header menü butonu, sidebar category toggle ve sidebar item’lar için keyboard erişim gereksinimlerini tanımla.
- Focus görünürlüğü ve semantik heading sırasını kontrol edilecek maddeler arasına ekle.
- Overlay ve navigasyon davranışlarında `aria-label`, role ve erişilebilir isim gereksinimlerini netleştir.
- Contrast ve aktif state ayırt edilebilirliği için kontrol listesi oluştur.
- `npm run lint` ve temel responsive smoke kontrolü için teslim öncesi doğrulama maddeleri ekle.
- Kullanılmayan prop, type ve eski hardcoded kalıntıların temizlenmesini handoff parçası yap.

## Dependencies
- Giriş bağımlılığı: `1775646829603-playful-cactus-session-03-sidebar-navigation.md`
- Giriş bağımlılığı: `1775646829603-playful-cactus-session-05-main-content-cards.md`
- Giriş bağımlılığı: `1775646829603-playful-cactus-session-06-visual-polish-responsive.md`
- Giriş bağımlılığı: `1775646829603-playful-cactus-session-07-supabase-prep.md`

## Acceptance Criteria
- Temel etkileşimlerin tümü keyboard ile kullanılabilir olacak.
- Başlık hiyerarşisi ve temel ARIA işaretlemeleri eksiksiz kontrol edilmiş olacak.
- Lint ve en az temel responsive smoke senaryoları doğrulanmış olacak.
- Teslim öncesi teknik borç ve gereksiz kalıntılar görünür şekilde listelenmiş veya temizlenmiş olacak.

## Handoff Notes
- Bu session yeni ürün kararı almamalı; sadece kalite kapısı görevi görmeli.
- Sorun bulunursa ilgili düzeltme işi kaynak session dosyasına geri bağlanmalı ve rastgele burada çözülmemeli.
