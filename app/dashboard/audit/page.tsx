'use client'

export default function AuditPage() {
  const personas = [
    { color: '#7c6dfa', name: 'Yeni Göçmen', desc: 'Yeni gelmiş, sistemi anlamaya çalışan, hoşgeldin paketi ihtiyacı duyan kullanıcı. En kritik acquisition hedefi.' },
    { color: '#2dd4a0', name: 'Yerleşik Diaspora', desc: '10+ yıldır yurt dışında, işletmesi olan ya da profesyonel ağı güçlü, platform değerini anlayan kullanıcı.' },
    { color: '#f5a623', name: 'Danışman (Advisor)', desc: 'Avukat, muhasebeci, doktor, sigorta. Platform üzerinden müşteri bulan, profil açan, teklif veren profesyonel.' },
    { color: '#f06b4a', name: 'İşletme Sahibi', desc: 'Restoran, market, kuaför, ajans. SaaS abonelikle iş ilanı, kupon ve Jukebox gibi araçları kullanan B2B müşteri.' },
    { color: '#4a9eff', name: 'City Ambassador', desc: 'Blogger/vlogger, sosyal medya üreticisi. Şehir elçisi olarak trafik üretir, revenue share alır. Büyüme motoru.' },
    { color: '#f06faa', name: 'Kurum / Vakıf', desc: 'Konsolosluk, dernek, diaspora vakfı. Etkinlik yönetimi, üyelik ve bağış modülü kullanan kurumsal kullanıcı.' },
  ]

  const criticalGaps = [
    { priority: 'critical', title: 'Auth & Onboarding Flow tanımlanmamış', desc: 'Kullanıcı kayıt → profil tamamlama → ilk değer akışı tamamen belirsiz. Bu olmadan acquisition ölçülemez.' },
    { priority: 'critical', title: 'Ödeme altyapısı (Stripe) entegre değil', desc: 'Komisyon, abonelik, sponsor ödemeleri için Stripe Connect gerekli. Olmadan GMV = 0.' },
    { priority: 'critical', title: 'GDPR / Veri gizliliği uyumu yok', desc: 'Avrupa pazarında (Almanya, Hollanda, Belçika) faaliyet için GDPR zorunlu. Şu an sıfır uyum.' },
    { priority: 'high', title: 'Mobile-first strateji belirsiz', desc: 'Diaspora kullanıcıları mobilde. Web-only ile acquisition mümkün değil. PWA veya native uygulama kararı verilmeli.' },
    { priority: 'high', title: 'Ambassador payout yapısı belirsiz', desc: 'Revenue share % nedir? Nasıl hesaplanır? Tracking nasıl yapılır? Bu olmadan ambassador program çalışmaz.' },
    { priority: 'high', title: 'İçerik moderasyon sistemi yok', desc: 'Haber, blog, iş ilanı, profil içerikleri için moderasyon altyapısı olmadan platform güvenliği sağlanamaz.' },
  ]

  const getPriorityStyle = (priority: string) => {
    if (priority === 'critical') return { bg: '#f06b4a22', color: '#f06b4a', label: 'KRİTİK' }
    if (priority === 'high') return { bg: '#f5a62322', color: '#f5a623', label: 'YÜKSEK' }
    return { bg: '#7c6dfa22', color: '#7c6dfa', label: 'ORTA' }
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
          border: '1px solid #2a2a38',
          borderRadius: 14,
          padding: '28px 32px',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#7c6dfa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Senior Product Architect · CTO Perspective</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#f0f0ff', marginBottom: 6 }}>CorteQS Platform Audit</div>
            <div style={{ fontSize: 13, color: '#888', maxWidth: 640, lineHeight: 1.7 }}>Global Türk Diasporası için çok taraflı bir platform. Yapılan analiz; kullanıcı tipleri, feature gap'leri, gelir modeli açıkları ve ölçekleme önceliklerini kapsamaktadır.</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ background: '#2dd4a022', border: '1px solid #2dd4a044', borderRadius: 8, padding: '10px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#2dd4a0' }}>6</div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>Persona</div>
            </div>
            <div style={{ background: '#f06b4a22', border: '1px solid #f06b4a44', borderRadius: 8, padding: '10px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#f06b4a' }}>12</div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>Kritik Gap</div>
            </div>
            <div style={{ background: '#7c6dfa22', border: '1px solid #7c6dfa44', borderRadius: 8, padding: '10px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#7c6dfa' }}>7</div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>Gelir Akışı</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>1 — Kullanıcı Tipleri (Personas)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {personas.map((p, i) => (
            <div key={i} style={{ background: `${p.color}11`, border: `1px solid ${p.color}33`, borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.color, marginBottom: 6 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>2 — Kritik Eksikler (Must-Fix Before Launch)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {criticalGaps.map((gap, i) => {
            const style = getPriorityStyle(gap.priority)
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12, background: `${style.color}0a`, border: `1px solid ${style.color}33`, borderRadius: 8 }}>
                <span style={{ color: style.color, fontWeight: 700, fontSize: 12, minWidth: 70, padding: '2px 8px', background: style.bg, borderRadius: 4, textAlign: 'center' }}>{style.label}</span>
                <div>
                  <div style={{ fontSize: 13, color: '#e8e8f0', fontWeight: 600 }}>{gap.title}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 3 }}>{gap.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a38', borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#e8e8f0', marginBottom: 14 }}>Brutally Honest Değerlendirme</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#2dd4a0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Güçlü Yanlar</div>
            <div style={{ fontSize: 12, color: '#aaa', lineHeight: 2 }}>✓ Niş ve defensible pazar (diaspora)<br />✓ Multi-sided platform → network effect<br />✓ Ambassador modeli düşük maliyetli büyüme<br />✓ Birden fazla gelir akışı<br />✓ Hoşgeldin paketi → güçlü ilk değer önerisi</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#f06b4a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Acil Çözülmesi Gerekenler</div>
            <div style={{ fontSize: 12, color: '#aaa', lineHeight: 2 }}>✗ Auth + ödeme olmadan MVP = demo değil platform<br />✗ GDPR Avrupa'da zorunlu, ertelenecek bir şey değil<br />✗ Mobile-first kararı verilmeden pazarlama boş<br />✗ Legal entity = yatırım konuşmak için şart<br />✗ Ambassador tracking yoksa para yak demek</div>
          </div>
        </div>
        <div style={{ marginTop: 16, padding: '12px 16px', background: '#7c6dfa11', borderLeft: '3px solid #7c6dfa', borderRadius: 4 }}>
          <div style={{ fontSize: 12, color: '#ccc', lineHeight: 1.7 }}><strong style={{ color: '#7c6dfa' }}>Öneri:</strong> V1'i 3 şeye indirge — <strong style={{ color: '#e8e8f0' }}>(1) Auth + onboarding</strong>, <strong style={{ color: '#e8e8f0' }}>(2) Advisor talebi + ödeme</strong>, <strong style={{ color: '#e8e8f0' }}>(3) Hoşgeldin paketi affiliate</strong>. Bu üçü çalışırsa GMV görürsün, geri kalanı sonra gelir.</div>
        </div>
      </div>
    </div>
  )
}
