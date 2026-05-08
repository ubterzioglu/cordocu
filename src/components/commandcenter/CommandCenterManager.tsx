'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AlertTriangle, Pencil, Plus, Save, Search, Trash2, X } from 'lucide-react'
import AccordionCard from '@/components/ui/AccordionCard'
import {
  createCommandCenterItem,
  createEmptyCommandCenterFormState,
  deleteCommandCenterItem,
  fetchCommandCenterCategoryOptions,
  fetchCommandCenterDateGroupOptions,
  fetchCommandCenterItemCounts,
  fetchCommandCenterItems,
  getCommandCenterAssigneeLabel,
  getCommandCenterStatusLabel,
  getCommandCenterTopCategoryLabel,
  getCommandCenterDateGroupInfo,
  toCommandCenterFormState,
  updateCommandCenterItem,
  validateCommandCenterFormState,
  type CommandCenterCategoryOption,
  type CommandCenterDateGroupOption,
  type CommandCenterFormState,
  type CommandCenterItem,
  type CommandCenterItemType,
} from '@/lib/command-center-items'
import { MEETING_CATEGORIES, MEETING_SOURCES } from '@/lib/meeting-notes-data'
import {
  TODO_ASSIGNEES,
  TODO_CATEGORIES,
  TODO_STATUSES,
  formatTodoDate,
  normalizeTodoAssignee,
} from '@/lib/todo-items'

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

const TODO_COLOR = '#1A6DC2'
const MEETING_NOTE_COLOR = '#8B5CF6'

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
  lockedItemType?: CommandCenterItemType
}

function getItemDetail(value: string): string {
  return value.trim() || 'Detay yok'
}

function createDefaultFormState(
  lockedItemType?: CommandCenterItemType,
  itemTypeOverride?: CommandCenterItemType
): CommandCenterFormState {
  const itemType = itemTypeOverride ?? lockedItemType ?? 'todo'

  return createEmptyCommandCenterFormState(
    itemType === 'meeting_note'
      ? {
          itemType: 'meeting_note',
          assignee: 'UBT',
          status: 'Beklemede',
          legacySourceCode: 'MAN',
        }
      : {
          itemType: 'todo',
        }
  )
}

