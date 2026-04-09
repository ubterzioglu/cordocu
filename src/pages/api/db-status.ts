import type { NextApiRequest, NextApiResponse } from 'next'
import { getSupabaseBrowserClient, supabaseEnvStatus } from '@/lib/supabase'

export type DbStatusResponse = {
  connected: boolean
  mode: 'configured' | 'mock-fallback'
  missingEnvKeys: string[]
  categories?: { slug: string; label: string }[]
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DbStatusResponse>
) {
  if (!supabaseEnvStatus.isConfigured) {
    return res.status(200).json({
      connected: false,
      mode: 'mock-fallback',
      missingEnvKeys: supabaseEnvStatus.missingEnvKeys,
    })
  }

  const client = getSupabaseBrowserClient()
  if (!client) {
    return res.status(200).json({
      connected: false,
      mode: 'mock-fallback',
      missingEnvKeys: [],
    })
  }

  const { data, error } = await client
    .from('doc_categories')
    .select('slug, label')
    .order('sort_order')
    .limit(10)

  if (error) {
    return res.status(200).json({
      connected: false,
      mode: 'configured',
      missingEnvKeys: [],
      error: error.message,
    })
  }

  return res.status(200).json({
    connected: true,
    mode: 'configured',
    missingEnvKeys: [],
    categories: data ?? [],
  })
}
