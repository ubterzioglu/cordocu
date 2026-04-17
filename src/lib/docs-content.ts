import {
  getDocCategory,
  getDocItemById,
  type DocCategorySlug,
  type DocIconKey,
} from './docs-hub'

const projeTakibiSectionDetail: Record<string, string> = {
  'pt-genel-yapi':
    'Corteqs tarafında kullanılabilecek sade bir proje takip şablonu. Tek sekme (Proje Takibi), 2 proje bloğu, toplam 14 görev satırı, 9 maliyet verili satır. Yapının mantığı: üstte proje kimlik bilgileri, sağda durum ve öncelik anahtarları, ortada proje bazlı görev listeleri, her proje için AVERAGE/SUM formüllü özet satırlar. Küçük ekipler için gereksiz karmaşıklıktan kaçınarak tek ekranda durum + maliyet + saat görünümü sağlamak amaçlanmış.',
  'pt-ust-bilgiler':
    'Üst bilgi alanları: Proje başlığı, Proje yöneticisi, Şirket adı, Tarih (12.03.2018). Üçü şu an placeholder metin içeriyor — gerçek veriyle doldurulmayı bekliyor. Durum anahtarı: Beklemede | Henüz Başlamadı | Devam Ediyor | Tamamlandı. Öncelik anahtarı: Düşük | Orta | Yüksek. Bu anahtarlar tablodaki değerleri standardize ediyor; renk kodlamasıyla görsel ayrım sağlanmış.',
  'pt-proje1':
    'Proje 1 altında 5 görev satırı. Durumlar: Beklemede (×2, Yüksek + Düşük öncelik), Henüz Başlamadı (Düşük), Devam Ediyor (Orta), Tamamlandı (Orta). Tamamlanma yüzdeleri: %56, %50, %22, %11 (1 satır tamamen boş). Tarih aralığı: 09.09.2018 – 20.09.2018. Özet formüller: Tamamlanan %=AVERAGE(K11:K15), Sabit maliyet=SUM(L11:L15), Tahmini saat=SUM(M11:M15), Fiili saat=SUM(N11:N15). Not: maliyet ve saat alanlarının neredeyse tamamı boş — sadece yapı iskelet olarak kurulmuş.',
  'pt-proje2':
    'Proje 2 altında 9 görev satırı. Durumlar: Beklemede (%11, Yüksek), Henüz Başlamadı (%0, Düşük), Devam Ediyor (%0, Orta), Tamamlandı ×6 (hepsi Orta, %0). Maliyet verileri gerçek: 400 + 200 + 50 + 40 + 40 + 40 + 40 + 40 + 40 = 890 toplam sabit maliyet. Tahmini saat toplamı: 43. Fiili saat toplamı: 42. Özet formüller: Tamamlanan %=AVERAGE(K17:K20), Sabit maliyet=SUM(L17:L20). Proje 2, Proje 1\'e kıyasla örnek veri girişinin tamamlandığı tek blok — şablon testini bu blok üzerinden yapılmış gibi görünüyor.',
  'pt-eksikler':
    'Öne çıkan eksikler: (1) Proje başlığı, yönetici ve şirket adı hâlâ placeholder. (2) Atanan sütununda tek doldurulmuş kayıt yok — sahiplik belirsiz. (3) Görev isimleri büyük çoğunlukla sadece "Görev" olarak bırakılmış. (4) Açıklamaların çoğu jenerik örnek metin: "Buraya görev ayrıntılarını girin". (5) Materyal alanları tamamen boş. (6) Proje 1\'de maliyet/saat verisi girilmemiş. Sonuç: Dosya tamamlanmış bir operasyon arşivinden çok uyarlanmayı bekleyen bir şablon. Güçlü yanı: görev, ilerleme, maliyet ve saat mantığını tek tabloda birleştirmesi. Zayıf yanı: gerçek operasyonel verilerin henüz büyük ölçüde eksik olması. Kullanıma alınacaksa önce proje adı, görev sahipleri, gerçek görev isimleri ve maliyet/saat verileri doldurulmalı.',
}

const roadmapSectionDetail: Record<string, string> = {
  'todo-roadmap-ozet':
    '12 aylık stratejik akış: M1–M2 MVP → M3 Launch → M4–M5 Growth → M6 PMF → M7–M9 Scale → M10–M11 Expansion → M12 Seed Ready. Başlangıç: 20 advisor, 50 kullanıcı. Bitiş hedefi: 500 advisor, 20K kullanıcı, $100K revenue. Roadmap aynı zamanda yatırımcı sunum iskeleti ve aylık odak özeti olarak kullanılabilir. Temel iş modeli: arz tarafı (advisor/business onboarding) + talep tarafı (içerik, SEO, dağıtım) + gelir tarafı (booking, ödeme, komisyon).',
  'todo-mvp-phase':
    'M1: Platform canlı (basic platform live), 20 advisor, 10 SEO içerik, 50 kullanıcı hedefi. M2: Booking sistemi kurulumu, 50 advisor, 30 içerik + outreach, ilk satışlar, 200 kullanıcı hedefi. Ürün backlog öncelikli görevler: GitHub repo setup, database schema (users/advisors/bookings), signup/login (email + Google), advisor profil oluşturma/düzenleme, advisor listing sayfası, filter/search, booking request sistemi, takvim müsaitliği, Stripe entegrasyonu, komisyon mantığı (% kesinti), email bildirimleri, admin paneli, CMS/blog sistemi, SEO yapısı.',
  'todo-launch-phase':
    'M3: Ödeme entegrasyonu tamamlanır, 70 advisor, SEO + LinkedIn dağıtımı, $1K revenue, 500 kullanıcı. Launch fazı ürün görevleri: onboarding flow iyileştirme, advisor onboarding form optimizasyonu, sayfa hızı optimizasyonu, Google Analytics kurulumu, event tracking (signup, booking), temel güvenlik kontrolleri, mobil optimizasyon, chat/destek sistemi, referral sistemi temeli, sunucu scaling hazırlığı. Tüm görevler High öncelikli.',
  'todo-growth-pmf':
    'M4 (Growth): User dashboard, 100 advisor, referral sistemi, $3K revenue, 1K kullanıcı. M5 (Growth): İyileştirmeler, 120 advisor, içerik ölçekleme, $5K revenue, 2K kullanıcı. M6 (PMF): Stabilizasyon, 150 advisor, organik büyüme, $10K revenue, retention odağı. GTM görevleri bu fazda: LinkedIn haftalık paylaşımı, WhatsApp grup paylaşımı, ilk 50 kullanıcı onboarding, pricing modeli belirleme, ilk ücretli booking testi, SEO içerik 30+ ölçekleme, referral sistemi aktivasyonu.',
  'todo-scale-expansion':
    'M7 (Scale): Yeni özellikler, 200 advisor, yeni şehir hazırlığı, $15K revenue, 3K kullanıcı. M8: Expansion, 250 advisor, şehir lansmanı, $25K revenue, 5K kullanıcı. M9: Optimizasyon, 300 advisor, partnerships, $40K revenue, 7K kullanıcı. M10 (Expansion): Perks katmanı, 350 advisor, B2B anlaşmalar, $60K revenue, 10K kullanıcı. M11: Otomasyon, 400 advisor, kanal ölçekleme, $80K revenue, 15K kullanıcı. GTM: yerel partnershipler başlatma, conversion optimizasyonu.',
}

const todoListSectionDetail: Record<string, string> = {
  'todo-product-backlog':
    'Toplam 25 ürün/teknik görev — hepsi "To Do" statüsünde. Kategoriler: Setup (GitHub repo, database schema), Auth (signup/login email+Google), Profiles (advisor + user profili), Listing (advisor listing sayfası), Search (filter/search), Booking (booking request + takvim müsaitliği), Payment (Stripe + komisyon mantığı), Notification (email), Admin (admin paneli), Content (CMS/blog), SEO (URL yapısı + meta), UX (onboarding flow, form optimizasyonu), Performance (sayfa hızı), Analytics (GA + event tracking), Security (güvenlik kontrolleri), Mobile (mobil optimizasyon), Support (chat/destek), Referral (temel referral sistemi), Scaling (sunucu hazırlığı). High öncelik: 15 görev. Medium öncelik: 10 görev.',
  'todo-gtm-backlog':
    'Toplam 19 GTM/operasyon görevi — hepsi "To Do" statüsünde. Supply (4 görev): 100 advisor listesi oluşturma, 100 advisor outreach (DM), ilk 20 advisor onboarding, 50 advisor\'a büyüme. Content (3 görev): 10 SEO makalesi yazma, blog yayınlama, community dağıtımı. Growth (3 görev): LinkedIn haftalık paylaşım, WhatsApp grup paylaşımı, ilk 50 kullanıcı onboarding. Revenue (2 görev): pricing modeli belirleme, ilk ücretli booking testi. Launch fazı: 100 advisor hedefi, SEO 30+ içerik, referral aktivasyon, yerel partnershipler, conversion optimizasyonu, feedback loop, customer support flow.',
  'todo-eksikler-oneri':
    'Mevcut durumda tüm 44 görevin statüsü "To Do"; gerçek ilerleme görünmüyor. Eksik alanlar: Owner (görev sahibi), Deadline (bitiş tarihi), Dependency (bağımlılık), Progress (ilerleme yüzdesi), Notes (açıklama). Ayrıca: Sayfa isimleri yeterince açıklayıcı değil (Sayfa2, Sayfa3, Sayfa4), Roadmap ile backlog arasında formal bağ kurulmamış, Sayfa4 tamamen boş. Önerilen sonraki versiyon yapısı: Roadmap | Product Backlog | GTM & Ops | Metrics | Owners & Deadlines. Öncelik dağılımı: High 34 görev, Medium 10 görev.',
  'todo-notion-gorev-tablosu':
    'Notion\'dan çekilen canlı görev tablosu — 9 kayıt. Sütunlar: Görev Tanımı | Durum | Owner | Tarih | Not | Drive Linki. Durum özeti: 1 Done (Proje Yönetimi Dosyası — 03/30/2026), 3 In progress (Cap Table 04/15/2026, Ambassador Mock 04/08/2026, Ekip Datası), 5 Not started (Dij. Paz. Planı, Lansman Planı, Gelir Modelleri Projeksiyonları, Bütçe Projeksiyon, MVP v2.0 dökümanları). Tüm owner\'lar Burak Akcakanat. Not: Gelir Modelleri Lovable dashboard\'ında başladı ama Excel\'e taşınması gerek. Cap Table Drive\'da v2 var, görüşülecek. Ambassador\'ın Drive\'da ilk taslağı mevcut.',
  'todo-notion-brainstorm':
    'Core team: Burak + Barış. Temel kararlar: 17 Mart\'a kadar MVP v2.0 dökümanları karşılıklı gönderilecek, 19\'unda Barış iki dökümanı + Lovable projesini birleştirip nihai döküman oluşturacak, 2-3 toplantı sonra MVP çıkarılabilir. Barış görevleri: startup 0-100 standartları araştır (tohum to exit, seat/preseat), onepager hazırla. Ürün fikirleri: WhatsApp bot (baya iyi), Ambassador/City Elçisi mantığı (blogger+influencer), JukeBox (işletmelerde ücretli istek şarkı/video — ayrı app), Haberler mantığı, Hospital booking. Brainstorm çıktıları: blog yazısı yarışmasıyla seyahat bloggerları topla, influencer/vlogger işbirliği ile traction, admin dashboard yapılanması başladı. Networking: Almanya\'da Sertaç Yay (Barış bağlantısı), Dubai Business Council (Burak — 1000-2000 işletme). Teknik iletişim: Huseyin Inan Çolak, Orhan Dijvar Ekinci. 12.03.26 ek kararlar: her türlü işletme eklenecek, mass migration düşünülecek, danışmana mikrosite+aitwin+chatbot önerilecek. Referans linkler: QS Networks, diasporanet-connect, tuerkischeaerzte.de, almanya101.de, relocate.me.',
}

