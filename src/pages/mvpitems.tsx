import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import DocsShell from '@/components/layout/DocsShell'
import MvpManager from '@/components/mvp/MvpManager'
import GeneralSummaryCard from '@/components/mvp/GeneralSummaryCard'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function MvpItemsPage() {
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
              <div
                className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(66,133,244,0.22)_0%,_rgba(66,133,244,0)_72%)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-32 w-40 bg-[radial-gradient(circle,_rgba(52,168,83,0.14)_0%,_rgba(52,168,83,0)_74%)]"
                aria-hidden="true"
              />
              <p className="docs-kicker">MVP LİSTESİ</p>
              <h1 className="mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                MVP Yaklaşımı — Yapısal Liste
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
                Tüm MVP maddeleri Supabase destekli merkezi listede. MVP seviyesi ve sorumlu atayın.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">mvp_items tablosu</span>
                <span className="docs-chip">MVP1 / MVP2 / MVP3</span>
              </div>
            </div>
          </div>

          <GeneralSummaryCard
  content={`
<h3>MVP Hedefleri ve Stratejik Özet</h3>
<p>
Cortex projesi, diaspora topluluğuna yönelik merkezi bir platform hedeflemektedir. 
Platform, doğrulanmış uzmanlar, kuruluşlar ve işletmeler için bir pazaryeri oluşturmayı amaçlamaktadır.
</p>
<ul>
  <li><strong>Rezervasyon Sistemi:</strong> Etkinlik yönetimi ve biletleme</li>
  <li><strong>Kullanıcı Kısıtlamaları:</strong> Güvenilirlik ve doğrulama mekanizmaları</li>
  <li><strong>Audit Kayıtları:</strong> Finansal ve gelir modeli</li>
  <li><strong>Veritabanı Tasarımı:</strong> Teknik altyapı ve veri yapısı</li>
  <li><strong>MVP Hedefleri:</strong> 6-8 aylık geliştirme çizelgesi</li>
  <li><strong>Reklam Modeli:</strong> Diaspora grupları ve influencer ortaklıkları</li>
</ul>
<p>
Platform, AI destekli danışmanlık hizmetleri, premium abonelikler ve reklam gelirleri ile 
sürdürülebilir bir iş modeli hedeflemektedir. 
</p>
<p>
MVP hedefleri arasında AI Twins (yapay zeka destekli danışmanlık), 
merkezi etkinlik yönetimi ve diaspora ağının entegrasyonu bulunmaktadır.
</p>
`}/>

<div className="mt-8 space-y-6">
  <SectionHeading
    title="MVP LİSTESİ"
    subtitle="Yapısal MVP Maddeleri"
    accentColor="#A142F4"
  />
  <MvpManager />
</div>
        </article>
      </div>
    </DocsShell>
  )
}
