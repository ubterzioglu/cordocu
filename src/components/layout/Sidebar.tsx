import type { RefObject } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Info } from 'lucide-react'
import SidebarCategory from './SidebarCategory'
import { getDocsCategories } from '@/lib/docs-data'
import { getDocIcon } from '@/lib/docs-icons'
import { buildDocsHubHref } from '@/lib/docs-navigation'
import { sidebarUpdates } from '@/lib/docs-content'
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
]

export default function Sidebar({
  isDesktopViewport,
  isOpen,
  initialFocusRef,
  onClose,
}: SidebarProps) {
  const router = useRouter()
  const activeSlug = router.asPath.split('/').filter(Boolean)[0] ?? ''
  const docsCategories = getDocsCategories().filter(
    (category) => !hiddenSidebarCategorySlugs.includes(category.slug)
  )
  const isSidebarVisible = isDesktopViewport || isOpen

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
          <div className="mb-4 px-3 pt-1">
            <Link
              href={buildDocsHubHref()}
              onClick={onClose}
              className={`sidebar-item group mb-3 w-full text-left ${
                router.asPath === '/' ? 'active' : ''
              }`}
              aria-current={router.asPath === '/' ? 'page' : undefined}
            >
              <span className="h-5 w-5" aria-hidden="true">
                <Info size={16} />
              </span>
              <span>ARA</span>
            </Link>
            {sidebarUpdates.length > 0 && (
              <div className="mt-2 rounded-xl border border-gray-200 bg-white/70 p-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Güncellemeler
                </p>
                {sidebarUpdates.map((group) => (
                  <div key={group.date} className="mb-2 last:mb-0">
                    <p className="mb-1 text-xs font-semibold text-gray-700">
                      {group.date}
                    </p>
                    <ul className="space-y-1">
                      {group.items.map((item, i) => (
                        <li
                          key={i}
                          className="text-[11px] leading-snug text-gray-500 before:mr-1.5 before:text-gray-400 before:content-['•']"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-1">
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
          </div>
        </nav>
      </aside>
    </>
  )
}
