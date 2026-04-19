'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import AccordionCard from '../ui/AccordionCard'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import {
  LINK_AUTHORS,
  LINK_TYPES,
  createEmptyLinkFormState,
  mapLinkRow,
  type LinkFormState,
  type LinkItem,
  type LinkItemRow,
} from '@/lib/link-items'

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

const BTN_CLS =
  'inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all disabled:opacity-60'

export default function LinkManager() {
  const [links, setLinks] = useState<LinkItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formState, setFormState] = useState<LinkFormState>(createEmptyLinkFormState)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingState, setEditingState] = useState<LinkFormState>(createEmptyLinkFormState)

  const supabase = getSupabaseBrowserClient()
  const isEditing = editingId !== null

  useEffect(() => {
    void loadLinks()
  }, [])

  async function loadLinks() {
    if (!supabase) {
      setError('Supabase bağlantısı yapılandırılmamış.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, error: fetchErr } = await supabase
        .from('links')
        .select('id, added_by, type, description, link, created_at')
        .order('created_at', { ascending: false })

      if (fetchErr) throw fetchErr

      setLinks((data as LinkItemRow[]).map(mapLinkRow))
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Linkler yüklenemedi.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) {
      setError('Supabase bağlantısı yapılandırılmamış.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const insertPayload = {
        added_by: formState.addedBy,
        type: formState.type,
        description: formState.description.trim() || null,
        link: formState.link.trim() || null,
      }

      const { data, error: insertErr } = await supabase
        .from('links')
        .insert(insertPayload)
        .select('id, added_by, type, description, link, created_at')
        .single()

      if (insertErr || !data) throw insertErr ?? new Error('Link eklenemedi.')

      setLinks((prev) => [mapLinkRow(data as LinkItemRow), ...prev])
      setFormState(createEmptyLinkFormState())
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Link eklenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function startEdit(item: LinkItem) {
    setEditingId(item.id)
    setEditingState({
      addedBy: item.addedBy,
      type: item.type,
      description: item.description ?? '',
      link: item.link ?? '',
    })
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingState(createEmptyLinkFormState())
  }

  async function handleUpdate(itemId: string) {
    if (!supabase) return

    setIsSubmitting(true)
    setError(null)

    try {
      const updatePayload = {
        added_by: editingState.addedBy,
        type: editingState.type,
        description: editingState.description.trim() || null,
        link: editingState.link.trim() || null,
      }

      const { data, error: updateErr } = await supabase
        .from('links')
        .update(updatePayload)
        .eq('id', itemId)
        .select('id, added_by, type, description, link, created_at')
        .single()

      if (updateErr || !data) throw updateErr ?? new Error('Link güncellenemedi.')

      setLinks((prev) => prev.map((l) => (l.id === itemId ? mapLinkRow(data as LinkItemRow) : l)))
      cancelEdit()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Link güncellenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(itemId: string) {
    if (!supabase) return
    if (typeof window !== 'undefined' && !window.confirm('Bu link silinsin mi?')) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { error: deleteErr } = await supabase.from('links').delete().eq('id', itemId)
      if (deleteErr) throw deleteErr

      setLinks((prev) => prev.filter((l) => l.id !== itemId))
      if (editingId === itemId) cancelEdit()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Link silinemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="space-y-6" aria-labelledby="link-manager-heading">
      <div className="space-y-2">
        <h2 id="link-manager-heading" className="text-xl font-semibold text-gray-900">
          Linkler ve Dosyalar
        </h2>
        <p className="max-w-3xl text-sm text-gray-500">
          Yeni kayıt ekle, mevcut dosya ve linkleri güncelle veya sil.
        </p>
      </div>

      <AccordionCard
        defaultOpenId="new-link"
        items={[
          {
            id: 'new-link',
            title: 'Yeni Link Ekle',
            accentColor: '#1A6DC2',
            children: (
              <form
                onSubmit={handleCreate}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2"
              >
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Kim Ekledi
                  </span>
                  <select
                    value={formState.addedBy}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        addedBy: e.target.value as LinkFormState['addedBy'],
                      }))
                    }
                    className={INPUT_CLS}
                  >
                    {LINK_AUTHORS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Tür
                  </span>
                  <select
                    value={formState.type}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        type: e.target.value as LinkFormState['type'],
                      }))
                    }
                    className={INPUT_CLS}
                  >
                    {LINK_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Açıklama
                  </span>
                  <input
                    type="text"
                    value={formState.description}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, description: e.target.value }))
                    }
                    placeholder="Link açıklaması"
                    className={INPUT_CLS}
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Link URL
                  </span>
                  <input
                    type="url"
                    value={formState.link}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, link: e.target.value }))
                    }
                    placeholder="https://..."
                    className={INPUT_CLS}
                    required
                  />
                </label>

                <div className="flex items-end sm:col-span-2 lg:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-60"
                  >
                    <Plus size={16} className="mr-1 inline" aria-hidden="true" />
                    {isSubmitting ? 'Kaydediliyor...' : 'Yeni ekle'}
                  </button>
                </div>
              </form>
            ),
          },
        ]}
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-8 text-center text-sm text-gray-400">
            Yükleniyor…
          </div>
        ) : links.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Henüz link yok. Yukarıdaki formu kullanarak ilk linki ekleyin.
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)] md:block">
              <table className="min-w-full divide-y divide-gray-50 text-sm">
                <thead className="bg-gray-50/80">
                  <tr>
                    {['Kim Ekledi', 'Tür', 'Açıklama', 'Link', 'İşlemler'].map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500 first:pl-6 last:pr-6"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {links.map((item) => {
                    const rowIsEditing = editingId === item.id
                    return (
                      <tr
                        key={item.id}
                        className="align-middle transition-colors hover:bg-[rgba(66,133,244,0.03)]"
                      >
                        <td className="pl-6 pr-4 py-3.5 text-gray-600">
                          {rowIsEditing ? (
                            <select
                              value={editingState.addedBy}
                              onChange={(e) =>
                                setEditingState((s) => ({
                                  ...s,
                                  addedBy: e.target.value as LinkFormState['addedBy'],
                                }))
                              }
                              className={INPUT_CLS}
                            >
                              {LINK_AUTHORS.map((a) => (
                                <option key={a} value={a}>
                                  {a}
                                </option>
                              ))}
                            </select>
                          ) : (
                            item.addedBy
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600">
                          {rowIsEditing ? (
                            <select
                              value={editingState.type}
                              onChange={(e) =>
                                setEditingState((s) => ({
                                  ...s,
                                  type: e.target.value as LinkFormState['type'],
                                }))
                              }
                              className={INPUT_CLS}
                            >
                              {LINK_TYPES.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          ) : (
                            item.type
                          )}
                        </td>
                        <td className="max-w-sm px-4 py-3.5 text-gray-600">
                          {rowIsEditing ? (
                            <input
                              type="text"
                              value={editingState.description}
                              onChange={(e) =>
                                setEditingState((s) => ({ ...s, description: e.target.value }))
                              }
                              className={INPUT_CLS}
                            />
                          ) : (
                            item.description ?? <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="max-w-xs px-4 py-3.5">
                          {rowIsEditing ? (
                            <input
                              type="url"
                              value={editingState.link}
                              onChange={(e) =>
                                setEditingState((s) => ({ ...s, link: e.target.value }))
                              }
                              className={INPUT_CLS}
                            />
                          ) : item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                            >
                              <ExternalLink size={14} aria-hidden="true" />
                              Link
                            </a>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 last:pr-6">
                          <div className="flex flex-nowrap items-center gap-2">
                            {rowIsEditing ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => void handleUpdate(item.id)}
                                  disabled={isSubmitting}
                                  className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}
                                >
                                  <Save size={14} aria-hidden="true" />
                                  Kaydet
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  disabled={isSubmitting}
                                  className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                                >
                                  <X size={14} aria-hidden="true" />
                                  İptal
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => startEdit(item)}
                                disabled={isSubmitting || isEditing}
                                className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                              >
                                <Pencil size={14} aria-hidden="true" />
                                Düzenle
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => void handleDelete(item.id)}
                              disabled={isSubmitting}
                              className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}
                            >
                              <Trash2 size={14} aria-hidden="true" />
                              Sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {links.map((item) => {
                const rowIsEditing = editingId === item.id
                return (
                  <div
                    key={item.id}
                    className="space-y-3 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 shadow-[0_10px_20px_rgba(60,64,67,0.04)]"
                  >
                    {rowIsEditing ? (
                      <div className="space-y-3">
                        <select
                          value={editingState.addedBy}
                          onChange={(e) =>
                            setEditingState((s) => ({
                              ...s,
                              addedBy: e.target.value as LinkFormState['addedBy'],
                            }))
                          }
                          className={INPUT_CLS}
                        >
                          {LINK_AUTHORS.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </select>
                        <select
                          value={editingState.type}
                          onChange={(e) =>
                            setEditingState((s) => ({
                              ...s,
                              type: e.target.value as LinkFormState['type'],
                            }))
                          }
                          className={INPUT_CLS}
                        >
                          {LINK_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={editingState.description}
                          onChange={(e) =>
                            setEditingState((s) => ({ ...s, description: e.target.value }))
                          }
                          placeholder="Açıklama"
                          className={INPUT_CLS}
                        />
                        <input
                          type="url"
                          value={editingState.link}
                          onChange={(e) =>
                            setEditingState((s) => ({ ...s, link: e.target.value }))
                          }
                          placeholder="Link URL"
                          className={INPUT_CLS}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">{item.addedBy}</p>
                          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">
                            {item.type}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.description ?? 'Açıklama yok'}
                          </p>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                            >
                              <ExternalLink size={14} aria-hidden="true" />
                              Linki Aç
                            </a>
                          )}
                        </div>
                      </>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      {rowIsEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={() => void handleUpdate(item.id)}
                            disabled={isSubmitting}
                            className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}
                          >
                            <Save size={14} aria-hidden="true" />
                            Kaydet
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            disabled={isSubmitting}
                            className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                          >
                            <X size={14} aria-hidden="true" />
                            İptal
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEdit(item)}
                          disabled={isSubmitting || isEditing}
                          className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                        >
                          <Pencil size={14} aria-hidden="true" />
                          Düzenle
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => void handleDelete(item.id)}
                        disabled={isSubmitting}
                        className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                        Sil
                      </button>
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
