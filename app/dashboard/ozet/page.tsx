'use client'

export default function OzetPage() {
  const decisions = [
    { num: 1, text: 'MVP v2.0 dökümanları 17 Marta kadar karşılıklı gönderilecek.', who: 'Burak + Barış' },
    { num: 2, text: '19\'unda Barış 2 dökümanı + Lovable projesini birleştirip nihai dökümanı oluşturacak.', who: 'Barış' },
    { num: 3, text: '2–3 toplantı sonra MVP çıkartabiliriz.', who: 'Tüm ekip' },
    { num: 4, text: 'Startup business 0-100 standartlarını incele ve araştır: tohum, pre-seed, seed... Onepager hazırlanacak.', who: 'Barış' },
    { num: 5, text: 'Şirket kurulumu için iki seçenek değerlendirildi: Dubai veya Delaware.', who: 'Burak' },
    { num: 6, text: 'QS sitesini Barış inceleyecek. Danışmana danışmanlık modeli: mikrosite + AitWin + chatbot.', who: 'Barış' },
    { num: 7, text: 'Dubai Business Council üzerinden 1000–2000 işletme bulunacak.', who: 'Burak' },
    { num: 8, text: 'Domain ownership + KPI yapısı kurulacak. 2 Nisan Perşembe toplantısında konuşulacak.', who: 'Tüm ekip · 2 Nisan 2026' },
  ]

  const connections = [
    { name: 'Sertaç Yay (Almanya — Barış)', color: 'purple' },
    { name: 'Hüseyin İnan Çolak (LinkedIn)', color: 'teal' },
    { name: 'Orhan Dijvar Ekinci (LinkedIn)', color: 'amber' },
    { name: 'Dubai Business Council (Burak)', color: 'gray' },
  ]

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '28px 24px' }}>
      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderLeft: '3px solid #7c6dfa', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#e8e8f0', marginBottom: 10 }}>Ana Kararlar</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {decisions.map((d) => (
            <div key={d.num} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: '#18181f', border: '1px solid #2a2a38', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#7c6dfa22', color: '#7c6dfa', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                {d.num}
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.6 }}>{d.text}</div>
                <div style={{ fontSize: 11, color: '#7c6dfa', marginTop: 3, fontWeight: 500 }}>{d.who}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Bağlantılar / Networking
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {connections.map((c, i) => (
            <span key={i} style={{
              display: 'inline-block',
              padding: '3px 10px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              background: c.color === 'purple' ? '#7c6dfa22' : c.color === 'teal' ? '#2dd4a022' : c.color === 'amber' ? '#f5a62322' : '#ffffff11',
              color: c.color === 'purple' ? '#7c6dfa' : c.color === 'teal' ? '#2dd4a0' : c.color === 'amber' ? '#f5a623' : '#aaa',
              border: `1px solid ${c.color === 'purple' ? '#7c6dfa33' : c.color === 'teal' ? '#2dd4a033' : c.color === 'amber' ? '#f5a62333' : '#ffffff22'}`,
            }}>
              {c.name}
            </span>
          ))}
        </div>
      </div>

      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Core Team & İlk Brainstorming
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: '#7c6dfa', fontWeight: 700, marginBottom: 8 }}>Core Team</div>
            <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.9 }}>· Burak (Co-Founder)<br />· Barış (Co-Founder)</div>
            <div style={{ fontSize: 12, color: '#7c6dfa', fontWeight: 700, margin: '14px 0 8px' }}>Altyapı Kurulumu</div>
            <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.9 }}>· Notion açıldı<br />· WhatsApp grubu (influencer'lar için)<br />· Google Drive proje dosyası<br />· Şirket: Dubai veya Delaware seçeneği değerlendiriliyor</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#2dd4a0', fontWeight: 700, marginBottom: 8 }}>Yaklaşım</div>
            <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.9 }}>· Liberal global yönelim<br />· Gen-Z yaklaşımı<br />· Relocation yapan kullanıcılar hedef</div>
            <div style={{ fontSize: 12, color: '#2dd4a0', fontWeight: 700, margin: '14px 0 8px' }}>İlk Fikirler</div>
            <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.9 }}>· VIT Jukebox · Borsa<br />· OdtuGather entegrasyonu<br />· WhatsApp Bot<br />· SEO + Blog yarışması stratejisi</div>
          </div>
        </div>
      </div>

      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Ambassador & İçerik Stratejisi
        </div>
        <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div>· Tüm seyahat blogger'larını <strong style={{ color: '#e8e8f0' }}>blog yazısı yarışması</strong> ile toplayarak başlanacak.</div>
          <div>· Blogger ve Influencer kategorisi oluşturulacak.</div>
          <div>· Relocation yapan insanlar gidecekleri yer hakkında City Ambassador'ları takip edecek.</div>
          <div>· Vlogger/Influencer iş birliği ile traction sağlanacak.</div>
          <div>· <strong style={{ color: '#7c6dfa' }}>Influencer / Blogger = City Ambassador</strong> olarak konumlandırılacak.</div>
          <div>· Ambassador mantığı çalışıldı — döküman Drive'da, Mock Lovable'a işlendi. <a href="https://docs.google.com/document/d/13sJqSbpow5r3zWym8FMzw-vVFc8bud-P/edit" target="_blank" rel="noopener noreferrer" style={{ color: '#7c6dfa', fontSize: 12 }}>↗ Şehir Elçileri Dökümanı</a></div>
        </div>
      </div>

      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          MVP'ye Eklenen Feature'lar
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
          <div style={{ background: '#2dd4a011', border: '1px solid #2dd4a033', borderRadius: 8, padding: 12, fontSize: 13, color: '#ccc', lineHeight: 1.8 }}>
            <div style={{ color: '#2dd4a0', fontWeight: 700, marginBottom: 6, fontSize: 12 }}>Tamamlandı</div>
            · Haberler mantığı (süper oldu)<br />· Hospital Booking<br />· Jukebox (ilerde ayrı app)<br />· Bireysel profil → Hizmet Talebi navigasyonu<br />· Admin Dashboard başlandı
          </div>
          <div style={{ background: '#7c6dfa11', border: '1px solid #7c6dfa33', borderRadius: 8, padding: 12, fontSize: 13, color: '#ccc', lineHeight: 1.8 }}>
            <div style={{ color: '#7c6dfa', fontWeight: 700, marginBottom: 6, fontSize: 12 }}>Jukebox Vizyon</div>
            · İşletme müzik sistemleri entegrasyonu<br />· Radyoda çaldırır gibi ücretli istek (song/video)<br />· <strong style={{ color: '#e8e8f0' }}>İlerde ayrı uygulama olacak</strong>
          </div>
          <div style={{ background: '#f5a62311', border: '1px solid #f5a62333', borderRadius: 8, padding: 12, fontSize: 13, color: '#ccc', lineHeight: 1.8 }}>
            <div style={{ color: '#f5a623', fontWeight: 700, marginBottom: 6, fontSize: 12 }}>Networking</div>
            · Barış — Almanya: Sertaç Yay<br />· Hüseyin İnan Çolak (LinkedIn)<br />· Orhan Dijvar Ekinci (LinkedIn)<br />· Dubai Business Council (Burak)
          </div>
        </div>
      </div>

      <div style={{ background: '#18181f', borderLeft: '3px solid #f5a623', border: '1px solid #2a2a38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Toplantı Notları — 12.03.26
        </div>
        <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div>· Her türlü işletme platforma eklenecek.</div>
          <div>· Dubai Business Council üzerinden Burak 1000–2000 işletme bulacak.</div>
          <div>· Mass migration veritabanı düşünülecek (KVKK sorun olmayacaksa direkt çekilecek).</div>
          <div>· Barış QS sitesini inceleyecek.</div>
          <div>· Danışmana danışmanlık verilecek: <strong style={{ color: '#e8e8f0' }}>mikrosite + AitWin + chatbot</strong> → kurumsallaşacak.</div>
        </div>
      </div>

      <div style={{ background: '#18181f', borderLeft: '3px solid #2dd4a0', border: '1px solid #2a2a38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Toplantı Notları — 24.03.26
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: '#2dd4a0', fontWeight: 700, marginBottom: 8 }}>Büyüme Aşamaları</div>
            <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.9 }}>
              1. Fikir → İnovasyon<br />
              2. Teknoloji → MVP + Optimizasyon<br />
              3. Traction → Marketing<br />
              4. Tutundurma → UI/UX, Referral, Revenue Share<br />
              5. Ölçekleme → Yatırım
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#f5a623', fontWeight: 700, marginBottom: 8 }}>Hoşgeldin Paketi İçeriği</div>
            <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.9 }}>
              · Banka + mobil kart<br />
              · Ülkenin e-devlet uygulaması<br />
              · Sponsored indirim uygulaması<br />
              · Hediye kahve/çay-simit<br />
              · Uçak bileti, araç kiralama, havaalanı transfer
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 12, color: '#7c6dfa', fontWeight: 700, marginBottom: 4 }}>WhatsApp Altyapısı</div>
          <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.7 }}>· CorteQS WhatsApp Kanalı açılacak. Kullanıcı hem kanala hem de bot ile birebir görüşebilecek.<br />· Bot: platform bilgisi, bildirim, ödeme ve mesajları iletecek.</div>
          <div style={{ fontSize: 12, color: '#7c6dfa', fontWeight: 700, margin: '10px 0 4px' }}>Etkileşim Havuzu Vizyonu</div>
          <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.7 }}>· V2/V3'te All2Gather ve OdtuGather özelliği Corteqs'e aktarılacak.<br />· Tüm diaspora etkinliklerinden etkinlik altyapısına (Zoom, Meet, özel altyapı) pay alınacak.<br />· Havuz: konu kategorileri, ülkeler, diaspora bazında track edilecek.<br />· Etkinlik ilanı → davetiye → notetaker zincirinde sponsor alımı mümkün.<br />· <strong style={{ color: '#e8e8f0' }}>İlerde ayrı "Event Sponsor Management" platform olabilir.</strong></div>
        </div>
      </div>

      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a38', borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 12, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Not — 27.03.26</div>
        <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.7 }}>Bundan sonraki toplantılarda artık <strong style={{ color: '#ccc' }}>siteyi geliştirmek ve bağlantıları kurmak</strong> üzerine konuşulacak.</div>
      </div>
    </div>
  )
}
