'use client'

import { useEffect, useState } from 'react'
import { Download, Eye, ExternalLink, Pencil, Save, Trash2, Upload, X } from 'lucide-react'
import AccordionCard from '../ui/AccordionCard'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import { safeHref, validateCvFile, sanitizeError } from '@/lib/security'
import {
  createEmptyCvFormState,
  mapCvRow,
  type CvFormState,
  type CvItem,
  type CvItemRow,
} from '@/lib/cv-items'

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

const BTN_CLS =
  'inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all disabled:opacity-60'

function normalizeOptionalText(value: string): string | null {
  const normalized = value.trim()
  return normalized.length > 0 ? normalized : null
}

export default function CvManager() {
  const [cvs, setCvs] = useState<CvItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formState, setFormState] = useState<CvFormState>(createEmptyCvFormState)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingState, setEditingState] = useState<CvFormState>(createEmptyCvFormState)

  const supabase = getSupabaseBrowserClient()
  const isEditing = editingId !== null

  useEffect(() => {
    void loadCvs()
  }, [])

  async function loadCvs() {
    if (!supabase) {
      setError('Supabase bağlantısı yapılandırılmamış.')
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('user_cvs')
        .select('id, first_name, last_name, role, linkedin_url, instagram_url, website_url, file_path, file_name, created_at')
        .order('created_at', { ascending: false })
      if (fetchErr) throw fetchErr
      setCvs((data as CvItemRow[]).map(mapCvRow))
    } catch (loadError) {
      setError(sanitizeError(loadError, 'CV listesi yüklenemedi.'))
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase || !selectedFile) {
      setError('Lütfen bir CV dosyası seçin.')
      return
    }
    const fileError = validateCvFile(selectedFile)
    if (fileError) {
      setError(fileError)
      return
    }
    setIsSubmitting(true)
    setError(null)
    let uploadedFilePath: string | null = null
    try {
      const fileExt = selectedFile.name.split('.').pop()
      const filePath = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadErr } = await supabase.storage
        .from('cv-files')
        .upload(filePath, selectedFile)

      if (uploadErr) throw uploadErr
      uploadedFilePath = filePath

      const insertPayload = {
        first_name: formState.firstName.trim(),
        last_name: formState.lastName.trim(),
        role: normalizeOptionalText(formState.role),
        linkedin_url: normalizeOptionalText(formState.linkedinUrl),
        instagram_url: normalizeOptionalText(formState.instagramUrl),
        website_url: normalizeOptionalText(formState.websiteUrl),
        file_path: filePath,
        file_name: selectedFile.name,
      }

      const { data, error: insertErr } = await supabase
        .from('user_cvs')
        .insert(insertPayload)
        .select('id, first_name, last_name, role, linkedin_url, instagram_url, website_url, file_path, file_name, created_at')
        .single()

      if (insertErr || !data) throw insertErr ?? new Error('CV kaydı eklenemedi.')

      setCvs((prev) => [mapCvRow(data as CvItemRow), ...prev])
      setFormState(createEmptyCvFormState())
      setSelectedFile(null)
    } catch (createError) {
      if (uploadedFilePath) {
        await supabase.storage.from('cv-files').remove([uploadedFilePath])
      }
      setError(sanitizeError(createError, 'CV yüklenemedi.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleView(cv: CvItem) {
    if (!supabase) return
    try {
      const { data, error: signedErr } = await supabase.storage
        .from('cv-files')
        .createSignedUrl(cv.filePath, 300)
      if (signedErr || !data) throw signedErr
      window.open(data.signedUrl, '_blank')
    } catch (viewError) {
      setError(sanitizeError(viewError, 'Signed URL oluşturulamadı.'))
    }
  }

  async function handleDownload(cv: CvItem) {
    if (!supabase) return
    try {
      const { data, error: signedErr } = await supabase.storage
        .from('cv-files')
        .createSignedUrl(cv.filePath, 300)
      if (signedErr || !data) throw signedErr
      const link = document.createElement('a')
      link.href = data.signedUrl
      link.download = cv.fileName
      link.click()
    } catch (downloadError) {
      setError(sanitizeError(downloadError, 'İndirme başarısız.'))
    }
  }

  async function handleDelete(cvId: string, filePath: string) {
    if (!supabase) return
    if (typeof window !== 'undefined' && !window.confirm('Bu CV silinsin mi?')) return
    setIsSubmitting(true)
    setError(null)
    try {
      await supabase.storage.from('cv-files').remove([filePath])
      const { error: deleteErr } = await supabase.from('user_cvs').delete().eq('id', cvId)
      if (deleteErr) throw deleteErr
      setCvs((prev) => prev.filter((c) => c.id !== cvId))
      if (editingId === cvId) setEditingId(null)
    } catch (deleteError) {
      setError(sanitizeError(deleteError, 'Silinemedi.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  function startEdit(cv: CvItem) {
    setEditingId(cv.id)
    setEditingState({
      firstName: cv.firstName,
      lastName: cv.lastName,
      role: cv.role ?? '',
      linkedinUrl: cv.linkedinUrl ?? '',
      instagramUrl: cv.instagramUrl ?? '',
      websiteUrl: cv.websiteUrl ?? '',
    })
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingState(createEmptyCvFormState())
  }

  async function handleUpdate(cvId: string) {
    if (!supabase) return
    setIsSubmitting(true)
    setError(null)
    try {
      const updatePayload = {
        first_name: editingState.firstName.trim(),
        last_name: editingState.lastName.trim(),
        role: normalizeOptionalText(editingState.role),
        linkedin_url: normalizeOptionalText(editingState.linkedinUrl),
        instagram_url: normalizeOptionalText(editingState.instagramUrl),
        website_url: normalizeOptionalText(editingState.websiteUrl),
      }
      const { data, error: updateErr } = await supabase
        .from('user_cvs')
        .update(updatePayload)
        .eq('id', cvId)
        .select('id, first_name, last_name, role, linkedin_url, instagram_url, website_url, file_path, file_name, created_at')
        .single()
      if (updateErr || !data) throw updateErr
      setCvs((prev) => prev.map((c) => (c.id === cvId ? mapCvRow(data as CvItemRow) : c)))
      cancelEdit()
    } catch (updateError) {
      setError(sanitizeError(updateError, 'Güncellenemedi.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="space-y-6" aria-labelledby="cv-manager-heading">
      <AccordionCard
        defaultOpenId="new-cv"
        items={[{
          id: 'new-cv',
          title: 'Yeni CV Yükle',
          accentColor: '#4CAF50',
          children: (
            <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">İsim</span>
                <input type="text" value={formState.firstName} onChange={(e) => setFormState((s) => ({ ...s, firstName: e.target.value }))} placeholder="İsim" className={INPUT_CLS} />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Soyisim</span>
                <input type="text" value={formState.lastName} onChange={(e) => setFormState((s) => ({ ...s, lastName: e.target.value }))} placeholder="Soyisim" className={INPUT_CLS} />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Görev / Pozisyon</span>
                <input type="text" value={formState.role} onChange={(e) => setFormState((s) => ({ ...s, role: e.target.value }))} placeholder="Pozisyon" className={INPUT_CLS} />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">CV Dosyası</span>
                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)} className={INPUT_CLS} />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">LinkedIn</span>
                <input type="url" value={formState.linkedinUrl} onChange={(e) => setFormState((s) => ({ ...s, linkedinUrl: e.target.value }))} placeholder="linkedin.com/in/..." className={INPUT_CLS} />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Instagram</span>
                <input type="url" value={formState.instagramUrl} onChange={(e) => setFormState((s) => ({ ...s, instagramUrl: e.target.value }))} placeholder="instagram.com/..." className={INPUT_CLS} />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Website</span>
                <input type="url" value={formState.websiteUrl} onChange={(e) => setFormState((s) => ({ ...s, websiteUrl: e.target.value }))} placeholder="ornek.com" className={INPUT_CLS} />
              </label>
              <div className="flex items-end sm:col-span-2 lg:col-span-3">
                <button type="submit" disabled={isSubmitting || !selectedFile} className="w-full rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-60">
                  <Upload size={16} className="mr-1 inline" aria-hidden="true" />
                  {isSubmitting ? 'Yükleniyor...' : 'CV Yükle'}
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
        ) : cvs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">Henüz CV yok.</div>
        ) : (
          <>
            <div className="hidden overflow-x-auto rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)] md:block">
              <table className="min-w-full divide-y divide-gray-50 text-sm">
                <thead className="bg-gray-50/80">
                  <tr>
                    {['İsim Soyisim', 'Görev', 'Linkler', 'Dosya', 'İşlemler'].map((col) => (
                      <th key={col} scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500 first:pl-6 last:pr-6">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cvs.map((cv) => {
                    const rowIsEditing = editingId === cv.id
                    return (
                      <tr key={cv.id} className="align-middle transition-colors hover:bg-[rgba(66,133,244,0.03)]">
                        <td className="pl-6 pr-4 py-3.5 font-medium text-gray-900">
                          {rowIsEditing ? (
                            <div className="grid grid-cols-2 gap-2">
                              <input type="text" value={editingState.firstName} onChange={(e) => setEditingState((s) => ({ ...s, firstName: e.target.value }))} placeholder="İsim" className={INPUT_CLS} />
                              <input type="text" value={editingState.lastName} onChange={(e) => setEditingState((s) => ({ ...s, lastName: e.target.value }))} placeholder="Soyisim" className={INPUT_CLS} />
                            </div>
                          ) : `${cv.firstName || 'İsim yok'} ${cv.lastName || 'Soyisim yok'}`}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600">
                          {rowIsEditing ? <input type="text" value={editingState.role} onChange={(e) => setEditingState((s) => ({ ...s, role: e.target.value }))} className={INPUT_CLS} /> : (cv.role ?? <span className="text-gray-300">—</span>)}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600">
                          {rowIsEditing ? (
                            <div className="grid gap-2">
                              <input type="url" value={editingState.linkedinUrl} onChange={(e) => setEditingState((s) => ({ ...s, linkedinUrl: e.target.value }))} placeholder="LinkedIn" className={INPUT_CLS} />
                              <input type="url" value={editingState.instagramUrl} onChange={(e) => setEditingState((s) => ({ ...s, instagramUrl: e.target.value }))} placeholder="Instagram" className={INPUT_CLS} />
                              <input type="url" value={editingState.websiteUrl} onChange={(e) => setEditingState((s) => ({ ...s, websiteUrl: e.target.value }))} placeholder="Website" className={INPUT_CLS} />
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {cv.linkedinUrl && (
                                <a href={safeHref(cv.linkedinUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100">
                                  LinkedIn <ExternalLink size={12} />
                                </a>
                              )}
                              {cv.instagramUrl && (
                                <a href={safeHref(cv.instagramUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-pink-200 bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-700 hover:bg-pink-100">
                                  Instagram <ExternalLink size={12} />
                                </a>
                              )}
                              {cv.websiteUrl && (
                                <a href={safeHref(cv.websiteUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100">
                                  Website <ExternalLink size={12} />
                                </a>
                              )}
                              {!cv.linkedinUrl && !cv.instagramUrl && !cv.websiteUrl && <span className="text-gray-300">—</span>}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600 text-xs">{cv.fileName}</td>
                        <td className="whitespace-nowrap px-4 py-3.5 last:pr-6">
                          <div className="flex flex-nowrap items-center gap-2">
                            {rowIsEditing ? (
                              <>
                                <button type="button" onClick={() => void handleUpdate(cv.id)} disabled={isSubmitting} className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}><Save size={14} /> Kaydet</button>
                                <button type="button" onClick={cancelEdit} disabled={isSubmitting} className={`${BTN_CLS} border border-gray-200 text-gray-500`}><X size={14} /> İptal</button>
                              </>
                            ) : (
                              <>
                                <button type="button" onClick={() => startEdit(cv)} disabled={isSubmitting || isEditing} className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}><Pencil size={14} /> Düzenle</button>
                                <button type="button" onClick={() => void handleView(cv)} className={`${BTN_CLS} border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100`}><Eye size={14} /> Görüntüle</button>
                                <button type="button" onClick={() => void handleDownload(cv)} className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}><Download size={14} /> İndir</button>
                              </>
                            )}
                            <button type="button" onClick={() => void handleDelete(cv.id, cv.filePath)} disabled={isSubmitting} className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}><Trash2 size={14} /> Sil</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {cvs.map((cv) => {
                const rowIsEditing = editingId === cv.id
                return (
                  <div key={cv.id} className="space-y-3 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 shadow-[0_10px_20px_rgba(60,64,67,0.04)]">
                    {rowIsEditing ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" value={editingState.firstName} onChange={(e) => setEditingState((s) => ({ ...s, firstName: e.target.value }))} placeholder="İsim" className={INPUT_CLS} />
                          <input type="text" value={editingState.lastName} onChange={(e) => setEditingState((s) => ({ ...s, lastName: e.target.value }))} placeholder="Soyisim" className={INPUT_CLS} />
                        </div>
                        <input type="text" value={editingState.role} onChange={(e) => setEditingState((s) => ({ ...s, role: e.target.value }))} placeholder="Görev" className={INPUT_CLS} />
                        <div className="grid gap-3">
                          <input type="url" value={editingState.linkedinUrl} onChange={(e) => setEditingState((s) => ({ ...s, linkedinUrl: e.target.value }))} placeholder="LinkedIn" className={INPUT_CLS} />
                          <input type="url" value={editingState.instagramUrl} onChange={(e) => setEditingState((s) => ({ ...s, instagramUrl: e.target.value }))} placeholder="Instagram" className={INPUT_CLS} />
                          <input type="url" value={editingState.websiteUrl} onChange={(e) => setEditingState((s) => ({ ...s, websiteUrl: e.target.value }))} placeholder="Website" className={INPUT_CLS} />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-gray-900">{cv.firstName || 'İsim yok'} {cv.lastName || 'Soyisim yok'}</h3>
                        <p className="text-sm text-gray-500">{cv.role ?? 'Görev belirtilmemiş'}</p>
                        {(cv.linkedinUrl || cv.instagramUrl || cv.websiteUrl) && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {cv.linkedinUrl && (
                              <a href={safeHref(cv.linkedinUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100">
                                LinkedIn <ExternalLink size={12} />
                              </a>
                            )}
                            {cv.instagramUrl && (
                              <a href={safeHref(cv.instagramUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-pink-200 bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-700 hover:bg-pink-100">
                                Instagram <ExternalLink size={12} />
                              </a>
                            )}
                            {cv.websiteUrl && (
                              <a href={safeHref(cv.websiteUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100">
                                Website <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-gray-400">{cv.fileName}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      {rowIsEditing ? (
                        <>
                          <button type="button" onClick={() => void handleUpdate(cv.id)} disabled={isSubmitting} className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}><Save size={14} /> Kaydet</button>
                          <button type="button" onClick={cancelEdit} disabled={isSubmitting} className={`${BTN_CLS} border border-gray-200 text-gray-500`}><X size={14} /> İptal</button>
                        </>
                      ) : (
                        <>
                          <button type="button" onClick={() => startEdit(cv)} disabled={isSubmitting || isEditing} className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}><Pencil size={14} /></button>
                          <button type="button" onClick={() => void handleView(cv)} className={`${BTN_CLS} border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100`}><Eye size={14} /></button>
                          <button type="button" onClick={() => void handleDownload(cv)} className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}><Download size={14} /></button>
                        </>
                      )}
                      <button type="button" onClick={() => void handleDelete(cv.id, cv.filePath)} disabled={isSubmitting} className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}><Trash2 size={14} /></button>
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
