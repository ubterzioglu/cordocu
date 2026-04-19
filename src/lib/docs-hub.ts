export type DocCategorySlug =
  | 'general'
  | 'toplantiozet'
  | 'todolist'
  | 'sosyalmedya'
  | 'danismanlarsm'
  | 'insankaynaklari'
  | 'arge'
  | 'mvpitems'
  | 'ambassador'
  | 'ekip'
  | 'dijitalpazarlama'
  | 'whatsappbot'
  | 'roadmap'
  | 'projetakibi'
  | 'links'
  | 'kortexdocs'
  | 'captable'
  | 'testfall'
  | 'planung'
  | 'architecture'
  | 'tests'

export type DocIconKey =
  | 'book'
  | 'calendar'
  | 'file-text'
  | 'home'
  | 'layers'
  | 'test-tube'

export interface DocNavItem {
  id: string
  label: string
  description: string
  href: string
  categorySlug: DocCategorySlug
  featuredOrder?: number
}

export interface DocCategoryOverview {
  title: string
  description: string
  ctaLabel: string
}

export interface DocCategoryDefinition {
  slug: DocCategorySlug
  label: string
  shortDescription: string
  iconKey: DocIconKey
  defaultExpanded: boolean
  overview: DocCategoryOverview
  items: DocNavItem[]
}

export interface DocOverviewCard {
  id: string
  title: string
  description: string
  categorySlug: DocCategorySlug
  categoryLabel: string
  iconKey: DocIconKey
  ctaLabel: string
  href: string
}

export interface DocQuickLink {
  id: string
  label: string
  categorySlug: DocCategorySlug
}

export const defaultDocCategorySlug: DocCategorySlug = 'general'
export const defaultDocItemId = 'general-overview'

