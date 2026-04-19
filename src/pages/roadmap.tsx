import DocsShell from '@/components/layout/DocsShell'
import AccordionCard from '@/components/ui/AccordionCard'

const accordionItems = [
  {
    id: 'roadmap-1',
    title: '1) 12 aylık roadmap\'in stratejik amacı nedir?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Bu roadmap, CorteQS&apos;in M1&apos;de MVP seviyesinden başlayıp M12&apos;de Seed Ready seviyesine ulaşmasını hedefleyen faz bazlı büyüme planıdır.</li>
        <li>- Roadmap yalnızca ürün geliştirme takvimi değildir; aynı zamanda büyüme planı, gelir planı, kullanıcı kazanım planı ve yatırımcı anlatısı olarak da kullanılabilir.</li>
        <li>- Yapı, operasyonu üç ana eksende birlikte ele alır.</li>
        <li>- Birinci eksen arz tarafıdır ve advisor ile business onboarding süreçlerini kapsar.</li>
        <li>- İkinci eksen talep tarafıdır ve içerik, SEO, dağıtım ve kullanıcı kazanımını kapsar.</li>
        <li>- Üçüncü eksen gelir tarafıdır ve booking, ödeme akışı ve komisyon modelini kapsar.</li>
        <li>- Başlangıç noktası 20 advisor ve 50 kullanıcıdır.</li>
        <li>- Nihai hedef 500 advisor, 20K kullanıcı ve 100K dolar gelir seviyesine ulaşmaktır.</li>
      </ul>
    ),
  },
  {
    id: 'roadmap-2',
    title: '2) Roadmap\'in genel faz yapısı nasıl kurgulanmıştır?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- 12 aylık akış, birbirine bağlı ve kademeli büyüyen fazlar halinde tasarlanmıştır.</li>
        <li>- İlk faz M1–M2 MVP dönemidir.</li>
        <li>- İkinci faz M3 Launch dönemidir.</li>
        <li>- Üçüncü faz M4–M5 Growth dönemidir.</li>
        <li>- Dördüncü faz M6 PMF dönemidir.</li>
        <li>- Beşinci faz M7–M9 Scale dönemidir.</li>
        <li>- Altıncı faz M10–M11 Expansion dönemidir.</li>
        <li>- Son aşama M12 Seed Ready konumudur.</li>
        <li>- Bu yapı, ürünün önce çalışır hale gelmesini, sonra pazara açılmasını, ardından büyümesini, doğrulanmasını ve ölçeklenmesini sağlar.</li>
        <li>- Fazlar arasında yalnızca metrik artışı değil, aynı zamanda operasyonel olgunluk, ürün derinliği ve gelir kalitesi de artar.</li>
      </ul>
    ),
  },
  {
    id: 'roadmap-3',
    title: '3) MVP fazında (M1–M2) hangi hedefler ve ürün bileşenleri öne çıkar?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- MVP fazının temel amacı, platformu çalışır ve ilk kullanıcıya hizmet verebilir hale getirmektir.</li>
        <li>- M1&apos;de temel hedef platformun canlıya alınmasıdır.</li>
        <li>- M1 hedefleri arasında 20 advisor, 10 SEO içerik ve 50 kullanıcı bulunur.</li>
        <li>- Bu aşamada ürünün çekirdeği doğrulanır ve ilk arz tarafı oluşturulur.</li>
        <li>- M2&apos;de odak, platformu sadece görünür değil aynı zamanda kullanılabilir ve işlem yapabilir hale getirmektir.</li>
        <li>- M2 hedefleri arasında booking sistemi kurulumu, 50 advisor, 30 içerik ve outreach çalışmaları, ilk satışlar ve 200 kullanıcı bulunur.</li>
        <li>- MVP fazında backlog tarafında çok sayıda temel ürün görevi tanımlanmıştır.</li>
        <li>- GitHub repo setup ile teknik temel yapı kurulmalıdır.</li>
        <li>- Database schema tarafında users, advisors ve bookings yapısı tanımlanmalıdır.</li>
        <li>- Signup ve login akışı hem e-posta hem Google ile çalışmalıdır.</li>
        <li>- Advisor profil oluşturma ve düzenleme akışları tamamlanmalıdır.</li>
        <li>- Advisor listing sayfası oluşturulmalıdır.</li>
        <li>- Filter ve search özellikleri kullanıcı deneyiminin çekirdeği olarak eklenmelidir.</li>
        <li>- Booking request sistemi kurulmalıdır.</li>
        <li>- Takvim müsaitlik yapısı planlanmalıdır.</li>
        <li>- Stripe entegrasyonu ödeme altyapısının temeli olarak hazırlanmalıdır.</li>
        <li>- Komisyon mantığı ve yüzde bazlı kesinti modeli netleştirilmelidir.</li>
        <li>- Email bildirimleri kullanıcı ve advisor akışını desteklemelidir.</li>
        <li>- Admin paneli operasyon görünürlüğü sağlamalıdır.</li>
        <li>- CMS ve blog sistemi içerik büyümesini desteklemelidir.</li>
        <li>- SEO yapısı MVP aşamasından itibaren inşa edilmelidir.</li>
        <li>- Bu nedenle MVP fazı yalnızca &quot;ürünü açma&quot; dönemi değil, aynı zamanda çekirdek sistemleri birbirine bağlama dönemi olarak görülmelidir.</li>
      </ul>
    ),
  },
  {
    id: 'roadmap-4',
    title: '4) Launch fazında (M3) hangi stratejik kırılım gerçekleşir?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Launch fazı, ürünün teknik olarak çalışmasından ticari olarak ölçülebilir hale gelmesine geçiş aşamasıdır.</li>
        <li>- M3&apos;te ödeme entegrasyonunun tamamlanması temel dönüm noktalarından biridir.</li>
        <li>- Bu ay için hedeflenen metrikler 70 advisor, 500 kullanıcı ve 1K dolar gelir seviyesidir.</li>
        <li>- Launch fazında SEO ve LinkedIn dağıtımı aktif büyüme kanalı olarak kullanılır.</li>
        <li>- Bu dönemde ürün görevlerinin tamamı High öncelikli olarak tanımlanmıştır.</li>
        <li>- Onboarding flow iyileştirme çalışmaları yapılmalıdır.</li>
        <li>- Advisor onboarding form optimizasyonu ile kayıt sürtünmesi azaltılmalıdır.</li>
        <li>- Sayfa hızı optimizasyonu tamamlanmalıdır.</li>
        <li>- Google Analytics kurulumu yapılmalıdır.</li>
        <li>- Event tracking üzerinden signup ve booking davranışları ölçülmelidir.</li>
        <li>- Temel güvenlik kontrolleri uygulanmalıdır.</li>
        <li>- Mobil optimizasyon tamamlanmalıdır.</li>
        <li>- Chat veya destek sistemi devreye alınmalıdır.</li>
        <li>- Referral sistemi için temel altyapı hazırlanmalıdır.</li>
        <li>- Sunucu scaling hazırlığı yapılmalıdır.</li>
        <li>- Launch fazının özünde, ürünün ilk ciddi kullanıcı akınını ve ilk gelir testlerini kaldırabilecek seviyeye çıkarılması vardır.</li>
      </ul>
    ),
  },
  {
    id: 'roadmap-5',
    title: '5) Growth ve PMF fazında (M4–M6) hangi dönüşüm hedeflenir?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Bu fazın ana amacı, ilk doğrulama sinyallerini tekrarlanabilir büyüme modeline dönüştürmektir.</li>
        <li>- M4 Growth aşamasında hedefler 100 advisor, 1K kullanıcı ve 3K dolar gelir seviyesidir.</li>
        <li>- M4&apos;te user dashboard ve referral sistemi önemli ürün/growth bileşenleri olarak öne çıkar.</li>
        <li>- M5 Growth aşamasında hedefler 120 advisor, 2K kullanıcı ve 5K dolar gelir seviyesidir.</li>
        <li>- M5&apos;te içerik üretimi ve dağıtımı ölçeklenir.</li>
        <li>- M6 PMF aşamasında hedefler 150 advisor ve 10K dolar gelir etrafında şekillenir.</li>
        <li>- M6&apos;da ana odak sadece büyüme değil, aynı zamanda stabilizasyon ve retention olur.</li>
        <li>- Bu fazda GTM çalışmaları sistematik hale gelir.</li>
        <li>- LinkedIn haftalık paylaşımı düzenli kanal olarak işletilir.</li>
        <li>- WhatsApp grup paylaşımı dağıtım motoru olarak kullanılır.</li>
        <li>- İlk 50 kullanıcı onboarding hedefi aktif hale getirilir.</li>
        <li>- Pricing modeli tanımlanır ve test edilir.</li>
        <li>- İlk ücretli booking testi uygulanır.</li>
        <li>- SEO içerik sayısı 30+ seviyesine ölçeklenir.</li>
        <li>- Referral sistemi aktivasyonu gerçekleştirilir.</li>
        <li>- Growth ve PMF dönemi, ürünün sadece kullanılabilir değil, aynı zamanda tekrar tekrar tercih edilebilir olup olmadığını test ettiği için kritik önemdedir.</li>
      </ul>
    ),
  },
  {
    id: 'roadmap-6',
    title: '6) Scale ve Expansion fazında (M7–M11) hangi büyüme mantığı izlenir?',
    accentColor: '#FF6D01',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Bu fazın temel amacı, doğrulanmış yapıyı yeni şehirler, yeni gelir katmanları ve yeni ortaklıklar ile büyütmektir.</li>
        <li>- M7 Scale aşamasında hedefler 200 advisor, 3K kullanıcı ve 15K dolar gelir seviyesidir.</li>
        <li>- M7&apos;de yeni özellikler ve yeni şehir hazırlıkları öne çıkar.</li>
        <li>- M8 Expansion aşamasında hedefler 250 advisor, 5K kullanıcı ve 25K dolar gelir seviyesidir.</li>
        <li>- M8&apos;de şehir lansmanı aktif büyüme hamlesi haline gelir.</li>
        <li>- M9 Optimizasyon aşamasında hedefler 300 advisor, 7K kullanıcı ve 40K dolar gelir seviyesidir.</li>
        <li>- M9&apos;da partnership yapıları öne çıkar.</li>
        <li>- M10 Expansion aşamasında hedefler 350 advisor, 10K kullanıcı ve 60K dolar gelir seviyesidir.</li>
        <li>- M10&apos;da perks katmanı ve B2B anlaşmalar stratejik genişleme unsurları olur.</li>
        <li>- M11 Otomasyon aşamasında hedefler 400 advisor, 15K kullanıcı ve 80K dolar gelir seviyesidir.</li>
        <li>- M11&apos;de kanal ölçekleme ve otomasyon yetenekleri güçlendirilir.</li>
        <li>- Bu faz boyunca GTM tarafında yerel partnershipler başlatılır.</li>
        <li>- Conversion optimizasyonu sistematik şekilde ele alınır.</li>
        <li>- Ölçeklenme yalnızca daha fazla kullanıcı kazanmak değildir; aynı zamanda operasyonel verimlilik, kanal verimliliği ve gelir kalitesini artırmak anlamına gelir.</li>
      </ul>
    ),
  },
  {
    id: 'roadmap-7',
    title: '7) M12 Seed Ready aşaması bu roadmap içinde neyi temsil eder?',
    accentColor: '#46BDC6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- M12, roadmap&apos;in nihai stratejik hedef noktasını temsil eder.</li>
        <li>- Bu aşama, girişimin yalnızca büyümüş değil, aynı zamanda yatırımcı karşısında anlatılabilir, ölçülebilir ve savunulabilir hale gelmesini ifade eder.</li>
        <li>- M12 hedefi 500 advisor, 20K kullanıcı ve 100K dolar gelir seviyesidir.</li>
        <li>- Seed Ready noktası, operasyonun erken denemelerden çıkıp daha kurumsal ve yatırım yapılabilir yapıya dönüşmesini simgeler.</li>
        <li>- Bu aşamada roadmap, yatırımcı sunumu için kullanılabilecek güçlü bir anlatı omurgası sağlar.</li>
        <li>- Başka bir ifadeyle M12, sadece son ay değil, önceki tüm fazların birleşik sonucu olan ürün + büyüme + gelir + sistem olgunluğu seviyesidir.</li>
      </ul>
    ),
  },
  {
    id: 'roadmap-8',
    title: '8) Roadmap\'in metrik mantığı nasıl okunmalıdır?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Roadmap&apos;teki metrikler birbirinden bağımsız değil, birbirini besleyen göstergelerdir.</li>
        <li>- Advisor sayısı, arz tarafının derinliğini gösterir.</li>
        <li>- Kullanıcı sayısı, talep tarafının büyümesini gösterir.</li>
        <li>- Revenue, iş modelinin çalıştığını gösterir.</li>
        <li>- Bu üç metrik birlikte okunduğunda platformun pazar dengesi daha doğru anlaşılır.</li>
        <li>- Düşük advisor sayısı yüksek kullanıcı talebini zayıflatabilir.</li>
        <li>- Düşük kullanıcı artışı güçlü advisor onboarding&apos;i ekonomik olarak sınırlayabilir.</li>
        <li>- Gelir artışı ise ancak booking, ödeme ve komisyon akışının sürdürülebilir çalışmasıyla kalıcı hale gelir.</li>
        <li>- Bu nedenle roadmap, salt büyüme tablosu değil, marketplace denge planı olarak değerlendirilmelidir.</li>
      </ul>
    ),
  },
  {
    id: 'roadmap-9',
    title: '9) Bu roadmap operasyonel olarak nasıl kullanılmalıdır?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Roadmap aylık hedef listesi gibi okunabilir.</li>
        <li>- Roadmap ekip içinde önceliklendirme aracı olarak kullanılabilir.</li>
        <li>- Roadmap yatırımcı sunumunun stratejik omurgası olarak kullanılabilir.</li>
        <li>- Roadmap ürün, growth ve gelir ekiplerini aynı hedef etrafında hizalamak için kullanılabilir.</li>
        <li>- Her ayın hedefleri sadece sayısal sonuç olarak değil, ürün teslimleri + dağıtım aksiyonları + ticari çıktılar şeklinde ele alınmalıdır.</li>
        <li>- Böylece roadmap statik bir belge olmaktan çıkar ve karar verme mekanizmasına dönüşür.</li>
      </ul>
    ),
  },
  {
    id: 'roadmap-10',
    title: '10) Bu roadmap\'in özünde hangi büyüme mantığı vardır?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Roadmap önce çekirdek ürünü kurar.</li>
        <li>- Roadmap sonra pazara açılır.</li>
        <li>- Roadmap ardından kullanıcı ve advisor tarafını birlikte büyütür.</li>
        <li>- Roadmap sonrasında retention ve PMF sinyallerini güçlendirir.</li>
        <li>- Roadmap daha sonra yeni şehirler, partnerlikler ve B2B katmanları ile ölçeklenir.</li>
        <li>- Roadmap en sonunda yatırım almaya hazır, veriye dayalı ve tekrar edilebilir bir işletme yapısı kurmayı hedefler.</li>
        <li>- Bu nedenle belge, yalnızca &quot;12 aylık plan&quot; değil, CorteQS&apos;in MVP&apos;den yatırım yapılabilir şirkete dönüşüm kurgusu olarak okunmalıdır.</li>
      </ul>
    ),
  },
]

export default function RoadmapPage() {
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
                Roadmap
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
                CorteQS&apos;in MVP&apos;den Seed Ready seviyesine ulaşmasını hedefleyen 12 aylık faz bazlı büyüme planı.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">MVP → Launch → Growth → PMF → Scale → Seed Ready</span>
                <span className="docs-chip">500 Advisor / 20K Kullanıcı / $100K Gelir</span>
              </div>
            </div>
          </div>

          <AccordionCard items={accordionItems} />
        </article>
      </div>
    </DocsShell>
  )
}
