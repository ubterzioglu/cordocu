'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MENU_ITEMS = [
  { id: 'neden', label: 'Neden?', icon: '🧠' },
  { id: 'draftnot', label: 'Draft Not', icon: '📝' },
  { id: 'overview', label: 'Genel Bakış', icon: '📊' },
  { id: 'docs', label: 'Dökümanlar', icon: '📄' },
  { id: 'takip', label: 'Takip Tablosu', icon: '✅' },
  { id: 'ozet', label: 'Özet', icon: '📋' },
  { id: 'domains', label: 'Domain Ownership', icon: '🏷️' },
  { id: 'features', label: 'Feature\'lar', icon: '⚡' },
  { id: 'revenue', label: 'Gelir Modeli', icon: '💰' },
  { id: 'audit', label: 'Audit', icon: '🔍' },
  { id: 'projectstatus', label: 'Project Status', icon: '🚀' },
  { id: 'landingpage', label: 'Landing Page', icon: '🌐' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  function handleLogout() {
    document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f13' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? 240 : 64,
          background: '#18181f',
          borderRight: '1px solid #2a2a38',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.2s',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 16px',
            borderBottom: '1px solid #2a2a38',
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarOpen ? 'space-between' : 'center',
          }}
        >
          {sidebarOpen && (
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#e8e8f0' }}>
                Corte<span style={{ color: '#7c6dfa' }}>QS</span>
              </div>
              <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>Diaspora Network</div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: '1px solid #2a2a38',
              borderRadius: 6,
              color: '#888',
              cursor: 'pointer',
              padding: 4,
              fontSize: 14,
            }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
          {MENU_ITEMS.map((item) => {
            const href = `/dashboard/${item.id}`
            const isActive = pathname === href || pathname === `/dashboard` && item.id === 'neden'
            const isOverviewActive = pathname === '/dashboard/overview'

            return (
              <Link
                key={item.id}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: sidebarOpen ? 12 : 0,
                  padding: '10px 12px',
                  borderRadius: 8,
                  color: isActive || (item.id === 'overview' && isOverviewActive) ? '#7c6dfa' : '#888',
                  background: isActive || (item.id === 'overview' && isOverviewActive) ? '#7c6dfa11' : 'transparent',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: isActive || (item.id === 'overview' && isOverviewActive) ? 600 : 400,
                  marginBottom: 2,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid #2a2a38' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: sidebarOpen ? 12 : 0,
              padding: '10px 12px',
              borderRadius: 8,
              color: '#666',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              width: '100%',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
            }}
          >
            <span>🚪</span>
            {sidebarOpen && <span>Çıkış Yap</span>}
          </button>
        </div>

        {/* Version Badge */}
        {sidebarOpen && (
          <div style={{ padding: '12px 16px', borderTop: '1px solid #2a2a38' }}>
            <span
              style={{
                background: '#7c6dfa22',
                color: '#7c6dfa',
                border: '1px solid #7c6dfa44',
                padding: '4px 12px',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              MVP v2.0
            </span>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          marginLeft: sidebarOpen ? 240 : 64,
          transition: 'margin-left 0.2s',
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
    </div>
  )
}
