import type { ReactNode } from 'react'
import Link from 'next/link'

interface SidebarCategoryProps {
  slug: string
  title: string
  icon?: ReactNode
  active?: boolean
  onItemSelect: () => void
}

export default function SidebarCategory({
  slug,
  title,
  icon,
  active,
  onItemSelect,
}: SidebarCategoryProps) {
  return (
    <Link
      href={`/${slug}`}
      onClick={onItemSelect}
      className={`flex items-center gap-2 rounded-2xl border px-3 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
        active
          ? 'border-[rgba(66,133,244,0.16)] bg-[linear-gradient(90deg,rgba(66,133,244,0.12),rgba(255,255,255,0.96))] text-primary-700 shadow-[0_10px_20px_rgba(60,64,67,0.06)]'
          : 'border-transparent bg-white/70 text-gray-500 hover:border-[rgba(66,133,244,0.1)] hover:bg-[rgba(66,133,244,0.05)] hover:text-gray-700'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      {icon && (
        <span className="h-4 w-4" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="text-[0.625rem]">{title}</span>
    </Link>
  )
}
