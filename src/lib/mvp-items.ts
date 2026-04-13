export const MVP_LEVELS = ['MVP1', 'MVP2', 'MVP3', 'Atanmadi'] as const
export const MVP_AUTHORS = ['UBT', 'Burak', 'Diğer', 'All'] as const
export type MvpLevel = (typeof MVP_LEVELS)[number]
export type MvpAuthor = (typeof MVP_AUTHORS)[number]

export interface MvpItemRow {
  id: string
  konu: string
  sub: string | null
  ayrinti: string | null
  mvp_level: MvpLevel
  added_by: MvpAuthor
  is_seed: boolean
  created_at: string
  updated_at: string
}

export interface MvpItem {
  id: string
  konu: string
  sub: string | null
  ayrinti: string | null
  mvpLevel: MvpLevel
  addedBy: MvpAuthor
  isSeed: boolean
  createdAt: string
  updatedAt: string
}

export interface MvpFormState {
  konu: string
  sub: string
  ayrinti: string
  mvpLevel: MvpLevel
  addedBy: MvpAuthor
}

export function createEmptyMvpFormState(): MvpFormState {
  return {
    konu: '',
    sub: '',
    ayrinti: '',
    mvpLevel: 'Atanmadi',
    addedBy: 'UBT',
  }
}

export function mapMvpRow(row: MvpItemRow): MvpItem {
  return {
    id: row.id,
    konu: row.konu,
    sub: row.sub,
    ayrinti: row.ayrinti,
    mvpLevel: row.mvp_level,
    addedBy: row.added_by,
    isSeed: row.is_seed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}
