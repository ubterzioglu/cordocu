# MVP Items — Konu Bazlı Kart Görünümü Uygulama Planı

> **Hedef:** `/mvpitems` sayfasındaki mevcut `MvpManager` bileşeninin tek liste görünümünü, itemlerin `konu` alanına göre dinamik olarak gruplanmış kart görünümü ile değiştirmek. Tüm CRUD işlevleri korunacak.

---

## 1. Onaylanan Kararlar

| # | Karar | Değer |
|---|-------|-------|
| 1 | Konu normalizasyonu | **YAPILIR** — `trim().toLowerCase()` ile gruplama; görünen başlık olarak ilk gelen orijinal yazım kullanılır |
| 2 | Layout | **Tek sütun** (dikey liste, her kart tam genişlik) |
| 3 | MVP dağılım rozetleri | **VAR** — kart içeriğinin üstünde renkli chip olarak (MVP1/MVP2/MVP3/Atanmadi sayıları) |
| 4 | Default açık/kapalı | **Atanmadi itemi içeren kartlar açık**, diğerleri kapalı |

---

## 2. Requirements Restatement

- `/mvpitems` sayfasında `MvpManager` bileşeni, itemleri `konu` alanına göre gruplayan **kart listesi** gösterecek.
- Her kart bir konu grubunu temsil eder; kart başlığında konu adı + toplam item sayısı + chevron (aç/kapa).
- Kart açıldığında, o konuya ait itemler mevcut tablo (desktop) ve kart (mobile) UI'ında listelenir.
- İnline MVP seviyesi değiştirme, sorumlu (added_by) atama, düzenle, sil işlevleri **birebir korunur**.
- "Yeni Madde Ekle" formu sayfanın altında aynen korunur.
- Mevcut MVP1/MVP2/MVP3 özet accordion'ı (üstteki) ve tek-liste tablo/kart gösterimi **kaldırılır**.
- Gruplar dinamik — `konu` alanına göre runtime'da türetilir.

---

## 3. Dosya Değişiklik Özeti

| Dosya | Eylem | Özet |
|-------|-------|------|
| `src/lib/mvp-items.ts` | Güncelle | `KonuGroup` tipi, `groupItemsByKonu` fonksiyonu, ortak stil sabitleri (`MVP_COLORS`, `INPUT_CLS`, `BTN_CLS`) export edilir |
| `src/components/mvp/KonuCard.tsx` | **Yeni oluştur** | Tek konu grubunu render eden presentational bileşen |
| `src/components/mvp/MvpManager.tsx` | Refactor | Eski render blokları kaldırılır, `KonuCard` map'lemesi eklenir |
| `src/components/ui/AccordionCard.tsx` | İncele + gerekiyorsa genişlet | `defaultOpen` desteği kontrol edilir |

---

## 4. Detaylı Todo Listesi

### ✅ TODO 1 — `src/lib/mvp-items.ts` güncellemesi

**Amaç:** Gruplama fonksiyonu, yeni tipler ve ortak stil sabitlerini tek kaynakta topla.

**1.1 Yeni tip ekle (mevcut tiplerden sonra):**

```typescript
export interface MvpLevelCounts {
  MVP1: number
  MVP2: number
  MVP3: number
  Atanmadi: number
}

export interface KonuGroup {
  konu: string            // Görünen başlık — grupta ilk gelen item'ın orijinal konu yazımı
  normalizedKey: string   // Gruplama anahtarı — trim().toLowerCase() veya '__diger__'
  items: MvpItem[]        // Gruba ait itemler (sıralı)
  mvpCounts: MvpLevelCounts
}
```

**1.2 MVP seviyesi sıralaması için sabit:**

```typescript
export const MVP_LEVEL_ORDER: Record<MvpLevel, number> = {
  MVP1: 0,
  MVP2: 1,
  MVP3: 2,
  Atanmadi: 3,
}
```

**1.3 Ortak stil sabitlerini `MvpManager.tsx`'ten buraya taşı ve export et:**

