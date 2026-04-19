import DocsShell from '@/components/layout/DocsShell'
import AccordionCard from '@/components/ui/AccordionCard'

const accordionItems = [
  {
    id: 'ktx-1',
    title: '1) Kortex temel dokümanlarının ana amacı nedir?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Bu doküman seti, Kortex&apos;in teknik, ürün ve yatırımcı anlatısını tek çatı altında toplamak için hazırlanmıştır.</li>
        <li>- Üç ana ekseni birlikte ele alır.</li>
        <li>- Birinci eksen teknik devir teslim niteliğindeki CTO Handoff dokümanıdır.</li>
        <li>- İkinci eksen yatırımcı anlatısı ve büyüme hikâyesi niteliğindeki Investor Pitch özetidir.</li>
        <li>- Üçüncü eksen ise ürün kapsamı ve gereksinimlerini tanımlayan PRD dokümanıdır.</li>
        <li>- Bu yapı sayesinde teknik ekip, ürün ekibi ve potansiyel yatırımcılar aynı sistemin farklı yönlerini ortak bir çerçeve içinde görebilir.</li>
        <li>- Dokümanlar birlikte okunduğunda yalnızca &quot;ne yapılacak&quot; sorusunu değil, aynı zamanda &quot;neden yapılacak&quot;, &quot;nasıl çalışacak&quot; ve &quot;hangi büyüme varsayımı üzerine kurulacak&quot; sorularını da yanıtlar.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-2',
    title: '2) CTO Handoff dokümanı neyi kapsar?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- CTO Handoff, sistemin teknik omurgasını ve mimari yaklaşımını açıklayan devir teslim dokümanıdır.</li>
        <li>- Bu bölüm, mevcut teknoloji tercihlerini, veri modelini, entegrasyon planlarını, güvenlik yaklaşımını ve ölçeklenebilirlik kararlarını tek yerde toplar.</li>
        <li>- Teknik ekip açısından bu doküman, projenin &quot;nasıl inşa edileceğini&quot; tarif eden çekirdek referans metindir.</li>
        <li>- Aynı zamanda gelecekte projeye dahil olacak geliştiriciler için sistemin başlangıç mantığını kayda geçirir.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-3',
    title: '3) CTO Handoff içinde hangi teknoloji yığını tanımlanmıştır?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Frontend tarafında Next.js + Tailwind tercih edilmiştir.</li>
        <li>- Backend altyapısı için Supabase seçilmiştir.</li>
        <li>- Kimlik doğrulama tarafında Google ve Apple OAuth planlanmıştır.</li>
        <li>- Hosting tarafında Vercel veya Coolify seçenekleri değerlendirilmiştir.</li>
        <li>- Bu teknoloji seti, hızlı geliştirme, modern arayüz, ölçeklenebilir backend ve düşük operasyonel sürtünme hedefiyle uyumludur.</li>
        <li>- Yapı, erken aşama MVP ile orta vadeli büyüme arasında dengeli bir teknik temel kurmayı amaçlar.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-4',
    title: '4) Mimari yapı nasıl kurgulanmıştır?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Sistem mimarisi Country → City → Category → Listing hiyerarşisi üzerine kurulmuştur.</li>
        <li>- Bu mimari, platformun coğrafi ve kategorik ölçeklenmesine uygun olacak şekilde tasarlanmıştır.</li>
        <li>- Önce ülke seviyesi tanımlanır.</li>
        <li>- Ardından şehir düzeyinde ayrışma yapılır.</li>
        <li>- Sonra kategori yapısı üzerinden içerik ve servis tipleri sınıflandırılır.</li>
        <li>- En alt katmanda listing nesneleri yer alır.</li>
        <li>- Bu yaklaşım, özellikle diaspora odaklı bir platform için hem keşif hem filtreleme hem de şehir bazlı büyüme stratejisine teknik zemin hazırlar.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-5',
    title: '5) Veritabanı modeli hangi temel varlıklardan oluşur?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Veritabanı tarafında beş temel model tanımlanmıştır.</li>
        <li>- Bunlar Users, Listings, Reviews, Events ve Communities tablolarıdır.</li>
        <li>- Users modeli, platforma katılan bireyleri ve muhtemelen rol bazlı kullanıcı tiplerini temsil eder.</li>
        <li>- Listings modeli, işletme veya profesyonel kayıtlarının ana veri yapısını oluşturur.</li>
        <li>- Reviews modeli, puanlama ve geri bildirim katmanını sağlar.</li>
        <li>- Events modeli, etkinlik bazlı içerik ve topluluk etkileşimini destekler.</li>
        <li>- Communities modeli ise diaspora ağlarının ve grup bazlı etkileşimlerin çekirdeğini temsil eder.</li>
        <li>- Bu veri modeli, platformun yalnızca dizin mantığında değil, aynı zamanda topluluk ve etkileşim mantığında da tasarlandığını gösterir.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-6',
    title: '6) Hangi entegrasyonlar planlanmıştır ve neden önemlidir?',
    accentColor: '#FF6D01',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- İlk aşamada Google Maps API entegrasyonu planlanmıştır.</li>
        <li>- Bu entegrasyon, listing keşfi, konum bazlı arama ve harita deneyimi için kritik önemdedir.</li>
        <li>- İleride harici veri kaynaklarının da sisteme bağlanması düşünülmektedir.</li>
        <li>- Bu, platformun yalnızca manuel veri girişiyle sınırlı kalmayıp daha zengin ve dinamik veri beslemeleri alabileceğini gösterir.</li>
        <li>- Entegrasyon kararı, ürünün yalnızca içerik tabanlı değil, konum tabanlı keşif deneyimi de sunmak istediğini ortaya koyar.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-7',
    title: '7) CTO Handoff içinde hangi çekirdek geliştirme işleri öncelikli görünmektedir?',
    accentColor: '#46BDC6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Auth sistemi temel önceliklerden biridir.</li>
        <li>- Listing CRUD işlemleri ürünün ana operasyonel omurgasını oluşturur.</li>
        <li>- Claim sistemi, işletme veya profesyonel kayıtlarının sahiplenilmesi için gerekli çekirdek mekanizmadır.</li>
        <li>- Arama ve filtreleme özellikleri kullanıcı deneyiminin merkezindedir.</li>
        <li>- AI arama katmanı ise ürünün farklılaştırıcı özelliklerinden biri olarak konumlandırılmıştır.</li>
        <li>- Bu yapılacaklar listesi, MVP&apos;nin sadece statik bir dizin değil, etkileşimli ve sahiplenilebilir bir platform olarak düşünüldüğünü gösterir.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-8',
    title: '8) Hangi teknik kararlar henüz açık bırakılmıştır?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Storage çözümü henüz kesinleştirilmemiştir.</li>
        <li>- AI öneri motorunun nasıl çalışacağı açık kararlardan biridir.</li>
        <li>- Analitik araçlarının hangileri olacağı belirlenmemiştir.</li>
        <li>- Yedekleme stratejisi de netleştirilmemiş alanlar arasındadır.</li>
        <li>- Bu durum, mimarinin ana omurgasının tanımlandığını ancak bazı operasyonel ve ileri seviye teknik bileşenlerin henüz karar aşamasında olduğunu gösterir.</li>
        <li>- Özellikle storage, analytics ve backup gibi konular, MVP sonrasında sistemin sürdürülebilirliği için kritik hale gelecektir.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-9',
    title: '9) Güvenlik ve ölçeklenebilirlik yaklaşımı nasıl tanımlanmıştır?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Sistem 100K+ kullanıcı ölçeğini hedefleyecek şekilde düşünülmüştür.</li>
        <li>- Mimari modüler yapı mantığıyla tanımlanmıştır.</li>
        <li>- Güvenlik tarafında role-based access yaklaşımı benimsenmiştir.</li>
        <li>- Moderasyon araçları sistemin parçası olarak öngörülmektedir.</li>
        <li>- Danışman veya profesyonel profiller için KYC yaklaşımı planlanmıştır.</li>
        <li>- Bu tercihler, platformun yalnızca büyümeyi değil, güven ve kontrol katmanını da erken aşamadan itibaren hesaba kattığını gösterir.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-10',
    title: '10) Investor Pitch bölümünün temel amacı nedir?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Investor Pitch bölümü, Kortex&apos;in yatırımcıya anlatılabilir büyüme hikâyesini özetler.</li>
        <li>- Bu bölüm ürünün teknik detayından çok, vizyon, problem, çözüm, pazar ve gelir fırsatı boyutlarını öne çıkarır.</li>
        <li>- Amaç, yatırımcıya &quot;neden bu girişim var&quot;, &quot;hangi boşluğu dolduruyor&quot;, &quot;hangi pazarı hedefliyor&quot; ve &quot;neden büyüme potansiyeli var&quot; sorularının net cevabını vermektir.</li>
        <li>- Aynı zamanda girişimin neden savunulabilir ve yatırım yapılabilir görüldüğünü anlatır.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-11',
    title: '11) Kortex\'in yatırımcı perspektifinden vizyonu nedir?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Kortex&apos;in vizyonu, Türk diasporası için bir numaralı global platform olmaktır.</li>
        <li>- Bu vizyon yalnızca bilgi sağlayan bir rehber olmayı değil, aynı zamanda hizmetlere, insanlara ve fırsatlara erişim sağlayan merkezi bir ekosistem olmayı ima eder.</li>
        <li>- Pitch diliyle bakıldığında Kortex, sadece bir web ürünü değil, diaspora için ölçeklenebilir dijital altyapı olarak konumlandırılmaktadır.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-12',
    title: '12) Pitch içinde tanımlanan temel problem nedir?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Pitch, temel problemi diaspora kullanıcılarının hizmet, topluluk ve fırsatlara dağınık biçimde erişmek zorunda kalması olarak tanımlar.</li>
        <li>- Yurt dışındaki milyonlarca Türk için bu üç alanı birleştiren tek bir merkezi platform bulunmadığı belirtilir.</li>
        <li>- Sorun yalnızca dizin eksikliği değildir.</li>
        <li>- Aynı zamanda güvenilir keşif, topluluk erişimi ve fırsat görünürlüğü eksikliğidir.</li>
        <li>- Bu problem tanımı, ürünün neden yalnızca bir listing platformu olarak değil, daha geniş bir diaspora altyapısı olarak tasarlandığını açıklar.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-13',
    title: '13) Pitch içinde önerilen çözüm nasıl çerçevelenmiştir?',
    accentColor: '#FF6D01',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Çözüm, Kortex&apos;in bir Diaspora Super App olarak konumlandırılmasıyla açıklanır.</li>
        <li>- Bu ifade üç ana işlevin birleşimini ima eder.</li>
        <li>- Birincisi hizmet keşfidir.</li>
        <li>- İkincisi insan bağlantısı ve topluluk erişimidir.</li>
        <li>- Üçüncüsü fırsatlara erişimdir.</li>
        <li>- Böylece ürün, tek başına bir business directory değil, hibrit bir community + marketplace + discovery platformu olarak sunulur.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-14',
    title: '14) Pazar büyüklüğü ve traction varsayımı nasıl tanımlanmıştır?',
    accentColor: '#46BDC6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Pitch içinde hedef pazar 10M+ global Türk diasporası olarak ifade edilmiştir.</li>
        <li>- Bu, ürünün coğrafi olarak sınırlı değil, küresel ölçekte büyüme potansiyeline sahip olduğunu gösterir.</li>
        <li>- Hedef traction açısından ilk yıl için 100K kullanıcı ve 2000 işletme seviyesi öngörülmektedir.</li>
        <li>- Bu varsayım, ürünün hem talep hem arz tarafında hızlı ağ etkisi yaratabileceği inancına dayanır.</li>
        <li>- Pitch anlatısında bu sayılar, yatırımcının &quot;bu girişim ne kadar büyük olabilir?&quot; sorusuna ölçek cevabı verir.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-15',
    title: '15) Gelir modeli yatırımcıya nasıl anlatılmaktadır?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Gelir modeli birden fazla kanal üzerine kurulmuştur.</li>
        <li>- Üyelik gelir kaynaklarından biridir.</li>
        <li>- Sponsored listing modeli doğrudan ticari görünürlük satışını ifade eder.</li>
        <li>- Reklam gelirleri ek monetizasyon katmanıdır.</li>
        <li>- Premium hizmetler ise ileri seviye kullanıcı veya işletme ihtiyaçlarını paraya çevirmeyi amaçlar.</li>
        <li>- Bu yapı, tek bir gelir kalemine bağlı olmayan, çoklu monetizasyon stratejisine işaret eder.</li>
        <li>- Aynı zamanda hem B2C hem B2B benzeri gelir akışlarının potansiyel olarak birlikte kullanılabileceğini gösterir.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-16',
    title: '16) Rekabet avantajı hangi unsurlara dayandırılmıştır?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Pitch, doğrudan rakibin bulunmadığını öne sürmektedir.</li>
        <li>- Rekabet avantajı üç temel noktaya yaslanır.</li>
        <li>- Birinci avantaj AI destekli arama katmanıdır.</li>
        <li>- İkinci avantaj community + marketplace hibrit yapısıdır.</li>
        <li>- Üçüncü avantaj ise diaspora odaklı dikey uzmanlaşmadır.</li>
        <li>- Bu çerçeve, ürünün hem klasik rehber sitelerden hem de saf topluluk platformlarından ayrışmasını hedefler.</li>
        <li>- Yatırımcı diliyle bu, kategorinin boşluğu ile ürünün farklılaşmasını aynı anda anlatma çabasıdır.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-17',
    title: '17) Pitch bölümünde yatırımcıdan ne talep edilmektedir?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Dokümanda yatırımcıdan yalnızca para değil, aynı zamanda gelişim desteği de beklendiği görülmektedir.</li>
        <li>- Talep iki başlık altında özetlenmiştir.</li>
        <li>- Birincisi teknik geliştirme desteğidir.</li>
        <li>- İkincisi başlangıç büyüme fonudur.</li>
        <li>- Bu, ürünün henüz erken aşamada olduğunu ama teknik ve growth tarafında hızlanmak için sermayeye ihtiyaç duyduğunu gösterir.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-18',
    title: '18) PRD bölümünün temel amacı nedir?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- PRD bölümü, ürünün neyi çözdüğünü, hangi kullanıcı tiplerine hizmet verdiğini ve MVP kapsamının ne olduğunu tanımlar.</li>
        <li>- CTO Handoff &quot;nasıl yapılacak&quot; sorusuna daha yakınken, PRD &quot;ürün tam olarak ne yapacak&quot; sorusuna odaklanır.</li>
        <li>- Bu yüzden PRD, ürün ekibi için kapsam ve öncelik belgesi işlevi görür.</li>
        <li>- Aynı zamanda yatırımcı pitch&apos;te anlatılan vizyonun ürün düzeyindeki karşılığını ortaya koyar.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-19',
    title: '19) PRD\'de tanımlanan temel problem ve çözüm nedir?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- PRD, dünyanın farklı yerlerindeki Türk diasporası için merkezi bilgi eksikliğini temel sorun olarak tanımlar.</li>
        <li>- Yerel Türk hizmetlerine erişimin zor olduğu belirtilir.</li>
        <li>- Toplulukların parçalı ve dağınık olduğu vurgulanır.</li>
        <li>- Çözüm olarak listing + community + events + AI search birleşimi sunulur.</li>
        <li>- Bu çözüm, yalnızca rehber mantığıyla değil, etkileşim ve keşif mantığıyla da tasarlanmıştır.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-20',
    title: '20) PRD\'de hangi kullanıcı rolleri ve çekirdek özellikler öne çıkar?',
    accentColor: '#FF6D01',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Kullanıcı rolleri arasında bireysel kullanıcı, işletme, topluluk ve moderatör yer alır.</li>
        <li>- Core feature set içinde listing sistemi bulunur.</li>
        <li>- Claim sistemi, listing sahiplenmesini sağlar.</li>
        <li>- AI arama ürünün farklılaştırıcı katmanlarından biridir.</li>
        <li>- Harita entegrasyonu keşif deneyimini güçlendirir.</li>
        <li>- Yorum ve puanlama güven ve kalite sinyali üretir.</li>
        <li>- Bu özellik seti, ürünün hem dizin, hem topluluk, hem de güven katmanını birlikte inşa etmeye çalıştığını gösterir.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-21',
    title: '21) MVP kapsamı nasıl çizilmiştir?',
    accentColor: '#46BDC6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- MVP aşamasında öncelik Almanya pazarına verilmiştir.</li>
        <li>- İlk sürümde temel listing ve arama deneyimi yer alacaktır.</li>
        <li>- Moderasyon tarafı basit ama işlevsel düzeyde tutulacaktır.</li>
        <li>- Kimlik doğrulama tarafında Google/Apple auth kullanılacaktır.</li>
        <li>- Bu yaklaşım, önce dar bir coğrafyada çalışır model kurma, sonra diğer ülkelere açılma stratejisini gösterir.</li>
        <li>- MVP kapsamı bilinçli biçimde sınırlanmıştır; bu da erken aşamada odak kaybını azaltmayı amaçlar.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-22',
    title: '22) Gelecek roadmap içinde hangi genişleme başlıkları görünmektedir?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Gelecekte mobil uygulama geliştirilmesi planlanmaktadır.</li>
        <li>- Gelişmiş AI öneri sistemleri ürünün sonraki fazlarında yer alacaktır.</li>
        <li>- Monetizasyon özellikleri ilerleyen aşamalarda daha güçlü hale getirilecektir.</li>
        <li>- Bu başlıklar, MVP&apos;nin yalnızca temel ürün olduğunu ve uzun vadede platformun daha kişiselleştirilmiş, daha mobil ve daha ticari hale geleceğini gösterir.</li>
      </ul>
    ),
  },
  {
    id: 'ktx-23',
    title: '23) Bu üç doküman birlikte okunduğunda Kortex hakkında hangi bütünsel tablo ortaya çıkar?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- CTO Handoff, ürünün teknik omurgasını açıklar.</li>
        <li>- Investor Pitch, ürünün neden büyük bir fırsat olduğunu anlatır.</li>
        <li>- PRD ise bu vizyonun ürün özelliklerine nasıl dönüştüğünü gösterir.</li>
        <li>- Birlikte okunduğunda Kortex; diaspora odaklı, listing + community + events + AI search katmanlarını birleştiren, önce Almanya&apos;da başlayıp sonra küresel genişleme hedefleyen bir platform olarak görünür.</li>
        <li>- Teknik olarak modern web stack ile inşa edilmesi planlanmaktadır.</li>
        <li>- Ticari olarak üyelik, premium görünürlük ve reklam üzerinden gelir üretmesi hedeflenmektedir.</li>
        <li>- Stratejik olarak ise hem kullanıcı hem işletme tarafında ağ etkisi oluşturan hibrit bir model benimsenmektedir.</li>
        <li>- Dolayısıyla bu doküman seti, Kortex&apos;i sadece bir ürün fikri olarak değil, teknik, ticari ve stratejik olarak yapılandırılmış bir girişim taslağı olarak konumlandırır.</li>
      </ul>
    ),
  },
]

export default function KortexdocsPage() {
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
                Kortex — CTO Pitch PRD
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
                Kortex&apos;in teknik devir teslim, yatırımcı anlatısı ve ürün gereksinim dokümanları.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">CTO Handoff</span>
                <span className="docs-chip">Investor Pitch</span>
                <span className="docs-chip">PRD</span>
              </div>
            </div>
          </div>

          <AccordionCard items={accordionItems} />
        </article>
      </div>
    </DocsShell>
  )
}
