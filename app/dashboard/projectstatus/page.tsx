'use client'

import { useState } from 'react'

export default function ProjectStatusPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Genel Bakış' },
    { id: 'comparison', label: 'Döküman Karşılaştırma' },
    { id: 'missing', label: 'Eksikler & Yapılacaklar' },
    { id: 'roadmap', label: 'Yol Haritası' },
    { id: 'tech', label: 'Teknik Altyapı' },
  ]

  const statusData = {
    progress: 65,
    completed: 41,
    total: 55,
    pending: 14,
    critical: 6,
  }

  const categories = [
    { name: 'Vizyon & Kapsam', status: 'complete', progress: '6/6' },
    { name: 'Kullanıcı Rolleri', status: 'complete', progress: '6/6' },
    { name: 'Arama & AI', status: 'partial', progress: '6/7' },
    { name: 'İçerik & Veri', status: 'incomplete', progress: '2/7' },
    { name: 'UI/UX Tasarımı', status: 'complete', progress: '6/6' },
    { name: 'Teknik Altyapı', status: 'incomplete', progress: '3/8' },
    { name: 'Pazarlama & Lansman', status: 'complete', progress: '5/5' },
    { name: 'Gelir Modelleri', status: 'complete', progress: '5/5' },
  ]

  const criticalTodos = [
    { title: 'Supabase Auth & Database Kurulumu', desc: 'Kullanıcı kimlik doğrulama ve veritabanı altyapısı', priority: 'critical', category: 'Backend' },
    { title: 'Kullanıcı Rolleri Sistemi', desc: 'Bireysel, Danışman, İşletme, Kuruluş rolleri ve yetkileri', priority: 'critical', category: 'Auth' },
    { title: 'İşletme Claim Sistemi', desc: 'İşletme sahiplik doğrulama ve yönetim devralma', priority: 'high', category: 'Feature' },
    { title: 'Moderasyon Paneli', desc: 'İçerik onayı, spam kontrolü, raporlama sistemi', priority: 'high', category: 'Admin' },
  ]

  const techStack = [
    { name: 'React 18', current: true },
    { name: 'TypeScript', current: true },
    { name: 'Next.js', current: true },
    { name: 'Tailwind CSS', current: true },
    { name: 'Supabase', current: false },
    { name: 'PostgreSQL', current: false },
    { name: 'Stripe Connect', current: false },
    { name: 'WhatsApp API', current: false },
  ]

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#22c55e'
    if (progress >= 50) return '#f59e0b'
    return '#ef4444'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return '#22c55e'
      case 'partial': return '#f59e0b'
      case 'incomplete': return '#ef4444'
      default: return '#888'
    }
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: 20 }}>
      <header
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '40px',
          borderRadius: 16,
          marginBottom: 30,
          border: '1px solid #334155',
        }}
      >
        <h1 style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: 10 }}>
          🚀 CorteQS MVP Project Guide
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Türk Diaspora Ağı - Proje Takip ve Geliştirme Rehberi</p>

        <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
          <div style={{ background: '#1e293b', padding: '15px 25px', borderRadius: 10, border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>MVP İlerleme</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getProgressColor(statusData.progress) }}>
              {statusData.progress}%
            </div>
            <div style={{ height: 8, background: '#334155', borderRadius: 4, marginTop: 5, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: getProgressColor(statusData.progress), borderRadius: 4, width: `${statusData.progress}%` }} />
            </div>
          </div>

          <div style={{ background: '#1e293b', padding: '15px 25px', borderRadius: 10, border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Tamamlanan</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>
              {statusData.completed}/{statusData.total}
            </div>
          </div>

          <div style={{ background: '#1e293b', padding: '15px 25px', borderRadius: 10, border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Bekleyen</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{statusData.pending}</div>
          </div>

          <div style={{ background: '#1e293b', padding: '15px 25px', borderRadius: 10, border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Kritik Eksik</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>{statusData.critical}</div>
          </div>
        </div>
      </header>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 4, background: '#0f172a', padding: 4, borderRadius: 8, border: '1px solid #334155' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.2s',
                color: activeTab === tab.id ? '#fff' : '#94a3b8',
                background: activeTab === tab.id ? '#2563eb' : 'transparent',
                border: 'none',
                fontWeight: activeTab === tab.id ? 600 : 400,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>
          <div style={{ background: '#1e293b', borderRadius: 12, border: '1px solid #334155', overflow: 'hidden' }}>
            <div style={{ padding: 20, background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)', color: 'white' }}>
              <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: 10 }}>📊 Proje Durumu</h2>
            </div>
            <div style={{ padding: 20 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155' }}>
                    <th style={{ padding: 12, textAlign: 'left', color: '#94a3b8', fontWeight: 500 }}>Kategori</th>
                    <th style={{ padding: 12, textAlign: 'left', color: '#94a3b8', fontWeight: 500 }}>Durum</th>
                    <th style={{ padding: 12, textAlign: 'left', color: '#94a3b8', fontWeight: 500 }}>İlerleme</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: 12, color: '#e2e8f0' }}>{cat.name}</td>
                      <td style={{ padding: 12 }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: 20,
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            background: cat.status === 'complete' ? '#166534' : cat.status === 'partial' ? '#92400e' : '#991b1b',
                            color: cat.status === 'complete' ? '#86efac' : cat.status === 'partial' ? '#fcd34d' : '#fca5a5',
                          }}
                        >
                          {cat.status === 'complete' ? 'Tamam' : cat.status === 'partial' ? 'Kısmen' : 'Geliştirilecek'}
                        </span>
                      </td>
                      <td style={{ padding: 12, color: '#e2e8f0' }}>{cat.progress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ background: '#1e293b', borderRadius: 12, border: '1px solid #334155', overflow: 'hidden' }}>
            <div style={{ padding: 20, background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)', color: 'white' }}>
              <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: 10 }}>⚡ Kritik Öncelikler</h2>
            </div>
            <div style={{ padding: 20 }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {criticalTodos.map((todo, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: 12,
                      borderRadius: 8,
                      marginBottom: 8,
                      background: '#252f47',
                      borderLeft: `3px solid ${todo.priority === 'critical' ? '#ef4444' : '#f59e0b'}`,
                    }}
                  >
                    <div style={{ width: 20, height: 20, border: '2px solid #475569', borderRadius: 4, flexShrink: 0, marginTop: 2, cursor: 'pointer' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, color: '#f8fafc' }}>{todo.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: 4 }}>{todo.desc}</div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                        <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', background: todo.priority === 'critical' ? '#ef444422' : '#f59e0b22', color: todo.priority === 'critical' ? '#fca5a5' : '#fcd34d' }}>
                          {todo.priority === 'critical' ? 'Kritik' : 'Yüksek'}
                        </span>
                        <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', background: '#1e40af', color: '#93c5fd' }}>{todo.category}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div style={{ background: '#1e293b', borderRadius: 12, border: '1px solid #334155', padding: 24 }}>
          <h2 style={{ color: '#f8fafc', marginBottom: 16 }}>Döküman Karşılaştırma</h2>
          <p style={{ color: '#94a3b8' }}>Bu bölüm, MVP dökümanları arasındaki farkları ve tutarsızlıkları gösterir.</p>
          <div style={{ marginTop: 16, padding: 16, background: '#0f172a', borderRadius: 8 }}>
            <p style={{ color: '#64748b', fontSize: 14 }}>Karşılaştırma verisi yükleniyor...</p>
          </div>
        </div>
      )}

      {activeTab === 'missing' && (
        <div style={{ background: '#1e293b', borderRadius: 12, border: '1px solid #334155', padding: 24 }}>
          <h2 style={{ color: '#f8fafc', marginBottom: 16 }}>Eksikler & Yapılacaklar</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {criticalTodos.map((todo, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#0f172a', borderRadius: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: todo.priority === 'critical' ? '#ef4444' : '#f59e0b' }} />
                <span style={{ color: '#e2e8f0' }}>{todo.title}</span>
                <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', background: '#334155', color: '#94a3b8' }}>{todo.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div style={{ background: '#1e293b', borderRadius: 12, border: '1px solid #334155', padding: 24 }}>
          <h2 style={{ color: '#f8fafc', marginBottom: 16 }}>Yol Haritası</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {['MVP Launch', 'V2 Growth Features', 'V3 Scale & Multi-Diaspora'].map((phase, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: i === 0 ? '#2563eb' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>{i + 1}</div>
                <div>
                  <div style={{ color: '#f8fafc', fontWeight: 500 }}>{phase}</div>
                  <div style={{ color: '#64748b', fontSize: 14 }}>{i === 0 ? 'Q2 2026' : i === 1 ? 'Q3 2026' : 'Q4 2026'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tech' && (
        <div style={{ background: '#1e293b', borderRadius: 12, border: '1px solid #334155', padding: 24 }}>
          <h2 style={{ color: '#f8fafc', marginBottom: 16 }}>Teknik Altyapı</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {techStack.map((tech, i) => (
              <div key={i} style={{ padding: 16, background: tech.current ? '#2563eb22' : '#0f172a', borderRadius: 8, border: `1px solid ${tech.current ? '#2563eb44' : '#334155'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: tech.current ? '#22c55e' : '#64748b' }} />
                  <span style={{ color: tech.current ? '#f8fafc' : '#94a3b8', fontWeight: tech.current ? 600 : 400 }}>{tech.name}</span>
                </div>
                <div style={{ marginTop: 4, fontSize: 12, color: tech.current ? '#22c55e' : '#64748b' }}>{tech.current ? 'Aktif' : 'Planlanıyor'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
