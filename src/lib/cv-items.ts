export interface CvItemRow {
  id: string
  first_name: string
  last_name: string
  role: string | null
  linkedin_url: string | null
  instagram_url: string | null
  website_url: string | null
  file_path: string
  file_name: string
  created_at: string
}

export interface CvItem {
  id: string
  firstName: string
  lastName: string
  role: string | null
  linkedinUrl: string | null
  instagramUrl: string | null
  websiteUrl: string | null
  filePath: string
  fileName: string
  createdAt: string
}

export interface CvFormState {
  firstName: string
  lastName: string
  role: string
  linkedinUrl: string
  instagramUrl: string
  websiteUrl: string
}

export function createEmptyCvFormState(): CvFormState {
  return {
    firstName: '',
    lastName: '',
    role: '',
    linkedinUrl: '',
    instagramUrl: '',
    websiteUrl: '',
  }
}

export function mapCvRow(row: CvItemRow): CvItem {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    role: row.role,
    linkedinUrl: row.linkedin_url,
    instagramUrl: row.instagram_url,
    websiteUrl: row.website_url,
    filePath: row.file_path,
    fileName: row.file_name,
    createdAt: row.created_at,
  }
}