const capTableSectionDetail: Record<string, string> = {
  'ct-sirket-hisse':
    'Şirket: CorteQS | Diaspora Yönetim Platformu (SaaS) | Kuruluş 2026. Toplam Yetkili Hisse: 1.000.000 Common Share. Kurucu Hisseleri (Issued & Outstanding): 850.000 Common Share (%85,0). ESOP Havuzu (Reserved, Unissued): 150.000 Opsiyon (%15,0). Fully Diluted Toplam: 1.000.000. Para birimi: USD. ✅ US/Delaware VC normlarına göre yapılandırılmıştır. ✅ ESOP havuzu pre-allocated değildir; grantlar işe alım ve board onayına tabidir. ✅ Tüm rakamlar fully diluted üzerinden hesaplanmıştır.',
  'ct-kurucu-dagilim':
    'Hissedar tablosu: (1) Burak Akçakanat — Co-Founder / CEO: 425.000 Common Share, %50,0 (basic), %42,5 (fully diluted). (2) Umut Barış Terzioğlu — Co-Founder / CTO: 425.000 Common Share, %50,0 (basic), %42,5 (fully diluted). Founders Toplam: 850.000 adet, %85 (fully diluted). ESOP Havuzu: 150.000 opsiyon, %15,0. Vesting: 48 ay, 12 ay cliff, aylık birikimli (1/48). Kurucular Common Stock tutar; gelecek yatırımcılara Preferred Stock çıkarılacak.',
  'ct-esop-strateji':
    'Planlanan ESOP grantları (bağlayıcı değil, board onayına tabi): COO %2,0–3,0 (36 ay/12 ay cliff). CMO %1,5–2,5 (36 ay/12 ay cliff). CFO/Finance Lead %1,0–1,5 (36 ay/6 ay cliff). Lead Engineer #1 %1,5–2,0 (36 ay/12 ay cliff). Lead Engineer #2 %0,5–1,0 (36 ay/12 ay cliff). Satış/BD Lideri %1,0–1,5 (36 ay/12 ay cliff). Advisor Havuzu %1,0–2,0 (24 ay/0 cliff, milestone-based). ⚠️ Grant miktarları tecrübe ve müzakereye göre değişir. Advisor grantları tipik olarak %0,25–0,5 aralığında, toplam %1–2 sınırını aşmaz.',
  'ct-ertelenen-ucret':
    'MVP öncesi ertelenen ücret planı (Seed Round kapanışında öncelikli ödeme): CEO Burak — piyasa $9.000/ay, ertelenen $9.000/ay. CTO Barış — piyasa $9.000/ay, ertelenen $9.000/ay. COO (TBD) — piyasa $7.000, ertelenen $5.000. CMO (TBD) — piyasa $6.000, ertelenen $4.000. CFO (TBD) — piyasa $3.000, ertelenen $2.000. Lead Engineer #1 — piyasa $8.000, ertelenen $6.000. Lead Engineer #2 — piyasa $7.000, ertelenen $5.000. Satış/BD — piyasa $5.000, ertelenen $3.500. ⚠️ Yatırım öncesi kısmi ödeme ancak nakit imkânı doğduğunda ve her iki kurucu board kararıyla yapılabilir.',
  'ct-founder-efor':
    'Her kurucu (Burak ve Barış) için 2026 yılı boyunca aylık çalışılan gün, aktiviteler (geliştirme, müşteri görüşmesi, yatırımcı toplantısı, ürün kararı) ve kümülatif ücret kayıtları tutulur. İmzalanmış sayfalar PDF olarak arşivlenir. Due diligence sürecinde yatırımcılara sunulur. Ocak–Aralık 2026 dönemi kapsanır. Her ay imza zorunludur.',
  'ct-vesting-cliff':
    'Vesting parametreleri: Kurucu — 48 ay, 12 ay cliff, aylık (1/48), Double Trigger acceleration. Kilit Çalışan — 36 ay, 12 ay cliff, aylık (1/36), Double Trigger. Advisor — 24 ay, 0–6 ay cliff, quarterly. Double Trigger Acceleration: (1) Change of Control (şirket satışı/birleşme/tasfiye) VE (2) Involuntary Termination (pozisyon kaybı/küçültme) — her ikisi eş zamanlı gerçekleşmeden acceleration devreye girmez. Good Leaver: vesting olan hisseler korunur. Bad Leaver: nominal bedelden geri alım. Single Trigger bu dokümanda yer almaz.',
  'ct-dilüsyon-senaryolar':
    'Tur bazlı dilüsyon senaryoları: Pre-Seed $150K — pre-money val $500K, post-money $650K, yeni hisse %23,1, founder post %65,2, ESOP post %11,5. Seed $750K — pre-money $2,5M, post-money $3,25M, yeni hisse %18,5, founder post %53,1, ESOP post %9,4 (institutional lead). Series A $3M — pre-money $10M, post-money $13M, yeni hisse %18,7, founder post %43,2, ESOP post %7,7 (board seat, preference stack başlar). ⚠️ Pre-money ESOP refresh kurucuları seyretir; bilinçli karar. Anti-dilüsyon: weighted-average broad-based önerilir, full-ratchet kabul edilmez. Liquidation Preference: Preferred Stock sahipleri tipik 1x non-participating.',
  'ct-yonetisim-kurallar':
    'Yönetişim kuralları: Bu doküman hukuki sözleşme değildir. Cap table\'da herhangi bir değişiklik (grant, transfer, iptal) her iki kurucunun yazılı onayına tabidir. Üçüncü taraf hisse devri veya yeni ortak alımı için board onayı ve her iki kurucu mutabakatı zorunludur. Hukuki danışman onayı olmadan değişiklikler geçersizdir. Güncelleme sıklığı: her 3 ayda bir veya önemli olay (işe alım, yatırım, ayrılma, grant) başına. Her ESOP granta ayrı Grant Agreement ve Vesting Schedule düzenlenir. GİZLİ — yetkisiz kopyalama ve dağıtım yasaktır.',
}

const kortexDocsSectionDetail: Record<string, string> = {
  'kortex-cto-handoff':
    'Tech Stack: Next.js + Tailwind (frontend), Supabase (backend), OAuth Google/Apple (auth), Vercel / Coolify (hosting). Mimari: Country → City → Category → Listing. Veritabanı modelleri: Users, Listings, Reviews, Events, Communities. Entegrasyonlar: Google Maps API, ileride harici veri kaynakları. Yapılacaklar: Auth sistemi, Listing CRUD, Claim sistemi, Arama & filtreler, AI arama katmanı. Açık kararlar: Storage çözümü, AI öneri motoru, analitik araçları, yedekleme stratejisi. Ölçeklenebilirlik: 100K+ kullanıcı için tasarlandı, modüler mimari. Güvenlik: Role-based access, moderasyon araçları, danışmanlar için KYC.',
  'kortex-pitch':
    "Vizyon: Türk diasporası için #1 global platform olmak. Problem: Yurt dışındaki milyonlarca Türk için hizmet, topluluk ve fırsatları birleştiren tek platform yok. Çözüm: Kortex = 'Diaspora Super App' — hizmet keşfi + insan bağlantısı + fırsat erişimi. Pazar: Global Türk diasporası 10M+. Gelir modeli: Üyelik, sponsored listing, reklam, premium hizmetler. Hedef traction: Yıl 1'de 100K kullanıcı, 2000 işletme. Rekabet avantajı: Doğrudan rakip yok, AI destekli arama, community + marketplace hibrit. Talep: Teknik geliştirme desteği + başlangıç büyüme fonu.",
  'kortex-prd':
    'Ürün: Dünya çapında Türk diasporasını birleştiren global platform. Sorun: Merkezi diaspora bilgisi eksik, yerel Türk hizmetlerine erişim zor, topluluklar parçalı. Çözüm: Listing (işletme, profesyonel) + Community + Events + AI arama. Core feature\'lar: Kullanıcı rolleri (bireysel, işletme, topluluk, moderatör), listing sistemi, claim sistemi, AI arama, harita entegrasyonu, yorum & puanlama. Başarı metrikleri: Kullanıcı büyümesi, retention rate, gelir. MVP kapsam: Almanya önce, temel listing + arama, basit moderasyon, Google/Apple auth. Gelecek: Mobil uygulama, gelişmiş AI öneriler, monetizasyon özellikleri.',
}

