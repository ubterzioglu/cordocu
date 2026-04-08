# KORTEX / TÜRK DİASPORA AĞI  
## Birleştirilmiş MVP Ürün, İçerik ve Gereksinim Dökümanı (Birleşik Sürüm)

> Bu doküman, iki ayrı kaynaktaki ürün vizyonu, MVP gereksinimleri, içerik yapısı ve teknik karar başlıkları birleştirilerek hazırlanmıştır. Platformun temel amacı; yurt dışında yaşayan Türkler için bilgi, bağlantı, hizmet ve topluluk erişimini tek merkezde toplamaktır. fileciteturn0file0L1-L9 fileciteturn0file1L1-L18

---

## 1. Platform Tanımı

**Kortex** / **Türk Diaspora Ağı**, dünyanın farklı şehirlerinde yaşayan Türklerin günlük hayatını kolaylaştırmak için tasarlanan global bir dijital platformdur. Platform; Türk işletmelerini, profesyonelleri, toplulukları, etkinlikleri, iş fırsatlarını, kuponları ve yerel rehber bilgilerini tek çatı altında toplar. Ana fikir, diaspora için “tek bir bilgi ve bağlantı merkezi” oluşturmaktır. fileciteturn0file1L6-L17 fileciteturn0file0L11-L18

### Tek cümlelik değer önerisi
**Diaspora için rehber, bağlantı merkezi ve çok amaçlı dijital yardımcı.** Kaynak dokümanlardan birinde bu yaklaşım “Diaspora Rehberi, İsviçre Çakısı” şeklinde ifade edilmiştir. fileciteturn0file0L16-L18

---

## 2. Temel Problem ve Çözüm

Platform üç ana problemi çözmeyi hedefler:

### 2.1 Yerel bilgi eksikliği
Yurt dışında yaşayan Türkler çoğu zaman şu tür sorulara hızlı ve güvenilir cevap bulamaz:
- Türk doktor var mı?
- Türk avukat var mı?
- Türk market nerede?
- Türk kuaför, muhasebeci, danışman veya psikolog var mı?

Kortex bu bilgileri şehir ve kategori bazlı olarak tek yerde toplamayı hedefler. fileciteturn0file1L22-L33

### 2.2 Topluluklara erişim eksikliği
Diaspora üyeleri çoğu zaman kendi çevresine uygun WhatsApp gruplarına, Telegram topluluklarına, öğrenci ağlarına, derneklere ve networking çevrelerine dağınık şekilde ulaşır. Platform bu erişimi kolaylaştırır. fileciteturn0file1L34-L42

### 2.3 Sosyal ve profesyonel bağlantı eksikliği
Etkinlikler, iş fırsatları, profesyonel hizmetler ve yerel fırsatlar görünür olmadığında diaspora içinde değerli bağlantılar kaybolur. Platform bu görünürlüğü artırır. fileciteturn0file1L43-L50

---

## 3. Hedef Kitle ve Başlangıç Pazarları

### 3.1 Ana hedef kitle
İlk hedef kitle, Türkiye dışında yaşayan Türklerdir. Özellikle:
- yeni göç edenler
- öğrenciler
- profesyoneller
- işletme sahipleri
- danışmanlar
- topluluk yöneticileri
- etkinlik organizatörleri

önde gelen kullanıcı segmentleri olarak düşünülür. fileciteturn0file0L11-L15 fileciteturn0file1L52-L64

### 3.2 Başlangıç ülkeleri
İlk fazda odaklanılacak ülkeler:
- Almanya
- İngiltere
- UAE
- Avustralya
- Fransa
- Amerika
- Kanada fileciteturn0file0L13-L15

---

## 4. Başarı Metrikleri

MVP başarısı için öne çıkan üç kritik metrik:
- **Traction**
- **Retention**
- **Revenue** fileciteturn0file0L16-L19

Buna ek olarak ürün ilerlemesinde şu destek metrikleri de izlenebilir:
- aktif kullanıcı sayısı
- şehir bazlı içerik doluluk oranı
- claim edilen işletme sayısı
- etkinlik ve grup tıklama oranı
- işletme / danışman dönüşüm oranı

Son madde grubu bir ürünleştirme önerisidir; kaynak dokümanlarda isimleri birebir geçmese de mevcut hedef yapısıyla uyumludur.

---

## 5. Platform Bilgi Mimarisi

