import { ReactNode } from 'react'

interface CompactFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
}

export function CompactField({
  label,
  value,
  onChange,
  placeholder,
  required,
}: CompactFieldProps) {
  return (
    <label className="flex min-w-[8rem] flex-1 flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="h-9 rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
      />
    </label>
  )
}

interface CompactSelectProps {
  label: string
  value: string
  options: readonly string[]
  onChange: (v: string) => void
}

export function CompactSelect({
  label,
  value,
  options,
  onChange,
}: CompactSelectProps) {
  return (
    <label className="flex min-w-[8rem] flex-1 flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === '' ? '—' : opt}
          </option>
        ))}
      </select>
    </label>
  )
}

interface CompactTextareaProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export function CompactTextarea({
  label,
  value,
  onChange,
  placeholder,
}: CompactTextareaProps) {
  return (
    <label className="flex w-full flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
      />
    </label>
  )
}

interface EditableCellProps {
  editing: boolean
  value: string
  onChange: (v: string) => void
  required?: boolean
}

export function EditableCell({
  editing,
  value,
  onChange,
  required,
}: EditableCellProps) {
  return (
    <td className="px-4 py-3.5 text-gray-600">
      {editing ? (
        <input
          type="text"
          value={value === '-' ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
        />
      ) : (
        value || '-'
      )}
    </td>
  )
}

interface EditableSelectCellProps {
  editing: boolean
  value: string
  options: readonly string[]
  onChange: (v: string) => void
}

export function EditableSelectCell({
  editing,
  value,
  options,
  onChange,
}: EditableSelectCellProps) {
  return (
    <td className="px-4 py-3.5 text-gray-600">
      {editing ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt === '' ? '—' : opt}
            </option>
          ))}
        </select>
      ) : (
        value || '-'
      )}
    </td>
  )
}

interface InfoPairProps {
  label: string
  value: string
}

export function InfoPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 rounded-xl border border-[rgba(66,133,244,0.08)] bg-gray-50/50 px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
        {label}
      </p>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  )
}
