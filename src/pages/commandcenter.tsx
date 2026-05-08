import DocsShell from '@/components/layout/DocsShell'
import CommandCenterManager from '@/components/commandcenter/CommandCenterManager'

export default function CommandCenterPage() {
  return (
    <DocsShell>
      <div className="docs-main-column docs-main-column-wide">
        <article className="space-y-8 sm:space-y-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="docs-surface p-5 sm:p-6 md:p-8">
              <div
                className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(66,133,244,0.22)_0%,_rgba(66,133,244,0)_72%)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-32 w-40 bg-[radial-gradient(circle,_rgba(139,92,246,0.14)_0%,_rgba(139,92,246,0)_74%)]"
                aria-hidden="true"
              />
              <h1 className="mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                Birleşik Görev Merkezi Todo ve toplantı maddelerini tek tabloda filtreleyin, güncelleyin ve yönetin.
              </h1>
            </div>
          </div>

          <CommandCenterManager
            title=""
            description=""
          />
        </article>
      </div>
    </DocsShell>
  )
}