```typescript
export const MVP_COLORS: Record<MvpLevel, string> = {
  MVP1: '#E53935',
  MVP2: '#FB8C00',
  MVP3: '#1A6DC2',
  Atanmadi: '#888888',
}

export const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

export const BTN_CLS =
  'inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all disabled:opacity-60'
```

**1.4 `groupItemsByKonu` fonksiyonu:**

```typescript
export function groupItemsByKonu(items: MvpItem[]): KonuGroup[] {
  const map = new Map<string, KonuGroup>()

  for (const item of items) {
    const raw = (item.konu ?? '').trim()
    const normalizedKey = raw ? raw.toLowerCase() : '__diger__'
    const displayKonu = raw || 'Diğer'

    let group = map.get(normalizedKey)
    if (!group) {
      group = {
        konu: displayKonu,
        normalizedKey,
        items: [],
        mvpCounts: { MVP1: 0, MVP2: 0, MVP3: 0, Atanmadi: 0 },
      }
      map.set(normalizedKey, group)
    }
    group.items.push(item)
    group.mvpCounts[item.mvpLevel]++
  }

  // Her grubun itemlerini sırala: önce MVP seviyesi, sonra createdAt desc
  for (const group of map.values()) {
    group.items.sort((a, b) => {
      const levelDiff = MVP_LEVEL_ORDER[a.mvpLevel] - MVP_LEVEL_ORDER[b.mvpLevel]
      if (levelDiff !== 0) return levelDiff
      return b.createdAt.localeCompare(a.createdAt)
    })
  }

  // Grupları sırala: konu alfabetik (Türkçe), '__diger__' her zaman en sonda
  return Array.from(map.values()).sort((a, b) => {
    if (a.normalizedKey === '__diger__') return 1
    if (b.normalizedKey === '__diger__') return -1
    return a.konu.localeCompare(b.konu, 'tr')
  })
}
```

**Bitiş kriteri:** `tsc --noEmit` hatasız.

---

### ✅ TODO 2 — `AccordionCard` `defaultOpen` kontrolü

**Amaç:** Her kartın bağımsız olarak default açık/kapalı başlaması gerek. Mevcut `AccordionCard` component-level `defaultOpenId` alıyor (tüm listeye tek açık kart); tek-item kullanımda `defaultOpenId = item.id` pass ederek tek kartın açık başlamasını sağlayabiliriz.

**Onay:** `AccordionCard` incelendi — props: `items: AccordionItem[]`, `defaultOpenId?: string`. Bileşen aynı anda bir item açık tutmaya izin veriyor. `KonuCard` içinde her kart ayrı `AccordionCard` instance'ı olacağı için, her kart kendi `defaultOpenId` değerini bağımsız alır → **değişiklik gerekmez.**

Alternatif/daha temiz yaklaşım (opsiyonel):
- `KonuCard` `AccordionCard` kullanmak yerine, native `<details>`/`<summary>` veya küçük kendi collapse UI'ını kurabilir.
- Öneri: Mevcut görsel diliyle uyum için `AccordionCard`'ı tek-item modda kullanmaya devam et.

**Bitiş kriteri:** Yaklaşım onaylanır, dosyaya dokunulmaz.

---

### ✅ TODO 3 — `src/components/mvp/KonuCard.tsx` (yeni dosya)

**Amaç:** Tek bir konu grubunu render eden, state tutmayan presentational bileşen.

**3.1 İmports:**

```typescript
'use client'

import { Pencil, Save, Trash2, X } from 'lucide-react'
import AccordionCard from '../ui/AccordionCard'
import {
  MVP_LEVELS,
  MVP_AUTHORS,
  MVP_COLORS,
  INPUT_CLS,
  BTN_CLS,
  type KonuGroup,
  type MvpFormState,
  type MvpItem,
  type MvpLevel,
} from '@/lib/mvp-items'
```

**3.2 Props interface:**