const notionKararlarSectionDetail: Record<string, string> = {
  'nk-ana-kararlar':
    'Ana kararlar: (1) 17 Marta kadar MVP v2.0 dokümanları karşılıklı gönderilecek. (2) 19\'unda Barış 2 dokümanı + Lovable projesini birleştirip nihai doküman oluşturacak. (3) 2-3 toplantı sonra MVP çıkartılabilir. (4) Barış: startup business 0-100 standartlarını incele (tohum → exit, seed, preseed); onepager hazırlanacak.',
  'nk-core-team':
    'Core Team: Burak Akçakanat (iş geliştirme, strateji, network) + Barış UBT (CTO, teknik liderlik). "Teknik kumanda sende" — Burak. Brainstorming için Notion çalışma alanı açıldı. Yönetim tasarımı mantığı: domain bazlı ownership, fonksiyon bazlı değil.',
  'nk-brainstorm-fikirler':
    'Öne çıkan fikirler: WhatsApp grubu influencerlar için ayrı kanal, VIT Jukebox/borsa, OdtuGather fikirlerinin entegrasyonu, WhatsApp bot fikri (güçlü), SEO için seyahat bloggerları blog yazısı yarışması ile toplanacak, Blogger/Influencer = City Ambassador modeli, Vlogger işbirliği ile traction, hospitality booking, Jukebox → ileride ayrı app.',
  'nk-yapilan-ozellikler':
    'Hayata geçirilenler: Ambassador mantığı çalışıldı (Drive dökümanı + Lovable mock). Haberler mantığı kondu. Hospital booking eklendi. Jukebox zaten vardı (ileride işletme müzik sistemleri entegre edilecek). Bireysel kullanıcı profilinden hizmet talebi açıldı. Admin dashboard yapılanmaya başladı. Şehir Elçileri mantığı çalışıldı.',
  'nk-12mart-kararlar':
    '12.03.26 toplantı kararları: İşletmeler her türlü eklenecek. Dubai Business Council üzerinden 1000-2000 işletme hedefi (Burak tanıyor). Mass migration veri tabanı değerlendirilecek (KVKK kontrolü). QS sitesini Barış inceleyecek. "Danışmana danışmanlık" ürünü: mikrosite + AI twin + chatbot. Teknik yük değerlendirilecek. Yeni isimler: Hüseyin İnan Çolak, Orhan Dijvar Ekinci (LinkedIn profilleri).',
  'nk-gelir-feature':
    'Gelir modelleri ve feature listesi: Bireysel danışman (claiming + olanaklar), kuruluşlar (konsolosluk, vakıf, dernek), bağış/aidat toplama, etkinlik yönetim arayüzü, TV/radyo (grey zone/GenZ açık), işletme (restoran/market indirim çeki), iş ilanları (işletme + genel pool), iş fırsatları ortaklık (yurt dışına açılma), WA grupları kategorizasyon, etkinlikler (filtreleme, featured sponsorluk, harita), Blogger/Vlogger, haberler, hoşgeldin paketi.',
  'nk-24mart-kararlar':
    '24.03.26: Roadmap = Fikir→İnovasyon → Teknoloji→MVP → Traction→Marketing → Tutundurma→UI/UX → Ölçekleme→Yatırım. Hoşgeldin paketine eklenenler: uçak bileti discount, araç kiralama, havaalanı transferi — teklif sistemi entegre. CorteQS WA Kanalı: kullanıcı hem kanala hem bota bağlı. Etkileşim havuzu sponsorluğu (OdtuGather/all2gather özelliği buraya aktarılacak). Uzun vade: event sponsor management platform olabilir.',
  'nk-domain-ownership':
    '6 Domain Ownership modeli: A) Supply — Head of BD (advisor, işletme, partner onboarding). B) Demand — Growth Lead (kullanıcı kazanımı, ambassador, community). C) Transaction — Revenue Lead (booking, ödeme, komisyon, revenue share). D) Product — PM (feature\'lar, dashboard, user flow). E) Platform Core — CTO (API, database, infra). F) Support & CRM — Customer Success (ticket, retention). KRİTİK PRENSİP: Her domain = 1 owner. Owner KPI\'lardan, backlog\'dan, büyümeden sorumlu; mikro yönetim yapmaz.',
  'nk-kpi-haritasi':
    'KPI haritası: Supply Owner → onboard edilen advisor #, aktif advisor %, partner sayısı, ilk işlem yapan advisor %. Demand Owner → WAU, yeni kullanıcı #, ambassador output, community engagement %. Revenue Owner → GMV, net revenue, take rate %, conversion rate %. Product Owner → feature adoption %, drop-off rate. Support Owner → response time, user satisfaction. Operasyon: haftalık 10\'ar dk owner update + KPI review; aylık ne çalıştı/ne çalışmadı retro.',
  'nk-audit-prompt':
    'Mimari audit için hazırlanan GPT prompt: "You are a senior product architect and startup CTO. Analyze CorteQS as a complete system: all user types, all features, missing features, revenue models, commission structures, subscription tiers, dashboard structures, backend requirements, UX issues, feature prioritization V1/V2/V3." Araç önerisi: Claude + Cursor + Lovable + Notion. Çıktı: product backlog (feature name, description, priority, dependencies, implementation). NOT: 2 Nisan toplantısında konuşuldu.',
  'nk-dokumanlar-linkler':
    'Drive ve linkler: Ana Google Drive klasörü (drive.google.com/drive/folders/1WAvBnJvh9E2jEt23aohe8P4UpbVBjVGi). İlk dokümentasyon taslağı (drive). BA MVP doc (Google Docs). Lovable inv link (lovable.dev/projects/05c49c32). Cap Table v1 + v2 (drive — çalışma devam ediyor). Şehir Elçileri mantık dökümanı (Google Docs). Ekip/Görev/Ücret/Hisse taslak dosyası (Google Sheets). Referans siteler: qualtronsinclair.com/qs-networks, diasporanet-connect.lovable.app, tuerkischeaerzte.de, relocate.me.',
}

const bawaChatSectionDetail: Record<string, string> = {
  'bawa-ilk-tanis':
    '25 Şubat 2026 — Burak Akçakanat, Qatar-Dubai merkezinden LinkedIn profili üzerinden ulaştı. CorteQS grubu davet linki paylaşıldı. Ertesi gün 10:30-11:30 (DE saati) Zoom görüşmesi planlandı. LinkedIn: linkedin.com/in/burakakcakanat.',
  'bawa-ilk-toplanti':
    '26 Şubat 2026 — İlk görüşme notları: payaltr.com (danışman platformu), qualtronsinclair.com/portfolio (hisseli gayrimenkul), diasporanet-connect.lovable.app (Burak\'ın ana projesi). Tartışılan kavramlar: WhatsApp network etkinlik enflasyonu, verimsizlik üzerine pain points, CORTEX-TURK ana hub fikrinin doğuşu. UBT onepager hazırlayacak kararı çıktı.',
  'bawa-marka-adi':
    '1 Mart 2026 — Burak "turqua-z.com" ismini önerdi, CorteQS\'e alternatif olarak. UBT: "50-60 kişiye oylatmak lazım, data karar versin." Prensip belirlendi: marka ismi veriyle seçilecek, sezgiyle değil. UBT de alternatif isimler getireceğini söyledi (TurkAtlas, TurkHub, TurkSphere, TurkConnect, TurkBase — ChatGPT önerileri de paylaşıldı).',
  'bawa-cto-insan':
    '7 Mart 2026 — UBT web sayfası için insan kaynağı sorusu sordu ("ücretsiz bulacağım"). Burak\'ın yanıtı: "CTO sensin." UBT\'ye teknik liderlik rolü böylece açıkça verildi. "Bunu ayağa kaldırırsak dünyayı ayağa kaldırırız" — ekip motivasyon çıtası.',
  'bawa-domain-marka':
    '8-10 Mart 2026 — qualtronsinclair.com/qs-networks paylaşıldı. CorteQS\'e devam, turqua-z.com\'u rakip olarak yapma planı. corteqs.net tartışması başladı. Notion daveti UBT tarafından atıldı, Burak kabul etti. Drive\'a "toplantı notları" klasörü açıldı. Renk zevkleri aynı olduğu keşfedildi.',
  'bawa-haftalik-zoom':
    '12 Mart 2026 — Burak haftalık Zoom serisi başlattı: her Perşembe 12:30 Qatar / 14:30 Almanya, 108 occurrence, Meeting ID: 850 3960 6831. Toplantılar düzenli hale getirildi; ertelemeler ve kaçırılan seanslar yazışmada işlendi (19 Mart, 26 Mart, 2 Nisan ertelendi).',
  'bawa-lovable-github':
    '16-20 Mart 2026 — UBT, ubterzioglu@gmail.com\'u Lovable workspace\'e admin olarak eklenmesini istedi (editör connector kabul etmiyordu). Burak çevirdi. UBT projeyi Lovable\'dan sıyırıp kendi sunucusuna (ortak arkadaşla alınan) koydu: github.com/ubterzioglu/corteqs. Strateji: Lovable = Burak\'ın sandbox, merge = UBT.',
  'bawa-seo-blog':
    '22 Mart 2026 — Burak\'ın SEO için blog yazısı önerisi. UBT: "İlk MVP\'de gerek yok, ama gönüllü yazan varsa köşe açarız." Burak Lovable\'da "Relocation Engine" özelliğini geliştirip paylaştı: ülke bazlı blog yazıları + muhatapları tek yerde. Danışman/yazar kullanıcı kategorisi ekleme fikri doğdu. Kural: önemli fikirler Notion\'a da yazılmalı.',
  'bawa-network-is':
    '22-27 Mart 2026 — Akın Özkan (Mercedes layoff, Almanca/İngilizce, yönetici profili) için iş yerleştirme talebi. Burak → Kemal Hakimoğlu (Wide & Wise, İtalya) referansı verdi: wideandwise.co. Kemal LinkedIn üzerinden Burak adıyla ulaşabilir. UBT: "Güveniyorum, kefilim."',
  'bawa-ai-twin':
    '28-30 Mart 2026 — Burak delphi.ai paylaştı: dijital ikiz platformu. RAG (Retrieval-Augmented Generation) üzerine UBT: "Belirlenen veri setiyle danışmanların twinini yapacağız." Burak: "İki sene sonra AI twini olmayan danışman kalmayacak, yarısını biz klonlayacağız." Mutabakat: RAG tabanlı twin sistemi CorteQS\'e muazzam değer katacak.',
  'bawa-cordocu':
    '2 Nisan 2026 — cordocu.vercel.app ilk kez paylaşıldı (şifre: baubt2026). Hedef: yeni katılan birinin mevzuyu hızlı anlayacağı, "neredeyiz / ne yaptık / sonuç neydi" sorularını tek dashboard\'dan yanıtlayan sistem. UBT: "Spagetti kod sadece kodda değil, artık business\'ta da oluyor." Burak çok memnun tepkisi verdi.',
  'bawa-ekip-genisletme':
    '2-3 Nisan 2026 — Tech lead adayı bir sonraki toplantıya muted observer olarak davet edildi (mesaj atamayacak, sadece izleyecek). Cap table modelleri gündeme geldi; nihai yapı kurulunca ekip taleplerine cevap verilecek. Prensip: "Gönül verecek 10 kişi, sonra para." Burak: "Projenin frekansına 2-3 dakikada girip senden önce heyecanlanırsa o insan katkı üretiyor."',
  'bawa-instagram-ambassador':
    '3-4 Nisan 2026 — Burak kendi Instagram hesabından danışman ve ambassador aday profilleri topluyor, UBT\'yi ortak Instagram collection\'a ekledi. Her ülkeden, her cinsten profil hedefi. Instagram push ne zaman başlayacağı sorusu açık kaldı. UBT: "Önemli olan kanalımız olsun."',
  'bawa-domain-satin':
    '4 Nisan 2026 — corteqs.com ispanyol endüstri firmasına ait çıktı. corteqs.ai pahalı bulundu. Karar: corteqs.net alındı (Doruk üzerinden, ~226 TL). Plan: UBT kendi sunucusuna bağlayacak; Burak\'ın Lovable = subdomain, CorDocu = subdomain. Access UBT\'ye verilecek.',
  'bawa-landing-fon':
    '4 Nisan 2026 — Burak\'ın landing page önerisi: tepede ülke kayıt sayaçları (kayıt geldikçe dönsün), başvuru için kategori listesi, Şehir Elçisi başvuru bölümü. Teaser video eklenmesi planlandı. Crowdfund açılışı için aynı sayfanın kullanılması fikri: "Bu bizim fon bulmamızı çok hızlandırır."',
}

