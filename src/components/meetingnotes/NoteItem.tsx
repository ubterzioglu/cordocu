'use client'

import { Pencil, Save, Trash2, X } from 'lucide-react'
import {
  MEETING_CATEGORIES,
  MEETING_SOURCES,
  getCategoryById,
  type MeetingNoteFormState,
  type MeetingSource,
} from '@/lib/meeting-notes-data'

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'
const BTN_CLS =
  'inline-flex items-center justify-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all disabled:opacity-60'

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
        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
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
    T4: '#7E57C2',
    T5: '#0EA5E9',
    T6: '#EC4899',
    T7: '#F97316',
    WA: '#FA7B17',
    NO: '#8B5CF6',
    MAN: '#1A73E8',
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

export interface EditableNoteRowHandlers {
  onEdit: () => void
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
  onEditingStateChange: (state: MeetingNoteFormState) => void
}

export function EditableNoteRow({
  note,
  categoryColor,
  isEditing,
  editingState,
  isSubmitting,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onEditingStateChange,
}: {
  note: { id: string; content: string; category: string; date: string; source: string }
  categoryColor?: string
  isEditing: boolean
  editingState: MeetingNoteFormState
  isSubmitting: boolean
} & EditableNoteRowHandlers) {
  const cat = getCategoryById(note.category)

  if (isEditing) {
    return (
      <div className="space-y-3 py-3 px-1">
        <textarea
          value={editingState.content}
          onChange={(e) => onEditingStateChange({ ...editingState, content: e.target.value })}
          rows={3}
          className={INPUT_CLS}
          placeholder="Madde içeriği"
        />
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Kategori
            </span>
            <select
              value={editingState.category}
              onChange={(e) => onEditingStateChange({ ...editingState, category: e.target.value })}
              className={INPUT_CLS}
            >
              {MEETING_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Kaynak
            </span>
            <select
              value={editingState.source}
              onChange={(e) =>
                onEditingStateChange({
                  ...editingState,
                  source: e.target.value as MeetingSource,
                })
              }
              className={INPUT_CLS}
            >
              {MEETING_SOURCES.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label} — {s.date}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Tarih
            </span>
            <input
              type="text"
              value={editingState.date}
              onChange={(e) => onEditingStateChange({ ...editingState, date: e.target.value })}
              className={INPUT_CLS}
              placeholder="örn. 17 Nisan"
            />
          </label>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSave}
            disabled={isSubmitting}
            className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}
          >
            <Save size={13} aria-hidden="true" />
            Kaydet
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
          >
            <X size={13} aria-hidden="true" />
            İptal
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group flex items-start gap-3 py-1.5">
      <CategoryBadge category={note.category} />
      <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {note.content}
      </span>
      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={onEdit}
          disabled={isSubmitting}
          aria-label="Düzenle"
          className={`${BTN_CLS} border border-gray-200 text-gray-400 hover:text-gray-700`}
        >
          <Pencil size={13} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={isSubmitting}
          aria-label="Sil"
          className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-500 hover:bg-red-100`}
        >
          <Trash2 size={13} aria-hidden="true" />
        </button>
      </div>
      <DateBadge date={note.date} color={categoryColor ?? cat?.color ?? '#666'} />
    </div>
  )
}
