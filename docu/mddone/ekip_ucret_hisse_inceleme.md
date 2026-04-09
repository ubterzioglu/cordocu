# EKİP_ÜCRET_HİSSE.xlsx İnceleme Notları

## Genel anladığım yapı

Bu dosya, erken aşama bir ekibin **kadro planı**, **işe alım durumu**, **örnek ücret bantları** ve **kesinleşmemiş hisse (ESOP) dağılımı** için hazırlanmış bir çalışma dosyası.

Öne çıkan çerçeve:

- Toplam tanımlı rol sayısı: **16**
- Kurucu rolü: **2**
- `1. ekip` altında işaretlenmiş rol: **6**
- `2. ekip` altında işaretlenmiş rol: **1**
- Başvuranı henüz yazılmamış rol: **14**
- Ücret ve hisse alanı birlikte boş olan rol: **16**
- Standart vesting varsayımı: **4 yıl vest / 1 yıl cliff**
- `EKİP` sayfasındaki toplamlar şu an: **Ücret = 0**, **Hisse = 0**

## 1) EKİP sayfası

Bu sayfa esasen bir **işe alım ve ekip planlama tablosu**. Sütunlar şunları izliyor:

- Başvuran
- Aşama
- Kurucu / rol
- Hangi ekipte olduğu
- CV
- Görüşmeyi yapan
- Puan
- Ücret
- Hisse
- Notlar

### Rol bazında mevcut görünüm

| Rol | Ekip | Aşama | Başvuran | Ücret/Hisse Durumu |
| --- | --- | --- | --- | --- |
| Kurucu/Business | Kurucu | İşe alım | Burak Akcakanat | Boş |
| Kurucu/CTO | Kurucu | Görüşme | U. Barış Terzioğlu | Boş |
| CFO | 1. ekip | Karar bekleniyor | — | Boş |
| COO | — | — | — | Boş |
| Product Manager | 1. ekip | İşe alım yok | — | Boş |
| Front End | 1. ekip | — | — | Boş |
| Back End | 1. ekip | — | — | Boş |
| Mobile Dveloper | 1. ekip | — | — | Boş |
| Test Eng | 1. ekip | — | — | Boş |
| Data Analyst | 2. ekip | — | — | Boş |
| Dev Ops/server, Hosting | — | — | — | Boş |
| Topluluk Yöneticisi Sosyal Medya+ Ambassadors | — | — | — | Boş |
| Content Üreticisi | — | — | — | Boş |
| Event Coordinator | — | — | — | Boş |
| Partnership Manager/ Anlaşmalı yerler yöneticisi | — | — | — | Boş |
| Advisor/ Investment_VC | — | — | — | Boş |

### Bu sayfadan çıkan yorum

- İki kurucu rolü tanımlı:
  - **Kurucu/Business** → başvuran olarak *Burak Akcakanat*
  - **Kurucu/CTO** → başvuran olarak *U. Barış Terzioğlu*
- **CFO** için durum **“Karar bekleniyor”**
- **Product Manager** için not niteliğinde **“İşe alım yok”** yazılmış
- `1. ekip` için çekirdek ürün/mühendislik kadrosu düşünülmüş:
  - CFO
  - Product Manager
  - Front End
  - Back End
  - Mobile Developer
  - Test Engineer
- `2. ekip` altında şu an yalnızca **Data Analyst** görünüyor
- Son satırda ücret ve hisse toplamı için formül var; ancak ilgili hücreler boş olduğu için toplamlar şu anda **0** görünüyor

## 2) KESİN OLMAYAN HİSSE DAĞILIMI sayfası

Bu sayfa iki şeyi bir arada tutuyor:

1. Roller için **örnek maaş seviyesi + örnek ESOP yüzdesi**
2. Almanya, Londra ve Dubai için **örnek ücret bantları ve toplam bütçe**

### 2.1 Örnek hisse dağılımı çerçevesi


#### Ürün ve mühendislik çekirdeği

| Rol | Maaş Seviyesi | Örnek Hisse Opsiyonu | Not |
| --- | --- | --- | --- |
| Product Manager | Orta / Yüksek | %1.0 - %2.5 | Ürün vizyonu ve roadmap sorumluluğu. |
| Back End Developer | Yüksek | %1.0 - %2.0 | Sistemin kalbi, mimari sorumluluk. |
| Mobile Developer | Yüksek | %0.75 - %1.5 | Kullanıcı deneyiminin ana kanalı. |
| Front End Developer | Orta / Yüksek | %0.5 - %1.25 | Görselleştirme ve etkileşim. |
| DevOps / Server | Yüksek | %0.5 - %1.0 | Kesintisiz çalışma ve ölçekleme kritikliği. |
| Test Engineer | Orta | %0.2 - %0.5 | Kalite güvence, genellikle daha düşük hisse. |

#### Büyüme ve operasyon

| Rol | Maaş Seviyesi | Örnek Hisse Opsiyonu | Not |
| --- | --- | --- | --- |
| Data Analyst | Orta / Yüksek | %0.3 - %0.7 | Karar destek mekanizması. |
| Partnership Manager | Orta + Prim | %0.4 - %0.8 | İş geliştirme ve gelir odaklılık. |
| Community / Social Media | Orta | %0.1 - %0.3 | Marka sadakati ve kitle yönetimi. |
| Content Üreticisi | Orta / Düşük | %0.1 - %0.2 | Genellikle "Freelance" veya "Outsource" edilebilir. |
| Event Coordinator | Orta | %0.1 - %0.25 | Dönemsel yoğunluklu işler. |

#### Danışman / yatırımcı

| Rol | Ücret Modeli | Hisse Opsiyonu | Not |
| --- | --- | --- | --- |
| Advisor / Investment | Genellikle Maaşsız | %0.25 - %1.0 | Ağ (Network) ve sermaye erişimi sağlar. |


