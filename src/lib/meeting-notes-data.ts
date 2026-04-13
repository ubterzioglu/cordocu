export type MeetingSource = 'T1' | 'T2' | 'T3' | 'WA'

export interface MeetingNoteItem {
  id: string
  content: string
  source: MeetingSource
  date: string
  category: string
}

export interface MeetingNoteCategory {
  id: string
  label: string
  color: string
}

export const MEETING_CATEGORIES: MeetingNoteCategory[] = [
  { id: 'rezervasyon-sistemi', label: 'Rezervasyon Sistemi', color: '#EA4335' },
  { id: 'kullanici-kisitlamalari', label: 'Kullanıcı Kısıtlamaları', color: '#34A853' },
  { id: 'audit-kayitlari', label: 'Audit Kayıtları', color: '#4285F4' },
  { id: 'veritabani-tasarimi', label: 'Veritabanı Tasarımı', color: '#FBBC04' },
  { id: 'mvp-hedefleri', label: 'MVP Hedefleri', color: '#A142F4' },
  { id: 'reklam-modeli', label: 'Reklam Modeli', color: '#00897B' },
]

export const MEETING_SOURCES: { key: MeetingSource; label: string; date: string }[] = [
  { key: 'T1', label: 'Toplantı 1', date: '26 Şubat' },
  { key: 'T2', label: 'Toplantı 2', date: '12 Mart' },
  { key: 'T3', label: 'Toplantı 3', date: '9 Nisan' },
  { key: 'WA', label: 'WhatsApp Yazışmaları', date: '13 Nisan WA' },
]

