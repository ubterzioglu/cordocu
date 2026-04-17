export const ADVISOR_SOCIAL_PLATFORMS = [
  'Instagram',
  'LinkedIn',
  'Twitter (X)',
  'YouTube',
  'TikTok',
  'Facebook',
  'Reddit',
  'Discord',
  'Diğer',
] as const

export const ADVISOR_SOCIAL_AUTHORS = ['UBT', 'Burak', 'Diğer'] as const

export type AdvisorSocialPlatform = (typeof ADVISOR_SOCIAL_PLATFORMS)[number]
export type AdvisorSocialAuthor = (typeof ADVISOR_SOCIAL_AUTHORS)[number]

export interface AdvisorSocialMediaItemRow {
  id: string
  platform: AdvisorSocialPlatform
  description: string | null
  link: string | null
  added_by: AdvisorSocialAuthor
  created_at: string
}

export interface AdvisorSocialMediaItem {
  id: string
  platform: AdvisorSocialPlatform
  description: string | null
  link: string | null
  addedBy: AdvisorSocialAuthor
  createdAt: string
}

export interface AdvisorSocialMediaFormState {
  platform: AdvisorSocialPlatform
  description: string
  link: string
  addedBy: AdvisorSocialAuthor
}

export function createEmptyAdvisorSocialMediaFormState(): AdvisorSocialMediaFormState {
  return {
    platform: 'Diğer',
    description: '',
    link: '',
    addedBy: 'UBT',
  }
}

export function mapAdvisorSocialMediaRow(
  row: AdvisorSocialMediaItemRow
): AdvisorSocialMediaItem {
  return {
    id: row.id,
    platform: row.platform,
    description: row.description,
    link: row.link,
    addedBy: row.added_by,
    createdAt: row.created_at,
  }
}
