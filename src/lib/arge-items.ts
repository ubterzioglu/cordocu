export const ARGE_AUTHORS = ['UBT', 'Burak', 'Diğer'] as const
export type ArgeAuthor = (typeof ARGE_AUTHORS)[number]

export interface ArgeLinkRow {
  id: string
  title: string
  description: string | null
  url: string
  created_by: ArgeAuthor
  created_at: string
}

export interface ArgeLink {
  id: string
  title: string
  description: string | null
  url: string
  createdBy: ArgeAuthor
  createdAt: string
}

export interface ArgeCardRow {
  id: string
  title: string
  description: string | null
  content: string | null
  created_by: ArgeAuthor
  created_at: string
}

export interface ArgeCard {
  id: string
  title: string
  description: string | null
  content: string | null
  createdBy: ArgeAuthor
  createdAt: string
}

export interface ArgeFileRow {
  id: string
  title: string
  description: string | null
  file_path: string
  file_name: string
  created_by: ArgeAuthor
  created_at: string
}

export interface ArgeFile {
  id: string
  title: string
  description: string | null
  filePath: string
  fileName: string
  createdBy: ArgeAuthor
  createdAt: string
}

export interface ArgeLinkFormState {
  title: string
  description: string
  url: string
  createdBy: ArgeAuthor
}

export interface ArgeCardFormState {
  title: string
  description: string
  content: string
  createdBy: ArgeAuthor
}

export interface ArgeFileFormState {
  title: string
  description: string
  createdBy: ArgeAuthor
}

export function createEmptyArgeLinkFormState(): ArgeLinkFormState {
  return { title: '', description: '', url: '', createdBy: 'UBT' }
}

export function createEmptyArgeCardFormState(): ArgeCardFormState {
  return { title: '', description: '', content: '', createdBy: 'UBT' }
}

export function createEmptyArgeFileFormState(): ArgeFileFormState {
  return { title: '', description: '', createdBy: 'UBT' }
}

export function mapArgeLinkRow(row: ArgeLinkRow): ArgeLink {
  return { id: row.id, title: row.title, description: row.description, url: row.url, createdBy: row.created_by, createdAt: row.created_at }
}

export function mapArgeCardRow(row: ArgeCardRow): ArgeCard {
  return { id: row.id, title: row.title, description: row.description, content: row.content, createdBy: row.created_by, createdAt: row.created_at }
}

export function mapArgeFileRow(row: ArgeFileRow): ArgeFile {
  return { id: row.id, title: row.title, description: row.description, filePath: row.file_path, fileName: row.file_name, createdBy: row.created_by, createdAt: row.created_at }
}
