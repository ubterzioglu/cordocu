export type DocCategorySlug =
  | 'general'
  | 'testfall'
  | 'planung'
  | 'architecture'
  | 'tests'
  | 'mvp'
  | 'ambassador'
  | 'ekip'
  | 'toplanti'
  | 'dijitalpazarlama'
  | 'whatsappbot'
  | 'bawachat'
  | 'notionkararlar'
  | 'kortexdocs'
  | 'captable'
  | 'todolist'
  | 'roadmap'
  | 'projetakibi'

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
    label: 'GENERAL',
    shortDescription: 'Platform overview, onboarding guidance, and installation references.',
    iconKey: 'home',
    defaultExpanded: true,
    overview: {
      title: 'General Documentation',
      description: 'Overview, getting started guides, and basic concepts for using the platform.',
      ctaLabel: 'Open general docs',
    },
    items: [
      {
        id: 'general-overview',
        label: 'Overview',
        description: 'High-level product summary and entry point for the documentation hub.',
        href: '#general-overview',
        categorySlug: 'general',
        featuredOrder: 1,
      },
      {
        id: 'general-getting-started',
        label: 'Getting Started',
        description: 'Recommended first steps for new readers and contributors.',
        href: '#general-getting-started',
        categorySlug: 'general',
        featuredOrder: 2,
      },
      {
        id: 'general-installation',
        label: 'Installation',
        description: 'Local setup notes, prerequisites, and installation guidance.',
        href: '#general-installation',
        categorySlug: 'general',
      },
    ],
  },
  {
    slug: 'testfall',
    label: 'TESTFALL',
    shortDescription: 'Documented test cases, scenarios, and execution outputs.',
    iconKey: 'file-text',
    defaultExpanded: false,
    overview: {
      title: 'Test Cases',
      description: 'Comprehensive test case documentation with examples and best practices.',
      ctaLabel: 'Review testfall docs',
    },
    items: [
      {
        id: 'testfall-test-cases',
        label: 'Test Cases',
        description: 'Primary cases that describe expected product behaviors.',
        href: '#testfall-test-cases',
        categorySlug: 'testfall',
        featuredOrder: 3,
      },
      {
        id: 'testfall-test-scenarios',
        label: 'Test Scenarios',
        description: 'Scenario-based execution paths and context-specific variations.',
        href: '#testfall-test-scenarios',
        categorySlug: 'testfall',
      },
      {
        id: 'testfall-test-results',
        label: 'Test Results',
        description: 'Observed outputs, checkpoints, and result tracking notes.',
        href: '#testfall-test-results',
        categorySlug: 'testfall',
      },
    ],
  },
  {
    slug: 'planung',
    label: 'PLANUNG',
    shortDescription: 'Milestones, planning context, and delivery sequencing.',
    iconKey: 'calendar',
    defaultExpanded: false,
    overview: {
      title: 'Project Planning',
      description: 'Planning resources, milestone tracking, and project timeline management.',
      ctaLabel: 'Browse planning docs',
    },
    items: [
      {
        id: 'planung-project-planning',
        label: 'Project Planning',
        description: 'Core planning documents that frame goals, scope, and sequencing.',
        href: '#planung-project-planning',
        categorySlug: 'planung',
      },
      {
        id: 'planung-milestones',
        label: 'Milestones',
        description: 'Checkpoint definitions and delivery expectations across phases.',
        href: '#planung-milestones',
        categorySlug: 'planung',
      },
      {
        id: 'planung-timeline',
        label: 'Timeline',
        description: 'Chronological delivery view for major initiative steps.',
        href: '#planung-timeline',
        categorySlug: 'planung',
      },
    ],
  },
  {
    slug: 'architecture',
    label: 'ARCHITECTURE',
    shortDescription: 'System design, component boundaries, and data movement.',
    iconKey: 'layers',
    defaultExpanded: false,
    overview: {
      title: 'Architecture Overview',
      description: 'System architecture, component diagrams, and technical specifications.',
      ctaLabel: 'Explore architecture docs',
    },
    items: [
      {
        id: 'architecture-system-design',
        label: 'System Design',
        description: 'Top-level architecture and subsystem responsibilities.',
        href: '#architecture-system-design',
        categorySlug: 'architecture',
        featuredOrder: 4,
      },
      {
        id: 'architecture-components',
        label: 'Components',
        description: 'Component inventory and boundaries for the documentation hub.',
        href: '#architecture-components',
        categorySlug: 'architecture',
      },
      {
        id: 'architecture-data-flow',
        label: 'Data Flow',
        description: 'How configuration, content metadata, and future data sources connect.',
        href: '#architecture-data-flow',
        categorySlug: 'architecture',
      },
    ],
  },
  {
    slug: 'tests',
    label: 'TESTS',
    shortDescription: 'Testing strategies spanning unit, integration, and end-to-end coverage.',
    iconKey: 'test-tube',
    defaultExpanded: false,
    overview: {
      title: 'Testing Guide',
      description: 'Unit tests, integration tests, and end-to-end testing strategies.',
      ctaLabel: 'Open testing docs',
    },
    items: [
      {
        id: 'tests-unit-tests',
        label: 'Unit Tests',
        description: 'Isolated component and utility verification guidance.',
        href: '#tests-unit-tests',
        categorySlug: 'tests',
      },
      {
        id: 'tests-integration-tests',
        label: 'Integration Tests',
        description: 'Cross-component and service-level validation guidance.',
        href: '#tests-integration-tests',
        categorySlug: 'tests',
      },
      {
        id: 'tests-e2e-tests',
        label: 'E2E Tests',
        description: 'End-to-end user journey coverage and browser automation notes.',
        href: '#tests-e2e-tests',
        categorySlug: 'tests',
      },
    ],
  },
  {
    slug: 'mvp',
    label: 'MVP APPROACH',
    shortDescription: 'Birleştirilmiş MVP ürün, içerik ve gereksinim dökümanı — Kortex / Türk Diaspora Ağı.',
    iconKey: 'book',
    defaultExpanded: false,
    overview: {
      title: 'MVP Approach (Merged Documentation)',
      description:
        'İki ayrı kaynak dokümanı birleştirilerek hazırlanan Kortex / Türk Diaspora Ağı ürün vizyonu, MVP gereksinimleri, içerik yapısı ve teknik karar başlıkları.',
      ctaLabel: "MVP docs'a git",
    },
    items: [
      {
        id: 'mvp-platform-tanimi',
        label: '1. Platform Tanımı',
        description:
          'Kortex / Türk Diaspora Ağı nedir? Dünyanın farklı şehirlerinde yaşayan Türkler için tasarlanan global dijital platformun tek cümlelik değer önerisi.',
        href: '#mvp-platform-tanimi',
        categorySlug: 'mvp',
        featuredOrder: 5,
      },
      {
        id: 'mvp-temel-problem',
        label: '2. Temel Problem ve Çözüm',
        description:
          'Yerel bilgi eksikliği, topluluklara erişim ve sosyal/profesyonel bağlantı eksikliği — platformun çözdüğü üç temel problem.',
        href: '#mvp-temel-problem',
        categorySlug: 'mvp',
        featuredOrder: 6,
      },
      {
        id: 'mvp-hedef-kitle',
        label: '3. Hedef Kitle ve Pazarlar',
        description:
          'Ana hedef kitle ve başlangıç ülkeleri: Almanya, İngiltere, UAE, Avustralya, Fransa, Amerika, Kanada.',
        href: '#mvp-hedef-kitle',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-basari-metrikleri',
        label: '4. Başarı Metrikleri',
        description:
          'MVP başarısı için kritik üç metrik: Traction, Retention, Revenue. Ek destek metrikleri ve şehir bazlı doluluk oranı.',
        href: '#mvp-basari-metrikleri',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-bilgi-mimarisi',
        label: '5. Platform Bilgi Mimarisi',
        description:
          'Country → City → Category → Listing hiyerarşisi. Arama, filtreleme, şehir sayfaları ve harita görünümünün paylaştığı ortak omurga.',
        href: '#mvp-bilgi-mimarisi',
        categorySlug: 'mvp',
        featuredOrder: 7,
      },
      {
        id: 'mvp-kullanici-rolleri',
        label: '6. Kullanıcı Rolleri ve Hesap',
        description:
          'Bireysel kullanıcı, danışman, işletme sahibi, topluluk yöneticisi, moderatör ve admin rolleri. Google/Apple auth, KYC doğrulaması.',
        href: '#mvp-kullanici-rolleri',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-claim-sistemi',
        label: '7. Claim ve Sahiplenme Sistemi',
        description:
          'Topluluk tarafından eklenen işletmelerin gerçek sahipleri tarafından moderasyon onayıyla claim edilmesi modeli.',
        href: '#mvp-claim-sistemi',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-kategori-sistemi',
        label: '8. Kategori Sistemi',
        description:
          'Sağlık, hukuk, günlük yaşam, yeme-içme, eğitim, hizmetler, iş-kariyer, topluluklar, etkinlikler ve ek ticari alanlar.',
        href: '#mvp-kategori-sistemi',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-listing-veri-modeli',
        label: '9. Listing Veri Modeli',
        description:
          'Her listing için: temel bilgiler, iletişim, lokasyon, işletme bilgileri, medya, dil, rezervasyon, ödeme ve doğrulama durumu.',
        href: '#mvp-listing-veri-modeli',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-arama-filtreleme',
        label: '10. Arama, Filtreleme ve AI',
        description:
          "MVP arama alanları, AI destekli doğal dil sorgulama (Berlin'de Türk dişçi), veri kaynakları ve sonuç sıralaması.",
        href: '#mvp-arama-filtreleme',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-icerik-toplama',
        label: '11. İçerik Toplama ve Veri Kaynakları',
        description:
          "Bireysel girişler, işletme başvuruları, toplu veri, Google Maps entegrasyonu, ticaret odaları, konsülosluk ve dış API'ler.",
        href: '#mvp-icerik-toplama',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-harita',
        label: '12. Harita ve Lokasyon Deneyimi',
        description:
          'Şehirdeki Türk işletmelerini, profesyonelleri ve etkinlikleri harita üzerinde keşfetme. Google Maps entegrasyonu.',
        href: '#mvp-harita',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-cok-dilli',
        label: '13. Çok Dilli Yapı',
        description:
          'İlk aşamada Türkçe, İngilizce ve Almanca dil desteği. Dil seçeneği kullanıcı tercihine göre aktif olacak.',
        href: '#mvp-cok-dilli',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-topluluk-grup',
        label: '14. Topluluk ve Grup Sistemi',
        description:
          'WhatsApp, Telegram, Discord topluluklarının listelenmesi ve keşif işlevi. Moderasyon grup adminlerinde kalır.',
        href: '#mvp-topluluk-grup',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-etkinlik',
        label: '15. Etkinlik Sistemi',
        description:
          'Konser, meetup, networking, kültürel etkinlik, konferans, festival ve workshop — tarih, konum, açıklama, bilet linki.',
        href: '#mvp-etkinlik',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-yorum-puan',
        label: '16. Yorum, Puanlama ve Güven',
        description:
          'Kullanıcı puanlama ve yorum mekanizması. Google işletme ratinglerinin sisteme taşınması fikri.',
        href: '#mvp-yorum-puan',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-moderasyon',
        label: '17. Moderasyon ve Güvenlik',
        description:
          'İçerik onayı, kullanıcı raporlama, spam filtreleri, moderatör paneli. Auth güvenliği, KYC, rate limiting, RBAC.',
        href: '#mvp-moderasyon',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-ui-ux',
        label: '18. UI/UX Çerçevesi',
        description:
          'Mobil uyumluluk, pastel ton paleti, 19–24 ekran MVP tasarımı, onboarding süreci, marka adı ve ekran aileleri.',
        href: '#mvp-ui-ux',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-teknik-altyapi',
        label: '19. Teknik Altyapı ve Kararlar',
        description:
          '100K günlük kullanıcı hedefi, SSL, ölçeklenebilirlik. Önerilen stack: Next.js, Supabase, Google Maps, PostHog, Stripe.',
        href: '#mvp-teknik-altyapi',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-hosting',
        label: '20. Hosting ve Ölçeklenebilirlik',
        description:
          'Çok ülkeli veri yapısı, medya yükleme, harita, moderasyon, AI arama ve 100K kullanıcı hedefi için altyapı kriterleri.',
        href: '#mvp-hosting',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-pazarlama',
        label: '21. Pazarlama ve Lansman',
        description:
          'Beta kullanıcılar, 4–6 ay lansman hedefi, Instagram/Facebook/LinkedIn kanalları, THY master sponsor vizyonu.',
        href: '#mvp-pazarlama',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-gelir-modelleri',
        label: '22. Gelir Modelleri',
        description:
          "MVP'de freemium yapı. Uzun vadede üyelik, reklam, sponsorluk, iş ilanları, kupon, AI twin, micro site ve dernek paketleri.",
        href: '#mvp-gelir-modelleri',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-analitik',
        label: '23. Analitik ve Geri Bildirim',
        description:
          'Kullanıcı geri bildirim kanalı, henüz seçilmemiş analitik araçları, önerilen event seti: search, listing, claim, signup.',
        href: '#mvp-analitik',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-yol-haritasi',
        label: '24. Yol Haritası',
        description:
          'MVP: şehir/kategori/listing, login, arama, harita, moderasyon. V2: mobil uygulama, AI, monetization, premium sayfalar.',
        href: '#mvp-yol-haritasi',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-acik-kararlar',
        label: '25. Açık Karar Gerektiren Konular',
        description:
          'Marka adı, technology stack, hosting, veritabanı şeması, medya depolama, AI MVP kapsamı, güvenlik standardı ve lansman ülkeleri.',
        href: '#mvp-acik-kararlar',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-cto-aksiyonlar',
        label: '26. CTO / Product Lead Aksiyonları',
        description:
          'Öncelik 1: stack kararı, şema, auth modeli. Öncelik 2: onboarding, claim, çok dilli. Öncelik 3: monetization, analytics.',
        href: '#mvp-cto-aksiyonlar',
        categorySlug: 'mvp',
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
    slug: 'toplanti',
    label: 'TOPLANTI NOTLARI',
    shortDescription: 'Zoom toplantı notları — Şubat, Mart ve Nisan 2026 — Cortex projesinin oluşum süreci.',
    iconKey: 'calendar',
    defaultExpanded: false,
    overview: {
      title: 'Toplantı Notları',
      description:
        'Cortex (CorteQS) projesinin kuruluş sürecindeki Zoom görüşmelerinin birleştirilmiş notları: problem tespiti, platform vizyonu, operasyon, büyüme stratejileri ve sonraki adımlar.',
      ctaLabel: 'Toplantı notlarına git',
    },
    items: [
      {
        id: 'toplanti-1-ozet',
        label: 'Toplantı 1 — Genel Bakış (26 Şubat)',
        description:
          'İlk Zoom görüşmesi: diaspora fragmentasyonu problemi, "Cortex" platform fikrinin ortaya çıkışı ve haftalık 1 saatlik toplantı taahhüdü.',
        href: '#toplanti-1-ozet',
        categorySlug: 'toplanti',
        featuredOrder: 14,
      },
      {
        id: 'toplanti-1-problem',
        label: 'T1 — Problem: Diaspora Fragmentasyonu',
        description:
          'WhatsApp gruplarının yarattığı verimsizlik: tekrarlayan sorular, düşük kaliteli networking, doğrulanmış uzmanlara erişim eksikliği ve $150K dolandırıcılık örneği.',
        href: '#toplanti-1-problem',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-1-cozum',
        label: 'T1 — Çözüm: "Cortex" Platform',
        description:
          'Doğrulanmış uzman pazaryeri, AI Twins (ücretli danışmanlık), içerik üretimi ve merkezi etkinlik yönetimi özellikleriyle globale yönelik diaspora platformu.',
        href: '#toplanti-1-cozum',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-1-strateji',
        label: 'T1 — Stratejik Uyum ve İşbirliği',
        description:
          'Barış\'ın "101" girişimi (Almanya) ve Burak\'ın "Cortex" vizyonunun global-lokal ortaklık modeline dönüşümü; 6–8 aylık MVP zaman çizelgesi.',
        href: '#toplanti-1-strateji',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-1-adimlar',
        label: 'T1 — Sonraki Adımlar',
        description:
          'Haftalık Perşembe toplantısı, platform konseptinin tek sayfa özeti ve Fuat (Alman politikacı ağı) ile görüşme planı.',
        href: '#toplanti-1-adimlar',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-2-ozet',
        label: 'Toplantı 2 — Genel Bakış (12 Mart)',
        description:
          'İkinci Zoom görüşmesi: "Cortex" isminin kesinleşmesi, AI destekli MVP dokümantasyon stratejisi ve 17–19 Mart birleştirme planı.',
        href: '#toplanti-2-ozet',
        categorySlug: 'toplanti',
        featuredOrder: 15,
      },
      {
        id: 'toplanti-2-vizyon',
        label: 'T2 — Proje Vizyonu ve İsimlendirme',
        description:
          '"Cortex" isminin "Turkish Atlas"a tercih edilme gerekçesi: evrensel marka, yatırımcı çekiciliği ve diğer diaspora topluluklarına genişleme potansiyeli. Qualtron Sinclair (QS) çatısı.',
        href: '#toplanti-2-vizyon',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-2-gelistirme',
        label: 'T2 — Geliştirme Stratejisi',
        description:
          'AI destekli 50+ soru yöntemiyle kapsamlı MVP belgesi oluşturma; organik tasarım dili ve Türk motifleriyle özgün UI/UX yaklaşımı.',
        href: '#toplanti-2-gelistirme',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-2-ozellikler',
        label: 'T2 — Temel Özellikler ve Monetizasyon',
        description:
          'Danışmanlar, kuruluşlar, işletmeler, WhatsApp/Telegram grupları ve etkinlikler için özellik seti; premium abonelik, kupon gelir paylaşımı ve WhatsApp bot reklam modeli.',
        href: '#toplanti-2-ozellikler',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-2-buyume',
        label: 'T2 — Traction ve Büyüme Stratejisi',
        description:
          'Dubai Türk İş Konseyi (2000+ işletme) gibi mevcut diaspora konseylerinde toplu onboarding; diaspora influencer ortaklıkları ve Ottogether modeli.',
        href: '#toplanti-2-buyume',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-2-adimlar',
        label: 'T2 — Sonraki Adımlar',
        description:
          'AI destekli MVP belgesi (Burak), mevcut MVP\'nin devamı ve birleştirme (Barış), 17 Mart belge takası ve 19 Mart birleşik plan toplantısı.',
        href: '#toplanti-2-adimlar',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-3-ozet',
        label: 'Toplantı 3 — Genel Bakış (9 Nisan)',
        description:
          'Üçüncü Zoom görüşmesi: D.Cortex dashboard, influencer/City Partner modeli, manuel büyüme taktikleri ve ekip genişletme başlıkları netleşti.',
        href: '#toplanti-3-ozet',
        categorySlug: 'toplanti',
        featuredOrder: 16,
      },
      {
        id: 'toplanti-3-dashboard',
        label: 'T3 — D.Cortex ve Dokümantasyon Merkezi',
        description:
          'WhatsApp, Notion ve Drive dağınıklığını çözmek için tüm notları, kişileri ve MVP planını tek merkezde toplayan D.Cortex dashboard kararı.',
        href: '#toplanti-3-dashboard',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-3-icerik',
        label: 'T3 — Influencer ve İçerik Stratejisi',
        description:
          'Küçük influencerlarla City Partner modeli, WhatsApp grupları ve YouTube/Instagram/TikTok kaynaklı içerik akışı; ileride otomatik seyahat rotası üreticisi fikri.',
        href: '#toplanti-3-icerik',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-3-pazarlama',
        label: 'T3 — Gerilla Pazarlama ve SEO',
        description:
          'Viral diaspora videolarının yorumlarında manuel büyüme, gönüllü/stajyer ekip modeli, Google Console kurulumu ve mevcut domainlerden backlink akışı.',
        href: '#toplanti-3-pazarlama',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-3-ekip',
        label: 'T3 — Ekip, Operasyon ve AI Twin',
        description:
          'Seren Uzluer için pazarlama liderliği teklifi, yeni ekip üyeleri için SOP ve ertelenmiş ücret modeli, araç matrisi ve kurucu AI twin vizyonu.',
        href: '#toplanti-3-ekip',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-3-adimlar',
        label: 'T3 — Sonraki Adımlar',
        description:
          '12 Nisan\'a kadar D.Cortex paylaşımı, Google Console ekleme, tool matrix oluşturma, SOP gözden geçirme, backlink ve pazarlama liderliği takibi.',
        href: '#toplanti-3-adimlar',
        categorySlug: 'toplanti',
      },
      {
        id: 'toplanti-excel-kayitlari',
        label: 'Toplantı Kayıtları (Excel)',
        description: 'Toplantı notlarının Excel formatındaki ham kaydı. Dosya: Toplantı Kayıtları.xlsx — docu/ klasöründe mevcut.',
        href: '#toplanti-excel-kayitlari',
        categorySlug: 'toplanti',
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
    slug: 'bawachat',
    label: 'BA & UBT WA Chat',
    shortDescription: 'Burak Akçakanat ile WhatsApp yazışmalarından derlenen konu başlıkları ve karar noktaları.',
    iconKey: 'calendar',
    defaultExpanded: false,
    overview: {
      title: 'BA & UBT WhatsApp Chat Özeti',
      description: 'Şubat–Nisan 2026 arası Burak Akçakanat ile yürütülen WhatsApp yazışmalarından derlenen stratejik konu başlıkları, kararlar ve aksiyon maddeleri.',
      ctaLabel: 'Konulara Göz At',
    },
    items: [
      {
        id: 'bawa-ilk-tanis',
        label: '1. İlk Tanışma ve Görüşme Planlaması',
        description: 'Qatar-Dubai bağlantısı, LinkedIn paylaşımı, ilk Zoom toplantısının kurulması.',
        href: '#bawa-ilk-tanis',
        categorySlug: 'bawachat',
        featuredOrder: 21,
      },
      {
        id: 'bawa-ilk-toplanti',
        label: '2. İlk Toplantı Çıktıları',
        description: 'payaltr.com, qualtronsinclair.com, diasporanet, CORTEX-TURK ana hub fikrinin doğuşu.',
        href: '#bawa-ilk-toplanti',
        categorySlug: 'bawachat',
        featuredOrder: 22,
      },
      {
        id: 'bawa-marka-adi',
        label: '3. Marka Adı Tartışması',
        description: 'turqua-z.com vs CorteQS — datanın karar vermesi prensibi, marka oylama fikri.',
        href: '#bawa-marka-adi',
        categorySlug: 'bawachat',
      },
      {
        id: 'bawa-cto-insan',
        label: '4. CTO Rolü ve İnsan Kaynağı',
        description: "UBT'ye CTO rolünün teklifi, ücretsiz insan kaynağı bulma stratejisi.",
        href: '#bawa-cto-insan',
        categorySlug: 'bawachat',
      },
      {
        id: 'bawa-domain-marka',
        label: '5. Domain ve Marka Çalışması',
        description: 'corteqs.net, isim alternatifleri (TurkAtlas, TurkHub...), Notion daveti ve ortak çalışma alanı.',
        href: '#bawa-domain-marka',
        categorySlug: 'bawachat',
      },
      {
        id: 'bawa-haftalik-zoom',
        label: '6. Haftalık Perşembe Zoom Toplantıları',
        description: 'Perşembe 12:30 (DE) / 14:30 (QA) haftalık seri başlatıldı, 108 occurrence ICS.',
        href: '#bawa-haftalik-zoom',
        categorySlug: 'bawachat',
      },
      {
        id: 'bawa-lovable-github',
        label: '7. Lovable Admin ve GitHub Push',
        description: "Lovable workspace admin erişimi, repo GitHub'a push, sandbox/merge stratejisi.",
        href: '#bawa-lovable-github',
        categorySlug: 'bawachat',
      },
      {
        id: 'bawa-seo-blog',
        label: '8. SEO, Blog ve İçerik Stratejisi',
        description: 'Blog yazısı planı, Relocation Engine fikri, danışman/yazar kategorisi önerisi.',
        href: '#bawa-seo-blog',
        categorySlug: 'bawachat',
      },
      {
        id: 'bawa-network-is',
        label: '9. Network ve İş Yerleştirme',
        description: 'Akın Özkan, Kemal Hakimoğlu, Wide & Wise — Mercedes layoff adayı yönlendirmesi.',
        href: '#bawa-network-is',
        categorySlug: 'bawachat',
      },
      {
        id: 'bawa-ai-twin',
        label: '10. AI Dijital İkiz ve RAG',
        description: 'delphi.ai incelemesi, RAG (Retrieval-Augmented Generation) ile danışman twin fikri.',
        href: '#bawa-ai-twin',
        categorySlug: 'bawachat',
        featuredOrder: 23,
      },
      {
        id: 'bawa-cordocu',
        label: '11. CorDocu Lansmanı',
        description: 'cordocu.vercel.app ilk paylaşımı, yeni üyenin mevzuyu hızlı anlayacağı dashboard hedefi.',
        href: '#bawa-cordocu',
        categorySlug: 'bawachat',
      },
      {
        id: 'bawa-ekip-genisletme',
        label: '12. Ekip Genişletme ve Cap Table',
        description: 'Tech lead adayı observer katılımı, cap table modelleri, gönül önce — para sonra prensibi.',
        href: '#bawa-ekip-genisletme',
        categorySlug: 'bawachat',
      },
      {
        id: 'bawa-instagram-ambassador',
        label: '13. Instagram ve Ambassador Toplama',
        description: 'Ortak Instagram collection, danışman/ambassador profil havuzu oluşturma.',
        href: '#bawa-instagram-ambassador',
        categorySlug: 'bawachat',
      },
      {
        id: 'bawa-domain-satin',
        label: '14. Domain Satın Alma Kararı',
        description: 'corteqs.net alındı (Doruk); corteqs.co ve corteqs.ai planı, subdomain mimarisi.',
        href: '#bawa-domain-satin',
        categorySlug: 'bawachat',
      },
      {
        id: 'bawa-landing-fon',
        label: '15. Landing Page ve Fon Stratejisi',
        description: 'Teaser video, ülke kayıt sayaçları, şehir elçisi başvuru sayfası, crowd fund açılması.',
        href: '#bawa-landing-fon',
        categorySlug: 'bawachat',
        featuredOrder: 24,
      },
    ],
  },
  {
    slug: 'notionkararlar',
    label: 'Notion — Kararlar & Yapılanlar',
    shortDescription: 'Toplantı kararları, tamamlanan aksiyonlar, domain ownership modeli ve CorteQS gelir yapısı.',
    iconKey: 'file-text',
    defaultExpanded: false,
    overview: {
      title: 'Notion Karar & Yapılan Listesi',
      description: 'Toplantılarda alınan ana kararlar, hayata geçirilen özellikler, domain ownership modeli, KPI haritası ve araç seti.',
      ctaLabel: 'Kararlara Bak',
    },
    items: [
      {
        id: 'nk-ana-kararlar',
        label: '1. Ana Kararlar (MVP Süreci)',
        description: 'MVP v2.0 doküman takvimleri, nihai döküman birleştirme sorumluluğu, 0-100 startup standartları araştırması.',
        href: '#nk-ana-kararlar',
        categorySlug: 'notionkararlar',
        featuredOrder: 25,
      },
      {
        id: 'nk-core-team',
        label: '2. Core Team ve Rol Dağılımı',
        description: 'Burak (iş/strateji) + Barış (CTO/teknik) çekirdek ekip. Teknik kumanda UBT\'de.',
        href: '#nk-core-team',
        categorySlug: 'notionkararlar',
      },
      {
        id: 'nk-brainstorm-fikirler',
        label: '3. Brainstorm Fikirleri',
        description: 'WhatsApp grupları influencer için, SEO blog yarışması, City Ambassador, Jukebox, OdtuGather entegrasyonu.',
        href: '#nk-brainstorm-fikirler',
        categorySlug: 'notionkararlar',
      },
      {
        id: 'nk-yapilan-ozellikler',
        label: '4. Hayata Geçirilen Özellikler',
        description: 'Ambassador mantığı, haberler, hospital booking, jukebox, bireysel kullanıcı hizmet talebi, admin dashboard başlangıcı.',
        href: '#nk-yapilan-ozellikler',
        categorySlug: 'notionkararlar',
        featuredOrder: 26,
      },
      {
        id: 'nk-12mart-kararlar',
        label: '5. 12 Mart 2026 Toplantı Kararları',
        description: 'İşletme ekleme, Dubai Business Council (1000-2000 işletme), mass migration DB, danışmana danışmanlık mikro site+twin+chatbot.',
        href: '#nk-12mart-kararlar',
        categorySlug: 'notionkararlar',
      },
      {
        id: 'nk-gelir-feature',
        label: '6. Gelir Modelleri ve Feature Listesi',
        description: 'Bireysel danışman claiming, kuruluş/konsolosluk, bağış/aidat, iş ilanları, sponsored etkinlikler, hoşgeldin paketi.',
        href: '#nk-gelir-feature',
        categorySlug: 'notionkararlar',
        featuredOrder: 27,
      },
      {
        id: 'nk-24mart-kararlar',
        label: '7. 24 Mart 2026 Toplantı Kararları',
        description: 'Fikir→MVP→Traction→Tutundurma→Ölçekleme roadmap, hoşgeldin paketi içeriği, CorteQS WA kanalı, etkileşim havuzu sponsorluğu.',
        href: '#nk-24mart-kararlar',
        categorySlug: 'notionkararlar',
      },
      {
        id: 'nk-domain-ownership',
        label: '8. Domain Ownership Modeli',
        description: '6 domain: Supply, Demand, Transaction, Product, Platform Core, Support & CRM — her domain için 1 owner prensibi.',
        href: '#nk-domain-ownership',
        categorySlug: 'notionkararlar',
      },
      {
        id: 'nk-kpi-haritasi',
        label: '9. KPI Haritası',
        description: 'Supply/Demand/Revenue/Product/Support owner\'ları için kritik KPI listesi ve haftalık/aylık ritüel modeli.',
        href: '#nk-kpi-haritasi',
        categorySlug: 'notionkararlar',
      },
      {
        id: 'nk-audit-prompt',
        label: '10. Mimari Audit ve Ürün Backlog Prompt',
        description: 'GPT ile tam sistem analizi: kullanıcı tipleri, feature gap, gelir modeli, versiyon önceliklendirme (V1/V2/V3).',
        href: '#nk-audit-prompt',
        categorySlug: 'notionkararlar',
      },
      {
        id: 'nk-dokumanlar-linkler',
        label: '11. Dökümanlar ve Linkler',
        description: 'Google Drive ana klasörü, MVP doc, Lovable inv link, Cap Table v2, Şehir Elçileri dökümanı, Ekip/Ücret/Hisse taslağı.',
        href: '#nk-dokumanlar-linkler',
        categorySlug: 'notionkararlar',
      },
    ],
  },
  {
    slug: 'kortexdocs',
    label: 'Kortex — CTO, Pitch & PRD',
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
    label: 'Cap Table v2',
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
    shortDescription: 'Corteqs için hazırlanmış görev bazlı proje takip şablonu: 2 proje bloğu, 14 görev satırı, durum/öncelik anahtarları, maliyet ve saat takibi.',
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
        description: '1 sekme, 2 proje bloğu, 14 görev satırı, 9 maliyet verili satır. Küçük ekipler için sade single-page takip mantığı.',
        href: '#pt-genel-yapi',
        categorySlug: 'projetakibi',
        featuredOrder: 40,
      },
      {
        id: 'pt-ust-bilgiler',
        label: '2. Üst Bilgiler ve Anahtarlar',
        description: 'Proje başlığı, yöneticisi, şirket adı, tarih alanları — şu an placeholder. Durum: Beklemede / Henüz Başlamadı / Devam Ediyor / Tamamlandı. Öncelik: Düşük / Orta / Yüksek.',
        href: '#pt-ust-bilgiler',
        categorySlug: 'projetakibi',
      },
      {
        id: 'pt-proje1',
        label: '3. Proje 1 — Görevler',
        description: '5 görev satırı: Beklemede (×2), Henüz Başlamadı, Devam Ediyor, Tamamlandı. Tamamlanma %: 56 / 50 / 22 / 11. Maliyet ve saat alanları büyük ölçüde boş.',
        href: '#pt-proje1',
        categorySlug: 'projetakibi',
        featuredOrder: 41,
      },
      {
        id: 'pt-proje2',
        label: '4. Proje 2 — Görevler ve Maliyet',
        description: '9 görev satırı. Toplam sabit maliyet: 810. Tahmini saat: 43. Fiili saat: 42. Büyük çoğunluğu Tamamlandı; 1 Beklemede, 1 Henüz Başlamadı, 1 Devam Ediyor.',
        href: '#pt-proje2',
        categorySlug: 'projetakibi',
        featuredOrder: 42,
      },
      {
        id: 'pt-eksikler',
        label: '5. Eksikler ve Sonuç',
        description: 'Proje adı, sahiplik ve görev ayrıntıları placeholder. Atanan sütunu boş. Dosya gerçek operasyon arşivi değil; gerçek verilerle beslenmesi gereken bir şablon.',
        href: '#pt-eksikler',
        categorySlug: 'projetakibi',
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
