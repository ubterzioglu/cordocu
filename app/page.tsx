import { supabase } from '@/lib/supabase'

export default async function HomePage() {
  // Örnek: Supabase bağlantı testi
  const { error } = await supabase.from('_test').select('*').limit(1).maybeSingle()
  const connected = !error || error.code === 'PGRST116' || error.message?.includes('does not exist')

  const pages = [
    {
      title: 'CorteQS Dashboard',
      description: 'Genel bakış, metrikler ve sistem durumu',
      href: '/corteqs_dashboard.html',
      color: '#7c6dfa',
    },
    {
      title: 'Proje Status',
      description: 'MVP proje durumu ve ilerleme takibi',
      href: '/status.html',
      color: '#2dd4a0',
    },
  ]

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ maxWidth: 600, width: '100%' }}>
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
            Corte<span style={{ color: '#7c6dfa' }}>QS</span>
          </h1>
          <p style={{ color: '#666', marginTop: 8, fontSize: 14 }}>Dashboard &amp; Proje Yönetimi</p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 16,
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: 12,
            background: connected ? '#2dd4a022' : '#f06b4a22',
            color: connected ? '#2dd4a0' : '#f06b4a',
            border: `1px solid ${connected ? '#2dd4a044' : '#f06b4a44'}`,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            Supabase {connected ? 'bağlı' : 'bağlantı hatası'}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {pages.map((page) => (
            <a
              key={page.href}
              href={page.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '24px',
                background: '#18181f',
                border: '1px solid #2a2a38',
                borderRadius: 12,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.15s',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>
                {page.href.includes('dashboard') ? '📊' : '📋'}
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, color: page.color, marginBottom: 6 }}>
                {page.title}
              </div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>
                {page.description}
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
