# CorteQS Project

Next.js 14 TypeScript tabanlı CorteQS proje yönetim panosu.

## 🚀 Hızlı Başlangıç

### Gereklilikler

- Node.js 18+
- npm veya yarn

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Ortam değişkenlerini ayarla
cp .env.example .env.local

# Dev sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:3000` adresine git.

## 📝 Komutlar

- `npm run dev` - Geliştirme sunucusu başlat
- `npm run build` - Production build oluştur
- `npm start` - Production sunucusu başlat
- `npm run type-check` - TypeScript kontrol

## 🔐 Kimlik Doğrulama

- Şifre: `.env.local` dosyasında `APP_PASSWORD` yapılandırılır
- Varsayılan: `baubt2026!`
- Başarılı giriş sonrası cookie'ye `auth=true` yazılır

## 📊 Dashboardlar

### Anal Dashboard
- URL: `/corteqs_dashboard.html`
- Proje durumu, KPI'lar, özellikler
- İçerik, gelir modelleri, zaman çizelgesi

### Status Dashboard
- URL: `/status.html`
- Hızlı proje durumu özeti
- Grafik gösterimler

## 🛠️ Geliştirme

### Dosya Yapısı

```
cordocu/
├── app/              # Next.js App Router
├── lib/              # Araçlar & kütüphaneler
├── public/           # Statik dosyalar
├── middleware.ts     # Route koruması
├── package.json
└── tsconfig.json
```

### Kodlama Standartları

Detaylı standartlar için `AGENTS.md` dosyasına bakın:

- TypeScript strict mode
- ESM imports
- Açık dönüş tipleri
- Hata yönetimi
- Environment variable güvenliği

## 🔑 Ortam Değişkenleri

`.env.local` dosyasını oluştur:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ACCESS_TOKEN=your_access_token

# Uygulama
APP_PASSWORD=baubt2026!
```

**⚠️ Asla `.env.local` dosyasını commit etme!**

## 🔒 Güvenlik

- Middleware ile route koruması
- HTTP-only cookies
- Environment variable güvenliği
- Supabase RLS policies
- Input validation

## 📱 Responsive Design

Tüm dashboardlar responsive tasarım ile mobile-first yaklaşımı kullanır.

## 🐛 Sorun Giderme

### Dashboard yüklenmiyor
1. Middleware'de `PUBLIC_PATHS`'i kontrol et
2. `.html` dosyasının `public/` dizininde olup olmadığını kontrol et
3. Auth cookie'sinin ayarlanmış olduğunu doğrula

### Build hatası
1. TypeScript kontrol: `npm run type-check`
2. Dependencies güncelle: `npm install`

## 📞 İletişim

Sorular veya öneriler için: [GitHub Issues](https://github.com/your-repo/issues)

## 📄 Lisans

© 2026 CorteQS. Tüm hakları saklıdır.

---

**Son Güncelleme:** 7 Nisan 2026
