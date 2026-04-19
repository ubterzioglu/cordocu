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
              <h1 className="mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                İnsan Kaynakları
              </h1>
            </div>
          </div>
          <section className="docs-surface p-5 sm:p-6 md:p-7" aria-labelledby="hiring-methodology-heading">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
                  İşe Alım Metodolojisi
                </p>
                <h2
                  id="hiring-methodology-heading"
                  className="text-lg font-semibold text-gray-900 sm:text-xl"
                >
                  Hiring süreci iki adımda netleştirildi
                </h2>
              </div>
              <ul className="space-y-3 pl-5 text-sm leading-6 text-gray-700 marker:text-primary-500 sm:text-[15px]">
                <li>Her kurucu, adayla ayrı ayrı 30 dakikalık bir görüşme yapacak.</li>
                <li>Görüşmeler bağımsız ilerleyecek; her kurucu kendi değerlendirmesini ayrı oluşturacak.</li>
                <li>Görüşmeler tamamlandıktan sonra kurucular kendi aralarında sync olup ortak karar verecek.</li>
              </ul>
            </div>
          </section>
          <CvManager />
        </article>
      </div>
    </DocsShell>
  )
}
