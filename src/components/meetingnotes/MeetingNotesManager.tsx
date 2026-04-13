'use client'

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
        color: color,
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
  return (
    <section className="space-y-10" aria-labelledby="meeting-notes-heading">

      {/* ============================================================
          BÖLÜM 1: ANA LİSTE — Tüm Maddeler
          ============================================================ */}
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

        <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)] p-5">
          <div className="divide-y divide-gray-100">
            {ALL_MEETING_NOTES.map((note) => (
              <NoteRow key={note.id} note={note} />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          BÖLÜM 2: KATEGORİ KARTLARI
          ============================================================ */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Kategorilere Göre
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Her kategori kartının altında ilgili maddeler satır satır listelenir.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {MEETING_CATEGORIES.map((cat) => {
            const notes = getNotesByCategory(cat.id)
            if (notes.length === 0) return null
            return (
              <div
                key={cat.id}
                className="rounded-2xl border bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)] overflow-hidden"
                style={{ borderColor: `${cat.color}30` }}
              >
                <div
                  className="flex items-center gap-2.5 px-5 py-3.5"
                  style={{ borderBottom: `2px solid ${cat.color}20` }}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ background: cat.color }}
                  />
                  <span className="text-sm font-bold" style={{ color: cat.color }}>
                    {cat.label}
                  </span>
                  <span
                    className="ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold"
                    style={{
                      background: `${cat.color}14`,
                      color: cat.color,
                    }}
                  >
                    {notes.length} madde
                  </span>
                </div>
                <div className="divide-y divide-gray-50 px-5 py-2">
                  {notes.map((note) => (
                    <div key={note.id} className="flex items-start gap-2 py-2">
                      <SourceBadge source={note.source} />
                      <span className="flex-1 text-sm text-gray-700 leading-relaxed">
                        {note.content}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ============================================================
          BÖLÜM 3: TARİH BAZLI KARTLAR (T1, T2, T3, WA)
          ============================================================ */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Toplantı Bazlı Maddeler
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Her toplantı ve WhatsApp yazışmalarından çıkan maddeler ayrı kartlarda.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {MEETING_SOURCES.map((src) => {
            const notes = getNotesBySource(src.key)
            const colors: Record<MeetingSource, string> = {
              T1: '#4285F4',
              T2: '#34A853',
              T3: '#EA4335',
              WA: '#FA7B17',
            }
            const color = colors[src.key]
            return (
              <div
                key={src.key}
                className="rounded-2xl border bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)] overflow-hidden"
                style={{ borderColor: `${color}30` }}
              >
                <div
                  className="flex items-center gap-2.5 px-5 py-3.5"
                  style={{ borderBottom: `2px solid ${color}20` }}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ background: color }}
                  />
                  <span className="text-sm font-bold" style={{ color }}>
                    {src.label} — {src.date}
                  </span>
                  <span
                    className="ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold"
                    style={{
                      background: `${color}14`,
                      color,
                    }}
                  >
                    {notes.length} madde
                  </span>
                </div>
                <div className="divide-y divide-gray-50 px-5 py-2">
                  {notes.map((note) => {
                    const cat = getCategoryById(note.category)
                    return (
                      <div key={note.id} className="flex items-start gap-2 py-2">
                        <CategoryBadge category={note.category} showLabel />
                        <span className="flex-1 text-sm text-gray-700 leading-relaxed">
                          {note.content}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