Platform veri yapısı aşağıdaki hiyerarşiyle kurgulanır:

**Country → City → Category → Listing** fileciteturn0file1L66-L83

### Örnek
Germany → Berlin → Restaurants → Anadolu Grill fileciteturn0file1L75-L82

Bu yapı sayesinde arama, filtreleme, şehir sayfaları, kategori listeleri ve harita görünümü aynı omurgayı paylaşır.

---

## 6. Kullanıcı Rolleri ve Hesap Sistemi

Kaynak dokümanlarda iki farklı rol yaklaşımı vardır. Birinde kullanıcı tipi iş modeline göre, diğerinde ürün kullanımına göre tanımlanmıştır. Birleştirilmiş yapı aşağıdaki gibidir:

### 6.1 Ana kullanıcı tipleri
- **Bireysel kullanıcı**
- **Danışman / profesyonel**
- **Ticari kullanıcı / işletme sahibi**
- **Ticari olmayan kuruluş / topluluk yöneticisi** fileciteturn0file0L21-L30

### 6.2 Operasyonel roller
- **Moderatör**
- **Admin**  
Moderatör içerik onayı, spam kontrolü ve rapor yönetimi için gereklidir. Bu rol ikinci dokümanda açıkça tanımlanmıştır. fileciteturn0file1L85-L104

### 6.3 Giriş sistemi
Kullanıcıların Google / Apple ile veya standart authentication flow üzerinden giriş yapması planlanır. Platform kullanımında login zorunluluğu öngörülmüştür. fileciteturn0file0L28-L30 fileciteturn0file1L85-L90

### 6.4 Profil derinliği
Profil içeriği kullanıcı tipine göre değişir. Örneğin işletme profilleri ile bireysel kullanıcı profilleri aynı zenginlikte olmayacaktır. fileciteturn0file0L30-L31

### 6.5 Doğrulama
Danışman profilleri için KYC öngörülmüştür. Ayrıca doğrulanmış işletme, doğrulanmış profesyonel ve doğrulanmış topluluk rozetleri planlanmaktadır. fileciteturn0file0L23-L24 fileciteturn0file1L226-L236

---

## 7. Claim ve Sahiplenme Sistemi

Bir işletme önce topluluk tarafından eklenebilir, daha sonra gerçek işletme sahibi gelip işletmeyi claim ederek yönetimi devralabilir. Bu işlem moderasyon onayıyla tamamlanır. Bu model veri büyümesini hızlandırırken sahipliğin sonradan doğrulanmasını mümkün kılar. fileciteturn0file1L106-L115

---

## 8. Kategori Sistemi

Platformun güçlü yönlerinden biri geniş kategori yapısıdır. Birleşik kategori çatısı şu şekilde özetlenebilir:

### 8.1 Sağlık
- doktor
- dişçi
- psikolog
- psikiyatrist
- fizyoterapist
- klinik
- hastane
- veteriner fileciteturn0file1L120-L129

### 8.2 Hukuk ve danışmanlık
- avukat
- göçmenlik danışmanı
- vergi danışmanı
- muhasebeci
- sigorta danışmanı fileciteturn0file1L131-L137

### 8.3 Günlük yaşam
- market
- kasap
- manav
- fırın
- kuaför
- berber
- güzellik salonu
- terzi fileciteturn0file1L139-L148

### 8.4 Yeme içme
- restoran
- kafe
- pastane
- kebapçı
- dönerci
- tatlıcı fileciteturn0file1L150-L157

### 8.5 Eğitim
- Türk okulları
- dil kursları
- özel ders verenler
- üniversite toplulukları fileciteturn0file1L159-L164

### 8.6 Hizmetler
- emlak danışmanları
- taşınma firmaları
- temizlik hizmetleri
- elektrikçi
- tesisatçı
- IT hizmetleri fileciteturn0file1L166-L173

### 8.7 İş ve kariyer
- iş ilanları
- freelancer hizmetleri
- kariyer danışmanlığı fileciteturn0file1L175-L179

### 8.8 Topluluklar
- WhatsApp grupları
- Telegram grupları
- Discord toplulukları
- dernekler
- öğrenci toplulukları fileciteturn0file1L181-L187

### 8.9 Etkinlikler
- konserler
- networking etkinlikleri
- konferanslar
- kültürel etkinlikler
- meetup etkinlikleri
- Türk festivalleri fileciteturn0file1L189-L196

