import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import DocsShell from '@/components/layout/DocsShell'
import ArgeManager from '@/components/arge/ArgeManager'

export default function ArgePage() {
  return (
    <DocsShell>
      <div className="docs-main-column">
        <article className="space-y-8 sm:space-y-10">
          <div className="space-y-3 sm:space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(66,133,244,0.12)] bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 shadow-[0_10px_20px_rgba(60,64,67,0.06)] transition-all hover:border-[rgba(66,133,244,0.2)] hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to documentation hub
            </Link>
            <div className="docs-surface p-5 sm:p-6 md:p-8">
              <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(66,133,244,0.22)_0%,_rgba(66,133,244,0)_72%)]" aria-hidden="true" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-40 bg-[radial-gradient(circle,_rgba(52,168,83,0.14)_0%,_rgba(52,168,83,0)_74%)]" aria-hidden="true" />
              <p className="docs-kicker">ARGE</p>
              <h1 className="mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">ARGE Modülü</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">Araştırma, doküman ve fikir içeriklerinin yönetildiği ARGE sayfası. Linkler, kartlar ve dosya upload.</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">arge_links + arge_cards + arge_files</span>
                <span className="docs-chip">arge-files bucket</span>
              </div>
            </div>
          </div>
          <ArgeManager />
        </article>
      </div>
    </DocsShell>
  )
}
