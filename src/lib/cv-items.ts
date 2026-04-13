export interface CvItemRow {
  id: string
  first_name: string
  last_name: string
  role: string | null
  file_path: string
  file_name: string
  created_at: string
}

export interface CvItem {
  id: string
  firstName: string
  lastName: string
  role: string | null
  filePath: string
  fileName: string
  createdAt: string
}

export interface CvFormState {
  firstName: string
  lastName: string
  role: string
}

export function createEmptyCvFormState(): CvFormState {
  return {
    firstName: '',
    lastName: '',
    role: '',
  }
}

export function mapCvRow(row: CvItemRow): CvItem {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    role: row.role,
    filePath: row.file_path,
    fileName: row.file_name,
    createdAt: row.created_at,
  }
}