### 2.2 Hisse yapısından çıkan yorum

- Hisse aralıkları kesinleşmiş değil; dosya bunu zaten açıkça söylüyor
- Teknik ve kritik roller için daha yüksek hisse düşünülmüş:
  - **Product Manager**
  - **Back End Developer**
  - **Mobile Developer**
  - **DevOps / Server**
- Daha operasyonel veya dönemsel roller için daha sınırlı hisse aralıkları verilmiş:
  - **Community / Social Media**
  - **Content Üreticisi**
  - **Event Coordinator**
- Danışman / yatırımcı tarafı için yaklaşım:
  - çoğu zaman **maaşsız**
  - buna karşılık **%0.25 - %1.0** arası opsiyon

### 2.3 Örnek ücret bantları

| Rol | Almanya (EUR €) | Londra (GBP £) | Dubai (AED / yıllık) |
| --- | --- | --- | --- |
| Product Manager | 75.000 - 110.000 | 70.000 - 105.000 | 300.000 - 480.000 |
| Back End Developer | 70.000 - 95.000 | 65.000 - 100.000 | 280.000 - 450.000 |
| Mobile Developer | 70.000 - 90.000 | 65.000 - 95.000 | 260.000 - 420.000 |
| Front End Developer | 65.000 - 85.000 | 60.000 - 90.000 | 240.000 - 380.000 |
| DevOps / Server | 80.000 - 115.000 | 75.000 - 110.000 | 320.000 - 500.000 |
| Test Engineer | 55.000 - 75.000 | 50.000 - 75.000 | 180.000 - 300.000 |
| Data Analyst | 60.000 - 85.000 | 55.000 - 80.000 | 220.000 - 350.000 |
| Partnership Manager | 55.000 - 80.000 + Prim | 50.000 - 85.000 + Prim | 240.000 - 400.000 |
| Community Manager | 45.000 - 65.000 | 40.000 - 65.000 | 180.000 - 280.000 |
| Content Üreticisi | 40.000 - 60.000 | 35.000 - 60.000 | 150.000 - 250.000 |
| Event Coordinator | 45.000 - 65.000 | 40.000 - 70.000 | 180.000 - 300.000 |

### 2.4 Toplam ücret bütçesi

| Lokasyon | Toplam Alt Sınır | Toplam Üst Sınır | Para Birimi |
| --- | --- | --- | --- |
| Almanya (Berlin/Münih) | 660.000 | 925.000 | EUR (€) |
| Londra | 605.000 | 935.000 | GBP (£) |
| Dubai | 2.550.000 | 4.110.000 | AED |

### 2.5 Bütçe yorumum

- **Almanya (Berlin/Münih)** toplam ekip bütçesi: **660.000 – 925.000 EUR**
- **Londra** toplam ekip bütçesi: **605.000 – 935.000 GBP**
- **Dubai** toplam ekip bütçesi: **2.550.000 – 4.110.000 AED**
- Bu toplamlar, tabloda verilen rol bazlı alt ve üst sınırların toplanmasıyla uyumlu

## 3) GÖRVE TANIMLARI sayfası

Bu sayfa bir **pozisyon → görev tanımı** eşleştirme alanı olarak tasarlanmış.

Şu anki durum:

- `POZİSYON` kolonu, `EKİP` sayfasındaki rol isimlerini formülle çekiyor
- `GÖREV TANIMI` kolonu henüz doldurulmamış
- Yani sayfa yapı olarak hazır ama içerik olarak tamamlanmamış

Formülle çekilen pozisyonların görünen kısmı:

| Pozisyon | Görev Tanımı Durumu |
| --- | --- |
| Kurucu/Business | Boş |
| Kurucu/CTO | Boş |
| CFO | Boş |
| COO | Boş |
| Product Manager | Boş |
| Front End | Boş |
| Back End | Boş |
| Mobile Dveloper | Boş |
| Test Eng | Boş |
| Data Analyst | Boş |
| Dev Ops/server, Hosting | Boş |
| Topluluk Yöneticisi Sosyal Medya+ Ambassadors | Boş |
| Content Üreticisi | Boş |
| Event Coordinator | Boş |
| Partnership Manager/ Anlaşmalı yerler yöneticisi | Boş |
| Advisor/ Investment_VC | Boş |

## 4) Dikkat çeken eksikler / iyileştirme alanları

- Ücret ve hisse kolonlarının büyük bölümü boş; bu nedenle toplam satırı henüz karar destek verecek seviyede değil
- CV, görüşmeyi yapan, puan ve notlar kolonları büyük ölçüde boş
- `GÖRVE TANIMLARI` sayfası henüz doldurulmamış
- Dosyada küçük yazım / adlandırma tutarsızlıkları var:
  - `GÖRVE TANIMLARI` → muhtemelen `GÖREV TANIMLARI`
  - `Mobile Dveloper` → muhtemelen `Mobile Developer`
  - `KESiNLEŞEN` yazımı başlıkta tutarsız görünüyor
- `EKİP` sayfasında aşağı doğru boş satırlar bırakılmış; bu da dosyanın ileride doldurulmak üzere açık bırakıldığını düşündürüyor

## 5) Kısa sonuç

Benim anladığım kadarıyla bu dosya:

1. **Kimleri ekibe almak istediğinizi**
2. **Bu kişilerin hangi ekipte konumlanacağını**
3. **Yaklaşık maaş ve hisse çerçevesini**
4. **İleride yazılacak görev tanımlarını**

aynı çalışma kitabında bir araya getiriyor.

Henüz “kesin karar” dosyası değil; daha çok **planlama + taslak organizasyon + kompanzasyon çerçevesi** niteliğinde.