### 8.10 Ek ticari alanlar
İlk gereksinim dokümanında ayrıca şu alanlar da öne çıkar:
- iş fırsatları
- kuponlar
- AI twin destekli hizmetler
- sponsorlu / featured içerikler fileciteturn0file0L33-L41 fileciteturn0file0L94-L102

---

## 9. Listing Veri Modeli

Her listing için tutulması önerilen veri alanları:

### 9.1 Temel bilgiler
- isim
- kategori
- ülke
- şehir
- açıklama fileciteturn0file1L200-L206

### 9.2 İletişim
- telefon
- WhatsApp
- e-posta
- website
- sosyal medya linkleri fileciteturn0file1L208-L214

### 9.3 Lokasyon
- adres
- harita konumu
- Google Maps entegrasyonu fileciteturn0file1L216-L220 fileciteturn0file0L52-L56

### 9.4 İşletme bilgileri
- çalışma saatleri
- hizmetler
- fiyat aralığı fileciteturn0file1L222-L225

### 9.5 Medya
- fotoğraflar
- videolar fileciteturn0file1L226-L229

### 9.6 Ek bilgiler
- konuşulan diller
- rezervasyon bilgisi
- ödeme yöntemleri
- puan ve yorumlar
- doğrulama durumu fileciteturn0file1L231-L234 fileciteturn0file1L214-L246

---

## 10. Arama, Filtreleme ve AI

### 10.1 İlk arama alanları
İlk gereksinim setine göre MVP'de öne çıkan arama alanları:
- kullanıcılar
- iş fırsatları
- kuponlar
- WhatsApp grupları fileciteturn0file0L33-L38

### 10.2 AI destekli arama
İkinci dokümanda klasik filtrelerin yanında AI destekli arama planlanmıştır. Örnek sorgular:
- Berlin’de Türk dişçi
- Paris’te Türk market
- Amsterdam’da Türk psikolog fileciteturn0file1L238-L252

AI arama mantığında değerlendirilecek başlıklar:
- şehir
- kategori
- hizmet dili
- kullanıcı puanı fileciteturn0file1L247-L252

### 10.3 Veri kaynakları
İlk dokümana göre AI tarafında platform verileri ve AI twin verileri birlikte düşünülmektedir. Bu başlık ürün vizyonu açısından önemlidir ancak teknik detay henüz net değildir. fileciteturn0file0L33-L35

### 10.4 Filtreleme
Planlanan temel filtreler:
- ülke
- şehir
- kullanıcı tipi
- alt kategori
- featured / sponsored durumları fileciteturn0file0L40-L41

### 10.5 Arama sonuç sıralaması
Arama sonuçları ülke, şehir, kategori, featured ve sponsored yapısına göre sıralanacaktır. fileciteturn0file0L38-L40

---

## 11. İçerik Toplama ve Veri Kaynakları

Kaynak dokümanlardaki yaklaşım birleştirildiğinde içerik üretimi ve veri toplama için aşağıdaki yollar öne çıkar:

- bireysel kullanıcı girişleri
- işletme / danışman başvuruları
- kuruluş paketleri ile dernek ve topluluk kayıtları
- toplu veri girişleri
- Google Maps entegrasyonu
- ticaret odaları ve aktif pazarlama yoluyla veri toplama
- dış kaynak API’leri (uygunsa) fileciteturn0file0L23-L31 fileciteturn0file0L44-L56

### Özel veri başlıkları
- Konsolosluk verisinin gov.tr / Dışişleri kaynaklarından API bazlı alınması düşünülmüştür. Bu başlık doğrulama ve kullanılabilirlik açısından ayrıca incelenmelidir. fileciteturn0file0L35-L36
- Doktor verisi bireysel ve toplu girişlerle büyütülecektir. fileciteturn0file0L36-L37
- Market verisi ticaret odaları, başvurular ve aktif pazarlama ile oluşturulacaktır. fileciteturn0file0L37-L38
- İş ilanları işletme kategorisi kullanıcılarından gelecektir. fileciteturn0file0L38-L39

### Henüz netleşmemiş veri başlıkları
Aşağıdaki alanlar kaynakta açık bırakılmıştır:
- ilk içerik üretim planı
- veritabanı şeması
- veri güncelleme sıklığı
- manuel veri girişi operasyonu
- medya depolama çözümü fileciteturn0file0L44-L56

