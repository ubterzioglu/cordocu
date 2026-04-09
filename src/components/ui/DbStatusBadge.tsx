'use client'

import { useEffect, useState } from 'react'
import type { DbStatusResponse } from '@/pages/api/db-status'

type State = 'loading' | 'connected' | 'mock' | 'error'

export default function DbStatusBadge() {
  const [state, setState] = useState<State>('loading')
  const [tooltip, setTooltip] = useState('')

  useEffect(() => {
    fetch('/api/db-status')
      .then<DbStatusResponse>((r) => r.json())
      .then((data) => {
        if (data.connected) {
          setState('connected')
          setTooltip(`Supabase bağlı — ${data.categories?.length ?? 0} kategori`)
        } else if (data.error) {
          setState('error')
          setTooltip(`Hata: ${data.error}`)
        } else {
          setState('mock')
          setTooltip(`Mock mod — eksik: ${data.missingEnvKeys.join(', ')}`)
        }
      })
      .catch(() => {
        setState('error')
        setTooltip('API erişilemedi')
      })
  }, [])

  const styles: Record<State, string> = {
    loading: 'bg-gray-100 text-gray-500',
    connected: 'bg-emerald-100 text-emerald-700',
    mock: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
  }

  const labels: Record<State, string> = {
    loading: '⏳ DB',
    connected: '● DB',
    mock: '○ Mock',
    error: '✕ DB',
  }

  return (
    <span
      title={tooltip}
      className={`text-xs font-medium px-2 py-1 rounded cursor-default select-none transition-colors ${styles[state]}`}
    >
      {labels[state]}
    </span>
  )
}
