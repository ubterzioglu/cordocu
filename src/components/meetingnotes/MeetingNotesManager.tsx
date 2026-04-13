'use client'

import AccordionCard from '../ui/AccordionCard'
import {
  ALL_MEETING_NOTES,
  MEETING_CATEGORIES,
  MEETING_SOURCES,
  getNotesByCategory,
  getNotesBySource,
  getCategoryById,
  type MeetingSource,
  type MeetingNoteItem,
} from '@/lib/meeting-notes-data'

function DateBadge({ date, color }: { date: string; color: string }) {
  return (
    <span
      className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      {date}
    </span>
  )
}

function CategoryBadge({ category, showLabel }: { category: string; showLabel?: boolean }) {
  const cat = getCategoryById(category)
  if (!cat) return null
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ background: cat.color }}
      />
      {showLabel && (
        <span className="text-[11px] font-semibold" style={{ color: cat.color }}>
          {cat.label}
        </span>
      )}
    </span>
  )
}

function NoteRow({ note }: { note: MeetingNoteItem }) {
  const cat = getCategoryById(note.category)
  return (
    <div className="flex items-start gap-3 py-1.5">
      <CategoryBadge category={note.category} />
      <span className="flex-1 text-sm text-gray-700 leading-relaxed">{note.content}</span>
      <DateBadge date={note.date} color={cat?.color ?? '#666'} />
    </div>
  )
}

function SourceBadge({ source }: { source: MeetingSource }) {
  const src = MEETING_SOURCES.find((s) => s.key === source)
  if (!src) return null
  const colors: Record<MeetingSource, string> = {
    T1: '#4285F4',
    T2: '#34A853',
    T3: '#EA4335',
    WA: '#FA7B17',
  }
  return (
    <span
      className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold"
      style={{
        background: `${colors[source]}18`,
        color: colors[source],
        border: `1px solid ${colors[source]}40`,
      }}
    >
      {src.date}
    </span>
  )
}

export default function MeetingNotesManager() {
  const categoryAccordionItems = MEETING_CATEGORIES.map((cat) => {
    const notes = getNotesByCategory(cat.id)
    return {
      id: `cat-${cat.id}`,
      title: cat.label,
      badge: `${notes.length} madde`,
      accentColor: cat.color,
      children: (
        <div className="divide-y divide-gray-50">
          {notes.map((note) => (
            <div key={note.id} className="flex items-start gap-2 py-2">
              <SourceBadge source={note.source} />
              <span className="flex-1 text-sm text-gray-700 leading-relaxed">
                {note.content}
              </span>
            </div>
          ))}
        </div>
      ),
    }
  })

  const sourceColors: Record<MeetingSource, string> = {
    T1: '#4285F4',
    T2: '#34A853',
    T3: '#EA4335',
    WA: '#FA7B17',
  }

  const sourceAccordionItems = MEETING_SOURCES.map((src) => {
    const notes = getNotesBySource(src.key)
    const color = sourceColors[src.key]
    return {
      id: `src-${src.key}`,
      title: `${src.label} — ${src.date}`,
      badge: `${notes.length} madde`,
      accentColor: color,
      children: (
        <div className="divide-y divide-gray-50">
          {notes.map((note) => (
            <div key={note.id} className="flex items-start gap-2 py-2">
              <CategoryBadge category={note.category} showLabel />
              <span className="flex-1 text-sm text-gray-700 leading-relaxed">
                {note.content}
              </span>
            </div>
          ))}
        </div>
      ),
    }
  })

  return (
    <section className="space-y-10" aria-labelledby="meeting-notes-heading">

      <div>
        <h2
          id="meeting-notes-heading"
          className="text-xl font-semibold text-gray-900 mb-1"
        >
          Tüm Maddeler
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Toplantı 1, 2, 3 ve WhatsApp yazışmalarından derlenen tüm maddeler.
        </p>
        <AccordionCard
          defaultOpenId="all-notes"
          items={[
            {
              id: 'all-notes',
              title: 'Toplantı & WA — Tüm Maddeler',
              badge: `${ALL_MEETING_NOTES.length} madde`,
              accentColor: '#1A6DC2',
              children: (
                <div className="divide-y divide-gray-100">
                  {ALL_MEETING_NOTES.map((note) => (
                    <NoteRow key={note.id} note={note} />
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Kategorilere Göre
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Her kategori kartının altında ilgili maddeler satır satır listelenir.
        </p>
        <AccordionCard items={categoryAccordionItems} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Toplantı Bazlı Maddeler
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Her toplantı ve WhatsApp yazışmalarından çıkan maddeler ayrı kartlarda.
        </p>
        <AccordionCard items={sourceAccordionItems} />
      </div>
    </section>
  )
}
