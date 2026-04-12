export interface ContactItemRow {
  id: string
  contact: string
  telefon: string | null
  websitesi: string | null
  tur: string | null
  sorumlu: string | null
  durum: string | null
  durum_dm: string | null
  durum_customer: string | null
  yorumlar: string | null
  created_at: string
  updated_at: string
}

export interface ContactItem {
  id: string
  contact: string
  telefon: string | null
  websitesi: string | null
  tur: string | null
  sorumlu: string | null
  durum: string | null
  durum_dm: string | null
  durum_customer: string | null
  yorumlar: string | null
  createdAt: string
  updatedAt: string
}

export interface ContactMutationInput {
  contact: string
  telefon: string | null
  websitesi: string | null
  tur: string | null
  sorumlu: string | null
  durum_dm: string | null
  durum_customer: string | null
  yorumlar: string | null
}

export interface ContactFormState {
  contact: string
  telefon: string
  websitesi: string
  tur: string
  sorumlu: string
  durum_dm: string
  durum_customer: string
  yorumlar: string
}

export function createEmptyContactFormState(): ContactFormState {
  return {
    contact: '',
    telefon: '',
    websitesi: '',
    tur: '',
    sorumlu: '',
    durum_dm: '',
    durum_customer: '',
    yorumlar: '',
  }
}

export function mapContactRow(row: ContactItemRow): ContactItem {
  return {
    id: row.id,
    contact: row.contact,
    telefon: row.telefon,
    websitesi: row.websitesi,
    tur: row.tur,
    sorumlu: row.sorumlu,
    durum: row.durum,
    durum_dm: row.durum_dm,
    durum_customer: row.durum_customer,
    yorumlar: row.yorumlar,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function toContactFormState(item: ContactItem): ContactFormState {
  return {
    contact: item.contact,
    telefon: item.telefon ?? '',
    websitesi: item.websitesi ?? '',
    tur: item.tur ?? '',
    sorumlu: item.sorumlu ?? '',
    durum_dm: item.durum_dm ?? '',
    durum_customer: item.durum_customer ?? '',
    yorumlar: item.yorumlar ?? '',
  }
}
