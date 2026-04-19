# Accordion Content Page Oluşturma

Bir bölümü (section) akordeon kartlı sayfaya dönüştürmek için bu komutu kullan.

## Kullanım

Kullanıcı şu formatta bir içerik verir:
- Soru/Cevap şeklinde bölümler
- Her bölüm bir akordeon kart olacak
- Kartlar kapalı başlar, tıklayınca açılır

## Yapılacak İşlemler (Sırasıyla)

### 1. Yeni sayfa dosyası oluştur

**Dosya:** `src/pages/{slug}.tsx`

```tsx
import DocsShell from '@/components/layout/DocsShell'
import AccordionCard from '@/components/ui/AccordionCard'

const accordionItems = [
  {
    id: 'benzersiz-id',
    title: 'Soru / Başlık metni',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Madde 1</li>
        <li>- Madde 2</li>
      </ul>
    ),
  },
]

export default function PageName() {
  return (
    <DocsShell>
      <div className="docs-main-column">
        <article className="space-y-8 sm:space-y-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="docs-surface p-5 sm:p-6 md:p-8">
              <div
                className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(66,133,244,0.22)_0%,_rgba(66,133,244,0)_72%)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-32 w-40 bg-[radial-gradient(circle,_rgba(52,168,83,0.14)_0%,_rgba(52,168,83,0)_74%)]"
                aria-hidden="true"
              />
              <h1 className="mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                Sayfa Başlığı
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
                Kısa açıklama metni.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">Etiket 1</span>
                <span className="docs-chip">Etiket 2</span>
              </div>
            </div>
          </div>

          <AccordionCard items={accordionItems} />
        </article>
      </div>
    </DocsShell>
  )
}
```

### 2. DEDICATED_PAGES'e ekle

**Dosya:** `src/pages/[category].tsx`

`DEDICATED_PAGES` set'ine yeni slug'u ekle:

```ts
const DEDICATED_PAGES = new Set(['todolist', 'links', ..., '{slug}'])
```

### 3. docs-content.ts temizliği (gerekirse)

Eğer slug `docs-content.ts`'de `useBulletCardLayout` için özel olarak işaretliyse, o satırı kaldır. Eğer `dijitalPazarlamaSectionDetail` benzeri bir detail record varsa, sayfa artık dedicated olduğu için kullanılmaz ama silmek zorunlu değil.

### 4. docs-hub.ts kontrolü

Sidebar'da `docs-hub.ts`'te category tanımı zaten var, dokunmaya gerek yok. Yeni bir section ise category tanımı eklenmeli.

### 5. Build doğrulama

```bash
npx next build
```

Build'in başarıyla tamamlanıp tamamlanmadığını ve yeni route'un listede göründüğünü kontrol et.

## Renk Paleti (accentColor)

Her akordeon kartı için farklı renk kullan:

| Renk | Hex |
|---|---|
| Mavi | `#1A6DC2` |
| Yeşil | `#34A853` |
| Sarı | `#FBBC04` |
| Kırmızı | `#EA4335` |
| Mor | `#9334E6` |
| Turuncu | `#FF6D01` |
| Cyan | `#46BDC6` |

## Örnek: Dijital Pazarlama

Referans implementasyon: `src/pages/dijitalpazarlama.tsx`
- 7 akordeon kart
- Her kart farklı accentColor
- Hero kartında "İçerik Yönetimi", "Kampanya Yönetimi", "Durum Akışları" chip'leri
