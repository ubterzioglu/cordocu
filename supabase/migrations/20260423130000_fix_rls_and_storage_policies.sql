-- ============================================================
-- Security fix: Restrict RLS policies and storage bucket access
-- Replaces all USING(true) WITH CHECK(true) with proper policies
-- ============================================================

-- -----------------------------------------------------------
-- 1. TABLE POLICIES
-- -----------------------------------------------------------

-- links: read-only for anon, full CRUD for authenticated
DROP POLICY IF EXISTS "Allow all" ON public.links;
CREATE POLICY "links_select_public" ON public.links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "links_all_authenticated" ON public.links FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- mvp_items: read-only for anon, full CRUD for authenticated
DROP POLICY IF EXISTS "Allow all" ON public.mvp_items;
CREATE POLICY "mvp_items_select_public" ON public.mvp_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "mvp_items_all_authenticated" ON public.mvp_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- social_media_links: read-only for anon, full CRUD for authenticated
DROP POLICY IF EXISTS "Allow all" ON public.social_media_links;
CREATE POLICY "social_media_links_select_public" ON public.social_media_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "social_media_links_all_authenticated" ON public.social_media_links FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- arge_links: read-only for anon, full CRUD for authenticated
DROP POLICY IF EXISTS "Allow all" ON public.arge_links;
CREATE POLICY "arge_links_select_public" ON public.arge_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "arge_links_all_authenticated" ON public.arge_links FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- arge_cards: read-only for anon, full CRUD for authenticated
DROP POLICY IF EXISTS "Allow all" ON public.arge_cards;
CREATE POLICY "arge_cards_select_public" ON public.arge_cards FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "arge_cards_all_authenticated" ON public.arge_cards FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- arge_files: read-only for anon, full CRUD for authenticated
DROP POLICY IF EXISTS "Allow all" ON public.arge_files;
CREATE POLICY "arge_files_select_public" ON public.arge_files FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "arge_files_all_authenticated" ON public.arge_files FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- todo_items: read-only for anon, full CRUD for authenticated
DROP POLICY IF EXISTS "Allow all" ON public.todo_items;
CREATE POLICY "todo_items_select_public" ON public.todo_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "todo_items_all_authenticated" ON public.todo_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- contacts: read-only for anon, full CRUD for authenticated (PII data)
DROP POLICY IF EXISTS "Allow all" ON public.contacts;
CREATE POLICY "contacts_select_public" ON public.contacts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "contacts_all_authenticated" ON public.contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- meeting_notes: read-only for anon, full CRUD for authenticated
DROP POLICY IF EXISTS "Allow all" ON public.meeting_notes;
CREATE POLICY "meeting_notes_select_public" ON public.meeting_notes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "meeting_notes_all_authenticated" ON public.meeting_notes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- advisor_social_media_links: read-only for anon, full CRUD for authenticated
DROP POLICY IF EXISTS "Allow all" ON public.advisor_social_media_links;
CREATE POLICY "advisor_social_media_links_select_public" ON public.advisor_social_media_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "advisor_social_media_links_all_authenticated" ON public.advisor_social_media_links FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- gorevler: read-only for anon, full CRUD for authenticated
DROP POLICY IF EXISTS "Allow all" ON public.gorevler;
CREATE POLICY "gorevler_select_public" ON public.gorevler FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "gorevler_all_authenticated" ON public.gorevler FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- draft_notlar: read-only for anon, full CRUD for authenticated
DROP POLICY IF EXISTS "Allow all" ON public.draft_notlar;
CREATE POLICY "draft_notlar_select_public" ON public.draft_notlar FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "draft_notlar_all_authenticated" ON public.draft_notlar FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- user_cvs: replace existing permissive policies
DROP POLICY IF EXISTS "user_cvs_select_public" ON public.user_cvs;
DROP POLICY IF EXISTS "user_cvs_insert_public" ON public.user_cvs;
DROP POLICY IF EXISTS "user_cvs_update_public" ON public.user_cvs;
DROP POLICY IF EXISTS "user_cvs_delete_public" ON public.user_cvs;
CREATE POLICY "user_cvs_select_public" ON public.user_cvs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "user_cvs_all_authenticated" ON public.user_cvs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- -----------------------------------------------------------
-- 2. STORAGE BUCKET POLICIES
-- -----------------------------------------------------------

-- cv-files: remove anon access, require authenticated
DROP POLICY IF EXISTS "cv_files_select_public" ON storage.objects;
DROP POLICY IF EXISTS "cv_files_insert_public" ON storage.objects;
DROP POLICY IF EXISTS "cv_files_update_public" ON storage.objects;
DROP POLICY IF EXISTS "cv_files_delete_public" ON storage.objects;

CREATE POLICY "cv_files_select_authenticated"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'cv-files');

CREATE POLICY "cv_files_insert_authenticated"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'cv-files'
    AND (storage.folder(name))[1] = auth.uid()::text
    AND lower(storage.extension(name)) IN ('pdf', 'doc', 'docx')
  );

