-- 001_create_settings_tables.sql
-- Create tables for server-side settings (published), drafts, and history

CREATE TABLE IF NOT EXISTS public.settings (
  key text PRIMARY KEY,
  value text,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.settings_draft (
  key text PRIMARY KEY,
  value text,
  updated_by uuid REFERENCES auth.users(id) NULL,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.settings_history (
  id bigserial PRIMARY KEY,
  key text NOT NULL,
  old_value text,
  new_value text,
  changed_by uuid REFERENCES auth.users(id) NULL,
  action text,
  changed_at timestamptz DEFAULT now()
);

-- Example RLS policies (adjust to your security needs):
-- Allow anonymous read on published settings
-- CREATE POLICY "public_select_settings" ON public.settings FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete settings (owner only recommended)
-- Example: require role owner in user_metadata (or use a separate table to mark owners)
-- CREATE POLICY "owner_update_settings" ON public.settings FOR ALL
--   USING (auth.role() = 'authenticated' AND (auth.jwt()->>'role') = 'owner');

-- For the history, allow only functions or authenticated owners to insert
-- CREATE POLICY "insert_history" ON public.settings_history FOR INSERT USING (auth.role() = 'authenticated');