---

## 12. Harita ve Lokasyon Deneyimi

Platformun harita tabanlı bir kullanıma sahip olması planlanmıştır. Kullanıcılar şehirdeki Türk işletmelerini, profesyonelleri ve etkinlikleri harita üzerinden görebilecektir. Google Maps entegrasyonu, hem listing sayfaları hem de arama deneyimi için ana bileşenlerden biri olarak görünmektedir. fileciteturn0file1L236-L237 fileciteturn0file1L216-L220 fileciteturn0file0L52-L56

---

## 13. Çok Dilli Yapı

Platformda çok dilli destek planlanmaktadır. İlk aşamada:
- Türkçe
- İngilizce
- Almanca

dilleri hedeflenmektedir. İlk gereksinim dokümanında “Dil seçeneği olacak mı?” sorusuna “Evet” cevabı verilmiştir; ikinci doküman ise dil setini netleştirmiştir. fileciteturn0file0L56-L57 fileciteturn0file1L254-L262

---

## 14. Topluluk ve Grup Sistemi

Platform WhatsApp, Telegram ve benzeri toplulukları listeleyecektir. Özellikle WhatsApp tarafında platformun rolü listeleme ve keşif sağlamak olacak; grup yönetimi ve moderasyon doğrudan grup adminlerinde kalacaktır. Bu ayrım operasyonel yükü azaltır. fileciteturn0file1L272-L280

---

## 15. Etkinlik Sistemi

Etkinlik modülü aşağıdaki etkinlik tiplerini destekleyecek şekilde kurgulanır:
- konser
- meetup
- networking
- kültürel etkinlik
- konferans
- festival
- workshop fileciteturn0file1L282-L296

Etkinlik sayfasında bulunması planlanan alanlar:
- tarih
- konum
- açıklama
- bilet linki fileciteturn0file1L290-L296

---

## 16. Yorum, Puanlama ve Güven

Kullanıcıların işletmeleri puanlayabilmesi ve yorum yazabilmesi güven oluşturan çekirdek mekanizmalardan biridir. İlk dokümanda ayrıca Google işletme ratinglerinin sisteme taşınması fikri yer alır. Birleştirilmiş yapıda hem platform içi puanlar hem de dış kaynak referansları değerlendirilebilir. fileciteturn0file1L298-L304 fileciteturn0file0L30-L31

---

## 17. Moderasyon ve Güvenlik Katmanı

Platformda moderasyon ihtiyacı nettir. İkinci dokümanda önerilen moderasyon araçları:
- içerik onayı
- kullanıcı raporlama
- spam filtreleri
- moderatör paneli fileciteturn0file1L306-L317

İlk dokümanda güvenlik önlemleri başlığı açık bırakılmıştır; bu nedenle güvenlik tarafı ayrıca teknik tasarım konusu olarak ele alınmalıdır. Özellikle:
- auth güvenliği
- KYC süreçleri
- role-based access control
- rate limiting
- içerik suistimali önleme
- yedekleme ve loglama

başlıkları netleştirilmelidir. Buradaki alt maddeler bir ürün/teknik öneridir; kaynakta karar ihtiyacı olarak işaretlenmiştir. fileciteturn0file0L70-L77

---

## 18. UI/UX Çerçevesi

Kaynak dokümanlara göre:
- mobil uyumluluk zorunludur
- pastel tonlar önerilir
- Türk kuruluşlarında kırmızı kullanılabilir
- marka adı CorteQS/Kortex ekseninde düşünülmektedir
- 19 ila 24 ekranlık bir MVP tasarımı öngörülmektedir
- onboarding süreci KYC, Google auth ve profil unlock gibi adımları içerebilir fileciteturn0file0L59-L67

Bu nedenle bilgi mimarisine göre ekran aileleri kabaca şu şekilde planlanabilir:
- home
- country page
- city page
- category page
- listing detail
- search results
- map view
- event detail
- community detail
- profile
- dashboard
- claim flow
- moderation panel
- onboarding screens

Son paragraftaki ekran grupları, kaynakta verilen toplam ekran beklentisine göre türetilmiş öneri niteliğindedir.

---

## 19. Teknik Altyapı ve Açık Teknik Kararlar

İlk dokümanda teknik altyapı başlığında önemli boşluklar bulunmaktadır. Açık karar gerektiren ana alanlar şunlardır:

