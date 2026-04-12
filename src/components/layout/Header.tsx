import type { RefObject } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  onMenuToggle: () => void
  isSidebarOpen: boolean
  menuButtonRef: RefObject<HTMLButtonElement>
}

export default function Header({
  onMenuToggle,
  isSidebarOpen,
  menuButtonRef,
}: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--docs-header-height)] border-b border-white/70 bg-white/85 shadow-[0_8px_32px_rgba(60,64,67,0.08)] backdrop-blur-xl">
      <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={onMenuToggle}
            className="shrink-0 rounded-xl border border-transparent bg-white/80 p-2 text-gray-700 transition-all hover:border-[rgba(66,133,244,0.14)] hover:bg-[rgba(66,133,244,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label={
              isSidebarOpen
                ? 'Navigasyonu kapat'
                : 'Navigasyonu aç'
            }
            aria-expanded={isSidebarOpen}
            aria-controls="docs-sidebar"
          >
            {isSidebarOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
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
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <span className="docs-chip hidden sm:inline-flex">
            v1.0.0
          </span>
        </div>
      </div>
    </header>
  )
}
