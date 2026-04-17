import DocsShell from '@/components/layout/DocsShell'
import SocialMediaManager from '@/components/socialmedia/SocialMediaManager'

export default function SosyalMedyaPage() {
  return (
    <DocsShell>
      <div className="docs-main-column">
        <article className="space-y-8 sm:space-y-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="docs-surface p-5 sm:p-6 md:p-8">
              <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(66,133,244,0.22)_0%,_rgba(66,133,244,0)_72%)]" aria-hidden="true" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-40 bg-[radial-gradient(circle,_rgba(52,168,83,0.14)_0%,_rgba(52,168,83,0)_74%)]" aria-hidden="true" />
              <p className="docs-kicker">SOSYAL MEDYA</p>
            </div>
          </div>
          <SocialMediaManager />
        </article>
      </div>
    </DocsShell>
  )
}
