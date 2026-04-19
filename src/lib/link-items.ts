export const LINK_AUTHORS = ['Şahin', 'UBT', 'Baran'] as const
export type LinkAuthor = (typeof LINK_AUTHORS)[number]
export const LINK_TYPES = ['Dosya', 'Link'] as const
export type LinkType = (typeof LINK_TYPES)[number]

export interface LinkItemRow {
  id: string
  added_by: LinkAuthor
  type: LinkType
  description: string | null
  link: string | null
  created_at: string
}

export interface LinkItem {
  id: string
  addedBy: LinkAuthor
  type: LinkType
  description: string | null
  link: string | null
  createdAt: string
}

export interface LinkFormState {
  addedBy: LinkAuthor
  type: LinkType
  description: string
  link: string
}

export function createEmptyLinkFormState(): LinkFormState {
  return {
    addedBy: 'UBT',
    type: 'Dosya',
    description: '',
    link: '',
  }
}

export function mapLinkRow(row: LinkItemRow): LinkItem {
  return {
    id: row.id,
    addedBy: row.added_by,
    type: row.type,
    description: row.description,
    link: row.link,
    createdAt: row.created_at,
  }
}
