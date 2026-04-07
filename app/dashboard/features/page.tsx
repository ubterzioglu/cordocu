'use client'

export default function FeaturesPage() {
  const v1Features = [
    { name: 'Kullanıcı Profili', desc: 'Kayıt, giriş, temel profil ve navigasyon' },
    { name: 'Hizmet Talebi', desc: 'Bireysel kullanıcı profilinden hizmet talebi' },
    { name: 'Admin Dashboard', desc: 'Platform yönetim paneli' },
    { name: 'Haberler', desc: 'Diasporaya özel haber modülü' },
    { name: 'İşletme Listesi', desc: 'Restoran, market, yerel işletmeler' },
    { name: 'Etkinlikler', desc: 'Etkinlik oluşturma, filtreleme, harita' },
    { name: 'Danışman Modülü', desc: 'Claiming, olanaklar, teklif alma' },
    { name: 'Hospital Booking', desc: 'Sağlık randevu sistemi' },
  ]

  const v2Features = [
    { name: 'WhatsApp Bot', desc: 'Platform bildirimleri + birebir chatbot' },
    { name: 'City Ambassador', desc: 'Blogger/vlogger şehir elçileri sistemi' },
    { name: 'Hoşgeldin Paketi', desc: 'Banka, kart, uçak, transfer, indirimler' },
    { name: 'İş İlanları', desc: 'İşletme + havuz bazlı iş fırsatları' },
    { name: 'Blog Yarışması', desc: 'SEO + blogger topluluk oluşturma' },
    { name: 'Jukebox', desc: 'İşletmelere müzik/istek sistemi' },
    { name: 'İndirim Kuponları', desc: 'Restoran/market etkileşim kuponu' },
    { name: 'WA Grup Kategorizasyon', desc: 'WhatsApp grupları düzenleme altyapısı' },
  ]

  const v3Features = [
    { name: 'Event Sponsor Mgmt', desc: 'Tüm diaspora etkinliklerine sponsor altyapısı' },
    { name: 'Etkileşim Havuzu', desc: 'All2Gather / OdtuGather entegrasyonu' },
    { name: 'Çok Diaspora Desteği', desc: 'Türkçe ötesi diaspora genişlemesi' },
    { name: 'Notetaker Entegrasyonu', desc: 'Online toplantı altyapısı + sponsorlu notlar' },
    { name: 'Jukebox — Ayrı App', desc: 'İşletme müzik sistemi bağımsız uygulama' },
    { name: 'TV / Radyo Entegrasyonu', desc: 'Grey zone / Gen-Z medya kanalları' },
  ]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 800, color: '#e8e8f0' }}>Feature'lar</div>
        <div style={{ fontSize: 13, color: '#666' }}>V1 → V2 → V3 Roadmap</div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          V1 — Must Have
          <span style={{ flex: 1, height: 1, background: '#2a2a38' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {v1Features.map((f, i) => (
            <div key={i} style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 10, padding: 14 }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, marginBottom: 6, background: '#2dd4a022', color: '#2dd4a0' }}>V1</span>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{f.name}</div>
              <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          V2 — Growth
          <span style={{ flex: 1, height: 1, background: '#2a2a38' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {v2Features.map((f, i) => (
            <div key={i} style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 10, padding: 14 }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, marginBottom: 6, background: '#7c6dfa22', color: '#7c6dfa' }}>V2</span>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{f.name}</div>
              <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          V3 — Scale
          <span style={{ flex: 1, height: 1, background: '#2a2a38' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {v3Features.map((f, i) => (
            <div key={i} style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 10, padding: 14 }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, marginBottom: 6, background: '#f5a62322', color: '#f5a623' }}>V3</span>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{f.name}</div>
              <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
