import { useEffect, useState, type RefObject } from 'react'
import { useRouter } from 'next/router'
import { BookOpen, ChevronDown } from 'lucide-react'
import SidebarCategory from './SidebarCategory'
import SidebarItem from './SidebarItem'
import { getDocsCategories } from '@/lib/docs-data'
import { getDocIcon } from '@/lib/docs-icons'
import type { DocCategorySlug } from '@/lib/docs-data'

interface SidebarProps {
  isDesktopViewport: boolean
  isOpen: boolean
  initialFocusRef: RefObject<HTMLButtonElement>
  onClose: () => void
}

const hiddenSidebarCategorySlugs: DocCategorySlug[] = [
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

export default function Sidebar({
  isDesktopViewport,
  isOpen,
  initialFocusRef,
  onClose,
}: SidebarProps) {
  const router = useRouter()
  const activeSlug = router.asPath.split('/').filter(Boolean)[0] ?? ''
  const isWikiActive = wikiCategorySlugs.includes(activeSlug as DocCategorySlug)
  const [isWikiOpen, setIsWikiOpen] = useState(isWikiActive)
  const docsCategories = getDocsCategories().filter(
    (category) => !hiddenSidebarCategorySlugs.includes(category.slug)
  )
  const isSidebarVisible = isDesktopViewport || isOpen

  useEffect(() => {
    if (isWikiActive) {
      setIsWikiOpen(true)
    }
  }, [isWikiActive])

  return (
    <>
      {!isDesktopViewport && isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-label="Navigasyonu kapat"
        />
      )}
      <aside
        id="docs-sidebar"
        className={`fixed left-0 top-[var(--docs-header-height)] z-40 h-[calc(100vh-var(--docs-header-height))] border-r border-white/70 bg-white/82 shadow-[18px_0_40px_rgba(60,64,67,0.08)] backdrop-blur-xl transition-all duration-300 ease-in-out lg:transition-transform ${
          isSidebarVisible
            ? 'w-[min(calc(100vw-2.5rem),var(--docs-sidebar-width))] visible translate-x-0'
            : 'w-0 invisible -translate-x-full lg:w-[var(--docs-sidebar-width)] lg:translate-x-0 lg:invisible'
        }`}
      >
        <nav
          aria-label="Dokümantasyon navigasyonu"
          className="h-full overflow-y-auto px-3 py-4 [overscroll-behavior:contain]"
        >
          <div className="space-y-1 px-3 pt-1">
            {docsCategories.map((category) => {
              const Icon = getDocIcon(category.iconKey)

              return (
                <SidebarCategory
                  key={category.slug}
                  slug={category.slug}
                  title={category.label}
                  icon={<Icon size={16} />}
                  active={category.slug === activeSlug}
                  onItemSelect={onClose}
                />
              )
            })}
            <div className="pt-1">
              <button
                ref={initialFocusRef}
                type="button"
                onClick={() => setIsWikiOpen((previousState) => !previousState)}
                className={`flex w-full items-center gap-2 rounded-2xl border px-3 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  isWikiActive || isWikiOpen
                    ? 'border-[rgba(66,133,244,0.16)] bg-[linear-gradient(90deg,rgba(66,133,244,0.12),rgba(255,255,255,0.96))] text-primary-700 shadow-[0_10px_20px_rgba(60,64,67,0.06)]'
                    : 'border-transparent bg-white/70 text-gray-500 hover:border-[rgba(66,133,244,0.1)] hover:bg-[rgba(66,133,244,0.05)] hover:text-gray-700'
                }`}
                aria-expanded={isWikiOpen}
                aria-controls="wiki-links"
              >
                <span className="h-4 w-4" aria-hidden="true">
                  <BookOpen size={16} />
                </span>
                <span className="text-[0.625rem]">WIKI</span>
                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform ${isWikiOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {isWikiOpen && (
                <div id="wiki-links" className="mt-2 space-y-1 pl-3">
                  {wikiLinks.map((item) => (
                    <SidebarItem
                      key={item.label}
                      href={item.href}
                      label={item.label}
                      active={router.asPath === item.href}
                      onClick={onClose}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </aside>
    </>
  )
}
