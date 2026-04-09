import {
  docsOverviewCards,
  docsQuickLinks,
  getDocCategory,
  getDocItemById,
  type DocCategorySlug,
  type DocIconKey,
} from './docs-hub'

const mvpSectionDetail: Record<string, string> = {
  'mvp-platform-tanimi':
    'Kortex / Türk Diaspora Ağı, dünyanın farklı şehirlerinde yaşayan Türklerin günlük hayatını kolaylaştırmak için tasarlanan global bir dijital platformdur. Türk işletmelerini, profesyonelleri, toplulukları, etkinlikleri, iş fırsatlarını, kuponları ve yerel rehber bilgilerini tek çatı altında toplar. Değer önerisi: "Diaspora için rehber, bağlantı merkezi ve çok amaçlı dijital yardımcı."',
  'mvp-temel-problem':
    '(1) Yerel bilgi eksikliği: Türk doktor, avukat, market, kuaför bulmak zor. (2) Topluluklara erişim eksikliği: WhatsApp grupları, Telegram toplulukları ve dernekler dağınık. (3) Sosyal ve profesyonel bağlantı eksikliği: etkinlikler, iş fırsatları ve profesyonel hizmetler görünür değil.',
  'mvp-hedef-kitle':
    'Yeni göç edenler, öğrenciler, profesyoneller, işletme sahipleri, danışmanlar, topluluk yöneticileri ve etkinlik organizatörleri. İlk 7 ülke: Almanya, İngiltere, UAE, Avustralya, Fransa, Amerika, Kanada.',
  'mvp-basari-metrikleri':
    'Kritik 3 metrik: Traction, Retention, Revenue. Destek metrikleri: aktif kullanıcı sayısı, şehir bazlı içerik doluluk oranı, claim edilen işletme sayısı, etkinlik ve grup tıklama oranı, işletme/danışman dönüşüm oranı.',
  'mvp-bilgi-mimarisi':
    'Country → City → Category → Listing (örn. Germany → Berlin → Restaurants → Anadolu Grill). Bu hiyerarşi; arama, filtreleme, şehir sayfaları, kategori listeleri ve harita görünümünün ortak omurgasıdır.',
  'mvp-kullanici-rolleri':
    'Ana tipler: bireysel kullanıcı, danışman/profesyonel, işletme sahibi, topluluk yöneticisi. Operasyonel: moderatör, admin. Giriş: Google/Apple veya standard auth. Doğrulama: danışmanlara KYC; doğrulanmış işletme, profesyonel ve topluluk rozetleri.',
  'mvp-claim-sistemi':
    'Bir işletme önce topluluk tarafından eklenir, ardından gerçek işletme sahibi moderasyon onayıyla claim ederek yönetimi devralır. Bu model veri büyümesini hızlandırırken sahipliğin sonradan doğrulanmasını sağlar.',
  'mvp-kategori-sistemi':
    'Sağlık (doktor, dişçi, psikolog…) | Hukuk ve danışmanlık (avukat, göçmenlik, muhasebe…) | Günlük yaşam (market, kasap, kuaför…) | Yeme-içme (restoran, kafe, pastane…) | Eğitim (Türk okulları, dil kursları…) | Hizmetler (emlak, temizlik, IT…) | İş ve kariyer | Topluluklar | Etkinlikler | Ek ticari alanlar (kuponlar, AI twin, sponsored içerik).',
  'mvp-listing-veri-modeli':
    'Temel: isim, kategori, ülke, şehir, açıklama. İletişim: telefon, WhatsApp, e-posta, website, sosyal medya. Lokasyon: adres, harita, Google Maps. İşletme: çalışma saatleri, hizmetler, fiyat aralığı. Medya: fotoğraf/video. Ek: konuşulan diller, rezervasyon, ödeme, puan/yorum, doğrulama durumu.',
  'mvp-arama-filtreleme':
    'MVP arama alanları: kullanıcılar, iş fırsatları, kuponlar, WhatsApp grupları. AI arama: "Berlin'de Türk dişçi" gibi doğal dil sorguları; şehir, kategori, hizmet dili ve kullanıcı puanına göre sıralama. Filtreler: ülke, şehir, kullanıcı tipi, alt kategori, featured/sponsored.',
  'mvp-icerik-toplama':
    'Kaynaklar: bireysel giriş, işletme/danışman başvurusu, kuruluş paketleri, toplu veri, Google Maps, ticaret odaları, dış API'ler. Özel: konsolosluk verisi gov.tr/Dışişleri kaynaklarından. Açık bırakılan başlıklar: ilk içerik üretim planı, veritabanı şeması, güncelleme sıklığı, medya depolama.',
  'mvp-harita':
    'Kullanıcılar şehirdeki Türk işletmelerini, profesyonelleri ve etkinlikleri harita üzerinden görebilecek. Google Maps entegrasyonu hem listing sayfaları hem arama deneyimi için ana bileşendir.',
  'mvp-cok-dilli':
    'İlk aşamada: Türkçe, İngilizce, Almanca. Kullanıcı tercihine göre aktif dil seçimi. Dil mimarisi ikinci öncelik paketi kapsamında ayrıca tasarlanacak.',
  'mvp-topluluk-grup':
    'WhatsApp, Telegram ve benzeri topluluklar listelenir ve keşfedilir. Platform rolü; listeleme ve keşif sağlamak. Grup yönetimi ve moderasyon doğrudan grup adminlerinde. Bu ayrım operasyonel yükü azaltır.',
  'mvp-etkinlik':
    'Desteklenen tipler: konser, meetup, networking, kültürel etkinlik, konferans, festival, workshop. Etkinlik sayfası alanları: tarih, konum, açıklama, bilet linki.',
  'mvp-yorum-puan':
    'Kullanıcılar işletmeleri puanlayabilir ve yorum yazabilir. Google işletme ratinglerinin sisteme taşınması değerlendirilmektedir. Hem platform içi puanlar hem dış kaynak referansları birlikte kullanılabilir.',
  'mvp-moderasyon':
    'Araçlar: içerik onayı, kullanıcı raporlama, spam filtreleri, moderatör paneli. Açık güvenlik başlıkları: auth güvenliği, KYC süreçleri, RBAC, rate limiting, içerik suistimali önleme, yedekleme ve loglama.',
  'mvp-ui-ux':
    'Mobil uyumluluk zorunlu. Pastel ton paleti; Türk kuruluşlarında kırmızı kullanılabilir. 19–24 ekranlık MVP ön görüsü. Onboarding: KYC, Google auth, profil unlock. Ekran aileleri: home, country, city, category, listing detail, search, map, event, community, profile, dashboard, claim flow, moderasyon.',
  'mvp-teknik-altyapi':
    'Hedef: 100K günlük kullanıcı, SSL zorunlu, çok diasporaya uyarlanabilir mimari. Önerilen stack: Next.js (frontend), Supabase (backend/auth/db), Google Maps, object storage (medya), PostHog veya GA4 (analitik), Stripe/ülke alternatifi (ödeme).',
  'mvp-hosting':
    'Hosting kriteri: çok ülkeli veri yapısı, medya yükleme, harita, çoklu rol, AI arama, 100K günlük kullanıcı. Aranan özellikler: hızlı geliştirme, RBAC, storage, search-friendly veri modeli, CDN, backup/restore kolaylığı.',
  'mvp-pazarlama':
    'Beta kullanıcılar kurucular tarafından bulunacak. Lansman hedefi: 4–6 ay. İlk kanallar: Instagram, Facebook, LinkedIn. THY tarafında master sponsor vizyonu değerlendiriliyor.',
  'mvp-gelir-modelleri':
    'MVP: freemium (ücretsiz). Uzun vade: üyelik paketleri, reklam, sponsorlar, webinarlar, iş ilanları, kupon satışı, online görüşme, AI twin bakım, sosyal medya paketi, micro site/web/app paketleri, dernek aidatı/etkinlik bileti. İlk yıl hedefi: 2000 işletme+danışman, 100K kullanıcı, 200K€ gelir.',
  'mvp-analitik':
    'Geri bildirim: destek/geri bildirim adresi üzerinden. Analitik aracı henüz seçilmedi. Önerilen event seti: search performed, listing viewed, claim started/completed, event clicked, contact clicked, signup completed, city/category engagement.',
  'mvp-yol-haritasi':
    'MVP: şehir/kategori/listing yapısı, login+profil, işletme/topluluk/etkinlik ekleme, arama+filtreleme, harita, temel moderasyon, çok dilli temel yapı. V2: mobil uygulama, güçlü AI öneri, gelişmiş monetization, premium sayfalar, gelişmiş rozet sistemi.',
  'mvp-acik-kararlar':
    '1) Nihai marka adı (Kortex/CorteQS/Türk Diaspora Ağı) 2) Tech stack 3) Hosting/deployment 4) Veritabanı şeması 5) Medya depolama 6) AI MVP kapsamı 7) Analitik aracı 8) Güvenlik/yedekleme standardı 9) Moderasyon manuel mi yarı otomatik mi? 10) Başlangıçta kaç ülke aktif açılacak?',
  'mvp-cto-aksiyonlar':
    'Öncelik 1: tech stack kararı, veritabanı şema taslağı, auth+rol modeli, listing veri modeli, moderasyon akışı, harita entegrasyon planı. Öncelik 2: onboarding akışı, claim sistemi, çoklu dil mimarisi, içerik giriş operasyonu, ilk ülke/şehir kapsamı. Öncelik 3: monetization altyapısı, analytics.',
}
import {
  buildDocCategoryHref,
  buildDocItemHref,
  buildDocsHubHref,
} from './docs-navigation'