export const ALL_MEETING_NOTES: MeetingNoteItem[] = [
// ============================================================
// T1 — 26 Şubat
// ============================================================
{
  id: 't1-01',
  content: 'Diaspora WhatsApp gruplarında tekrarlayan sorular ("Hangi doktor?") verimsizlik yaratıyor.',
  source: 'T1',
  date: '26 Şubat',
  category: 'reklam-modeli',
},
{
  id: 't1-02',
  content: 'Fiziksel etkinlikler düşük kaliteli bağlantılar üretiyor; networking etkin değil.',
  source: 'T1',
  date: '26 Şubat',
  category: 'reklam-modeli',
},
{
  id: 't1-03',
  content: 'Güvenilir uzman eksikliği dolandırıcılığa açık kapı bırakıyor — ABD $150K dolandırıcılık örneği.',
  source: 'T1',
  date: '26 Şubat',
  category: 'reklam-modeli',
},
{
  id: 't1-04',
  content: '"Cortex" global platformu: Doğrulanmış Uzman Pazaryeri, vetted profiller ve CTA.',
  source: 'T1',
  date: '26 Şubat',
  category: 'reklam-modeli',
},
{
  id: 't1-05',
  content: 'AI Twins: ücretli talep üzerine danışmanlık (örn. 20 dk €50).',
  source: 'T1',
  date: '26 Şubat',
  category: 'mvp-hedefleri',
},
{
  id: 't1-06',
  content: 'Merkezi Etkinlik Yönetimi — biletleme ve kayıt dahil diaspora etkinlikleri hub\'ı.',
  source: 'T1',
  date: '26 Şubat',
  category: 'reklam-modeli',
},
{
  id: 't1-07',
  content: 'WhatsApp ve Telegram gruplarından bilgileri platforma çeken botlar.',
  source: 'T1',
  date: '26 Şubat',
  category: 'veritabani-tasarimi',
},
{
  id: 't1-08',
  content: 'Barış\'ın "101" girişimi (Almanya) + Burak\'ın "Cortex" vizyonu global-lokal ortaklık modeli.',
  source: 'T1',
  date: '26 Şubat',
  category: 'reklam-modeli',
},
{
  id: 't1-09',
  content: '6–8 aylık MVP zaman çizelgesi hedefi.',
  source: 'T1',
  date: '26 Şubat',
  category: 'mvp-hedefleri',
},
{
  id: 't1-10',
  content: 'Haftalık 1 saatlik Perşembe toplantısı taahhüdü.',
  source: 'T1',
  date: '26 Şubat',
  category: 'kullanici-kisitlamalari',
},
{
  id: 't1-11',
  content: 'Platform konseptinin tek sayfalık özetini oluşturma.',
  source: 'T1',
  date: '26 Şubat',
  category: 'reklam-modeli',
},
{
  id: 't1-12',
  content: 'Fuat (Alman politikacı ağı) ile projeyi görüşme planı.',
  source: 'T1',
  date: '26 Şubat',
  category: 'reklam-modeli',
},

// ============================================================
// T2 — 12 Mart
// ============================================================
{
  id: 't2-01',
  content: '"Cortex" ismi "Turkish Atlas"a tercih edildi — evrensel marka, yatırımcı çekiciliği.',
  source: 'T2',
  date: '12 Mart',
  category: 'mvp-hedefleri',
},
{
  id: 't2-02',
  content: 'Qualtron Sinclair (QS) çatısı altında Cortex, startup portföyü olarak faaliyet görecek.',
  source: 'T2',
  date: '12 Mart',
  category: 'mvp-hedefleri',
},
{
  id: 't2-03',
  content: 'AI destekli 50+ soru yöntemiyle kapsamlı MVP belgesi oluşturma stratejisi.',
  source: 'T2',
  date: '12 Mart',
  category: 'veritabani-tasarimi',
},
{
  id: 't2-04',
  content: 'Organik tasarım dili, insan unsurları ve Türk motifleriyle özgün UI/UX yaklaşımı.',
  source: 'T2',
  date: '12 Mart',
  category: 'veritabani-tasarimi',
},
{
  id: 't2-05',
  content: 'Danışmanlar: profesyonel profil sayfası, 7/24 AI Twin chatbot, ücretli etkinlik yönetimi.',
  source: 'T2',
  date: '12 Mart',
  category: 'reklam-modeli',
},
{
  id: 't2-06',
  content: 'Kuruluşlar: dernekler, STK\'lar, okullar, konsolosluklar — üyelik yönetimi ve bağış işleme.',
  source: 'T2',
  date: '12 Mart',
  category: 'reklam-modeli',
},
{
  id: 't2-07',
  content: 'İşletmeler: dizin, premium iş ilanı portalı, kupon satışı (Cortex gelir payı), franchise ilanları.',
  source: 'T2',
  date: '12 Mart',
  category: 'audit-kayitlari',
},
{
  id: 't2-08',
  content: 'WhatsApp/Telegram grupları: merkezi keşif; bot ile onaylı gruplara sponsorlu içerik; reklam geliri payı.',
  source: 'T2',
  date: '12 Mart',
  category: 'reklam-modeli',
},
{
  id: 't2-09',
  content: 'Etkinlikler: tüm diaspora takvimi + "Öne Çıkan Etkinlik" seçeneği.',
  source: 'T2',
  date: '12 Mart',
  category: 'reklam-modeli',
},
{
  id: 't2-10',
  content: 'Harita: işletme/kuruluş konumları + vurgulu pin ödemesi.',
  source: 'T2',
  date: '12 Mart',
  category: 'veritabani-tasarimi',
},
{
  id: 't2-11',
  content: 'Premium abonelikler ve kupon gelir paylaşımı modeli.',
  source: 'T2',
  date: '12 Mart',
  category: 'audit-kayitlari',
},
{
  id: 't2-12',
  content: 'Dubai Türk İş Konseyi (2000+ işletme) gibi diaspora konseylerinde toplu onboarding.',
  source: 'T2',
  date: '12 Mart',
  category: 'reklam-modeli',
},
{
  id: 't2-13',
  content: 'Diaspora influencer ortaklıkları ve Ottogether büyüme modeli referans.',
  source: 'T2',
  date: '12 Mart',
  category: 'reklam-modeli',
},
{
  id: 't2-14',
  content: '17 Mart belge takası ve 19 Mart birleşik plan toplantısı.',
  source: 'T2',
  date: '12 Mart',
  category: 'kullanici-kisitlamalari',
},
{
  id: 't2-15',
  content: 'Burak: AI destekli MVP belgesi oluştur; Barış: mevcut MVP\'yi geliştir.',
  source: 'T2',
  date: '12 Mart',
  category: 'kullanici-kisitlamalari',
},

// ============================================================
// T3 — 9 Nisan
// ============================================================
{
  id: 't3-01',
  content: 'D.Cortex dashboard tek doğruluk kaynağı olacak — tüm notlar, kişiler ve MVP planı tek merkezde.',
  source: 'T3',
  date: '9 Nisan',
  category: 'veritabani-tasarimi',
},
{
  id: 't3-02',
  content: '"Teknoloji spagettisi" problemi: bilgi WhatsApp, Notion ve Drive arasında dağınık.',
  source: 'T3',
  date: '9 Nisan',
  category: 'veritabani-tasarimi',
},
{
  id: 't3-03',
  content: 'Versiyonlama: Burak ana Lovable projesine devam; Umut backend ve MVP dışı özellikleri yönetecek.',
  source: 'T3',
  date: '9 Nisan',
  category: 'veritabani-tasarimi',
},
{
  id: 't3-04',
  content: 'City Partner influencer modeli: Cortex trafik sağlar, partnerler içerik ve yerel bilgi katkısı sunar.',
  source: 'T3',
  date: '9 Nisan',
  category: 'reklam-modeli',
},
{
  id: 't3-05',
  content: 'İçerik kaynakları: diaspora WhatsApp grupları, YouTube, Instagram, TikTok.',
  source: 'T3',
  date: '9 Nisan',
  category: 'reklam-modeli',
},
{
  id: 't3-06',
  content: 'Uzun vadeli: içerik havuzundan otomatik seyahat rotası / şehir rehberi üreticisi.',
  source: 'T3',
  date: '9 Nisan',
  category: 'reklam-modeli',
},
{
  id: 't3-07',
  content: 'Gerilla pazarlama: viral diaspora videoları yorumlarına manuel Cortex linki bırakma.',
  source: 'T3',
  date: '9 Nisan',
  category: 'reklam-modeli',
},
{
  id: 't3-08',
  content: 'Gönüllü/stajyer ekip modeliyle gerilla pazarlama operasyonunun ölçeklenmesi.',
  source: 'T3',
  date: '9 Nisan',
  category: 'kullanici-kisitlamalari',
},
{
  id: 't3-09',
  content: 'Cortex.net\'i Google Console\'a ekleme.',
  source: 'T3',
  date: '9 Nisan',
  category: 'reklam-modeli',
},
{
  id: 't3-10',
  content: 'Burak\'ın 11+ domain\'i üzerinden Cortex\'e backlink verme.',
  source: 'T3',
  date: '9 Nisan',
  category: 'reklam-modeli',
},
{
  id: 't3-11',
  content: 'Seren Uzluer\'e pazarlama liderliği teklifi — tam zamanlı, hisse bazlı rol.',
  source: 'T3',
  date: '9 Nisan',
  category: 'kullanici-kisitlamalari',
},
{
  id: 't3-12',
  content: 'SOP dokümanı: hisse, ertelenmiş ücret ve genel çalışma modelini net anlatan onboarding materyali.',
  source: 'T3',
  date: '9 Nisan',
  category: 'kullanici-kisitlamalari',
},
{
  id: 't3-13',
  content: 'Ekip araçları ve abonelik maliyetleri için tool matrix hazırlanması.',
  source: 'T3',
  date: '9 Nisan',
  category: 'kullanici-kisitlamalari',
},
{
  id: 't3-14',
  content: 'AI Twin vizyonu: kurucu iletişim, dokümantasyon ve karar süreçlerini otomatikleştirme.',
  source: 'T3',
  date: '9 Nisan',
  category: 'mvp-hedefleri',
},
{
  id: 't3-15',
  content: '12 Nisan\'a kadar D.Cortex paylaşımı ve tool matrix oluşturma.',
  source: 'T3',
  date: '9 Nisan',
  category: 'kullanici-kisitlamalari',
},

// ============================================================
// WA — 13 Nisan WA (WhatsApp Yazışmaları)
// ============================================================
{
  id: 'wa-01',
  content: 'LinkedIn üzerinden ilk tanışma — Qatar-Dubai bağlantısı, CorteQS grubu davet linki.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'reklam-modeli',
},
{
  id: 'wa-02',
  content: 'payaltr.com, qualtronsinclair.com tanıtımı; CORTEX-TURK ana hub fikrinin doğuşu.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'reklam-modeli',
},
{
  id: 'wa-03',
  content: 'turqua-z.com vs CorteQS — datanın karar vermesi prensibi, marka oylama fikri.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'mvp-hedefleri',
},
{
  id: 'wa-04',
  content: 'UBT\'ye CTO rolünün açıkça teklifi — "CTO sensin".',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'kullanici-kisitlamalari',
},
{
  id: 'wa-05',
  content: 'corteqs.net domain tartışması, isim alternatifleri (TurkAtlas, TurkHub, TurkSphere).',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'mvp-hedefleri',
},
{
  id: 'wa-06',
  content: 'Haftalık Perşembe Zoom serisi başlatıldı: 12:30 QA / 14:30 DE, 108 occurrence.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'kullanici-kisitlamalari',
},
{
  id: 'wa-07',
  content: 'Lovable workspace admin erişimi, repo GitHub\'a push, sandbox/merge stratejisi.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'veritabani-tasarimi',
},
{
  id: 'wa-08',
  content: 'Blog yazısı planı, Relocation Engine fikri, danışman/yazar kategorisi önerisi.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'reklam-modeli',
},
{
  id: 'wa-09',
  content: 'Network: Akın Özkan (Mercedes layoff) için iş yerleştirme — Kemal Hakimoğlu referansı.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'reklam-modeli',
},
{
  id: 'wa-10',
  content: 'delphi.ai incelemesi, RAG (Retrieval-Augmented Generation) ile danışman twin fikri.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'mvp-hedefleri',
},
{
  id: 'wa-11',
  content: 'cordocu.vercel.app ilk paylaşımı — yeni üyenin mevzuyu hızlı anlayacağı dashboard.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'veritabani-tasarimi',
},
{
  id: 'wa-12',
  content: 'Tech lead adayı muted observer olarak toplantıya davet edildi.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'kullanici-kisitlamalari',
},
{
  id: 'wa-13',
  content: 'Cap table modelleri gündeme geldi; "Gönül verecek 10 kişi, sonra para" prensibi.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'audit-kayitlari',
},
{
  id: 'wa-14',
  content: 'Ortak Instagram collection, danışman/ambassador profil havuzu oluşturma.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'reklam-modeli',
},
{
  id: 'wa-15',
  content: 'corteqs.net alındı (~226 TL, Doruk üzerinden); corteqs.co ve corteqs.ai planı.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'mvp-hedefleri',
},
{
  id: 'wa-16',
  content: 'Landing page: ülke kayıt sayaçları, şehir elçisi başvuru sayfası, teaser video.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'reklam-modeli',
},
{
  id: 'wa-17',
  content: 'Crowdfund açılışı için aynı landing page\'in kullanılması fikri.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'audit-kayitlari',
},
{
  id: 'wa-18',
  content: 'Subdomain mimarisi: Burak Lovable = subdomain, CorDocu = subdomain.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'veritabani-tasarimi',
},
{
  id: 'wa-19',
  content: 'Seren Uzluer\'e pazarlama liderliği teklifi — tam zamanlı, hisse bazlı rol.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'kullanici-kisitlamalari',
},
{
  id: 'wa-20',
  content: 'SOP dokümanı: hisse, ertelenmiş ücret ve genel çalışma modelini net anlatan onboarding materyali.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'kullanici-kisitlamalari',
},
{
  id: 'wa-21',
  content: 'Ekip araçları ve abonelik maliyetleri için tool matrix hazırlanması.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'kullanici-kisitlamalari',
},
{
  id: 'wa-22',
  content: 'AI Twin vizyonu: kurucu iletişim, dokümantasyon ve karar süreçlerini otomatikleştirme.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'mvp-hedefleri',
},
{
  id: 'wa-23',
  content: '12 Nisan\'a kadar D.Cortex paylaşımı ve tool matrix oluşturma.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'kullanici-kisitlamalari',
},
{
  id: 'wa-24',
  content: 'Cortex.net için 3 farklı domain alındı: corteqs.net, corteqs.co, corteqs.ai.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'mvp-hedefleri',
},
{
  id: 'wa-25',
  content: 'Landing page: ülke kayıt sayaçları, şehir elçisi başvuru sayfası, teaser video.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'reklam-modeli',
},
{
  id: 'wa-26',
  content: 'Crowdfund açılışı için aynı landing page\'in kullanılması fikri.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'audit-kayitlari',
},
{
  id: 'wa-27',
  content: 'Subdomain mimarisi: Burak Lovable = subdomain, CorDocu = subdomain.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'veritabani-tasarimi',
},
{
  id: 'wa-28',
  content: 'Seren Uzluer\'e pazarlama liderliği teklifi — tam zamanlı, hisse bazlı rol.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'kullanici-kisitlamalari',
},
{
  id: 'wa-29',
  content: 'SOP dokümanı: hisse, ertelenmiş ücret ve genel çalışma modelini net anlatan onboarding materyali.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'kullanici-kisitlamalari',
},
{
  id: 'wa-30',
  content: 'Ekip araçları ve abonelik maliyetleri için tool matrix hazırlanması.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'kullanici-kisitlamalari',
},
{
  id: 'wa-31',
  content: 'AI Twin vizyonu: kurucu iletişim, dokümantasyon ve karar süreçlerini otomatikleştirme.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'mvp-hedefleri',
},
{
  id: 'wa-32',
  content: '12 Nisan\'a kadar D.Cortex paylaşımı ve tool matrix oluşturma.',
  source: 'WA',
  date: '13 Nisan WA',
  category: 'kullanici-kisitlamalari',
},
  {
    id: 'wa-02',
    content: 'payaltr.com, qualtronsinclair.com tanıtımı; CORTEX-TURK ana hub fikrinin doğuşu.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'platform-vizyon',
  },
  {
    id: 'wa-03',
    content: 'turqua-z.com vs CorteQS — datanın karar vermesi prensibi, marka oylama fikri.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'marka',
  },
  {
    id: 'wa-04',
    content: 'UBT\'ye CTO rolünün açıkça teklifi — "CTO sensin".',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'ekip',
  },
  {
    id: 'wa-05',
    content: 'corteqs.net domain tartışması, isim alternatifleri (TurkAtlas, TurkHub, TurkSphere).',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'marka',
  },
  {
    id: 'wa-06',
    content: 'Haftalık Perşembe Zoom serisi başlatıldı: 12:30 QA / 14:30 DE, 108 occurrence.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'ekip',
  },
  {
    id: 'wa-07',
    content: 'Lovable workspace admin erişimi, repo GitHub\'a push, sandbox/merge stratejisi.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'teknik',
  },
  {
    id: 'wa-08',
    content: 'Blog yazısı planı, Relocation Engine fikri, danışman/yazar kategorisi önerisi.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'pazarlama',
  },
  {
    id: 'wa-09',
    content: 'Network: Akın Özkan (Mercedes layoff) için iş yerleştirme — Kemal Hakimoğlu referansı.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'network',
  },
  {
    id: 'wa-10',
    content: 'delphi.ai incelemesi, RAG (Retrieval-Augmented Generation) ile danışman twin fikri.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'ai',
  },
  {
    id: 'wa-11',
    content: 'cordocu.vercel.app ilk paylaşımı — yeni üyenin mevzuyu hızlı anlayacağı dashboard.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'teknik',
  },
  {
    id: 'wa-12',
    content: 'Tech lead adayı muted observer olarak toplantıya davet edildi.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'ekip',
  },
  {
    id: 'wa-13',
    content: 'Cap table modelleri gündeme geldi; "Gönül verecek 10 kişi, sonra para" prensibi.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'finans',
  },
  {
    id: 'wa-14',
    content: 'Ortak Instagram collection, danışman/ambassador profil havuzu oluşturma.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'pazarlama',
  },
  {
    id: 'wa-15',
    content: 'corteqs.net alındı (~226 TL, Doruk üzerinden); corteqs.co ve corteqs.ai planı.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'marka',
  },
  {
    id: 'wa-16',
    content: 'Landing page: ülke kayıt sayaçları, şehir elçisi başvuru sayfası, teaser video.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'pazarlama',
  },
  {
    id: 'wa-17',
    content: 'Crowdfund açılışı için aynı landing page\'in kullanılması fikri.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'finans',
  },
  {
    id: 'wa-18',
    content: 'Subdomain mimarisi: Burak Lovable = subdomain, CorDocu = subdomain.',
    source: 'WA',
    date: '13 Nisan WA',
    category: 'teknik',
  },
]

export function getNotesByCategory(categoryId: string): MeetingNoteItem[] {
  return ALL_MEETING_NOTES.filter((n) => n.category === categoryId)
}

export function getNotesBySource(source: MeetingSource): MeetingNoteItem[] {
  return ALL_MEETING_NOTES.filter((n) => n.source === source)
}

export function getCategoryById(categoryId: string): MeetingNoteCategory | undefined {
  return MEETING_CATEGORIES.find((c) => c.id === categoryId)
}
