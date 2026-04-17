import DocsShell from '@/components/layout/DocsShell'
import CvManager from '@/components/hr/CvManager'

export default function InsanKaynaklariPage() {
  return (
    <DocsShell>
      <div className="docs-main-column">
        <article className="space-y-8 sm:space-y-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="docs-surface p-5 sm:p-6 md:p-8">
              <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(66,133,244,0.22)_0%,_rgba(66,133,244,0)_72%)]" aria-hidden="true" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-40 bg-[radial-gradient(circle,_rgba(52,168,83,0.14)_0%,_rgba(52,168,83,0)_74%)]" aria-hidden="true" />
              <p className="docs-kicker">İNSAN KAYNAKLARI</p>
              <h1 className="mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">CV Yönetimi</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">CV yükleyin, görüntüleyin ve yönetin. Supabase Storage + signed URL mimarisi.</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">user_cvs tablosu</span>
                <span className="docs-chip">cv-files bucket</span>
              </div>
            </div>
          </div>
          <CvManager />
        </article>
      </div>
    </DocsShell>
  )
}
