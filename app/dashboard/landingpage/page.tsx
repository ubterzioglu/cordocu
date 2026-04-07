'use client'

export default function LandingPageTODO() {
  const sections = [
    {
      title: '1. Landing İçeriği',
      items: [
        { done: false, text: 'Ne yaptığımızı net anlatan kısa değer önerisi yaz.' },
        { done: false, text: 'Hedef kitleleri ayır: kuruluşlar, işletmeler, son kullanıcılar.' },
        { done: false, text: 'İşbirliği çağrısı bölümü ekle: "Katkı vermek isteyenler bize ulaşsın".' },
        { done: false, text: 'Sosyal kanıt metni ekle: yüksek yorum/izlenme ilgisini vurgula.' },
      ],
    },
    {
      title: '2. Waitlist Tasarımı',
      items: [
        { done: false, text: 'Form alanları: ad-soyad, email, ülke/şehir, profil tipi, katkı tipi.' },
        { done: false, text: 'Profil tipi seçenekleri: "Kuruluş", "İşletme", "Son Kullanıcı", "Geliştirici".' },
        { done: false, text: 'Öncelikli katılım ödülü: ilk 100/500 kişiye abonelik indirimi kurgusu.' },
        { done: false, text: 'Başvuru sonrası teşekkür + referans daveti mesajı hazırla.' },
      ],
    },
    {
      title: '3. Trafik ve Operasyon',
      items: [
        { done: false, text: 'Domain üzerinde landing sayfasını canlıya al.' },
        { done: false, text: 'Gelen başvuruları tek listede topla (CSV/Sheet/DB).' },
        { done: false, text: 'Her gün en az 1 kez yeni başvuru kontrol rutini oluştur.' },
        { done: false, text: 'Yüksek trafik senaryosu için form hata/limit planını hazırla.' },
      ],
    },
    {
      title: '4. Hemen Başlanacaklar (72 Saat)',
      items: [
        { done: true, text: 'Fikir kaynağı metni toplandı (landing.txt).' },
        { done: false, text: 'Landing ana metinlerinin ilk taslağını yaz.' },
        { done: false, text: 'Waitlist formunu ekle ve test et.' },
        { done: false, text: 'İşbirliği başvuru alanını ayrı checkbox/alan olarak aç.' },
        { done: false, text: '"İlk katılanlara indirim" koşullarını netleştir ve yayınla.' },
      ],
    },
  ]

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '28px 24px' }}>
      <div
        style={{
          background: '#18181f',
          border: '1px solid #2a2a38',
          borderRadius: 14,
          padding: 20,
          marginBottom: 16,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
        }}
      >
        <h1 style={{ margin: '0 0 10px', fontSize: 24, color: '#e8e8f0' }}>Corteqs Landing Page TODO</h1>
        <p style={{ margin: '0 0 10px', color: '#a8a8b3', lineHeight: 1.6 }}>
          Kaynak: <code style={{ background: '#ffffff11', padding: '2px 6px', borderRadius: 4 }}>landing.txt</code>. Amaç; mevcut organik ilgiyi kaybetmeden waitlist toplamak, erken kullanıcıları segmente etmek ve launch öncesi hızlı onboarding zemini kurmak.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, borderRadius: 999, padding: '5px 10px', background: '#0ea5e922', color: '#67d0ff', border: '1px solid #0ea5e955' }}>Öncelik: Yüksek</span>
          <span style={{ fontSize: 12, fontWeight: 600, borderRadius: 999, padding: '5px 10px', background: '#0ea5e922', color: '#67d0ff', border: '1px solid #0ea5e955' }}>Hedef: Waitlist Büyütme</span>
          <span style={{ fontSize: 12, fontWeight: 600, borderRadius: 999, padding: '5px 10px', background: '#0ea5e922', color: '#67d0ff', border: '1px solid #0ea5e955' }}>Fırsat: 600+ yorum ilgisi</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        {sections.map((section, i) => (
          <div key={i} style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 14, padding: 18, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}>
            <h2 style={{ margin: '0 0 10px', fontSize: 17, color: '#e8e8f0' }}>{section.title}</h2>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#b8b8c2' }}>
              {section.items.map((item, j) => (
                <li key={j} style={{ margin: '7px 0', lineHeight: 1.45, color: item.done ? '#37d67a' : '#b8b8c2', fontWeight: item.done ? 700 : 400 }}>
                  [{item.done ? 'x' : ' '}] {item.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 16, color: '#9a9aa6', fontSize: 14 }}>
        Not: Bu TODO dokümanı, launch'i öne çekme ve topluluk ilgisini somut başvuruya dönüştürme hedefiyle hazırlandı.
      </p>
    </div>
  )
}
