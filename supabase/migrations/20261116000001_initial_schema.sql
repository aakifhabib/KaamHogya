-- KaamHoGaya.pk — Initial Database Schema, Triggers, Rate-Limited RPC, and RLS Policies
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Cities
CREATE TABLE IF NOT EXISTS public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  urdu_label TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Processes
CREATE TABLE IF NOT EXISTS public.processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  urdu_title TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  fee_normal INTEGER NOT NULL DEFAULT 0 CHECK (fee_normal >= 0),
  fee_urgent INTEGER NOT NULL DEFAULT 0 CHECK (fee_urgent >= 0),
  fee_executive INTEGER NOT NULL DEFAULT 0 CHECK (fee_executive >= 0),
  fee_notes TEXT NOT NULL DEFAULT '',
  time_required TEXT NOT NULL,
  office_name TEXT NOT NULL,
  office_address TEXT NOT NULL,
  office_timings TEXT NOT NULL,
  best_day_to_go TEXT NOT NULL,
  official_source_url TEXT NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_nationwide BOOLEAN NOT NULL DEFAULT FALSE,
  popularity_rank INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Documents
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  process_id UUID NOT NULL REFERENCES public.processes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('original', 'photocopy')),
  copies_needed INTEGER NOT NULL DEFAULT 1 CHECK (copies_needed >= 1 AND copies_needed <= 20),
  note TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- 5. Steps
CREATE TABLE IF NOT EXISTS public.steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  process_id UUID NOT NULL REFERENCES public.processes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL CHECK (step_number >= 1),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  time_minutes INTEGER NOT NULL DEFAULT 10 CHECK (time_minutes >= 1 AND time_minutes <= 600)
);