const whatsappBotSectionDetail: Record<string, string> = {
  'wa-genel-cerceve':
    'WhatsApp gruplarında bir bot aracılığıyla reklam ve tanıtım yapmak, topluluk yönetimi ve doğrudan pazarlama için etkili bir yöntemdir.\n\n' +
    'Meta\'nın spam ve otomatik mesajlaşma konusundaki katı kuralları nedeniyle bu süreci stratejik ve teknik olarak doğru kurgulamak gerekir.\n\n' +
    'Temel ilke: botun grupta "değer" sunması ve reklamı bu değerin içine yerleştirmesi.\n\n' +
    'TODO:\n' +
    '- Reklam modelinin spam algısı yaratmadan nasıl işleyeceğini netleştir\n' +
    '- Teknik kurgu ile topluluk deneyimini birlikte düşün',
  'wa-teknik-altyapi':
    'İki temel yol — Resmi (WhatsApp Business API): Twilio, WATI, Interakt, MessageBird gibi Meta\'nın BSP\'leri üzerinden.\n\n' +
    'Avantajlar: ban riski yok, güvenilir, yeşil tik.\n\n' +
    'Dezavantajlar: ücretli, şablon mesaj onayı gerekiyor.\n\n' +
    'Gayriresmi (Web Otomasyon): whatsapp-web.js veya Baileys kütüphaneleri, WhatsApp Web\'i simüle eder.\n\n' +
    'Avantajlar: ücretsiz, esnek, onaysız her mesaj.\n\n' +
    'Dezavantajlar: yüksek ban riski, kalıcı numara kapatma riski, sadece küçük ve samimi gruplarda kullanılmalı.\n\n' +
    'TODO:\n' +
    '- Maliyet, esneklik ve ban riski arasında öncelik sıralamasını yap\n' +
    '- Kullanılacak sağlayıcı veya kütüphaneyi kısa listeye indir',
  'wa-tanitim-senaryolari':
    'Üç sağlıklı bot akışı:\n\n' +
    '(1) Tetikleyici Komutlar: bot kendi kendine mesaj atmaz; kullanıcı !kampanyalar veya !katalog yazdığında güncel teklifleri paylaşır.\n\n' +
    '(2) Zamanlanmış Cron Job: haftanın belirli gün/saatlerinde (örn. Cuma Fırsatları) tek bir özenli tanıtım mesajı.\n\n' +
    '(3) DM\'e Yönlendirme (en sağlıklısı): grupta kısa merak uyandırıcı tanıtım + "Detaylar için bana özelden FIRSAT yazın" — grubu spamden korur, müşteriyi birebir sohbete çeker.\n\n' +
    'TODO:\n' +
    '- Tetikleyici komutları belirle\n' +
    '- Zamanlı paylaşım kuralını yazılı hale getir\n' +
    '- DM yönlendirme mesaj şablonlarını hazırla',
  'wa-uygulama-adimlari':
    'Adım adım kurulum:\n\n' +
    '(1) Numara Tahsisi: bot için kişisel numaralardan ayrı, sadece bu işe özel bir telefon numarası (mümkünse sanal).\n\n' +
    '(2) Platform Kurulumu: bütçe ve risk analizine göre resmi API veya gayriresmi altyapı; Chatfuel ve ManyChat kod yazmadan WhatsApp API entegrasyonu sağlar.\n\n' +
    '(3) Gruba Ekleme: numarayı gruba ekle; sadece tanıtım yapacaksa Admin yetkisi ver; duyuru grubunda bot düzenli yayın yapabilir.\n\n' +
    '(4) Katalog Entegrasyonu: WhatsApp Business kataloğu yükle, bot tanıtımında doğrudan katalog linklerini paylaşsın.\n\n' +
    'TODO:\n' +
    '- Bot için ayrı numara edin\n' +
    '- Test ortamı hazırla\n' +
    '- Katalog link paylaşım akışını test et',
  'wa-kritik-noktalar':
    'Banlanmayı önlemek:\n\n' +
    '- Aynı mesajı saniyeler içinde defalarca gönderme\n' +
    '- Gayriresmi yol kullanılıyorsa mesaj atma hızına random delay ekle (insan gibi davransın)\n\n' +
    'Grup dinamiği:\n\n' +
    '- Salt reklam içeren gruplar hızla erir\n' +
    '- Botu "müşteri hizmetleri asistanı" olarak konumlandır — örn. !kargo komutuyla kargo sorgulama\n\n' +
    'TODO:\n' +
    '- Mesaj gönderim sıklığı ve limit kuralını iç politika olarak belirle\n' +
    '- Reklam dışı faydalı komutlar tasarla\n' +
    '- Grup üyelerinin botu neden kullanacağını netleştir',
  'wa-optin-model':
    'En sağlıklı model:\n\n' +
    '(1) Duyuru: bot haftada bir gruba "Yeni fırsatları görmek ve Token kazanmak ister misiniz? Bana özelden KAZAN yazın!" mesajı atar.\n\n' +
    '(2) Opt-in: kullanıcı KAZAN yazdığında bot bu kişiyi "Reklam Almak İsteyenler" listesine ekler.\n\n' +
    '(3) Hedefli Gönderim: tanıtımlar gruba değil yalnızca bu listeye DM olarak gider; gruptaki diğerleri hiçbir şey görmez.\n\n' +
    '(4) Opt-out: kullanıcı DUR yazarak abonelikten çıkabilir.\n\n' +
    'TODO:\n' +
    '- Opt-in duyuru metnini netleştir\n' +
    '- KAZAN/DUR komutlarını sistemde tanımla\n' +
    '- DM kampanya akışını tasarla\n' +
    '- Abonelik iptali mekanizmasını test et',
  'wa-community-model':
    'WhatsApp Topluluk (Community) yapısı:\n\n' +
    '- Ana grup sohbet ve genel konular için korunur\n' +
    '- Topluluk altına "Fırsatlar ve Ödüller" adında ikinci bir alt grup açılır\n' +
    '- Ana grupta yalnızca alt grup linki paylaşılır: "Reklamları görüp token kazanmak isteyenler bu alt gruba gelsin."\n' +
    '- Bot sadece bu alt gruba mesaj atar; ana gruba hiç dokunmaz\n\n' +
    'TODO:\n' +
    '- Mevcut grubu topluluk yapısına taşıma uygunluğunu değerlendir\n' +
    '- Alt grup kurgusu oluştur\n' +
    '- Yönlendirme metnini hazırla',
  'wa-token-sistemi':
    'Tıkla-Kazan altyapısı üç katmandan oluşur:\n\n' +
    '(1) Hesap Eşleştirme: kullanıcının WhatsApp numarası ile platformdaki wallet adresi eşleştirilir (telefon numarasıyla kayıtta otomatik sağlanır).\n\n' +
    '(2) Kişiye Özel Linkler: bot her kullanıcıya benzersiz link atar: siteniz.com/kampanya?user=905551234567&ref=kampanya_01.\n\n' +
    '(3) Webhook ile Token Aktarımı: kullanıcı linke tıkladığında backend linkteki ID\'yi okur → anında wallet\'a X Token aktarır → ekranda "Tebrikler, X Token kazandınız!" gösterilir.\n\n' +
    'Suistimal önleme:\n\n' +
    '- Tekrar tıklama limiti\n' +
    '- Sahte tıklama tespiti\n' +
    '- Maksimum günlük ödül kuralları\n\n' +
    'TODO:\n' +
    '- Numara-wallet eşleme mantığını tasarla\n' +
    '- Benzersiz link üretim yapısını kur\n' +
    '- Webhook endpoint geliştir\n' +
    '- Token API entegrasyonunu tanımla',
  'wa-ozet-todo':
    'Genel aksiyon listesi:\n\n' +
    'Teknik:\n' +
    '- Altyapıyı seç (resmi/gayriresmi)\n' +
    '- Bot numarasını ayır\n' +
    '- Yazılım kur\n\n' +
    'Topluluk:\n' +
    '- Grup içi ve DM akışlarını belirle\n' +
    '- Opt-in/opt-out yapısını kur\n' +
    '- Topluluk veya alt grup modelini değerlendir\n\n' +
    'Token:\n' +
    '- Wallet eşleme sistemini tasarla\n' +
    '- Kişiye özel link üretimini kur\n' +
    '- Tıklama takibi ve token ödül altyapısını geliştir\n\n' +
    'Güvenlik:\n' +
    '- Spam, ban ve kötüye kullanım risklerini azalt\n' +
    '- Random delay ve mesaj limit kurallarını belirle\n' +
    '- Veritabanı şeması ve API uçlarını tanımla',
}

