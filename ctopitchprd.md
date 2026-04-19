## 1) Kortex temel dokümanlarının ana amacı nedir?

- Bu doküman seti, Kortex’in teknik, ürün ve yatırımcı anlatısını tek çatı altında toplamak için hazırlanmıştır.  
- Üç ana ekseni birlikte ele alır.  
- Birinci eksen **teknik devir teslim** niteliğindeki CTO Handoff dokümanıdır.  
- İkinci eksen **yatırımcı anlatısı ve büyüme hikâyesi** niteliğindeki Investor Pitch özetidir.  
- Üçüncü eksen ise **ürün kapsamı ve gereksinimlerini tanımlayan** PRD dokümanıdır.  
- Bu yapı sayesinde teknik ekip, ürün ekibi ve potansiyel yatırımcılar aynı sistemin farklı yönlerini ortak bir çerçeve içinde görebilir.  
- Dokümanlar birlikte okunduğunda yalnızca “ne yapılacak” sorusunu değil, aynı zamanda “neden yapılacak”, “nasıl çalışacak” ve “hangi büyüme varsayımı üzerine kurulacak” sorularını da yanıtlar.  

---

## 2) CTO Handoff dokümanı neyi kapsar?

- CTO Handoff, sistemin teknik omurgasını ve mimari yaklaşımını açıklayan devir teslim dokümanıdır.  
- Bu bölüm, mevcut teknoloji tercihlerini, veri modelini, entegrasyon planlarını, güvenlik yaklaşımını ve ölçeklenebilirlik kararlarını tek yerde toplar.  
- Teknik ekip açısından bu doküman, projenin “nasıl inşa edileceğini” tarif eden çekirdek referans metindir.  
- Aynı zamanda gelecekte projeye dahil olacak geliştiriciler için sistemin başlangıç mantığını kayda geçirir.  

---

## 3) CTO Handoff içinde hangi teknoloji yığını tanımlanmıştır?

- Frontend tarafında **Next.js + Tailwind** tercih edilmiştir.  
- Backend altyapısı için **Supabase** seçilmiştir.  
- Kimlik doğrulama tarafında **Google ve Apple OAuth** planlanmıştır.  
- Hosting tarafında **Vercel veya Coolify** seçenekleri değerlendirilmiştir.  
- Bu teknoloji seti, hızlı geliştirme, modern arayüz, ölçeklenebilir backend ve düşük operasyonel sürtünme hedefiyle uyumludur.  
- Yapı, erken aşama MVP ile orta vadeli büyüme arasında dengeli bir teknik temel kurmayı amaçlar.  

---

## 4) Mimari yapı nasıl kurgulanmıştır?

- Sistem mimarisi **Country → City → Category → Listing** hiyerarşisi üzerine kurulmuştur.  
- Bu mimari, platformun coğrafi ve kategorik ölçeklenmesine uygun olacak şekilde tasarlanmıştır.  
- Önce ülke seviyesi tanımlanır.  
- Ardından şehir düzeyinde ayrışma yapılır.  
- Sonra kategori yapısı üzerinden içerik ve servis tipleri sınıflandırılır.  
- En alt katmanda listing nesneleri yer alır.  
- Bu yaklaşım, özellikle diaspora odaklı bir platform için hem keşif hem filtreleme hem de şehir bazlı büyüme stratejisine teknik zemin hazırlar.  

---

## 5) Veritabanı modeli hangi temel varlıklardan oluşur?

- Veritabanı tarafında beş temel model tanımlanmıştır.  
- Bunlar **Users, Listings, Reviews, Events ve Communities** tablolarıdır.  
- Users modeli, platforma katılan bireyleri ve muhtemelen rol bazlı kullanıcı tiplerini temsil eder.  
- Listings modeli, işletme veya profesyonel kayıtlarının ana veri yapısını oluşturur.  
- Reviews modeli, puanlama ve geri bildirim katmanını sağlar.  
- Events modeli, etkinlik bazlı içerik ve topluluk etkileşimini destekler.  
- Communities modeli ise diaspora ağlarının ve grup bazlı etkileşimlerin çekirdeğini temsil eder.  
- Bu veri modeli, platformun yalnızca dizin mantığında değil, aynı zamanda topluluk ve etkileşim mantığında da tasarlandığını gösterir.  

---

