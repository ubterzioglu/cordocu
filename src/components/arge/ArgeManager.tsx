'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Download,
  ExternalLink,
  Eye,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import AccordionCard from '../ui/AccordionCard'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import {
  ARGE_AUTHORS,
  createEmptyArgeCardFormState,
  createEmptyArgeFileFormState,
  createEmptyArgeLinkFormState,
  mapArgeCardRow,
  mapArgeFileRow,
  mapArgeLinkRow,
  type ArgeAuthor,
  type ArgeCard,
  type ArgeCardFormState,
  type ArgeCardRow,
  type ArgeFile,
  type ArgeFileFormState,
  type ArgeFileRow,
  type ArgeLink,
  type ArgeLinkFormState,
  type ArgeLinkRow,
} from '@/lib/arge-items'

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

const BTN_CLS =
  'inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all disabled:opacity-60'

const EMPTY_CARD_VALUE = ''

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
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null)
  const [editingLinkForm, setEditingLinkForm] = useState<ArgeLinkFormState>(
    createEmptyArgeLinkFormState
  )
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [editingCardForm, setEditingCardForm] = useState<ArgeCardFormState>(
    createEmptyArgeCardFormState
  )
  const [editingFileId, setEditingFileId] = useState<string | null>(null)
  const [editingFileForm, setEditingFileForm] = useState<ArgeFileFormState>(
    createEmptyArgeFileFormState
  )

  const supabase = getSupabaseBrowserClient()

  const cardOptions = useMemo(
    () =>
      cards.map((card) => ({
        value: card.id,
        label: card.title,
      })),
    [cards]
  )

  const cardGroups = useMemo(
    () =>
      cards.map((card) => ({
        card,
        links: links.filter((link) => link.cardId === card.id),
        files: files.filter((file) => file.cardId === card.id),
      })),
    [cards, files, links]
  )

  const unassignedLinks = useMemo(
    () => links.filter((link) => !link.cardId),
    [links]
  )

  const unassignedFiles = useMemo(
    () => files.filter((file) => !file.cardId),
    [files]
  )

  const loadAll = useCallback(async () => {
    if (!supabase) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const [linksRes, cardsRes, filesRes] = await Promise.all([
        supabase.from('arge_links').select('*').order('created_at', { ascending: false }),
        supabase.from('arge_cards').select('*').order('created_at', { ascending: false }),
        supabase.from('arge_files').select('*').order('created_at', { ascending: false }),
      ])

      if (linksRes.error) throw linksRes.error
      if (cardsRes.error) throw cardsRes.error
      if (filesRes.error) throw filesRes.error

      setLinks(((linksRes.data ?? []) as ArgeLinkRow[]).map(mapArgeLinkRow))
      setCards(((cardsRes.data ?? []) as ArgeCardRow[]).map(mapArgeCardRow))
      setFiles(((filesRes.data ?? []) as ArgeFileRow[]).map(mapArgeFileRow))
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Veri yüklenemedi.')
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  async function handleCreateLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error: insertErr } = await supabase
        .from('arge_links')
        .insert({
          title: linkForm.title.trim(),
          description: linkForm.description.trim() || null,
          url: linkForm.url.trim(),
          created_by: linkForm.createdBy,
          ...(linkForm.cardId ? { card_id: linkForm.cardId } : {}),
        })
        .select('*')
        .single()

      if (insertErr || !data) throw insertErr ?? new Error('Link eklenemedi.')

      setLinks((prev) => [mapArgeLinkRow(data as ArgeLinkRow), ...prev])
      setLinkForm(createEmptyArgeLinkFormState())
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Link eklenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCreateCard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error: insertErr } = await supabase
        .from('arge_cards')
        .insert({
          title: cardForm.title.trim(),
          description: cardForm.description.trim() || null,
          content: cardForm.content.trim() || null,
          created_by: cardForm.createdBy,
        })
        .select('*')
        .single()

      if (insertErr || !data) throw insertErr ?? new Error('Kart eklenemedi.')

      setCards((prev) => [mapArgeCardRow(data as ArgeCardRow), ...prev])
      setCardForm(createEmptyArgeCardFormState())
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Kart eklenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCreateFile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!supabase || !selectedFile) {
      setError('Dosya seçin.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    let uploadedFilePath: string | null = null

    try {
      const fileExt = selectedFile.name.split('.').pop()
      const filePath = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadErr } = await supabase.storage
        .from('arge-files')
        .upload(filePath, selectedFile)

      if (uploadErr) throw uploadErr
      uploadedFilePath = filePath

      const { data, error: insertErr } = await supabase
        .from('arge_files')
        .insert({
          title: fileForm.title.trim(),
          description: fileForm.description.trim() || null,
          file_path: filePath,
          file_name: selectedFile.name,
          created_by: fileForm.createdBy,
          ...(fileForm.cardId ? { card_id: fileForm.cardId } : {}),
        })
        .select('*')
        .single()

      if (insertErr || !data) throw insertErr ?? new Error('Dosya eklenemedi.')

      setFiles((prev) => [mapArgeFileRow(data as ArgeFileRow), ...prev])
      setFileForm(createEmptyArgeFileFormState())
      setSelectedFile(null)
    } catch (createError) {
      if (uploadedFilePath) {
        await supabase.storage.from('arge-files').remove([uploadedFilePath])
      }
      setError(createError instanceof Error ? createError.message : 'Dosya eklenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDeleteLink(id: string) {
    if (!supabase || (typeof window !== 'undefined' && !window.confirm('Silinsin mi?'))) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const { error: deleteErr } = await supabase.from('arge_links').delete().eq('id', id)
      if (deleteErr) throw deleteErr
      setLinks((prev) => prev.filter((link) => link.id !== id))
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Link silinemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function startEditLink(link: ArgeLink) {
    setEditingLinkId(link.id)
    setEditingLinkForm({
      title: link.title,
      description: link.description ?? '',
      url: link.url,
      cardId: link.cardId ?? '',
      createdBy: link.createdBy,
    })
  }

  function cancelEditLink() {
    setEditingLinkId(null)
    setEditingLinkForm(createEmptyArgeLinkFormState())
  }

  async function handleUpdateLink(id: string) {
    if (!supabase) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error: updateErr } = await supabase
        .from('arge_links')
        .update({
          title: editingLinkForm.title.trim(),
          description: editingLinkForm.description.trim() || null,
          url: editingLinkForm.url.trim(),
          card_id: editingLinkForm.cardId || null,
          created_by: editingLinkForm.createdBy,
        })
        .eq('id', id)
        .select('*')
        .single()

      if (updateErr || !data) throw updateErr ?? new Error('Link güncellenemedi.')

      setLinks((prev) =>
        prev.map((link) => (link.id === id ? mapArgeLinkRow(data as ArgeLinkRow) : link))
      )
      cancelEditLink()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Link güncellenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDeleteCard(id: string) {
    if (!supabase || (typeof window !== 'undefined' && !window.confirm('Silinsin mi?'))) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const { error: deleteErr } = await supabase.from('arge_cards').delete().eq('id', id)
      if (deleteErr) throw deleteErr

      setCards((prev) => prev.filter((card) => card.id !== id))
      setLinks((prev) =>
        prev.map((link) => (link.cardId === id ? { ...link, cardId: null } : link))
      )
      setFiles((prev) =>
        prev.map((file) => (file.cardId === id ? { ...file, cardId: null } : file))
      )
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Kart silinemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function startEditCard(card: ArgeCard) {
    setEditingCardId(card.id)
    setEditingCardForm({
      title: card.title,
      description: card.description ?? '',
      content: card.content ?? '',
      createdBy: card.createdBy,
    })
  }

  function cancelEditCard() {
    setEditingCardId(null)
    setEditingCardForm(createEmptyArgeCardFormState())
  }

  async function handleUpdateCard(id: string) {
    if (!supabase) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error: updateErr } = await supabase
        .from('arge_cards')
        .update({
          title: editingCardForm.title.trim(),
          description: editingCardForm.description.trim() || null,
          content: editingCardForm.content.trim() || null,
          created_by: editingCardForm.createdBy,
        })
        .eq('id', id)
        .select('*')
        .single()

      if (updateErr || !data) throw updateErr ?? new Error('Kart güncellenemedi.')

      setCards((prev) =>
        prev.map((card) => (card.id === id ? mapArgeCardRow(data as ArgeCardRow) : card))
      )
      cancelEditCard()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Kart güncellenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDeleteFile(id: string, filePath: string) {
    if (!supabase || (typeof window !== 'undefined' && !window.confirm('Silinsin mi?'))) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const { error: storageErr } = await supabase.storage.from('arge-files').remove([filePath])
      if (storageErr) throw storageErr

      const { error: deleteErr } = await supabase.from('arge_files').delete().eq('id', id)
      if (deleteErr) throw deleteErr

      setFiles((prev) => prev.filter((file) => file.id !== id))
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Dosya silinemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function startEditFile(file: ArgeFile) {
    setEditingFileId(file.id)
    setEditingFileForm({
      title: file.title,
      description: file.description ?? '',
      cardId: file.cardId ?? '',
      createdBy: file.createdBy,
    })
  }

  function cancelEditFile() {
    setEditingFileId(null)
    setEditingFileForm(createEmptyArgeFileFormState())
  }

  async function handleUpdateFile(id: string) {
    if (!supabase) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error: updateErr } = await supabase
        .from('arge_files')
        .update({
          title: editingFileForm.title.trim(),
          description: editingFileForm.description.trim() || null,
          card_id: editingFileForm.cardId || null,
          created_by: editingFileForm.createdBy,
        })
        .eq('id', id)
        .select('*')
        .single()

      if (updateErr || !data) throw updateErr ?? new Error('Dosya güncellenemedi.')

      setFiles((prev) =>
        prev.map((file) => (file.id === id ? mapArgeFileRow(data as ArgeFileRow) : file))
      )
      cancelEditFile()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Dosya güncellenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleAssignLinkToCard(linkId: string, cardId: string) {
    if (!supabase) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error: updateErr } = await supabase
        .from('arge_links')
        .update({ card_id: cardId || null })
        .eq('id', linkId)
        .select('*')
        .single()

      if (updateErr || !data) throw updateErr ?? new Error('Kart ataması güncellenemedi.')

      setLinks((prev) =>
        prev.map((link) => (link.id === linkId ? mapArgeLinkRow(data as ArgeLinkRow) : link))
      )
    } catch (updateError) {
      const message =
        updateError instanceof Error ? updateError.message : 'Kart ataması güncellenemedi.'
      setError(
        message.includes('card_id')
          ? 'Kart ataması için veritabanında son migration henüz uygulanmamış.'
          : message
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleAssignFileToCard(fileId: string, cardId: string) {
    if (!supabase) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error: updateErr } = await supabase
        .from('arge_files')
        .update({ card_id: cardId || null })
        .eq('id', fileId)
        .select('*')
        .single()

      if (updateErr || !data) throw updateErr ?? new Error('Kart ataması güncellenemedi.')

      setFiles((prev) =>
        prev.map((file) => (file.id === fileId ? mapArgeFileRow(data as ArgeFileRow) : file))
      )
    } catch (updateError) {
      const message =
        updateError instanceof Error ? updateError.message : 'Kart ataması güncellenemedi.'
      setError(
        message.includes('card_id')
          ? 'Kart ataması için veritabanında son migration henüz uygulanmamış.'
          : message
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleViewFile(file: ArgeFile) {
    if (!supabase) return

    try {
      const { data, error: signedErr } = await supabase.storage
        .from('arge-files')
        .createSignedUrl(file.filePath, 300)

      if (signedErr || !data) throw signedErr ?? new Error('Dosya görüntülenemedi.')

      window.open(data.signedUrl, '_blank')
    } catch (viewError) {
      setError(viewError instanceof Error ? viewError.message : 'Dosya görüntülenemedi.')
    }
  }

  async function handleDownloadFile(file: ArgeFile) {
    if (!supabase) return

    try {
      const { data, error: signedErr } = await supabase.storage
        .from('arge-files')
        .createSignedUrl(file.filePath, 300)

      if (signedErr || !data) throw signedErr ?? new Error('Dosya indirilemedi.')

      const link = document.createElement('a')
      link.href = data.signedUrl
      link.download = file.fileName
      link.click()
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : 'Dosya indirilemedi.')
    }
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'links', label: 'Linkler' },
    { key: 'cards', label: 'Kartlar' },
    { key: 'files', label: 'Dosyalar' },
  ]

  return (
    <section className="space-y-6" aria-labelledby="arge-manager-heading">
      <div className="space-y-2">
        <h2 id="arge-manager-heading" className="text-xl font-semibold text-gray-900">
          ARGE Yönetimi
        </h2>
        <p className="max-w-3xl text-sm text-gray-500">
          Kartları oluşturun, ARGE altında gruplanmış görün ve linklerle dosyaları ilgili karta
          bağlayın.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="space-y-4" aria-labelledby="arge-card-map-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <h3 id="arge-card-map-heading" className="text-lg font-semibold text-gray-900">
              ARGE Altındaki Kartlar
            </h3>
            <p className="text-sm text-gray-500">
              Kartlar burada görünür; her kartın altında ona atanmis link ve dosyalar listelenir.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5">
              {cards.length} kart
            </span>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5">
              {links.length} link
            </span>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5">
              {files.length} dosya
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-8 text-center text-sm text-gray-400">
            Yükleniyor…
          </div>
        ) : cardGroups.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Henüz kart yok. Aşağıdaki Kartlar sekmesinden ilk kartı ekleyin.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {cardGroups.map(({ card, links: linkedLinks, files: linkedFiles }) => (
              <div
                key={card.id}
                className="space-y-4 rounded-2xl border border-[rgba(66,133,244,0.12)] bg-white p-5 shadow-[0_10px_20px_rgba(60,64,67,0.04)]"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-base font-semibold text-gray-900">{card.title}</h4>
                      {card.description && (
                        <p className="text-sm text-gray-500">{card.description}</p>
                      )}
                    </div>
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                      {linkedLinks.length} link | {linkedFiles.length} dosya
                    </span>
                  </div>
                  {card.content && (
                    <p className="text-sm leading-6 text-gray-600 whitespace-pre-line">
                      {card.content}
                    </p>
                  )}
                  <p className="text-[11px] text-gray-400">Ekleyen: {card.createdBy}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Bağlı Linkler
                    </p>
                    {linkedLinks.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-400">
                        Bu karta bagli link yok.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {linkedLinks.map((link) => (
                          <div
                            key={link.id}
                            className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-3"
                          >
                            <p className="text-sm font-medium text-gray-900">{link.title}</p>
                            {link.description && (
                              <p className="mt-1 text-xs text-gray-500">{link.description}</p>
                            )}
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
                            >
                              <ExternalLink size={12} />
                              Linki ac
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Bağlı Dosyalar
                    </p>
                    {linkedFiles.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-400">
                        Bu karta bagli dosya yok.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {linkedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-3"
                          >
                            <p className="text-sm font-medium text-gray-900">{file.title}</p>
                            {file.description && (
                              <p className="mt-1 text-xs text-gray-500">{file.description}</p>
                            )}
                            <button
                              type="button"
                              onClick={() => void handleViewFile(file)}
                              className="mt-2 inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
                            >
                              <Eye size={12} />
                              Dosyayi ac
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {(unassignedLinks.length > 0 || unassignedFiles.length > 0) && (
          <div className="rounded-2xl border border-dashed border-[rgba(66,133,244,0.2)] bg-white px-4 py-4">
            <p className="text-sm font-semibold text-gray-900">Atanmamış içerikler</p>
            <p className="mt-1 text-sm text-gray-500">
              Kart secilmeden eklenen link ve dosyalar buraya duser; asagidaki dropdownlardan
              istediğiniz karta baglayabilirsiniz.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
              {unassignedLinks.length > 0 && (
                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
                  {unassignedLinks.length} link atanmamis
                </span>
              )}
              {unassignedFiles.length > 0 && (
                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
                  {unassignedFiles.length} dosya atanmamis
                </span>
              )}
            </div>
          </div>
        )}
      </section>

      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab.key
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'links' && (
        <div className="space-y-4">
          <AccordionCard
            defaultOpenId="new-arge-link"
            items={[
              {
                id: 'new-arge-link',
                title: 'Yeni Link Ekle',
                accentColor: '#1A6DC2',
                children: (
                  <form
                    onSubmit={handleCreateLink}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                  >
                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Başlık
                      </span>
                      <input
                        type="text"
                        value={linkForm.title}
                        onChange={(e) =>
                          setLinkForm((state) => ({ ...state, title: e.target.value }))
                        }
                        placeholder="Başlık"
                        className={INPUT_CLS}
                        required
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        URL
                      </span>
                      <input
                        type="url"
                        value={linkForm.url}
                        onChange={(e) =>
                          setLinkForm((state) => ({ ...state, url: e.target.value }))
                        }
                        placeholder="https://..."
                        className={INPUT_CLS}
                        required
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Açıklama
                      </span>
                      <input
                        type="text"
                        value={linkForm.description}
                        onChange={(e) =>
                          setLinkForm((state) => ({ ...state, description: e.target.value }))
                        }
                        placeholder="Açıklama"
                        className={INPUT_CLS}
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Kart
                      </span>
                      <select
                        value={linkForm.cardId}
                        onChange={(e) =>
                          setLinkForm((state) => ({ ...state, cardId: e.target.value }))
                        }
                        className={INPUT_CLS}
                      >
                        <option value={EMPTY_CARD_VALUE}>Kart secmeden ekle</option>
                        {cardOptions.map((card) => (
                          <option key={card.value} value={card.value}>
                            {card.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-2 sm:col-span-2 lg:col-span-3">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Kim
                      </span>
                      <select
                        value={linkForm.createdBy}
                        onChange={(e) =>
                          setLinkForm((state) => ({
                            ...state,
                            createdBy: e.target.value as ArgeAuthor,
                          }))
                        }
                        className={INPUT_CLS}
                      >
                        {ARGE_AUTHORS.map((author) => (
                          <option key={author} value={author}>
                            {author}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="flex items-end sm:col-span-2 lg:col-span-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-60"
                      >
                        <Plus size={16} className="mr-1 inline" />
                        {isSubmitting ? 'Kaydediliyor...' : 'Ekle'}
                      </button>
                    </div>
                  </form>
                ),
              },
            ]}
          />

          {isLoading ? (
            <div className="p-8 text-center text-sm text-gray-400">Yükleniyor…</div>
          ) : links.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
              Henüz link yok.
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((link) => {
                const isEditingLink = editingLinkId === link.id

                return (
                  <div
                    key={link.id}
                    className="flex flex-col gap-4 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 lg:flex-row lg:items-start lg:justify-between"
                  >
                    <div className="flex-1 space-y-3">
                      {isEditingLink ? (
                        <>
                          <input
                            type="text"
                            value={editingLinkForm.title}
                            onChange={(e) =>
                              setEditingLinkForm((state) => ({ ...state, title: e.target.value }))
                            }
                            placeholder="Başlık"
                            className={INPUT_CLS}
                          />
                          <input
                            type="url"
                            value={editingLinkForm.url}
                            onChange={(e) =>
                              setEditingLinkForm((state) => ({ ...state, url: e.target.value }))
                            }
                            placeholder="https://..."
                            className={INPUT_CLS}
                          />
                          <input
                            type="text"
                            value={editingLinkForm.description}
                            onChange={(e) =>
                              setEditingLinkForm((state) => ({
                                ...state,
                                description: e.target.value,
                              }))
                            }
                            placeholder="Açıklama"
                            className={INPUT_CLS}
                          />
                        </>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-gray-900">{link.title}</p>
                          {link.description && (
                            <p className="text-xs text-gray-500">{link.description}</p>
                          )}
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
                          >
                            <ExternalLink size={12} /> {link.url}
                          </a>
                          <p className="text-[11px] text-gray-400">Ekleyen: {link.createdBy}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[320px]">
                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Bağlı Kart
                        </span>
                        <select
                          value={
                            isEditingLink
                              ? editingLinkForm.cardId
                              : (link.cardId ?? EMPTY_CARD_VALUE)
                          }
                          onChange={(e) =>
                            isEditingLink
                              ? setEditingLinkForm((state) => ({
                                  ...state,
                                  cardId: e.target.value,
                                }))
                              : void handleAssignLinkToCard(link.id, e.target.value)
                          }
                          disabled={isSubmitting}
                          className={INPUT_CLS}
                        >
                          <option value={EMPTY_CARD_VALUE}>Kart atama</option>
                          {cardOptions.map((card) => (
                            <option key={card.value} value={card.value}>
                              {card.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Kim
                        </span>
                        <select
                          value={isEditingLink ? editingLinkForm.createdBy : link.createdBy}
                          onChange={(e) =>
                            isEditingLink
                              ? setEditingLinkForm((state) => ({
                                  ...state,
                                  createdBy: e.target.value as ArgeAuthor,
                                }))
                              : undefined
                          }
                          disabled={isSubmitting || !isEditingLink}
                          className={INPUT_CLS}
                        >
                          {ARGE_AUTHORS.map((author) => (
                            <option key={author} value={author}>
                              {author}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div className="flex flex-wrap justify-end gap-2">
                        {isEditingLink ? (
                          <>
                            <button
                              type="button"
                              onClick={() => void handleUpdateLink(link.id)}
                              disabled={isSubmitting}
                              className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}
                            >
                              <Save size={14} />
                              Kaydet
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditLink}
                              disabled={isSubmitting}
                              className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                            >
                              <X size={14} />
                              İptal
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startEditLink(link)}
                            disabled={isSubmitting}
                            className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                          >
                            <Pencil size={14} />
                            Düzenle
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => void handleDeleteLink(link.id)}
                          disabled={isSubmitting}
                          className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}
                        >
                          <Trash2 size={14} />
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'cards' && (
        <div className="space-y-4">
          <AccordionCard
            defaultOpenId="new-arge-card"
            items={[
              {
                id: 'new-arge-card',
                title: 'Yeni Kart Ekle',
                accentColor: '#FB8C00',
                children: (
                  <form onSubmit={handleCreateCard} className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Başlık
                        </span>
                        <input
                          type="text"
                          value={cardForm.title}
                          onChange={(e) =>
                            setCardForm((state) => ({ ...state, title: e.target.value }))
                          }
                          placeholder="Başlık"
                          className={INPUT_CLS}
                          required
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Kim
                        </span>
                        <select
                          value={cardForm.createdBy}
                          onChange={(e) =>
                            setCardForm((state) => ({
                              ...state,
                              createdBy: e.target.value as ArgeAuthor,
                            }))
                          }
                          className={INPUT_CLS}
                        >
                          {ARGE_AUTHORS.map((author) => (
                            <option key={author} value={author}>
                              {author}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Açıklama
                      </span>
                      <input
                        type="text"
                        value={cardForm.description}
                        onChange={(e) =>
                          setCardForm((state) => ({ ...state, description: e.target.value }))
                        }
                        placeholder="Kısa açıklama"
                        className={INPUT_CLS}
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Detaylı İçerik
                      </span>
                      <textarea
                        value={cardForm.content}
                        onChange={(e) =>
                          setCardForm((state) => ({ ...state, content: e.target.value }))
                        }
                        rows={4}
                        placeholder="Detaylı içerik..."
                        className={INPUT_CLS}
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-60"
                    >
                      <Plus size={16} className="mr-1 inline" />
                      {isSubmitting ? 'Kaydediliyor...' : 'Ekle'}
                    </button>
                  </form>
                ),
              },
            ]}
          />

          {isLoading ? (
            <div className="p-8 text-center text-sm text-gray-400">Yükleniyor…</div>
          ) : cards.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
              Henüz kart yok.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {cards.map((card) => {
                const relatedLinkCount = links.filter((link) => link.cardId === card.id).length
                const relatedFileCount = files.filter((file) => file.cardId === card.id).length
                const isEditingCard = editingCardId === card.id

                return (
                  <div
                    key={card.id}
                    className="space-y-3 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        {isEditingCard ? (
                          <>
                            <input
                              type="text"
                              value={editingCardForm.title}
                              onChange={(e) =>
                                setEditingCardForm((state) => ({
                                  ...state,
                                  title: e.target.value,
                                }))
                              }
                              placeholder="Başlık"
                              className={INPUT_CLS}
                            />
                            <input
                              type="text"
                              value={editingCardForm.description}
                              onChange={(e) =>
                                setEditingCardForm((state) => ({
                                  ...state,
                                  description: e.target.value,
                                }))
                              }
                              placeholder="Kısa açıklama"
                              className={INPUT_CLS}
                            />
                          </>
                        ) : (
                          <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-gray-900">{card.title}</h3>
                            {card.description && (
                              <p className="text-xs text-gray-500">{card.description}</p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap justify-end gap-2">
                        {isEditingCard ? (
                          <>
                            <button
                              type="button"
                              onClick={() => void handleUpdateCard(card.id)}
                              disabled={isSubmitting}
                              className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}
                            >
                              <Save size={14} />
                              Kaydet
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditCard}
                              disabled={isSubmitting}
                              className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                            >
                              <X size={14} />
                              İptal
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startEditCard(card)}
                            disabled={isSubmitting}
                            className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                          >
                            <Pencil size={14} />
                            Düzenle
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => void handleDeleteCard(card.id)}
                          disabled={isSubmitting}
                          className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {isEditingCard ? (
                      <>
                        <textarea
                          value={editingCardForm.content}
                          onChange={(e) =>
                            setEditingCardForm((state) => ({ ...state, content: e.target.value }))
                          }
                          rows={5}
                          placeholder="Detaylı içerik..."
                          className={INPUT_CLS}
                        />
                        <select
                          value={editingCardForm.createdBy}
                          onChange={(e) =>
                            setEditingCardForm((state) => ({
                              ...state,
                              createdBy: e.target.value as ArgeAuthor,
                            }))
                          }
                          className={INPUT_CLS}
                        >
                          {ARGE_AUTHORS.map((author) => (
                            <option key={author} value={author}>
                              {author}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      card.content && (
                        <p className="text-sm text-gray-600 whitespace-pre-line">{card.content}</p>
                      )
                    )}

                    <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1">
                        {relatedLinkCount} link
                      </span>
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1">
                        {relatedFileCount} dosya
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-400">
                      Ekleyen: {isEditingCard ? editingCardForm.createdBy : card.createdBy}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'files' && (
        <div className="space-y-4">
          <AccordionCard
            defaultOpenId="new-arge-file"
            items={[
              {
                id: 'new-arge-file',
                title: 'Yeni Dosya Yükle',
                accentColor: '#4CAF50',
                children: (
                  <form
                    onSubmit={handleCreateFile}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                  >
                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Başlık
                      </span>
                      <input
                        type="text"
                        value={fileForm.title}
                        onChange={(e) =>
                          setFileForm((state) => ({ ...state, title: e.target.value }))
                        }
                        placeholder="Başlık"
                        className={INPUT_CLS}
                        required
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Açıklama
                      </span>
                      <input
                        type="text"
                        value={fileForm.description}
                        onChange={(e) =>
                          setFileForm((state) => ({ ...state, description: e.target.value }))
                        }
                        placeholder="Açıklama"
                        className={INPUT_CLS}
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Kart
                      </span>
                      <select
                        value={fileForm.cardId}
                        onChange={(e) =>
                          setFileForm((state) => ({ ...state, cardId: e.target.value }))
                        }
                        className={INPUT_CLS}
                      >
                        <option value={EMPTY_CARD_VALUE}>Kart secmeden ekle</option>
                        {cardOptions.map((card) => (
                          <option key={card.value} value={card.value}>
                            {card.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Kim
                      </span>
                      <select
                        value={fileForm.createdBy}
                        onChange={(e) =>
                          setFileForm((state) => ({
                            ...state,
                            createdBy: e.target.value as ArgeAuthor,
                          }))
                        }
                        className={INPUT_CLS}
                      >
                        {ARGE_AUTHORS.map((author) => (
                          <option key={author} value={author}>
                            {author}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-2 sm:col-span-2 lg:col-span-3">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Dosya
                      </span>
                      <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                        className={INPUT_CLS}
                        required
                      />
                    </label>

                    <div className="flex items-end sm:col-span-2 lg:col-span-1">
                      <button
                        type="submit"
                        disabled={isSubmitting || !selectedFile}
                        className="w-full rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-60"
                      >
                        <Upload size={16} className="mr-1 inline" />
                        {isSubmitting ? 'Yükleniyor...' : 'Yükle'}
                      </button>
                    </div>
                  </form>
                ),
              },
            ]}
          />

          {isLoading ? (
            <div className="p-8 text-center text-sm text-gray-400">Yükleniyor…</div>
          ) : files.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
              Henüz dosya yok.
            </div>
          ) : (
            <div className="space-y-3">
              {files.map((file) => {
                const isEditingFile = editingFileId === file.id

                return (
                  <div
                    key={file.id}
                    className="flex flex-col gap-4 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 lg:flex-row lg:items-start lg:justify-between"
                  >
                    <div className="flex-1 space-y-3">
                      {isEditingFile ? (
                        <>
                          <input
                            type="text"
                            value={editingFileForm.title}
                            onChange={(e) =>
                              setEditingFileForm((state) => ({ ...state, title: e.target.value }))
                            }
                            placeholder="Başlık"
                            className={INPUT_CLS}
                          />
                          <input
                            type="text"
                            value={editingFileForm.description}
                            onChange={(e) =>
                              setEditingFileForm((state) => ({
                                ...state,
                                description: e.target.value,
                              }))
                            }
                            placeholder="Açıklama"
                            className={INPUT_CLS}
                          />
                        </>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-gray-900">{file.title}</p>
                          {file.description && (
                            <p className="text-xs text-gray-500">{file.description}</p>
                          )}
                          <p className="text-[11px] text-gray-400">
                            {file.fileName} | {file.createdBy}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[320px]">
                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Bağlı Kart
                        </span>
                        <select
                          value={
                            isEditingFile
                              ? editingFileForm.cardId
                              : (file.cardId ?? EMPTY_CARD_VALUE)
                          }
                          onChange={(e) =>
                            isEditingFile
                              ? setEditingFileForm((state) => ({
                                  ...state,
                                  cardId: e.target.value,
                                }))
                              : void handleAssignFileToCard(file.id, e.target.value)
                          }
                          disabled={isSubmitting}
                          className={INPUT_CLS}
                        >
                          <option value={EMPTY_CARD_VALUE}>Kart atama</option>
                          {cardOptions.map((card) => (
                            <option key={card.value} value={card.value}>
                              {card.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Kim
                        </span>
                        <select
                          value={isEditingFile ? editingFileForm.createdBy : file.createdBy}
                          onChange={(e) =>
                            isEditingFile
                              ? setEditingFileForm((state) => ({
                                  ...state,
                                  createdBy: e.target.value as ArgeAuthor,
                                }))
                              : undefined
                          }
                          disabled={isSubmitting || !isEditingFile}
                          className={INPUT_CLS}
                        >
                          {ARGE_AUTHORS.map((author) => (
                            <option key={author} value={author}>
                              {author}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div className="flex flex-wrap justify-end gap-2">
                        {isEditingFile ? (
                          <>
                            <button
                              type="button"
                              onClick={() => void handleUpdateFile(file.id)}
                              disabled={isSubmitting}
                              className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}
                            >
                              <Save size={14} />
                              Kaydet
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditFile}
                              disabled={isSubmitting}
                              className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                            >
                              <X size={14} />
                              İptal
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startEditFile(file)}
                            disabled={isSubmitting}
                            className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                          >
                            <Pencil size={14} />
                            Düzenle
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => void handleViewFile(file)}
                          className={`${BTN_CLS} border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100`}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDownloadFile(file)}
                          className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}
                        >
                          <Download size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDeleteFile(file.id, file.filePath)}
                          disabled={isSubmitting}
                          className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
