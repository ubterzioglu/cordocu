'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Durum = 'Başlanmadı' | 'Devam Ediyor' | 'Bitti' | 'Bekliyor'
type Atanan = 'Umut' | 'Barış' | ''

interface Gorev {
  id: string
  gorev: string
  durum: Durum
  atanan: Atanan
  baslangic: string
  bitis: string
  aciklama: string
  link: string
}

const DURUM_STYLES: Record<Durum, { bg: string; color: string; border: string }> = {
  'Başlanmadı': { bg: '#44444422', color: '#aaa',     border: '#44444444' },
  'Devam Ediyor': { bg: '#7c6dfa22', color: '#7c6dfa', border: '#7c6dfa44' },
  'Bitti':        { bg: '#2dd4a022', color: '#2dd4a0', border: '#2dd4a044' },
  'Bekliyor':     { bg: '#f5a62322', color: '#f5a623', border: '#f5a62344' },
}

const EMPTY: Omit<Gorev, 'id'> = {
  gorev: '', durum: 'Başlanmadı', atanan: '', baslangic: '', bitis: '', aciklama: '', link: '',
}

export default function TakipPage() {
  const [rows, setRows] = useState<Gorev[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('gorevler')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setRows((data as Gorev[]) ?? [])
        setLoading(false)
      })
  }, [])

  async function updateField(id: string, field: keyof Omit<Gorev, 'id'>, value: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
    setSaving(id)
    await supabase.from('gorevler').update({ [field]: value || null }).eq('id', id)
    setSaving(null)
  }

  async function addRow() {
    const { data } = await supabase.from('gorevler').insert([EMPTY]).select().single()
    if (data) setRows((prev) => [...prev, data as Gorev])
  }

  async function deleteRow(id: string) {
    await supabase.from('gorevler').delete().eq('id', id)
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  const cell = 'padding:11px 12px;'
  const input = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#e8e8f0',
    fontSize: 13,
    width: '100%',
    fontFamily: 'system-ui, sans-serif',
  } as React.CSSProperties

  return (
    <div style={{ background: '#0f0f13', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e8e8f0' }}>
      <div style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Görev Takip Tablosu</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 3 }}>{rows.length} görev</div>
          </div>
          <button
            onClick={addRow}
            style={{ background: '#7c6dfa', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 600, padding: '8px 16px', cursor: 'pointer' }}
          >
            + Görev Ekle
          </button>
        </div>

        {loading ? (
          <div style={{ color: '#666', fontSize: 13, padding: '40px 0', textAlign: 'center' }}>Yükleniyor…</div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #2a2a38' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#1e1e28', borderBottom: '1px solid #2a2a38' }}>
                  {['Görev', 'Durum', 'Atanan', 'Başlangıç', 'Bitiş', 'Açıklama', 'Link', ''].map((h) => (
                    <th key={h} style={{ padding: '11px 12px', textAlign: 'left', color: '#666', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const ds = DURUM_STYLES[row.durum] ?? DURUM_STYLES['Başlanmadı']
                  return (
                    <tr key={row.id} style={{ borderBottom: '1px solid #1e1e28' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#ffffff04')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {/* Görev */}
                      <td style={{ padding: '11px 12px', minWidth: 180 }}>
                        <input
                          style={input}
                          value={row.gorev}
                          placeholder="Görev adı..."
                          onChange={(e) => updateField(row.id, 'gorev', e.target.value)}
                        />
                      </td>

                      {/* Durum */}
                      <td style={{ padding: '11px 12px', whiteSpace: 'nowrap' }}>
                        <select
                          value={row.durum}
                          onChange={(e) => updateField(row.id, 'durum', e.target.value)}
                          style={{ background: ds.bg, color: ds.color, border: `1px solid ${ds.border}`, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', outline: 'none' }}
                        >
                          {(['Başlanmadı', 'Devam Ediyor', 'Bitti', 'Bekliyor'] as Durum[]).map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </td>

                      {/* Atanan */}
                      <td style={{ padding: '11px 12px' }}>
                        <select
                          value={row.atanan}
                          onChange={(e) => updateField(row.id, 'atanan', e.target.value)}
                          style={{ background: '#1e1e28', color: '#ccc', border: '1px solid #2a2a38', borderRadius: 6, padding: '4px 8px', fontSize: 12, cursor: 'pointer', outline: 'none' }}
                        >
                          <option value="">—</option>
                          <option value="Umut">Umut</option>
                          <option value="Barış">Barış</option>
                        </select>
                      </td>

                      {/* Başlangıç */}
                      <td style={{ padding: '11px 12px' }}>
                        <input
                          type="date"
                          style={{ ...input, color: row.baslangic ? '#ccc' : '#555', width: 130 }}
                          value={row.baslangic ?? ''}
                          onChange={(e) => updateField(row.id, 'baslangic', e.target.value)}
                        />
                      </td>

                      {/* Bitiş */}
                      <td style={{ padding: '11px 12px' }}>
                        <input
                          type="date"
                          style={{ ...input, color: row.bitis ? '#ccc' : '#555', width: 130 }}
                          value={row.bitis ?? ''}
                          onChange={(e) => updateField(row.id, 'bitis', e.target.value)}
                        />
                      </td>

                      {/* Açıklama */}
                      <td style={{ padding: '11px 12px', minWidth: 200 }}>
                        <input
                          style={input}
                          value={row.aciklama ?? ''}
                          placeholder="Açıklama..."
                          onChange={(e) => updateField(row.id, 'aciklama', e.target.value)}
                        />
                      </td>

                      {/* Link */}
                      <td style={{ padding: '11px 12px', minWidth: 160 }}>
                        <input
                          style={{ ...input, color: row.link ? '#7c6dfa' : '#555' }}
                          value={row.link ?? ''}
                          placeholder="https://..."
                          onChange={(e) => updateField(row.id, 'link', e.target.value)}
                        />
                      </td>

                      {/* Sil */}
                      <td style={{ padding: '11px 12px' }}>
                        <button
                          onClick={() => deleteRow(row.id)}
                          title="Sil"
                          style={{ background: 'none', border: 'none', color: saving === row.id ? '#7c6dfa' : '#444', cursor: 'pointer', fontSize: 14, padding: '2px 6px' }}
                        >
                          {saving === row.id ? '●' : '✕'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#555', fontSize: 13 }}>
                      Henüz görev yok. "+ Görev Ekle" ile başlayın.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
