-- Run this once in the existing SheFind Supabase project.
-- It upgrades the existing opportunities table in place; it does not create a second database.

ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS subcategory TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS district TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS benefit TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS education_level TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS gender_eligibility TEXT;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS min_age INTEGER;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS max_age INTEGER;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS income_limit NUMERIC;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS documents_required TEXT[];
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS application_start_date DATE;

-- URLs are intentionally nullable for needs_review records. Do not force an
-- unverified or unavailable application URL into the database.
ALTER TABLE public.opportunities ALTER COLUMN official_source_url DROP NOT NULL;
ALTER TABLE public.opportunities ALTER COLUMN official_application_url DROP NOT NULL;

DO $$
DECLARE
  state_type TEXT;
  district_type TEXT;
  education_type TEXT;
BEGIN
  SELECT udt_name INTO state_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'opportunities' AND column_name = 'state';
  SELECT udt_name INTO district_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'opportunities' AND column_name = 'district';
  SELECT udt_name INTO education_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'opportunities' AND column_name = 'education_level';
  IF state_type = '_text' THEN ALTER TABLE public.opportunities ALTER COLUMN state TYPE TEXT USING array_to_string(state, ', '); END IF;
  IF district_type = '_text' THEN ALTER TABLE public.opportunities ALTER COLUMN district TYPE TEXT USING array_to_string(district, ', '); END IF;
  IF education_type = '_text' THEN ALTER TABLE public.opportunities ALTER COLUMN education_level TYPE TEXT USING array_to_string(education_level, ', '); END IF;
END $$;

-- Older drafts used `benefits`; preserve their values while standardizing on `benefit`.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'opportunities' AND column_name = 'benefits') THEN
    EXECUTE 'UPDATE public.opportunities SET benefit = COALESCE(benefit, benefits) WHERE benefit IS NULL';
  END IF;
END $$;

-- The production seed uses readable category names instead of category UUIDs.
DO $$
DECLARE
  category_type TEXT;
BEGIN
  SELECT data_type INTO category_type
  FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'opportunities' AND column_name = 'category';
  IF category_type = 'uuid' THEN
    ALTER TABLE public.opportunities DROP CONSTRAINT IF EXISTS opportunities_category_fkey;
    ALTER TABLE public.opportunities ALTER COLUMN category TYPE TEXT USING category::TEXT;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS opportunities_public_browse_idx ON public.opportunities (status, verification_status, category, application_deadline);
CREATE INDEX IF NOT EXISTS opportunities_state_idx ON public.opportunities (state);
CREATE INDEX IF NOT EXISTS opportunities_slug_idx ON public.opportunities (slug);

-- The existing project may not have the authorization helper yet. Define it
-- before creating policies that reference it. SECURITY DEFINER avoids recursive
-- RLS evaluation when the helper checks admin_users.
CREATE OR REPLACE FUNCTION public.is_admin(required_role TEXT DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
      AND (required_role IS NULL OR role = required_role)
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin(TEXT) TO authenticated;

DROP POLICY IF EXISTS "Admins can do everything on opportunities" ON public.opportunities;
CREATE POLICY "Admins can do everything on opportunities" ON public.opportunities
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Ensure the public policy remains limited to verified active records.
DROP POLICY IF EXISTS "Anyone can read active and verified opportunities" ON public.opportunities;
CREATE POLICY "Anyone can read active and verified opportunities" ON public.opportunities
  FOR SELECT
  USING (status = 'active' AND verification_status = 'verified');