const dijitalPazarlamaSectionDetail: Record<string, string> = {
  'dijital-genel':
    'Bu Excel dosyası, dijital pazarlama çalışmalarını iki ana başlık altında takip etmek için hazırlanmış bir çalışma şablonudur. İki ayrı sekme: İçerikler (içerik üretim ve yayın yönetimi) ve Kampanyalar1 (kampanya planlama ve durum izleme). Başlık yapıları ve durum seçenekleri tanımlı; ancak içeriklerin ve kampanyaların önemli kısmında açıklama, sorumlu kişi, tarih, dosya ve not alanları henüz boş. Dosya şu an dolu bir operasyon raporundan çok başlangıç şablonu niteliğinde.',
  'dijital-icerikler':
    'İçerikler sekmesi, e-posta, sosyal medya, TV ve blog gibi farklı içerik tiplerini tek tabloda izlemek için hazırlanmış. Takip alanları: İçerik adı, Tür, Ayrıntılar, Sahibi, Durum, Yayınlanma tarihi, Dosya, Notlar. Mevcut içerik türleri: E-posta, Sosyal medya, TV, Blog yayını, Tümü (filtre seçeneği). Çoğu satırda yalnızca tür ve durum bilgisi girilmiş; operasyonel detaylar henüz doldurulmamış.',
  'dijital-icerik-durumlari':
    'İçerik durum akışı beş aşamadan oluşuyor: Yeni → Devam Ediyor → İnceleniyor → Yayınlandı. Ek aşamalar: Askıya Alındı ve Duraklatıldı. Bu durum yapısı içerik yaşam döngüsünü (brief\'ten yayına kadar) ve olası kesintileri (askı/duraklama) tek akışta yönetmeye olanak tanıyor.',
  'dijital-kampanyalar':
    'Kampanyalar1 sekmesi, pazarlama kampanyalarını planlamak ve ilerleme durumlarını izlemek için hazırlanmış. Takip alanları: Kampanya adı, Tür (Tür 1 / Tür 2 / Tür 3), Sahibi, Durum, Başlangıç tarihi, Bitiş tarihi, Öğeler, Notlar. Şu an girilen tek somut kampanya fikri: "İlk 100 işletmeye/danışmana sosyal medya hesaplarında ücretsiz video." Geri kalan satırlar türler ve aşamalar gösterecek şekilde taslak bırakılmış.',
  'dijital-kampanya-durumlari':
    'Kampanya durum akışı beş aşamadan oluşuyor: Planlanıyor → Gelişiyor → İnceleniyor → Beklemede → Yayınlandı. Bu yapı, bir kampanyanın fikir aşamasından canlıya geçişine kadarki süreci takip etmeyi sağlıyor. Tür 1, Tür 2, Tür 3 etiketleri henüz içerikle tanımlanmamış; kampanya türlerinin belirlenmesi bir sonraki adım.',
  'dijital-eksikler':
    'Şablonun operasyonel hale gelmesi için doldurulması gereken öncelikli alanlar: (1) İçerik ve kampanya isimleri, (2) Sorumlu kişiler (sahibi kolonları), (3) Başlangıç ve yayın tarihleri, (4) İlgili dosyalar veya bağlantılar, (5) Notlar ve açıklamalar. Ek olarak: kampanya tür etiketlerinin (Tür 1/2/3) içerik stratejisine göre tanımlanması ve içerik türü "Tümü" filtresinin nasıl kullanılacağının netleştirilmesi gerekiyor.',
}

const toplantiSectionDetail: Record<string, string> = {
  'toplanti-1-ozet':
    "Burak Akc's Zoom Meeting — 26 Şubat. Amaç: Türk diasporası için küresel bir platform üzerinde olası işbirliğini keşfetmek. Her iki katılımcı da aynı temel sorunu tespit etti — diaspora verimsiz WhatsApp gruplarında dağınık. Önerilen çözüm: 'Cortex' adıyla bir global platform. Proje, Barış'ın yerel '101' girişimiyle ve Burak'ın global Cortex vizyonuyla örtüşüyor. Her iki taraf haftalık 1 saatlik Perşembe toplantısı taahhüdü verdi.",
  'toplanti-1-problem':
    "Türk diasporası sayısız WhatsApp grubunda parçalanmış. Temel acı noktaları: (1) Tekrarlayan sorular — 'Hangi doktor?' gibi aynı sorular sürekli soruluyor. (2) Etkisiz networking — fiziksel etkinlikler düşük kaliteli bağlantılar üretiyor. (3) Güvenilir uzman eksikliği — dolandırıcılığa açık kapı bırakıyor. Örnek: ABD merkezli bir dolandırıcı, mülk üzerine %12 yıllık getiri vaadiyle ~100 kişiden kişi başı $150K alıp 3 ay ödeme yaptıktan sonra ortadan kayboldu. Temel neden: kısa vadeli kazanımları uzun vadeli işbirliğinin önünde tutan 'hayatta kalma toplumu' zihniyeti.",
  'toplanti-1-cozum':
    "Önerilen çözüm: diaspora kaynaklarını merkezileştiren 'Cortex' global platformu. Temel özellikler: (1) Doğrulanmış Uzman Pazaryeri — vetted uzman profilleri, CTA ve iletişim bilgileri. (2) AI Araçları — AI Twins: ücretli talep üzerine danışmanlık (örn. 20 dakika €50); uzmanlar için AI içerik üretimi. (3) Merkezi Etkinlik Yönetimi — biletleme ve kayıt dahil diaspora etkinlikleri hub'ı. (4) Topluluk Entegrasyonu — WhatsApp ve Telegram gruplarından bilgileri platforma çeken botlar.",
  'toplanti-1-strateji':
    "Barış'ın '101' Girişimi: Almanya'da yerel platform versiyonu, şu an Cağaloğlu mezunları için bir WhatsApp Community. Burak'ın 'Cortex' Vizyonu: Payal gayrimenkul sitesindeki 'Danışmanlar' bölümüyle konsept kanıtı. Ortaklık modeli: global-lokal yapı — Barış Almanya pazarını liderliyor. Zaman çizelgesi: uzun vadeli 'maraton' proje, 6–8 aylık MVP hedefi.",
  'toplanti-1-adimlar':
    "Burak: haftalık 1 saatlik Perşembe toplantısı planla. Barış: platform konseptinin tek sayfalık özetini oluştur; Alman politikacı ağına sahip ortağı Fuat ile projeyi görüş. Her ikisi: haftalık toplantıyla momentum ve hesap verebilirliği koruyacak.",
  'toplanti-2-ozet':
    "Burak Akc's Zoom Meeting — 12 Mart. Amaç: Cortex projesinin kapsamını, özelliklerini ve ilk geliştirme planını tanımlamak. 'Cortex' ismi evrensel marka çekiciliğiyle kesinleşti. AI destekli yöntemle 17 Mart'a kadar iki bağımsız MVP belgesi oluşturulacak; birleştirme 19 Mart'ta yapılacak. Platform danışmanları, kuruluşları ve işletmeleri bağlayacak. Gelir: premium abonelikler ve kupon gelir paylaşımı.",
  'toplanti-2-vizyon':
    "İsim: 'Cortex', yatırımcı çekiciliği ve diğer diaspora topluluklarına (Hintli, Filipinli vb.) genişleme için 'Turkish Atlas'a tercih edildi. Ana şirket: Cortex, startup portföyü ve ağ sahibi büyüme ortağı Qualtron Sinclair (QS) bünyesinde faaliyet gösterecek. Bu bağlantı anında güvenilirlik ve mezun/iş grubu ağına erişim sağlıyor.",
  'toplanti-2-gelistirme':
    "AI Destekli Dokümantasyon: AI'ya 50+ soru sorularak backend, veritabanı ve auth dahil kapsamlı MVP belgesi oluşturulacak. UI/UX: genel AI estetiğinden kaçınmak için organik stil, insan unsurları ve Türk motifleriyle özgün ve otantik bir his yaratılacak.",
  'toplanti-2-ozellikler':
    "Danışmanlar: profesyonel profil sayfası, 7/24 AI Twin chatbot, ücretli etkinlik yönetimi. Kuruluşlar: dernekler, STK'lar, okullar, konsolosluklar — üyelik yönetimi ve bağış işleme. İşletmeler: dizin, premium iş ilanı portalı, kupon satışı (Cortex gelir payı), franchise ilanları. WhatsApp/Telegram grupları: merkezi keşif; bot ile onaylı gruplara sponsorlu içerik; uygulama cüzdanına reklam geliri payı. Etkinlikler: tüm diaspora takvimi + 'Öne Çıkan Etkinlik' seçeneği. Harita: işletme/kuruluş konumları + vurgulu pin ödemesi.",
  'toplanti-2-buyume':
    "İlk kullanıcı edinimi: Dubai Türk İş Konseyi (2000+ işletme) gibi mevcut diaspora iş konseylerinde toplu onboarding; diaspora influencer ortaklıkları. Kullanıcı etkileşimi: kupon ve WhatsApp gelir paylaşımı modeli kayıt teşviki olarak; ODTÜ mezunları atlası Ottogether büyüme modeli referans.",
  'toplanti-2-adimlar':
    "Burak: AI destekli '50 soru' yöntemiyle Cortex için bağımsız MVP belgesi oluştur; pre-seed'den çıkışa standart startup iş modellerini araştır. Barış: mevcut MVP belgesini geliştir; iki MVP belgesi ile Lavable projesini 19 Mart'a kadar birleştir. Her ikisi: 17 Mart'a kadar belgeleri takas et; 19 Mart saat 13:00'te birleşik planı incele.",
  'toplanti-3-ozet':
    "Burak Akc's Zoom Meeting — 9 Nisan 2026. Amaç: Cortex projesinin mevcut durumunu hizalamak, dokümantasyon dağınıklığını çözmek ve büyüme/ekip planını netleştirmek. Ana karar: Umut'un geliştirdiği D.Cortex dashboard tek doğruluk kaynağı olacak. Toplantıda ayrıca City Partner influencer modeli, manuel gerilla pazarlama, SEO/backlink stratejisi, yeni işe alımlar için SOP ve uzun vadeli AI Twin vizyonu ele alındı.",
  'toplanti-3-dashboard':
    'Mevcut problem "teknoloji spagettisi" olarak tanımlandı: bilgi parçaları WhatsApp, Notion ve Drive arasında dağılmış durumda. Çözüm olarak Umut, tüm proje notlarını, kişi ve ilişki bilgisini, MVP planlarını ve kilit dokümanları birleştiren merkezi "D.Cortex" dashboard\'unu geliştiriyor. Bu yapı hem yeni katılan birinin projeyi hızlı kavramasını sağlayacak hem de operasyonel hafızayı tek yerde tutacak. Teknik versiyonlama kararı da net: Burak ana Lovable proje dosyasına tüm vizyonu eklemeye devam edecek; Umut ise backend ve versiyonlama tarafında MVP dışı özellikleri gizleyerek temiz bir ürün akışı yönetecek.',
  'toplanti-3-icerik':
    'İçerik ve büyüme tarafında küçük ölçekli influencerlar ile "City Partner" modeli üzerinde hizalanıldı. Mantık basit: Cortex daha yüksek trafik ve görünürlük sağlayan ortak platform olacak; karşılığında partnerler içerik, yerel bilgi ve güvenilir dağıtım katkısı sunacak. Kaynak kanallar olarak diaspora WhatsApp grupları, küçük YouTube kanalları, Instagram ve TikTok öne çıktı. Uzun vadeli ürün fikri olarak bu içerik havuzunun indekslenip gerçek kullanıcı deneyimlerinden beslenen otomatik seyahat planı / şehir rehberi üreticisine dönüşmesi konuşuldu.',
  'toplanti-3-pazarlama':
    'Büyüme için kısa vadeli taktik "gerilla pazarlama" olarak tanımlandı: diaspora temalı viral videoların yorum alanlarında ilgili kullanıcılara manuel şekilde Cortex linkleri bırakılacak. Amaç, zaten niyet göstermiş sıcak kitleyi yakalamak. Bu operasyonun ileride diaspora içinden gönüllü veya stajyer bir ekiple ölçeklenmesi planlanıyor. SEO tarafında Cortex.net\'in bu hafta Google Console\'a eklenmesi, Burak\'ın sahip olduğu 11+ domain üzerinden backlink verilmesi ve Almanya 101 projesinde hızlı büyüme deneyimi olan bir SEO uzmanından görüş alınması kararlaştırıldı.',
  'toplanti-3-ekip':
    'Ekip ve operasyon tarafında öne çıkan konu, pazarlama liderliği için Seren Uzluer\'e yapılan teklif oldu. 15+ yıllık yaratıcı deneyime sahip Seren\'in tam zamanlı ve hisse bazlı bir rolle sosyal medya, marka ve lansman öncesi koordinasyonu üstlenmesi hedefleniyor. Yeni ekip üyeleri için Burak tarafından hazırlanan SOP dokümanı; hisse, ertelenmiş ücret ve genel çalışma modelini net anlatan temel onboarding materyali olarak konumlandı. Ayrıca ekip araçlarının ve abonelik maliyetlerinin kontrolü için bir tool matrix hazırlanması planlandı. Uzun vadeli vizyon olarak kurucu iletişimi, dokümantasyon ve karar süreçlerini otomatikleştirecek bir "AI Twin" sistemi de paralel bir inisiyatif olarak gündemde.',
  'toplanti-3-adimlar':
    'Sonraki adımlar netleştirildi. Umut: D.Cortex dashboard\'unu 12 Nisan\'a kadar tamamlayıp linki paylaşacak; Cortex.net\'i Google Console\'a ekleyecek; araç ve abonelikleri merkezileştiren tool matrix\'i oluşturacak; yeni ekip üyeleri için SOP dokümanını gözden geçirecek; uygun sosyal medya gönderilerinde manuel gerilla pazarlamayı başlatacak. Burak: ana Lovable proje dosyasına tüm özellikleri eklemeye devam edecek; mevcut domainlerinden Cortex\'e backlink verecek; Seren Uzluer ile pazarlama liderliği teklifinin takibini yapacak.',
  'toplanti-excel-kayitlari':
    'Toplantı notlarının ham Excel kaydı. Dosya: Toplantı Kayıtları.xlsx — projenin docu/ klasöründe mevcut. Bu Excel, yapılandırılmış toplantı notlarının (toplanti1.md ve toplanti2.md) ham kaynağıdır. İçerik: T1 ve T2 toplantılarına ait orijinal notlar, karar maddeler ve eylem öğeleri. İndirmek için: docu/Toplant%C4%B1%20Kay%C4%B1tlar%C4%B1.xlsx',
}