export const docsCategories: DocCategoryDefinition[] = [
  {
    slug: 'general',
    label: 'İÇİNDEKİLER',
    shortDescription: 'Platform genel bakışı, başlangıç rehberi ve kurulum referansları.',
    iconKey: 'home',
    defaultExpanded: true,
    overview: {
      title: 'Genel Dokümantasyon',
      description: 'Platforma genel bakış, başlangıç rehberleri ve temel kavramlar.',
      ctaLabel: 'Genel dokümanlara git',
    },
    items: [
      {
        id: 'general-overview',
        label: 'Genel Bakış',
        description: 'Ürünün üst düzey özeti ve dokümantasyon merkezine giriş noktası.',
        href: '#general-overview',
        categorySlug: 'general',
        featuredOrder: 1,
      },
      {
        id: 'general-getting-started',
        label: 'Başlarken',
        description: 'Yeni okuyucular ve katkıda bulunanlar için önerilen ilk adımlar.',
        href: '#general-getting-started',
        categorySlug: 'general',
        featuredOrder: 2,
      },
      {
        id: 'general-installation',
        label: 'Kurulum',
        description: 'Yerel kurulum notları, ön gereksinimler ve kurulum rehberi.',
        href: '#general-installation',
        categorySlug: 'general',
      },
    ],
  },
  {
    slug: 'toplantiozet',
    label: 'TOPLANTI ÖZET',
    shortDescription: 'Tüm toplantı notları ve WA yazışmalarının birleştirilmiş, kategorize edilmiş özeti.',
    iconKey: 'calendar',
    defaultExpanded: false,
    overview: {
      title: 'Birleştirilmiş Toplantı & WA Maddeleri',
      description:
        'T1, T2, T3 toplantıları, WA yazışmaları ve Notion Kararlar (NO) kaynaklarından derlenen tüm maddeler — kategorilere ve kaynaklara göre düzenlenmiş.',
      ctaLabel: 'Özete Git',
    },
    items: [
      {
        id: 'toplantiozet-main',
        label: 'Toplantı & WA Özet Tablosu',
        description: 'Tüm maddeler ana liste, kategori kartları ve toplantı bazlı kartlar halinde.',
        href: '/toplantiozet',
        categorySlug: 'toplantiozet',
        featuredOrder: 48,
      },
    ],
  },
  {
    slug: 'todolist',
    label: 'To Do List',
    shortDescription: 'Canlı görev takip tablosu — Konu, Görev, Sorumlu, Zaman ve Durum kolonlarıyla DB\'ye bağlı.',
    iconKey: 'test-tube',
    defaultExpanded: false,
    overview: {
      title: 'To Do List',
      description: 'Tüm görevler tek tabloda: Konu / Görev / Sorumlu / Zaman / Durum. Supabase\'e bağlı, yeni görev eklenebilir.',
      ctaLabel: 'Görevlere Bak',
    },
    items: [
      {
        id: 'todo-product-backlog',
        label: '1. Product Backlog (25 Görev)',
        description: 'Setup, Auth, Profiles, Listing, Search, Booking, Payment, Notification, Admin, CMS, SEO, UX, Analytics, Security, Mobile, Referral, Scaling.',
        href: '#todo-product-backlog',
        categorySlug: 'todolist',
        featuredOrder: 37,
      },
      {
        id: 'todo-gtm-backlog',
        label: '2. GTM & Ops Backlog (19 Görev)',
        description: 'Supply (advisor listesi, outreach, onboarding), Content (SEO, blog), Growth (LinkedIn, WhatsApp), Revenue, Partnership, Ops (feedback loop, destek).',
        href: '#todo-gtm-backlog',
        categorySlug: 'todolist',
        featuredOrder: 38,
      },
      {
        id: 'todo-eksikler-oneri',
        label: '3. Eksikler ve İyileştirme Önerileri',
        description: 'Owner, due date, dependency ve progress alanları eksik. Backlog yapısı execution tracker\'a dönüştürülmeli.',
        href: '#todo-eksikler-oneri',
        categorySlug: 'todolist',
      },
      {
        id: 'todo-notion-gorev-tablosu',
        label: '4. Notion Görev Tablosu',
        description: '9 görevlik Notion tracker: Dij. Paz. Planı, Lansman, Gelir Modeli, Bütçe, Cap Table, Ambassador Mock, Proje Yönetimi, Ekip Datası. 1 Done, 3 In progress, 5 Not started.',
        href: '#todo-notion-gorev-tablosu',
        categorySlug: 'todolist',
        featuredOrder: 39,
      },
      {
        id: 'todo-notion-brainstorm',
        label: '5. Notion Brainstorm Notları',
        description: 'Core team kararları (Burak + Barış), ürün fikirleri (WhatsApp bot, Ambassador, JukeBox, haberler, hospital booking) ve networking bağlantıları.',
        href: '#todo-notion-brainstorm',
        categorySlug: 'todolist',
      },
    ],
  },
  {
    slug: 'sosyalmedya',
    label: 'SOSYAL MEDYA',
    shortDescription: 'Sosyal medya kaynaklarının merkezi yönetim tablosu.',
    iconKey: 'book',
    defaultExpanded: false,
    overview: {
      title: 'Sosyal Medya Linkleri',
      description: 'Sosyal medya kaynaklarını merkezi ve yönetilebilir tabloda toplayın.',
      ctaLabel: 'Sosyal Medyaya Git',
    },
    items: [
      {
        id: 'sosyalmedya-main',
        label: 'Sosyal Medya Listesi',
        description: 'Tüm sosyal medya linkleri.',
        href: '/sosyalmedya',
        categorySlug: 'sosyalmedya',
        featuredOrder: 45,
      },
    ],
  },
  {
    slug: 'danismanlarsm',
    label: 'DANIŞMANLAR / SM',
    shortDescription: 'Danışman ve sosyal medya odaklı kaynakların ayrı yönetim tablosu.',
    iconKey: 'book',
    defaultExpanded: false,
    overview: {
      title: 'Danışmanlar/SM Linkleri',
      description: 'Danışman ve sosyal medya odaklı linkleri ayrı modülde yönetin.',
      ctaLabel: 'Danışmanlar/SM Modülüne Git',
    },
    items: [
      {
        id: 'danismanlarsm-main',
        label: 'Danışmanlar/SM Listesi',
        description: 'Danışmanlar ve sosyal medya kaynakları için ayrı liste.',
        href: '/danismanlarsm',
        categorySlug: 'danismanlarsm',
        featuredOrder: 46,
      },
    ],
  },
  {
    slug: 'insankaynaklari',
    label: 'İNSAN KAYNAKLARI',
    shortDescription: 'CV yükleme ve yönetim sistemi.',
    iconKey: 'layers',
    defaultExpanded: false,
    overview: {
      title: 'CV Yönetimi',
      description: 'CV yükleyin, görüntüleyin ve yönetin. Supabase Storage mimarisi.',
      ctaLabel: 'HR Modülüne Git',
    },
    items: [
      {
        id: 'insankaynaklari-main',
        label: 'CV Yönetimi',
        description: 'CV yükleme ve listeleme.',
        href: '/insankaynaklari',
        categorySlug: 'insankaynaklari',
        featuredOrder: 46,
      },
    ],
  },
  {
    slug: 'arge',
    label: 'ARGE',
    shortDescription: 'Araştırma, doküman ve fikir içeriklerinin yönetildiği modül.',
    iconKey: 'layers',
    defaultExpanded: false,
    overview: {
      title: 'ARGE Modülü',
      description: 'Linkler, açıklama kartları ve dosya upload ile ARGE içerik yönetimi.',
      ctaLabel: 'ARGE\'ye Git',
    },
    items: [
      {
        id: 'arge-main',
        label: 'ARGE Yönetimi',
        description: 'Linkler, kartlar ve dosyalar.',
        href: '/arge',
        categorySlug: 'arge',
        featuredOrder: 47,
      },
    ],
  },
  {
    slug: 'mvpitems',
    label: 'MVP LİSTESİ',
    shortDescription: 'MVP maddelerinin Supabase destekli merkezi listesi — MVP seviyesi ve sorumlu ataması.',
    iconKey: 'layers',
    defaultExpanded: false,
    overview: {
      title: 'MVP Yaklaşımı — Yapısal Liste',
      description: 'Tüm MVP maddeleri canlı CRUD tablosunda. MVP1/MVP2/MVP3 seviyesi ve sorumlu atayın.',
      ctaLabel: 'MVP Listesine Git',
    },
    items: [
      {
        id: 'mvpitems-main',
        label: 'MVP Yapısal Liste',
        description: 'Merkezi MVP maddeleri tablosu.',
        href: '/mvpitems',
        categorySlug: 'mvpitems',
        featuredOrder: 44,
      },
    ],
  },
  {
    slug: 'ambassador',
    label: 'AMBASSADOR',
    shortDescription: 'CorteQS Marka Elçisi yapısı — şehir bazlı büyüme, görevler, gelir modeli ve organizasyon.',
    iconKey: 'book',
    defaultExpanded: false,
    overview: {
      title: 'Ambassador (Marka Elçisi)',
      description:
        'CorteQS platformunda şehir bazlı büyüme engine\'i olarak görev yapan Ambassador yapısının tam tanımı: profil kriterleri, görevler, gelir modeli, organizasyon ve operasyon checklist\'leri.',
      ctaLabel: 'Ambassador docs\'a git',
    },
    items: [
      {
        id: 'ambassador-profil',
        label: '1. Profil Özellikleri',
        description:
          'İdeal Ambassador profili: hiperaktif, yüksek dışa dönüklük, çalışkanlık, sorumluluk, çözüm odaklılık, iyi eğitimli, açık zihinli, sıfır ego.',
        href: '#ambassador-profil',
        categorySlug: 'ambassador',
        featuredOrder: 10,
      },
      {
        id: 'ambassador-amac',
        label: '2. Amaç ve Genel Tanım',
        description:
          'Şehir bazlı büyüme için tasarlanan Ambassador rolü: yerel toplulukları yönetmek, onboarding yürütmek, platform kullanımını artırmak, ağ etkisini güçlendirmek.',
        href: '#ambassador-amac',
        categorySlug: 'ambassador',
        featuredOrder: 11,
      },
      {
        id: 'ambassador-gorevler',
        label: '3. İşlev ve Görevler',
        description:
          'Kullanıcı ve danışman onboarding, topluluk yönetimi (WhatsApp/Telegram/LinkedIn), aylık etkinlikler, performans takibi (kayıt, katılım, işlem hacmi) ve teşvik sistemi.',
        href: '#ambassador-gorevler',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-platform',
        label: '4. Platform Entegrasyonu ve UX',
        description:
          'Şehir sayfasında Ambassador görünürlüğü, "Connect with City Lead" CTA\'ları, özel dashboard, raporlama ekranları ve platform üzerinde onboarding / etkinlik yönetimi.',
        href: '#ambassador-platform',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-sosyal-medya',
        label: '5. Sosyal Medya ve İçerik',
        description:
          'Ambassador\'lar şehirdeki etkinlikleri ve haberleri derler, Corteqs profillerinde ve sosyal medyada paylaşarak platform linklerini büyütür.',
        href: '#ambassador-sosyal-medya',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-gelir',
        label: '6. Gelir Modeli',
        description:
          'Kupon ile gelir paylaşımı: yıllık subscription\'dan ilk yıl %25, sonraki yıllarda %10; etkinlik biletlerinden %15. Yüzdeler şehir ve yoğunluğa göre değişir.',
        href: '#ambassador-gelir',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-operasyon',
        label: '7. Operasyon ve Yönetim',
        description:
          'WhatsApp grubu ile yönetim, bot entegrasyonu, her 3 ayda düzenli etkinlikler: piknik, rakı balık, 29 Ekim, yılbaşı, spor turnuvaları ve daha fazlası.',
        href: '#ambassador-operasyon',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-tematik',
        label: '8. Tematik Eventler',
        description:
          'Corteqs kategorilerine göre özel geceler: vize danışmanları, gayrimenkul, doktorlar, dernekler. Speed consulting, founder-startup-yatırımcı buluşmaları.',
        href: '#ambassador-tematik',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-partnerlik',
        label: '9. Partnerlik ve Co-Working',
        description:
          'Uluslararası zincir co-working alanları ile co-brand: üyelere özel indirim. Alternatif olarak yerel anlaşmalar.',
        href: '#ambassador-partnerlik',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-organizasyon',
        label: '10. Organizasyon Yapısı',
        description:
          'Ambassador\'lar Marketing departmanına bağlı; her Ambassador için 1 POC (Point of Contact) — Ambassador etkisini maksimize etmek göreviyle.',
        href: '#ambassador-organizasyon',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-scorecard',
        label: '11. Selection Scorecard',
        description:
          'Değerlendirme kriterleri: Network strength %30, Execution ability %25, Responsiveness %15, Reputation/trust %15, Motivation %15.',
        href: '#ambassador-scorecard',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-growth',
        label: '12. Growth & Execution Checklist',
        description:
          'Advisor Growth, Content & SEO, Community & Activation, Monetization ve Scale adımlarını kapsayan yürütme listesi.',
        href: '#ambassador-growth',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-legal',
        label: '13. Legal & Financial Setup',
        description:
          'Şirket kuruluşu, ülke ve yapı seçimi (Estonya/Almanya/İngiltere), banka hesabı, Stripe, sözleşmeler, muhasebe ve vergi yapısı.',
        href: '#ambassador-legal',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-product',
        label: '14. Product & Funnel Setup',
        description:
          'Advisor ve kullanıcı onboarding checklist\'leri, hizmet kategorileri, pitch script, DM şablonları, landing page copy ve temel kullanıcı yolculuğu.',
        href: '#ambassador-product',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-acquisition',
        label: '15. Acquisition Strategy',
        description:
          '20 diaspora topluluğu, WhatsApp/LinkedIn dağıtım listesi, 10 viral içerik hook\'u, 3 farklı edinim kanalı testi.',
        href: '#ambassador-acquisition',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-pricing',
        label: '16. Pricing Strategy',
        description:
          'Komisyon yapısının tanımlanması, danışman ve kullanıcı tarafında fiyat duyarlılığı testleri.',
        href: '#ambassador-pricing',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-partnerships',
        label: '17. Partnerships',
        description:
          '10 potansiyel partner (banka, telco, havayolu) tespiti, partnership pitch hazırlığı ve outreach.',
        href: '#ambassador-partnerships',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-branding',
        label: '18. Branding & Infrastructure',
        description:
          'Temel marka varlıkları (logo, kimlik), sosyal medya hesapları, domain ve kurumsal e-posta kurulumu.',
        href: '#ambassador-branding',
        categorySlug: 'ambassador',
      },
      {
        id: 'ambassador-poc',
        label: '19. POC Twin Model',
        description:
          'Şehirlerden gelen veriler, etkinlik ve WhatsApp bot verileriyle beslenen POC Twin: POC ayrıldığında Ambassador topluluğunu otomatik yönetir.',
        href: '#ambassador-poc',
        categorySlug: 'ambassador',
      },
    ],
  },
  {
    slug: 'ekip',
    label: 'EKİP & ÜCRET',
    shortDescription: 'Ekip planı, rol dağılımı, örnek maaş bantları, hisse (ESOP) çerçevesi ve görev tanımları.',
    iconKey: 'layers',
    defaultExpanded: false,
    overview: {
      title: 'Ekip, Ücret ve Hisse Planı',
      description:
        'EKİP_ÜCRET_HİSSE çalışma dosyasının inceleme notları: 16 tanımlı rol, işe alım aşamaları, örnek ESOP yüzdeleri, Almanya/Londra/Dubai ücret bantları ve görev tanımı altyapısı.',
      ctaLabel: 'Ekip docs\'a git',
    },
    items: [
      {
        id: 'ekip-genel-yapi',
        label: '1. Genel Yapı',
        description:
          '16 tanımlı rol, 2 kurucu, 6 birinci ekip üyesi, 4 yıl vest / 1 yıl cliff vesting yapısı ve şu anki ücret/hisse toplamları.',
        href: '#ekip-genel-yapi',
        categorySlug: 'ekip',
        featuredOrder: 12,
      },
      {
        id: 'ekip-ekip-sayfasi',
        label: '2. EKİP Sayfası — Rol Tablosu',
        description:
          'Başvuran, aşama, kurucu/rol, ekip, CV, görüşmeci, puan, ücret ve hisse kolonlarından oluşan işe alım tablosu.',
        href: '#ekip-ekip-sayfasi',
        categorySlug: 'ekip',
        featuredOrder: 13,
      },
      {
        id: 'ekip-hisse-dagilimi',
        label: '3. Kesin Olmayan Hisse Dağılımı',
        description:
          'Ürün/mühendislik çekirdeği ve büyüme/operasyon rolleri için örnek ESOP yüzdeleri; Danışman/Yatırımcı hisse çerçevesi.',
        href: '#ekip-hisse-dagilimi',
        categorySlug: 'ekip',
      },
      {
        id: 'ekip-ucret-bantlari',
        label: '4. Örnek Ücret Bantları',
        description:
          'Almanya (EUR), Londra (GBP) ve Dubai (AED) için 11 rol bazında piyasa ücret aralıkları.',
        href: '#ekip-ucret-bantlari',
        categorySlug: 'ekip',
      },
      {
        id: 'ekip-butce-toplami',
        label: '5. Toplam Ücret Bütçesi',
        description:
          'Almanya 660K–925K EUR, Londra 605K–935K GBP, Dubai 2.55M–4.11M AED — şehir bazlı toplam ekip bütçe sınırları.',
        href: '#ekip-butce-toplami',
        categorySlug: 'ekip',
      },
      {
        id: 'ekip-gorev-tanimlari',
        label: '6. Görev Tanımları Sayfası',
        description:
          'Pozisyon → Görev Tanımı eşleştirme altyapısı: EKİP sayfasından formülle çekilen 16 pozisyon, henüz doldurulmamış tanım kolonları.',
        href: '#ekip-gorev-tanimlari',
        categorySlug: 'ekip',
      },
      {
        id: 'ekip-eksikler',
        label: '7. Dikkat Çeken Eksikler',
        description:
          'Boş ücret/hisse kolonları, tamamlanmamış görev tanımları, yazım tutarsızlıkları (Mobile Dveloper, GÖRVE TANIMLARI) ve açık satırlar.',
        href: '#ekip-eksikler',
        categorySlug: 'ekip',
      },
      {
        id: 'ekip-sonuc',
        label: '8. Kısa Sonuç',
        description:
          'Dosyanın kesin karar belgesi değil; planlama + taslak organizasyon + kompanzasyon çerçevesi niteliğinde olduğunun özeti.',
        href: '#ekip-sonuc',
        categorySlug: 'ekip',
      },
    ],
  },
  {
    slug: 'dijitalpazarlama',
    label: 'DİJİTAL PAZARLAMA',
    shortDescription: 'İçerik ve kampanya yönetimi çalışma şablonu — içerik takibi, kampanya planlama ve durum izleme.',
    iconKey: 'file-text',
    defaultExpanded: false,
    overview: {
      title: 'Dijital Pazarlama Planı',
      description:
        'İçerik üretim süreci ve pazarlama kampanyalarını tek çatı altında takip eden dijital pazarlama çalışma şablonunun inceleme notları: içerik türleri, durum akışları, kampanya fikirleri ve doldurul­ması gereken alanlar.',
      ctaLabel: 'Pazarlama docs\'a git',
    },
    items: [
      {
        id: 'dijital-genel',
        label: '1. Genel Yapı',
        description:
          'İki sekmeli çalışma şablonu: İçerikler + Kampanyalar1. Başlık yapıları ve durum seçenekleri tanımlı; operasyonel detaylar henüz taslak aşamasında.',
        href: '#dijital-genel',
        categorySlug: 'dijitalpazarlama',
        featuredOrder: 16,
      },
      {
        id: 'dijital-icerikler',
        label: '2. İçerikler Sekmesi',
        description:
          'E-posta, sosyal medya, TV ve blog gibi içerik tiplerini tek tabloda takip eden sekme. Alanlar: içerik adı, tür, ayrıntılar, sahibi, durum, yayın tarihi, dosya, notlar.',
        href: '#dijital-icerikler',
        categorySlug: 'dijitalpazarlama',
        featuredOrder: 17,
      },
      {
        id: 'dijital-icerik-durumlari',
        label: '3. İçerik Durum Akışı',
        description:
          'Beş durum aşaması: Yeni → Devam Ediyor → İnceleniyor → Yayınlandı / Askıya Alındı / Duraklatıldı.',
        href: '#dijital-icerik-durumlari',
        categorySlug: 'dijitalpazarlama',
      },
      {
        id: 'dijital-kampanyalar',
        label: '4. Kampanyalar Sekmesi',
        description:
          'Kampanya adı, tür, sahibi, durum, başlangıç/bitiş tarihi, öğeler ve notlar. İlk kampanya fikri: "İlk 100 işletme/danışmana sosyal medyada ücretsiz video."',
        href: '#dijital-kampanyalar',
        categorySlug: 'dijitalpazarlama',
      },
      {
        id: 'dijital-kampanya-durumlari',
        label: '5. Kampanya Durum Akışı',
        description:
          'Beş kampanya durumu: Planlanıyor → Gelişiyor → İnceleniyor → Beklemede → Yayınlandı.',
        href: '#dijital-kampanya-durumlari',
        categorySlug: 'dijitalpazarlama',
      },
      {
        id: 'dijital-eksikler',
        label: '6. Doldurulması Gereken Alanlar',
        description:
          'İçerik ve kampanya isimleri, sorumlu kişiler, başlangıç ve yayın tarihleri, ilgili dosyalar ve notlar — şablonun operasyonel hale gelmesi için öncelikli alanlar.',
        href: '#dijital-eksikler',
        categorySlug: 'dijitalpazarlama',
      },
    ],
  },
  {
    slug: 'whatsappbot',
    label: 'WHATSAPP BOT',
    shortDescription: 'WhatsApp grubuna bot entegrasyonu — reklam yapısı, opt-in modeli, token ödül sistemi ve teknik altyapı.',
    iconKey: 'layers',
    defaultExpanded: false,
    overview: {
      title: 'WhatsApp Bot Entegrasyonu',
      description:
        'WhatsApp grubuna entegre edilecek bot ile reklam ve tanıtım yapısının tüm boyutları: teknik altyapı seçenekleri, grup içi senaryolar, opt-in DM modeli, topluluk yapısı ve tıkla-kazan token sistemi.',
      ctaLabel: 'WhatsApp Bot docs\'a git',
    },
    items: [
      {
        id: 'wa-genel-cerceve',
        label: '1. Genel Çerçeve',
        description:
          'WhatsApp grubunda bot ile reklam ve tanıtım yapmanın genel stratejisi; Meta\'nın spam kuralları ve stratejik/teknik doğru kurgunun önemi.',
        href: '#wa-genel-cerceve',
        categorySlug: 'whatsappbot',
        featuredOrder: 18,
      },
      {
        id: 'wa-teknik-altyapi',
        label: '2. Teknik Altyapı Seçenekleri',
        description:
          'Resmi yol: WhatsApp Business API (Twilio, WATI, Interakt) — güvenli, ücretli, yeşil tik. Gayriresmi yol: whatsapp-web.js / Baileys — ücretsiz, esnek, yüksek ban riski.',
        href: '#wa-teknik-altyapi',
        categorySlug: 'whatsappbot',
        featuredOrder: 19,
      },
      {
        id: 'wa-tanitim-senaryolari',
        label: '3. Grup İçi Tanıtım Senaryoları',
        description:
          'Tetikleyici komutlar (!kampanyalar, !katalog), zamanlanmış Cron Job paylaşımları ve DM\'e yönlendirme — en sağlıklı üç bot akışı.',
        href: '#wa-tanitim-senaryolari',
        categorySlug: 'whatsappbot',
      },
      {
        id: 'wa-uygulama-adimlari',
        label: '4. Uygulama Adımları',
        description:
          'Bot için ayrı numara tahsisi, platform/yazılım kurulumu (Chatfuel, ManyChat), gruba ekleme ve admin yetkisi, katalog entegrasyonu.',
        href: '#wa-uygulama-adimlari',
        categorySlug: 'whatsappbot',
      },
      {
        id: 'wa-kritik-noktalar',
        label: '5. Kritik Dikkat Noktaları',
        description:
          'Banlanmayı önlemek için mesaj hızı ve random delay, grup dinamiği yönetimi, salt reklam yerine müşteri hizmetleri asistanı konumlandırması.',
        href: '#wa-kritik-noktalar',
        categorySlug: 'whatsappbot',
      },
      {
        id: 'wa-optin-model',
        label: '6. Opt-in ve DM Stratejisi',
        description:
          '"KAZAN" komutuyla opt-in, hedefli DM gönderimi, "DUR" ile abonelik iptali — gruba reklam yüklemeden sadece isteyenlere ulaşan en sağlıklı model.',
        href: '#wa-optin-model',
        categorySlug: 'whatsappbot',
      },
      {
        id: 'wa-community-model',
        label: '7. WhatsApp Topluluk (Community) Modeli',
        description:
          'Ana sohbet grubu + "Fırsatlar ve Ödüller" alt grubu yapısı; botun yalnızca opt-in alt gruba mesaj atması ile grup dinamiğinin korunması.',
        href: '#wa-community-model',
        categorySlug: 'whatsappbot',
      },
      {
        id: 'wa-token-sistemi',
        label: '8. Token Kazanım Sistemi (Tıkla-Kazan)',
        description:
          'WhatsApp numarası–wallet eşleştirme, kişiye özel benzersiz linkler, tıklama webhook\'u, cüzdana anlık token aktarımı ve suistimal önleme kuralları.',
        href: '#wa-token-sistemi',
        categorySlug: 'whatsappbot',
        featuredOrder: 20,
      },
      {
        id: 'wa-ozet-todo',
        label: '9. Genel Özet ve TODO Listesi',
        description:
          'Teknik altyapı seçimi, bot numarası, opt-in/out yapısı, wallet eşleme, tıklama takibi, token ödül altyapısı ve spam/ban risk azaltma — tüm aksiyonlar.',
        href: '#wa-ozet-todo',
        categorySlug: 'whatsappbot',
      },
    ],
  },
  {
    slug: 'roadmap',
    label: 'Roadmap',
    shortDescription: '12 aylık stratejik roadmap — MVP\'den Seed Ready\'e faz bazlı büyüme planı.',
    iconKey: 'calendar',
    defaultExpanded: false,
    overview: {
      title: '12 Aylık Roadmap',
      description: 'M1 MVP\'den M12 Seed Ready\'e uzanan stratejik büyüme planı: advisor hedefleri, kullanıcı büyümesi ve gelir kilometre taşları.',
      ctaLabel: 'Roadmap\'e Bak',
    },
    items: [
      {
        id: 'todo-roadmap-ozet',
        label: '1. 12 Aylık Roadmap Özeti',
        description: 'M1 MVP (20 advisor / 50 kullanıcı) → M12 Seed Ready (500 advisor / 20K kullanıcı / $100K revenue).',
        href: '#todo-roadmap-ozet',
        categorySlug: 'roadmap',
        featuredOrder: 35,
      },
      {
        id: 'todo-mvp-phase',
        label: '2. MVP Fazı (M1–M2)',
        description: 'Platform canlı, booking sistemi, ilk 20–50 advisor onboarding, 10 SEO içerik, ilk satış.',
        href: '#todo-mvp-phase',
        categorySlug: 'roadmap',
        featuredOrder: 36,
      },
      {
        id: 'todo-launch-phase',
        label: '3. Launch Fazı (M3)',
        description: 'Stripe entegrasyonu, onboarding optimizasyonu, GA kurulumu, güvenlik, mobil optimizasyon, $1K revenue.',
        href: '#todo-launch-phase',
        categorySlug: 'roadmap',
      },
      {
        id: 'todo-growth-pmf',
        label: '4. Growth ve PMF Fazı (M4–M6)',
        description: 'Referral sistemi, içerik ölçekleme, community dağıtımı, $3K–$10K revenue, 1K–2K kullanıcı, retention odağı.',
        href: '#todo-growth-pmf',
        categorySlug: 'roadmap',
      },
      {
        id: 'todo-scale-expansion',
        label: '5. Scale ve Expansion Fazı (M7–M11)',
        description: 'Yeni şehirler, B2B anlaşmalar, partnership, perks katmanı, otomasyon, $15K–$80K revenue, 3K–15K kullanıcı.',
        href: '#todo-scale-expansion',
        categorySlug: 'roadmap',
      },
    ],
  },
  {
    slug: 'projetakibi',
    label: 'Proje Takibi Şablonu',
    shortDescription: 'Corteqs için hazırlanmış görev bazlı proje takip şablonu.',
    iconKey: 'layers',
    defaultExpanded: false,
    overview: {
      title: 'Proje Takibi Şablonu',
      description: 'Tek sayfada proje kimliği, görev durumu, öncelik, ilerleme yüzdesi, sabit maliyet ve saat takibini bir araya getiren Corteqs proje yönetim şablonu.',
      ctaLabel: 'Yapıyı İncele',
    },
    items: [
      {
        id: 'pt-genel-yapi',
        label: '1. Genel Yapı ve Amaç',
        description: 'Küçük ekipler için sade single-page takip mantığı.',
        href: '#pt-genel-yapi',
        categorySlug: 'projetakibi',
        featuredOrder: 40,
      },
    ],
  },
  {
    slug: 'links',
    label: 'DOSYALAR VE LİNKLER',
    shortDescription: 'Departman bazlı dosya ve linklerin merkezi yönetim tablosu.',
    iconKey: 'book',
    defaultExpanded: false,
    overview: {
      title: 'Dosyalar ve Linkler',
      description: 'Departman bazlı dosya ve linkleri tek yerde görüntüleyin ve yönetin.',
      ctaLabel: 'Dosya ve Linklere Git',
    },
    items: [
      {
        id: 'links-main',
        label: 'Dosya ve Link Listesi',
        description: 'Tüm dosya ve linklerin merkezi CRUD tablosu.',
        href: '/links',
        categorySlug: 'links',
        featuredOrder: 43,
      },
    ],
  },
  {
    slug: 'kortexdocs',
    label: 'Kortex — CTO, Pitch & PRD Dokümanları',
    shortDescription: 'CTO Handoff, Yatırımcı Pitch özeti ve Product Requirements Document yapılandırılmış halde.',
    iconKey: 'layers',
    defaultExpanded: false,
    overview: {
      title: 'Kortex Temel Dokümanları',
      description: 'Teknik devir teslim (CTO Handoff), yatırımcı sunum özeti (Pitch) ve ürün gereksinimleri dokümanı (PRD) tek çatı altında.',
      ctaLabel: 'Dokümanlara Bak',
    },
    items: [
      {
        id: 'kortex-cto-handoff',
        label: '1. CTO Handoff',
        description: 'Tech stack, mimari (Country→City→Category→Listing), veritabanı modelleri, entegrasyonlar, güvenlik ve ölçeklenebilirlik kararları.',
        href: '#kortex-cto-handoff',
        categorySlug: 'kortexdocs',
        featuredOrder: 28,
      },
      {
        id: 'kortex-pitch',
        label: '2. Investor Pitch',
        description: 'Vizyon, problem/çözüm, pazar büyüklüğü (10M+ Türk diaspora), gelir modeli, rekabet avantajı ve yatırımcı talebi.',
        href: '#kortex-pitch',
        categorySlug: 'kortexdocs',
        featuredOrder: 29,
      },
      {
        id: 'kortex-prd',
        label: '3. PRD — Ürün Gereksinimleri',
        description: 'Kullanıcı rolleri, listing sistemi, claim mekanizması, AI arama, harita entegrasyonu, MVP kapsam (Almanya önce) ve gelecek roadmap.',
        href: '#kortex-prd',
        categorySlug: 'kortexdocs',
        featuredOrder: 30,
      },
    ],
  },
  {
    slug: 'captable',
    label: 'Cap Table v2 — Hisse Yapısı',
    shortDescription: 'CorteQS hisse yapısı, ESOP havuzu, vesting planı, ertelenen ücretler ve dilüsyon senaryoları.',
    iconKey: 'layers',
    defaultExpanded: false,
    overview: {
      title: 'Cap Table v2 — Equity & Founder Efor',
      description: 'US/Delaware VC normlarına göre hazırlanan v2.0 cap table: fully diluted hisse yapısı, ESOP stratejisi, vesting kuralları ve yatırım turu dilüsyon senaryoları.',
      ctaLabel: 'Cap Table\'a Bak',
    },
    items: [
      {
        id: 'ct-sirket-hisse',
        label: '1. Şirket Bilgileri ve Hisse Yapısı',
        description: '1.000.000 authorized share; kurucular 850.000 Common Share (%85), ESOP 150.000 opsiyon (%15). Fully diluted tablo.',
        href: '#ct-sirket-hisse',
        categorySlug: 'captable',
        featuredOrder: 31,
      },
      {
        id: 'ct-kurucu-dagilim',
        label: '2. Kurucu Hisse Dağılımı',
        description: 'Burak Akçakanat (CEO) %42,5 — Umut Barış Terzioğlu (CTO) %42,5. 48 ay vesting, 12 ay cliff.',
        href: '#ct-kurucu-dagilim',
        categorySlug: 'captable',
        featuredOrder: 32,
      },
      {
        id: 'ct-esop-strateji',
        label: '3. ESOP Allocation Stratejisi',
        description: 'COO, CMO, CFO, Lead Engineer x2, Satış/BD, Advisor havuzu için planlanan opsiyon aralıkları ve vesting parametreleri.',
        href: '#ct-esop-strateji',
        categorySlug: 'captable',
      },
      {
        id: 'ct-ertelenen-ucret',
        label: '4. Rol Tanımı ve Ertelenen Ücret Planı',
        description: 'MVP öncesi piyasa değeri ve ertelenen ücret tablosu. Tüm ertelemeler Seed Round kapanışında ödenir.',
        href: '#ct-ertelenen-ucret',
        categorySlug: 'captable',
      },
      {
        id: 'ct-founder-efor',
        label: '5. Founder Efor Takip Kayıtları',
        description: 'Burak ve Barış için aylık çalışılan gün, aktivite ve kümülatif ücret takip tablosu (2026 yılı, due diligence için).',
        href: '#ct-founder-efor',
        categorySlug: 'captable',
      },
      {
        id: 'ct-vesting-cliff',
        label: '6. Vesting, Cliff ve Acceleration',
        description: 'Kurucu (48 ay/12 ay cliff), kilit çalışan (36 ay/12 ay), advisor (24 ay) parametreleri. Double Trigger acceleration, Good/Bad Leaver kuralları.',
        href: '#ct-vesting-cliff',
        categorySlug: 'captable',
        featuredOrder: 33,
      },
      {
        id: 'ct-dilüsyon-senaryolar',
        label: '7. Yatırım Prensipleri ve Dilüsyon Senaryoları',
        description: 'Pre-Seed ($150K), Seed ($750K), Series A ($3M) tur bazlı dilüsyon tablosu. Pre-money ESOP refresh, anti-dilüsyon, liquidation preference.',
        href: '#ct-dilüsyon-senaryolar',
        categorySlug: 'captable',
        featuredOrder: 34,
      },
      {
        id: 'ct-yonetisim-kurallar',
        label: '8. Yönetişim Kuralları ve İmza',
        description: 'Değişiklikler için her iki kurucu yazılı onayı. Her 3 ayda bir güncelleme. ESOP grant başına ayrı Grant Agreement zorunluluğu.',
        href: '#ct-yonetisim-kurallar',
        categorySlug: 'captable',
      },
    ],
  },
  {
    slug: 'testfall',
    label: 'TEST SENARYOLARI',
    shortDescription: 'Belgelenmiş test senaryoları, durumlar ve çalıştırma çıktıları.',
    iconKey: 'file-text',
    defaultExpanded: false,
    overview: {
      title: 'Test Senaryoları',
      description: 'Örnekler ve en iyi uygulamalarla kapsamlı test senaryosu dokümantasyonu.',
      ctaLabel: 'Test dokümanlarını incele',
    },
    items: [
      {
        id: 'testfall-test-cases',
        label: 'Test Durumları',
        description: 'Beklenen ürün davranışlarını tanımlayan birincil test durumları.',
        href: '#testfall-test-cases',
        categorySlug: 'testfall',
        featuredOrder: 3,
      },
      {
        id: 'testfall-test-scenarios',
        label: 'Test Senaryoları',
        description: 'Senaryo tabanlı yürütme yolları ve bağlama özgü varyasyonlar.',
        href: '#testfall-test-scenarios',
        categorySlug: 'testfall',
      },
      {
        id: 'testfall-test-results',
        label: 'Test Sonuçları',
        description: 'Gözlemlenen çıktılar, kontrol noktaları ve sonuç takip notları.',
        href: '#testfall-test-results',
        categorySlug: 'testfall',
      },
    ],
  },
  {
    slug: 'planung',
    label: 'PLANLAMA',
    shortDescription: 'Kilometre taşları, planlama bağlamı ve teslimat sıralaması.',
    iconKey: 'calendar',
    defaultExpanded: false,
    overview: {
      title: 'Proje Planlaması',
      description: 'Planlama kaynakları, kilometre taşı takibi ve proje zaman çizelgesi yönetimi.',
      ctaLabel: 'Planlama dokümanlarına göz at',
    },
    items: [
      {
        id: 'planung-project-planning',
        label: 'Proje Planlaması',
        description: 'Hedefleri, kapsamı ve sıralamayı çerçeveleyen temel planlama belgeleri.',
        href: '#planung-project-planning',
        categorySlug: 'planung',
      },
      {
        id: 'planung-milestones',
        label: 'Kilometre Taşları',
        description: 'Fazlar genelinde kontrol noktası tanımları ve teslimat beklentileri.',
        href: '#planung-milestones',
        categorySlug: 'planung',
      },
      {
        id: 'planung-timeline',
        label: 'Zaman Çizelgesi',
        description: 'Büyük girişim adımları için kronolojik teslimat görünümü.',
        href: '#planung-timeline',
        categorySlug: 'planung',
      },
    ],
  },
  {
    slug: 'architecture',
    label: 'MİMARİ',
    shortDescription: 'Sistem tasarımı, bileşen sınırları ve veri akışı.',
    iconKey: 'layers',
    defaultExpanded: false,
    overview: {
      title: 'Mimari Genel Bakış',
      description: 'Sistem mimarisi, bileşen diyagramları ve teknik özellikler.',
      ctaLabel: 'Mimari dokümanları keşfet',
    },
    items: [
      {
        id: 'architecture-system-design',
        label: 'Sistem Tasarımı',
        description: 'Üst düzey mimari ve alt sistem sorumlulukları.',
        href: '#architecture-system-design',
        categorySlug: 'architecture',
        featuredOrder: 4,
      },
      {
        id: 'architecture-components',
        label: 'Bileşenler',
        description: 'Dokümantasyon merkezi için bileşen envanteri ve sınırları.',
        href: '#architecture-components',
        categorySlug: 'architecture',
      },
      {
        id: 'architecture-data-flow',
        label: 'Veri Akışı',
        description: 'Yapılandırma, içerik meta verisi ve gelecekteki veri kaynaklarının nasıl bağlandığı.',
        href: '#architecture-data-flow',
        categorySlug: 'architecture',
      },
    ],
  },
  {
    slug: 'tests',
    label: 'TESTLER',
    shortDescription: 'Birim, entegrasyon ve uçtan uca kapsama yayılan test stratejileri.',
    iconKey: 'test-tube',
    defaultExpanded: false,
    overview: {
      title: 'Test Rehberi',
      description: 'Birim testleri, entegrasyon testleri ve uçtan uca test stratejileri.',
      ctaLabel: 'Test dokümanlarını aç',
    },
    items: [
      {
        id: 'tests-unit-tests',
        label: 'Birim Testleri',
        description: 'Yalıtılmış bileşen ve yardımcı program doğrulama rehberi.',
        href: '#tests-unit-tests',
        categorySlug: 'tests',
      },
      {
        id: 'tests-integration-tests',
        label: 'Entegrasyon Testleri',
        description: 'Bileşenler arası ve servis düzeyinde doğrulama rehberi.',
        href: '#tests-integration-tests',
        categorySlug: 'tests',
      },
      {
        id: 'tests-e2e-tests',
        label: 'Uçtan Uca Testler',
        description: 'Uçtan uca kullanıcı yolculuğu kapsamı ve tarayıcı otomasyon notları.',
        href: '#tests-e2e-tests',
        categorySlug: 'tests',
      },
    ],
  },
]

