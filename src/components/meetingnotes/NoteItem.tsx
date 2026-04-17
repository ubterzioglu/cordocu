import { getCategoryById } from '@/lib/meeting-notes-data'

export function DateBadge({ date, color }: { date: string; color: string }) {
  return (
    <span
      className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold dark:bg-opacity-20 dark:border-opacity-30"
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

export function CategoryBadge({
  category,
  showLabel,
}: {
  category: string
  showLabel?: boolean
}) {
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

export function SourceBadge({ source }: { source: string }) {
  const src = MEETING_SOURCES.find((s) => s.key === source)
  if (!src) return null
  const colors: Record<string, string> = {
    T1: '#4285F4',
    T2: '#34A853',
    T3: '#EA4335',
    WA: '#FA7B17',
  }
  const color = colors[source] ?? '#666'
  return (
    <span
      className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold"
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      {src.date}
    </span>
  )
}

import { MEETING_SOURCES } from '@/lib/meeting-notes-data'

export function NoteRow({
  note,
  categoryColor,
}: {
  note: { id: string; content: string; category: string; date: string; source: string }
  categoryColor?: string
}) {
  const cat = getCategoryById(note.category)
  return (
    <div className="flex items-start gap-3 py-1.5">
      <CategoryBadge category={note.category} />
      <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {note.content}
      </span>
      <DateBadge date={note.date} color={categoryColor ?? cat?.color ?? '#666'} />
    </div>
  )
}
