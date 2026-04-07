```md
# KORTEX  
## Global Türk Rehberi Platformu – Ürün ve İçerik Tasarım Dökümanı (MVP v1)

---

# 1. Platform Tanımı

**Kortex**, dünyanın farklı şehirlerinde yaşayan Türklerin günlük hayatını kolaylaştırmak için oluşturulan global bir dijital platformdur.

Platform, aşağıdaki alanları tek bir merkezde toplar:

- Türk işletmeleri
- Türk profesyoneller
- Türk toplulukları
- WhatsApp / Telegram grupları
- Etkinlikler
- İş fırsatları
- Yerel rehber bilgileri

Amaç, dünyanın her yerindeki Türkler için **tek bir bilgi ve bağlantı merkezi** oluşturmaktır.

---

# 2. Platform Hedefleri

Platform üç ana problemi çözmeyi hedefler.

## 1. Yerel bilgi eksikliği

Yeni bir şehirde yaşayan Türklerin şu soruları olur:

- Türk doktor var mı?
- Türk avukat var mı?
- Türk market nerede?
- Türk kuaför var mı?

Kortex bu bilgileri tek platformda sunar.

---

## 2. Topluluk erişimi

Türklerin katılabileceği topluluklar:

- WhatsApp grupları
- Telegram grupları
- öğrenci toplulukları
- dernekler
- networking grupları

---

## 3. Sosyal ve profesyonel bağlantı

Platform üzerinden:

- etkinlikler
- iş fırsatları
- networking
- profesyonel hizmetler

görünür hale gelir.

---

# 3. Hedef Kitle

Platform tüm diaspora Türklerini kapsar.

## Kullanıcı grupları

- yurtdışında yaşayan Türkler
- yeni göç edenler
- öğrenciler
- profesyoneller
- Türk işletme sahipleri
- Türk topluluk yöneticileri
- etkinlik organizatörleri

---

# 4. Platform Yapısı

Platform veri yapısı şu hiyerarşiye sahiptir.

```

Country
↓
City
↓
Category
↓
Listing

```

### Örnek yapı

```

Germany
→ Berlin
→ Restaurants
→ Anadolu Grill