## 6) Hangi entegrasyonlar planlanmıştır ve neden önemlidir?

- İlk aşamada **Google Maps API** entegrasyonu planlanmıştır.  
- Bu entegrasyon, listing keşfi, konum bazlı arama ve harita deneyimi için kritik önemdedir.  
- İleride harici veri kaynaklarının da sisteme bağlanması düşünülmektedir.  
- Bu, platformun yalnızca manuel veri girişiyle sınırlı kalmayıp daha zengin ve dinamik veri beslemeleri alabileceğini gösterir.  
- Entegrasyon kararı, ürünün yalnızca içerik tabanlı değil, konum tabanlı keşif deneyimi de sunmak istediğini ortaya koyar.  

---

## 7) CTO Handoff içinde hangi çekirdek geliştirme işleri öncelikli görünmektedir?

- Auth sistemi temel önceliklerden biridir.  
- Listing CRUD işlemleri ürünün ana operasyonel omurgasını oluşturur.  
- Claim sistemi, işletme veya profesyonel kayıtlarının sahiplenilmesi için gerekli çekirdek mekanizmadır.  
- Arama ve filtreleme özellikleri kullanıcı deneyiminin merkezindedir.  
- AI arama katmanı ise ürünün farklılaştırıcı özelliklerinden biri olarak konumlandırılmıştır.  
- Bu yapılacaklar listesi, MVP’nin sadece statik bir dizin değil, etkileşimli ve sahiplenilebilir bir platform olarak düşünüldüğünü gösterir.  

---

## 8) Hangi teknik kararlar henüz açık bırakılmıştır?

- Storage çözümü henüz kesinleştirilmemiştir.  
- AI öneri motorunun nasıl çalışacağı açık kararlardan biridir.  
- Analitik araçlarının hangileri olacağı belirlenmemiştir.  
- Yedekleme stratejisi de netleştirilmemiş alanlar arasındadır.  
- Bu durum, mimarinin ana omurgasının tanımlandığını ancak bazı operasyonel ve ileri seviye teknik bileşenlerin henüz karar aşamasında olduğunu gösterir.  
- Özellikle storage, analytics ve backup gibi konular, MVP sonrasında sistemin sürdürülebilirliği için kritik hale gelecektir.  

---

## 9) Güvenlik ve ölçeklenebilirlik yaklaşımı nasıl tanımlanmıştır?

- Sistem **100K+ kullanıcı** ölçeğini hedefleyecek şekilde düşünülmüştür.  
- Mimari modüler yapı mantığıyla tanımlanmıştır.  
- Güvenlik tarafında **role-based access** yaklaşımı benimsenmiştir.  
- Moderasyon araçları sistemin parçası olarak öngörülmektedir.  
- Danışman veya profesyonel profiller için **KYC** yaklaşımı planlanmıştır.  
- Bu tercihler, platformun yalnızca büyümeyi değil, güven ve kontrol katmanını da erken aşamadan itibaren hesaba kattığını gösterir.  

---

## 10) Investor Pitch bölümünün temel amacı nedir?

- Investor Pitch bölümü, Kortex’in yatırımcıya anlatılabilir büyüme hikâyesini özetler.  
- Bu bölüm ürünün teknik detayından çok, **vizyon, problem, çözüm, pazar ve gelir fırsatı** boyutlarını öne çıkarır.  
- Amaç, yatırımcıya “neden bu girişim var”, “hangi boşluğu dolduruyor”, “hangi pazarı hedefliyor” ve “neden büyüme potansiyeli var” sorularının net cevabını vermektir.  
- Aynı zamanda girişimin neden savunulabilir ve yatırım yapılabilir görüldüğünü anlatır.  

---

## 11) Kortex’in yatırımcı perspektifinden vizyonu nedir?

- Kortex’in vizyonu, **Türk diasporası için bir numaralı global platform** olmaktır.  
- Bu vizyon yalnızca bilgi sağlayan bir rehber olmayı değil, aynı zamanda hizmetlere, insanlara ve fırsatlara erişim sağlayan merkezi bir ekosistem olmayı ima eder.  
- Pitch diliyle bakıldığında Kortex, sadece bir web ürünü değil, diaspora için ölçeklenebilir dijital altyapı olarak konumlandırılmaktadır.  

---

## 12) Pitch içinde tanımlanan temel problem nedir?

