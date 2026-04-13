export const LINK_AUTHORS = ['Şahin', 'UBT', 'Baran'] as const
export type LinkAuthor = (typeof LINK_AUTHORS)[number]

export interface LinkItemRow {
  id: string
  added_by: LinkAuthor
  description: string | null
  link: string | null
  created_at: string
}

export interface LinkItem {
  id: string
  addedBy: LinkAuthor
  description: string | null
  link: string | null
  createdAt: string
}

export interface LinkFormState {
  addedBy: LinkAuthor
  description: string
  link: string
}

export function createEmptyLinkFormState(): LinkFormState {
  return {
    addedBy: 'UBT',
    description: '',
    link: '',
  }
}

export function mapLinkRow(row: LinkItemRow): LinkItem {
  return {
    id: row.id,
    addedBy: row.added_by,
    description: row.description,
    link: row.link,
    createdAt: row.created_at,
  }
}