const ekipSectionDetail: Record<string, string> = {
  'ekip-genel-yapi':
    'Çalışma dosyası erken aşama bir ekibin tüm kompanzasyon ve kadro planını tek alanda tutuyor. Toplam tanımlı rol: 16. Kurucu rolü: 2 (Kurucu/Business → Burak Akcakanat, Kurucu/CTO → U. Barış Terzioğlu). 1. ekipte işaretlenmiş rol: 6 (CFO, Product Manager, Front End, Back End, Mobile Developer, Test Engineer). 2. ekipte şu an yalnızca Data Analyst. Başvuranı yazılı rol: 2 kurucu dışında henüz yok. Standart vesting varsayımı: 4 yıl vest / 1 yıl cliff. EKİP sayfasındaki mevcut toplamlar: Ücret = 0, Hisse = 0 (hücreler dolduulmadığından formül 0 gösteriyor).',
  'ekip-ekip-sayfasi':
    'EKİP sayfası bir işe alım ve ekip planlama tablosudur. Takip edilen sütunlar: Başvuran, Aşama, Kurucu/Rol, Hangi Ekip, CV, Görüşmeyi Yapan, Puan, Ücret, Hisse, Notlar. Dikkat çeken durumlar: CFO için "Karar bekleniyor", Product Manager için "İşe alım yok" notu. Tablo şu an büyük ölçüde boş; rollerin çoğunda başvuran, ücret ve hisse bilgisi henüz yok. Son satırda ücret ve hisse toplamı için formül var ancak bağlı hücreler boş olduğundan toplamlar 0 görünüyor.',
  'ekip-hisse-dagilimi':
    'Hisse aralıkları kesinleşmemiş; dosya bunu açıkça vurguluyor. Ürün/mühendislik çekirdeği: Product Manager %1.0–2.5, Back End %1.0–2.0, Mobile Developer %0.75–1.5, Front End %0.5–1.25, DevOps/Server %0.5–1.0, Test Engineer %0.2–0.5. Büyüme ve operasyon: Data Analyst %0.3–0.7, Partnership Manager %0.4–0.8, Community/Social Media %0.1–0.3, Content Üreticisi %0.1–0.2, Event Coordinator %0.1–0.25. Danışman/Yatırımcı: genellikle maaşsız, %0.25–1.0 ESOP opsiyonu. Teknik ve kritik rollere daha yüksek, operasyonel ve dönemsel rollere daha sınırlı hisse aralıkları atanmış.',
  'ekip-ucret-bantlari':
    'Almanya (EUR, yıllık): Product Manager 75K–110K, Back End 70K–95K, Mobile Developer 70K–90K, Front End 65K–85K, DevOps/Server 80K–115K, Test Engineer 55K–75K, Data Analyst 60K–85K, Partnership Manager 55K–80K+Prim, Community Manager 45K–65K, Content Üreticisi 40K–60K, Event Coordinator 45K–65K. Londra (GBP) rakamları yakın aralıkta, Dubai (AED) rakamları ise yaklaşık 4–5 kat daha yüksek bandda; bu döviz paritesi farklılığından kaynaklanmakta.',
  'ekip-butce-toplami':
    'Tüm rol bazlı alt ve üst sınırların toplanmasıyla ulaşılan toplam ekip maaş bütçeleri — Almanya (Berlin/Münih): 660.000–925.000 EUR. Londra: 605.000–935.000 GBP. Dubai: 2.550.000–4.110.000 AED. Bu toplamlar tam kadro senaryosunu yansıtıyor; aşamalı işe alım planında fiili bütçe bu rakamların çok altında kalacak.',
  'ekip-gorev-tanimlari':
    'GÖRVE TANIMLARI sayfası (muhtemelen GÖREV TANIMLARI olarak düzeltilmeli) yapı olarak hazır: POZİSYON kolonu EKİP sayfasındaki rol isimlerini formülle çekiyor, GÖREV TANIMI kolonu henüz doldurulmamış. 16 pozisyonun tamamı görünüyor — Kurucu/Business\'tan Advisor/Investment_VC\'ye kadar — ancak her satırda görev tanımı alanı boş. Bu alan öncelikli doldurmayı bekliyor.',
  'ekip-eksikler':
    'Ana eksikler: (1) Ücret ve hisse kolonlarının büyük bölümü boş — toplam satırı karar destek verecek seviyede değil. (2) CV, görüşmeci, puan, notlar kolonları neredeyse tamamen boş. (3) GÖRVE TANIMLARI sayfası henüz doldurulmamış. (4) Yazım/adlandırma tutarsızlıkları: "GÖRVE TANIMLARI" → "GÖREV TANIMLARI", "Mobile Dveloper" → "Mobile Developer", "KESiNLEŞEN" başlığında büyük/küçük harf karışıklığı. (5) EKİP sayfasında ileride doldurulmak üzere açık bırakılmış boş satırlar.',
  'ekip-sonuc':
    'Bu dosya bir kesin karar belgesi değil; daha çok planlama + taslak organizasyon + kompanzasyon çerçevesi niteliğinde. Bir arada tuttuğu dört şey: (1) Kimleri ekibe almak istediğiniz, (2) Bu kişilerin hangi ekipte konumlanacağı, (3) Yaklaşık maaş ve hisse çerçevesi, (4) İleride yazılacak görev tanımları. Dosyayı bir sonraki seviyeye taşımak için öncelik sırası: ücret/hisse kolonlarını doldurmak → görev tanımlarını yazmak → yazım tutarsızlıklarını düzeltmek.',
}

