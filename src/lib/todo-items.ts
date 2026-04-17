export const TODO_ASSIGNEES = ['Atanmadi', 'UBT', 'Burak'] as const
export const TODO_STATUSES = [
  'Baslanmadi',
  'Beklemede',
  'Devam ediyor',
  'Tamamlandi',
] as const

export type TodoAssignee = (typeof TODO_ASSIGNEES)[number]
export type TodoStatus = (typeof TODO_STATUSES)[number]

export interface TodoItemRow {
  id: string
  konu: string
  kim: TodoAssignee
  ne_zaman: string | null
  ayrinti: string | null
  durum: TodoStatus
  created_at?: string
  updated_at?: string
}

export interface TodoItem {
  id: string
  konu: string
  kim: TodoAssignee
  neZaman: string | null
  ayrinti: string | null
  durum: TodoStatus
  createdAt: string | null
  updatedAt: string | null
}

export interface TodoFormState {
  konu: string
  kim: TodoAssignee
  neZaman: string
  ayrinti: string
  durum: TodoStatus
}

export function createEmptyTodoFormState(): TodoFormState {
  return {
    konu: '',
    kim: 'Atanmadi',
    neZaman: '',
    ayrinti: '',
    durum: 'Baslanmadi',
  }
}

export function mapTodoRow(row: TodoItemRow): TodoItem {
  return {
    id: row.id,
    konu: row.konu,
    kim: row.kim,
    neZaman: row.ne_zaman,
    ayrinti: row.ayrinti,
    durum: row.durum,
    createdAt: row.created_at ?? null,
    updatedAt: row.updated_at ?? null,
  }
}

export function toTodoFormState(item: TodoItem): TodoFormState {
  return {
    konu: item.konu,
    kim: item.kim,
    neZaman: item.neZaman ?? '',
    ayrinti: item.ayrinti ?? '',
    durum: item.durum,
  }
}

export function sortTodoItems(items: TodoItem[]): TodoItem[] {
  return [...items].sort((left, right) => {
    if (left.neZaman && right.neZaman) {
      return left.neZaman.localeCompare(right.neZaman)
    }

    if (left.neZaman) {
      return -1
    }

    if (right.neZaman) {
      return 1
    }

    return left.konu.localeCompare(right.konu, 'tr')
  })
}

export function formatTodoDate(value: string | null): string {
  if (!value) {
    return '-'
  }

  const parsed = new Date(`${value}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return parsed.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
