'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Pencil, Plus, Save, Search, Trash2, X } from 'lucide-react'
import AccordionCard from '../ui/AccordionCard'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import {
  TODO_ASSIGNEES,
  TODO_CATEGORIES,
  TODO_STATUSES,
  createEmptyTodoFormState,
  formatTodoDate,
  mapTodoRow,
  sortTodoItems,
  toTodoFormState,
  type TodoFormState,
  type TodoItem,
  type TodoItemRow,
} from '@/lib/todo-items'

const TODO_SELECT = 'id, konu, kim, ne_zaman, ayrinti, acil, durum'

const ASSIGNEE_CARDS = [
  { assignee: 'UBT' as const, color: '#1A6DC2' },
  { assignee: 'Burak' as const, color: '#4CAF50' },
]

const STATUS_COLORS: Record<string, string> = {
  Baslanmadi: '#888888',
  Beklemede: '#F5A500',
  'Devam ediyor': '#1A6DC2',
  Tamamlandi: '#4CAF50',
}

const CATEGORY_COLORS: Record<string, string> = {
  'Bot & Otomasyon': '#4F46E5',
  'Dashboard, Admin & UX': '#2563EB',
  'Landing Page & Web': '#0EA5E9',
  'İçerik, SEO & Sosyal Medya': '#DB2777',
  'Influencer, Ambassador & Partnerlikler': '#7C3AED',
  'Topluluk, Referral & Onboarding': '#F97316',
  'Veri, CRM & Analytics': '#0891B2',
  'İnsan Kaynakları & Hiring': '#16A34A',
  'Teklif, Sözleşme & Compensation': '#65A30D',
  'Finans, Legal & Şirketleşme': '#DC2626',
  'Strateji, Roadmap & PMO': '#6B7280',
  'Dokümantasyon, Drive & Operasyon': '#92400E',
}

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3 py-2 text-[13px] text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

const BTN_CLS =
  'inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-semibold transition-all disabled:opacity-60'

const FILTER_SELECT_CLS =
  'min-w-[170px] rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3 py-2 text-[13px] text-gray-700 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

const FILTER_INPUT_CLS =
  'min-w-[220px] rounded-xl border border-[rgba(66,133,244,0.15)] bg-white pl-9 pr-3 py-2 text-[13px] text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

const CHECKBOX_CLS =
  'h-4 w-4 rounded border border-[rgba(66,133,244,0.25)] text-red-500 focus:ring-2 focus:ring-red-200'

function getTodoDetail(value: string | null): string {
  return value?.trim() || 'Ayrıntı yok'
}

function validateTodoFormState(state: TodoFormState): string | null {
  if (!state.ayrinti.trim()) {
    return 'Görev ayrıntısı boş bırakılamaz.'
  }

  return null
}

