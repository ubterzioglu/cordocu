import DocsShell from '@/components/layout/DocsShell'
import AccordionCard from '@/components/ui/AccordionCard'

const accordionItems = [
  {
    id: 'wb-1',
    title: '1) WhatsApp bot entegrasyonunun genel amacı nedir?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- WhatsApp botu, grup içinde tanıtım ve bilgilendirme akışını düzenlemek için kullanılır.</li>
        <li>- Amaç sadece reklam yapmak değil, kullanıcıya fayda sunan bir temas noktası oluşturmaktır.</li>
        <li>- Bot grup deneyimini destekleyen yardımcı bir rol üstlenmelidir.</li>
        <li>- Botun dili ve mesaj sıklığı grup akışını bozmayacak şekilde kurgulanmalıdır.</li>
        <li>- Meta&apos;nın spam ve otomasyon kurallarına uygun bir yapı kurulmalıdır.</li>
      </ul>
    ),
  },
  {
    id: 'wb-2',
    title: '2) WhatsApp botu için teknik altyapı nasıl seçilir?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Resmi yol olarak WhatsApp Business API kullanılabilir.</li>
        <li>- Twilio, WATI ve Interakt resmi sağlayıcı örnekleridir.</li>
        <li>- Resmi yol güvenli ve ücretlidir.</li>
        <li>- Gayriresmi yol olarak whatsapp-web.js veya Baileys kullanılabilir.</li>
        <li>- Gayriresmi yol ücretsiz ve esnektir.</li>
        <li>- Gayriresmi yol yüksek ban riski taşır.</li>
        <li>- Maliyet, esneklik ve risk karşılaştırması yapılmalıdır.</li>
        <li>- Tek bir teknik yaklaşım seçilerek pilot kurulum yapılmalıdır.</li>
      </ul>
    ),
  },
  {
    id: 'wb-3',
    title: '3) Grup içi tanıtım senaryoları nasıl çalışır?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Tetikleyici komutlar ile kullanıcı isteğe bağlı içerik alır.</li>
        <li>- Kullanıcı !kampanyalar veya !katalog yazarak bilgi talep eder.</li>
        <li>- Zamanlanmış mesajlar belirli gün ve saatlerde paylaşılır.</li>
        <li>- Cron job ile haftalık kampanya mesajları gönderilir.</li>
        <li>- DM yönlendirme ile kullanıcı özel mesajlara çekilir.</li>
        <li>- Grup spamden korunur ve birebir iletişim sağlanır.</li>
        <li>- Tetikleyici komutlar ve mesaj şablonları önceden tanımlanmalıdır.</li>
      </ul>
    ),
  },
  {
    id: 'wb-4',
    title: '4) WhatsApp bot kurulumu nasıl yapılır?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Bot için ayrı bir telefon numarası tahsis edilmelidir.</li>
        <li>- Platform veya yazılım kurulumu yapılmalıdır.</li>
        <li>- Chatfuel ve ManyChat gibi araçlar kullanılabilir.</li>
        <li>- Bot gruba eklenmeli ve gerekirse admin yetkisi verilmelidir.</li>
        <li>- WhatsApp Business katalog entegrasyonu yapılmalıdır.</li>
        <li>- Katalog linkleri bot üzerinden paylaşılmalıdır.</li>
      </ul>
    ),
  },
  {
    id: 'wb-5',
    title: '5) Bot kullanımında dikkat edilmesi gereken kritik noktalar nelerdir?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Aynı mesaj kısa sürede tekrar tekrar gönderilmemelidir.</li>
        <li>- Mesaj gönderimine random delay eklenmelidir.</li>
        <li>- Bot insan davranışına benzer şekilde hareket etmelidir.</li>
        <li>- Grup sadece reklam içeren bir yapıya dönüşmemelidir.</li>
        <li>- Bot müşteri hizmetleri asistanı gibi konumlandırılmalıdır.</li>
        <li>- Kullanıcıların botu kullanma nedeni net olmalıdır.</li>
      </ul>
    ),
  },
  {
    id: 'wb-6',
    title: '6) Opt-in ve DM stratejisi nasıl çalışır?',
    accentColor: '#FF6D01',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Bot kullanıcıya opt-in çağrısı yapar.</li>
        <li>- Kullanıcı KAZAN yazarak sisteme dahil olur.</li>
        <li>- Bot kullanıcıyı hedefli mesaj listesine ekler.</li>
        <li>- Tanıtımlar sadece bu listeye DM olarak gönderilir.</li>
        <li>- Grup üyeleri gereksiz mesaj görmez.</li>
        <li>- Kullanıcı DUR yazarak sistemden çıkabilir.</li>
        <li>- Opt-in ve opt-out mekanizmaları test edilmelidir.</li>
      </ul>
    ),
  },
  {
    id: 'wb-7',
    title: '7) WhatsApp topluluk modeli nasıl kurgulanır?',
    accentColor: '#46BDC6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ana grup sohbet ve genel iletişim için kullanılır.</li>
        <li>- Alt grup fırsatlar ve ödüller için oluşturulur.</li>
        <li>- Kullanıcılar isteğe bağlı olarak alt gruba katılır.</li>
        <li>- Bot sadece alt gruba mesaj gönderir.</li>
        <li>- Ana grup spamden korunur.</li>
        <li>- Topluluk yapısı kullanıcı deneyimini iyileştirir.</li>
      </ul>
    ),
  },
  {
    id: 'wb-8',
    title: '8) Token kazanım sistemi nasıl çalışır?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Kullanıcının WhatsApp numarası wallet ile eşleştirilir.</li>
        <li>- Her kullanıcıya benzersiz link oluşturulur.</li>
        <li>- Kullanıcı linke tıkladığında sistem tetiklenir.</li>
        <li>- Backend tıklamayı algılar ve token aktarımı yapar.</li>
        <li>- Kullanıcı anında ödül aldığını görür.</li>
        <li>- Tekrar tıklama limitleri belirlenir.</li>
        <li>- Sahte tıklama ve kötüye kullanım engellenir.</li>
        <li>- Günlük maksimum ödül kuralları tanımlanır.</li>
      </ul>
    ),
  },
  {
    id: 'wb-9',
    title: '9) Genel aksiyon ve TODO listesi nedir?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Teknik altyapı seçilmelidir.</li>
        <li>- Bot için ayrı numara belirlenmelidir.</li>
        <li>- Yazılım kurulumu yapılmalıdır.</li>
        <li>- Grup içi ve DM akışları tanımlanmalıdır.</li>
        <li>- Opt-in ve opt-out sistemi kurulmalıdır.</li>
        <li>- Topluluk veya alt grup modeli değerlendirilmelidir.</li>
        <li>- Wallet eşleme sistemi tasarlanmalıdır.</li>
        <li>- Kişiye özel link üretimi kurulmalıdır.</li>
        <li>- Tıklama takibi ve token sistemi geliştirilmelidir.</li>
        <li>- Spam ve ban riskleri azaltılmalıdır.</li>
        <li>- Mesaj limitleri ve delay kuralları belirlenmelidir.</li>
        <li>- Veritabanı ve API yapısı tanımlanmalıdır.</li>
      </ul>
    ),
  },
]

export default function WhatsappBotPage() {
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
                WhatsApp Bot
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
                WhatsApp grubuna bot entegrasyonu — reklam yapısı, opt-in modeli, token ödül sistemi ve teknik altyapı.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">Bot Entegrasyonu</span>
                <span className="docs-chip">Opt-in / DM Stratejisi</span>
                <span className="docs-chip">Token Sistemi</span>
              </div>
            </div>
          </div>

          <AccordionCard items={accordionItems} />
        </article>
      </div>
    </DocsShell>
  )
}
