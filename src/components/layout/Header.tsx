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
      <div className="mx-auto flex max-w-[96rem] items-center gap-3 px-3 py-2 sm:px-4 lg:px-5">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 rounded-xl px-1 py-1 text-gray-900 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <span
            className="grid h-9 w-9 shrink-0 grid-cols-2 gap-1 rounded-xl bg-white p-2 shadow-[0_12px_24px_rgba(60,64,67,0.12)] ring-1 ring-black/5"
            aria-hidden="true"
          >
            <span className="rounded-full bg-[#4285F4]" />
            <span className="rounded-full bg-[#EA4335]" />
            <span className="rounded-full bg-[#FBBC05]" />
            <span className="rounded-full bg-[#34A853]" />
          </span>
          <span className="hidden whitespace-nowrap text-[0.95rem] font-semibold tracking-tight text-gray-900 xl:inline">
            Dokümantasyon Merkezi
          </span>
        </Link>

        <nav
          aria-label="Ana navigasyon"
          className="flex min-w-0 flex-1 items-center gap-1 overflow-visible whitespace-nowrap lg:overflow-visible"
        >
          {docsCategories.map((category, index) => {
            const Icon = getDocIcon(category.iconKey)
            const isActive = category.slug === activeSlug

            return (
              <div key={category.slug} className="flex shrink-0 items-center">
                {index > 0 && <HeaderSeparator />}
                <Link
                  href={buildDocCategoryHref(category.slug)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-[rgba(66,133,244,0.12)] text-primary-700 shadow-[0_8px_20px_rgba(60,64,67,0.06)]'
                      : 'text-gray-500 hover:bg-[rgba(66,133,244,0.06)] hover:text-gray-700'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{category.label}</span>
                </Link>
              </div>
            )
          })}

          <div
            className="relative flex shrink-0 items-center"
            onMouseEnter={() => setIsWikiOpen(true)}
            onMouseLeave={() => setIsWikiOpen(false)}
            onFocus={() => setIsWikiOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsWikiOpen(false)
              }
            }}
          >
            <HeaderSeparator />
            <button
              type="button"
              onClick={() => setIsWikiOpen((previousState) => !previousState)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                isWikiActive || isWikiOpen
                  ? 'bg-[rgba(66,133,244,0.12)] text-primary-700 shadow-[0_8px_20px_rgba(60,64,67,0.06)]'
                  : 'text-gray-500 hover:bg-[rgba(66,133,244,0.06)] hover:text-gray-700'
              }`}
              aria-expanded={isWikiOpen}
              aria-controls="header-wiki-links"
            >
              <BookOpen size={14} aria-hidden="true" />
              <span>WIKI</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${isWikiOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            {isWikiOpen && (
              <div
                id="header-wiki-links"
                className="absolute left-0 top-[calc(100%+0.4rem)] z-50 min-w-[20rem] rounded-2xl border border-[rgba(66,133,244,0.12)] bg-white/95 p-2 shadow-[0_18px_48px_rgba(60,64,67,0.14)] backdrop-blur-xl"
              >
                <div className="flex max-h-[60vh] flex-col gap-1 overflow-y-auto">
                  {wikiLinks.map((item) => {
                    const isActive = router.asPath === item.href

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all ${
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

          <div className="flex shrink-0 items-center">
            <HeaderSeparator />
            <a
              href={adminHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-[rgba(66,133,244,0.12)] px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-700 transition-all hover:bg-[rgba(66,133,244,0.18)] hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Admin Paneline Git
            </a>
          </div>

          <div className="flex shrink-0 items-center">
            <HeaderSeparator />
            <Link
              href={searchHref}
              className={`rounded-lg px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all ${
                isSearchActive
                  ? 'bg-[rgba(66,133,244,0.12)] text-primary-700'
                  : 'text-gray-500 hover:bg-[rgba(66,133,244,0.06)] hover:text-gray-700'
              }`}
              aria-current={isSearchActive ? 'page' : undefined}
            >
              Ara
            </Link>
          </div>

          {sidebarUpdates.length > 0 && (
            <div className="flex shrink-0 items-center">
              <HeaderSeparator />
              <Link
                href={updatesHref}
                className={`rounded-lg px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all ${
                  isUpdatesActive
                    ? 'bg-[rgba(66,133,244,0.12)] text-primary-700'
                    : 'text-gray-500 hover:bg-[rgba(66,133,244,0.06)] hover:text-gray-700'
                }`}
                aria-current={isUpdatesActive ? 'page' : undefined}
              >
                Guncellemeler
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

function HeaderSeparator() {
  return <span className="mx-1 h-5 w-px shrink-0 bg-[rgba(148,163,184,0.35)]" aria-hidden="true" />
}