export default function TodoManager() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formState, setFormState] = useState<TodoFormState>(createEmptyTodoFormState)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingState, setEditingState] = useState<TodoFormState>(createEmptyTodoFormState)
  const [selectedAssignee, setSelectedAssignee] = useState<string>('Tümü')
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü')
  const [selectedStatus, setSelectedStatus] = useState<string>('Tümü')
  const [searchTerm, setSearchTerm] = useState('')

  const supabase = getSupabaseBrowserClient()

  const isEditing = useMemo(() => editingId !== null, [editingId])

  const filteredTodos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('tr-TR')

    return todos.filter((todo) => {
      const matchesAssignee =
        selectedAssignee === 'Tümü' || todo.kim === selectedAssignee
      const matchesCategory =
        selectedCategory === 'Tümü' || todo.konu === selectedCategory
      const matchesStatus = selectedStatus === 'Tümü' || todo.durum === selectedStatus
      const matchesSearch =
        normalizedSearch.length === 0 ||
        getTodoDetail(todo.ayrinti).toLocaleLowerCase('tr-TR').includes(normalizedSearch)

      return matchesAssignee && matchesCategory && matchesStatus && matchesSearch
    })
  }, [searchTerm, selectedAssignee, selectedCategory, selectedStatus, todos])

  const todosByAssignee = useMemo(() => {
    const map: Record<string, TodoItem[]> = {}
    for (const { assignee } of ASSIGNEE_CARDS) {
      map[assignee] = filteredTodos.filter((t) => t.kim === assignee)
    }
    return map
  }, [filteredTodos])

  useEffect(() => {
    void loadTodos()
  }, [])

  async function loadTodos() {
    if (!supabase) {
      setError('Supabase bağlantısı yapılandırılmamış.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, error: fetchErr } = await supabase
        .from('todo_items')
        .select(TODO_SELECT)
        .order('ne_zaman', { ascending: true, nullsFirst: false })

      if (fetchErr) {
        throw fetchErr
      }

      setTodos(sortTodoItems((data as TodoItemRow[]).map(mapTodoRow)))
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : 'Todo listesi yüklenemedi.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!supabase) {
      setError('Supabase bağlantısı yapılandırılmamış.')
      return
    }

    const validationError = validateTodoFormState(formState)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const insertPayload = {
        konu: formState.konu,
        kim: formState.kim,
        ne_zaman: formState.neZaman || null,
        ayrinti: formState.ayrinti.trim(),
        acil: formState.acil,
        durum: formState.durum,
      }

      const { data, error: insertErr } = await supabase
        .from('todo_items')
        .insert(insertPayload)
        .select(TODO_SELECT)
      

      const insertedRow = Array.isArray(data) ? data[0] : data

      if (insertErr || !insertedRow) {
        throw insertErr ?? new Error('Todo eklenemedi.')
      }

      setTodos((prev) => sortTodoItems([mapTodoRow(insertedRow as TodoItemRow), ...prev]))
      setFormState(createEmptyTodoFormState())
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Todo eklenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function startEdit(todo: TodoItem) {
    setEditingId(todo.id)
    setEditingState(toTodoFormState(todo))
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingState(createEmptyTodoFormState())
  }

  async function handleUpdate(todoId: string) {
    if (!supabase) return

    const validationError = validateTodoFormState(editingState)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const updatePayload = {
        konu: editingState.konu,
        kim: editingState.kim,
        ne_zaman: editingState.neZaman || null,
        ayrinti: editingState.ayrinti.trim(),
        acil: editingState.acil,
        durum: editingState.durum,
      }

      const { data, error: updateErr } = await supabase
        .from('todo_items')
        .update(updatePayload)
        .eq('id', todoId)
        .select(TODO_SELECT)

      if (updateErr) {
        throw updateErr ?? new Error('Todo güncellenemedi.')
      }

      const updatedRow = Array.isArray(data) ? data[0] : data

      if (!updatedRow) {
        await loadTodos()
        cancelEdit()
        return
      }

      setTodos((prev) =>
        sortTodoItems(
          prev.map((t) => (t.id === todoId ? mapTodoRow(updatedRow as TodoItemRow) : t))
        )
      )
      cancelEdit()
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Todo güncellenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(todoId: string) {
    if (!supabase) return
    if (typeof window !== 'undefined' && !window.confirm('Bu görev silinsin mi?')) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const { error: deleteErr } = await supabase
        .from('todo_items')
        .delete()
        .eq('id', todoId)

      if (deleteErr) {
        throw deleteErr
      }

      setTodos((prev) => prev.filter((t) => t.id !== todoId))
      if (editingId === todoId) {
        cancelEdit()
      }
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Todo silinemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="space-y-6" aria-labelledby="todo-manager-heading">
      <div className="space-y-2">
        <h2 id="todo-manager-heading" className="text-xl font-semibold text-gray-900">
          Todo Listesi
        </h2>
      </div>

      <AccordionCard
        items={[
          {
            id: 'new-todo',
            title: 'Yeni Todo Ekle',
            accentColor: '#1A6DC2',
            children: (
              <form
                onSubmit={handleCreate}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.05fr_0.85fr_0.85fr_0.85fr]"
              >
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Kategori
                  </span>
                  <select
                    value={formState.konu}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        konu: e.target.value as TodoFormState['konu'],
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
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Kim
                  </span>
                  <select
                    value={formState.kim}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        kim: e.target.value as TodoFormState['kim'],
                      }))
                    }
                    className={INPUT_CLS}
                  >
                    {TODO_ASSIGNEES.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Ne zaman
                  </span>
                  <input
                    type="date"
                    value={formState.neZaman}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, neZaman: e.target.value }))
                    }
                    className={INPUT_CLS}
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Durum
                  </span>
                  <select
                    value={formState.durum}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        durum: e.target.value as TodoFormState['durum'],
                      }))
                    }
                    className={INPUT_CLS}
                  >
                    {TODO_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/70 px-3.5 py-3 text-sm font-semibold text-red-700">
                  <input
                    type="checkbox"
                    checked={formState.acil}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, acil: e.target.checked }))
                    }
                    className={CHECKBOX_CLS}
                  />
                  Acil!
                </label>

                <label className="space-y-2 sm:col-span-2 lg:col-span-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Görev Ayrıntısı
                  </span>
                  <textarea
                    value={formState.ayrinti}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, ayrinti: e.target.value }))
                    }
                    placeholder="Yapılacak işi ayrıntılı yaz"
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

      {!isLoading && (
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            Kişiye Göre Görevler
          </p>
          <AccordionCard
            items={ASSIGNEE_CARDS.map(({ assignee, color }) => {
              const assigneeTodos = todosByAssignee[assignee] ?? []
              return {
                id: `assignee-${assignee}`,
                title: assignee,
                badge: `${assigneeTodos.length} görev`,
                accentColor: color,
                children:
                  assigneeTodos.length === 0 ? (
                    <p className="text-sm italic text-gray-400">
                      Henüz görev atanmadı.
                    </p>
                  ) : (
                    <ul className="divide-y divide-[rgba(66,133,244,0.06)]">
                      {assigneeTodos.map((todo) => (
                        <li
                          key={todo.id}
                          className="flex items-start justify-between gap-3 py-3 text-sm"
                        >
                          <div className="min-w-0 space-y-1.5">
                            <p className="font-medium text-gray-900">
                              {getTodoDetail(todo.ayrinti)}
                            </p>
                            <CategoryBadge category={todo.konu} />
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-2">
                            {todo.neZaman && (
                              <span className="text-xs text-gray-400">
                                {formatTodoDate(todo.neZaman)}
                              </span>
                            )}
                            <StatusBadge status={todo.durum} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  ),
              }
            })}
          />
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 shadow-[0_10px_20px_rgba(60,64,67,0.04)]">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
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
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={FILTER_SELECT_CLS}
            aria-label="Kategori filtresi"
          >
            <option value="Tümü">Tümü - Kategori</option>
            {TODO_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
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

          <label className="relative min-w-[240px] flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Görev ara..."
              className={FILTER_INPUT_CLS}
              aria-label="Görev arama"
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-8 text-center text-sm text-gray-400">
            Yükleniyor…
          </div>
        ) : todos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Henüz görev yok. Yukarıdaki formu kullanarak ilk görevi ekleyin.
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Filtreye uygun görev bulunamadı.
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)] md:block">
              <table className="w-full table-fixed divide-y divide-gray-100 text-[12px]">
                <colgroup>
                  <col className="w-[4%]" />
                  <col className="w-[18%]" />
                  <col className="w-[42%]" />
                  <col className="w-[8%]" />
                  <col className="w-[12%]" />
                  <col className="w-[9%]" />
                  <col className="w-[7%]" />
                </colgroup>
                <thead className="bg-gray-50/80">
                  <tr>
                    {['!', 'Kategori', 'Görev', 'Kim', 'Ne zaman', 'Durum', 'İşlemler'].map(
                      (col) => (
                        <th
                          key={col}
                          scope="col"
                          className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500 first:pl-5 last:pr-5"
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTodos.map((todo) => {
                    const rowIsEditing = editingId === todo.id

                    return (
                      <tr
                        key={todo.id}
                        className="align-middle transition-colors hover:bg-[rgba(66,133,244,0.03)]"
                      >
                        <td className="pl-5 pr-2 py-3 align-middle">
                          {rowIsEditing ? (
                            <label className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={editingState.acil}
                                onChange={(e) =>
                                  setEditingState((s) => ({
                                    ...s,
                                    acil: e.target.checked,
                                  }))
                                }
                                className={CHECKBOX_CLS}
                                aria-label="Acil"
                              />
                            </label>
                          ) : (
                            <UrgentIndicator urgent={todo.acil} />
                          )}
                        </td>
                        <td className="pr-3 py-3 align-middle font-medium text-gray-900">
                          {rowIsEditing ? (
                            <select
                              value={editingState.konu}
                              onChange={(e) =>
                                setEditingState((s) => ({
                                  ...s,
                                  konu: e.target.value as TodoFormState['konu'],
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
                          ) : (
                            <CategoryBadge category={todo.konu} />
                          )}
                        </td>
                        <td className="pr-4 py-3 align-middle text-gray-600">
                          {rowIsEditing ? (
                            <textarea
                              value={editingState.ayrinti}
                              onChange={(e) =>
                                setEditingState((s) => ({
                                  ...s,
                                  ayrinti: e.target.value,
                                }))
                              }
                              rows={4}
                              className={INPUT_CLS}
                            />
                          ) : (
                            <span className="block leading-5 text-gray-900">
                              {getTodoDetail(todo.ayrinti)}
                            </span>
                          )}
                        </td>
                        <td className="px-2 py-3 align-middle text-gray-600">
                          {rowIsEditing ? (
                            <select
                              value={editingState.kim}
                              onChange={(e) =>
                                setEditingState((s) => ({
                                  ...s,
                                  kim: e.target.value as TodoFormState['kim'],
                                }))
                              }
                              className={INPUT_CLS}
                            >
                              {TODO_ASSIGNEES.map((a) => (
                                <option key={a} value={a}>
                                  {a}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <AssigneeCell assignee={todo.kim} />
                          )}
                        </td>
                        <td className="whitespace-nowrap px-2 py-3 align-middle text-gray-600">
                          {rowIsEditing ? (
                            <input
                              type="date"
                              value={editingState.neZaman}
                              onChange={(e) =>
                                setEditingState((s) => ({
                                  ...s,
                                  neZaman: e.target.value,
                                }))
                              }
                              className={INPUT_CLS}
                            />
                          ) : (
                            formatTodoDate(todo.neZaman)
                          )}
                        </td>
                        <td className="whitespace-nowrap px-2 py-3 align-middle">
                          {rowIsEditing ? (
                            <select
                              value={editingState.durum}
                              onChange={(e) =>
                                setEditingState((s) => ({
                                  ...s,
                                  durum: e.target.value as TodoFormState['durum'],
                                }))
                              }
                              className={INPUT_CLS}
                            >
                              {TODO_STATUSES.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <StatusBadge status={todo.durum} />
                          )}
                        </td>
                        <td className="whitespace-nowrap px-2 py-3 align-middle pr-5">
                          <div className="flex flex-nowrap items-center justify-center gap-2">
                            {rowIsEditing ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => void handleUpdate(todo.id)}
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
                                onClick={() => startEdit(todo)}
                                disabled={isSubmitting || isEditing}
                                className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                                aria-label="Düzenle"
                                title="Düzenle"
                              >
                                <Pencil size={14} aria-hidden="true" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => void handleDelete(todo.id)}
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

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {filteredTodos.map((todo) => {
                const rowIsEditing = editingId === todo.id

                return (
                  <div
                    key={todo.id}
                    className="space-y-3 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 shadow-[0_10px_20px_rgba(60,64,67,0.04)]"
                  >
                    {rowIsEditing ? (
                      <div className="space-y-3">
                        <textarea
                          value={editingState.ayrinti}
                          onChange={(e) =>
                            setEditingState((s) => ({ ...s, ayrinti: e.target.value }))
                          }
                          rows={4}
                          className={INPUT_CLS}
                        />
                        <select
                          value={editingState.konu}
                          onChange={(e) =>
                            setEditingState((s) => ({
                              ...s,
                              konu: e.target.value as TodoFormState['konu'],
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
                        <div className="grid gap-3 sm:grid-cols-2">
                          <select
                            value={editingState.kim}
                            onChange={(e) =>
                              setEditingState((s) => ({
                                ...s,
                                kim: e.target.value as TodoFormState['kim'],
                              }))
                            }
                            className={INPUT_CLS}
                          >
                            {TODO_ASSIGNEES.map((a) => (
                              <option key={a} value={a}>
                                {a}
                              </option>
                            ))}
                          </select>
                          <input
                            type="date"
                            value={editingState.neZaman}
                            onChange={(e) =>
                              setEditingState((s) => ({
                                ...s,
                                neZaman: e.target.value,
                              }))
                            }
                            className={INPUT_CLS}
                          />
                          <select
                            value={editingState.durum}
                            onChange={(e) =>
                              setEditingState((s) => ({
                                ...s,
                                durum: e.target.value as TodoFormState['durum'],
                              }))
                            }
                            className={`${INPUT_CLS} sm:col-span-2`}
                          >
                            {TODO_STATUSES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                          <label className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/70 px-3.5 py-3 text-sm font-semibold text-red-700 sm:col-span-2">
                            <input
                              type="checkbox"
                              checked={editingState.acil}
                              onChange={(e) =>
                                setEditingState((s) => ({
                                  ...s,
                                  acil: e.target.checked,
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
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <UrgentIndicator urgent={todo.acil} mobile />
                            <CategoryBadge category={todo.konu} />
                          </div>
                          <h3 className="text-base font-semibold text-gray-900">
                            {getTodoDetail(todo.ayrinti)}
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <MobileInfoPair
                            label="Kim"
                            value={todo.kim}
                            assignee={todo.kim}
                          />
                          <MobileInfoPair label="Durum" value={todo.durum} />
                          <MobileInfoPair
                            label="Ne zaman"
                            value={formatTodoDate(todo.neZaman)}
                          />
                        </div>
                      </>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      {rowIsEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={() => void handleUpdate(todo.id)}
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
                          onClick={() => startEdit(todo)}
                          disabled={isSubmitting || isEditing}
                          className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                          aria-label="Düzenle"
                          title="Düzenle"
                        >
                          <Pencil size={14} aria-hidden="true" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => void handleDelete(todo.id)}
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
          </>
        )}
      </div>

    </section>
  )
}

function AssigneeAvatar({ assignee }: { assignee: string }) {
  const src =
    assignee === 'Burak'
      ? '/kafaburak.png'
      : assignee === 'UBT'
        ? '/kafaubt.png'
        : null

  if (!src) {
    return null
  }

  return (
    <Image
      src={src}
      alt={assignee}
      width={24}
      height={24}
      className="h-6 w-6 rounded-full border border-white/80 object-cover shadow-[0_6px_14px_rgba(60,64,67,0.18)]"
    />
  )
}

function AssigneeCell({ assignee }: { assignee: string }) {
  return (
    <div className="flex items-center justify-center">
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
      aria-label="Acil görev"
      title="Acil görev"
    >
      !
    </span>
  )
}

function CategoryBadge({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] ?? '#6B7280'

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none"
      style={{ color, background: `${color}18` }}
    >
      {category}
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
        <div className="flex items-center justify-center text-[13px] text-gray-800">
          <AssigneeAvatar assignee={assignee ?? value} />
        </div>
      ) : (
        <p className="text-[13px] text-gray-800">{value}</p>
      )}
    </div>
  )
}
