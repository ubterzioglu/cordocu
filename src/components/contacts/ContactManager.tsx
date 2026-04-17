'use client'

import { useEffect, useMemo, useState } from 'react'
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import {
  createEmptyContactFormState,
  toContactFormState,
  type ContactFormState,
  type ContactItem,
  mapContactRow,
} from '@/lib/contact-items'
import {
  CompactField,
  CompactSelect,
  CompactTextarea,
  EditableCell,
  EditableSelectCell,
  InfoPair,
} from './ContactFieldComponents'

const DURUM_DM_OPTIONS = ['', 'Aranacak', 'Arandı', 'Mail Atılacak', 'Mail Atıldı'] as const
const DURUM_CUSTOMER_OPTIONS = ['', 'Cevap Yok', 'Cevap Geldi'] as const
const SORUMLU_OPTIONS = ['', 'UBT', 'Burak'] as const

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

export default function ContactManager() {
  const [contacts, setContacts] = useState<ContactItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formState, setFormState] = useState<ContactFormState>(
    createEmptyContactFormState
  )
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingState, setEditingState] = useState<ContactFormState>(
    createEmptyContactFormState
  )

  const supabase = getSupabaseBrowserClient()

  const isEditing = useMemo(() => editingId !== null, [editingId])

  useEffect(() => {
    void loadContacts()
  }, [])

  async function loadContacts() {
    if (!supabase) {
      setError('Supabase bağlantısı yapılandırılmamış.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, error: fetchErr } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchErr) {
        throw fetchErr
      }

      setContacts((data || []).map(mapContactRow))
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : 'Contact listesi yüklenemedi.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!supabase) {
      setError('Supabase bağlantısı yapılandırılmamış.')
      return
    }

    try {
      const insertPayload = {
        contact: formState.contact.trim(),
        telefon: formState.telefon.trim() || null,
        websitesi: formState.websitesi.trim() || null,
        tur: formState.tur.trim() || null,
        sorumlu: formState.sorumlu.trim() || null,
        durum_dm: formState.durum_dm || null,
        durum_customer: formState.durum_customer || null,
        yorumlar: formState.yorumlar.trim() || null,
      }

      const { data, error: insertErr } = await supabase
        .from('contacts')
        .insert(insertPayload)
        .select('*')
        .single()

      if (insertErr || !data) {
        throw insertErr ?? new Error('Contact eklenemedi.')
      }

      setContacts((prev) => [mapContactRow(data), ...prev])
      setFormState(createEmptyContactFormState())
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Contact eklenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function startEdit(contact: ContactItem) {
    setEditingId(contact.id)
    setEditingState(toContactFormState(contact))
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingState(createEmptyContactFormState())
  }

  async function handleUpdate(contactId: string) {
    if (!supabase) return

    setIsSubmitting(true)
    setError(null)

    try {
      const updatePayload = {
        contact: editingState.contact.trim(),
        telefon: editingState.telefon.trim() || null,
        websitesi: editingState.websitesi.trim() || null,
        tur: editingState.tur.trim() || null,
        sorumlu: editingState.sorumlu.trim() || null,
        durum_dm: editingState.durum_dm || null,
        durum_customer: editingState.durum_customer || null,
        yorumlar: editingState.yorumlar.trim() || null,
      }

      const { data, error: updateErr } = await supabase
        .from('contacts')
        .update(updatePayload)
        .eq('id', contactId)
        .select('*')
        .single()

      if (updateErr || !data) {
        throw updateErr ?? new Error('Contact güncellenemedi.')
      }

      setContacts((prev) =>
        prev.map((c) => (c.id === contactId ? mapContactRow(data) : c))
      )
      cancelEdit()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Contact güncellenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(contactId: string) {
    if (!supabase) return
    if (typeof window !== 'undefined' && !window.confirm('Bu contact silinsin mi?')) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const { error: deleteErr } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId)

      if (deleteErr) {
        throw deleteErr
      }

      setContacts((prev) => prev.filter((c) => c.id !== contactId))
      if (editingId === contactId) {
        cancelEdit()
      }
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Contact silinemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="space-y-6" aria-labelledby="contact-manager-heading">
      <div className="space-y-2">
        <h2
          id="contact-manager-heading"
          className="text-xl font-semibold text-gray-900"
        >
          Contact Listesi
        </h2>
        <p className="max-w-3xl text-sm text-gray-500">
          Kişi ve durum kayıtlarını bu tablodan ekle, güncelle ve sil.
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/90 p-5 shadow-[0_10px_20px_rgba(60,64,67,0.04)] sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CompactField
            label="Contact"
            value={formState.contact}
            onChange={(v) => setFormState((s) => ({ ...s, contact: v }))}
            placeholder="Kişi veya kurum"
            required
          />

          <CompactField
            label="Telefon"
            value={formState.telefon}
            onChange={(v) => setFormState((s) => ({ ...s, telefon: v }))}
            placeholder="+49..."
          />

          <CompactField
            label="Websitesi"
            value={formState.websitesi}
            onChange={(v) => setFormState((s) => ({ ...s, websitesi: v }))}
            placeholder="https://..."
          />

          <CompactSelect
            label="Tür"
            value={formState.tur}
            options={SORUMLU_OPTIONS}
            onChange={(v) => setFormState((s) => ({ ...s, tur: v }))}
          />

          <CompactSelect
            label="Durum DM"
            value={formState.durum_dm}
            options={DURUM_DM_OPTIONS}
            onChange={(v) => setFormState((s) => ({ ...s, durum_dm: v }))}
          />

          <CompactSelect
            label="Durum Customer"
            value={formState.durum_customer}
            options={DURUM_CUSTOMER_OPTIONS}
            onChange={(v) => setFormState((s) => ({ ...s, durum_customer: v }))}
          />
        </div>

        <div className="mt-2">
          <CompactTextarea
            label="Yorumlar"
            value={formState.yorumlar}
            onChange={(v) => setFormState((s) => ({ ...s, yorumlar: v }))}
            placeholder="Ek notlar"
          />
        </div>

        <div className="mt-4 flex items-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-60"
          >
            <Plus size={16} className="mr-1 inline" aria-hidden="true" />
            {isSubmitting ? 'Ekleniyor...' : '+ Ekle'}
          </button>
        </div>

        {error && (
          <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </form>

      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-8 text-center text-sm text-gray-400">
            Yükleniyor…
          </div>
        ) : contacts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Henüz contact yok. Yukarıdaki formu kullanarak ilk kaydı ekleyin.
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)] md:block">
              <table className="min-w-full divide-y divide-gray-50 text-sm">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500 first:pl-6 last:pr-6">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Telefon
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Websitesi
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Tür
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Sorumlu
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Durum DM
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Durum Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Yorumlar
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => {
                    const rowIsEditing = editingId === contact.id

                    return (
                      <tr
                        key={contact.id}
                        className="align-middle transition-colors hover:bg-[rgba(66,133,244,0.03)]"
                      >
                        <EditableCell
                          editing={rowIsEditing}
                          value={rowIsEditing ? editingState.contact : contact.contact}
                          onChange={(v) => setEditingState((s) => ({ ...s, contact: v }))}
                          required
                        />
                        <EditableCell
                          editing={rowIsEditing}
                          value={rowIsEditing ? editingState.telefon : contact.telefon ?? '-'}
                          onChange={(v) => setEditingState((s) => ({ ...s, telefon: v }))}
                        />
                        <EditableCell
                          editing={rowIsEditing}
                          value={rowIsEditing ? editingState.websitesi : contact.websitesi ?? '-'}
                          onChange={(v) => setEditingState((s) => ({ ...s, websitesi: v }))}
                        />
                        <EditableSelectCell
                          editing={rowIsEditing}
                          value={rowIsEditing ? editingState.tur : contact.tur ?? ''}
                          options={SORUMLU_OPTIONS}
                          onChange={(v) => setEditingState((s) => ({ ...s, tur: v }))}
                        />
                        <EditableSelectCell
                          editing={rowIsEditing}
                          value={rowIsEditing ? editingState.sorumlu : contact.sorumlu ?? ''}
                          options={SORUMLU_OPTIONS}
                          onChange={(v) => setEditingState((s) => ({ ...s, sorumlu: v }))}
                        />
                        <EditableSelectCell
                          editing={rowIsEditing}
                          value={rowIsEditing ? editingState.durum_dm : contact.durum_dm ?? ''}
                          options={DURUM_DM_OPTIONS}
                          onChange={(v) => setEditingState((s) => ({ ...s, durum_dm: v }))}
                        />
                        <EditableSelectCell
                          editing={rowIsEditing}
                          value={rowIsEditing ? editingState.durum_customer : contact.durum_customer ?? ''}
                          options={DURUM_CUSTOMER_OPTIONS}
                          onChange={(v) => setEditingState((s) => ({ ...s, durum_customer: v }))}
                        />
                        <td className="max-w-sm px-4 py-3.5 text-gray-600">
                          {rowIsEditing ? (
                            <textarea
                              value={editingState.yorumlar}
                              onChange={(e) =>
                                setEditingState((s) => ({ ...s, yorumlar: e.target.value }))
                              }
                              rows={2}
                              className={INPUT_CLS}
                            />
                          ) : (
                            contact.yorumlar ?? <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 last:pr-6">
                          <div className="flex flex-nowrap items-center gap-2">
                            {rowIsEditing ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => void handleUpdate(contact.id)}
                                  disabled={isSubmitting}
                                  className="inline-flex items-center gap-1 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition-all hover:bg-green-100 disabled:opacity-60"
                                >
                                  <Save size={14} aria-hidden="true" />
                                  Kaydet
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  disabled={isSubmitting}
                                  className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-700 disabled:opacity-60"
                                >
                                  <X size={14} aria-hidden="true" />
                                  İptal
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => startEdit(contact)}
                                disabled={isSubmitting || isEditing}
                                className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-700 disabled:opacity-60"
                              >
                                <Pencil size={14} aria-hidden="true" />
                                Düzenle
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => void handleDelete(contact.id)}
                              disabled={isSubmitting}
                              className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-100 disabled:opacity-60"
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
              {contacts.map((contact) => {
                const rowIsEditing = editingId === contact.id

                return (
                  <div
                    key={contact.id}
                    className="space-y-3 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 shadow-[0_10px_20px_rgba(60,64,67,0.04)]"
                  >
                    {rowIsEditing ? (
                      <div className="space-y-3">
                        <CompactField
                          label="Contact"
                          value={editingState.contact}
                          onChange={(v) => setEditingState((s) => ({ ...s, contact: v }))}
                          required
                        />
                        <CompactField
                          label="Telefon"
                          value={editingState.telefon}
                          onChange={(v) => setEditingState((s) => ({ ...s, telefon: v }))}
                        />
                        <CompactField
                          label="Websitesi"
                          value={editingState.websitesi}
                          onChange={(v) => setEditingState((s) => ({ ...s, websitesi: v }))}
                        />
                        <CompactSelect
                          label="Tür"
                          value={editingState.tur}
                          options={SORUMLU_OPTIONS}
                          onChange={(v) => setEditingState((s) => ({ ...s, tur: v }))}
                        />
                        <CompactSelect
                          label="Sorumlu"
                          value={editingState.sorumlu}
                          options={SORUMLU_OPTIONS}
                          onChange={(v) => setEditingState((s) => ({ ...s, sorumlu: v }))}
                        />
                        <CompactSelect
                          label="Durum DM"
                          value={editingState.durum_dm}
                          options={DURUM_DM_OPTIONS}
                          onChange={(v) => setEditingState((s) => ({ ...s, durum_dm: v }))}
                        />
                        <CompactSelect
                          label="Durum Customer"
                          value={editingState.durum_customer}
                          options={DURUM_CUSTOMER_OPTIONS}
                          onChange={(v) => setEditingState((s) => ({ ...s, durum_customer: v }))}
                        />
                        <CompactTextarea
                          label="Yorumlar"
                          value={editingState.yorumlar}
                          onChange={(v) => setEditingState((s) => ({ ...s, yorumlar: v }))}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <h3 className="text-base font-semibold text-gray-900">
                            {contact.contact}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {contact.yorumlar ?? 'Yorum yok'}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <InfoPair label="Telefon" value={contact.telefon ?? '-'} />
                          <InfoPair label="Websitesi" value={contact.websitesi ?? '-'} />
                          <InfoPair label="Tür" value={contact.tur ?? '-'} />
                          <InfoPair label="Sorumlu" value={contact.sorumlu ?? '-'} />
                          <InfoPair label="Durum DM" value={contact.durum_dm ?? '-'} />
                          <InfoPair label="Durum Customer" value={contact.durum_customer ?? '-'} />
                        </div>
                      </>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      {rowIsEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={() => void handleUpdate(contact.id)}
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-1 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition-all hover:bg-green-100 disabled:opacity-60"
                          >
                            <Save size={14} aria-hidden="true" />
                            Kaydet
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-700 disabled:opacity-60"
                          >
                            <X size={14} aria-hidden="true" />
                            İptal
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEdit(contact)}
                          disabled={isSubmitting || isEditing}
                          className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-700 disabled:opacity-60"
                        >
                          <Pencil size={14} aria-hidden="true" />
                          Düzenle
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => void handleDelete(contact.id)}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-100 disabled:opacity-60"
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