-- 6. Mistakes (3 Mistakes That Waste Your Day)
CREATE TABLE IF NOT EXISTS public.mistakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  process_id UUID NOT NULL REFERENCES public.processes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- 7. FAQs
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  process_id UUID NOT NULL REFERENCES public.processes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- 8. Wait Times (Crowdsourced submissions)
CREATE TABLE IF NOT EXISTS public.wait_times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  process_id UUID NOT NULL REFERENCES public.processes(id) ON DELETE CASCADE,
  office_name TEXT NOT NULL,
  city TEXT NOT NULL,
  visit_date DATE NOT NULL CHECK (visit_date <= CURRENT_DATE),
  wait_minutes INTEGER NOT NULL CHECK (wait_minutes >= 5 AND wait_minutes <= 480),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  tip TEXT NOT NULL DEFAULT '' CHECK (char_length(tip) <= 200),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Admin Users Registry
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Anti-spam Rate Limit Log for Wait Time Submissions
CREATE TABLE IF NOT EXISTS public.wait_time_rate_limits (
  id BIGSERIAL PRIMARY KEY,
  client_hash TEXT NOT NULL,
  process_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_processes_slug ON public.processes(slug);
CREATE INDEX IF NOT EXISTS idx_processes_city ON public.processes(city);
CREATE INDEX IF NOT EXISTS idx_processes_category ON public.processes(category);
CREATE INDEX IF NOT EXISTS idx_processes_popularity ON public.processes(popularity_rank ASC);
CREATE INDEX IF NOT EXISTS idx_documents_process ON public.documents(process_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_steps_process ON public.steps(process_id, step_number);
CREATE INDEX IF NOT EXISTS idx_mistakes_process ON public.mistakes(process_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_process ON public.faqs(process_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_wait_times_process_status ON public.wait_times(process_id, status, visit_date DESC);
CREATE INDEX IF NOT EXISTS idx_wait_times_city_status ON public.wait_times(city, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wait_time_rate_limits_lookup ON public.wait_time_rate_limits(client_hash, created_at DESC);

-- Helper function: Is current authenticated user an admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

-- Trigger function: Automatically update last_updated when a process is updated
CREATE OR REPLACE FUNCTION public.set_process_last_updated()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.last_updated := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_processes_last_updated ON public.processes;
CREATE TRIGGER trg_processes_last_updated
BEFORE UPDATE ON public.processes
FOR EACH ROW
EXECUTE FUNCTION public.set_process_last_updated();

-- Trigger function: Touch parent process.last_updated whenever child records change
CREATE OR REPLACE FUNCTION public.touch_parent_process_last_updated()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_process_id UUID;
BEGIN
  v_process_id := COALESCE(NEW.process_id, OLD.process_id);
  IF v_process_id IS NOT NULL THEN
    UPDATE public.processes
    SET last_updated = NOW()
    WHERE id = v_process_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS trg_documents_touch_process ON public.documents;
CREATE TRIGGER trg_documents_touch_process
AFTER INSERT OR UPDATE OR DELETE ON public.documents
FOR EACH ROW EXECUTE FUNCTION public.touch_parent_process_last_updated();

DROP TRIGGER IF EXISTS trg_steps_touch_process ON public.steps;
CREATE TRIGGER trg_steps_touch_process
AFTER INSERT OR UPDATE OR DELETE ON public.steps
FOR EACH ROW EXECUTE FUNCTION public.touch_parent_process_last_updated();

DROP TRIGGER IF EXISTS trg_mistakes_touch_process ON public.mistakes;
CREATE TRIGGER trg_mistakes_touch_process
AFTER INSERT OR UPDATE OR DELETE ON public.mistakes
FOR EACH ROW EXECUTE FUNCTION public.touch_parent_process_last_updated();

DROP TRIGGER IF EXISTS trg_faqs_touch_process ON public.faqs;
CREATE TRIGGER trg_faqs_touch_process
AFTER INSERT OR UPDATE OR DELETE ON public.faqs
FOR EACH ROW EXECUTE FUNCTION public.touch_parent_process_last_updated();

-- Rate-limited, sanitized RPC for public Wait Time submissions
CREATE OR REPLACE FUNCTION public.submit_wait_time(
  p_process_id UUID,
  p_visit_date DATE,
  p_wait_minutes INTEGER,
  p_rating INTEGER,
  p_tip TEXT,
  p_client_hash TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_process RECORD;
  v_clean_tip TEXT;
  v_recent_total INTEGER;
  v_recent_same_process INTEGER;
  v_inserted_id UUID;
  v_hash TEXT;
BEGIN
  -- Validate process exists
  SELECT id, office_name, city INTO v_process
  FROM public.processes
  WHERE id = p_process_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Selected process was not found.' USING ERRCODE = 'P0001';
  END IF;

  -- Validate inputs
  IF p_wait_minutes IS NULL OR p_wait_minutes < 5 OR p_wait_minutes > 480 THEN
    RAISE EXCEPTION 'Wait time must be between 5 and 480 minutes.' USING ERRCODE = 'P0001';
  END IF;

  IF p_visit_date IS NULL OR p_visit_date > CURRENT_DATE THEN
    RAISE EXCEPTION 'Visit date cannot be in the future.' USING ERRCODE = 'P0001';
  END IF;

  IF p_visit_date < (CURRENT_DATE - INTERVAL '90 days') THEN
    RAISE EXCEPTION 'Visit date must be within the last 90 days.' USING ERRCODE = 'P0001';
  END IF;

  IF p_rating IS NULL OR p_rating < 1 OR p_rating > 5 THEN
    RAISE EXCEPTION 'Rating must be between 1 and 5.' USING ERRCODE = 'P0001';
  END IF;

  -- Strip HTML tags and normalize whitespace
  v_clean_tip := regexp_replace(coalesce(p_tip, ''), '<[^>]*>', '', 'g');
  v_clean_tip := trim(regexp_replace(v_clean_tip, '\s+', ' ', 'g'));

  IF char_length(v_clean_tip) > 200 THEN
    RAISE EXCEPTION 'Tip must be 200 characters or fewer.' USING ERRCODE = 'P0001';
  END IF;

  v_hash := coalesce(nullif(trim(p_client_hash), ''), 'anonymous');

  -- Prune old rate limit rows (> 24 hours)
  DELETE FROM public.wait_time_rate_limits
  WHERE created_at < NOW() - INTERVAL '24 hours';

  -- Check rate limits: max 3 per hour globally, max 1 per 15 min per process
  SELECT count(*) INTO v_recent_total
  FROM public.wait_time_rate_limits
  WHERE client_hash = v_hash
    AND created_at > NOW() - INTERVAL '1 hour';

  IF v_recent_total >= 3 THEN
    RAISE EXCEPTION 'Rate limit reached. Please wait an hour before submitting another report.' USING ERRCODE = 'P0001';
  END IF;

  SELECT count(*) INTO v_recent_same_process
  FROM public.wait_time_rate_limits
  WHERE client_hash = v_hash
    AND process_id = p_process_id
    AND created_at > NOW() - INTERVAL '15 minutes';

  IF v_recent_same_process >= 1 THEN
    RAISE EXCEPTION 'You already submitted a wait time for this office recently. Please try again in 15 minutes.' USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO public.wait_times (
    process_id,
    office_name,
    city,
    visit_date,
    wait_minutes,
    rating,
    tip,
    status
  ) VALUES (
    v_process.id,
    v_process.office_name,
    v_process.city,
    p_visit_date,
    p_wait_minutes,
    p_rating,
    v_clean_tip,
    'pending'
  )
  RETURNING id INTO v_inserted_id;

  INSERT INTO public.wait_time_rate_limits (client_hash, process_id)
  VALUES (v_hash, v_process.id);

  RETURN jsonb_build_object(
    'id', v_inserted_id,
    'status', 'pending',
    'message', 'Wait time submitted for review. Shukriya for helping fellow citizens!'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_wait_time(UUID, DATE, INTEGER, INTEGER, TEXT, TEXT) TO anon, authenticated;

-- Enable Row Level Security on all tables
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wait_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wait_time_rate_limits ENABLE ROW LEVEL SECURITY;

-- Policies: Public Read on reference & process content
DROP POLICY IF EXISTS "Public read cities" ON public.cities;
CREATE POLICY "Public read cities" ON public.cities FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admin manage cities" ON public.cities;
CREATE POLICY "Admin manage cities" ON public.cities FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public read categories" ON public.categories;
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admin manage categories" ON public.categories;
CREATE POLICY "Admin manage categories" ON public.categories FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public read processes" ON public.processes;
CREATE POLICY "Public read processes" ON public.processes FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admin manage processes" ON public.processes;
CREATE POLICY "Admin manage processes" ON public.processes FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public read documents" ON public.documents;
CREATE POLICY "Public read documents" ON public.documents FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admin manage documents" ON public.documents;
CREATE POLICY "Admin manage documents" ON public.documents FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public read steps" ON public.steps;
CREATE POLICY "Public read steps" ON public.steps FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admin manage steps" ON public.steps;
CREATE POLICY "Admin manage steps" ON public.steps FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public read mistakes" ON public.mistakes;
CREATE POLICY "Public read mistakes" ON public.mistakes FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admin manage mistakes" ON public.mistakes;
CREATE POLICY "Admin manage mistakes" ON public.mistakes FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public read faqs" ON public.faqs;
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admin manage faqs" ON public.faqs;
CREATE POLICY "Admin manage faqs" ON public.faqs FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Policies: Wait Times
DROP POLICY IF EXISTS "Public read approved wait times" ON public.wait_times;
CREATE POLICY "Public read approved wait times" ON public.wait_times FOR SELECT USING (status = 'approved' OR public.is_admin());

DROP POLICY IF EXISTS "Public insert pending wait times" ON public.wait_times;
CREATE POLICY "Public insert pending wait times" ON public.wait_times FOR INSERT
WITH CHECK (
  status = 'pending'
  AND wait_minutes BETWEEN 5 AND 480
  AND rating BETWEEN 1 AND 5
  AND visit_date <= CURRENT_DATE
  AND char_length(tip) <= 200
);

DROP POLICY IF EXISTS "Admin update wait times" ON public.wait_times;
CREATE POLICY "Admin update wait times" ON public.wait_times FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin delete wait times" ON public.wait_times;
CREATE POLICY "Admin delete wait times" ON public.wait_times FOR DELETE USING (public.is_admin());

-- Policies: Admin Users (authenticated users can check if they are in admin_users)
DROP POLICY IF EXISTS "Self read admin_users" ON public.admin_users;
CREATE POLICY "Self read admin_users" ON public.admin_users FOR SELECT USING (user_id = auth.uid());