const ambassadorSectionDetail: Record<string, string> = {
  'ambassador-profil':
    'İdeal Marka Elçisi profili:\n' +
    '- Hiperaktif ve yüksek dışa dönüklük energy\'siyle hareket eder\n' +
    '- Çalışkanlık ve sorumluluk duygusuyla sahada olur\n' +
    '- İleri derecede çözüm odaklıdır, iyi eğitimli ve açık zihinlidir\n' +
    '- "Hep öğrenci" mindset\'iyle sıfır ego taşır — statü değil, etki peşindedir',
  'ambassador-amac':
    'Ambassador özelliği, CorteQS platformunda şehir bazlı büyüme ve kullanıcı kazanımı için tasarlanmıştır.\n\n' +
    'Her şehir için bir veya birden fazla Marka Elçisi seçilir.\n\n' +
    'Görevleri:\n' +
    '- Yerel toplulukları yönetmek\n' +
    '- Danışman ve işletme onboarding süreçlerini yürütmek\n' +
    '- Platform kullanımını artırmak\n' +
    '- Yerel fırsatları kullanıcılarla buluşturmak\n\n' +
    'Hedef: şehir bazlı bir "growth engine" oluşturmak, kullanıcıları doğrudan şehir ağına entegre etmek ve platformun ağ etkisini güçlendirmek.',
  'ambassador-gorevler':
    'Birincil görevler:\n' +
    '- Kullanıcı ve danışman onboarding süreçlerini yönetmek\n' +
    '- WhatsApp, Telegram, LinkedIn ve Instagram üzerinden topluluk aktivitelerini yürütmek\n\n' +
    'Operasyonel:\n' +
    '- Aylık etkinlikler organize etmek\n' +
    '- Yeni kullanıcıları aktif hale getirmek\n' +
    '- İşletmelerle işbirliği fırsatlarını tanıtmak\n' +
    '- Kullanıcı geri bildirimlerini toplamak\n\n' +
    'Performans takibi:\n' +
    '- Kayıt sayısı, etkinlik katılımı, işlem hacmi\n\n' +
    'Sistem: performansa dayalı ödül / teşvik modeli.',
  'ambassador-platform':
    'Kullanıcılar şehir sayfasında Ambassador\'ı görebilir; "Connect with City Lead" gibi CTA\'lar ile doğrudan iletişime geçebilir.\n\n' +
    'Ambassador araçları:\n' +
    '- Özel dashboard ve raporlama ekranları\n\n' +
    'Platform üzerinden yapılan işlemler:\n' +
    '- Kullanıcı onboarding\n' +
    '- Danışman ekleme\n' +
    '- Etkinlik oluşturma\n' +
    '- Topluluk yönetimi\n\n' +
    'Sistem şeffaf ve takip edilebilir yapıda tutulur.',
  'ambassador-sosyal-medya':
    'Ambassador\'lar şehirlerindeki etkinlikleri ve haberleri derler, kendi Corteqs profillerinde yayınlar ve sosyal medyada paylaşarak platform linklerini büyütür.\n\n' +
    'Bu içerik üretim akışı hem organik erişimi artırır hem de Ambassador\'ın şehir içindeki otorite statüsünü güçlendirir.',
  'ambassador-gelir':
    'Ambassador kuponu ile gelir paylaşımı: ücretli etkinlikler ve onboarding süreçleri kapsama girer.\n\n' +
    'Örnek model — Yıllık subscription:\n' +
    '- İlk yıl %25\n' +
    '- Sonraki yıllarda %10 (kupon kullanımı ile)\n\n' +
    'Event gelirleri: biletlerden %15.\n\n' +
    'Not: yüzdeler şehir, yoğunluk ve gelir simülasyonuna göre yeniden kalibre edilecek.',
  'ambassador-operasyon':
    'Ambassador yönetimi Corteqs altında bir WhatsApp grubu ile yürütülür; sisteme bot entegre edilerek platform iletişimi otomatize edilir.\n\n' +
    'Her 3 ayda bir düzenli etkinlikler düzenlenir:\n' +
    '- Piknik\n' +
    '- Rakı Balık\n' +
    '- Kabap\n' +
    '- 29 Ekim\n' +
    '- 10 Kasım\n' +
    '- 19 Mayıs\n' +
    '- Yılbaşı Partisi\n' +
    '- Spor etkinlikleri ve turnuvalar.',
  'ambassador-tematik':
    'Corteqs kategorilerine göre özel tematik gece:\n' +
    '- Vize Danışmanları Gecesi\n' +
    '- Gayrimenkul Danışmanları Gecesi\n' +
    '- Doktorlar Gecesi\n' +
    '- Dernekler/Vakıflar Gecesi\n\n' +
    'Ek formatlar:\n' +
    '- Speed Consulting (online/offline)\n' +
    '- Founder–Startup–Yatırımcı buluşmaları\n\n' +
    'Tüm etkinlikler platformda ilan edilir ve sponsor bulunur.',
  'ambassador-partnerlik':
    'Uluslararası zincir co-working alanları ile co-brand yapısı kurulabilir; üyelere özel indirim sağlanır.\n\n' +
    'Alternatif olarak yerel anlaşmalar hayata geçirilir.\n\n' +
    'Bu model Ambassador\'ın şehirdeki fiziksel varlığını ve profesyonel ağını pekiştirir.',
  'ambassador-organizasyon':
    'Ambassador\'lar Marketing departmanına bağlıdır.\n\n' +
    'Her Ambassador için bir POC (Point of Contact) atanır.\n\n' +
    'POC\'un görevi:\n' +
    '- Ambassador\'ın etkisini maksimize etmek\n' +
    '- Veri akışını sağlamak\n' +
    '- Kopmalar olduğunda sürekliliği korumak.',
  'ambassador-scorecard':
    'Seçim değerlendirmesi 1–5 arası puanlama ile yapılır.\n\n' +
    'Kriter ağırlıkları:\n' +
    '- Network strength %30\n' +
    '- Execution ability %25\n' +
    '- Responsiveness %15\n' +
    '- Reputation/trust %15\n' +
    '- Motivation %15\n\n' +
    'Bu scorecard hem ilk seçimde hem de dönemsel performans değerlendirmelerinde kullanılır.',
  'ambassador-growth':
    'Advisor Growth:\n' +
    '- 100 advisor listesi oluştur\n' +
    '- 100\'üne ulaş\n' +
    '- İlk 20\'yi onboard et\n' +
    '- 50\'ye genişlet\n\n' +
    'Content & SEO:\n' +
    '- 10 SEO makalesi yaz\n' +
    '- Blog yayınla\n' +
    '- Topluluklarda dağıt\n\n' +
    'Community & Activation:\n' +
    '- LinkedIn haftalık paylaşım\n' +
    '- WhatsApp grup paylaşımı\n' +
    '- 50 erken kullanıcı onboarding\n\n' +
    'Monetization:\n' +
    '- Fiyatlandırma modelini tanımla\n' +
    '- İlk ücretli rezervasyonu test et\n\n' +
    'Scale:\n' +
    '- 100 advisor\n' +
    '- 30+ SEO içerik\n' +
    '- Referral sistemi\n' +
    '- Yerel partnerlikler\n' +
    '- Kullanıcı feedback döngüsü.',
  'ambassador-legal':
    'Şirket kur → ülke ve yapı seç (Estonya, Almanya, İngiltere seçenekleri)\n' +
    '→ İş bankası hesabı aç\n' +
    '→ Stripe / ödeme altyapısını kur\n' +
    '→ Terms & conditions + privacy policy hazırla\n' +
    '→ Temel muhasebe kurulumu\n' +
    '→ Faturalama sistemi\n' +
    '→ Vergi yapısı planlaması.',
  'ambassador-product':
    'Advisor onboarding checklist\'i oluştur\n' +
    '→ Kullanıcı onboarding checklist\'i oluştur\n' +
    '→ Hizmet kategorilerini tanımla (vize, vergi, konut vb.)\n' +
    '→ Advisor pitch script hazırla\n' +
    '→ Outreach DM şablonları yaz\n' +
    '→ Landing page copy oluştur\n' +
    '→ Temel kullanıcı yolculuğunu tanımla (signup → booking).',
  'ambassador-acquisition':
    '20 kilit diaspora topluluğunu tespit et\n' +
    '→ WhatsApp / LinkedIn dağıtım listesi oluştur\n' +
    '→ 10 viral içerik hook\'u yaz\n' +
    '→ 3 farklı edinim kanalı test et.',
  'ambassador-pricing':
    'Komisyon yapısını tanımla\n' +
    '→ Danışman tarafında fiyat duyarlılığını test et\n' +
    '→ Kullanıcı tarafında fiyat duyarlılığını test et\n\n' +
    'Veriye dayalı kalibrasyonlar şehir bazlı gelir simülasyonlarıyla desteklenecek.',
  'ambassador-partnerships':
    '10 potansiyel partneri tespit et (banka, telco, havayolu)\n' +
    '→ Partnership pitch hazırla\n' +
    '→ 10 partnere ulaş.',
  'ambassador-branding':
    'Temel marka varlıklarını oluştur (logo, kimlik)\n' +
    '→ Sosyal medya hesaplarını kur\n' +
    '→ Domain ve kurumsal e-posta altyapısını kur.',
  'ambassador-poc':
    'Süreçte bir POC Twin eğitilecek.\n\n' +
    'Veri kaynakları:\n' +
    '- Tüm şehirlerden gelen veriler\n' +
    '- Etkinlik verileri\n' +
    '- WhatsApp bot verileri\n' +
    '- Best practice\'ler\n\n' +
    'Beslenme kaynakları:\n' +
    '- POC mesajları\n' +
    '- Toplantılar\n' +
    '- Görüşmeler\n\n' +
    'Amaç: POC ayrıldığında Twin sistemi Ambassador topluluğunu otomatik şekilde yönetir ve bilgi kaybını sıfırlar.',
}