export default function CommandCenterManager({
  title = 'Command Center',
  description = 'Todo ve toplantı kayıtlarını tek merkezden yönetin.',
  compatibilityMessage,
  lockedItemType,
}: CommandCenterManagerProps) {
  const PAGE_SIZE = 50
  const [items, setItems] = useState<CommandCenterItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAssignee, setSelectedAssignee] = useState<string>('Tümü')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDateGroup, setSelectedDateGroup] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('Tümü')
  const [selectedSource, setSelectedSource] = useState<string>('Tümü')
  const [searchTerm, setSearchTerm] = useState('')
  const [urgentOnly, setUrgentOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [categoryOptions, setCategoryOptions] = useState<CommandCenterCategoryOption[]>([])
  const [dateGroupOptions, setDateGroupOptions] = useState<CommandCenterDateGroupOption[]>([])
  const [itemCounts, setItemCounts] = useState({ todo: 0, meetingNote: 0 })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formState, setFormState] = useState<CommandCenterFormState>(() =>
    createDefaultFormState(lockedItemType)
  )
  const [editingState, setEditingState] = useState<CommandCenterFormState>(() =>
    createEmptyCommandCenterFormState()
  )
  const activeItemType = lockedItemType

  useEffect(() => {
    if (lockedItemType) {
      setFormState(createDefaultFormState(lockedItemType, lockedItemType))
    }
  }, [lockedItemType])

  const loadItems = useCallback(async function loadItems() {
    setIsLoading((current) => current && items.length === 0)
    setIsPageLoading(items.length > 0)
    setError(null)

    try {
      const result = await fetchCommandCenterItems({
        page: currentPage,
        pageSize: PAGE_SIZE,
        itemType: activeItemType,
        assignee: selectedAssignee,
        topCategory: selectedCategory,
        status: selectedStatus,
        urgentOnly,
        sourceCode: selectedSource,
        dateGroup: selectedDateGroup,
        searchTerm,
      })
      setItems(result.items)
      setTotalCount(result.totalCount)
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Command center kayıtları yüklenemedi.'
      )
    } finally {
      setIsLoading(false)
      setIsPageLoading(false)
    }
  }, [
    PAGE_SIZE,
    activeItemType,
    currentPage,
    items.length,
    searchTerm,
    selectedAssignee,
    selectedCategory,
    selectedDateGroup,
    selectedSource,
    selectedStatus,
    urgentOnly,
  ])

  useEffect(() => {
    void loadItems()
  }, [loadItems])

  useEffect(() => {
    async function loadCounts() {
      const counts = await fetchCommandCenterItemCounts()
      setItemCounts(counts)
    }

    void loadCounts()
  }, [])

  useEffect(() => {
    async function loadCategoryOptions() {
      const options = await fetchCommandCenterCategoryOptions({
        itemType: activeItemType,
        sourceCode: selectedSource,
      })
      setCategoryOptions(options)
    }

    void loadCategoryOptions()
  }, [activeItemType, selectedSource])

  useEffect(() => {
    async function loadDateGroupOptions() {
      const options = await fetchCommandCenterDateGroupOptions({
        itemType: activeItemType,
        sourceCode: selectedSource,
        topCategory: selectedCategory,
      })
      setDateGroupOptions(options)
    }

    void loadDateGroupOptions()
  }, [activeItemType, selectedCategory, selectedSource])

  function resetCreateForm(itemType?: CommandCenterItemType) {
    setFormState(createDefaultFormState(lockedItemType, itemType))
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

      resetCreateForm(lockedItemType ?? formState.itemType)
      setItemCounts((current) => ({
        ...current,
        todo: current.todo + (created.itemType === 'todo' ? 1 : 0),
        meetingNote: current.meetingNote + (created.itemType === 'meeting_note' ? 1 : 0),
      }))

      if (currentPage !== 1) {
        setCurrentPage(1)
      } else {
        await loadItems()
      }
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

      cancelEdit()
      await loadItems()
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

      const deletedItem = items.find((item) => item.id === itemId)
      if (deletedItem) {
        setItemCounts((current) => ({
          ...current,
          todo: current.todo - (deletedItem.itemType === 'todo' ? 1 : 0),
          meetingNote: current.meetingNote - (deletedItem.itemType === 'meeting_note' ? 1 : 0),
        }))
      }

      if (editingId === itemId) {
        cancelEdit()
      }

      const nextPage = items.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage

      if (nextPage !== currentPage) {
        setCurrentPage(nextPage)
      } else {
        await loadItems()
      }
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Kayıt silinemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const showSourceFilter = activeItemType !== 'todo'
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const rangeStart = totalCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, totalCount)
  return (
    <section className="space-y-6" aria-labelledby="command-center-heading">
      <div className="space-y-3">
        {title ? (
          <h2 id="command-center-heading" className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
        ) : null}
        {description ? <p className="text-sm text-gray-500">{description}</p> : null}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-[rgba(26,109,194,0.12)] px-3 py-1 text-[#1A6DC2]">
            Todo: {itemCounts.todo}
          </span>
          <span className="rounded-full bg-[rgba(139,92,246,0.12)] px-3 py-1 text-[#8B5CF6]">
            Toplantı Notu: {itemCounts.meetingNote}
          </span>
        </div>
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
                    Konu Bazında Kategori
                  </span>
                  {formState.itemType === 'meeting_note' ? (
                    <select
                      value={formState.legacySourceCategory}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          legacySourceCategory: event.target.value,
                          categoryLabel: '',
                        }))
                      }
                      className={INPUT_CLS}
                      required
                    >
                      <option value="">Kategori seç</option>
                      {MEETING_CATEGORIES.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={formState.categoryLabel}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          categoryLabel: event.target.value,
                        }))
                      }
                      className={INPUT_CLS}
                      required
                    >
                      {TODO_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  )}
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
                        {getCommandCenterAssigneeLabel(assignee)}
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
                        {getCommandCenterStatusLabel(status)}
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
                    Tarih
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
                    placeholder={formState.itemType === 'meeting_note' ? 'örn. 24 Nisan WA' : 'Todo'}
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
          <select
            value={selectedAssignee}
            onChange={(event) => {
              setSelectedAssignee(event.target.value)
              setCurrentPage(1)
            }}
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
            onChange={(event) => {
              setSelectedCategory(event.target.value)
              setCurrentPage(1)
            }}
            className={FILTER_SELECT_CLS}
            aria-label="Kategori filtresi"
          >
            <option value="">Tümü - Kategori</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={selectedDateGroup}
            onChange={(event) => {
              setSelectedDateGroup(event.target.value)
              setCurrentPage(1)
            }}
            className={FILTER_SELECT_CLS}
            aria-label="Tip filtresi"
          >
            <option value="">Tümü - Tip</option>
            {dateGroupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(event) => {
              setSelectedStatus(event.target.value)
              setCurrentPage(1)
            }}
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
              onChange={(event) => {
                setSelectedSource(event.target.value)
                setCurrentPage(1)
              }}
              className={FILTER_SELECT_CLS}
              aria-label="Kaynak filtresi"
            >
              <option value="Tümü">Tümü - Kaynak</option>
              {MEETING_SOURCES.map((source) => (
                <option key={source.key} value={source.key}>
                  {source.label}
                </option>
              ))}
            </select>
          )}

          <label className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50/70 px-3 py-2 text-[12px] font-semibold text-red-700">
            <input
              type="checkbox"
              checked={urgentOnly}
              onChange={(event) => {
                setUrgentOnly(event.target.checked)
                setCurrentPage(1)
              }}
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
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setCurrentPage(1)
              }}
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
        ) : totalCount === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            {searchTerm || selectedCategory || selectedDateGroup || selectedAssignee !== 'Tümü' || selectedStatus !== 'Tümü' || selectedSource !== 'Tümü' || urgentOnly
              ? 'Filtreye uygun kayıt bulunamadı.'
              : 'Henüz kayıt yok. Yukarıdaki formu kullanarak ilk kaydı ekleyin.'}
          </div>
        ) : (
          <>
            {isPageLoading && (
              <div className="rounded-2xl border border-[rgba(66,133,244,0.08)] bg-[rgba(66,133,244,0.03)] px-4 py-3 text-sm text-gray-500">
                Sayfa verileri yenileniyor…
              </div>
            )}

            <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)]">
              <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full table-fixed">
                  <thead className="border-b border-[rgba(66,133,244,0.08)] bg-[rgba(66,133,244,0.02)]">
                    <tr>
                      {['Acil', 'Konu Bazında Kategori', 'Tarih', 'Başlık & Detay', 'Kim', 'Durum', 'Termin', 'İşlem'].map((column) => (
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
                    {items.map((item) => {
                      const rowIsEditing = editingId === item.id
                      const rowState = rowIsEditing ? editingState : toCommandCenterFormState(item)
                      const dateGroupInfo = getCommandCenterDateGroupInfo(item)

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
                            {rowIsEditing ? (
                              rowState.itemType === 'meeting_note' ? (
                                <select
                                  value={rowState.legacySourceCategory}
                                  onChange={(event) =>
                                    setEditingState((current) => ({
                                      ...current,
                                      legacySourceCategory: event.target.value,
                                    }))
                                  }
                                  className={TABLE_INPUT_CLS}
                                >
                                  <option value="">Kategori seç</option>
                                  {MEETING_CATEGORIES.map((category) => (
                                    <option key={category.id} value={category.id}>
                                      {category.label}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <select
                                  value={rowState.categoryLabel}
                                  onChange={(event) =>
                                    setEditingState((current) => ({
                                      ...current,
                                      categoryLabel: event.target.value,
                                    }))
                                  }
                                  className={TABLE_INPUT_CLS}
                                >
                                  {TODO_CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                      {category}
                                    </option>
                                  ))}
                                </select>
                              )
                            ) : (
                              <CategoryBadge item={item} />
                            )}
                          </td>
                          <td className="px-2.5 py-3 align-middle">
                            {rowIsEditing ? (
                              rowState.itemType === 'meeting_note' ? (
                                <input
                                  type="text"
                                  value={rowState.legacySourceDateLabel}
                                  onChange={(event) =>
                                    setEditingState((current) => ({
                                      ...current,
                                      legacySourceDateLabel: event.target.value,
                                      categoryLabel: '',
                                    }))
                                  }
                                  className={TABLE_INPUT_CLS}
                                  placeholder="Tarih"
                                />
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium leading-none text-gray-500">
                                  TODO
                                </span>
                              )
                            ) : (
                              <span className="text-[11px] font-medium text-gray-600">
                                {dateGroupInfo.label}
                              </span>
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
                                <p className="text-[13px] font-medium text-gray-900">{item.title}</p>
                                <p className="text-[12px] leading-5 text-gray-700">{getItemDetail(item.detail)}</p>
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
                                    {getCommandCenterAssigneeLabel(assignee)}
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
                                    {getCommandCenterStatusLabel(status)}
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
                {items.map((item) => {
                  const rowIsEditing = editingId === item.id
                  const rowState = rowIsEditing ? editingState : toCommandCenterFormState(item)
                  const dateGroupInfo = getCommandCenterDateGroupInfo(item)

                  return (
                    <div
                      key={item.id}
                      className="space-y-3 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 shadow-[0_10px_20px_rgba(60,64,67,0.04)]"
                    >
                      {rowIsEditing ? (
                        <div className="space-y-3">
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
                          {rowState.itemType === 'meeting_note' ? (
                            <>
                              <select
                                value={rowState.legacySourceCategory}
                                onChange={(event) =>
                                  setEditingState((current) => ({
                                    ...current,
                                    legacySourceCategory: event.target.value,
                                  }))
                                }
                                className={INPUT_CLS}
                              >
                                <option value="">Kategori seç</option>
                                {MEETING_CATEGORIES.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.label}
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
                                    categoryLabel: '',
                                  }))
                                }
                                className={INPUT_CLS}
                                placeholder="Tarih"
                              />
                            </>
                          ) : (
                            <select
                              value={rowState.categoryLabel}
                              onChange={(event) =>
                                setEditingState((current) => ({
                                  ...current,
                                  categoryLabel: event.target.value,
                                }))
                              }
                              className={INPUT_CLS}
                            >
                              {TODO_CATEGORIES.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          )}
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
                                  {getCommandCenterAssigneeLabel(assignee)}
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
                                  {getCommandCenterStatusLabel(status)}
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
                            </div>
                            <h3 className="text-[15px] font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-[13px] leading-5 text-gray-700">{getItemDetail(item.detail)}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <MobileInfoPair label="Konu Bazında Kategori" value={getCommandCenterTopCategoryLabel(item)} />
                            <MobileInfoPair label="Tarih" value={dateGroupInfo.label} />
                            <MobileInfoPair label="Kim" value={item.assignee} assignee={item.assignee} />
                            <MobileInfoPair label="Durum" value={getCommandCenterStatusLabel(item.status)} />
                            <MobileInfoPair label="Termin" value={formatTodoDate(item.dueDate)} />
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

            <div className="flex flex-col gap-3 rounded-2xl border border-[rgba(66,133,244,0.08)] bg-white px-4 py-3 text-sm text-gray-600 shadow-[0_10px_20px_rgba(60,64,67,0.04)] sm:flex-row sm:items-center sm:justify-between">
              <p>
                {rangeStart}-{rangeEnd} / {totalCount} kayıt
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1 || isPageLoading}
                  className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Önceki
                </button>
                <span className="min-w-[90px] text-center text-xs font-semibold text-gray-500">
                  Sayfa {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage >= totalPages || isPageLoading}
                  className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Sonraki
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function CategoryBadge({ item }: { item: CommandCenterItem }) {
  const color = item.itemType === 'todo' ? TODO_COLOR : MEETING_NOTE_COLOR

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none"
      style={{ color, background: `${color}14` }}
    >
      {getCommandCenterTopCategoryLabel(item)}
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
      {getCommandCenterStatusLabel(status)}
    </span>
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
