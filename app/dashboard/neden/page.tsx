'use client'

export default function NedenPage() {
  const reasons = [
    { icon: '🧠', title: 'Prompt Sonuçlarının Görsel Takibi', desc: 'Oluşturulan tüm prompt çıktılarını dağınık dosyalar yerine tek bir yerden, görsel ve yapılandırılmış şekilde takip etmek için.' },
    { icon: '🔗', title: 'Döküman Linklerine Kolay Ulaşım', desc: 'Drive, Notion, Lovable ve diğer tüm proje dökümanlarına tek tıkla erişim. Farklı platformlar arasında kaybolmadan.' },
    { icon: '📋', title: 'Taslakların Rahatlıkla Oluşturulması', desc: 'Toplantılarda konuşulan fikirleri, kararları ve planları anında taslağa dönüştürüp paylaşmak için hızlı bir çalışma alanı.' },
    { icon: '📝', title: 'Karışık Notların Düzenli Listelenmesi', desc: 'WhatsApp, Notion ve farklı platformlara saçılan toplantı notlarını temiz, tarihli ve okunabilir bir formatta bir araya getirmek için.' },
    { icon: '✅', title: 'Görev ve Karar Takibi', desc: 'Kim ne yapacak, ne zaman bitecek, hangi karar alındı — bunları gerçek zamanlı takip etmek ve hesap verebilirliği artırmak için.' },
    { icon: '📊', title: 'Ürün ve Gelir Modelinin Şeffaf Yönetimi', desc: 'Feature\'lar, revenue akışları, domain ownership ve KPI\'lar — tüm ürün kararlarını tek bir panelden görüp yönetmek için.' },
    { icon: '🚀', title: 'Ve Daha Fazlası…', desc: 'Platform büyüdükçe bu sayfa da büyüyecek. Yatırımcı sunumundan operasyon ritmine, sprint planlamasından audit raporuna kadar her şey burada olacak.' },
  ]

  return (
    <div style={{ maxWidth: 680, margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#e8e8f0', letterSpacing: -1, marginBottom: 10 }}>
          Bu Sayfa Neden Var?
        </div>
        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>
          CorteQS iç operasyon ve ürün yönetim merkezi
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {reasons.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
              background: '#18181f',
              border: '1px solid #2a2a38',
              borderRadius: 12,
              padding: '18px 20px',
            }}
          >
            <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e8e8f0', marginBottom: 4 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 32,
          textAlign: 'center',
          padding: 20,
          background: '#7c6dfa11',
          border: '1px solid #7c6dfa33',
          borderRadius: 12,
        }}
      >
        <div style={{ fontSize: 13, color: '#7c6dfa', fontWeight: 600 }}>
          CorteQS · İç Operasyon Merkezi
        </div>
        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          Soldaki menüleri kullanarak gezinmeye başlayabilirsiniz.
        </div>
      </div>
    </div>
  )
}
