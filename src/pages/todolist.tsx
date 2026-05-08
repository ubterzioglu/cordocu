import DocsShell from '@/components/layout/DocsShell'
import TodoManager from '@/components/todo/TodoManager'

export default function TodoListPage() {
  return (
    <DocsShell>
      <div className="docs-main-column docs-main-column-wide">
        <article className="space-y-6">
          <div className="docs-surface p-5 sm:p-6">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Todo Listesi
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Bu görünüm command center verisinin todo filtresidir.
            </p>
          </div>
          <TodoManager />
        </article>
      </div>
    </DocsShell>
  )
}
