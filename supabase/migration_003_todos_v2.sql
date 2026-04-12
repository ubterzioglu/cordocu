-- Migration 003: todos tablosuna eksik kolonları ekle
-- Run manually in Supabase SQL Editor

ALTER TABLE todos ADD COLUMN IF NOT EXISTS gorev TEXT;
ALTER TABLE todos ADD COLUMN IF NOT EXISTS sorumlu TEXT;
ALTER TABLE todos ADD COLUMN IF NOT EXISTS zaman TEXT;
