'use client'

import { useEffect, useMemo, useState } from 'react'
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import AccordionCard from '../ui/AccordionCard'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import {
  MVP_LEVELS,
  MVP_AUTHORS,
  createEmptyMvpFormState,
  mapMvpRow,
  type MvpFormState,
  type MvpItem,
  type MvpItemRow,
  type MvpLevel,
} from '@/lib/mvp-items'

const MVP_COLORS: Record<string, string> = {
  MVP1: '#E53935',
  MVP2: '#FB8C00',
  MVP3: '#1A6DC2',
  Atanmadi: '#888888',
}

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

const BTN_CLS =
  'inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all disabled:opacity-60'

export default function MvpManager() {
  const [items, setItems] = useState<MvpItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formState, setFormState] = useState<MvpFormState>(createEmptyMvpFormState)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingState, setEditingState] = useState<MvpFormState>(createEmptyMvpFormState)

  const supabase = getSupabaseBrowserClient()
  const isEditing = editingId !== null

  const mvp1Items = useMemo(() => items.filter((i) => i.mvpLevel === 'MVP1'), [items])
  const mvp2Items = useMemo(() => items.filter((i) => i.mvpLevel === 'MVP2'), [items])
  const mvp3Items = useMemo(() => items.filter((i) => i.mvpLevel === 'MVP3'), [items])

  useEffect(() => {
    void loadItems()
  }, [])

  async function loadItems() {
    if (!supabase) {
      setError('Supabase bağlantısı yapılandırılmamış.')
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('mvp_items')
        .select('id, konu, sub, ayrinti, mvp_level, added_by, is_seed, created_at, updated_at')
        .order('created_at', { ascending: false })
      if (fetchErr) throw fetchErr
      setItems((data as MvpItemRow[]).map(mapMvpRow))
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'MVP listesi yüklenemedi.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return
    setIsSubmitting(true)
    setError(null)
    try {
      const insertPayload = {
        konu: formState.konu,
        sub: formState.sub.trim() || null,
        ayrinti: formState.ayrinti.trim() || null,
        mvp_level: formState.mvpLevel,
        added_by: formState.addedBy,
      }
      const { data, error: insertErr } = await supabase
        .from('mvp_items')
        .insert(insertPayload)
        .select('id, konu, sub, ayrinti, mvp_level, added_by, is_seed, created_at, updated_at')
        .single()
      if (insertErr || !data) throw insertErr ?? new Error('Madde eklenemedi.')
      setItems((prev) => [mapMvpRow(data as MvpItemRow), ...prev])
      setFormState(createEmptyMvpFormState())
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Madde eklenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function startEdit(item: MvpItem) {
    setEditingId(item.id)
    setEditingState({
      konu: item.konu,
      sub: item.sub ?? '',
      ayrinti: item.ayrinti ?? '',
      mvpLevel: item.mvpLevel,
      addedBy: item.addedBy,
    })
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingState(createEmptyMvpFormState())
  }

  async function handleInlineUpdate(itemId: string, field: 'mvp_level' | 'added_by', value: string) {
    if (!supabase) return
    try {
      const { data, error: updateErr } = await supabase
        .from('mvp_items')
        .update({ [field]: value })
        .eq('id', itemId)
        .select('id, konu, sub, ayrinti, mvp_level, added_by, is_seed, created_at, updated_at')
        .single()
      if (updateErr || !data) throw updateErr
      setItems((prev) => prev.map((i) => (i.id === itemId ? mapMvpRow(data as MvpItemRow) : i)))
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Güncellenemedi.')
    }
  }

  async function handleUpdate(itemId: string) {
    if (!supabase) return
    setIsSubmitting(true)
    setError(null)
    try {
      const updatePayload = {
        konu: editingState.konu,
        sub: editingState.sub.trim() || null,
        ayrinti: editingState.ayrinti.trim() || null,
        mvp_level: editingState.mvpLevel,
        added_by: editingState.addedBy,
      }
      const { data, error: updateErr } = await supabase
        .from('mvp_items')
        .update(updatePayload)
        .eq('id', itemId)
        .select('id, konu, sub, ayrinti, mvp_level, added_by, is_seed, created_at, updated_at')
        .single()
      if (updateErr || !data) throw updateErr ?? new Error('Madde güncellenemedi.')
      setItems((prev) => prev.map((i) => (i.id === itemId ? mapMvpRow(data as MvpItemRow) : i)))
      cancelEdit()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Madde güncellenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(itemId: string) {
    if (!supabase) return
    if (typeof window !== 'undefined' && !window.confirm('Bu madde silinsin mi?')) return
    setIsSubmitting(true)
    setError(null)
    try {
      const { error: deleteErr } = await supabase.from('mvp_items').delete().eq('id', itemId)
      if (deleteErr) throw deleteErr
      setItems((prev) => prev.filter((i) => i.id !== itemId))
      if (editingId === itemId) cancelEdit()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Madde silinemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="space-y-6" aria-labelledby="mvp-manager-heading">
      <div className="space-y-2">
        <h2 id="mvp-manager-heading" className="text-xl font-semibold text-gray-900">
          MVP Yapısal Liste
        </h2>
        <p className="max-w-3xl text-sm text-gray-500">
          Maddeleri ekleyin, MVP seviyesi ve sorumlu atayın, düzenleyin veya silin.
        </p>
      </div>

      {!isLoading && (
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">MVP Kartları</p>
          <AccordionCard
            items={[
              {
                id: 'mvp1-card',
                title: 'MVP1',
                badge: `${mvp1Items.length} madde`,
                accentColor: MVP_COLORS.MVP1,
                children: mvp1Items.length === 0 ? (
                  <p className="text-sm italic text-gray-400">Henüz MVP1 maddesi yok.</p>
                ) : (
                  <ul className="divide-y divide-[rgba(66,133,244,0.06)]">
                    {mvp1Items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span className="font-medium text-gray-900">{item.konu}</span>
                        <span className="text-xs text-gray-400">{item.ayrinti ?? ''}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                id: 'mvp2-card',
                title: 'MVP2',
                badge: `${mvp2Items.length} madde`,
                accentColor: MVP_COLORS.MVP2,
                children: mvp2Items.length === 0 ? (
                  <p className="text-sm italic text-gray-400">Henüz MVP2 maddesi yok.</p>
                ) : (
                  <ul className="divide-y divide-[rgba(66,133,244,0.06)]">
                    {mvp2Items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span className="font-medium text-gray-900">{item.konu}</span>
                        <span className="text-xs text-gray-400">{item.ayrinti ?? ''}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                id: 'mvp3-card',
                title: 'MVP3',
                badge: `${mvp3Items.length} madde`,
                accentColor: MVP_COLORS.MVP3,
                children: mvp3Items.length === 0 ? (
                  <p className="text-sm italic text-gray-400">Henüz MVP3 maddesi yok.</p>
                ) : (
                  <ul className="divide-y divide-[rgba(66,133,244,0.06)]">
                    {mvp3Items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span className="font-medium text-gray-900">{item.konu}</span>
                        <span className="text-xs text-gray-400">{item.ayrinti ?? ''}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-8 text-center text-sm text-gray-400">Yükleniyor…</div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">Henüz madde yok.</div>
        ) : (
          <>
            <div className="hidden overflow-x-auto rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)] md:block">
              <table className="min-w-full divide-y divide-gray-50 text-sm">
                <thead className="bg-gray-50/80">
                  <tr>
                    {['Konu', 'Sub', 'Ayrıntı', 'MVP', 'Kim', 'İşlemler'].map((col) => (
                      <th key={col} scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500 first:pl-6 last:pr-6">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((item) => {
                    const rowIsEditing = editingId === item.id
                    return (
                      <tr key={item.id} className="align-top transition-colors hover:bg-[rgba(66,133,244,0.03)]">
                        <td className="pl-6 pr-4 py-3.5 font-medium text-gray-900">
                          {rowIsEditing ? <input type="text" value={editingState.konu} onChange={(e) => setEditingState((s) => ({ ...s, konu: e.target.value }))} className={INPUT_CLS} /> : item.konu}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600">
                          {rowIsEditing ? <input type="text" value={editingState.sub} onChange={(e) => setEditingState((s) => ({ ...s, sub: e.target.value }))} className={INPUT_CLS} /> : (item.sub ?? <span className="text-gray-300">—</span>)}
                        </td>
                        <td className="max-w-xs px-4 py-3.5 text-gray-600">
                          {rowIsEditing ? <input type="text" value={editingState.ayrinti} onChange={(e) => setEditingState((s) => ({ ...s, ayrinti: e.target.value }))} className={INPUT_CLS} /> : (item.ayrinti ?? <span className="text-gray-300">—</span>)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          {rowIsEditing ? (
                            <select value={editingState.mvpLevel} onChange={(e) => setEditingState((s) => ({ ...s, mvpLevel: e.target.value as MvpFormState['mvpLevel'] }))} className={INPUT_CLS}>
                              {MVP_LEVELS.map((l) => (<option key={l} value={l}>{l}</option>))}
                            </select>
                          ) : (
                            <select value={item.mvpLevel} onChange={(e) => void handleInlineUpdate(item.id, 'mvp_level', e.target.value)} className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-semibold" style={{ color: MVP_COLORS[item.mvpLevel] }}>
                              {MVP_LEVELS.map((l) => (<option key={l} value={l}>{l}</option>))}
                            </select>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          {rowIsEditing ? (
                            <select value={editingState.addedBy} onChange={(e) => setEditingState((s) => ({ ...s, addedBy: e.target.value as MvpFormState['addedBy'] }))} className={INPUT_CLS}>
                              {MVP_AUTHORS.map((a) => (<option key={a} value={a}>{a}</option>))}
                            </select>
                          ) : (
                            <select value={item.addedBy} onChange={(e) => void handleInlineUpdate(item.id, 'added_by', e.target.value)} className="rounded-lg border border-gray-200 px-2 py-1 text-xs">
                              {MVP_AUTHORS.map((a) => (<option key={a} value={a}>{a}</option>))}
                            </select>
                          )}
                        </td>
                        <td className="px-4 py-3.5 last:pr-6">
                          <div className="flex flex-wrap items-center gap-2">
                            {rowIsEditing ? (
                              <>
                                <button type="button" onClick={() => void handleUpdate(item.id)} disabled={isSubmitting} className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}><Save size={14} /> Kaydet</button>
                                <button type="button" onClick={cancelEdit} disabled={isSubmitting} className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}><X size={14} /> İptal</button>
                              </>
                            ) : (
                              <button type="button" onClick={() => startEdit(item)} disabled={isSubmitting || isEditing} className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}><Pencil size={14} /> Düzenle</button>
                            )}
                            <button type="button" onClick={() => void handleDelete(item.id)} disabled={isSubmitting} className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}><Trash2 size={14} /> Sil</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {items.map((item) => {
                const rowIsEditing = editingId === item.id
                return (
                  <div key={item.id} className="space-y-3 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 shadow-[0_10px_20px_rgba(60,64,67,0.04)]">
                    {rowIsEditing ? (
                      <div className="space-y-3">
                        <input type="text" value={editingState.konu} onChange={(e) => setEditingState((s) => ({ ...s, konu: e.target.value }))} className={INPUT_CLS} placeholder="Konu" />
                        <input type="text" value={editingState.sub} onChange={(e) => setEditingState((s) => ({ ...s, sub: e.target.value }))} className={INPUT_CLS} placeholder="Sub" />
                        <input type="text" value={editingState.ayrinti} onChange={(e) => setEditingState((s) => ({ ...s, ayrinti: e.target.value }))} className={INPUT_CLS} placeholder="Ayrıntı" />
                        <div className="grid grid-cols-2 gap-3">
                          <select value={editingState.mvpLevel} onChange={(e) => setEditingState((s) => ({ ...s, mvpLevel: e.target.value as MvpFormState['mvpLevel'] }))} className={INPUT_CLS}>{MVP_LEVELS.map((l) => (<option key={l} value={l}>{l}</option>))}</select>
                          <select value={editingState.addedBy} onChange={(e) => setEditingState((s) => ({ ...s, addedBy: e.target.value as MvpFormState['addedBy'] }))} className={INPUT_CLS}>{MVP_AUTHORS.map((a) => (<option key={a} value={a}>{a}</option>))}</select>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <h3 className="text-base font-semibold text-gray-900">{item.konu}</h3>
                          {item.sub && <p className="text-xs text-gray-400">{item.sub}</p>}
                          <p className="text-sm text-gray-500">{item.ayrinti ?? 'Ayrıntı yok'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="space-y-1 rounded-xl border border-[rgba(66,133,244,0.08)] bg-gray-50/50 px-3 py-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">MVP</p>
                            <select value={item.mvpLevel} onChange={(e) => void handleInlineUpdate(item.id, 'mvp_level', e.target.value)} className="w-full rounded border border-gray-200 px-2 py-1 text-xs font-semibold" style={{ color: MVP_COLORS[item.mvpLevel] }}>
                              {MVP_LEVELS.map((l) => (<option key={l} value={l}>{l}</option>))}
                            </select>
                          </div>
                          <div className="space-y-1 rounded-xl border border-[rgba(66,133,244,0.08)] bg-gray-50/50 px-3 py-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">Kim</p>
                            <select value={item.addedBy} onChange={(e) => void handleInlineUpdate(item.id, 'added_by', e.target.value)} className="w-full rounded border border-gray-200 px-2 py-1 text-xs">
                              {MVP_AUTHORS.map((a) => (<option key={a} value={a}>{a}</option>))}
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      {rowIsEditing ? (
                        <>
                          <button type="button" onClick={() => void handleUpdate(item.id)} disabled={isSubmitting} className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}><Save size={14} /> Kaydet</button>
                          <button type="button" onClick={cancelEdit} disabled={isSubmitting} className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}><X size={14} /> İptal</button>
                        </>
                      ) : (
                        <button type="button" onClick={() => startEdit(item)} disabled={isSubmitting || isEditing} className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}><Pencil size={14} /> Düzenle</button>
                      )}
                      <button type="button" onClick={() => void handleDelete(item.id)} disabled={isSubmitting} className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}><Trash2 size={14} /> Sil</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {!isLoading && (
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">MVP Kartları</p>
          <AccordionCard
            items={[
              {
                id: 'mvp1-card',
                title: 'MVP1',
                badge: `${mvp1Items.length} madde`,
                accentColor: MVP_COLORS.MVP1,
                children: mvp1Items.length === 0 ? (
                  <p className="text-sm italic text-gray-400">Henüz MVP1 maddesi yok.</p>
                ) : (
                  <ul className="divide-y divide-[rgba(66,133,244,0.06)]">
                    {mvp1Items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span className="font-medium text-gray-900">{item.konu}</span>
                        <span className="text-xs text-gray-400">{item.ayrinti ?? ''}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                id: 'mvp2-card',
                title: 'MVP2',
                badge: `${mvp2Items.length} madde`,
                accentColor: MVP_COLORS.MVP2,
                children: mvp2Items.length === 0 ? (
                  <p className="text-sm italic text-gray-400">Henüz MVP2 maddesi yok.</p>
                ) : (
                  <ul className="divide-y divide-[rgba(66,133,244,0.06)]">
                    {mvp2Items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span className="font-medium text-gray-900">{item.konu}</span>
                        <span className="text-xs text-gray-400">{item.ayrinti ?? ''}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                id: 'mvp3-card',
                title: 'MVP3',
                badge: `${mvp3Items.length} madde`,
                accentColor: MVP_COLORS.MVP3,
                children: mvp3Items.length === 0 ? (
                  <p className="text-sm italic text-gray-400">Henüz MVP3 maddesi yok.</p>
                ) : (
                  <ul className="divide-y divide-[rgba(66,133,244,0.06)]">
                    {mvp3Items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span className="font-medium text-gray-900">{item.konu}</span>
                        <span className="text-xs text-gray-400">{item.ayrinti ?? ''}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </div>
      )}
    </section>
  )
}
