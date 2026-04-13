-- Migration 004: links tablosu
-- Run manually in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  added_by TEXT NOT NULL CHECK (added_by IN ('Şahin', 'UBT', 'Baran')),
  description TEXT NOT NULL DEFAULT '',
  link TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to links" ON links
  FOR ALL USING (true) WITH CHECK (true);
