import type { RefObject } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Info } from 'lucide-react'
import SidebarCategory from './SidebarCategory'
import { getDocsCategories } from '@/lib/docs-data'
import { getDocIcon } from '@/lib/docs-icons'
import { buildDocsHubHref } from '@/lib/docs-navigation'
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
          aria-label="Close documentation navigation"
        />
      )}
      <aside
        id="docs-sidebar"
        className={`fixed left-0 top-[var(--docs-header-height)] z-40 h-[calc(100vh-var(--docs-header-height))] w-[min(calc(100vw-2.5rem),var(--docs-sidebar-width))] border-r border-white/70 bg-white/82 shadow-[18px_0_40px_rgba(60,64,67,0.08)] backdrop-blur-xl transition-transform duration-300 ease-in-out lg:w-[var(--docs-sidebar-width)] lg:translate-x-0 ${
          isSidebarVisible
            ? 'visible translate-x-0'
            : 'invisible -translate-x-full lg:visible lg:translate-x-0'
        }`}
      >
        <nav
          aria-label="Documentation navigation"
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
              <span>Bu sayfa neden var ?</span>
            </Link>
            <p className="docs-kicker">
              Navigation
            </p>
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
