import DocsShell from '@/components/layout/DocsShell'
import AccordionCard from '@/components/ui/AccordionCard'

const accordionItems = [
  {
    id: 'genel-amac',
    title: '1) Dijital pazarlama çalışma şablonunun genel amacı nedir?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Bu şablon, içerik üretim süreci ile pazarlama kampanyalarını tek çatı altında takip etmek için oluşturulmuştur.</li>
        <li>- İki ana yapıdan oluşur: içerik yönetimi ve kampanya yönetimi.</li>
        <li>- Mevcut haliyle tam operasyonel bir sistemden çok, başlangıç seviyesinde bir iskelet niteliğindedir.</li>
      </ul>
    ),
  },
  {
    id: 'genel-yapi',
    title: '2) Şablonun genel yapısı nasıldır?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Şablon iki ana sekmeden oluşur.</li>
        <li>- İçerikler sekmesi içerik üretimi ve yayın yönetimine odaklanır.</li>
        <li>- Kampanyalar sekmesi kampanya planlama ve takibine odaklanır.</li>
        <li>- Her iki yapı için başlıklar ve durum akışları tanımlıdır.</li>
        <li>- Açıklama, sorumlu kişi, tarih, dosya ve not alanlarının çoğu henüz boş durumdadır.</li>
      </ul>
    ),
  },
  {
    id: 'icerik-yonetimi',
    title: '3) İçerik yönetimi nasıl çalışır?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- İçerikler sekmesi farklı içerik türlerini tek tabloda takip eder.</li>
        <li>- Takip edilen alanlar içerik adı, tür, ayrıntılar, sahibi, durum, yayın tarihi, dosya ve notlardır.</li>
        <li>- İçerik türleri arasında e-posta, sosyal medya, TV ve blog yer alır.</li>
        <li>- Tümü seçeneği filtreleme amacıyla kullanılır.</li>
        <li>- Çoğu satırda yalnızca tür ve durum bilgisi bulunduğu için ek veri girişi gereklidir.</li>
      </ul>
    ),
  },
  {
    id: 'icerik-surec',
    title: '4) İçeriklerin süreç akışı nasıldır?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- İçerikler Yeni aşamasıyla başlar.</li>
        <li>- İçerikler Devam Ediyor aşamasına geçer.</li>
        <li>- İçerikler İnceleniyor aşamasına ulaşır.</li>
        <li>- İçerikler Yayınlandı durumuna geçerek tamamlanır.</li>
        <li>- Askıya Alındı ve Duraklatıldı durumları ek kontrol aşamalarıdır.</li>
        <li>- Bu akış içeriklerin brief aşamasından yayına kadar izlenmesini sağlar.</li>
      </ul>
    ),
  },
  {
    id: 'kampanya-yonetimi',
    title: '5) Kampanya yönetimi nasıl çalışır?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Kampanyalar sekmesi pazarlama kampanyalarının planlanması için kullanılır.</li>
        <li>- Kampanyalar sekmesi kampanyaların ilerlemesini takip etmek için kullanılır.</li>
        <li>- Takip edilen alanlar kampanya adı, tür, sahibi, durum, başlangıç tarihi, bitiş tarihi, öğeler ve notlardır.</li>
        <li>- Mevcut somut kampanya örneği ilk 100 işletme veya danışmana ücretsiz video sunulmasıdır.</li>
        <li>- Diğer kampanya satırları henüz taslak seviyesindedir.</li>
      </ul>
    ),
  },
  {
    id: 'kampanya-surec',
    title: '6) Kampanyaların süreç akışı nasıldır?',
    accentColor: '#FF6D01',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Kampanyalar Planlanıyor aşamasıyla başlar.</li>
        <li>- Kampanyalar Gelişiyor aşamasına ilerler.</li>
        <li>- Kampanyalar İnceleniyor aşamasına ulaşır.</li>
        <li>- Kampanyalar Beklemede aşamasında durabilir.</li>
        <li>- Kampanyalar Yayınlandı durumuyla tamamlanır.</li>
        <li>- Bu akış kampanyaların fikirden yayına kadar düzenli ilerlemesini sağlar.</li>
        <li>- Tür 1, Tür 2 ve Tür 3 etiketleri henüz placeholder durumundadır.</li>
      </ul>
    ),
  },
  {
    id: 'operasyonel',
    title: '7) Şablonun operasyonel hale gelmesi için ne yapılmalıdır?',
    accentColor: '#46BDC6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- İçerik ve kampanya isimleri net biçimde doldurulmalıdır.</li>
        <li>- Her satıra sorumlu kişi atanmalıdır.</li>
        <li>- Başlangıç, bitiş ve yayın tarihleri girilmelidir.</li>
        <li>- İlgili dosyalar ve bağlantılar eklenmelidir.</li>
        <li>- Not alanları doldurulmalıdır.</li>
        <li>- Tür 1, Tür 2 ve Tür 3 etiketleri içerik stratejisine göre tanımlanmalıdır.</li>
        <li>- Tümü filtresinin kullanım amacı netleştirilmelidir.</li>
      </ul>
    ),
  },
]

export default function DijitalPazarlamaPage() {
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
                Dijital Pazarlama
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
                İçerik üretim süreci ve pazarlama kampanyalarını tek çatı altında takip eden çalışma şablonu.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">İçerik Yönetimi</span>
                <span className="docs-chip">Kampanya Yönetimi</span>
                <span className="docs-chip">Durum Akışları</span>
              </div>
            </div>
          </div>

          <AccordionCard items={accordionItems} />
        </article>
      </div>
    </DocsShell>
  )
}
