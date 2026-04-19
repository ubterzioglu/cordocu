import DocsShell from '@/components/layout/DocsShell'
import AccordionCard from '@/components/ui/AccordionCard'

const accordionItems = [
  {
    id: 'ekip-1',
    title: '1) Bu ekip, ücret ve hisse planının temel amacı nedir?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Bu çalışma dosyası, erken aşama ekip yapısını, ücret modelini ve hisse dağılımını tek bir çatı altında toplamak için hazırlanmıştır.</li>
        <li>- Doküman kesinleşmiş bir karar seti değil, planlama ve organizasyon taslağıdır.</li>
        <li>- Amaç, gelecekteki ekip yapısını netleştirmek ve işe alım sürecine temel oluşturmaktır.</li>
        <li>- Aynı zamanda yatırımcı ve operasyonel planlama için referans çerçevesi sunar.</li>
      </ul>
    ),
  },
  {
    id: 'ekip-2',
    title: '2) Genel ekip yapısı nasıl kurgulanmıştır?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Toplam 16 rol tanımlanmıştır.</li>
        <li>- Ekip yapısı iki kurucu ve çok katmanlı ekiplerden oluşur.</li>
        <li>- Kurucu rolleri Business ve CTO olarak ayrılmıştır.</li>
        <li>- Birinci ekip çekirdek ürün ve teknik ekipten oluşur.</li>
        <li>- Bu ekipte CFO, Product Manager, Front End, Back End, Mobile Developer ve Test Engineer yer alır.</li>
        <li>- İkinci ekip şu aşamada yalnızca Data Analyst rolünü içerir.</li>
        <li>- Mevcut durumda kurucular dışında aktif başvuran bulunmamaktadır.</li>
        <li>- Vesting yapısı standart olarak 4 yıl vest ve 1 yıl cliff şeklinde tanımlanmıştır.</li>
      </ul>
    ),
  },
  {
    id: 'ekip-3',
    title: '3) İşe alım ve ekip yönetimi tablosu nasıl çalışır?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- EKİP sayfası işe alım sürecinin merkezi takip alanıdır.</li>
        <li>- Tablo başvuran, aşama, rol, ekip ve değerlendirme bilgilerini içerir.</li>
        <li>- CV, görüşmeci ve puan alanları aday değerlendirmesini destekler.</li>
        <li>- Ücret ve hisse kolonları kompanzasyon planını gösterir.</li>
        <li>- Notlar alanı karar sürecine bağlam sağlar.</li>
        <li>- CFO rolü için karar beklenmektedir.</li>
        <li>- Product Manager rolü için işe alım planı bulunmamaktadır.</li>
        <li>- Tablo büyük ölçüde boş olduğu için operasyonel karar desteği sınırlıdır.</li>
      </ul>
    ),
  },
  {
    id: 'ekip-4',
    title: '4) Hisse (ESOP) dağılımı nasıl kurgulanmıştır?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Hisse dağılımı henüz kesinleşmemiştir.</li>
        <li>- Ürün ve mühendislik rolleri daha yüksek hisse oranına sahiptir.</li>
        <li>- Product Manager için %1.0–2.5 aralığı öngörülmüştür.</li>
        <li>- Back End ve Mobile Developer için %0.75–2.0 bandı belirlenmiştir.</li>
        <li>- Front End için %0.5–1.25 aralığı tanımlanmıştır.</li>
        <li>- DevOps ve Test Engineer gibi destek rolleri daha düşük bantta yer alır.</li>
        <li>- Büyüme ve operasyon rolleri için hisse oranları daha sınırlıdır.</li>
        <li>- Danışman ve yatırımcı rolleri için genellikle maaşsız ESOP modeli düşünülür.</li>
        <li>- Bu yapı, kritik teknik rolleri teşvik etmeye yönelik tasarlanmıştır.</li>
      </ul>
    ),
  },
  {
    id: 'ekip-5',
    title: '5) Ücret bantları hangi pazarlara göre belirlenmiştir?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ücret bantları Almanya, Londra ve Dubai bazında tanımlanmıştır.</li>
        <li>- Almanya için Product Manager maaşı 75K–110K EUR aralığındadır.</li>
        <li>- Teknik roller genellikle 65K–115K EUR bandında yer alır.</li>
        <li>- Test ve Data rolleri daha düşük bantlarda konumlanır.</li>
        <li>- Londra maaşları benzer seviyelerde ancak farklı para birimindedir.</li>
        <li>- Dubai maaşları genellikle daha yüksek görünmektedir.</li>
        <li>- Bu farklar pazar koşulları ve kur etkisinden kaynaklanır.</li>
      </ul>
    ),
  },
  {
    id: 'ekip-6',
    title: '6) Toplam ekip bütçesi nasıl hesaplanır?',
    accentColor: '#FF6D01',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Toplam bütçe, tüm rol bazlı alt ve üst maaşların toplamıdır.</li>
        <li>- Almanya için toplam bütçe 660K–925K EUR aralığındadır.</li>
        <li>- Londra için toplam bütçe 605K–935K GBP aralığındadır.</li>
        <li>- Dubai için toplam bütçe 2.55M–4.11M AED aralığındadır.</li>
        <li>- Bu rakamlar tam kadro senaryosunu temsil eder.</li>
        <li>- Aşamalı işe alım modelinde gerçek maliyet daha düşük olacaktır.</li>
      </ul>
    ),
  },
  {
    id: 'ekip-7',
    title: '7) Görev tanımları altyapısı nasıl çalışır?',
    accentColor: '#46BDC6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Görev tanımları sayfası yapısal olarak hazır durumdadır.</li>
        <li>- Pozisyon listesi EKİP sayfasından otomatik çekilir.</li>
        <li>- Toplam 16 rol bu sayfada görünür durumdadır.</li>
        <li>- Görev tanımı kolonları henüz doldurulmamıştır.</li>
        <li>- Bu alan doldurulduğunda rol netliği önemli ölçüde artacaktır.</li>
        <li>- Sayfa adı ve bazı yazımlar düzeltilmelidir.</li>
      </ul>
    ),
  },
  {
    id: 'ekip-8',
    title: '8) Dokümanda öne çıkan eksikler nelerdir?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ücret ve hisse kolonlarının büyük bölümü boş durumdadır.</li>
        <li>- Toplam hesaplamalar bu nedenle anlamlı veri üretmemektedir.</li>
        <li>- Aday değerlendirme alanları büyük ölçüde doldurulmamıştır.</li>
        <li>- Görev tanımları içerik olarak eksiktir.</li>
        <li>- Yazım hataları ve isimlendirme tutarsızlıkları bulunmaktadır.</li>
        <li>- Açık bırakılmış satırlar planın tamamlanmadığını göstermektedir.</li>
      </ul>
    ),
  },
  {
    id: 'ekip-9',
    title: '9) Bu dokümanın mevcut durumu nasıl değerlendirilmelidir?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Doküman bir karar sistemi değil, planlama iskeletidir.</li>
        <li>- Ekip yapısını ve rol dağılımını net şekilde ortaya koyar.</li>
        <li>- Ücret ve hisse modeline dair çerçeve sunar.</li>
        <li>- Görev tanımları için altyapı hazırlar.</li>
        <li>- Ancak operasyonel karar almak için henüz yeterli değildir.</li>
      </ul>
    ),
  },
  {
    id: 'ekip-10',
    title: '10) Dokümanın bir sonraki aşamaya geçmesi için ne yapılmalıdır?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ücret ve hisse kolonları doldurulmalıdır.</li>
        <li>- Görev tanımları detaylı şekilde yazılmalıdır.</li>
        <li>- Yazım ve isimlendirme hataları düzeltilmelidir.</li>
        <li>- İşe alım pipeline&apos;ı aktif veri ile beslenmelidir.</li>
        <li>- Böylece doküman statik plan olmaktan çıkıp aktif yönetim aracına dönüşür.</li>
      </ul>
    ),
  },
]

export default function EkipPage() {
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
                Ekip ve Bütçe
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
                Erken aşama ekip yapısı, ücret modeli, hisse dağılımı ve bütçe planlaması.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">16 Rol</span>
                <span className="docs-chip">ESOP Dağılımı</span>
                <span className="docs-chip">Ücret Bantları (DE / UK / AE)</span>
              </div>
            </div>
          </div>

          <AccordionCard items={accordionItems} />
        </article>
      </div>
    </DocsShell>
  )
}