- Pitch, temel problemi diaspora kullanıcılarının hizmet, topluluk ve fırsatlara dağınık biçimde erişmek zorunda kalması olarak tanımlar.  
- Yurt dışındaki milyonlarca Türk için bu üç alanı birleştiren tek bir merkezi platform bulunmadığı belirtilir.  
- Sorun yalnızca dizin eksikliği değildir.  
- Aynı zamanda güvenilir keşif, topluluk erişimi ve fırsat görünürlüğü eksikliğidir.  
- Bu problem tanımı, ürünün neden yalnızca bir listing platformu olarak değil, daha geniş bir diaspora altyapısı olarak tasarlandığını açıklar.  

---

## 13) Pitch içinde önerilen çözüm nasıl çerçevelenmiştir?

- Çözüm, Kortex’in bir **Diaspora Super App** olarak konumlandırılmasıyla açıklanır.  
- Bu ifade üç ana işlevin birleşimini ima eder.  
- Birincisi **hizmet keşfi**dir.  
- İkincisi **insan bağlantısı ve topluluk erişimi**dir.  
- Üçüncüsü **fırsatlara erişim**dir.  
- Böylece ürün, tek başına bir business directory değil, hibrit bir community + marketplace + discovery platformu olarak sunulur.  

---

## 14) Pazar büyüklüğü ve traction varsayımı nasıl tanımlanmıştır?

- Pitch içinde hedef pazar **10M+ global Türk diasporası** olarak ifade edilmiştir.  
- Bu, ürünün coğrafi olarak sınırlı değil, küresel ölçekte büyüme potansiyeline sahip olduğunu gösterir.  
- Hedef traction açısından ilk yıl için **100K kullanıcı** ve **2000 işletme** seviyesi öngörülmektedir.  
- Bu varsayım, ürünün hem talep hem arz tarafında hızlı ağ etkisi yaratabileceği inancına dayanır.  
- Pitch anlatısında bu sayılar, yatırımcının “bu girişim ne kadar büyük olabilir?” sorusuna ölçek cevabı verir.  

---

## 15) Gelir modeli yatırımcıya nasıl anlatılmaktadır?

- Gelir modeli birden fazla kanal üzerine kurulmuştur.  
- **Üyelik** gelir kaynaklarından biridir.  
- **Sponsored listing** modeli doğrudan ticari görünürlük satışını ifade eder.  
- **Reklam** gelirleri ek monetizasyon katmanıdır.  
- **Premium hizmetler** ise ileri seviye kullanıcı veya işletme ihtiyaçlarını paraya çevirmeyi amaçlar.  
- Bu yapı, tek bir gelir kalemine bağlı olmayan, çoklu monetizasyon stratejisine işaret eder.  
- Aynı zamanda hem B2C hem B2B benzeri gelir akışlarının potansiyel olarak birlikte kullanılabileceğini gösterir.  

---

## 16) Rekabet avantajı hangi unsurlara dayandırılmıştır?

- Pitch, doğrudan rakibin bulunmadığını öne sürmektedir.  
- Rekabet avantajı üç temel noktaya yaslanır.  
- Birinci avantaj **AI destekli arama** katmanıdır.  
- İkinci avantaj **community + marketplace hibrit** yapısıdır.  
- Üçüncü avantaj ise diaspora odaklı dikey uzmanlaşmadır.  
- Bu çerçeve, ürünün hem klasik rehber sitelerden hem de saf topluluk platformlarından ayrışmasını hedefler.  
- Yatırımcı diliyle bu, kategorinin boşluğu ile ürünün farklılaşmasını aynı anda anlatma çabasıdır.  

---

## 17) Pitch bölümünde yatırımcıdan ne talep edilmektedir?

- Dokümanda yatırımcıdan yalnızca para değil, aynı zamanda gelişim desteği de beklendiği görülmektedir.  
- Talep iki başlık altında özetlenmiştir.  
- Birincisi **teknik geliştirme desteği**dir.  
- İkincisi **başlangıç büyüme fonu**dur.  
- Bu, ürünün henüz erken aşamada olduğunu ama teknik ve growth tarafında hızlanmak için sermayeye ihtiyaç duyduğunu gösterir.  

---

## 18) PRD bölümünün temel amacı nedir?

