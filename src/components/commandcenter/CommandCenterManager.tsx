'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { AlertTriangle, Pencil, Plus, Save, Search, Trash2, X } from 'lucide-react'
import AccordionCard from '@/components/ui/AccordionCard'
import {
  COMMAND_CENTER_ITEM_TYPES,
  createCommandCenterItem,
  createEmptyCommandCenterFormState,
  deleteCommandCenterItem,
  fetchCommandCenterItems,
  getCommandCenterItemLabel,
  sortCommandCenterItems,
  toCommandCenterFormState,
  updateCommandCenterItem,
  validateCommandCenterFormState,
  type CommandCenterFormState,
  type CommandCenterItem,
  type CommandCenterItemType,
} from '@/lib/command-center-items'
import { MEETING_SOURCES, SOURCE_COLORS } from '@/lib/meeting-notes-data'
import { TODO_ASSIGNEES, TODO_STATUSES, formatTodoDate, normalizeTodoAssignee } from '@/lib/todo-items'

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3 py-2 text-[13px] text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'
const TABLE_INPUT_CLS =
  'w-full min-w-0 rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-2.5 py-2 text-[12px] text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'
const BTN_CLS =
  'inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-semibold transition-all disabled:opacity-60'
const FILTER_SELECT_CLS =
  'min-w-[170px] rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3 py-2 text-[13px] text-gray-700 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'
const FILTER_INPUT_CLS =
  'min-w-[220px] rounded-xl border border-[rgba(66,133,244,0.15)] bg-white pl-9 pr-3 py-2 text-[13px] text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'
const CHECKBOX_CLS =
  'h-4 w-4 rounded border border-[rgba(66,133,244,0.25)] text-red-500 focus:ring-2 focus:ring-red-200'

const ITEM_TYPE_COLORS: Record<CommandCenterItemType, string> = {
  todo: '#1A6DC2',
  meeting_note: '#8B5CF6',
}

const STATUS_COLORS: Record<string, string> = {
  Baslanmadi: '#888888',
  Beklemede: '#F5A500',
  'Devam ediyor': '#1A6DC2',
  Tamamlandi: '#4CAF50',
}

interface CommandCenterManagerProps {
  title?: string
  description?: string
  compatibilityMessage?: string
  defaultItemTypeFilter?: CommandCenterItemType | 'all'
  lockedItemType?: CommandCenterItemType
}

function getItemDetail(value: string): string {
  return value.trim() || 'Detay yok'
}

function getSourceLabel(sourceCode: string | null): string {
  if (!sourceCode) return '-'
  return MEETING_SOURCES.find((source) => source.key === sourceCode)?.label ?? sourceCode
}

function getSourceAccentColor(sourceCode: string | null): string {
  if (!sourceCode) return '#6B7280'
  return SOURCE_COLORS[sourceCode as keyof typeof SOURCE_COLORS] ?? '#6B7280'
}

