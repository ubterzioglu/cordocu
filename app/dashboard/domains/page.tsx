'use client'

export default function DomainsPage() {
  const domains = [
    {
      icon: '📦',
      color: 'purple',
      name: 'Supply Domain',
      owner: 'Head of Supply / BD Lead',
      desc: 'Advisor · İşletme · Partner',
      kpis: ['Haftalık onboard edilen advisor sayısı', 'Aktif advisor oranı (%)', 'Partner (venue/business) sayısı', 'İlk işlem yapan advisor oranı (%)'],
      tools: ['HubSpot', 'Notion', 'Typeform'],
    },
    {
      icon: '🌐',
      color: 'teal',
      name: 'Demand Domain',
      owner: 'Growth / Community Lead',
      desc: 'Kullanıcılar · Community · Ambassador\'lar',
      kpis: ['Weekly active users (WAU)', 'Yeni kullanıcı (#)', 'Ambassador output', 'Community engagement (%)'],
      tools: ['Meta Ads', 'LinkedIn', 'WhatsApp'],
    },
    {
      icon: '💳',
      color: 'amber',
      name: 'Transaction Domain',
      owner: 'Revenue / Monetization Lead',
      desc: 'Booking · Ödeme · Komisyon · Revenue Share',
      kpis: ['GMV (toplam işlem hacmi)', 'Net revenue', 'Take rate (%)', 'Conversion rate (%)'],
      tools: ['Stripe', 'Google Sheets', 'Notion'],
    },
    {
      icon: '🎨',
      color: 'coral',
      name: 'Experience Domain',
      owner: 'Product Manager',
      desc: 'Dashboardlar · User Flow · Feature\'lar',
      kpis: ['Feature adoption (%)', 'Drop-off rate', 'Activation rate', 'Time-to-value'],
      tools: ['Linear', 'Figma', 'Notion'],
    },
    {
      icon: '⚙️',
      color: 'blue',
      name: 'Platform Core',
      owner: 'CTO',
      desc: 'Backend · API · Infra',
      kpis: ['Uptime (%)', 'API latency', 'Bug rate', 'Deploy frequency'],
      tools: ['AWS', 'GitHub', 'Cursor'],
    },
    {
      icon: '🎧',
      color: 'pink',
      name: 'Support & CRM',
      owner: 'Customer Success Lead',
      desc: 'User Support · Retention · CRM',
      kpis: ['Response time', 'Resolution time', 'Retention rate', 'NPS'],
      tools: ['Intercom', 'HubSpot', 'Notion'],
    },
  ]

  const colorMap: Record<string, { bg: string; dot: string }> = {
    purple: { bg: '#7c6dfa22', dot: '#7c6dfa' },
    teal: { bg: '#2dd4a022', dot: '#2dd4a0' },
    amber: { bg: '#f5a62322', dot: '#f5a623' },
    coral: { bg: '#f06b4a22', dot: '#f06b4a' },
    blue: { bg: '#4a9eff22', dot: '#4a9eff' },
    pink: { bg: '#f06faa22', dot: '#f06faa' },
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px' }}>
      <div
        style={{
          background: '#18181f',
          borderLeft: '3px solid #7c6dfa',
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, color: '#e8e8f0', marginBottom: 10 }}>
          Domain Ownership Modeli
        </div>
        <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.8, marginBottom: 12 }}>
          <strong style={{ color: '#ccc' }}>"Sahiplendirmeyi organizasyon şemasına göre değil, sistem akışına göre yapmazsan dağılır."</strong>
        </p>
        <p style={{ fontSize: 13, color: '#888', lineHeight: 1.7 }}>
          Yani kişi bazlı değil → <strong style={{ color: '#7c6dfa' }}>domain (alan) bazlı ownership</strong> kurman gerekiyor. Her domain'in tek bir owner'ı vardır — ekip olabilir ama sorumluluk tektir. Owner; KPI'lardan, backlog'dan, geliştirme önceliğinden ve büyümeden sorumludur. <em>Her işi yapmaktan veya teknik implementasyondan değil.</em>
        </p>
      </div>

      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          1 — Domain Haritası
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
          {domains.map((domain, i) => (
            <div
              key={i}
              style={{
                background: '#0f0f13',
                border: '1px solid #2a2a38',
                borderRadius: 12,
                padding: 20,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    background: colorMap[domain.color]?.bg || '#ffffff11',
                  }}
                >
                  {domain.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{domain.name}</div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 1 }}>Owner: {domain.owner}</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>{domain.desc}</div>
              <div style={{ marginTop: 10 }}>
                {domain.kpis.map((kpi, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 0',
                      borderBottom: '1px solid #ffffff08',
                      fontSize: 12,
                      color: '#bbb',
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        flexShrink: 0,
                        background: colorMap[domain.color]?.dot || '#888',
                      }}
                    />
                    {kpi}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {domain.tools.map((tool) => (
                  <span
                    key={tool}
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      background: '#ffffff11',
                      color: '#aaa',
                      border: '1px solid #ffffff22',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#18181f', border: '1px solid #2a2a38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          2 — KPI Haritası
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          <div style={{ background: '#7c6dfa11', border: '1px solid #7c6dfa33', borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#7c6dfa', marginBottom: 8 }}>📦 Supply Owner</div>
            <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.9 }}>· Onboard edilen advisor sayısı<br />· Aktif partner sayısı</div>
          </div>
          <div style={{ background: '#2dd4a011', border: '1px solid #2dd4a033', borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2dd4a0', marginBottom: 8 }}>🌐 Demand Owner</div>
            <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.9 }}>· Aktif user<br />· Community growth<br />· Ambassador output</div>
          </div>
          <div style={{ background: '#f5a62311', border: '1px solid #f5a62333', borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f5a623', marginBottom: 8 }}>💳 Revenue Owner</div>
            <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.9 }}>· İşlem hacmi (GMV)<br />· Komisyon geliri</div>
          </div>
          <div style={{ background: '#f06b4a11', border: '1px solid #f06b4a33', borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f06b4a', marginBottom: 8 }}>🎨 Product Owner</div>
            <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.9 }}>· Feature adoption<br />· Drop-off oranı</div>
          </div>
          <div style={{ background: '#4a9eff11', border: '1px solid #4a9eff33', borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#4a9eff', marginBottom: 8 }}>🎧 Support Owner</div>
            <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.9 }}>· Response time<br />· User satisfaction (NPS)</div>
          </div>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', border: '1px solid #2a2a38', borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#e8e8f0', marginBottom: 14 }}>Net Sonuç</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#f06b4a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Bu yapı kurulmazsa</div>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.9 }}>· Feature'lar sahipsiz kalır<br />· Revenue oluşmaz<br />· Herkes busy görünür ama sistem çalışmaz</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#2dd4a0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Bu yapı kurulursa</div>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.9 }}>· Her domain büyür bağımsız<br />· Revenue izlenebilir<br />· <strong style={{ color: '#2dd4a0' }}>CorteQS = self-running growth machine</strong></div>
          </div>
        </div>
      </div>
    </div>
  )
}
