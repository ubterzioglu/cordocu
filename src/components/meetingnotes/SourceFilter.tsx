import { MeetingSource, SOURCE_COLORS, MEETING_SOURCES } from '@/lib/meeting-notes-data'

interface SourceFilterProps {
  activeSources: MeetingSource[]
  onToggle: (source: MeetingSource) => void
  onClear: () => void
}

export default function SourceFilter({ activeSources, onToggle, onClear }: SourceFilterProps) {
  const allActive = activeSources.length === 0

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onClear}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
          allActive
            ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
        }`}
      >
        Tümü
      </button>
      {MEETING_SOURCES.map((src) => {
        const isActive = activeSources.includes(src.key)
        const color = SOURCE_COLORS[src.key]
        return (
          <button
            key={src.key}
            type="button"
            onClick={() => onToggle(src.key)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
            style={{
              background: isActive ? `${color}20` : 'transparent',
              color: isActive ? color : '#6b7280',
              border: `1.5px solid ${isActive ? `${color}50` : 'transparent'}`,
            }}
          >
            {src.label} ({src.date})
          </button>
        )
      })}
    </div>
  )
}
