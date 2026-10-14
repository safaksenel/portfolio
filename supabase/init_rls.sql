-- ==============================================================================
-- 🔒 SUPABASE ROW LEVEL SECURITY (RLS) & STORAGE POLICIES
-- Project: Interactive Developer & Automation Portfolio
-- Stack: Django 6.1 (Python 3.14) + Next.js 16.4 + Supabase + Vercel
-- Author: Senior Cloud, Supabase & Vercel DevOps Architect
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ENABLE ROW LEVEL SECURITY
-- ------------------------------------------------------------------------------
ALTER TABLE IF EXISTS portfolio_project ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS portfolio_service ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS inquiries_contactinquiry ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 2. POLICIES FOR: portfolio_project
-- Requirement: Herkese SELECT açık (Public Read). Yazma/Güncelleme yalnızca service_role.
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "portfolio_project_public_select" ON portfolio_project;
CREATE POLICY "portfolio_project_public_select"
    ON portfolio_project
    FOR SELECT
    TO public, anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "portfolio_project_service_role_all" ON portfolio_project;
CREATE POLICY "portfolio_project_service_role_all"
    ON portfolio_project
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 3. POLICIES FOR: portfolio_service
-- Requirement: Herkese SELECT açık (Public Read). Yazma/Güncelleme yalnızca service_role.
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "portfolio_service_public_select" ON portfolio_service;
CREATE POLICY "portfolio_service_public_select"
    ON portfolio_service
    FOR SELECT
    TO public, anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "portfolio_service_service_role_all" ON portfolio_service;
CREATE POLICY "portfolio_service_service_role_all"
    ON portfolio_service
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 4. POLICIES FOR: inquiries_contactinquiry
-- Requirement: Sadece INSERT açık (Anon/Public). SELECT/UPDATE/DELETE yalnızca service_role.
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "inquiries_public_insert" ON inquiries_contactinquiry;
CREATE POLICY "inquiries_public_insert"
    ON inquiries_contactinquiry
    FOR INSERT
    TO public, anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "inquiries_service_role_all" ON inquiries_contactinquiry;
CREATE POLICY "inquiries_service_role_all"
    ON inquiries_contactinquiry
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Note: No SELECT policy is created for anon/public, ensuring zero customer data leakage.

-- ------------------------------------------------------------------------------
-- 5. SUPABASE STORAGE SETUP: portfolio-assets
-- Creates public bucket for thumbnails, project architecture diagrams & CV PDF
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'portfolio-assets',
    'portfolio-assets',
    true,
    10485760, -- 10MB limit
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf'];

-- Storage RLS: Public Read for portfolio-assets
DROP POLICY IF EXISTS "portfolio_assets_public_read" ON storage.objects;
CREATE POLICY "portfolio_assets_public_read"
    ON storage.objects
    FOR SELECT
    TO public, anon, authenticated
    USING (bucket_id = 'portfolio-assets');

-- Storage RLS: Service Role Full Access
DROP POLICY IF EXISTS "portfolio_assets_service_role_manage" ON storage.objects;
CREATE POLICY "portfolio_assets_service_role_manage"
    ON storage.objects
    FOR ALL
    TO service_role
    USING (bucket_id = 'portfolio-assets')
    WITH CHECK (bucket_id = 'portfolio-assets');

-- ------------------------------------------------------------------------------
-- 6. GRANT PERMISSIONS TO POSTGRES ROLES
-- ------------------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON portfolio_project TO anon, authenticated;
GRANT SELECT ON portfolio_service TO anon, authenticated;
GRANT INSERT ON inquiries_contactinquiry TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
