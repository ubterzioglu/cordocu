# Toplanti Notlari Veri Giris Kurallari

Bu not, `/toplantiozet` sayfasindaki Toplanti Ozetleri ve WA Konusma Ozetleri bolumune yeni veri girerken izlenecek kurallari kaydetmek icin olusturuldu.

## Veri Akisi

- Sayfa: `src/pages/toplantiozet.tsx`
- UI manager: `src/components/meetingnotes/MeetingNotesManager.tsx`
- Veri katmani: `src/lib/meeting-notes-data.ts`
- Supabase tablo: `public.meeting_notes`
- Toplu seed/migration ornekleri: `supabase/migrations/*meeting_notes*.sql`

Uygulama `meeting_notes` tablosundan `id, title, content, date, category, source, sort_order` alanlarini okur ve `sort_order` artan sirayla listeler. Ayni `content + date` kombinasyonlari UI tarafinda normalize edilip tekil gosterilir.

## Tablo Alanlari

- `title`: Kisa baslik. Mevcut kod yeni kayitta `content.slice(0, 80)` kullanir.
- `content`: Kullaniciya gorunen asil madde metni.
- `date`: Kisa tarih/kaynak etiketi. Ornek: `17 Nisan`, `17 Nisan WA`, `Dashboard`.
- `category`: Asagidaki kategori id degerlerinden biri.
- `source`: Asagidaki kaynak kodlarindan biri.
- `sort_order`: Liste sirasi. Toplu kayitlarda bilincli araliklarla verilir; manuel UI kayitlari `9999` ile eklenir.

## Kategoriler

- `rezervasyon-sistemi`: Rezervasyon Sistemi
- `kullanici-kisitlamalari`: Kullanici Kisitlamalari
- `audit-kayitlari`: Audit Kayitlari
- `veritabani-tasarimi`: Veritabani Tasarimi
- `mvp-hedefleri`: MVP Hedefleri
- `reklam-modeli`: Reklam Modeli

Yeni maddeyi bu mevcut kategorilerden en yakina koy. Kategori yetmiyorsa once `MEETING_CATEGORIES` ve ilgili UI/filter etkisini guncelle, sonra veri gir.

## Kaynaklar

- `T1`: Toplanti 1, 26 Subat
- `T2`: Toplanti 2, 12 Mart
- `T3`: Toplanti 3, 9 Nisan
- `T4`: Toplanti 4, 17 Nisan
- `WA`: WhatsApp yazismalari
- `NO`: Notion kararlar
- `MAN`: Manuel/dashboard girisi

UI'daki "Yeni Madde Ekle" formu kaynagi otomatik `MAN` olarak acar. Mevcut satiri duzenlerken kaynak secilebilir. Toplu veri girisinde dogrudan migration ile dogru `source` yazilir.

## Giris Kurallari

- Ham notlari birebir uzun paragraf olarak basma; karar, aksiyon, varsayim veya stratejik bilgi olarak tek cumlelik maddelere ayir.
- Her madde tek fikir tasimasi hedeflensin. Bir mesajda iki karar varsa iki satir yap.
- `content` metni anlam kaybetmeden temizlenir: gereksiz sohbet dili, tekrarlar ve dolgu ifadeleri atilir.
- Kisi, marka, domain, tarih ve sayisal hedefler korunur.
- Belirsiz yorumlar karar gibi yazilmaz; gerekirse "gundeme geldi", "arastirilacak", "netlestirilecek" gibi durum dili kullanilir.
- WhatsApp kaynakli maddelerde `date` genelde `Gun Ay WA` formatinda tutulur.
- Toplanti kaynakli maddelerde `date` genelde `Gun Ay` formatinda tutulur.
- Duplicate kontrolu icin ayni `content + date` tekrar girilmez.
- Toplu migrationlarda `sort_order` mevcut araligi bozmadan devam ettirilir.
- Guncel guvenlik kuralina gore anonim kullanici sadece okuyabilir; insert/update/delete icin authenticated oturum gerekir.

## Toplu Veri Giris Formati

Yeni ham data geldiyse tercih edilen yontem yeni bir Supabase migration dosyasi acmaktir:

```sql
insert into meeting_notes (title, content, date, category, source, sort_order) values
('WA3-01', 'Tek cumlelik karar veya aksiyon maddesi.', '24 Nisan WA', 'mvp-hedefleri', 'WA', 300);
```

Basliklar kaynak bazli ve sirali tutulur: `T4-01`, `WA3-01`, `NO-01` gibi. `title` sadece teknik/kisa kimliktir; kullaniciya asil olarak `content` gorunur.
