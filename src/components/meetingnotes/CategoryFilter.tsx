import { MeetingNoteCategory } from '@/lib/meeting-notes-data'

interface CategoryFilterProps {
  categories: MeetingNoteCategory[]
  activeCategories: string[]
  onToggle: (categoryId: string) => void
  onClear: () => void
}

export default function CategoryFilter({
  categories,
  activeCategories,
  onToggle,
  onClear,
}: CategoryFilterProps) {
  const allActive = activeCategories.length === 0

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
      {categories.map((cat) => {
        const isActive = activeCategories.includes(cat.id)
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onToggle(cat.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all`}
            style={{
              background: isActive ? `${cat.color}20` : 'transparent',
              color: isActive ? cat.color : '#6b7280',
              border: `1.5px solid ${isActive ? `${cat.color}50` : 'transparent'}`,
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: cat.color, opacity: isActive ? 1 : 0.4 }}
            />
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
