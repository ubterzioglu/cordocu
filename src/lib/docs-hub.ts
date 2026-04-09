export type DocCategorySlug =
  | 'general'
  | 'testfall'
  | 'planung'
  | 'architecture'
  | 'tests'
  | 'mvp'

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
      ctaLabel: 'MVP docs'a git',
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
          'MVP arama alanları, AI destekli doğal dil sorgulama (Berlin'de Türk dişçi), veri kaynakları ve sonuç sıralaması.',
        href: '#mvp-arama-filtreleme',
        categorySlug: 'mvp',
      },
      {
        id: 'mvp-icerik-toplama',
        label: '11. İçerik Toplama ve Veri Kaynakları',
        description:
          'Bireysel girişler, işletme başvuruları, toplu veri, Google Maps entegrasyonu, ticaret odaları, konsülosluk ve dış API'ler.',
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
          'MVP'de freemium yapı. Uzun vadede üyelik, reklam, sponsorluk, iş ilanları, kupon, AI twin, micro site ve dernek paketleri.',
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