```typescript
interface KonuCardProps {
  group: KonuGroup
  editingId: string | null
  editingState: MvpFormState
  isSubmitting: boolean
  defaultOpen: boolean
  onStartEdit: (item: MvpItem) => void
  onCancelEdit: () => void
  onUpdate: (id: string) => void
  onDelete: (id: string) => void
  onInlineUpdate: (id: string, field: 'mvp_level' | 'added_by', value: string) => void
  onEditingStateChange: React.Dispatch<React.SetStateAction<MvpFormState>>
}
```

**3.3 Accent rengi mantığı:**
- Grupta en yüksek öncelikli MVP seviyesi vardır → rengi kart aksan rengi olur.
- Öncelik: MVP1 > MVP2 > MVP3 > Atanmadi.
- Helper:
  ```typescript
  function pickAccentColor(counts: MvpLevelCounts): string {
    if (counts.MVP1 > 0) return MVP_COLORS.MVP1
    if (counts.MVP2 > 0) return MVP_COLORS.MVP2
    if (counts.MVP3 > 0) return MVP_COLORS.MVP3
    return MVP_COLORS.Atanmadi
  }
  ```

**3.4 Render yapısı:**

```tsx
export default function KonuCard({ group, defaultOpen, ...handlers }: KonuCardProps) {
  const accentColor = pickAccentColor(group.mvpCounts)
  const cardId = `konu-${group.normalizedKey}`

  return (
    <AccordionCard
      defaultOpenId={defaultOpen ? cardId : undefined}
      items={[{
        id: cardId,
        title: group.konu,
        badge: `${group.items.length} madde`,
        accentColor,
        children: (
          <div className="space-y-4">
            {/* 3.5 MVP dağılım rozetleri */}
            {/* 3.6 Desktop tablo */}
            {/* 3.7 Mobile kart listesi */}
          </div>
        ),
      }]}
    />
  )
}
```

**3.5 MVP dağılım rozetleri bloğu:**

```tsx
<div className="flex flex-wrap gap-1.5">
  {(['MVP1', 'MVP2', 'MVP3', 'Atanmadi'] as const).map((lvl) =>
    group.mvpCounts[lvl] > 0 ? (
      <span
        key={lvl}
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
        style={{
          backgroundColor: `${MVP_COLORS[lvl]}15`,
          color: MVP_COLORS[lvl],
          border: `1px solid ${MVP_COLORS[lvl]}30`,
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: MVP_COLORS[lvl] }}
        />
        {lvl}: {group.mvpCounts[lvl]}
      </span>
    ) : null,
  )}
</div>
```

**3.6 Desktop tablo bloğu:**
Mevcut `MvpManager.tsx` satır 265-328 arasındaki tablo birebir kopyalanır, ancak:
- `items.map(...)` yerine `group.items.map(...)`.
- Tüm handler çağrıları props'tan gelen fonksiyonlara yönlendirilir.
- `setEditingState` → `onEditingStateChange`.
- İnline updates için `onInlineUpdate(item.id, 'mvp_level', value)`.
- `startEdit` → `onStartEdit`, `cancelEdit` → `onCancelEdit`, `handleUpdate` → `onUpdate`, `handleDelete` → `onDelete`.

**3.7 Mobile kart listesi bloğu:**
Mevcut `MvpManager.tsx` satır 330-382 arasındaki mobil kart listesi birebir kopyalanır, aynı handler yönlendirmeleri yapılır.

**Bitiş kriteri:** Dosya derleniyor, hiç state tutmuyor, sadece props kullanıyor.

---

### ✅ TODO 4 — `src/components/mvp/MvpManager.tsx` — Eski render bloklarını kaldır

**Amaç:** Konu-bazlı render'a geçmeden önce eski gösterim kodunu sil.

**Silinecek bloklar:**

1. **Satır ~43-45** — MVP seviye bazlı memos:
   ```typescript
   const mvp1Items = useMemo(...)
   const mvp2Items = useMemo(...)
   const mvp3Items = useMemo(...)
   ```