export type ContentViewMode = 'hub-overview' | 'category-detail'
export type ContentCardDensity = 'default' | 'compact' | 'detail'
export type ContentCardActionSurface = 'card' | 'cta'

export interface ContentViewCardAction {
  type: 'link'
  href: string
  label: string
  surface?: ContentCardActionSurface
}

export interface ContentViewCard {
  id: string
  title: string
  description: string
  badge?: string
  eyebrow?: string
  detail?: string
  iconKey?: DocIconKey
  density?: ContentCardDensity
  anchorId?: string
  action?: ContentViewCardAction
}

export interface ContentViewEmptyState {
  title: string
  description: string
  action?: ContentViewCardAction
}

export interface ContentViewSection {
  id: string
  title: string
  description?: string
  columns?: 1 | 2 | 3
  cards: ContentViewCard[]
  emptyState?: ContentViewEmptyState
}

export interface ContentViewSearch {
  label: string
  placeholder: string
  helperText: string
}

export interface ContentView {
  mode: ContentViewMode
  eyebrow?: string
  title: string
  description: string
  supportingText?: string
  backLink?: {
    href: string
    label: string
  }
  metaBadges?: string[]
  search?: ContentViewSearch
  sections: ContentViewSection[]
}

export function getDocsHubContentView(): ContentView {
  const quickLinkCards = docsQuickLinks.reduce<ContentViewCard[]>(
    (cards, quickLink) => {
      const item = getDocItemById(quickLink.id)

      if (!item) {
        return cards
      }

      const category = getDocCategory(item.categorySlug)

      cards.push({
        id: quickLink.id,
        title: item.label,
        description: item.description,
        badge: category.label,
        eyebrow: 'Quick Link',
        density: 'compact',
        action: {
          type: 'link',
          href: buildDocItemHref(item),
          label: 'Open section',
          surface: 'card',
        },
      })

      return cards
    },
    []
  )

  return {
    mode: 'hub-overview',
    title: 'Table of Contents',
    description:
      'Browse documentation by category, then drill into stable section routes from the same shared content layout.',
    supportingText:
      'This session keeps the search field as placeholder UI only. Navigation should flow through category routes and section cards.',
    search: {
      label: 'Search',
      placeholder: 'Search documentation…',
      helperText:
        'Placeholder UI only in Session 05. Search should not be treated as a functional feature yet.',
    },
    sections: [
      {
        id: 'overview-categories',
        title: 'Browse by Category',
        description:
          'Each card opens a dedicated category route while preserving the shared shell, card contract, and section composition rules.',
        columns: 2,
        cards: docsOverviewCards.map((card) => ({
          id: card.id,
          title: card.title,
          description: card.description,
          badge: card.categoryLabel,
          iconKey: card.iconKey,
          density: 'default',
          action: {
            type: 'link',
            href: buildDocCategoryHref(card.categorySlug),
            label: card.ctaLabel,
            surface: 'card',
          },
        })),
      },
      {
        id: 'overview-quick-links',
        title: 'Quick Links',
        description:
          'Pinned routes for common starting points. These reuse the same card surface, but with denser metadata than the main category grid.',
        columns: 3,
        cards: quickLinkCards,
        emptyState: {
          title: 'Quick links are not configured yet',
          description:
            'Featured entry points can be added later without changing the shared card renderer or route contract.',
          action: {
            type: 'link',
            href: buildDocsHubHref(),
            label: 'Stay on hub',
            surface: 'cta',
          },
        },
      },
    ],
  }
}