- PRD bölümü, ürünün neyi çözdüğünü, hangi kullanıcı tiplerine hizmet verdiğini ve MVP kapsamının ne olduğunu tanımlar.  
- CTO Handoff “nasıl yapılacak” sorusuna daha yakınken, PRD “ürün tam olarak ne yapacak” sorusuna odaklanır.  
- Bu yüzden PRD, ürün ekibi için kapsam ve öncelik belgesi işlevi görür.  
- Aynı zamanda yatırımcı pitch’te anlatılan vizyonun ürün düzeyindeki karşılığını ortaya koyar.  

---

## 19) PRD’de tanımlanan temel problem ve çözüm nedir?

- PRD, dünyanın farklı yerlerindeki Türk diasporası için merkezi bilgi eksikliğini temel sorun olarak tanımlar.  
- Yerel Türk hizmetlerine erişimin zor olduğu belirtilir.  
- Toplulukların parçalı ve dağınık olduğu vurgulanır.  
- Çözüm olarak **listing + community + events + AI search** birleşimi sunulur.  
- Bu çözüm, yalnızca rehber mantığıyla değil, etkileşim ve keşif mantığıyla da tasarlanmıştır.  

---

## 20) PRD’de hangi kullanıcı rolleri ve çekirdek özellikler öne çıkar?

- Kullanıcı rolleri arasında **bireysel kullanıcı**, **işletme**, **topluluk** ve **moderatör** yer alır.  
- Core feature set içinde **listing sistemi** bulunur.  
- **Claim sistemi**, listing sahiplenmesini sağlar.  
- **AI arama** ürünün farklılaştırıcı katmanlarından biridir.  
- **Harita entegrasyonu** keşif deneyimini güçlendirir.  
- **Yorum ve puanlama** güven ve kalite sinyali üretir.  
- Bu özellik seti, ürünün hem dizin, hem topluluk, hem de güven katmanını birlikte inşa etmeye çalıştığını gösterir.  

---

## 21) MVP kapsamı nasıl çizilmiştir?

- MVP aşamasında öncelik **Almanya** pazarına verilmiştir.  
- İlk sürümde temel listing ve arama deneyimi yer alacaktır.  
- Moderasyon tarafı basit ama işlevsel düzeyde tutulacaktır.  
- Kimlik doğrulama tarafında **Google/Apple auth** kullanılacaktır.  
- Bu yaklaşım, önce dar bir coğrafyada çalışır model kurma, sonra diğer ülkelere açılma stratejisini gösterir.  
- MVP kapsamı bilinçli biçimde sınırlanmıştır; bu da erken aşamada odak kaybını azaltmayı amaçlar.  

---

## 22) Gelecek roadmap içinde hangi genişleme başlıkları görünmektedir?

- Gelecekte **mobil uygulama** geliştirilmesi planlanmaktadır.  
- **Gelişmiş AI öneri sistemleri** ürünün sonraki fazlarında yer alacaktır.  
- **Monetizasyon özellikleri** ilerleyen aşamalarda daha güçlü hale getirilecektir.  
- Bu başlıklar, MVP’nin yalnızca temel ürün olduğunu ve uzun vadede platformun daha kişiselleştirilmiş, daha mobil ve daha ticari hale geleceğini gösterir.  

---

## 23) Bu üç doküman birlikte okunduğunda Kortex hakkında hangi bütünsel tablo ortaya çıkar?

- CTO Handoff, ürünün teknik omurgasını açıklar.  
- Investor Pitch, ürünün neden büyük bir fırsat olduğunu anlatır.  
- PRD ise bu vizyonun ürün özelliklerine nasıl dönüştüğünü gösterir.  
- Birlikte okunduğunda Kortex; diaspora odaklı, listing + community + events + AI search katmanlarını birleştiren, önce Almanya’da başlayıp sonra küresel genişleme hedefleyen bir platform olarak görünür.  
- Teknik olarak modern web stack ile inşa edilmesi planlanmaktadır.  
- Ticari olarak üyelik, premium görünürlük ve reklam üzerinden gelir üretmesi hedeflenmektedir.  
- Stratejik olarak ise hem kullanıcı hem işletme tarafında ağ etkisi oluşturan hibrit bir model benimsenmektedir.  
- Dolayısıyla bu doküman seti, Kortex’i sadece bir ürün fikri olarak değil, teknik, ticari ve stratejik olarak yapılandırılmış bir girişim taslağı olarak konumlandırır.  