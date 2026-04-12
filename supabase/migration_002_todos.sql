-- Migration 002: todos table
-- Run manually in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS todos (
  id BIGSERIAL PRIMARY KEY,
  konu TEXT NOT NULL,
  durum TEXT NOT NULL DEFAULT 'Beklemede',
  tarih DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read todos" ON todos
  FOR SELECT USING (true);

CREATE POLICY "Public insert todos" ON todos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update todos" ON todos
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Public delete todos" ON todos
  FOR DELETE USING (true);
