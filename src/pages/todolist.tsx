'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import DocsShell from '@/components/layout/DocsShell'
import { getSupabaseBrowserClient } from '@/lib/supabase'

interface Todo {
  id: number
  konu: string
  gorev: string | null
  sorumlu: string | null
  zaman: string | null
  durum: string
  tarih: string
  created_at: string
}

const DURUM_OPTIONS = ['Beklemede', 'Devam Ediyor', 'Tamamlandı']

const durumStyle: Record<string, string> = {
  'Beklemede':    'bg-yellow-50 text-yellow-700 border border-yellow-200',
  'Devam Ediyor': 'bg-blue-50 text-blue-700 border border-blue-200',
  'Tamamlandı':   'bg-green-50 text-green-700 border border-green-200',
}

const emptyForm = {
  konu: '',
  gorev: '',
  sorumlu: '',
  zaman: '',
  durum: 'Beklemede',
}

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)

  const supabase = getSupabaseBrowserClient()

  async function fetchTodos() {
    if (!supabase) {
      setError('Supabase bağlantısı yapılandırılmamış.')
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error: fetchErr } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchErr) {
      setError(fetchErr.message)
    } else {
      setTodos(data ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(false)

    if (!form.konu.trim()) {
      setFormError('Konu alanı zorunludur.')
      return
    }

    if (!supabase) {
      setFormError('Supabase bağlantısı yapılandırılmamış.')
      return
    }

    setSubmitting(true)
    const { error: insertErr } = await supabase.from('todos').insert([
      {
        konu: form.konu.trim(),
        gorev: form.gorev.trim() || null,
        sorumlu: form.sorumlu.trim() || null,
        zaman: form.zaman.trim() || null,
        durum: form.durum,
      },
    ])

    if (insertErr) {
      setFormError(insertErr.message)
    } else {
      setFormSuccess(true)
      setForm(emptyForm)
      await fetchTodos()
    }
    setSubmitting(false)
  }

  return (
    <DocsShell>
      <div className="docs-main-column">
        <article className="space-y-8 sm:space-y-10">
          {/* Header */}
          <div className="space-y-3 sm:space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(66,133,244,0.12)] bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 shadow-[0_10px_20px_rgba(60,64,67,0.06)] transition-all hover:border-[rgba(66,133,244,0.2)] hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to documentation hub
            </Link>

            <div className="docs-surface p-5 sm:p-6 md:p-8">
              <div
                className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(66,133,244,0.22)_0%,_rgba(66,133,244,0)_72%)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-32 w-40 bg-[radial-gradient(circle,_rgba(52,168,83,0.14)_0%,_rgba(52,168,83,0)_74%)]"
                aria-hidden="true"
              />
              <p className="docs-kicker">TO DO LIST</p>
              <h1 className="mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                Görev Takip Tablosu
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
                Tüm görevler tek tabloda: Konu / Görev / Sorumlu / Zaman / Durum. Supabase&apos;e bağlı, yeni görev eklenebilir.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="docs-chip">{todos.length} görev</span>
                <span className="docs-chip">Canonical route: /todolist</span>
              </div>
            </div>
          </div>

          {/* Add Todo Form */}
          <section aria-labelledby="add-todo-heading" className="space-y-4">
            <div>
              <h2
                id="add-todo-heading"
                className="text-lg font-semibold text-gray-900"
              >
                Yeni Görev Ekle
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Formu doldurup &quot;Ekle&quot; butonuna tıklayın. Konu alanı zorunludur.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[rgba(66,133,244,0.12)] bg-white/80 p-5 shadow-[0_10px_20px_rgba(60,64,67,0.04)] sm:p-6"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Konu */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="konu" className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Konu <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="konu"
                    type="text"
                    value={form.konu}
                    onChange={(e) => setForm((f) => ({ ...f, konu: e.target.value }))}
                    placeholder="Örn: Ürün, GTM, Teknik…"
                    className="rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>

                {/* Görev */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="gorev" className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Görev
                  </label>
                  <input
                    id="gorev"
                    type="text"
                    value={form.gorev}
                    onChange={(e) => setForm((f) => ({ ...f, gorev: e.target.value }))}
                    placeholder="Görev açıklaması…"
                    className="rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>

                {/* Sorumlu */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="sorumlu" className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Sorumlu
                  </label>
                  <input
                    id="sorumlu"
                    type="text"
                    value={form.sorumlu}
                    onChange={(e) => setForm((f) => ({ ...f, sorumlu: e.target.value }))}
                    placeholder="Örn: Burak, Barış…"
                    className="rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>

                {/* Zaman */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="zaman" className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Zaman
                  </label>
                  <input
                    id="zaman"
                    type="text"
                    value={form.zaman}
                    onChange={(e) => setForm((f) => ({ ...f, zaman: e.target.value }))}
                    placeholder="Örn: M1, Nisan 2026…"
                    className="rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>

                {/* Durum */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="durum" className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Durum
                  </label>
                  <select
                    id="durum"
                    value={form.durum}
                    onChange={(e) => setForm((f) => ({ ...f, durum: e.target.value }))}
                    className="rounded-xl border border-[rgba(66,133,244,0.15)] bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  >
                    {DURUM_OPTIONS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-60"
                  >
                    {submitting ? 'Ekleniyor…' : '+ Ekle'}
                  </button>
                </div>
              </div>

              {formError && (
                <p className="mt-3 text-sm text-red-600">{formError}</p>
              )}
              {formSuccess && (
                <p className="mt-3 text-sm text-green-600">Görev başarıyla eklendi.</p>
              )}
            </form>
          </section>

          {/* Todo Table */}
          <section aria-labelledby="todo-table-heading" className="space-y-4">
            <div>
              <h2
                id="todo-table-heading"
                className="text-lg font-semibold text-gray-900"
              >
                Görev Listesi
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Tüm görevler — en yeni en üstte.
              </p>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white/80 p-8 text-center text-sm text-gray-400">
                Yükleniyor…
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">
                <strong>Hata:</strong> {error}
              </div>
            ) : todos.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                Henüz görev yok. Yukarıdaki formu kullanarak ilk görevi ekleyin.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-[rgba(66,133,244,0.1)] bg-white shadow-[0_10px_20px_rgba(60,64,67,0.04)]">
                <table className="min-w-full divide-y divide-gray-100 text-sm">
                  <thead>
                    <tr className="bg-gray-50/80">
                      {['Konu', 'Görev', 'Sorumlu', 'Zaman', 'Durum'].map((col) => (
                        <th
                          key={col}
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500 first:pl-6 last:pr-6"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {todos.map((todo) => (
                      <tr
                        key={todo.id}
                        className="transition-colors hover:bg-[rgba(66,133,244,0.03)]"
                      >
                        <td className="whitespace-nowrap pl-6 pr-4 py-3.5 font-medium text-gray-900">
                          {todo.konu}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600 max-w-xs">
                          {todo.gorev ?? <span className="text-gray-300">—</span>}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-gray-600">
                          {todo.sorumlu ?? <span className="text-gray-300">—</span>}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-gray-600">
                          {todo.zaman ?? <span className="text-gray-300">—</span>}
                        </td>
                        <td className="whitespace-nowrap pr-6 pl-4 py-3.5">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              durumStyle[todo.durum] ?? 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}
                          >
                            {todo.durum}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </article>
      </div>
    </DocsShell>
  )
}
