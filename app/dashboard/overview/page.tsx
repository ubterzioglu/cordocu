'use client'

export default function OverviewPage() {
  const kpis = [
    { label: 'Aşama', value: 'MVP', sub: 'v2.0 hazırlanıyor', color: 'purple' },
    { label: 'Core Team', value: '2', sub: 'Burak + Barış', color: 'teal' },
    { label: 'Hedef Pazar', value: 'Diaspora', sub: 'Global Türk toplulukları', color: 'amber' },
    { label: 'Yaklaşım', value: 'Gen-Z', sub: 'Liberal global yönelim', color: 'coral' },
  ]

  const timeline = [
    { status: 'done', text: 'Brainstorming & Notion kurulumu', date: 'Tamamlandı' },
    { status: 'done', text: 'Lovable prototipi + Ambassador mantığı', date: 'Tamamlandı' },
    { status: 'pending', text: 'MVP v2.0 dökümanları karşılıklı gönderilecek', date: '17 Mart 2026' },
    { status: 'pending', text: 'Barış 2 döküman + Lovable\'ı birleştirip nihai döküman', date: '19 Mart 2026' },
    { status: 'future', text: 'MVP çıkışı (2–3 toplantı sonra)', date: 'Yakında' },
    { status: 'future', text: 'Yatırım sonrası ölçekleme', date: 'V3 aşaması' },
  ]

  const tags = [
    { text: 'City Ambassador', color: 'purple' },
    { text: 'WhatsApp Bot', color: 'teal' },
    { text: 'Hoşgeldin Paketi', color: 'amber' },
    { text: 'Jukebox', color: 'coral' },
    { text: 'Hospital Booking', color: 'purple' },
    { text: 'Event Sponsorship', color: 'teal' },
    { text: 'Blog Yarışması', color: 'amber' },
    { text: 'Cap Table', color: 'coral' },
    { text: 'Admin Dashboard', color: 'purple' },
    { text: 'Haber Modülü', color: 'teal' },
    { text: 'İş İlanları', color: 'amber' },
    { text: 'Dubai Business Council', color: 'gray' },
    { text: 'SEO / Blog', color: 'gray' },
    { text: 'Mass Migration DB', color: 'gray' },
    { text: 'AitWin Danışman', color: 'gray' },
  ]

  const stages = [
    { num: '1', title: 'Fikir', sub: 'İnovasyon', color: '#2dd4a0' },
    { num: '2', title: 'Teknoloji', sub: 'MVP + Optimizasyon', color: '#7c6dfa' },
    { num: '3', title: 'Traction', sub: 'Marketing', color: '#f5a623' },
    { num: '4', title: 'Tutundurma', sub: 'UI/UX · Referral · Revenue Share', color: '#f06b4a' },
    { num: '5', title: 'Ölçekleme', sub: 'Yatırım', color: '#4a9eff' },
  ]

  const colorMap: Record<string, string> = {
    purple: '#7c6dfa',
    teal: '#2dd4a0',
    amber: '#f5a623',
    coral: '#f06b4a',
    gray: '#888',
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px' }}>
      {/* KPI Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        {kpis.map((kpi, i) => (
          <div
            key={i}
            style={{
              background: '#18181f',
              border: '1px solid #2a2a38',
              borderRadius: 12,
              padding: '16px 20px',
            }}
          >
            <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
              {kpi.label}
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: colorMap[kpi.color] }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Two Column */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {/* Timeline Card */}
        <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Yol Haritası
          </div>
          {timeline.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  marginTop: 5,
                  flexShrink: 0,
                  background:
                    item.status === 'done' ? '#2dd4a0' : item.status === 'pending' ? '#7c6dfa' : '#444',
                }}
              />
              <div>
                <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.5 }}>{item.text}</div>
                <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{item.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Ideas Card */}
        <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Temel Fikirler
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  background: `${colorMap[tag.color]}22`,
                  color: colorMap[tag.color],
                  border: `1px solid ${colorMap[tag.color]}33`,
                }}
              >
                {tag.text}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Core Team
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { initials: 'BU', name: 'Burak', role: 'Co-Founder' },
                { initials: 'BA', name: 'Barış', role: 'Co-Founder' },
              ].map((member, i) => (
                <div
                  key={i}
                  style={{
                    background: '#18181f',
                    border: '1px solid #2a2a38',
                    borderRadius: 12,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 14,
                      background: i === 0 ? '#7c6dfa33' : '#2dd4a033',
                      color: i === 0 ? '#7c6dfa' : '#2dd4a0',
                    }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{member.name}</div>
                    <div style={{ fontSize: 11, color: '#666' }}>{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Growth Stages */}
      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Büyüme Aşamaları
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 10,
            textAlign: 'center',
          }}
        >
          {stages.map((stage, i) => (
            <div
              key={i}
              style={{
                padding: 14,
                background: `${stage.color}11`,
                borderRadius: 10,
                border: `1px solid ${stage.color}33`,
              }}
            >
              <div style={{ fontSize: 11, color: stage.color, fontWeight: 600, marginBottom: 4 }}>{stage.num}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: stage.color }}>{stage.title}</div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{stage.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