export default function CommandCenterManager({
  title = 'Command Center',
  description = 'Todo ve toplantı kayıtlarını tek merkezden yönetin.',
  compatibilityMessage,
  defaultItemTypeFilter = 'all',
  lockedItemType,
}: CommandCenterManagerProps) {
  const [items, setItems] = useState<CommandCenterItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedItemType, setSelectedItemType] = useState<CommandCenterItemType | 'all'>(
    lockedItemType ?? defaultItemTypeFilter
  )
  const [selectedAssignee, setSelectedAssignee] = useState<string>('Tümü')
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü')
  const [selectedStatus, setSelectedStatus] = useState<string>('Tümü')
  const [selectedSource, setSelectedSource] = useState<string>('Tümü')
  const [searchTerm, setSearchTerm] = useState('')
  const [urgentOnly, setUrgentOnly] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formState, setFormState] = useState<CommandCenterFormState>(() =>
    createEmptyCommandCenterFormState(
      lockedItemType === 'meeting_note'
        ? {
            itemType: 'meeting_note',
            assignee: 'UBT',
            status: 'Beklemede',
            legacySourceCode: 'MAN',
          }
        : lockedItemType === 'todo'
          ? { itemType: 'todo' }
          : undefined
    )
  )
  const [editingState, setEditingState] = useState<CommandCenterFormState>(() =>
    createEmptyCommandCenterFormState()
  )

  useEffect(() => {
    if (lockedItemType) {
      setSelectedItemType(lockedItemType)
      setFormState((current) => ({
        ...current,
        itemType: lockedItemType,
        assignee: lockedItemType === 'meeting_note' ? 'UBT' : current.assignee,
        status: lockedItemType === 'meeting_note' ? 'Beklemede' : current.status,
        legacySourceCode:
          lockedItemType === 'meeting_note' ? current.legacySourceCode || 'MAN' : '',
      }))
    }
  }, [lockedItemType])

  useEffect(() => {
    void loadItems()
  }, [])

  async function loadItems() {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchCommandCenterItems()
      setItems(data)
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Command center kayıtları yüklenemedi.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  function resetCreateForm(itemType?: CommandCenterItemType) {
    setFormState(
      createEmptyCommandCenterFormState(
        itemType === 'meeting_note'
          ? {
              itemType: 'meeting_note',
              assignee: 'UBT',
              status: 'Beklemede',
              legacySourceCode: 'MAN',
            }
          : itemType === 'todo'
            ? { itemType: 'todo' }
            : undefined
      )
    )
  }

  function startEdit(item: CommandCenterItem) {
    setEditingId(item.id)
    setEditingState(toCommandCenterFormState(item))
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingState(createEmptyCommandCenterFormState())
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationError = validateCommandCenterFormState(formState)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const created = await createCommandCenterItem(formState)
      if (!created) {
        throw new Error('Kayıt eklenemedi.')
      }

      setItems((current) => sortCommandCenterItems([created, ...current]))
      resetCreateForm(lockedItemType ?? formState.itemType)
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Kayıt eklenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleUpdate(itemId: string) {
    const validationError = validateCommandCenterFormState(editingState)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const updated = await updateCommandCenterItem(itemId, editingState)
      if (!updated) {
        throw new Error('Kayıt güncellenemedi.')
      }

      setItems((current) =>
        sortCommandCenterItems(
          current.map((item) => (item.id === itemId ? updated : item))
        )
      )
      cancelEdit()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Kayıt güncellenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(itemId: string) {
    if (typeof window !== 'undefined' && !window.confirm('Bu kayıt silinsin mi?')) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const deleted = await deleteCommandCenterItem(itemId)
      if (!deleted) {
        throw new Error('Kayıt silinemedi.')
      }

      setItems((current) => current.filter((item) => item.id !== itemId))
      if (editingId === itemId) {
        cancelEdit()
      }
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Kayıt silinemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const categoryOptions = useMemo(() => {
    const seen = new Set<string>()
    return items
      .map((item) => item.categoryLabel.trim())
      .filter((value) => {
        if (!value || seen.has(value)) return false
        seen.add(value)
        return true
      })
      .sort((left, right) => left.localeCompare(right, 'tr'))
  }, [items])

  const sourceOptions = useMemo(() => {
    const seen = new Set<string>()
    return items
      .map((item) => item.legacySourceCode?.trim() ?? '')
      .filter((value) => {
        if (!value || seen.has(value)) return false
        seen.add(value)
        return true
      })
      .sort((left, right) => left.localeCompare(right, 'tr'))
  }, [items])

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('tr-TR')
    const normalizedSelectedAssignee = normalizeTodoAssignee(selectedAssignee)

    return items.filter((item) => {
      const matchesType =
        (lockedItemType ?? selectedItemType) === 'all' ||
        item.itemType === (lockedItemType ?? selectedItemType)
      const matchesAssignee =
        selectedAssignee === 'Tümü' ||
        normalizeTodoAssignee(item.assignee) === normalizedSelectedAssignee
      const matchesCategory =
        selectedCategory === 'Tümü' || item.categoryLabel === selectedCategory
      const matchesStatus = selectedStatus === 'Tümü' || item.status === selectedStatus
      const matchesUrgent = !urgentOnly || item.urgent
      const matchesSource =
        selectedSource === 'Tümü' || (item.legacySourceCode ?? '') === selectedSource
      const haystack = [
        item.title,
        item.detail,
        item.categoryLabel,
        item.legacySourceDateLabel ?? '',
        item.legacySourceCategory ?? '',
        item.legacySourceTitle ?? '',
      ]
        .join(' ')
        .toLocaleLowerCase('tr-TR')
      const matchesSearch = normalizedSearch.length === 0 || haystack.includes(normalizedSearch)

      return (
        matchesType &&
        matchesAssignee &&
        matchesCategory &&
        matchesStatus &&
        matchesUrgent &&
        matchesSource &&
        matchesSearch
      )
    })
  }, [
    items,
    lockedItemType,
    searchTerm,
    selectedAssignee,
    selectedCategory,
    selectedItemType,
    selectedSource,
    selectedStatus,
    urgentOnly,
  ])

  const showSourceFilter =
    lockedItemType === 'meeting_note' ||
    selectedItemType === 'meeting_note' ||
    selectedItemType === 'all'

  return (
    <section className="space-y-6" aria-labelledby="command-center-heading">
      <div className="space-y-2">
        <h2 id="command-center-heading" className="text-xl font-semibold text-gray-900">
          {title}
        </h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {compatibilityMessage && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>{compatibilityMessage}</p>
        </div>
      )}

      <AccordionCard
        items={[
          {
            id: 'new-command-center-item',
            title: 'Yeni Kayıt Ekle',
            accentColor: '#1A6DC2',
            children: (
              <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {!lockedItemType && (
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Tip
                    </span>
                    <select
                      value={formState.itemType}
                      onChange={(event) => {
                        const nextType = event.target.value as CommandCenterItemType
                        setFormState((current) => ({
                          ...current,
                          itemType: nextType,
                          assignee: nextType === 'meeting_note' ? 'UBT' : current.assignee,
                          status: nextType === 'meeting_note' ? 'Beklemede' : current.status,
                          dueDate: nextType === 'meeting_note' ? '' : current.dueDate,
                          legacySourceCode:
                            nextType === 'meeting_note'
                              ? current.legacySourceCode || 'MAN'
                              : '',
                        }))
                      }}
                      className={INPUT_CLS}
                    >
                      {COMMAND_CENTER_ITEM_TYPES.map((itemType) => (
                        <option key={itemType} value={itemType}>
                          {getCommandCenterItemLabel(itemType)}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Başlık
                  </span>
                  <input
                    type="text"
                    value={formState.title}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, title: event.target.value }))
                    }
                    placeholder="Opsiyonel kısa başlık"
                    className={INPUT_CLS}
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Kategori / Tarih
                  </span>
                  <input
                    type="text"
                    list="command-center-category-options"
                    value={formState.categoryLabel}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        categoryLabel: event.target.value,
                      }))
                    }
                    placeholder={
                      formState.itemType === 'meeting_note' ? 'örn. 17 Nisan' : 'örn. Bot & Otomasyon'
                    }
                    className={INPUT_CLS}
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Kim
                  </span>
                  <select
                    value={formState.assignee}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        assignee: event.target.value as CommandCenterFormState['assignee'],
                      }))
                    }
                    className={INPUT_CLS}
                  >
                    {TODO_ASSIGNEES.map((assignee) => (
                      <option key={assignee} value={assignee}>
                        {assignee}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Durum
                  </span>
                  <select
                    value={formState.status}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        status: event.target.value as CommandCenterFormState['status'],
                      }))
                    }
                    className={INPUT_CLS}
                  >
                    {TODO_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Termin
                  </span>
                  <input
                    type="date"
                    value={formState.dueDate}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, dueDate: event.target.value }))
                    }
                    className={INPUT_CLS}
                    disabled={formState.itemType === 'meeting_note'}
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Kaynak Kodu
                  </span>
                  <select
                    value={formState.legacySourceCode}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        legacySourceCode: event.target.value,
                      }))
                    }
                    className={INPUT_CLS}
                    disabled={formState.itemType !== 'meeting_note'}
                  >
                    <option value="">Kaynak seç</option>
                    {MEETING_SOURCES.map((source) => (
                      <option key={source.key} value={source.key}>
                        {source.label} — {source.date}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Kaynak Tarihi
                  </span>
                  <input
                    type="text"
                    value={formState.legacySourceDateLabel}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        legacySourceDateLabel: event.target.value,
                      }))
                    }
                    placeholder="örn. 24 Nisan WA"
                    className={INPUT_CLS}
                    disabled={formState.itemType !== 'meeting_note'}
                  />
                </label>

                <label className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/70 px-3.5 py-3 text-sm font-semibold text-red-700">
                  <input
                    type="checkbox"
                    checked={formState.urgent}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, urgent: event.target.checked }))
                    }
                    className={CHECKBOX_CLS}
                  />
                  Acil!
                </label>

                <label className="space-y-2 md:col-span-2 xl:col-span-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Detay
                  </span>
                  <textarea
                    value={formState.detail}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, detail: event.target.value }))
                    }
                    placeholder="Kaydın tam açıklamasını yaz"
                    rows={4}
                    className={INPUT_CLS}
                    required
                  />
                </label>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-60"
                  >
                    <Plus size={16} className="mr-1 inline" aria-hidden="true" />
                    {isSubmitting ? 'Kaydediliyor...' : 'Yeni ekle'}
                  </button>
                </div>

                <datalist id="command-center-category-options">
                  {categoryOptions.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </form>
            ),
          },
        ]}
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 shadow-[0_10px_20px_rgba(60,64,67,0.04)]">
        <div className="flex flex-wrap items-center gap-3">
          {!lockedItemType && (
            <select
              value={selectedItemType}
              onChange={(event) =>
                setSelectedItemType(event.target.value as CommandCenterItemType | 'all')
              }
              className={FILTER_SELECT_CLS}
              aria-label="Tip filtresi"
            >
              <option value="all">Tümü - Tip</option>
              {COMMAND_CENTER_ITEM_TYPES.map((itemType) => (
                <option key={itemType} value={itemType}>
                  {getCommandCenterItemLabel(itemType)}
                </option>
              ))}
            </select>
          )}

          <select
            value={selectedAssignee}
            onChange={(event) => setSelectedAssignee(event.target.value)}
            className={FILTER_SELECT_CLS}
            aria-label="Kim filtresi"
          >
            <option value="Tümü">Tümü - Kim</option>
            {TODO_ASSIGNEES.map((assignee) => (
              <option key={assignee} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className={FILTER_SELECT_CLS}
            aria-label="Kategori filtresi"
          >
            <option value="Tümü">Tümü - Kategori</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            className={FILTER_SELECT_CLS}
            aria-label="Durum filtresi"
          >
            <option value="Tümü">Tümü - Durum</option>
            {TODO_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {showSourceFilter && (
            <select
              value={selectedSource}
              onChange={(event) => setSelectedSource(event.target.value)}
              className={FILTER_SELECT_CLS}
              aria-label="Kaynak filtresi"
            >
              <option value="Tümü">Tümü - Kaynak</option>
              {sourceOptions.map((source) => (
                <option key={source} value={source}>
                  {getSourceLabel(source)}
                </option>
              ))}
            </select>
          )}

          <label className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50/70 px-3 py-2 text-[12px] font-semibold text-red-700">
            <input
              type="checkbox"
              checked={urgentOnly}
              onChange={(event) => setUrgentOnly(event.target.checked)}
              className={CHECKBOX_CLS}
            />
            Sadece acil
          </label>

          <label className="relative min-w-[240px] flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Kayıt ara..."
              className={FILTER_INPUT_CLS}
              aria-label="Kayıt arama"
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-8 text-center text-sm text-gray-400">
            Yükleniyor…
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Henüz kayıt yok. Yukarıdaki formu kullanarak ilk kaydı ekleyin.
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Filtreye uygun kayıt bulunamadı.
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)]">
              <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full table-fixed">
                  <thead className="border-b border-[rgba(66,133,244,0.08)] bg-[rgba(66,133,244,0.02)]">
                    <tr>
                      {['Acil', 'Tip', 'Kategori / Tarih', 'Başlık & Detay', 'Kim', 'Durum', 'Termin', 'Kaynak', 'İşlem'].map((column) => (
                        <th
                          key={column}
                          scope="col"
                          className="px-2.5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500 first:pl-4 last:pr-4"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredItems.map((item) => {
                      const rowIsEditing = editingId === item.id
                      const rowState = rowIsEditing ? editingState : toCommandCenterFormState(item)

                      return (
                        <tr
                          key={item.id}
                          className="align-middle transition-colors hover:bg-[rgba(66,133,244,0.03)]"
                        >
                          <td className="pl-4 pr-2 py-3 align-middle">
                            {rowIsEditing ? (
                              <label className="flex items-center justify-center">
                                <input
                                  type="checkbox"
                                  checked={rowState.urgent}
                                  onChange={(event) =>
                                    setEditingState((current) => ({
                                      ...current,
                                      urgent: event.target.checked,
                                    }))
                                  }
                                  className={CHECKBOX_CLS}
                                  aria-label="Acil"
                                />
                              </label>
                            ) : (
                              <UrgentIndicator urgent={item.urgent} />
                            )}
                          </td>
                          <td className="px-2.5 py-3 align-middle">
                            {rowIsEditing && !lockedItemType ? (
                              <select
                                value={rowState.itemType}
                                onChange={(event) =>
                                  setEditingState((current) => ({
                                    ...current,
                                    itemType: event.target.value as CommandCenterItemType,
                                  }))
                                }
                                className={TABLE_INPUT_CLS}
                              >
                                {COMMAND_CENTER_ITEM_TYPES.map((itemType) => (
                                  <option key={itemType} value={itemType}>
                                    {getCommandCenterItemLabel(itemType)}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <ItemTypeBadge itemType={item.itemType} />
                            )}
                          </td>
                          <td className="px-2.5 py-3 align-middle">
                            {rowIsEditing ? (
                              <input
                                type="text"
                                value={rowState.categoryLabel}
                                onChange={(event) =>
                                  setEditingState((current) => ({
                                    ...current,
                                    categoryLabel: event.target.value,
                                  }))
                                }
                                className={TABLE_INPUT_CLS}
                              />
                            ) : (
                              <CategoryBadge label={item.categoryLabel} itemType={item.itemType} />
                            )}
                          </td>
                          <td className="px-2.5 py-3 align-middle text-gray-600">
                            {rowIsEditing ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={rowState.title}
                                  onChange={(event) =>
                                    setEditingState((current) => ({
                                      ...current,
                                      title: event.target.value,
                                    }))
                                  }
                                  className={TABLE_INPUT_CLS}
                                  placeholder="Başlık"
                                />
                                <textarea
                                  value={rowState.detail}
                                  onChange={(event) =>
                                    setEditingState((current) => ({
                                      ...current,
                                      detail: event.target.value,
                                    }))
                                  }
                                  className={TABLE_INPUT_CLS}
                                  rows={3}
                                />
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <p className="font-medium text-gray-900">{item.title}</p>
                                <p className="leading-5 text-gray-700">{getItemDetail(item.detail)}</p>
                              </div>
                            )}
                          </td>
                          <td className="px-2.5 py-3 align-middle text-gray-600">
                            {rowIsEditing ? (
                              <select
                                value={rowState.assignee}
                                onChange={(event) =>
                                  setEditingState((current) => ({
                                    ...current,
                                    assignee: event.target.value as CommandCenterFormState['assignee'],
                                  }))
                                }
                                className={TABLE_INPUT_CLS}
                              >
                                {TODO_ASSIGNEES.map((assignee) => (
                                  <option key={assignee} value={assignee}>
                                    {assignee}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <AssigneeCell assignee={item.assignee} />
                            )}
                          </td>
                          <td className="px-2.5 py-3 align-middle">
                            {rowIsEditing ? (
                              <select
                                value={rowState.status}
                                onChange={(event) =>
                                  setEditingState((current) => ({
                                    ...current,
                                    status: event.target.value as CommandCenterFormState['status'],
                                  }))
                                }
                                className={TABLE_INPUT_CLS}
                              >
                                {TODO_STATUSES.map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <StatusBadge status={item.status} />
                            )}
                          </td>
                          <td className="whitespace-nowrap px-2.5 py-3 align-middle text-gray-600">
                            {rowIsEditing ? (
                              <input
                                type="date"
                                value={rowState.dueDate}
                                onChange={(event) =>
                                  setEditingState((current) => ({
                                    ...current,
                                    dueDate: event.target.value,
                                  }))
                                }
                                className={TABLE_INPUT_CLS}
                                disabled={rowState.itemType === 'meeting_note'}
                              />
                            ) : (
                              formatTodoDate(item.dueDate)
                            )}
                          </td>
                          <td className="px-2.5 py-3 align-middle">
                            {rowIsEditing && rowState.itemType === 'meeting_note' ? (
                              <div className="space-y-2">
                                <select
                                  value={rowState.legacySourceCode}
                                  onChange={(event) =>
                                    setEditingState((current) => ({
                                      ...current,
                                      legacySourceCode: event.target.value,
                                    }))
                                  }
                                  className={TABLE_INPUT_CLS}
                                >
                                  <option value="">Kaynak seç</option>
                                  {MEETING_SOURCES.map((source) => (
                                    <option key={source.key} value={source.key}>
                                      {source.label}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  type="text"
                                  value={rowState.legacySourceDateLabel}
                                  onChange={(event) =>
                                    setEditingState((current) => ({
                                      ...current,
                                      legacySourceDateLabel: event.target.value,
                                    }))
                                  }
                                  className={TABLE_INPUT_CLS}
                                  placeholder="Kaynak tarihi"
                                />
                              </div>
                            ) : item.itemType === 'meeting_note' ? (
                              <SourceBadge sourceCode={item.legacySourceCode} dateLabel={item.legacySourceDateLabel} />
                            ) : (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-1.5 py-3 align-middle pr-4">
                            <div className="flex flex-nowrap items-center justify-center gap-1.5">
                              {rowIsEditing ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => void handleUpdate(item.id)}
                                    disabled={isSubmitting}
                                    className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}
                                    aria-label="Kaydet"
                                    title="Kaydet"
                                  >
                                    <Save size={14} aria-hidden="true" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={cancelEdit}
                                    disabled={isSubmitting}
                                    className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                                    aria-label="İptal"
                                    title="İptal"
                                  >
                                    <X size={14} aria-hidden="true" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => startEdit(item)}
                                  disabled={isSubmitting || editingId !== null}
                                  className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                                  aria-label="Düzenle"
                                  title="Düzenle"
                                >
                                  <Pencil size={14} aria-hidden="true" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => void handleDelete(item.id)}
                                disabled={isSubmitting}
                                className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}
                                aria-label="Sil"
                                title="Sil"
                              >
                                <Trash2 size={14} aria-hidden="true" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 p-4 md:hidden">
                {filteredItems.map((item) => {
                  const rowIsEditing = editingId === item.id
                  const rowState = rowIsEditing ? editingState : toCommandCenterFormState(item)

                  return (
                    <div
                      key={item.id}
                      className="space-y-3 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 shadow-[0_10px_20px_rgba(60,64,67,0.04)]"
                    >
                      {rowIsEditing ? (
                        <div className="space-y-3">
                          {!lockedItemType && (
                            <select
                              value={rowState.itemType}
                              onChange={(event) =>
                                setEditingState((current) => ({
                                  ...current,
                                  itemType: event.target.value as CommandCenterItemType,
                                }))
                              }
                              className={INPUT_CLS}
                            >
                              {COMMAND_CENTER_ITEM_TYPES.map((itemType) => (
                                <option key={itemType} value={itemType}>
                                  {getCommandCenterItemLabel(itemType)}
                                </option>
                              ))}
                            </select>
                          )}
                          <input
                            type="text"
                            value={rowState.title}
                            onChange={(event) =>
                              setEditingState((current) => ({
                                ...current,
                                title: event.target.value,
                              }))
                            }
                            className={INPUT_CLS}
                            placeholder="Başlık"
                          />
                          <textarea
                            value={rowState.detail}
                            onChange={(event) =>
                              setEditingState((current) => ({
                                ...current,
                                detail: event.target.value,
                              }))
                            }
                            className={INPUT_CLS}
                            rows={4}
                          />
                          <input
                            type="text"
                            value={rowState.categoryLabel}
                            onChange={(event) =>
                              setEditingState((current) => ({
                                ...current,
                                categoryLabel: event.target.value,
                              }))
                            }
                            className={INPUT_CLS}
                          />
                          <div className="grid gap-3 sm:grid-cols-2">
                            <select
                              value={rowState.assignee}
                              onChange={(event) =>
                                setEditingState((current) => ({
                                  ...current,
                                  assignee: event.target.value as CommandCenterFormState['assignee'],
                                }))
                              }
                              className={INPUT_CLS}
                            >
                              {TODO_ASSIGNEES.map((assignee) => (
                                <option key={assignee} value={assignee}>
                                  {assignee}
                                </option>
                              ))}
                            </select>
                            <select
                              value={rowState.status}
                              onChange={(event) =>
                                setEditingState((current) => ({
                                  ...current,
                                  status: event.target.value as CommandCenterFormState['status'],
                                }))
                              }
                              className={INPUT_CLS}
                            >
                              {TODO_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                            <input
                              type="date"
                              value={rowState.dueDate}
                              onChange={(event) =>
                                setEditingState((current) => ({
                                  ...current,
                                  dueDate: event.target.value,
                                }))
                              }
                              className={INPUT_CLS}
                              disabled={rowState.itemType === 'meeting_note'}
                            />
                            {rowState.itemType === 'meeting_note' && (
                              <select
                                value={rowState.legacySourceCode}
                                onChange={(event) =>
                                  setEditingState((current) => ({
                                    ...current,
                                    legacySourceCode: event.target.value,
                                  }))
                                }
                                className={INPUT_CLS}
                              >
                                <option value="">Kaynak seç</option>
                                {MEETING_SOURCES.map((source) => (
                                  <option key={source.key} value={source.key}>
                                    {source.label}
                                  </option>
                                ))}
                              </select>
                            )}
                            <label className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/70 px-3.5 py-3 text-sm font-semibold text-red-700 sm:col-span-2">
                              <input
                                type="checkbox"
                                checked={rowState.urgent}
                                onChange={(event) =>
                                  setEditingState((current) => ({
                                    ...current,
                                    urgent: event.target.checked,
                                  }))
                                }
                                className={CHECKBOX_CLS}
                              />
                              Acil!
                            </label>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <UrgentIndicator urgent={item.urgent} mobile />
                              <ItemTypeBadge itemType={item.itemType} />
                              <CategoryBadge label={item.categoryLabel} itemType={item.itemType} />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm leading-6 text-gray-700">{getItemDetail(item.detail)}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <MobileInfoPair label="Kim" value={item.assignee} assignee={item.assignee} />
                            <MobileInfoPair label="Durum" value={item.status} />
                            <MobileInfoPair label="Termin" value={formatTodoDate(item.dueDate)} />
                            <MobileInfoPair
                              label="Kaynak"
                              value={
                                item.itemType === 'meeting_note'
                                  ? `${getSourceLabel(item.legacySourceCode)} / ${item.legacySourceDateLabel ?? '-'}`
                                  : '-'
                              }
                            />
                          </div>
                        </>
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        {rowIsEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => void handleUpdate(item.id)}
                              disabled={isSubmitting}
                              className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}
                              aria-label="Kaydet"
                              title="Kaydet"
                            >
                              <Save size={14} aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              disabled={isSubmitting}
                              className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                              aria-label="İptal"
                              title="İptal"
                            >
                              <X size={14} aria-hidden="true" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            disabled={isSubmitting || editingId !== null}
                            className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                            aria-label="Düzenle"
                            title="Düzenle"
                          >
                            <Pencil size={14} aria-hidden="true" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => void handleDelete(item.id)}
                          disabled={isSubmitting}
                          className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}
                          aria-label="Sil"
                          title="Sil"
                        >
                          <Trash2 size={14} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function ItemTypeBadge({ itemType }: { itemType: CommandCenterItemType }) {
  const color = ITEM_TYPE_COLORS[itemType]

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none"
      style={{ color, background: `${color}18` }}
    >
      {getCommandCenterItemLabel(itemType)}
    </span>
  )
}

function CategoryBadge({
  label,
  itemType,
}: {
  label: string
  itemType: CommandCenterItemType
}) {
  const color = ITEM_TYPE_COLORS[itemType]

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none"
      style={{ color, background: `${color}14` }}
    >
      {label}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] ?? '#888888'

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none"
      style={{ color, background: `${color}18` }}
    >
      {status}
    </span>
  )
}

function SourceBadge({
  sourceCode,
  dateLabel,
}: {
  sourceCode: string | null
  dateLabel: string | null
}) {
  const color = getSourceAccentColor(sourceCode)

  return (
    <div className="space-y-1">
      <span
        className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none"
        style={{ color, background: `${color}18` }}
      >
        {getSourceLabel(sourceCode)}
      </span>
      {dateLabel && <p className="text-[11px] text-gray-400">{dateLabel}</p>}
    </div>
  )
}

function AssigneeAvatar({ assignee }: { assignee: string }) {
  const normalizedAssignee = normalizeTodoAssignee(assignee)
  const src =
    normalizedAssignee === normalizeTodoAssignee('Burak')
      ? '/kafaburak.png'
      : normalizedAssignee === normalizeTodoAssignee('UBT')
        ? '/kafaubt.png'
        : null

  if (!src) {
    return null
  }

  return (
    <Image
      src={src}
      alt={assignee}
      width={36}
      height={36}
      className="h-9 w-9 rounded-full border border-white/80 object-cover shadow-[0_10px_20px_rgba(60,64,67,0.2)]"
    />
  )
}

function AssigneeCell({ assignee }: { assignee: string }) {
  return (
    <div className="flex min-h-[40px] items-center justify-center">
      <AssigneeAvatar assignee={assignee} />
    </div>
  )
}

function UrgentIndicator({
  urgent,
  mobile = false,
}: {
  urgent: boolean
  mobile?: boolean
}) {
  if (!urgent) {
    return mobile ? null : <span className="block h-6 w-6" aria-hidden="true" />
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white shadow-[0_8px_18px_rgba(220,38,38,0.28)] ${
        mobile ? 'h-6 min-w-6 px-2' : 'h-6 w-6'
      }`}
      aria-label="Acil kayıt"
      title="Acil kayıt"
    >
      !
    </span>
  )
}

function MobileInfoPair({
  label,
  value,
  assignee,
}: {
  label: string
  value: string
  assignee?: string
}) {
  return (
    <div className="space-y-1 rounded-xl border border-[rgba(66,133,244,0.08)] bg-gray-50/50 px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
        {label}
      </p>
      {label === 'Kim' ? (
        <div className="flex min-h-[40px] items-center justify-center">
          <AssigneeAvatar assignee={assignee ?? value} />
        </div>
      ) : (
        <p className="text-[13px] text-gray-800">{value}</p>
      )}
    </div>
  )
}
