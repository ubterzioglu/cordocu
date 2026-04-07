'use client'

export default function RevenuePage() {
  const revenueStreams = [
    { color: '#2dd4a0', title: 'Bireysel Danışman', subtitle: 'Claiming & Olanaklar', desc: 'Danışmanlar profil oluşturur, kullanıcılar teklif alır. Komisyon veya abonelik.', amount: 'Komisyon %' },
    { color: '#7c6dfa', title: 'İşletme Aboneliği', subtitle: 'Restoran / Market / Hizmet', desc: 'İşletmeler platforma kaydolur, indirim çeki + iş ilanı + kupon özellikleri.', amount: 'Aylık SaaS' },
    { color: '#f5a623', title: 'Etkinlik Sponsorluğu', subtitle: 'Featured + Davetiye + Notetaker', desc: 'Etkinlik ilanları öne çıkarma, davetiye sistemi, toplantı altyapısından pay.', amount: 'Featured + Rev Share' },
    { color: '#f06b4a', title: 'Hoşgeldin Paketi', subtitle: 'Banka · Araç Kiralama · Transfer', desc: 'Sponsorlu ürünler: banka kartı, e-devlet uygulaması, uçak bileti affiliate.', amount: 'Affiliate + Sponsor' },
    { color: '#4a9eff', title: 'Kuruluşlar & Vakıflar', subtitle: 'Konsolosluk · Dernek · Vakıf', desc: 'Etkinlik yönetimi, bağış/aidat modülü, üyelik arayüzü.', amount: 'Abonelik + İşlem' },
    { color: '#f06faa', title: 'Blogger / Vlogger', subtitle: 'City Ambassador Programı', desc: 'İçerik üreticileri şehir elçisi olur, trafik ve büyüme sağlar, revenue share alır.', amount: 'Revenue Share' },
  ]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px' }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: '#e8e8f0', marginBottom: 24 }}>Gelir Modeli</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 24 }}>
        {revenueStreams.map((stream, i) => (
          <div key={i} style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20 }}>
            <div style={{ color: stream.color, fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{stream.subtitle}</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{stream.title}</div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.6 }}>{stream.desc}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 10, color: stream.color }}>{stream.amount}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>Operasyon Ritmi</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: '#7c6dfa', fontWeight: 600, marginBottom: 8 }}>📅 Haftalık</div>
            <div style={{ fontSize: 13, color: '#bbb', lineHeight: 1.8 }}>Her owner → 10 dk KPI update<br />Blokajlar → hızlı çözüm<br />KPI review</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#2dd4a0', fontWeight: 600, marginBottom: 8 }}>📆 Aylık</div>
            <div style={{ fontSize: 13, color: '#bbb', lineHeight: 1.8 }}>Ne çalıştı / ne çalışmadı<br />Yeni deneyler<br />Revenue review</div>
          </div>
        </div>
      </div>
    </div>
  )
}
