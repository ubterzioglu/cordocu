import DocsShell from '@/components/layout/DocsShell'
import AccordionCard from '@/components/ui/AccordionCard'

const accordionItems = [
  {
    id: 'cap-1',
    title: '1) Cap Table v2 dokümanının temel amacı nedir?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Bu doküman, CorteQS&apos;in hisse yapısını, ESOP stratejisini, vesting kurallarını ve yatırım sonrası olası dilüsyon etkilerini tek çerçevede toplamak için hazırlanmıştır.</li>
        <li>- Doküman, özellikle US/Delaware VC normlarına uygun bir erken aşama sermaye yapısı taslağı sunar.</li>
        <li>- Amaç yalnızca mevcut ortaklık oranlarını göstermek değil, aynı zamanda ileride yapılacak işe alımlar, opsiyon tahsisleri ve yatırım turları için referans bir sistem kurmaktır.</li>
        <li>- Bu yapı, kurucu kontrolünü, ekip teşvik mekanizmasını ve yatırımcı beklentilerini aynı tabloda dengelemeyi hedefler.</li>
        <li>- Doküman ayrıca due diligence, yatırım görüşmeleri ve hukuki hazırlık için temel bir referans metni işlevi görür.</li>
      </ul>
    ),
  },
  {
    id: 'cap-2',
    title: '2) Şirketin temel hisse yapısı nasıl kurgulanmıştır?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Şirket için toplam 1.000.000 authorized common share tanımlanmıştır.</li>
        <li>- Bu toplamın 850.000 adedi kuruculara tahsis edilmiş issued and outstanding common share niteliğindedir.</li>
        <li>- Kalan 150.000 adet ise henüz verilmemiş, ancak ileride çalışan ve danışman teşvikleri için ayrılmış ESOP havuzu olarak tutulmaktadır.</li>
        <li>- Bu dağılım fully diluted bazda bakıldığında %85 kurucular ve %15 ESOP havuzu anlamına gelir.</li>
        <li>- Dokümandaki tüm hesaplamalar basic yerine fully diluted mantıkla yapılmıştır.</li>
        <li>- Bu yaklaşım, gelecekte kullanıma açılacak opsiyonların etkisini baştan görünür hale getirdiği için yatırımcı standardına daha yakındır.</li>
        <li>- ESOP havuzu önceden kişilere dağıtılmış değildir.</li>
        <li>- Her grant ayrı değerlendirme, işe alım ihtiyacı ve board onayı ile verilecektir.</li>
        <li>- Para birimi referansı USD olarak belirlenmiştir.</li>
      </ul>
    ),
  },
  {
    id: 'cap-3',
    title: '3) Kurucu hisse dağılımı nasıl yapılandırılmıştır?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Kurucu hisse dağılımı iki kişi arasında eşit şekilde kurgulanmıştır.</li>
        <li>- Burak Akçakanat CEO rolüyle 425.000 common share sahibidir.</li>
        <li>- Umut Barış Terzioğlu CTO rolüyle 425.000 common share sahibidir.</li>
        <li>- Basic bazda her kurucu %50 paya sahiptir.</li>
        <li>- Fully diluted bazda ise her kurucunun payı %42,5 olarak görünür.</li>
        <li>- İki kurucunun toplamı fully diluted bazda %85&apos;tir.</li>
        <li>- Kurucuların elindeki paylar common stock niteliğindedir.</li>
        <li>- İleride yatırımcılara çıkarılması öngörülen hisseler preferred stock olacaktır.</li>
        <li>- Bu yapı, kurucular arasında dengeyi korurken yatırım öncesi kontrolün de ortak kalmasını sağlar.</li>
      </ul>
    ),
  },
  {
    id: 'cap-4',
    title: '4) Kurucular için vesting yapısı neden önemlidir ve nasıl tanımlanmıştır?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Kurucular için vesting süresi 48 ay olarak belirlenmiştir.</li>
        <li>- İlk 12 ay cliff uygulanır.</li>
        <li>- Cliff sonrasında vesting aylık birikimli şekilde 1/48 oranında işler.</li>
        <li>- Bu model, kurucuların uzun vadeli bağlılığını hukuki ve ekonomik olarak güvence altına almak için kullanılır.</li>
        <li>- Vesting mekanizması özellikle yatırımcı açısından önemlidir çünkü şirkete erken aşamada yüksek hisseyle giren kurucuların zaman içinde katkı vermeye devam edip etmediğini teminat altına alır.</li>
        <li>- Bu nedenle hisse verilmiş olsa bile ekonomik hakların tam olarak kazanılması zamana bağlanmıştır.</li>
      </ul>
    ),
  },
  {
    id: 'cap-5',
    title: '5) ESOP stratejisi hangi mantıkla oluşturulmuştur?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- ESOP stratejisi, kritik rolleri şirketin uzun vadeli başarısına ortak etmek için hazırlanmıştır.</li>
        <li>- Planlanan grantlar bağlayıcı değildir ve board onayına tabidir.</li>
        <li>- COO için öngörülen aralık %2,0–3,0 seviyesindedir.</li>
        <li>- CMO için %1,5–2,5 aralığı öngörülmüştür.</li>
        <li>- CFO veya Finance Lead için %1,0–1,5 bandı tanımlanmıştır.</li>
        <li>- Lead Engineer #1 için %1,5–2,0, Lead Engineer #2 için %0,5–1,0 aralığı belirlenmiştir.</li>
        <li>- Satış veya Business Development lideri için %1,0–1,5 aralığı yer almaktadır.</li>
        <li>- Advisor havuzu için toplamda %1,0–2,0 aralığı düşünülmektedir.</li>
        <li>- Advisor bazlı tekil grantlar genellikle %0,25–0,5 bandında kalır.</li>
        <li>- Toplam advisor havuzunun %1–2 sınırını aşmaması hedeflenmektedir.</li>
        <li>- Bu yapı, şirket içinde en kritik kaldıraç yaratan yöneticilere ve teknik çekirdeğe daha güçlü teşvik verilmesi prensibine dayanır.</li>
      </ul>
    ),
  },
  {
    id: 'cap-6',
    title: '6) ESOP grantlarında vesting parametreleri role göre nasıl değişmektedir?',
    accentColor: '#FF6D01',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- COO, CMO ve Lead Engineer gibi kilit ekip üyeleri için genel model 36 ay vesting ve 12 ay cliff şeklindedir.</li>
        <li>- CFO/Finance Lead için de benzer yapı korunur, ancak cliff süresi bazı durumlarda 6 ay olarak daha kısa tanımlanabilir.</li>
        <li>- Advisor grantları için yapı daha esnektir.</li>
        <li>- Advisor tarafında genel süre 24 ay olarak düşünülmektedir.</li>
        <li>- Advisor grantları çoğu zaman 0–6 ay cliff ve milestone-based mantıkla çalışır.</li>
        <li>- Bu farkın nedeni, advisor katkısının tam zamanlı çalışan katkısından farklı olmasıdır.</li>
        <li>- Böylece ESOP sistemi herkese aynı kalıbı uygulamak yerine rol tipine göre uyarlanmış olur.</li>
      </ul>
    ),
  },
  {
    id: 'cap-7',
    title: '7) Ertelenen ücret planı neyi ifade eder?',
    accentColor: '#46BDC6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Ertelenen ücret planı, MVP öncesi dönemde tam piyasa maaşı ödenemeyen rollerin katkısını kayıt altına almak için hazırlanmıştır.</li>
        <li>- Bu modelde kişi bugün daha düşük ya da sıfır nakit alırken, hak ettiği piyasa değeri ayrı bir referans olarak izlenir.</li>
        <li>- CEO Burak için piyasa değeri 9.000 USD/ay, ertelenen ücret de 9.000 USD/ay olarak belirlenmiştir.</li>
        <li>- CTO Barış için de piyasa değeri 9.000 USD/ay ve ertelenen ücret 9.000 USD/ay seviyesindedir.</li>
        <li>- COO için piyasa ücret 7.000 USD, ertelenen ücret 5.000 USD olarak düşünülmüştür.</li>
        <li>- CMO için piyasa ücret 6.000 USD, ertelenen ücret 4.000 USD düzeyindedir.</li>
        <li>- CFO için piyasa ücret 3.000 USD, ertelenen ücret 2.000 USD olarak tanımlanmıştır.</li>
        <li>- Lead Engineer #1 için 8.000 USD piyasa / 6.000 USD ertelenen, Lead Engineer #2 için 7.000 USD piyasa / 5.000 USD ertelenen çerçevesi vardır.</li>
        <li>- Satış/BD rolü için 5.000 USD piyasa / 3.500 USD ertelenen seviyesi düşünülmüştür.</li>
        <li>- Bu ertelemelerin ana prensibi, Seed Round kapanışında öncelikli ödeme yapılmasıdır.</li>
        <li>- Yatırım öncesinde kısmi ödeme yapılabilmesi ise yalnızca nakit imkânı oluşursa ve kurucu/board kararıyla mümkündür.</li>
      </ul>
    ),
  },
  {
    id: 'cap-8',
    title: '8) Founder efor takip kayıtları neden tutulmaktadır?',
    accentColor: '#1A6DC2',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Kurucu efor takip kayıtları, özellikle yatırımcı incelemesi ve due diligence süreçleri için hazırlanır.</li>
        <li>- Bu kayıtlar sayesinde kurucuların gerçekten ne kadar süre ve hangi faaliyetlerle şirkete katkı verdiği belgelenmiş olur.</li>
        <li>- Burak ve Barış için 2026 yılı boyunca aylık çalışılan gün sayısı kaydedilir.</li>
        <li>- Her ay yapılan aktiviteler ayrı ayrı yazılır.</li>
        <li>- Bu aktiviteler arasında geliştirme, müşteri görüşmesi, yatırımcı toplantısı ve ürün kararları yer alır.</li>
        <li>- Kümülatif ücret takibi de aynı kayıt sistemine dahil edilir.</li>
        <li>- Her ay için imza zorunluluğu bulunur.</li>
        <li>- İmzalı sayfalar PDF olarak arşivlenir.</li>
        <li>- Bu sistem, ileride &quot;kim ne kadar emek verdi&quot; sorusunu subjektif tartışmadan çıkarıp kanıtlanabilir hale getirir.</li>
      </ul>
    ),
  },
  {
    id: 'cap-9',
    title: '9) Vesting, cliff ve acceleration kuralları genel olarak nasıl çalışır?',
    accentColor: '#34A853',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Dokümanda üç ana kategori için ayrı vesting kurgusu tanımlanmıştır.</li>
        <li>- Kurucular için model 48 ay vesting, 12 ay cliff, aylık 1/48 şeklindedir.</li>
        <li>- Kilit çalışanlar için model 36 ay vesting, 12 ay cliff, aylık 1/36 şeklindedir.</li>
        <li>- Advisor tarafında ise 24 ay, daha esnek cliff yapısı ve çoğu durumda quarterly vesting öngörülmektedir.</li>
        <li>- Acceleration tarafında doküman Double Trigger yaklaşımını benimser.</li>
        <li>- Bu, tek başına şirket satışı gerçekleşti diye otomatik hızlandırma olmayacağı anlamına gelir.</li>
        <li>- Acceleration için iki koşulun birlikte gerçekleşmesi gerekir.</li>
        <li>- Birinci koşul Change of Control yani şirket satışı, birleşme veya tasfiye gibi olaylardır.</li>
        <li>- İkinci koşul Involuntary Termination yani kişinin pozisyon kaybı, işten çıkarılması veya benzeri irade dışı ayrılıktır.</li>
        <li>- Her iki koşul aynı anda oluşmadan acceleration devreye girmez.</li>
        <li>- Bu yapı yatırımcılar için daha dengeli, şirket için daha kontrollü bir mekanizma sunar.</li>
      </ul>
    ),
  },
  {
    id: 'cap-10',
    title: '10) Good Leaver ve Bad Leaver kuralları ne anlama gelir?',
    accentColor: '#FBBC04',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Good Leaver, şirketten ayrılan kişinin olumsuz bir ihlal olmaksızın ayrıldığı senaryoyu ifade eder.</li>
        <li>- Bu durumda kişinin o tarihe kadar vest etmiş hisseleri korunur.</li>
        <li>- Vest olmamış kısım ise doğal olarak kazanılmamış kabul edilir.</li>
        <li>- Bad Leaver ise ağır ihlal, güven kaybı veya şirket aleyhine ciddi davranışlar gibi olumsuz ayrılık senaryolarını ifade eder.</li>
        <li>- Bad Leaver durumunda hisseler nominal bedelden geri alınabilir.</li>
        <li>- Bu mekanizma, şirketi içeriden zarar verebilecek ayrılıklara karşı korumayı amaçlar.</li>
        <li>- Dokümanda özellikle Single Trigger acceleration&apos;a yer verilmemesi de aynı koruyucu yaklaşımın parçasıdır.</li>
      </ul>
    ),
  },
  {
    id: 'cap-11',
    title: '11) Yatırım turları için dilüsyon senaryoları nasıl modellenmiştir?',
    accentColor: '#EA4335',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Dokümanda üç temel yatırım turu için örnek dilüsyon senaryosu tanımlanmıştır.</li>
        <li>- Pre-Seed senaryosunda yatırım miktarı 150K USD olarak alınmıştır.</li>
        <li>- Bu turda pre-money değerleme 500K USD, post-money değerleme 650K USD olarak hesaplanmıştır.</li>
        <li>- Yeni yatırımcı hissesi yaklaşık %23,1 seviyesindedir.</li>
        <li>- Bu tur sonrası founder payı yaklaşık %65,2, ESOP payı ise %11,5 düzeyine iner.</li>
        <li>- Seed senaryosunda yatırım miktarı 750K USD olarak modellenmiştir.</li>
        <li>- Seed turunda pre-money değerleme 2,5M USD, post-money değerleme 3,25M USD seviyesindedir.</li>
        <li>- Yeni hisse oranı yaklaşık %18,5 olur.</li>
        <li>- Bu tur sonrası founder payı yaklaşık %53,1, ESOP payı ise %9,4 seviyesine düşer.</li>
        <li>- Series A senaryosunda yatırım miktarı 3M USD olarak kurgulanmıştır.</li>
        <li>- Bu turda pre-money değerleme 10M USD, post-money değerleme 13M USD düzeyindedir.</li>
        <li>- Yeni yatırımcı payı yaklaşık %18,7 olur.</li>
        <li>- Bu aşamada founder payı yaklaşık %43,2, ESOP payı ise %7,7 seviyesine iner.</li>
        <li>- Bu tablo, her turda büyüme sermayesinin kurucu sahipliğini azalttığını ama şirket değerini büyüttüğünü göstermesi açısından önemlidir.</li>
      </ul>
    ),
  },
  {
    id: 'cap-12',
    title: '12) Pre-money ESOP refresh ve anti-dilüsyon yaklaşımı neden önemlidir?',
    accentColor: '#9334E6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Doküman, pre-money ESOP refresh konusuna özellikle dikkat çeker.</li>
        <li>- ESOP havuzunun yatırım öncesi tazelenmesi, çoğu zaman kurucuların ilave seyrelmesine yol açar.</li>
        <li>- Bu nedenle ESOP refresh kararı bilinçli ve pazarlık gücü gözetilerek alınmalıdır.</li>
        <li>- Anti-dilüsyon tarafında önerilen yapı weighted-average broad-based modelidir.</li>
        <li>- Full-ratchet anti-dilution açık biçimde kabul edilmemektedir.</li>
        <li>- Bu tercih, kurucular açısından daha dengeli ve piyasada daha makul kabul edilen yaklaşımı yansıtır.</li>
        <li>- Liquidation preference tarafında ise yatırımcılar için tipik 1x non-participating preferred yaklaşımı benimsenmiştir.</li>
        <li>- Bu da çıkış anında yatırımcı koruması sağlarken kurucular için aşırı agresif bir yapı kurmama niyetini gösterir.</li>
      </ul>
    ),
  },
  {
    id: 'cap-13',
    title: '13) Yönetişim kuralları bu cap table içinde nasıl tanımlanmıştır?',
    accentColor: '#FF6D01',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Dokümanda açık biçimde bu metnin hukuki sözleşme olmadığı belirtilmiştir.</li>
        <li>- Buna rağmen operasyonel ve yönetişimsel kurallar net şekilde yazılmıştır.</li>
        <li>- Cap table üzerinde yapılacak her değişiklik kurucu onayına tabidir.</li>
        <li>- Grant, transfer veya iptal gibi işlemler için her iki kurucunun yazılı onayı gerekir.</li>
        <li>- Üçüncü taraf hisse devri veya yeni ortak alımı için yalnızca kurucu mutabakatı değil, aynı zamanda board onayı da zorunludur.</li>
        <li>- Hukuki danışman onayı olmadan yapılan değişiklikler geçerli kabul edilmez.</li>
        <li>- Dokümanın güncellenme sıklığı her 3 ayda bir veya önemli olay bazlı olarak belirlenmiştir.</li>
        <li>- İşe alım, yatırım, ayrılma veya yeni grant gibi durumlar özel güncelleme sebebi sayılır.</li>
        <li>- Her ESOP grant için ayrıca Grant Agreement ve Vesting Schedule hazırlanması zorunludur.</li>
        <li>- Doküman gizli nitelikte kabul edilir ve yetkisiz kopyalama ile dağıtım yasaktır.</li>
      </ul>
    ),
  },
  {
    id: 'cap-14',
    title: '14) Bu cap table taslağının genel olarak ne söylediği nasıl özetlenebilir?',
    accentColor: '#46BDC6',
    children: (
      <ul className="space-y-2 text-sm leading-7 text-gray-700">
        <li>- Bu cap table, kurucular arasında eşit ve dengeli bir başlangıç yapısı kurmaktadır.</li>
        <li>- Aynı zamanda ileride kritik işe alımlar için anlamlı büyüklükte bir ESOP havuzu bırakmaktadır.</li>
        <li>- Vesting ve cliff kuralları ile uzun vadeli bağlılık güvence altına alınmaktadır.</li>
        <li>- Ertelenen ücret modeli ile yatırım öncesi emeğin ekonomik karşılığı görünür hale getirilmektedir.</li>
        <li>- Dilüsyon senaryoları ile yatırım sonrasında kurucu sahipliğinin nasıl evrileceği önceden öngörülmektedir.</li>
        <li>- Yönetişim kuralları ile hisse hareketleri rastgele değil, kontrollü ve çift onaylı hale getirilmektedir.</li>
        <li>- Bu nedenle doküman sadece bir tablo değil, erken aşama ortaklık yapısının, ekip teşvik modelinin ve yatırım mantığının birleştiği stratejik bir sermaye çerçevesidir.</li>
      </ul>
    ),
  },
]

export default function CaptablePage() {
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
                Cap Table v2
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
                CorteQS hisse yapısı, ESOP stratejisi, vesting kuralları, ertelenen ücret modeli ve yatırım dilüsyon senaryoları.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">1M Authorized Shares</span>
                <span className="docs-chip">%85 Kurucu / %15 ESOP</span>
                <span className="docs-chip">Delaware VC Standard</span>
              </div>
            </div>
          </div>

          <AccordionCard items={accordionItems} />
        </article>
      </div>
    </DocsShell>
  )
}