```

---

# 5. Kullanıcı Sistemi

Platformu kullanmak için **login zorunludur**.

## Kullanıcı rolleri

### Normal kullanıcı

- içerik görüntüleyebilir
- yorum yazabilir
- içerik ekleyebilir

### İşletme sahibi

- işletme sayfası oluşturabilir
- işletmesini yönetebilir
- işletmesini sahiplenebilir (claim)

### Topluluk yöneticisi

- grup ekleyebilir
- etkinlik oluşturabilir

### Moderatör

- içerik onaylar
- spam kontrolü yapar
- yanlış içerikleri düzenler

---

# 6. İşletme Sahiplenme (Claim System)

Bir işletme şu şekilde platforma eklenebilir:

1. bir kullanıcı işletmeyi ekler
2. işletme sahibi platforma gelir
3. işletmeyi **claim eder**
4. moderasyon onayı sonrası yönetimi devralır

---

# 7. Kategori Sistemi

Platform geniş kategori yapısına sahip olacaktır.

## Sağlık

- doktor
- dişçi
- psikolog
- psikiyatrist
- fizyoterapist
- klinik
- hastane
- veteriner

## Hukuk ve danışmanlık

- avukat
- göçmenlik danışmanı
- vergi danışmanı
- muhasebeci
- sigorta danışmanı

## Günlük yaşam

- market
- kasap
- manav
- fırın
- kuaför
- berber
- güzellik salonu
- terzi

## Yeme içme

- restoran
- kafe
- pastane
- kebapçı
- dönerci
- tatlıcı

## Eğitim

- Türk okulları
- dil kursları
- özel ders verenler
- üniversite toplulukları

## Hizmetler

- emlak danışmanları
- taşınma firmaları
- temizlik hizmetleri
- elektrikçi
- tesisatçı
- IT hizmetleri

## İş ve kariyer

- iş ilanları
- freelancer hizmetleri
- kariyer danışmanlığı

## Topluluklar

- WhatsApp grupları
- Telegram grupları
- Discord toplulukları
- dernekler
- öğrenci toplulukları

## Etkinlikler

- konserler
- networking etkinlikleri
- konferanslar
- kültürel etkinlikler
- meetup etkinlikleri
- Türk festivalleri

---

# 8. Listing Veri Modeli

Her işletme veya kişi için geniş veri tutulur.

## Temel bilgiler

- isim
- kategori
- şehir
- ülke
- açıklama

## İletişim

- telefon
- WhatsApp
- email
- website
- sosyal medya

## Lokasyon

- adres
- harita konumu
- Google Maps entegrasyonu

## İşletme bilgileri

- çalışma saatleri
- hizmetler
- fiyat aralığı

## Medya

- fotoğraflar
- videolar

## Ek bilgiler

- konuşulan diller
- rezervasyon bilgisi
- ödeme yöntemleri

---

# 9. Harita Sistemi

Platform harita tabanlı kullanım sunacaktır.

Kullanıcılar:

- şehirdeki Türk işletmeleri
- profesyoneller
- etkinlikler

harita üzerinden görüntüleyebilir.

---

# 10. AI Arama Sistemi

Platform klasik filtrelerin yanında **AI destekli arama** içerecektir.

Örnek aramalar:

- “Berlin’de Türk dişçi”
- “Paris’te Türk market”
- “Amsterdam’da Türk psikolog”

AI arama şu verileri analiz eder:

- şehir
- kategori
- hizmet dili
- kullanıcı puanı

---

# 11. Çok Dilli Destek

Platform birden fazla dili destekleyecektir.

Planlanan diller:

- Türkçe
- İngilizce
- Almanca

İleride farklı diller eklenebilir.

---

# 12. Türkçe Hizmet Veren İşletmeler

Platform yalnızca Türk işletmelerini değil aynı zamanda:

**Türkçe hizmet veren işletmeleri** de listeleyebilir.

Örnek:

- Türkçe konuşan doktor
- Türkçe hizmet veren banka
- Türkçe bilen danışman

---

# 13. WhatsApp ve Topluluk Sistemi

Platform WhatsApp gruplarını listeleyecektir.

Platform:

- yalnızca grup linki paylaşır
- grupları yönetmez
- moderasyon yapmaz

Grup yönetimi tamamen adminlere aittir.

---

# 14. Etkinlik Sistemi

Platform her tür etkinliği destekler.

## Etkinlik türleri

- konser
- meetup
- networking
- kültürel etkinlik
- konferans
- festival
- workshop

Etkinlik sayfasında:

- tarih
- konum
- açıklama
- bilet linki

yer alır.

---

# 15. Yorum ve Puanlama Sistemi

Kullanıcılar:

- işletmeleri puanlayabilir
- yorum yazabilir

Bu sistem platformda güven oluşturur.

---

# 16. Güven ve Doğrulama

Platform doğrulanmış içerikler sunmayı hedefler.

## doğrulama rozetleri

- doğrulanmış işletme
- doğrulanmış profesyonel
- doğrulanmış topluluk

---

# 17. Moderasyon Sistemi

Platform spam ve yanlış içerikleri engellemek için moderasyon içerir.

## moderasyon araçları

- içerik onayı
- kullanıcı raporlama
- spam filtreleri
- moderatör paneli

---

# 18. Gelir Modeli (Gelecek)

MVP aşamasında platform ücretsiz olacaktır.

Gelecekte eklenebilecek gelir modelleri:

- premium listing
- sponsorlu içerik
- reklam alanları
- premium işletme sayfaları

---

# 19. Uzun Vadeli Vizyon

Kortex uzun vadede:

- dünyanın en büyük **Türk rehberi**
- global **Türk network platformu**
- diaspora için **bilgi merkezi**

olmayı hedefler.
```
