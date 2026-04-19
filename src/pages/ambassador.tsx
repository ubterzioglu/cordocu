import DocsShell from '@/components/layout/DocsShell'
import AccordionCard from '@/components/ui/AccordionCard'

const accordionItems = [
  {
    id: 'amb-1',
    title: '1) Ambassador yapısının genel amacı nedir?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ambassador yapısı, CorteQS platformunda şehir bazlı büyüme engine&apos;i olarak tasarlanmıştır.</li>
        <li>- Amaç, yerel toplulukları yönetmek ve kullanıcı kazanımını artırmaktır.</li>
        <li>- Platform kullanımını artırarak ağ etkisini güçlendirmek hedeflenir.</li>
        <li>- Kullanıcıların şehir bazlı ağlara entegre edilmesi sağlanır.</li>
      </ul>
    ),
  },
  {
    id: 'amb-2',
    title: '2) Ambassador profilinde hangi özellikler bulunmalıdır?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ambassador hiperaktif ve yüksek dışa dönüklük enerjisine sahip olmalıdır.</li>
        <li>- Ambassador çalışkan ve sorumluluk sahibi olmalıdır.</li>
        <li>- Ambassador ileri derecede çözüm odaklı olmalıdır.</li>
        <li>- Ambassador iyi eğitimli ve açık zihinli olmalıdır.</li>
        <li>- Ambassador sıfır ego ile hareket etmelidir.</li>
        <li>- Ambassador statü değil etki odaklı düşünmelidir.</li>
      </ul>
    ),
  },
  {
    id: 'amb-3',
    title: '3) Ambassador\'ın temel görevleri nelerdir?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ambassador kullanıcı ve danışman onboarding süreçlerini yönetir.</li>
        <li>- Ambassador toplulukları WhatsApp, Telegram, LinkedIn ve Instagram üzerinden yönetir.</li>
        <li>- Ambassador aylık etkinlikler organize eder.</li>
        <li>- Ambassador yeni kullanıcıları aktif hale getirir.</li>
        <li>- Ambassador işletmelerle iş birliği fırsatlarını tanıtır.</li>
        <li>- Ambassador kullanıcı geri bildirimlerini toplar.</li>
        <li>- Ambassador performans metriklerini takip eder.</li>
      </ul>
    ),
  },
  {
    id: 'amb-4',
    title: '4) Ambassador platform içinde nasıl konumlanır?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ambassador şehir sayfasında görünür şekilde yer alır.</li>
        <li>- Kullanıcılar &quot;Connect with City Lead&quot; gibi CTA&apos;lar ile Ambassador&apos;a ulaşabilir.</li>
        <li>- Ambassador özel dashboard ve raporlama araçlarına sahiptir.</li>
        <li>- Ambassador onboarding, etkinlik ve topluluk yönetimini platform üzerinden yürütür.</li>
        <li>- Sistem şeffaf ve takip edilebilir şekilde tasarlanmıştır.</li>
      </ul>
    ),
  },
  {
    id: 'amb-5',
    title: '5) Ambassador sosyal medya ve içerik üretimini nasıl yönetir?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ambassador şehirdeki etkinlikleri ve haberleri toplar.</li>
        <li>- Ambassador içerikleri Corteqs profillerinde yayınlar.</li>
        <li>- Ambassador içerikleri sosyal medya kanallarında paylaşır.</li>
        <li>- Ambassador platform linklerini büyütür.</li>
        <li>- Ambassador içerik üretimi ile organik erişimi artırır.</li>
        <li>- Ambassador şehir içindeki otoritesini güçlendirir.</li>
      </ul>
    ),
  },
  {
    id: 'amb-6',
    title: '6) Ambassador gelir modeli nasıl çalışır?',
    accentColor: '#FF6D01',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ambassador kupon sistemi ile gelir paylaşımına dahil olur.</li>
        <li>- Ambassador yıllık subscription&apos;dan ilk yıl %25 gelir elde eder.</li>
        <li>- Ambassador sonraki yıllarda %10 gelir elde eder.</li>
        <li>- Ambassador etkinlik biletlerinden %15 gelir elde eder.</li>
        <li>- Gelir oranları şehir ve yoğunluğa göre değişebilir.</li>
      </ul>
    ),
  },
  {
    id: 'amb-7',
    title: '7) Ambassador operasyonu nasıl yönetilir?',
    accentColor: '#46BDC6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ambassador yönetimi WhatsApp grubu üzerinden yürütülür.</li>
        <li>- Sistem içine bot entegrasyonu yapılır.</li>
        <li>- Her 3 ayda bir düzenli etkinlikler organize edilir.</li>
        <li>- Etkinlikler arasında piknik, rakı balık, kebap ve özel gün etkinlikleri yer alır.</li>
        <li>- Spor etkinlikleri ve turnuvalar düzenlenir.</li>
      </ul>
    ),
  },
  {
    id: 'amb-8',
    title: '8) Tematik etkinlikler nasıl organize edilir?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Tematik etkinlikler Corteqs kategorilerine göre planlanır.</li>
        <li>- Vize danışmanları, gayrimenkul ve doktorlar için özel geceler düzenlenir.</li>
        <li>- Dernek ve vakıflar için özel etkinlikler yapılır.</li>
        <li>- Speed consulting etkinlikleri organize edilir.</li>
        <li>- Founder, startup ve yatırımcı buluşmaları düzenlenir.</li>
        <li>- Tüm etkinlikler platform üzerinden yayınlanır ve sponsor bulunur.</li>
      </ul>
    ),
  },
  {
    id: 'amb-9',
    title: '9) Partnerlik ve co-working modeli nasıl işler?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Uluslararası co-working zincirleri ile co-brand iş birlikleri yapılır.</li>
        <li>- Üyelere özel indirimler sağlanır.</li>
        <li>- Alternatif olarak yerel partnerlikler kurulur.</li>
        <li>- Ambassador&apos;ın şehirdeki fiziksel varlığı güçlendirilir.</li>
        <li>- Profesyonel ağ genişletilir.</li>
      </ul>
    ),
  },
  {
    id: 'amb-10',
    title: '10) Organizasyon yapısı nasıldır?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ambassador&apos;lar Marketing departmanına bağlıdır.</li>
        <li>- Her Ambassador için bir POC atanır.</li>
        <li>- POC Ambassador&apos;ın etkisini maksimize eder.</li>
        <li>- POC veri akışını sağlar.</li>
        <li>- POC sürekliliği korur.</li>
      </ul>
    ),
  },
  {
    id: 'amb-11',
    title: '11) Ambassador seçimi nasıl yapılır?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Seçim 1–5 arası puanlama ile yapılır.</li>
        <li>- Network strength %30 ağırlığa sahiptir.</li>
        <li>- Execution ability %25 ağırlığa sahiptir.</li>
        <li>- Responsiveness %15 ağırlığa sahiptir.</li>
        <li>- Reputation ve trust %15 ağırlığa sahiptir.</li>
        <li>- Motivation %15 ağırlığa sahiptir.</li>
      </ul>
    ),
  },
  {
    id: 'amb-12',
    title: '12) Growth ve execution süreci nasıl ilerler?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Advisor listesi oluşturulur ve outreach yapılır.</li>
        <li>- İlk kullanıcılar onboard edilir ve genişleme sağlanır.</li>
        <li>- SEO içerikleri üretilir ve dağıtılır.</li>
        <li>- Topluluklarda düzenli paylaşımlar yapılır.</li>
        <li>- İlk ücretli işlemler test edilir.</li>
        <li>- Referral sistemi ve partnerlikler geliştirilir.</li>
      </ul>
    ),
  },
  {
    id: 'amb-13',
    title: '13) Legal ve finansal yapı nasıl kurulur?',
    accentColor: '#FF6D01',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Şirket kurulumu yapılır ve ülke seçilir.</li>
        <li>- Banka hesabı açılır.</li>
        <li>- Ödeme altyapısı kurulur.</li>
        <li>- Sözleşmeler hazırlanır.</li>
        <li>- Muhasebe sistemi kurulur.</li>
        <li>- Vergi yapısı planlanır.</li>
      </ul>
    ),
  },
  {
    id: 'amb-14',
    title: '14) Product ve funnel nasıl oluşturulur?',
    accentColor: '#46BDC6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Advisor onboarding checklist&apos;i hazırlanır.</li>
        <li>- Kullanıcı onboarding checklist&apos;i hazırlanır.</li>
        <li>- Hizmet kategorileri tanımlanır.</li>
        <li>- Pitch script hazırlanır.</li>
        <li>- DM şablonları oluşturulur.</li>
        <li>- Landing page içeriği yazılır.</li>
        <li>- Kullanıcı yolculuğu tanımlanır.</li>
      </ul>
    ),
  },
  {
    id: 'amb-15',
    title: '15) Kullanıcı edinme stratejisi nasıl belirlenir?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Diaspora toplulukları tespit edilir.</li>
        <li>- WhatsApp ve LinkedIn dağıtım listeleri oluşturulur.</li>
        <li>- Viral içerik fikirleri hazırlanır.</li>
        <li>- Farklı edinim kanalları test edilir.</li>
      </ul>
    ),
  },
  {
    id: 'amb-16',
    title: '16) Fiyatlandırma stratejisi nasıl oluşturulur?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Komisyon yapısı tanımlanır.</li>
        <li>- Danışman tarafında fiyat testleri yapılır.</li>
        <li>- Kullanıcı tarafında fiyat testleri yapılır.</li>
        <li>- Veriye dayalı optimizasyon yapılır.</li>
      </ul>
    ),
  },
  {
    id: 'amb-17',
    title: '17) Partnerlik süreci nasıl yürütülür?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Potansiyel partnerler belirlenir.</li>
        <li>- Partnership pitch hazırlanır.</li>
        <li>- Partnerlere outreach yapılır.</li>
      </ul>
    ),
  },
  {
    id: 'amb-18',
    title: '18) Branding ve altyapı nasıl kurulur?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Marka kimliği oluşturulur.</li>
        <li>- Logo ve görsel varlıklar hazırlanır.</li>
        <li>- Sosyal medya hesapları açılır.</li>
        <li>- Domain ve e-posta altyapısı kurulur.</li>
      </ul>
    ),
  },
  {
    id: 'amb-19',
    title: '19) POC Twin modeli nedir?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- POC Twin sistemi veri ile beslenen bir yapıdır.</li>
        <li>- Veri kaynakları şehir verileri, etkinlik verileri ve bot verileridir.</li>
        <li>- Sistem best practice&apos;ler ile eğitilir.</li>
        <li>- POC mesajları ve toplantılar veri kaynağıdır.</li>
        <li>- Amaç POC ayrıldığında sistemi otomatik devam ettirmektir.</li>
        <li>- Sistem bilgi kaybını sıfırlar.</li>
      </ul>
    ),
  },
]

export default function AmbassadorPage() {
  return (
    <DocsShell>
      <div className="docs-main-column">
        <article className="space-y-8 sm:space-y-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="docs-surface p-5 sm:p-6 md:p-8">
              <div
                className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(66,133,244,0.22)_0%,_rgba(66,133,244,0)_72%)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-32 w-40 bg-[radial-gradient(circle,_rgba(52,168,83,0.14)_0%,_rgba(52,168,83,0)_74%)]"
                aria-hidden="true"
              />
              <h1 className="mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                Ambassador
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
                CorteQS platformunda şehir bazlı büyüme engine&apos;i — Ambassador profili, görevleri, gelir modeli ve operasyon yapısı.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">Şehir Bazlı Büyüme</span>
                <span className="docs-chip">Gelir Modeli</span>
                <span className="docs-chip">POC Twin</span>
              </div>
            </div>
          </div>

          <AccordionCard items={accordionItems} />
        </article>
      </div>
    </DocsShell>
  )
}
