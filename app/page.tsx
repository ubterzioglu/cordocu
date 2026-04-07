'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
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
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/takip')
    } else {
      setError('Yanlış şifre')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f0f13',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        background: '#18181f',
        border: '1px solid #2a2a38',
        borderRadius: 16,
        padding: '40px 32px',
        width: '100%',
        maxWidth: 360,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#e8e8f0', marginBottom: 8 }}>
            Corte<span style={{ color: '#7c6dfa' }}>QS</span>
          </div>
          <div style={{ fontSize: 13, color: '#666' }}>Giriş yapın</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
              autoFocus
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#0f0f13',
                border: '1px solid #2a2a38',
                borderRadius: 10,
                color: '#e8e8f0',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <div style={{
              color: '#f06b4a',
              fontSize: 12,
              marginBottom: 16,
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              padding: '14px 16px',
              background: loading || !password ? '#7c6dfa44' : '#7c6dfa',
              border: 'none',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: loading || !password ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Kontrol ediliyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  )
}