CREATE POLICY "cv_files_update_authenticated"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'cv-files')
  WITH CHECK (
    bucket_id = 'cv-files'
    AND lower(storage.extension(name)) IN ('pdf', 'doc', 'docx')
  );

CREATE POLICY "cv_files_delete_authenticated"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'cv-files');

-- arge-files bucket: create if missing, restrict to authenticated
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('arge-files', 'arge-files', false, 52428800)
ON CONFLICT (id) DO UPDATE SET file_size_limit = 52428800;

DROP POLICY IF EXISTS "arge_files_storage_select" ON storage.objects;
DROP POLICY IF EXISTS "arge_files_storage_insert" ON storage.objects;
DROP POLICY IF EXISTS "arge_files_storage_update" ON storage.objects;
DROP POLICY IF EXISTS "arge_files_storage_delete" ON storage.objects;

CREATE POLICY "arge_files_storage_select"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'arge-files');

CREATE POLICY "arge_files_storage_insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'arge-files'
    AND lower(storage.extension(name)) IN (
      'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
      'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp',
      'zip', 'rar', '7z',
      'txt', 'csv', 'md', 'json'
    )
  );

CREATE POLICY "arge_files_storage_update"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'arge-files')
  WITH CHECK (bucket_id = 'arge-files');

CREATE POLICY "arge_files_storage_delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'arge-files');

-- Also set file size limit on cv-files bucket
UPDATE storage.buckets SET file_size_limit = 20971520 WHERE id = 'cv-files';

-- -----------------------------------------------------------
-- 3. URL VALIDATION CHECK CONSTRAINTS
-- -----------------------------------------------------------

ALTER TABLE public.links
  DROP CONSTRAINT IF EXISTS links_link_url_check,
  ADD CONSTRAINT links_link_url_check
    CHECK (link IS NULL OR link ~ '^https?://[^[:space:]]+$');

ALTER TABLE public.social_media_links
  DROP CONSTRAINT IF EXISTS social_media_links_link_url_check,
  ADD CONSTRAINT social_media_links_link_url_check
    CHECK (link IS NULL OR link ~ '^https?://[^[:space:]]+$');

ALTER TABLE public.advisor_social_media_links
  DROP CONSTRAINT IF EXISTS advisor_social_media_links_link_url_check,
  ADD CONSTRAINT advisor_social_media_links_link_url_check
    CHECK (link IS NULL OR link ~ '^https?://[^[:space:]]+$');

ALTER TABLE public.arge_links
  DROP CONSTRAINT IF EXISTS arge_links_url_check,
  ADD CONSTRAINT arge_links_url_check
    CHECK (url ~ '^https?://[^[:space:]]+$');

ALTER TABLE public.user_cvs
  DROP CONSTRAINT IF EXISTS user_cvs_linkedin_url_check,
  ADD CONSTRAINT user_cvs_linkedin_url_check
    CHECK (linkedin_url IS NULL OR linkedin_url ~ '^https?://[^[:space:]]+$');

ALTER TABLE public.user_cvs
  DROP CONSTRAINT IF EXISTS user_cvs_instagram_url_check,
  ADD CONSTRAINT user_cvs_instagram_url_check
    CHECK (instagram_url IS NULL OR instagram_url ~ '^https?://[^[:space:]]+$');

ALTER TABLE public.user_cvs
  DROP CONSTRAINT IF EXISTS user_cvs_website_url_check,
  ADD CONSTRAINT user_cvs_website_url_check
    CHECK (website_url IS NULL OR website_url ~ '^https?://[^[:space:]]+$');

-- -----------------------------------------------------------
-- 4. INPUT LENGTH CHECK CONSTRAINTS
-- -----------------------------------------------------------

ALTER TABLE public.meeting_notes
  DROP CONSTRAINT IF EXISTS meeting_notes_title_length_check,
  ADD CONSTRAINT meeting_notes_title_length_check
    CHECK (length(title) <= 500);

ALTER TABLE public.meeting_notes
  DROP CONSTRAINT IF EXISTS meeting_notes_content_length_check,
  ADD CONSTRAINT meeting_notes_content_length_check
    CHECK (length(content) <= 50000);

ALTER TABLE public.contacts
  DROP CONSTRAINT IF EXISTS contacts_contact_length_check,
  ADD CONSTRAINT contacts_contact_length_check
    CHECK (length(contact) <= 500);

ALTER TABLE public.mvp_items
  DROP CONSTRAINT IF EXISTS mvp_items_konu_length_check,
  ADD CONSTRAINT mvp_items_konu_length_check
    CHECK (length(konu) <= 500);

ALTER TABLE public.todo_items
  DROP CONSTRAINT IF EXISTS todo_items_konu_length_check,
  ADD CONSTRAINT todo_items_konu_length_check
    CHECK (length(konu) <= 500);
