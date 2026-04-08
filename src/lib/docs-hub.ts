export type DocCategorySlug =
  | 'general'
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
