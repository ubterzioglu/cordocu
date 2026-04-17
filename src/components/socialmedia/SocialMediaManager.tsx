'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import AccordionCard from '../ui/AccordionCard'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import {
  SOCIAL_PLATFORMS,
  SOCIAL_AUTHORS,
  createEmptySocialMediaFormState,
  mapSocialMediaRow,
  type SocialMediaFormState,
  type SocialMediaItem,
  type SocialMediaItemRow,
} from '@/lib/social-media-items'

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

const BTN_CLS =
  'inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all disabled:opacity-60'

export default function SocialMediaManager() {
  const [items, setItems] = useState<SocialMediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formState, setFormState] = useState<SocialMediaFormState>(createEmptySocialMediaFormState)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingState, setEditingState] = useState<SocialMediaFormState>(createEmptySocialMediaFormState)

  const supabase = getSupabaseBrowserClient()
  const isEditing = editingId !== null

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
        .from('social_media_links')
        .select('id, platform, description, link, added_by, created_at')
        .order('created_at', { ascending: false })
      if (fetchErr) throw fetchErr
      setItems((data as SocialMediaItemRow[]).map(mapSocialMediaRow))
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Sosyal medya linkleri yüklenemedi.')
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
        platform: formState.platform,
        description: formState.description.trim() || null,
        link: formState.link.trim() || null,
        added_by: formState.addedBy,
      }
      const { data, error: insertErr } = await supabase
        .from('social_media_links')
        .insert(insertPayload)
        .select('id, platform, description, link, added_by, created_at')
        .single()
      if (insertErr || !data) throw insertErr ?? new Error('Eklenemedi.')
      setItems((prev) => [mapSocialMediaRow(data as SocialMediaItemRow), ...prev])
      setFormState(createEmptySocialMediaFormState())
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Eklenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function startEdit(item: SocialMediaItem) {
    setEditingId(item.id)
    setEditingState({
      platform: item.platform,
      description: item.description ?? '',
      link: item.link ?? '',
      addedBy: item.addedBy,
    })
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingState(createEmptySocialMediaFormState())
  }

  async function handleUpdate(itemId: string) {
    if (!supabase) return
    setIsSubmitting(true)
    setError(null)
    try {
      const updatePayload = {
        platform: editingState.platform,
        description: editingState.description.trim() || null,
        link: editingState.link.trim() || null,
        added_by: editingState.addedBy,
      }
      const { data, error: updateErr } = await supabase
        .from('social_media_links')
        .update(updatePayload)
        .eq('id', itemId)
        .select('id, platform, description, link, added_by, created_at')
        .single()
      if (updateErr || !data) throw updateErr ?? new Error('Güncellenemedi.')
      setItems((prev) => prev.map((i) => (i.id === itemId ? mapSocialMediaRow(data as SocialMediaItemRow) : i)))
      cancelEdit()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Güncellenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(itemId: string) {
    if (!supabase) return
    if (typeof window !== 'undefined' && !window.confirm('Bu kayıt silinsin mi?')) return
    setIsSubmitting(true)
    setError(null)
    try {
      const { error: deleteErr } = await supabase.from('social_media_links').delete().eq('id', itemId)
      if (deleteErr) throw deleteErr
      setItems((prev) => prev.filter((i) => i.id !== itemId))
      if (editingId === itemId) cancelEdit()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Silinemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="space-y-6" aria-labelledby="social-media-manager-heading">
      <AccordionCard
        defaultOpenId="new-social"
        items={[{
          id: 'new-social',
          title: 'Yeni Link Ekle',
          accentColor: '#E1306C',
          children: (
            <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[0.8fr_1.2fr_1fr_0.6fr]">
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Platform</span>
                <select value={formState.platform} onChange={(e) => setFormState((s) => ({ ...s, platform: e.target.value as SocialMediaFormState['platform'] }))} className={INPUT_CLS}>
                  {SOCIAL_PLATFORMS.map((p) => (<option key={p} value={p}>{p}</option>))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Açıklama</span>
                <input type="text" value={formState.description} onChange={(e) => setFormState((s) => ({ ...s, description: e.target.value }))} placeholder="Açıklama" className={INPUT_CLS} />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Link URL</span>
                <input type="url" value={formState.link} onChange={(e) => setFormState((s) => ({ ...s, link: e.target.value }))} placeholder="https://..." className={INPUT_CLS} required />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Kim Ekledi</span>
                <select value={formState.addedBy} onChange={(e) => setFormState((s) => ({ ...s, addedBy: e.target.value as SocialMediaFormState['addedBy'] }))} className={INPUT_CLS}>
                  {SOCIAL_AUTHORS.map((a) => (<option key={a} value={a}>{a}</option>))}
                </select>
              </label>
              <div className="flex items-end sm:col-span-2 lg:col-span-4">
                <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-60">
                  <Plus size={16} className="mr-1 inline" aria-hidden="true" />
                  {isSubmitting ? 'Kaydediliyor...' : 'Yeni ekle'}
                </button>
              </div>
            </form>
          ),
        }]}
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-8 text-center text-sm text-gray-400">Yükleniyor…</div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">Henüz kayıt yok.</div>
        ) : (
          <>
            <div className="hidden overflow-x-auto rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)] md:block">
              <table className="min-w-full divide-y divide-gray-50 text-sm">
                <thead className="bg-gray-50/80">
                  <tr>
                    {['Platform', 'Açıklama', 'Link', 'Kim', 'İşlemler'].map((col) => (
                      <th key={col} scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500 first:pl-6 last:pr-6">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((item) => {
                    const rowIsEditing = editingId === item.id
                    return (
                      <tr key={item.id} className="align-middle transition-colors hover:bg-[rgba(66,133,244,0.03)]">
                        <td className="pl-6 pr-4 py-3.5 font-medium text-gray-900">
                          {rowIsEditing ? (
                            <select value={editingState.platform} onChange={(e) => setEditingState((s) => ({ ...s, platform: e.target.value as SocialMediaFormState['platform'] }))} className={INPUT_CLS}>
                              {SOCIAL_PLATFORMS.map((p) => (<option key={p} value={p}>{p}</option>))}
                            </select>
                          ) : item.platform}
                        </td>
                        <td className="max-w-sm px-4 py-3.5 text-gray-600">
                          {rowIsEditing ? <input type="text" value={editingState.description} onChange={(e) => setEditingState((s) => ({ ...s, description: e.target.value }))} className={INPUT_CLS} /> : (item.description ?? <span className="text-gray-300">—</span>)}
                        </td>
                        <td className="max-w-xs px-4 py-3.5">
                          {rowIsEditing ? <input type="url" value={editingState.link} onChange={(e) => setEditingState((s) => ({ ...s, link: e.target.value }))} className={INPUT_CLS} /> : item.link ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"><ExternalLink size={14} /> Link</a>
                          ) : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600">
                          {rowIsEditing ? (
                            <select value={editingState.addedBy} onChange={(e) => setEditingState((s) => ({ ...s, addedBy: e.target.value as SocialMediaFormState['addedBy'] }))} className={INPUT_CLS}>
                              {SOCIAL_AUTHORS.map((a) => (<option key={a} value={a}>{a}</option>))}
                            </select>
                          ) : item.addedBy}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 last:pr-6">
                          <div className="flex flex-nowrap items-center gap-2">
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
                        <select value={editingState.platform} onChange={(e) => setEditingState((s) => ({ ...s, platform: e.target.value as SocialMediaFormState['platform'] }))} className={INPUT_CLS}>{SOCIAL_PLATFORMS.map((p) => (<option key={p} value={p}>{p}</option>))}</select>
                        <input type="text" value={editingState.description} onChange={(e) => setEditingState((s) => ({ ...s, description: e.target.value }))} placeholder="Açıklama" className={INPUT_CLS} />
                        <input type="url" value={editingState.link} onChange={(e) => setEditingState((s) => ({ ...s, link: e.target.value }))} placeholder="Link URL" className={INPUT_CLS} />
                        <select value={editingState.addedBy} onChange={(e) => setEditingState((s) => ({ ...s, addedBy: e.target.value as SocialMediaFormState['addedBy'] }))} className={INPUT_CLS}>{SOCIAL_AUTHORS.map((a) => (<option key={a} value={a}>{a}</option>))}</select>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-gray-400">{item.platform}</p>
                        <p className="text-sm text-gray-600">{item.description ?? 'Açıklama yok'}</p>
                        {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"><ExternalLink size={14} /> Linki Aç</a>}
                        <p className="text-xs text-gray-400">Ekleyen: {item.addedBy}</p>
                      </div>
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
    </section>
  )
}
