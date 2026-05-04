import DocsShell from '@/components/layout/DocsShell'
import TodoManager from '@/components/todo/TodoManager'

export default function TodoListPage() {
  return (
    <DocsShell>
      <div className="docs-main-column docs-main-column-wide">
        <article>
          <TodoManager />
        </article>
      </div>
    </DocsShell>
  )
}
