'use client'

import { useEffect, useState, useMemo } from 'react'
import { Plus, Search } from 'lucide-react'
import AccordionCard from '../ui/AccordionCard'
import {
  MEETING_CATEGORIES,
  MEETING_SOURCES,
  SOURCE_COLORS,
  fetchMeetingNotes,
  createMeetingNote,
  updateMeetingNote,
  deleteMeetingNote,
  getCategoryById,
  createEmptyMeetingNoteFormState,
  type MeetingSource,
  type MeetingNoteItem,
  type MeetingNoteFormState,
} from '@/lib/meeting-notes-data'
import { EditableNoteRow } from './NoteItem'
import CategoryFilter from './CategoryFilter'
import SourceFilter from './SourceFilter'

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

export default function MeetingNotesManager() {
  const [notes, setNotes] = useState<MeetingNoteItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [activeSources, setActiveSources] = useState<MeetingSource[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingState, setEditingState] = useState<MeetingNoteFormState>(
    createEmptyMeetingNoteFormState
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [createFormState, setCreateFormState] = useState<MeetingNoteFormState>(
    createEmptyMeetingNoteFormState
  )
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    void loadNotes()
  }, [])

  async function loadNotes() {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchMeetingNotes()
      setNotes(data)
    } catch {
      setError('Toplantı notları yüklenemedi.')
    } finally {
      setIsLoading(false)
    }
  }

  function startEdit(note: MeetingNoteItem) {
    setEditingId(note.id)
    setEditingState({
      content: note.content,
      category: note.category,
      source: note.source,
      date: note.date,
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingState(createEmptyMeetingNoteFormState())
  }

  async function handleUpdate(noteId: string) {
    setIsSubmitting(true)
    setError(null)
    try {
      const updated = await updateMeetingNote(noteId, editingState)
      if (!updated) throw new Error('Güncelleme başarısız.')
      setNotes((prev) => prev.map((n) => (n.id === noteId ? updated : n)))
      cancelEdit()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Güncelleme başarısız.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(noteId: string) {
    if (typeof window !== 'undefined' && !window.confirm('Bu madde silinsin mi?')) return
    setIsSubmitting(true)
    setError(null)
    try {
      const ok = await deleteMeetingNote(noteId)
      if (!ok) throw new Error('Silme başarısız.')
      setNotes((prev) => prev.filter((n) => n.id !== noteId))
      if (editingId === noteId) cancelEdit()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Silme başarısız.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsCreating(true)
    setError(null)
    try {
      const created = await createMeetingNote(createFormState)
      if (!created) throw new Error('Madde eklenemedi.')
      setNotes((prev) => [...prev, created])
      setCreateFormState(createEmptyMeetingNoteFormState())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Madde eklenemedi.')
    } finally {
      setIsCreating(false)
    }
  }

  function makeHandlers(note: MeetingNoteItem) {
    return {
      onEdit: () => startEdit(note),
      onSave: () => void handleUpdate(note.id),
      onCancel: cancelEdit,
      onDelete: () => void handleDelete(note.id),
      onEditingStateChange: setEditingState,
    }
  }

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (activeCategories.length > 0 && !activeCategories.includes(note.category)) return false
      if (activeSources.length > 0 && !activeSources.includes(note.source)) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        if (!note.content.toLowerCase().includes(q) && !note.date.toLowerCase().includes(q))
          return false
      }
      return true
    })
  }, [notes, activeCategories, activeSources, searchQuery])

  const categoryAccordionItems = useMemo(
    () =>
      MEETING_CATEGORIES.map((cat) => {
        const catNotes = filteredNotes.filter((n) => n.category === cat.id)
        if (catNotes.length === 0) return null
        return {
          id: `cat-${cat.id}`,
          title: cat.label,
          badge: `${catNotes.length} madde`,
          accentColor: cat.color,
          children: (
            <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {catNotes.map((note) => (
                <EditableNoteRow
                  key={note.id}
                  note={note}
                  categoryColor={cat.color}
                  isEditing={editingId === note.id}
                  editingState={editingId === note.id ? editingState : { content: note.content, category: note.category, source: note.source, date: note.date }}
                  isSubmitting={isSubmitting}
                  {...makeHandlers(note)}
                />
              ))}
            </div>
          ),
        }
      }).filter(Boolean) as {
        id: string
        title: string
        badge: string
        accentColor: string
        children: React.ReactNode
      }[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredNotes, editingId, editingState, isSubmitting]
  )

  const sourceAccordionItems = useMemo(
    () =>
      MEETING_SOURCES.map((src) => {
        const srcNotes = filteredNotes.filter((n) => n.source === src.key)
        if (srcNotes.length === 0) return null
        const color = SOURCE_COLORS[src.key]
        return {
          id: `src-${src.key}`,
          title: `${src.label} — ${src.date}`,
          badge: `${srcNotes.length} madde`,
          accentColor: color,
          children: (
            <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {srcNotes.map((note) => (
                <EditableNoteRow
                  key={note.id}
                  note={note}
                  categoryColor={color}
                  isEditing={editingId === note.id}
                  editingState={editingId === note.id ? editingState : { content: note.content, category: note.category, source: note.source, date: note.date }}
                  isSubmitting={isSubmitting}
                  {...makeHandlers(note)}
                />
              ))}
            </div>
          ),
        }
      }).filter(Boolean) as {
        id: string
        title: string
        badge: string
        accentColor: string
        children: React.ReactNode
      }[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredNotes, editingId, editingState, isSubmitting]
  )

  function toggleCategory(id: string) {
    setActiveCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  function toggleSource(key: MeetingSource) {
    setActiveSources((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    )
  }

  const hasFilters =
    activeCategories.length > 0 || activeSources.length > 0 || searchQuery.trim().length > 0

  return (
    <section className="space-y-8" aria-labelledby="meeting-notes-heading">
      {/* New note form */}
      <AccordionCard
        items={[
          {
            id: 'new-note',
            title: 'Yeni Madde Ekle',
            accentColor: '#1A6DC2',
            children: (
              <form onSubmit={handleCreate} className="space-y-4">
                <label className="block space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    İçerik
                  </span>
                  <textarea
                    value={createFormState.content}
                    onChange={(e) =>
                      setCreateFormState((s) => ({ ...s, content: e.target.value }))
                    }
                    rows={3}
                    placeholder="Madde içeriği..."
                    className={INPUT_CLS}
                    required
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Kategori
                    </span>
                    <select
                      value={createFormState.category}
                      onChange={(e) =>
                        setCreateFormState((s) => ({ ...s, category: e.target.value }))
                      }
                      className={INPUT_CLS}
                    >
                      {MEETING_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Kaynak
                    </span>
                    <input
                      type="text"
                      value="Manuel"
                      readOnly
                      className={`${INPUT_CLS} bg-gray-50 text-gray-600`}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Tarih
                    </span>
                    <input
                      type="text"
                      value={createFormState.date}
                      onChange={(e) =>
                        setCreateFormState((s) => ({ ...s, date: e.target.value }))
                      }
                      placeholder="örn. 17 Nisan"
                      className={INPUT_CLS}
                      required
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-60"
                >
                  <Plus size={16} aria-hidden="true" />
                  {isCreating ? 'Kaydediliyor...' : 'Yeni ekle'}
                </button>
              </form>
            ),
          },
        ]}
      />

      {/* Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Maddelerde ara..."
            className="w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white py-2.5 pl-9 pr-4 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500"
          />
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            Kategori Filtresi
          </p>
          <CategoryFilter
            categories={MEETING_CATEGORIES}
            activeCategories={activeCategories}
            onToggle={toggleCategory}
            onClear={() => setActiveCategories([])}
          />
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            Kaynak Filtresi
          </p>
          <SourceFilter
            activeSources={activeSources}
            onToggle={toggleSource}
            onClear={() => setActiveSources([])}
          />
        </div>
      </div>

      {hasFilters && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>
            {filteredNotes.length} / {notes.length} madde gösteriliyor
          </span>
          <button
            type="button"
            onClick={() => {
              setActiveCategories([])
              setActiveSources([])
              setSearchQuery('')
            }}
            className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-500 hover:bg-gray-100"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-8 text-center text-sm text-gray-400">
          Yükleniyor…
        </div>
      ) : (
        <>
          <div>
            <h2
              id="meeting-notes-heading"
              className="mb-1 text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              Tüm Maddeler
            </h2>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              Satıra tıklayın veya imleci üzerinde tutun — düzenlemek için kalem, silmek için çöp
              kutusu ikonunu kullanın.
            </p>
            <AccordionCard
              defaultOpenId="all-notes"
              items={[
                {
                  id: 'all-notes',
                  title: 'Toplantı & WA — Tüm Maddeler',
                  badge: `${filteredNotes.length} madde`,
                  accentColor: '#1A6DC2',
                  children: (
                    <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                      {filteredNotes.map((note) => {
                        const cat = getCategoryById(note.category)
                        return (
                          <EditableNoteRow
                            key={note.id}
                            note={note}
                            categoryColor={cat?.color}
                            isEditing={editingId === note.id}
                            editingState={
                              editingId === note.id
                                ? editingState
                                : {
                                    content: note.content,
                                    category: note.category,
                                    source: note.source,
                                    date: note.date,
                                  }
                            }
                            isSubmitting={isSubmitting}
                            {...makeHandlers(note)}
                          />
                        )
                      })}
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div>
            <h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Kategorilere Göre
            </h2>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              Her kategori kartının altında ilgili maddeler satır satır listelenir.
            </p>
            <AccordionCard items={categoryAccordionItems} />
          </div>

          <div>
            <h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Toplantı Bazlı Maddeler
            </h2>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              Her toplantı ve WhatsApp yazışmalarından çıkan maddeler ayrı kartlarda.
            </p>
            <AccordionCard items={sourceAccordionItems} />
          </div>
        </>
      )}
    </section>
  )
}
