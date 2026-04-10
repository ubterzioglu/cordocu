import type { RefObject, ReactNode } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import SidebarItem from './SidebarItem'
import type { DocCategorySlug, DocNavItem } from '@/lib/docs-data'

interface SidebarCategoryProps {
  slug: DocCategorySlug
  title: string
  icon?: ReactNode
  items: DocNavItem[]
  active?: boolean
  activeItemId?: string
  isExpanded: boolean
  buttonRef?: RefObject<HTMLButtonElement>
  onToggle: () => void
  onItemSelect: () => void
}

export default function SidebarCategory({
  slug,
  title,
  icon,
  items,
  active,
  activeItemId,
  isExpanded,
  buttonRef,
  onToggle,
  onItemSelect,
}: SidebarCategoryProps) {
  const buttonId = `sidebar-category-button-${slug}`
  const panelId = `sidebar-category-panel-${slug}`

  return (
    <div className="py-2">
      <button
        id={buttonId}
        ref={buttonRef}
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className={`flex w-full items-center gap-2 rounded-2xl border px-3 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
          active
            ? 'border-[rgba(66,133,244,0.16)] bg-[linear-gradient(90deg,rgba(66,133,244,0.12),rgba(255,255,255,0.96))] text-primary-700 shadow-[0_10px_20px_rgba(60,64,67,0.06)]'
            : 'border-transparent bg-white/70 text-gray-500 hover:border-[rgba(66,133,244,0.1)] hover:bg-[rgba(66,133,244,0.05)] hover:text-gray-700'
        }`}
      >
        {icon && (
          <span className="h-4 w-4" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{title}</span>
        {isExpanded ? (
          <ChevronDown size={14} className="ml-auto" aria-hidden="true" />
        ) : (
          <ChevronRight size={14} className="ml-auto" aria-hidden="true" />
        )}
      </button>
      {isExpanded && (
        <div
          id={panelId}
          role="group"
          aria-labelledby={buttonId}
          className="mt-1 space-y-1 pl-2"
        >
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              href={item}
              label={item.label}
              description={item.description}
              active={item.id === activeItemId}
              onClick={onItemSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}
