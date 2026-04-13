export const SOCIAL_PLATFORMS = ['Instagram', 'LinkedIn', 'Twitter (X)', 'YouTube', 'TikTok', 'Facebook', 'Reddit', 'Discord', 'Diğer'] as const
export const SOCIAL_AUTHORS = ['UBT', 'Burak', 'Diğer'] as const
export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]
export type SocialAuthor = (typeof SOCIAL_AUTHORS)[number]

export interface SocialMediaItemRow {
  id: string
  platform: SocialPlatform
  description: string | null
  link: string | null
  added_by: SocialAuthor
  created_at: string
}

export interface SocialMediaItem {
  id: string
  platform: SocialPlatform
  description: string | null
  link: string | null
  addedBy: SocialAuthor
  createdAt: string
}

export interface SocialMediaFormState {
  platform: SocialPlatform
  description: string
  link: string
  addedBy: SocialAuthor
}

export function createEmptySocialMediaFormState(): SocialMediaFormState {
  return {
    platform: 'Diğer',
    description: '',
    link: '',
    addedBy: 'UBT',
  }
}

export function mapSocialMediaRow(row: SocialMediaItemRow): SocialMediaItem {
  return {
    id: row.id,
    platform: row.platform,
    description: row.description,
    link: row.link,
    addedBy: row.added_by,
    createdAt: row.created_at,
  }
}
