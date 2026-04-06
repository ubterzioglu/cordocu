'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
      return
    }

    const body = await res.json().catch(() => null)
    setError(body?.error || 'Giris basarisiz')
    setLoading(false)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f0f13',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          background: '#18181f',
          border: '1px solid #2a2a38',
          borderRadius: 16,
          padding: '40px 36px',
          width: '100%',
          maxWidth: 360,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#e8e8f0', letterSpacing: '-0.5px' }}>
            Corte<span style={{ color: '#7c6dfa' }}>QS</span>
          </h1>
          <p style={{ color: '#666', fontSize: 13, marginTop: 6 }}>
            Devam etmek icin admin hesabi ile giris yapin
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta"
            autoComplete="email"
            autoFocus
            style={{
              width: '100%',
              padding: '12px 14px',
              background: '#0f0f13',
              border: `1px solid ${error ? '#f06b4a' : '#2a2a38'}`,
              borderRadius: 8,
              color: '#e8e8f0',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: 12,
            }}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sifre"
            autoComplete="current-password"
            style={{
              width: '100%',
              padding: '12px 14px',
              background: '#0f0f13',
              border: `1px solid ${error ? '#f06b4a' : '#2a2a38'}`,
              borderRadius: 8,
              color: '#e8e8f0',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />

          {error && <p style={{ color: '#f06b4a', fontSize: 12, marginTop: 8 }}>{error}</p>}

          <button
            type="submit"
            disabled={loading || !email || !password}
            style={{
              width: '100%',
              marginTop: 16,
              padding: '12px',
              background: '#7c6dfa',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
              opacity: loading || !email || !password ? 0.6 : 1,
            }}
          >
            {loading ? 'Giris yapiliyor...' : 'Giris Yap'}
          </button>
        </form>
      </div>
    </main>
  )
}