- teknoloji stack
- hosting sağlayıcısı
- veritabanı çözümü
- güvenlik önlemleri
- yedekleme stratejisi
- analitik araçları fileciteturn0file0L69-L77 fileciteturn0file0L103-L111

### Kaynakta verilen teknik çerçeve
- günlük kullanıcı kapasitesi hedefi: **100K**
- SSL sertifikası: **olacak**
- ölçeklenebilirlik yaklaşımı: diaspora altyapısının başka diasporalara da uyarlanabilmesi fileciteturn0file0L73-L76

### Bu aşamada önerilen teknik yön
Kaynaklarda stack belirtilmemiş olsa da ürün ihtiyaçlarına göre aşağıdaki yapı güçlü aday görünür:
- frontend: Next.js
- backend / auth / db: Supabase
- harita: Google Maps
- medya: object storage
- analytics: PostHog veya GA4
- ödeme: Stripe / ülke bazlı alternatif

Bu bölüm öneri niteliğindedir; kaynak dokümanlardaki boş teknik başlıkları tamamlamak için eklenmiştir.

---

## 20. Hosting, Ölçeklenebilirlik ve Operasyon

Kaynaklarda hosting sağlayıcısı açık bırakılmıştır. Ancak ihtiyaçlardan hareketle sistemin:
- çok ülkeli veri yapısı
- medya yükleme
- harita kullanımı
- çoklu rol ve moderasyon
- AI arama
- 100K günlük kullanıcı hedefi

gibi gereksinimleri karşılayacak şekilde seçilmesi gerektiği açıktır. fileciteturn0file0L69-L77

Bu nedenle altyapı seçiminde şu kriterler aranmalıdır:
- hızlı geliştirme
- role-based auth desteği
- storage entegrasyonu
- search-friendly veri modeli
- CDN desteği
- backup / restore kolaylığı

Bu kriterler birleşik teknik değerlendirme önerisidir.

---

## 21. Pazarlama ve Lansman

### Kaynakta tanımlanan lansman yaklaşımı
- beta kullanıcılar kurucular tarafından bulunacak
- lansman hedefi 4–6 ay
- ilk pazarlama kanalları Instagram, Facebook, LinkedIn
- sosyal medya hesapları açılacak
- THY tarafında master sponsor vizyonu düşünülüyor fileciteturn0file0L79-L86

Bu başlık ürün stratejisi açısından net; ancak sponsorlu yapı ve ortaklık süreci ayrı bir iş geliştirme planı gerektirir.

---

## 22. Gelir Modelleri

İki doküman arasında bu başlıkta önemli bir tamamlayıcılık vardır.

### 22.1 MVP / erken dönem yaklaşımı
İkinci dokümanda MVP aşamasında ürünün ücretsiz olacağı, gelir modellerinin daha sonra devreye girebileceği belirtilmiştir. fileciteturn0file1L319-L327

### 22.2 Uzun vadeli gelir kalemleri
İlk dokümanda çok daha detaylı gelir yapısı tanımlanmıştır:
- üyelik paketleri
- reklamlar
- sponsorlar
- webinarlar
- iş ilanları
- kupon satışı
- online görüşme
- AI twin bakım
- sosyal medya paketi
- business paket
- micro site / web site / app paketleri
- dernek aidatı / etkinlik bileti fileciteturn0file0L88-L95

### 22.3 Gelir elde edilecek ana segmentler
- bireysel danışmanlar
- işletmeler
- kuruluşlar fileciteturn0file0L96-L97

### 22.4 Freemium
Temel özellikler tüm kullanıcılar için açık olacak şekilde freemium model düşünülmektedir. fileciteturn0file0L97-L98

### 22.5 İşletmelere özel paketler
- kupon satışı
- haritada öne çıkma
- ücretli / AI twin görüşme imkanı fileciteturn0file0L98-L100

### 22.6 İlk yıl hedefi
- 2000 işletme + danışman
- 100K kullanıcı
- 200K Euro gelir fileciteturn0file0L100-L102

---

## 23. Analitik ve Geri Bildirim

Kaynaklara göre:
- kullanıcı geri bildirimi destek / geri bildirim adresi üzerinden toplanacak
- analitik araçları henüz seçilmemiş durumda fileciteturn0file0L105-L107

