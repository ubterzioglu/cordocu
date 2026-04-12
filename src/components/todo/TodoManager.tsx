'use client'

import { useEffect, useMemo, useState } from 'react'
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import AccordionCard from '../ui/AccordionCard'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import {
  TODO_ASSIGNEES,
  TODO_STATUSES,
  createEmptyTodoFormState,
  formatTodoDate,
  mapTodoRow,
  toTodoFormState,
  type TodoFormState,
  type TodoItem,
  type TodoItemRow,
} from '@/lib/todo-items'

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

const INPUT_CLS =
  'w-full rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200'

const BTN_CLS =
  'inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all disabled:opacity-60'

export default function TodoManager() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formState, setFormState] = useState<TodoFormState>(createEmptyTodoFormState)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingState, setEditingState] = useState<TodoFormState>(createEmptyTodoFormState)

  const supabase = getSupabaseBrowserClient()

  const isEditing = useMemo(() => editingId !== null, [editingId])

  const todosByAssignee = useMemo(() => {
    const map: Record<string, TodoItem[]> = {}
    for (const { assignee } of ASSIGNEE_CARDS) {
      map[assignee] = todos.filter((t) => t.kim === assignee)
    }
    return map
  }, [todos])

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
        .select('id, konu, kim, ne_zaman, ayrinti, durum, created_at, updated_at')
        .order('created_at', { ascending: false })

      if (fetchErr) {
        throw fetchErr
      }

      setTodos((data as TodoItemRow[]).map(mapTodoRow))
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

    setIsSubmitting(true)
    setError(null)

    try {
      const insertPayload = {
        konu: formState.konu,
        kim: formState.kim,
        ne_zaman: formState.neZaman || null,
        ayrinti: formState.ayrinti.trim() || null,
        durum: formState.durum,
      }

      const { data, error: insertErr } = await supabase
        .from('todo_items')
        .insert(insertPayload)
        .select('id, konu, kim, ne_zaman, ayrinti, durum, created_at, updated_at')
        .single()

      if (insertErr || !data) {
        throw insertErr ?? new Error('Todo eklenemedi.')
      }

      setTodos((prev) => [mapTodoRow(data as TodoItemRow), ...prev])
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

    setIsSubmitting(true)
    setError(null)

    try {
      const updatePayload = {
        konu: editingState.konu,
        kim: editingState.kim,
        ne_zaman: editingState.neZaman || null,
        ayrinti: editingState.ayrinti.trim() || null,
        durum: editingState.durum,
      }

      const { data, error: updateErr } = await supabase
        .from('todo_items')
        .update(updatePayload)
        .eq('id', todoId)
        .select('id, konu, kim, ne_zaman, ayrinti, durum, created_at, updated_at')
        .single()

      if (updateErr || !data) {
        throw updateErr ?? new Error('Todo güncellenemedi.')
      }

      setTodos((prev) =>
        prev.map((t) => (t.id === todoId ? mapTodoRow(data as TodoItemRow) : t))
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
        <p className="max-w-3xl text-sm text-gray-500">
          Yeni kayıt ekle, mevcut kayıtları güncelle veya artık gerekmeyenleri sil.
        </p>
      </div>

      <AccordionCard
        defaultOpenId="new-todo"
        items={[
          {
            id: 'new-todo',
            title: 'Yeni Todo Ekle',
            accentColor: '#1A6DC2',
            children: (
              <form
                onSubmit={handleCreate}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1fr]"
              >
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Konu
                  </span>
                  <input
                    type="text"
                    value={formState.konu}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, konu: e.target.value }))
                    }
                    placeholder="Yeni görev konusu"
                    className={INPUT_CLS}
                    required
                  />
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

                <label className="space-y-2 sm:col-span-2 lg:col-span-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Ayrıntı
                  </span>
                  <textarea
                    value={formState.ayrinti}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, ayrinti: e.target.value }))
                    }
                    placeholder="Göreve dair notlar"
                    rows={3}
                    className={INPUT_CLS}
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

      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-8 text-center text-sm text-gray-400">
            Yükleniyor…
          </div>
        ) : todos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Henüz görev yok. Yukarıdaki formu kullanarak ilk görevi ekleyin.
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)] md:block">
              <table className="min-w-full divide-y divide-gray-50 text-sm">
                <thead className="bg-gray-50/80">
                  <tr>
                    {['Konu', 'Kim', 'Ne zaman', 'Ayrıntı', 'Durum', 'İşlemler'].map(
                      (col) => (
                        <th
                          key={col}
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500 first:pl-6 last:pr-6"
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {todos.map((todo) => {
                    const rowIsEditing = editingId === todo.id

                    return (
                      <tr
                        key={todo.id}
                        className="align-top transition-colors hover:bg-[rgba(66,133,244,0.03)]"
                      >
                        <td className="pl-6 pr-4 py-3.5 font-medium text-gray-900">
                          {rowIsEditing ? (
                            <input
                              type="text"
                              value={editingState.konu}
                              onChange={(e) =>
                                setEditingState((s) => ({
                                  ...s,
                                  konu: e.target.value,
                                }))
                              }
                              className={INPUT_CLS}
                            />
                          ) : (
                            todo.konu
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600">
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
                            todo.kim
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-gray-600">
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
                        <td className="max-w-sm px-4 py-3.5 text-gray-600">
                          {rowIsEditing ? (
                            <textarea
                              value={editingState.ayrinti}
                              onChange={(e) =>
                                setEditingState((s) => ({
                                  ...s,
                                  ayrinti: e.target.value,
                                }))
                              }
                              rows={2}
                              className={INPUT_CLS}
                            />
                          ) : (
                            todo.ayrinti ?? (
                              <span className="text-gray-300">—</span>
                            )
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
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
                            <span
                              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                              style={{
                                color: STATUS_COLORS[todo.durum] ?? '#888888',
                                background: `${STATUS_COLORS[todo.durum] ?? '#888888'}18`,
                              }}
                            >
                              {todo.durum}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 last:pr-6">
                          <div className="flex flex-wrap items-center gap-2">
                            {rowIsEditing ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => void handleUpdate(todo.id)}
                                  disabled={isSubmitting}
                                  className={`${BTN_CLS} border border-green-200 bg-green-50 text-green-700 hover:bg-green-100`}
                                >
                                  <Save size={14} aria-hidden="true" />
                                  Kaydet
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  disabled={isSubmitting}
                                  className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                                >
                                  <X size={14} aria-hidden="true" />
                                  İptal
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => startEdit(todo)}
                                disabled={isSubmitting || isEditing}
                                className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                              >
                                <Pencil size={14} aria-hidden="true" />
                                Düzenle
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => void handleDelete(todo.id)}
                              disabled={isSubmitting}
                              className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}
                            >
                              <Trash2 size={14} aria-hidden="true" />
                              Sil
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
              {todos.map((todo) => {
                const rowIsEditing = editingId === todo.id

                return (
                  <div
                    key={todo.id}
                    className="space-y-3 rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white p-4 shadow-[0_10px_20px_rgba(60,64,67,0.04)]"
                  >
                    {rowIsEditing ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingState.konu}
                          onChange={(e) =>
                            setEditingState((s) => ({ ...s, konu: e.target.value }))
                          }
                          className={INPUT_CLS}
                        />
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
                        </div>
                        <textarea
                          value={editingState.ayrinti}
                          onChange={(e) =>
                            setEditingState((s) => ({ ...s, ayrinti: e.target.value }))
                          }
                          rows={2}
                          className={INPUT_CLS}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <h3 className="text-base font-semibold text-gray-900">
                            {todo.konu}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {todo.ayrinti ?? 'Ayrıntı yok'}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <MobileInfoPair label="Kim" value={todo.kim} />
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
                          >
                            <Save size={14} aria-hidden="true" />
                            Kaydet
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            disabled={isSubmitting}
                            className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                          >
                            <X size={14} aria-hidden="true" />
                            İptal
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEdit(todo)}
                          disabled={isSubmitting || isEditing}
                          className={`${BTN_CLS} border border-gray-200 text-gray-500 hover:text-gray-700`}
                        >
                          <Pencil size={14} aria-hidden="true" />
                          Düzenle
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => void handleDelete(todo.id)}
                        disabled={isSubmitting}
                        className={`${BTN_CLS} border border-red-200 bg-red-50 text-red-600 hover:bg-red-100`}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                        Sil
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Kişiye Göre Görevler */}
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
                          className="flex items-center justify-between gap-3 py-2 text-sm"
                        >
                          <span className="font-medium text-gray-900">{todo.konu}</span>
                          <div className="flex shrink-0 items-center gap-2">
                            {todo.neZaman && (
                              <span className="text-xs text-gray-400">
                                {formatTodoDate(todo.neZaman)}
                              </span>
                            )}
                            <span
                              className="rounded px-1.5 py-0.5 text-[11px] font-semibold"
                              style={{
                                color: STATUS_COLORS[todo.durum] ?? '#888888',
                                background: `${STATUS_COLORS[todo.durum] ?? '#888888'}18`,
                              }}
                            >
                              {todo.durum}
                            </span>
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
    </section>
  )
}

function MobileInfoPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 rounded-xl border border-[rgba(66,133,244,0.08)] bg-gray-50/50 px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
        {label}
      </p>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  )
}
