'use client'

import { useEffect, useState } from 'react'
import { Download, ExternalLink, Eye, Pencil, Plus, Save, Trash2, Upload, X } from 'lucide-react'
import AccordionCard from '../ui/AccordionCard'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import {
  ARGE_AUTHORS,
  createEmptyArgeLinkFormState,
  createEmptyArgeCardFormState,
  createEmptyArgeFileFormState,
  mapArgeLinkRow,
  mapArgeCardRow,
  mapArgeFileRow,
  type ArgeLink,
  type ArgeCard,
  type ArgeFile,
  type ArgeLinkRow,
  type ArgeCardRow,
  type ArgeFileRow,
  type ArgeLinkFormState,
  type ArgeCardFormState,
  type ArgeFileFormState,
  type ArgeAuthor,
} from '@/lib/arge-items'

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

const BTN_CLS =
  'inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all disabled:opacity-60'

type Tab = 'links' | 'cards' | 'files'

export default function ArgeManager() {
  const [activeTab, setActiveTab] = useState<Tab>('links')

  const [links, setLinks] = useState<ArgeLink[]>([])
  const [cards, setCards] = useState<ArgeCard[]>([])
  const [files, setFiles] = useState<ArgeFile[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [linkForm, setLinkForm] = useState<ArgeLinkFormState>(createEmptyArgeLinkFormState)
  const [cardForm, setCardForm] = useState<ArgeCardFormState>(createEmptyArgeCardFormState)
  const [fileForm, setFileForm] = useState<ArgeFileFormState>(createEmptyArgeFileFormState)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    void loadAll()
  }, [])

  async function loadAll() {
    if (!supabase) { setIsLoading(false); return }
    setIsLoading(true)
    try {
      const [linksRes, cardsRes, filesRes] = await Promise.all([
        supabase.from('arge_links').select('*').order('created_at', { ascending: false }),
        supabase.from('arge_cards').select('*').order('created_at', { ascending: false }),
        supabase.from('arge_files').select('*').order('created_at', { ascending: false }),
      ])
      if (linksRes.data) setLinks((linksRes.data as ArgeLinkRow[]).map(mapArgeLinkRow))
      if (cardsRes.data) setCards((cardsRes.data as ArgeCardRow[]).map(mapArgeCardRow))
      if (filesRes.data) setFiles((filesRes.data as ArgeFileRow[]).map(mapArgeFileRow))
    } catch { setError('Veri yüklenemedi.') } finally { setIsLoading(false) }
  }

  async function handleCreateLink(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setIsSubmitting(true); setError(null)
    try {
      const { data, error: err } = await supabase.from('arge_links').insert({
        title: linkForm.title, description: linkForm.description.trim() || null, url: linkForm.url, created_by: linkForm.createdBy,
      }).select('*').single()
      if (err || !data) throw err
      setLinks((prev) => [mapArgeLinkRow(data as ArgeLinkRow), ...prev])
      setLinkForm(createEmptyArgeLinkFormState())
    } catch (err) { setError(err instanceof Error ? err.message : 'Eklenemedi.') } finally { setIsSubmitting(false) }
  }

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setIsSubmitting(true); setError(null)
    try {
      const { data, error: err } = await supabase.from('arge_cards').insert({
        title: cardForm.title, description: cardForm.description.trim() || null, content: cardForm.content.trim() || null, created_by: cardForm.createdBy,
      }).select('*').single()
      if (err || !data) throw err
      setCards((prev) => [mapArgeCardRow(data as ArgeCardRow), ...prev])
      setCardForm(createEmptyArgeCardFormState())
    } catch (err) { setError(err instanceof Error ? err.message : 'Eklenemedi.') } finally { setIsSubmitting(false) }
  }

  async function handleCreateFile(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase || !selectedFile) { setError('Dosya seçin.'); return }
    setIsSubmitting(true); setError(null)
    try {
      const fileExt = selectedFile.name.split('.').pop()
      const filePath = `${crypto.randomUUID()}.${fileExt}`
      const { error: uploadErr } = await supabase.storage.from('arge-files').upload(filePath, selectedFile)
      if (uploadErr) throw uploadErr
      const { data, error: err } = await supabase.from('arge_files').insert({
        title: fileForm.title, description: fileForm.description.trim() || null, file_path: filePath, file_name: selectedFile.name, created_by: fileForm.createdBy,
      }).select('*').single()
      if (err || !data) throw err
      setFiles((prev) => [mapArgeFileRow(data as ArgeFileRow), ...prev])
      setFileForm(createEmptyArgeFileFormState()); setSelectedFile(null)
    } catch (err) { setError(err instanceof Error ? err.message : 'Eklenemedi.') } finally { setIsSubmitting(false) }
  }

  async function handleDeleteLink(id: string) {
    if (!supabase || !confirm('Silinsin mi?')) return
    await supabase.from('arge_links').delete().eq('id', id)
    setLinks((prev) => prev.filter((l) => l.id !== id))
  }

  async function handleDeleteCard(id: string) {
    if (!supabase || !confirm('Silinsin mi?')) return
    await supabase.from('arge_cards').delete().eq('id', id)
    setCards((prev) => prev.filter((c) => c.id !== id))
  }

  async function handleDeleteFile(id: string, filePath: string) {
    if (!supabase || !confirm('Silinsin mi?')) return
    await supabase.storage.from('arge-files').remove([filePath])
    await supabase.from('arge_files').delete().eq('id', id)
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  async function handleViewFile(file: ArgeFile) {
    if (!supabase) return
    const { data } = await supabase.storage.from('arge-files').createSignedUrl(file.filePath, 300)
    if (data) window.open(data.signedUrl, '_blank')
  }

  async function handleDownloadFile(file: ArgeFile) {
    if (!supabase) return
    const { data } = await supabase.storage.from('arge-files').createSignedUrl(file.filePath, 300)
    if (data) { const a = document.createElement('a'); a.href = data.signedUrl; a.download = file.fileName; a.click() }
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: 'links', label: 'Linkler' },
    { key: 'cards', label: 'Kartlar' },
    { key: 'files', label: 'Dosyalar' },
  ]

  return (
    <section className="space-y-6" aria-labelledby="arge-manager-heading">
      <div className="space-y-2">
        <h2 id="arge-manager-heading" className="text-xl font-semibold text-gray-900">ARGE Yönetimi</h2>
        <p className="max-w-3xl text-sm text-gray-500">Linkler, açıklama kartları ve dosya upload.</p>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        {TABS.map((tab) => (
          <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === tab.key ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {activeTab === 'links' && (
        <div className="space-y-4">
          <AccordionCard defaultOpenId="new-arge-link" items={[{
            id: 'new-arge-link', title: 'Yeni Link Ekle', accentColor: '#1A6DC2',
            children: (
              <form onSubmit={handleCreateLink} className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Başlık</span>
                  <input type="text" value={linkForm.title} onChange={(e) => setLinkForm((s) => ({ ...s, title: e.target.value }))} placeholder="Başlık" className={INPUT_CLS} required /></label>
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">URL</span>
                  <input type="url" value={linkForm.url} onChange={(e) => setLinkForm((s) => ({ ...s, url: e.target.value }))} placeholder="https://..." className={INPUT_CLS} required /></label>
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Açıklama</span>
                  <input type="text" value={linkForm.description} onChange={(e) => setLinkForm((s) => ({ ...s, description: e.target.value }))} placeholder="Açıklama" className={INPUT_CLS} /></label>
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Kim</span>
                  <select value={linkForm.createdBy} onChange={(e) => setLinkForm((s) => ({ ...s, createdBy: e.target.value as ArgeAuthor }))} className={INPUT_CLS}>
                    {ARGE_AUTHORS.map((a) => (<option key={a} value={a}>{a}</option>))}</select></label>
                <div className="flex items-end sm:col-span-2">
                  <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-60">
                    <Plus size={16} className="mr-1 inline" />{isSubmitting ? 'Kaydediliyor...' : 'Ekle'}</button></div>
              </form>),
          }]} />
          {isLoading ? <div className="p-8 text-center text-sm text-gray-400">Yükleniyor…</div> : links.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">Henüz link yok.</div> : (
            <div className="space-y-3">
              {links.map((link) => (
                <div key={link.id} className="flex items-center justify-between gap-3 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{link.title}</p>
                    {link.description && <p className="text-xs text-gray-500">{link.description}</p>}
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"><ExternalLink size={12} /> {link.url}</a>
                  </div>
                  <button type="button" onClick={() => void handleDeleteLink(link.id)} className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'cards' && (
        <div className="space-y-4">
          <AccordionCard defaultOpenId="new-arge-card" items={[{
            id: 'new-arge-card', title: 'Yeni Kart Ekle', accentColor: '#FB8C00',
            children: (
              <form onSubmit={handleCreateCard} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Başlık</span>
                    <input type="text" value={cardForm.title} onChange={(e) => setCardForm((s) => ({ ...s, title: e.target.value }))} placeholder="Başlık" className={INPUT_CLS} required /></label>
                  <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Kim</span>
                    <select value={cardForm.createdBy} onChange={(e) => setCardForm((s) => ({ ...s, createdBy: e.target.value as ArgeAuthor }))} className={INPUT_CLS}>
                      {ARGE_AUTHORS.map((a) => (<option key={a} value={a}>{a}</option>))}</select></label>
                </div>
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Açıklama</span>
                  <input type="text" value={cardForm.description} onChange={(e) => setCardForm((s) => ({ ...s, description: e.target.value }))} placeholder="Kısa açıklama" className={INPUT_CLS} /></label>
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Detaylı İçerik</span>
                  <textarea value={cardForm.content} onChange={(e) => setCardForm((s) => ({ ...s, content: e.target.value }))} rows={4} placeholder="Detaylı içerik..." className={INPUT_CLS} /></label>
                <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-60">
                  <Plus size={16} className="mr-1 inline" />{isSubmitting ? 'Kaydediliyor...' : 'Ekle'}</button>
              </form>),
          }]} />
          {isLoading ? <div className="p-8 text-center text-sm text-gray-400">Yükleniyor…</div> : cards.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">Henüz kart yok.</div> : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {cards.map((card) => (
                <div key={card.id} className="space-y-2 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{card.title}</h3>
                      {card.description && <p className="mt-1 text-xs text-gray-500">{card.description}</p>}
                    </div>
                    <button type="button" onClick={() => void handleDeleteCard(card.id)} className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}><Trash2 size={14} /></button>
                  </div>
                  {card.content && <p className="text-sm text-gray-600 whitespace-pre-line">{card.content}</p>}
                  <p className="text-[11px] text-gray-400">Ekleyen: {card.createdBy}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'files' && (
        <div className="space-y-4">
          <AccordionCard defaultOpenId="new-arge-file" items={[{
            id: 'new-arge-file', title: 'Yeni Dosya Yükle', accentColor: '#4CAF50',
            children: (
              <form onSubmit={handleCreateFile} className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Başlık</span>
                  <input type="text" value={fileForm.title} onChange={(e) => setFileForm((s) => ({ ...s, title: e.target.value }))} placeholder="Başlık" className={INPUT_CLS} required /></label>
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Açıklama</span>
                  <input type="text" value={fileForm.description} onChange={(e) => setFileForm((s) => ({ ...s, description: e.target.value }))} placeholder="Açıklama" className={INPUT_CLS} /></label>
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Kim</span>
                  <select value={fileForm.createdBy} onChange={(e) => setFileForm((s) => ({ ...s, createdBy: e.target.value as ArgeAuthor }))} className={INPUT_CLS}>
                    {ARGE_AUTHORS.map((a) => (<option key={a} value={a}>{a}</option>))}</select></label>
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Dosya</span>
                  <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)} className={INPUT_CLS} required /></label>
                <div className="flex items-end sm:col-span-2">
                  <button type="submit" disabled={isSubmitting || !selectedFile} className="w-full rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-60">
                    <Upload size={16} className="mr-1 inline" />{isSubmitting ? 'Yükleniyor...' : 'Yükle'}</button></div>
              </form>),
          }]} />
          {isLoading ? <div className="p-8 text-center text-sm text-gray-400">Yükleniyor…</div> : files.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">Henüz dosya yok.</div> : (
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between gap-3 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{file.title}</p>
                    {file.description && <p className="text-xs text-gray-500">{file.description}</p>}
                    <p className="text-[11px] text-gray-400">{file.fileName} — {file.createdBy}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => void handleViewFile(file)} className={`${BTN_CLS} border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100`}><Eye size={14} /></button>
                    <button type="button" onClick={() => void handleDownloadFile(file)} className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}><Download size={14} /></button>
                    <button type="button" onClick={() => void handleDeleteFile(file.id, file.filePath)} className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