Bu nedenle analitik tarafında en azından şu temel event seti önerilir:
- search performed
- listing viewed
- claim started / completed
- event clicked
- contact clicked
- signup completed
- city/category engagement

Bu event önerileri ürün analitiği taslağıdır.

---

## 24. Yol Haritası

### MVP
- şehir / kategori / listing yapısı
- login ve profil sistemi
- işletme / topluluk / etkinlik ekleme
- arama ve filtreleme
- harita görünümü
- temel moderasyon
- çok dilli temel yapı

Bu bileşenler iki dokümanın ortak kesişiminden çıkarılmıştır. fileciteturn0file0L33-L41 fileciteturn0file1L66-L317

### V2
- mobil uygulama
- daha güçlü AI öneri sistemi
- gelişmiş monetization
- premium sayfalar
- gelişmiş doğrulama ve rozet sistemi fileciteturn0file0L106-L108 fileciteturn0file1L319-L327

---

## 25. Açık Karar Gerektiren Konular

Birleşik okumaya göre hâlâ netleştirilmesi gereken kritik başlıklar:

1. Nihai marka adı: **Kortex / CorteQS / Türk Diaspora Ağı** ilişkisi nasıl kurulacak?
2. Teknoloji stack kesinleşecek mi?
3. Hosting ve deployment stratejisi ne olacak?
4. Veritabanı şeması nasıl tasarlanacak?
5. Medya depolama nerede tutulacak?
6. AI öneri mekanizması MVP’ye girecek mi?
7. Analitik aracı ne olacak?
8. Güvenlik ve yedekleme standardı nasıl tanımlanacak?
9. Moderasyon yükü manuel mi, yarı otomatik mi ilerleyecek?
10. Başlangıçta kaç ülke gerçekten aktif açılacak?

Bu maddeler, açık bırakılan kaynak başlıklarının konsolide edilmiş karar listesi olarak hazırlanmıştır. fileciteturn0file0L42-L77 fileciteturn0file0L103-L111

---

## 26. CTO / Product Lead İçin Öncelikli Aksiyonlar

### Birinci öncelik
- teknoloji stack kararı
- veritabanı şema taslağı
- auth ve rol modeli
- listing veri modeli
- moderasyon akışı
- harita entegrasyon planı fileciteturn0file0L116-L127

### İkinci öncelik
- onboarding akışı
- claim sistemi
- çoklu dil mimarisi
- içerik giriş operasyonu
- ilk ülke ve şehir kapsamı

### Üçüncü öncelik
- monetization altyapısı
- analytics
- sponsorlu / featured listing mantığı
- AI arama ve AI twin yaklaşımı

---

## 27. Tek Bakışta Özet

- Platform, diaspora için global bir Türk rehberi ve bağlantı merkezi olarak konumlanıyor. fileciteturn0file1L6-L17
- İlk odak kullanıcı kitlesi yurt dışında yaşayan Türkler. fileciteturn0file0L11-L15
- Başlangıç ülkeleri yedi pazarı kapsıyor. fileciteturn0file0L13-L15
- Yapı; ülke, şehir, kategori ve listing omurgası üzerine kurulu. fileciteturn0file1L66-L83
- Kullanıcı, işletme, topluluk ve moderasyon katmanları tanımlanmış durumda. fileciteturn0file0L21-L31 fileciteturn0file1L85-L115
- Gelir modeli uzun vadede oldukça geniş; MVP tarafında sade başlanabilir. fileciteturn0file0L88-L102 fileciteturn0file1L319-L327
- En büyük eksik alan teknik kararların netleşmemiş olması. fileciteturn0file0L69-L77

---

## 28. Sonuç

Bu birleşik doküman, bir taraftaki yüksek seviyeli ürün ve içerik vizyonunu, diğer taraftaki MVP soru-cevap tabanlı gereksinim setiyle bir araya getirir. Sonuç olarak elinizde artık:
- daha net bir ürün tanımı,
- daha somut bir kullanıcı ve içerik yapısı,
- daha görünür teknik boşluklar,
- daha uygulanabilir bir MVP çerçevesi

bulunmaktadır. Kaynak dokümanlardaki bazı başlıklar hâlâ açık olduğu için bu metin, tamamlanmış nihai PRD değil; güçlü bir **birleşik temel döküman** olarak değerlendirilmelidir. fileciteturn0file0L103-L127 fileciteturn0file1L329-L336
