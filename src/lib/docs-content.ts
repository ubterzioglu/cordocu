import {
  docsOverviewCards,
  docsQuickLinks,
  getDocCategory,
  getDocItemById,
  type DocCategorySlug,
  type DocIconKey,
} from './docs-hub'
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
