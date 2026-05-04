import { ReactNode } from 'react'
import Header from './Header'

interface DocsShellProps {
  children: ReactNode
}

export default function DocsShell({ children }: DocsShellProps) {
  return (
    <div className="docs-shell">
      <a
        href="#docs-main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-lg focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        Skip to main content
      </a>
      <Header />
      <main id="docs-main-content" tabIndex={-1} className="docs-shell-main">
        <div className="docs-shell-content">{children}</div>
      </main>
    </div>
  )
}