const mvpSectionDetail: Record<string, string> = {
  'mvp-tum-icerik':
    '🚀 TÜRK DİASPORA PLATFORMU (KORTEX / CORTEQS) – MERGED MVP\n\n' +
    '🎯 Vizyon & Amaç\n' +
    '- Diasporanın dağınık ihtiyaçlarını tek platformda toplamak\n' +
    '- Global Türk rehberi + networking merkezi oluşturmak\n' +
    '- "Diaspora için İsviçre çakısı" yaklaşımı\n' +
    '- Tek merkezden bilgi, hizmet ve bağlantı sağlamak\n\n' +
    '🌍 Hedef Kitle & Kapsam\n' +
    '- Yurtdışında yaşayan tüm Türkler\n' +
    '- Yeni göç edenler, öğrenciler, profesyoneller\n' +
    '- İşletme sahipleri, danışmanlar, topluluk yöneticileri\n' +
    '- Başlangıç ülkeleri: Almanya, UK, UAE, AU, FR, US, CA\n\n' +
    '🧩 Temel Problemler\n' +
    '- Yerel bilgi eksikliği (doktor, avukat, market vs.)\n' +
    '- Topluluklara erişim zorluğu\n' +
    '- Networking ve iş fırsatlarının görünmemesi\n' +
    '- Diaspora verisinin dağınık olması\n\n' +
    '👥 Kullanıcı Rolleri\n' +
    '- Bireysel kullanıcı (görüntüleme, yorum, içerik ekleme)\n' +
    '- İşletme sahibi (listing yönetimi, claim)\n' +
    '- Topluluk yöneticisi (grup & etkinlik ekleme)\n' +
    '- Danışman (KYC ile doğrulama)\n' +
    '- Moderatör (onay, spam kontrolü)\n\n' +
    '🔐 Auth & Profil Sistemi\n' +
    '- Google / Apple login veya auth flow\n' +
    '- Kullanıcı tipine göre profil zenginliği\n' +
    '- KYC ile doğrulama\n' +
    '- Claim sistemi ile işletme sahiplenme\n\n' +
    '🏗️ Platform Yapısı (Data Model)\n' +
    '- Country → City → Category → Listing\n' +
    '- Çok katmanlı kategori sistemi\n' +
    '- Geniş listing veri modeli (iletişim, lokasyon, medya vb.)\n\n' +
    '🗂️ Kategori Yapısı\n' +
    '- Sağlık (doktor, dişçi vs.)\n' +
    '- Hukuk & danışmanlık\n' +
    '- Günlük yaşam (market, kuaför vb.)\n' +
    '- Yeme-içme\n' +
    '- Eğitim\n' +
    '- Hizmetler\n' +
    '- İş & kariyer\n' +
    '- Topluluklar (WA, Telegram, Discord)\n' +
    '- Etkinlikler\n\n' +
    '🔍 Arama & AI\n' +
    '- Kategori bazlı arama (user, job, kupon, gruplar)\n' +
    "- AI destekli doğal dil arama (\"Berlin'de Türk dişçi\")\n" +
    '- Sıralama: ülke, şehir, kategori, featured, sponsored\n' +
    "- Veri kaynakları: platform + AI twin + API'ler\n\n" +
    '🗺️ Harita & Lokasyon\n' +
    '- Google Maps entegrasyonu\n' +
    '- Harita üzerinden keşif\n' +
    '- Listing bazlı konum gösterimi\n\n' +
    '📊 İçerik & Veri Yönetimi\n' +
    '- Manuel + toplu veri girişi\n' +
    '- API entegrasyonları (Google Maps, gov.tr)\n' +
    '- Veri güncelleme planı (henüz net değil)\n' +
    '- Çok dilli destek (TR, EN, DE)\n\n' +
    '📱 UI/UX\n' +
    '- Mobil-first tasarım\n' +
    '- 19–24 ekran planı\n' +
    '- Pastel tonlar + Türk kırmızısı\n' +
    '- Onboarding: auth + KYC + profil unlock\n\n' +
    '🔧 Teknik Altyapı (Eksik / Karar Bekleyen)\n' +
    '- Tech stack → belirlenmeli\n' +
    '- Hosting → belirlenmeli\n' +
    '- Database → belirlenmeli\n' +
    '- Security & backup → tanımlanmalı\n' +
    '- Günlük kapasite hedefi: 100K user\n\n' +
    '🧠 AI & Gelecek Özellikler\n' +
    '- AI öneri sistemi (henüz net değil)\n' +
    '- AI twin (gelir modeli içinde)\n' +
    '- Akıllı öneri & filtreleme\n\n' +
    '👥 Topluluk & Etkinlik\n' +
    '- WhatsApp / Telegram grup listeleri\n' +
    '- Grup yönetimi platform dışı\n' +
    '- Etkinlik sistemi (konser, meetup, workshop vb.)\n' +
    '- Etkinlik detayları: tarih, lokasyon, bilet\n\n' +
    '⭐ Yorum & Güven Sistemi\n' +
    '- Kullanıcı yorumları ve puanlama\n' +
    '- Google rating entegrasyonu\n' +
    '- Doğrulanmış rozet sistemi\n\n' +
    '🛡️ Moderasyon\n' +
    '- İçerik onayı\n' +
    '- Spam filtreleme\n' +
    '- Kullanıcı raporlama\n' +
    '- Moderatör paneli\n\n' +
    '📣 Pazarlama & Lansman\n' +
    '- İlk kanal: Instagram, FB, LinkedIn\n' +
    '- Beta kullanıcılar: founder network\n' +
    '- Lansman: 4–6 ay\n' +
    '- Sosyal medya genişleme planı\n\n' +
    '💰 Gelir Modeli\n' +
    '- Üyelik paketleri\n' +
    '- Reklam & sponsor\n' +
    '- İş ilanları\n' +
    '- Kupon satışları\n' +
    '- Online görüşmeler\n' +
    '- AI twin hizmetleri\n' +
    '- Business paketleri (micro site/app)\n\n' +
    '📈 KPI & Başarı Metrikleri\n' +
    '- Traction\n' +
    '- Retention\n' +
    '- Revenue\n\n' +
    '🎯 Hedefler\n' +
    '- 100K kullanıcı\n' +
    '- 2000 işletme + danışman\n' +
    '- 200K € gelir (ilk yıl)\n\n' +
    '🔮 Roadmap\n' +
    '- MVP → Web platform\n' +
    '- V2 → Mobile app\n' +
    '- Global diaspora expansion\n\n' +
    '⚡ Kritik Eksikler / Aksiyonlar\n' +
    '- Tech stack seçimi\n' +
    '- Hosting & DB kararı\n' +
    '- Güvenlik & backup\n' +
    '- Analitik araçlar\n' +
    '- AI öneri sistemi\n' +
    '- Medya storage\n' +
    '- Logo / branding',
}
import {
  buildDocCategoryHref,
  buildDocItemHref,
  buildDocsHubHref,
} from './docs-navigation'

export type ContentViewMode = 'hub-overview' | 'category-detail'
export type ContentCardDensity = 'default' | 'compact' | 'detail'
export type ContentCardActionSurface = 'card' | 'cta'

export interface ContentViewCardAction {
  type: 'link'
  href: string
  label: string
  surface?: ContentCardActionSurface
}

export interface ContentViewCard {
  id: string
  title: string
  description: string
  badge?: string
  eyebrow?: string
  detail?: string
  iconKey?: DocIconKey
  density?: ContentCardDensity
  anchorId?: string
  action?: ContentViewCardAction
}

export interface ContentViewEmptyState {
  title: string
  description: string
  action?: ContentViewCardAction
}

export interface ContentViewSection {
  id: string
  title: string
  description?: string
  columns?: 1 | 2 | 3 | 5
  cards: ContentViewCard[]
  emptyState?: ContentViewEmptyState
}

export interface ContentViewSearch {
  label: string
  placeholder: string
  helperText: string
}

export interface ContentView {
  mode: ContentViewMode
  eyebrow?: string
  title: string
  description: string
  supportingText?: string
  backLink?: {
    href: string
    label: string
  }
  metaBadges?: string[]
  search?: ContentViewSearch
  sections: ContentViewSection[]
}

export function getDocsHubContentView(): ContentView {
  return {
    mode: 'hub-overview',
    title: '',
    description: '',
    supportingText: '',
    search: {
      label: 'Ara',
      placeholder: 'Dokümanlarda ara…',
      helperText:
        'Arama henüz aktif bir özellik değildir; yalnızca görsel amaçlıdır.',
    },
    sections: [],
  }
}

export function getDocCategoryContentView(categorySlug: DocCategorySlug): ContentView {
  const category = getDocCategory(categorySlug)
  const isAmbassadorCategory = categorySlug === 'ambassador'
  const isTeamCategory = categorySlug === 'ekip'
  const isRoadmapCategory = categorySlug === 'roadmap'
  const useBulletCardLayout =
    isAmbassadorCategory || isTeamCategory || isRoadmapCategory

  const buildBulletDetail = (description: string, detail: string): string => {
    const lines = `${description}\n\n${detail}`
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    return lines
      .map((line) => {
        if (line.startsWith('- ')) {
          return line
        }

        if (line.startsWith('→ ')) {
          return `- ${line.slice(2)}`
        }

        return `- ${line}`
      })
      .join('\n')
  }

  return {
    mode: 'category-detail',
    eyebrow: category.label,
    title: category.overview.title,
    description: category.overview.description,
    supportingText: category.shortDescription,
    backLink: {
      href: buildDocsHubHref(),
      label: 'Dokümantasyon ana sayfasına dön',
    },
    metaBadges: [
      `${category.items.length} bölüm`,
      `Canonical route: /${category.slug}`,
    ],
    sections: [
      ...(category.items.length > 1
        ? [
            {
              id: `${category.slug}-section-map`,
              title: 'Bölüm Haritası',
              description:
                'Özet kartlar, bu kategorideki içerik bloklarına en hızlı erişim yolunu sunar.',
              columns: useBulletCardLayout ? (5 as const) : (3 as const),
              cards: category.items.map((item, index) => ({
                id: `${item.id}-summary`,
                title: item.label,
                description: useBulletCardLayout ? '' : item.description,
                badge: useBulletCardLayout ? undefined : category.label,
                eyebrow: useBulletCardLayout
                  ? undefined
                  : `Bölüm ${String(index + 1).padStart(2, '0')}`,
                density: 'compact' as const,
                action: {
                  type: 'link' as const,
                  href: buildDocItemHref(item),
                  label: useBulletCardLayout ? '' : 'Bölüme Git',
                  surface: 'card' as const,
                },
              })),
              emptyState: {
                title: 'Bu kategori için içerik hazırlanıyor',
                description:
                  'Rota geçerli, ancak bölüm kartları henüz doldurulmadı.',
                action: {
                  type: 'link' as const,
                  href: buildDocsHubHref(),
                  label: 'Ana sayfaya dön',
                  surface: 'cta' as const,
                },
              },
            },
          ]
        : []),
      {
        id: `${category.slug}-sections`,
        title: 'Kategori İçeriği',
        description:
          'Detaylı bölüm blokları, navigasyon davranışını değiştirmeden zengin modüller eklemeye olanak tanır.',
        columns: 1,
        cards: category.items.map((item, index) => ({
          id: item.id,
          anchorId: item.id,
          title: item.label,
          description: useBulletCardLayout ? '' : item.description,
          detail: (() => {
            const detail =
              whatsappBotSectionDetail[item.id] ??
              projeTakibiSectionDetail[item.id] ??
              roadmapSectionDetail[item.id] ??
              todoListSectionDetail[item.id] ??
              capTableSectionDetail[item.id] ??
              kortexDocsSectionDetail[item.id] ??
              notionKararlarSectionDetail[item.id] ??
              bawaChatSectionDetail[item.id] ??
              dijitalPazarlamaSectionDetail[item.id] ??
              toplantiSectionDetail[item.id] ??
              ambassadorSectionDetail[item.id] ??
              ekipSectionDetail[item.id] ??
              mvpSectionDetail[item.id] ??
              'Bu bölüm içeriği henüz eklenmedi.'

            return useBulletCardLayout
              ? buildBulletDetail(item.description, detail)
              : detail
          })(),
          badge: category.label,
          eyebrow: `Bölüm ${String(index + 1).padStart(2, '0')}`,
          density: 'detail',
          action: {
            type: 'link',
            href: buildDocItemHref(item),
            label: 'Kalıcı Bağlantı',
            surface: 'cta',
          },
        })),
        emptyState: {
          title: 'Henüz bölüm içeriği yok',
          description:
            'Bu kategori gelecekteki bölüm modülleri için hazır, ancak şu an detay bloğu yapılandırılmamış.',
          action: {
            type: 'link',
            href: buildDocsHubHref(),
            label: 'Başka bir kategori keşfet',
            surface: 'cta',
          },
        },
      },
    ],
  }
}
