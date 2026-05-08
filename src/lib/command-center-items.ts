import { getSupabaseBrowserClient } from './supabase'
import { sanitizeError, validateContent, validateTitle } from './security'
import {
  TODO_ASSIGNEES,
  TODO_STATUSES,
  type TodoAssignee,
  type TodoStatus,
} from './todo-items'

export const COMMAND_CENTER_ITEM_TYPES = ['todo', 'meeting_note'] as const
export type CommandCenterItemType = (typeof COMMAND_CENTER_ITEM_TYPES)[number]
export type CommandCenterAssignee = (typeof TODO_ASSIGNEES)[number]
export type CommandCenterStatus = (typeof TODO_STATUSES)[number]

export interface CommandCenterItemRow {
  id: string
  item_type: CommandCenterItemType
  title: string
  detail: string
  category_label: string
  assignee: CommandCenterAssignee
  status: CommandCenterStatus
  due_date: string | null
  urgent: boolean
  legacy_source_type: string | null
  legacy_source_code: string | null
  legacy_source_date_label: string | null
  legacy_source_category: string | null
  legacy_source_title: string | null
  sort_order: number
  created_at?: string
  updated_at?: string
}

export interface CommandCenterItem {
  id: string
  itemType: CommandCenterItemType
  title: string
  detail: string
  categoryLabel: string
  assignee: CommandCenterAssignee
  status: CommandCenterStatus
  dueDate: string | null
  urgent: boolean
  legacySourceType: string | null
  legacySourceCode: string | null
  legacySourceDateLabel: string | null
  legacySourceCategory: string | null
  legacySourceTitle: string | null
  sortOrder: number
  createdAt: string | null
  updatedAt: string | null
}

export interface CommandCenterFormState {
  itemType: CommandCenterItemType
  title: string
  detail: string
  categoryLabel: string
  assignee: CommandCenterAssignee
  status: CommandCenterStatus
  dueDate: string
  urgent: boolean
  legacySourceCode: string
  legacySourceDateLabel: string
  legacySourceCategory: string
  legacySourceTitle: string
}

export interface FetchCommandCenterItemsOptions {
  itemType?: CommandCenterItemType
}

export const COMMAND_CENTER_SELECT =
  'id, item_type, title, detail, category_label, assignee, status, due_date, urgent, legacy_source_type, legacy_source_code, legacy_source_date_label, legacy_source_category, legacy_source_title, sort_order, created_at, updated_at'

export function mapCommandCenterRow(row: CommandCenterItemRow): CommandCenterItem {
  return {
    id: row.id,
    itemType: row.item_type,
    title: row.title,
    detail: row.detail,
    categoryLabel: row.category_label,
    assignee: row.assignee,
    status: row.status,
    dueDate: row.due_date,
    urgent: row.urgent,
    legacySourceType: row.legacy_source_type,
    legacySourceCode: row.legacy_source_code,
    legacySourceDateLabel: row.legacy_source_date_label,
    legacySourceCategory: row.legacy_source_category,
    legacySourceTitle: row.legacy_source_title,
    sortOrder: row.sort_order,
    createdAt: row.created_at ?? null,
    updatedAt: row.updated_at ?? null,
  }
}

export function createEmptyCommandCenterFormState(
  defaults?: Partial<CommandCenterFormState>
): CommandCenterFormState {
  return {
    itemType: defaults?.itemType ?? 'todo',
    title: defaults?.title ?? '',
    detail: defaults?.detail ?? '',
    categoryLabel: defaults?.categoryLabel ?? '',
    assignee: defaults?.assignee ?? 'Atanmadi',
    status: defaults?.status ?? 'Baslanmadi',
    dueDate: defaults?.dueDate ?? '',
    urgent: defaults?.urgent ?? false,
    legacySourceCode: defaults?.legacySourceCode ?? '',
    legacySourceDateLabel: defaults?.legacySourceDateLabel ?? '',
    legacySourceCategory: defaults?.legacySourceCategory ?? '',
    legacySourceTitle: defaults?.legacySourceTitle ?? '',
  }
}

export function toCommandCenterFormState(item: CommandCenterItem): CommandCenterFormState {
  return {
    itemType: item.itemType,
    title: item.title,
    detail: item.detail,
    categoryLabel: item.categoryLabel,
    assignee: item.assignee,
    status: item.status,
    dueDate: item.dueDate ?? '',
    urgent: item.urgent,
    legacySourceCode: item.legacySourceCode ?? '',
    legacySourceDateLabel: item.legacySourceDateLabel ?? '',
    legacySourceCategory: item.legacySourceCategory ?? '',
    legacySourceTitle: item.legacySourceTitle ?? '',
  }
}

export function getCommandCenterItemLabel(itemType: CommandCenterItemType): string {
  return itemType === 'meeting_note' ? 'Toplanti Notu' : 'Todo'
}