export function getDocCategoryContentView(categorySlug: DocCategorySlug): ContentView {
  const category = getDocCategory(categorySlug)

  return {
    mode: 'category-detail',
    eyebrow: category.label,
    title: category.overview.title,
    description: category.overview.description,
    supportingText: category.shortDescription,
    backLink: {
      href: buildDocsHubHref(),
      label: 'Back to documentation hub',
    },
    metaBadges: [
      `${category.items.length} sections`,
      `Canonical route: /${category.slug}`,
    ],
    sections: [
      {
        id: `${category.slug}-section-map`,
        title: 'Section Map',
        description:
          'Summary cards stay route-aware and act as the fastest way to jump into anchored content blocks for this category.',
        columns: 3,
        cards: category.items.map((item, index) => ({
          id: `${item.id}-summary`,
          title: item.label,
          description: item.description,
          badge: category.label,
          eyebrow: `Section ${String(index + 1).padStart(2, '0')}`,
          density: 'compact',
          action: {
            type: 'link',
            href: buildDocItemHref(item),
            label: 'Jump to section',
            surface: 'card',
          },
        })),
        emptyState: {
          title: 'Content is being outlined for this category',
          description:
            'The route is valid, but section cards are not populated yet. Session 06 can style this state without redefining the content model.',
          action: {
            type: 'link',
            href: buildDocsHubHref(),
            label: 'Return to hub',
            surface: 'cta',
          },
        },
      },
      {
        id: `${category.slug}-sections`,
        title: 'Category Content',
        description:
          'Detailed section blocks keep anchor ids stable so later sessions can add richer modules without changing navigation behavior.',
        columns: 1,
        cards: category.items.map((item, index) => ({
          id: item.id,
          anchorId: item.id,
          title: item.label,
          description: item.description,
          detail:
            mvpSectionDetail[item.id] ??
            'Session 05 keeps this block intentionally content-light so Session 06 can focus on visual polish and Session 08 can validate semantics on a stable structure.',
          badge: category.label,
          eyebrow: `Section ${String(index + 1).padStart(2, '0')}`,
          density: 'detail',
          action: {
            type: 'link',
            href: buildDocItemHref(item),
            label: 'Permalink',
            surface: 'cta',
          },
        })),
        emptyState: {
          title: 'No section content yet',
          description:
            'This category is ready for future section modules, but no detail blocks are configured right now.',
          action: {
            type: 'link',
            href: buildDocsHubHref(),
            label: 'Explore another category',
            surface: 'cta',
          },
        },
      },
    ],
  }
}