2. **Satır ~18-23** — Dosya-içi `MVP_COLORS` tanımı (artık `mvp-items.ts`'ten import).

3. **Satır ~25-29** — Dosya-içi `INPUT_CLS` ve `BTN_CLS` tanımları.

4. **Satır ~190-252** — Üstteki "MVP Kartları" AccordionCard bloğu (mvp1/mvp2/mvp3 özet kartları).

5. **Satır ~265-328** — Desktop tablo bloğu (`<div className="hidden overflow-x-auto ... md:block">...</div>`).

6. **Satır ~330-382** — Mobil kart listesi bloğu (`<div className="space-y-3 md:hidden">...</div>`).

**Korunan bloklar (dokunma):**
- State tanımları (`items`, `isLoading`, `isSubmitting`, `error`, `formState`, `editingId`, `editingState`).
- Tüm handler fonksiyonları (`loadItems`, `handleCreate`, `startEdit`, `cancelEdit`, `handleInlineUpdate`, `handleUpdate`, `handleDelete`).
- `useEffect` hook.
- Başlık bloğu (`<h2>MVP Yapısal Liste</h2>` + açıklama).
- Error gösterimi.
- Loading / empty state UI'ları (yer değişecek ama kalacak).
- "Yeni Madde Ekle" formu — **sayfanın altında aynen kalacak**.

**Bitiş kriteri:** Dosya derleniyor; sayfa yüklendiğinde sadece başlık ve form görünüyor (listeler yok — sonraki adımda eklenecek).

---

### ✅ TODO 5 — `MvpManager.tsx` içine `KonuCard` render'ını ekle

**Amaç:** `konuGroups` üzerinden tek sütun liste şeklinde kart render'ını kur.

**5.1 Import eklemeleri:**

```typescript
import KonuCard from './KonuCard'
import {
  MVP_LEVELS,
  MVP_AUTHORS,
  MVP_COLORS,        // artık lib'den
  INPUT_CLS,         // artık lib'den
  BTN_CLS,           // artık lib'den
  createEmptyMvpFormState,
  groupItemsByKonu,  // yeni
  mapMvpRow,
  type MvpFormState,
  type MvpItem,
  type MvpItemRow,
  type MvpLevel,
} from '@/lib/mvp-items'
```

**5.2 Gruplama memo'su (handler'ların altına, render'dan önce):**

```typescript
const konuGroups = useMemo(() => groupItemsByKonu(items), [items])
```

**5.3 Render bloğu (eski liste bloklarının yerine):**

```tsx
<div className="space-y-4">
  {isLoading ? (
    <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-8 text-center text-sm text-gray-400">
      Yükleniyor…
    </div>
  ) : items.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
      Henüz madde yok.
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      {konuGroups.map((group) => (
        <KonuCard
          key={group.normalizedKey}
          group={group}
          editingId={editingId}
          editingState={editingState}
          isSubmitting={isSubmitting}
          defaultOpen={group.mvpCounts.Atanmadi > 0}
          onStartEdit={startEdit}
          onCancelEdit={cancelEdit}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onInlineUpdate={handleInlineUpdate}
          onEditingStateChange={setEditingState}
        />
      ))}
    </div>
  )}
</div>
```

**5.4 Yerleşim sırası (sayfa içinde yukarıdan aşağı):**
1. `<h2>MVP Yapısal Liste</h2>` başlık + açıklama
2. Error banner (varsa)
3. Konu kartları listesi (veya loading / empty state)
4. "Yeni Madde Ekle" AccordionCard formu

**Bitiş kriteri:** Sayfa açıldığında konu bazlı kartlar tek sütun dikey listede görünüyor; Atanmadi olan kartlar açık geliyor; form altta.

---

### ✅ TODO 6 — Temizlik ve doğrulama

**6.1 Kullanılmayan import'ları temizle:**
- `MvpManager.tsx`: `Plus` hâlâ formda kullanılıyor mu kontrol et, değilse sil.
- `useMemo` hâlâ `konuGroups` için kullanılıyor → kalır.
- Eski MVP seviye memos gittiği için ilgili import'lar kalırsa temizle.

**6.2 Tip doğrulama:**
```bash
npx tsc --noEmit
```
Hata çıkarsa düzelt. Muhtemel hata kaynakları:
- `KonuGroup` tip export eksik
- `MVP_COLORS` tip değişikliği (`Record<string, string>` → `Record<MvpLevel, string>`)
- `onEditingStateChange` prop tipinin setState signature ile uyumu

**6.3 Lint:**
```bash
npm run lint
```
Varsa uyarıları temizle.

**6.4 Derleme kontrolü:**
```bash
npm run build
```
Prod build'in yeşil geçmesi.

**Bitiş kriteri:** Sıfır TS hatası, sıfır lint uyarısı, build başarılı.

---

### ✅ TODO 7 — Manuel smoke test (dev sunucu)

**Önkoşul:** `npm run dev` başlat, `http://localhost:3000/mvpitems` aç.

**Test senaryoları:**

| # | Adım | Beklenen Sonuç |
|---|------|----------------|
| 1 | Sayfayı aç | Konu bazlı kartlar görünür; Atanmadi itemi olan kartlar açık, diğerleri kapalı |
| 2 | Bir kart başlığına tıkla | Kart aç/kapa çalışır, chevron döner |
| 3 | Kart içinde inline MVP seviyesini değiştir | Değişiklik Supabase'e yansır, MVP dağılım rozeti güncellenir |
| 4 | Kart içinde "Kim" seçimini değiştir | Kaydedilir, UI güncellenir |
| 5 | Bir item'ı "Düzenle" ile düzenle, Kaydet | Doğru gruba kalır (konu değişmediyse), değişiklikler görünür |
| 6 | Bir item'ın konusunu düzenle (mevcut konuyu farklı konu yap) → Kaydet | Item eski grup kartından çıkar, yeni/uygun gruba düşer |
| 7 | Bir item'ı Sil | Item gider; grup boşalırsa kart tamamen kaybolur |
| 8 | Yeni madde ekle — yeni konu | Yeni kart oluşur (sıralamaya göre doğru konuma girer) |
| 9 | Yeni madde ekle — mevcut konu (farklı case: "rezervasyon sistemi" vs "Rezervasyon Sistemi") | Aynı karta eklenir (normalizasyon çalışıyor) |
| 10 | Tüm itemleri sil (veya tablo boş) | "Henüz madde yok" empty state görünür |
| 11 | Mobil görünüm (< 768px) | Kart içindeki tablo yerine mobil kart listesi, tek sütun, okunabilir |
| 12 | MVP dağılım rozetleri | Kart açıldığında MVP1/MVP2/MVP3/Atanmadi sayıları renkli chip olarak üstte görünür; sıfır olanlar gösterilmez |

**Bitiş kriteri:** 12 senaryonun tamamı yeşil.

---

### ✅ TODO 8 — Commit

**Önkoşul:** Kullanıcıdan explicit onay alınacak (organizasyon kuralı).

**Commit mesajı önerisi:**
```
refactor(mvp): group mvp items by konu into topic-based cards

- Add groupItemsByKonu helper with normalization (trim + lowercase)
- Add KonuCard component for per-topic render with MVP distribution badges
- Refactor MvpManager to render dynamic konu groups (single column)
- Move shared constants (MVP_COLORS, INPUT_CLS, BTN_CLS) to lib/mvp-items
- Auto-open cards that contain Atanmadi items
- Preserve full CRUD (inline edit, level/author change, delete, create)
```

---

## 5. Uygulama Sırası (Bağımlılık Grafı)

```
TODO 1 (lib güncellemesi)
    ↓
TODO 2 (AccordionCard kontrol)  ← paralel değerlendirme
    ↓
TODO 3 (KonuCard yeni dosya)
    ↓
TODO 4 (MvpManager eski kodu sil)
    ↓
TODO 5 (MvpManager yeni render)
    ↓
TODO 6 (temizlik + tsc + lint + build)
    ↓
TODO 7 (manuel smoke test)
    ↓
TODO 8 (commit — kullanıcı onayı ile)
```

---

## 6. Risk Değerlendirmesi

| Risk | Seviye | Açıklama | Azaltma |
|------|--------|----------|---------|
| Konu alanında boş string ile tek başına "Diğer" grubu oluşur | LOW | Beklenen davranış | `'__diger__'` sabit anahtar, her zaman en sonda gösterilir |
| Inline düzenlemede `konu` değişirse item başka gruba atlar, kullanıcı "kayboldu" sanabilir | LOW | Animasyon/feedback yok | Opsiyonel: kaydetme sonrası hedef kartı otomatik aç (future enhancement, bu plana dahil değil) |
| Çok sayıda konu (20+) tek sütunda sayfayı uzatır | LOW | Scroll ile çözülür; tüm kartlar kapalı geleceği için sayfa kompakt | Yok |
| `MVP_COLORS` tipi `Record<string,string>`'dan `Record<MvpLevel,string>`'a dönünce tip hatası | LOW | Build zamanı yakalanır | TODO 6.2'de tsc ile doğrulanır |
| `AccordionCard` bileşeninin her kartta ayrı instance olması küçük görsel tutarsızlık yapabilir (her kart kendi açık-kapalı state'ini tutar) | LOW | İstenen davranış bu zaten | Yok |
| Eş zamanlı inline edit sırasında kullanıcı farklı karta tıklarsa `editingState` senkronizasyonu | LOW | `editingId` tek noktada, parent'ta tutuluyor | Mevcut davranış korunur |

---

## 7. Kapsam Dışı (Bu planda YOK)

- Konu başlığını yeniden adlandırma (bulk rename) UI'ı.
- Kart içinde arama/filtre.
- Sürükle-bırak ile item'ı farklı kart arasında taşıma.
- Konu bazlı toplu işlem (ör. "tüm Atanmadi'leri MVP3 yap").
- Kartları kullanıcı tercihine göre açık/kapalı durumunu localStorage'a kaydetme.
- Supabase tablo şeması değişikliği.

---

## 8. Tahmini Efor

| Adım | Süre |
|------|------|
| TODO 1 (lib) | ~20 dk |
| TODO 2 (AccordionCard kontrol) | ~5 dk |
| TODO 3 (KonuCard) | ~45 dk |
| TODO 4 (MvpManager temizle) | ~15 dk |
| TODO 5 (MvpManager yeni render) | ~25 dk |
| TODO 6 (doğrulama) | ~15 dk |
| TODO 7 (smoke test) | ~20 dk |
| TODO 8 (commit) | ~5 dk |
| **Toplam** | **~2.5 saat** |

---

## 9. Bitişte Beklenen Durum

- `/mvpitems` sayfası konu bazlı kartlarla doludur; tek sütun, mobil uyumlu.
- Her kart: başlık + madde sayısı + renkli aksan + aç/kapa chevron.
- Kart içinde: MVP dağılım rozetleri + tam fonksiyonel tablo/mobil kart + inline edit/sil.
- Atanmadi item'ı olan kartlar default açık → kullanıcı atama yapmaya odaklanır.
- "Yeni Madde Ekle" formu altta aynen çalışır.
- `MvpManager.tsx` 437 satırdan ~280 satıra düşer; gösterim mantığı `KonuCard`'a izole edilir.
- TypeScript strict temiz, lint temiz, build yeşil.

---

**Plan bu dosyada sabitlenmiştir. Uygulama başka bir agent tarafından, bu dokümanı kaynak alarak yapılacaktır. Bu dosyadaki TODO'lara sırasıyla uyulmalı, her TODO'nun "Bitiş kriteri" karşılanmalıdır.**