export function sortCommandCenterItems(items: CommandCenterItem[]): CommandCenterItem[] {
  return [...items].sort((left, right) => {
    if (left.itemType !== right.itemType) {
      return left.itemType.localeCompare(right.itemType, 'tr')
    }

    if (left.itemType === 'meeting_note' && left.sortOrder !== right.sortOrder) {
      return left.sortOrder - right.sortOrder
    }

    const leftCreatedAt = left.createdAt ? Date.parse(left.createdAt) : Number.NEGATIVE_INFINITY
    const rightCreatedAt = right.createdAt ? Date.parse(right.createdAt) : Number.NEGATIVE_INFINITY

    if (leftCreatedAt !== rightCreatedAt) {
      return rightCreatedAt - leftCreatedAt
    }

    if (left.updatedAt && right.updatedAt && left.updatedAt !== right.updatedAt) {
      return Date.parse(right.updatedAt) - Date.parse(left.updatedAt)
    }

    if (left.dueDate && right.dueDate && left.dueDate !== right.dueDate) {
      return right.dueDate.localeCompare(left.dueDate)
    }

    const categoryCompare = left.categoryLabel.localeCompare(right.categoryLabel, 'tr')
    if (categoryCompare !== 0) {
      return categoryCompare
    }

    return left.detail.localeCompare(right.detail, 'tr')
  })
}

export async function fetchCommandCenterItems(
  options?: FetchCommandCenterItemsOptions
): Promise<CommandCenterItem[]> {
  const supabase = getSupabaseBrowserClient()
  if (!supabase) return []

  let query = supabase
    .from('command_center_items')
    .select(COMMAND_CENTER_SELECT)
    .order('item_type', { ascending: true })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (options?.itemType) {
    query = query.eq('item_type', options.itemType)
  }

  const { data, error } = await query
  if (error || !data) return []
  return sortCommandCenterItems((data as CommandCenterItemRow[]).map(mapCommandCenterRow))
}

function buildTitle(state: CommandCenterFormState): string {
  const fallback = state.detail.trim().slice(0, 80) || 'Yeni kayit'
  return (state.title.trim() || fallback).slice(0, 160)
}

function buildCategoryLabel(state: CommandCenterFormState): string {
  if (state.itemType === 'meeting_note') {
    return state.categoryLabel.trim() || state.legacySourceDateLabel.trim() || 'Tarihsiz'
  }

  return state.categoryLabel.trim() || 'Genel'
}

export function validateCommandCenterFormState(state: CommandCenterFormState): string | null {
  const titleError = validateTitle(buildTitle(state))
  if (titleError) return titleError

  const detailError = validateContent(state.detail)
  if (detailError) return detailError

  if (!buildCategoryLabel(state)) {
    return 'Kategori boş bırakılamaz.'
  }

  if (
    !TODO_ASSIGNEES.includes(state.assignee as TodoAssignee) ||
    !TODO_STATUSES.includes(state.status as TodoStatus)
  ) {
    return 'Geçersiz atama veya durum.'
  }

  return null
}

function buildCommandCenterPayload(state: CommandCenterFormState) {
  const categoryLabel = buildCategoryLabel(state)
  const title = buildTitle(state)

  return {
    item_type: state.itemType,
    title,
    detail: state.detail.trim(),
    category_label: categoryLabel,
    assignee: state.assignee,
    status: state.status,
    due_date: state.itemType === 'meeting_note' ? null : state.dueDate || null,
    urgent: state.urgent,
    legacy_source_type: state.itemType === 'meeting_note' ? 'meeting_notes' : 'todo_items',
    legacy_source_code:
      state.itemType === 'meeting_note' ? state.legacySourceCode.trim() || 'MAN' : null,
    legacy_source_date_label:
      state.itemType === 'meeting_note'
        ? state.legacySourceDateLabel.trim() || categoryLabel
        : null,
    legacy_source_category:
      state.itemType === 'meeting_note' ? state.legacySourceCategory.trim() || null : null,
    legacy_source_title:
      state.itemType === 'meeting_note' ? state.legacySourceTitle.trim() || title : null,
  }
}

export async function createCommandCenterItem(
  state: CommandCenterFormState
): Promise<CommandCenterItem | null> {
  const supabase = getSupabaseBrowserClient()
  if (!supabase) return null

  const validationError = validateCommandCenterFormState(state)
  if (validationError) {
    console.error(validationError)
    return null
  }

  const { data, error } = await supabase
    .from('command_center_items')
    .insert(buildCommandCenterPayload(state))
    .select(COMMAND_CENTER_SELECT)
    .single()

  if (error || !data) {
    console.error(sanitizeError(error, 'Command center kaydi eklenemedi.'))
    return null
  }

  return mapCommandCenterRow(data as CommandCenterItemRow)
}

export async function updateCommandCenterItem(
  id: string,
  state: CommandCenterFormState
): Promise<CommandCenterItem | null> {
  const supabase = getSupabaseBrowserClient()
  if (!supabase) return null

  const validationError = validateCommandCenterFormState(state)
  if (validationError) {
    console.error(validationError)
    return null
  }

  const { data, error } = await supabase
    .from('command_center_items')
    .update(buildCommandCenterPayload(state))
    .eq('id', id)
    .select(COMMAND_CENTER_SELECT)
    .single()

  if (error || !data) {
    console.error(sanitizeError(error, 'Command center kaydi guncellenemedi.'))
    return null
  }

  return mapCommandCenterRow(data as CommandCenterItemRow)
}

export async function deleteCommandCenterItem(id: string): Promise<boolean> {
  const supabase = getSupabaseBrowserClient()
  if (!supabase) return false

  const { error } = await supabase.from('command_center_items').delete().eq('id', id)
  return !error
}