export const docsOverviewCards: DocOverviewCard[] = docsCategories.map((category) => ({
  id: `${category.slug}-overview-card`,
  title: category.overview.title,
  description: category.overview.description,
  categorySlug: category.slug,
  categoryLabel: category.label,
  iconKey: category.iconKey,
  ctaLabel: category.overview.ctaLabel,
  href: `/${category.slug}`,
}))

export const docsQuickLinks: DocQuickLink[] = docsCategories
  .flatMap((category) =>
    category.items
      .filter((item) => item.featuredOrder !== undefined)
      .map((item) => ({
        id: item.id,
        label: item.label,
        categorySlug: item.categorySlug,
        featuredOrder: item.featuredOrder ?? Number.MAX_SAFE_INTEGER,
      }))
  )
  .sort((left, right) => left.featuredOrder - right.featuredOrder)
  .map(({ featuredOrder: _featuredOrder, ...quickLink }) => quickLink)

export const docCategorySlugs = docsCategories.map((category) => category.slug)

export function isDocCategorySlug(value: string | null): value is DocCategorySlug {
  return value !== null && docsCategories.some((category) => category.slug === value)
}

export function getDocCategory(slug: DocCategorySlug): DocCategoryDefinition {
  return docsCategories.find((category) => category.slug === slug) ?? docsCategories[0]
}

export function getDocItemById(itemId: string | null): DocNavItem | undefined {
  if (!itemId) {
    return undefined
  }

  return docsCategories
    .flatMap((category) => category.items)
    .find((item) => item.id === itemId)
}
