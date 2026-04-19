'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import ContentCard from '../ui/ContentCard'
import SectionHeading from '../ui/SectionHeading'
import {
  getDocsCategoryContentView,
  getDocsHubContentView,
  getDocsCategories,
  sidebarUpdates,
  type ContentViewSection,
  type DocCategorySlug,
} from '@/lib/docs-data'
import { getDocIcon } from '@/lib/docs-icons'

interface MainContentProps {
  categorySlug?: DocCategorySlug
}

export default function MainContent({ categorySlug }: MainContentProps) {
  const isHub = !categorySlug

  if (isHub) {
    return <HubContent />
  }

  return <CategoryContent categorySlug={categorySlug} />
}

function CategoryContent({ categorySlug }: { categorySlug: DocCategorySlug }) {
  if (categorySlug === 'general') {
    return <GeneralUpdatesContent />
  }

  const contentView = getDocsCategoryContentView(categorySlug)

  return (
    <article className="space-y-8 sm:space-y-10">
      <div className="space-y-3 sm:space-y-4">
        {contentView.backLink && (
          <Link
            href={contentView.backLink.href}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(66,133,244,0.12)] bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 shadow-[0_10px_20px_rgba(60,64,67,0.06)] transition-all hover:border-[rgba(66,133,244,0.2)] hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {contentView.backLink.label}
          </Link>
        )}

        <div className="docs-surface p-5 sm:p-6 md:p-8">
          <div
            className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(66,133,244,0.22)_0%,_rgba(66,133,244,0)_72%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-32 w-40 bg-[radial-gradient(circle,_rgba(52,168,83,0.14)_0%,_rgba(52,168,83,0)_74%)]"
            aria-hidden="true"
          />
          {contentView.eyebrow && (
            <p className="docs-kicker">
              {contentView.eyebrow}
            </p>
          )}
          <h1 className="mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {contentView.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
            {contentView.description}
          </p>
          {contentView.supportingText && (
            <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">
              {contentView.supportingText}
            </p>
          )}
          {contentView.metaBadges && contentView.metaBadges.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
              {contentView.metaBadges.map((metaBadge) => (
                <span key={metaBadge} className="docs-chip">
                  {metaBadge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {contentView.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </article>
  )
}

function GeneralUpdatesContent() {
  const updateLines = sidebarUpdates.flatMap((group) =>
    group.items.map((item) => `${group.date.slice(0, 5)} - ${item}`)
  )

  return (
    <article>
      <div className="docs-surface p-5 sm:p-6 md:p-8">
        <h1 className="max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          Güncellemeler
        </h1>
        <div className="mt-6 space-y-3 text-sm leading-7 text-gray-600 sm:text-base">
          {updateLines.map((line, index) => (
            <div
              key={`${line}-${index}`}
              className="pl-5 relative before:absolute before:left-0 before:text-gray-400 before:content-['•']"
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

function HubContent() {
  const contentView = getDocsHubContentView()
  const [searchQuery, setSearchQuery] = useState('')
  const categories = getDocsCategories()

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    const results: { id: string; title: string; description: string; categoryLabel: string; href: string }[] = []
    for (const cat of categories) {
      for (const item of cat.items) {
        if (
          item.label.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        ) {
          results.push({
            id: item.id,
            title: item.label,
            description: item.description,
            categoryLabel: cat.label,
            href: item.href,
          })
        }
      }
      if (
        cat.label.toLowerCase().includes(q) ||
        cat.shortDescription.toLowerCase().includes(q) ||
        cat.overview.title.toLowerCase().includes(q) ||
        cat.overview.description.toLowerCase().includes(q)
      ) {
        const alreadyAdded = results.some((r) => r.id === `${cat.slug}-category`)
        if (!alreadyAdded) {
          results.push({
            id: `${cat.slug}-category`,
            title: cat.overview.title,
            description: cat.overview.description,
            categoryLabel: cat.label,
            href: `/${cat.slug}`,
          })
        }
      }
    }
    return results
  }, [searchQuery, categories])

  const hasSearch = searchQuery.trim().length > 0

  return (
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
          <h1 className="max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {contentView.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
            {contentView.description}
          </p>

          {contentView.search && (
            <div className="mt-8 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] sm:p-5">
              <div className="mb-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <label
                  htmlFor="hub-search-active"
                  className="text-sm font-medium text-gray-700"
                >
                  {contentView.search.label}
                </label>
              </div>
              <div className="relative">
                <input
                  id="hub-search-active"
                  type="text"
                  placeholder={contentView.search.placeholder}
                  name="docs-search"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-describedby="hub-search-active-helper"
                  className="w-full rounded-2xl border border-[rgba(66,133,244,0.12)] bg-white py-3.5 pl-11 pr-4 text-sm text-gray-800 shadow-[0_10px_20px_rgba(60,64,67,0.04)] focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500"
                  size={18}
                  aria-hidden="true"
                />
              </div>
              <p id="hub-search-active-helper" className="mt-3 text-sm text-gray-500">
                Tüm dokümanlar ve kategorilerde aramak için yazın.
              </p>
            </div>
          )}
        </div>
      </div>

      {hasSearch ? (
        <section className="space-y-5" aria-labelledby="search-results-heading">
          <SectionHeading
            id="search-results-heading"
            title={`Arama Sonuçları (${searchResults.length})`}
            description={`"${searchQuery}" için eşleşen sonuçlar.`}
          />
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {searchResults.map((result) => (
                <ContentCard
                  key={result.id}
                  title={result.title}
                  description={result.description}
                  badge={result.categoryLabel}
                  density="compact"
                  action={{
                    type: 'link',
                    href: result.href,
                    label: 'Bölümü Aç',
                    surface: 'card',
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
              <h3 className="text-base font-semibold text-gray-900">Sonuç bulunamadı</h3>
              <p className="mt-2 max-w-2xl">Farklı anahtar kelimelerle tekrar arayın.</p>
            </div>
          )}
        </section>
      ) : (
        contentView.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))
      )}
    </article>
  )
}

function SectionRenderer({ section }: { section: ContentViewSection }) {
  return (
    <section
      aria-labelledby={`section-heading-${section.id}`}
      className="space-y-5"
    >
      <SectionHeading
        id={`section-heading-${section.id}`}
        title={section.title}
        description={section.description}
      />

      {section.cards.length > 0 ? (
        <div className={getGridClasses(section)}>
          {section.cards.map((card) => {
            const Icon = card.iconKey ? getDocIcon(card.iconKey) : null

            return (
              <ContentCard
                key={card.id}
                title={card.title}
                description={card.description}
                detail={card.detail}
                badge={card.badge}
                eyebrow={card.eyebrow}
                density={card.density}
                anchorId={card.anchorId}
                icon={Icon ? <Icon size={20} /> : undefined}
                action={
                  card.action?.type === 'link'
                    ? {
                        type: 'link',
                        href: card.action.href,
                        label: card.action.label,
                        surface: card.action.surface,
                      }
                    : undefined
                }
              />
            )
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
          <h3 className="text-base font-semibold text-gray-900">
            {section.emptyState?.title ?? 'No content available'}
          </h3>
          <p className="mt-2 max-w-2xl">
            {section.emptyState?.description ??
              'This section is intentionally empty for now.'}
          </p>
          {section.emptyState?.action?.type === 'link' && (
            <Link
              href={section.emptyState.action.href}
              className="mt-4 inline-flex items-center gap-2 rounded-md text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              {section.emptyState.action.label}
            </Link>
          )}
        </div>
      )}
    </section>
  )
}

function getGridClasses(section: ContentViewSection): string {
  switch (section.columns) {
    case 1:
      return 'grid grid-cols-1 gap-4'
    case 5:
      return 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
    case 3:
      return 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'
    case 2:
    default:
      return 'grid grid-cols-1 gap-4 md:grid-cols-2'
  }
}
