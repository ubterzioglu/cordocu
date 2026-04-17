import { getSupabaseBrowserClient } from './supabase'

export type MeetingSource = 'T1' | 'T2' | 'T3' | 'WA' | 'NO'

export interface MeetingNoteItem {
  id: string
  content: string
  source: MeetingSource
  date: string
  category: string
}

export interface MeetingNoteCategory {
  id: string
  label: string
  color: string
}

export interface MeetingNoteSource {
  key: MeetingSource
  label: string
  date: string
}

export const MEETING_CATEGORIES: MeetingNoteCategory[] = [
  { id: 'rezervasyon-sistemi', label: 'Rezervasyon Sistemi', color: '#EA4335' },
  { id: 'kullanici-kisitlamalari', label: 'Kullanıcı Kısıtlamaları', color: '#34A853' },
  { id: 'audit-kayitlari', label: 'Audit Kayıtları', color: '#4285F4' },
  { id: 'veritabani-tasarimi', label: 'Veritabanı Tasarımı', color: '#FBBC04' },
  { id: 'mvp-hedefleri', label: 'MVP Hedefleri', color: '#A142F4' },
  { id: 'reklam-modeli', label: 'Reklam Modeli', color: '#00897B' },
]

export const MEETING_SOURCES: MeetingNoteSource[] = [
  { key: 'T1', label: 'Toplantı 1', date: '26 Şubat' },
  { key: 'T2', label: 'Toplantı 2', date: '12 Mart' },
  { key: 'T3', label: 'Toplantı 3', date: '9 Nisan' },
  { key: 'WA', label: 'WhatsApp Yazışmaları', date: '13 Nisan WA' },
  { key: 'NO', label: 'Notion Kararlar', date: '17 Nisan' },
]

export const SOURCE_COLORS: Record<MeetingSource, string> = {
  T1: '#4285F4',
  T2: '#34A853',
  T3: '#EA4335',
  WA: '#FA7B17',
  NO: '#8B5CF6',
}

export function getCategoryById(categoryId: string): MeetingNoteCategory | undefined {
  return MEETING_CATEGORIES.find((c) => c.id === categoryId)
}

export function getSourceByKey(key: MeetingSource): MeetingNoteSource | undefined {
  return MEETING_SOURCES.find((s) => s.key === key)
}

interface MeetingNoteRow {
  id: string
  title: string
  content: string
  date: string
  category: string
  source: string
  sort_order: number
}

function mapRow(row: MeetingNoteRow): MeetingNoteItem {
  return {
    id: row.id,
    content: row.content,
    source: row.source as MeetingSource,
    date: row.date,
    category: row.category,
  }
}

function normalizeMeetingNoteText(value: string): string {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .trim()
}

function dedupeMeetingNotes(items: MeetingNoteItem[]): MeetingNoteItem[] {
  const seen = new Set<string>()

  return items.filter((item) => {
    const dedupeKey = [
      normalizeMeetingNoteText(item.content),
      normalizeMeetingNoteText(item.date),
    ].join('::')

    if (seen.has(dedupeKey)) {
      return false
    }

    seen.add(dedupeKey)
    return true
  })
}

export async function fetchMeetingNotes(): Promise<MeetingNoteItem[]> {
  const supabase = getSupabaseBrowserClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('meeting_notes')
    .select('id, title, content, date, category, source, sort_order')
    .order('sort_order', { ascending: true })

  if (error || !data) return []
  return dedupeMeetingNotes((data as MeetingNoteRow[]).map(mapRow))
}
