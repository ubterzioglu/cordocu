'use client'

import { useEffect, useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import AccordionCard from '../ui/AccordionCard'
import {
  MEETING_CATEGORIES,
  MEETING_SOURCES,
  SOURCE_COLORS,
  fetchMeetingNotes,
  getCategoryById,
  type MeetingSource,
  type MeetingNoteItem,
} from '@/lib/meeting-notes-data'
import { DateBadge, CategoryBadge, SourceBadge, NoteRow } from './NoteItem'
import CategoryFilter from './CategoryFilter'
import SourceFilter from './SourceFilter'

export default function MeetingNotesManager() {
  const [notes, setNotes] = useState<MeetingNoteItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [activeSources, setActiveSources] = useState<MeetingSource[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadNotes()
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

  const categoryAccordionItems = MEETING_CATEGORIES.map((cat) => {
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
            <div key={note.id} className="flex items-start gap-2 py-2">
              <SourceBadge source={note.source} />
              <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {note.content}
              </span>
            </div>
          ))}
        </div>
      ),
    }
  }).filter(Boolean) as { id: string; title: string; badge: string; accentColor: string; children: React.ReactNode }[]

  const sourceAccordionItems = MEETING_SOURCES.map((src) => {
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
            <div key={note.id} className="flex items-start gap-2 py-2">
              <CategoryBadge category={note.category} showLabel />
              <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {note.content}
              </span>
            </div>
          ))}
        </div>
      ),
    }
  }).filter(Boolean) as { id: string; title: string; badge: string; accentColor: string; children: React.ReactNode }[]

  const hasFilters =
    activeCategories.length > 0 || activeSources.length > 0 || searchQuery.trim().length > 0

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
        {error}
      </div>
    )
  }

  return (
    <section className="space-y-8" aria-labelledby="meeting-notes-heading">
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
            className="w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white py-2.5 pl-9 pr-4 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-primary-500 dark:focus:ring-primary-800"
          />
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
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
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
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
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
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
            className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-8 text-center text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-800/80">
          Yükleniyor…
        </div>
      ) : (
        <>
          <div>
            <h2
              id="meeting-notes-heading"
              className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1"
            >
              Tüm Maddeler
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Toplantı 1, 2, 3 ve WhatsApp yazışmalarından derlenen tüm maddeler.
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
                        return <NoteRow key={note.id} note={note} categoryColor={cat?.color} />
                      })}
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Kategorilere Göre
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Her kategori kartının altında ilgili maddeler satır satır listelenir.
            </p>
            <AccordionCard items={categoryAccordionItems} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Toplantı Bazlı Maddeler
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Her toplantı ve WhatsApp yazışmalarından çıkan maddeler ayrı kartlarda.
            </p>
            <AccordionCard items={sourceAccordionItems} />
          </div>
        </>
      )}
    </section>
  )
}
