import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BookOpen, ChevronDown } from 'lucide-react'
import { buildDocCategoryHref, buildDocItemHref, buildDocsHubHref } from '@/lib/docs-navigation'
import { sidebarUpdates } from '@/lib/docs-content'
import { getDocsCategories, type DocCategorySlug } from '@/lib/docs-data'
import { getDocIcon } from '@/lib/docs-icons'

const hiddenHeaderCategorySlugs: DocCategorySlug[] = [
  'general',
  'testfall',
  'planung',
  'architecture',
  'tests',
  'mvpitems',
  'ambassador',
  'ekip',
  'dijitalpazarlama',
  'whatsappbot',
  'roadmap',
  'projetakibi',
  'kortexdocs',
  'captable',
]

const wikiCategorySlugs: DocCategorySlug[] = [
  'mvpitems',
  'ambassador',
  'ekip',
  'dijitalpazarlama',
  'whatsappbot',
  'roadmap',
  'projetakibi',
  'kortexdocs',
  'captable',
]

const wikiLinks = [
  { label: 'MVP LISTESI', href: '/mvpitems' },
  { label: 'AMBASSADOR', href: '/ambassador' },
  { label: 'EKIP & UCRET', href: '/ekip' },
  { label: 'DIJITAL PAZARLAMA', href: '/dijitalpazarlama' },
  { label: 'WHATSAPP BOT', href: '/whatsappbot' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Proje Takibi Sablonu', href: '/projetakibi' },
  { label: 'Kortex — CTO, Pitch & PRD Dokumanlari', href: '/kortexdocs' },
  { label: 'Cap Table v2 — Hisse Yapisi', href: '/captable' },
  { label: 'Cap Table v2', href: '/captable#ct-sirket-hisse' },
] as const

export default function Header() {
  const adminHref = 'https://corteqs.net/admin/'
  const router = useRouter()
  const searchHref = buildDocsHubHref()
  const updatesHref = buildDocItemHref({
    categorySlug: 'general',
    id: 'general-updates',
  })
  const activeSlug = router.asPath.split('/').filter(Boolean)[0] ?? ''
  const [isWikiOpen, setIsWikiOpen] = useState(false)
  const docsCategories = useMemo(
    () =>
      getDocsCategories().filter(
        (category) => !hiddenHeaderCategorySlugs.includes(category.slug)
      ),
    []
  )
  const isWikiActive = wikiCategorySlugs.includes(activeSlug as DocCategorySlug)
  const isSearchActive = router.asPath === searchHref
  const isUpdatesActive =
    router.asPath === buildDocCategoryHref('general') ||
    router.asPath.startsWith(`${buildDocCategoryHref('general')}#`)

  useEffect(() => {
    if (isWikiActive) {
      setIsWikiOpen(true)
      return
    }

    setIsWikiOpen(false)
  }, [isWikiActive, router.asPath])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/85 shadow-[0_8px_32px_rgba(60,64,67,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[96rem] flex-col gap-3 px-3 py-3 sm:px-4 lg:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <span className="docs-chip hidden sm:inline-flex">v1.0.0</span>
            <Link
              href="/"
              className="group flex min-w-0 items-center gap-2 rounded-xl px-1 py-1 text-gray-900 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:gap-3"
            >
              <span
                className="grid h-9 w-9 shrink-0 grid-cols-2 gap-1 rounded-xl bg-white p-2 shadow-[0_12px_24px_rgba(60,64,67,0.12)] ring-1 ring-black/5 sm:h-10 sm:w-10 sm:rounded-2xl"
                aria-hidden="true"
              >
                <span className="rounded-full bg-[#4285F4]" />
                <span className="rounded-full bg-[#EA4335]" />
                <span className="rounded-full bg-[#FBBC05]" />
                <span className="rounded-full bg-[#34A853]" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="hidden text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gray-400 transition-colors group-hover:text-primary-500 sm:block">
                  CorteQS Dashboard
                </span>
                <span className="truncate text-sm font-semibold tracking-tight text-gray-900 sm:text-lg">
                  Dokümantasyon Merkezi
                </span>
              </span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={adminHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[rgba(66,133,244,0.12)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 transition-all hover:bg-[rgba(66,133,244,0.18)] hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Admin Paneline Git
            </a>
            <Link
              href={searchHref}
              className={`rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all ${
                isSearchActive
                  ? 'bg-[rgba(66,133,244,0.12)] text-primary-700'
                  : 'text-gray-500 hover:bg-[rgba(66,133,244,0.06)] hover:text-gray-700'
              }`}
              aria-current={isSearchActive ? 'page' : undefined}
            >
              Ara
            </Link>
            {sidebarUpdates.length > 0 && (
              <Link
                href={updatesHref}
                className={`rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all ${
                  isUpdatesActive
                    ? 'bg-[rgba(66,133,244,0.12)] text-primary-700'
                    : 'text-gray-500 hover:bg-[rgba(66,133,244,0.06)] hover:text-gray-700'
                }`}
                aria-current={isUpdatesActive ? 'page' : undefined}
              >
                Guncellemeler
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {docsCategories.map((category) => {
            const Icon = getDocIcon(category.iconKey)
            const isActive = category.slug === activeSlug

            return (
              <Link
                key={category.slug}
                href={buildDocCategoryHref(category.slug)}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-[rgba(66,133,244,0.12)] text-primary-700 shadow-[0_8px_20px_rgba(60,64,67,0.06)]'
                    : 'text-gray-500 hover:bg-[rgba(66,133,244,0.06)] hover:text-gray-700'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{category.label}</span>
              </Link>
            )
          })}

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsWikiOpen((previousState) => !previousState)}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                isWikiActive || isWikiOpen
                  ? 'bg-[rgba(66,133,244,0.12)] text-primary-700 shadow-[0_8px_20px_rgba(60,64,67,0.06)]'
                  : 'text-gray-500 hover:bg-[rgba(66,133,244,0.06)] hover:text-gray-700'
              }`}
              aria-expanded={isWikiOpen}
              aria-controls="header-wiki-links"
            >
              <BookOpen size={16} aria-hidden="true" />
              <span>WIKI</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${isWikiOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            {isWikiOpen && (
              <div
                id="header-wiki-links"
                className="absolute left-0 top-[calc(100%+0.5rem)] z-50 min-w-[20rem] rounded-2xl border border-[rgba(66,133,244,0.12)] bg-white/95 p-2 shadow-[0_18px_48px_rgba(60,64,67,0.14)] backdrop-blur-xl"
              >
                <div className="flex max-h-[60vh] flex-col gap-1 overflow-y-auto">
                  {wikiLinks.map((item) => {
                    const isActive = router.asPath === item.href

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
                          isActive
                            ? 'bg-[rgba(66,133,244,0.12)] text-primary-700'
                            : 'text-gray-500 hover:bg-[rgba(66,133,244,0.06)] hover:text-gray-700'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
