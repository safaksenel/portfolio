-- ==============================================================================
-- 🚀 SUPABASE POSTGRESQL 17 SCHEMA DEFINITION
-- Project: Interactive Developer & Automation Portfolio
-- Stack: Django 6.1 (Python 3.14) + Next.js 16.4 + Supabase + Vercel
-- Author: Senior Cloud, Supabase & Vercel DevOps Architect
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. HELPER FUNCTION: auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. TABLES DEFINITION (Django Model Convention Aligned)
-- ==============================================================================

-- 3.1. Portfolio Projects (App: portfolio, Model: Project -> portfolio_project)
CREATE TABLE IF NOT EXISTS portfolio_project (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL CHECK (category IN ('scraping', 'backend', 'data', 'fullstack')),
    short_description VARCHAR(300) NOT NULL,
    problem_statement TEXT NOT NULL,
    solution_architecture TEXT NOT NULL,
    tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    github_url VARCHAR(500) NOT NULL DEFAULT '',
    live_url VARCHAR(500) NOT NULL DEFAULT '',
    thumbnail_url VARCHAR(500) NOT NULL DEFAULT '',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Trigger for portfolio_project.updated_at
DROP TRIGGER IF EXISTS trg_portfolio_project_updated_at ON portfolio_project;
CREATE TRIGGER trg_portfolio_project_updated_at
    BEFORE UPDATE ON portfolio_project
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes for fast filtering and ordering
CREATE INDEX IF NOT EXISTS idx_portfolio_project_category ON portfolio_project(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_project_is_featured ON portfolio_project(is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_project_order ON portfolio_project("order" ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_project_slug ON portfolio_project(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_project_tech_stack ON portfolio_project USING gin (tech_stack);


-- 3.2. Portfolio Services (App: portfolio, Model: Service -> portfolio_service)
CREATE TABLE IF NOT EXISTS portfolio_service (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon_name VARCHAR(100) NOT NULL DEFAULT 'Code',
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_portfolio_service_order ON portfolio_service("order" ASC);
CREATE INDEX IF NOT EXISTS idx_portfolio_service_slug ON portfolio_service(slug);


-- 3.3. Inquiries & Contact Requests (App: inquiries, Model: ContactInquiry -> inquiries_contactinquiry)
CREATE TABLE IF NOT EXISTS inquiries_contactinquiry (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(254) NOT NULL,
    service_type VARCHAR(100) NOT NULL DEFAULT 'general',
    budget_range VARCHAR(100) NOT NULL DEFAULT 'undisclosed',
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    is_read BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_inquiries_contactinquiry_created_at ON inquiries_contactinquiry(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_contactinquiry_is_read ON inquiries_contactinquiry(is_read);

-- ==============================================================================
-- 4. SEED SAMPLE DATA (INITIAL BOOTSTRAP)
-- ==============================================================================

INSERT INTO portfolio_service (title, slug, description, icon_name, deliverables, "order")
VALUES 
(
    'Yüksek Hızlı Web Scraping & Veri Madenciliği',
    'web-scraping-automation',
    'Playwright, Crawl4AI ve Python 3.14 asyncio ile Cloudflare, Akamai ve Datadome bypass mimarisi. Yapılandırılmış JSON/Parquet veri boru hatları.',
    'Terminal',
    '["Anti-bot bypass çözümleri", "Dağıtık proxy rotasyonu", "Gerçek zamanlı webhook tetikleyicileri", "Supabase & Postgres otomatik yükleme"]'::jsonb,
    1
),
(
    'Modern Backend & Asenkron API Mimarisi',
    'modern-backend-api',
    'Django 6.1 + Django Ninja ile Pydantic v2 tip güvenliğinde, yüksek verimli mikroservis ve REST API geliştirme.',
    'Cpu',
    '["Serverless Vercel Python mimarisi", "Supabase Transaction Pooler optimizasyonu", "Otomatik OpenAPI/Swagger dokümantasyonu", "OAuth2 & JWT kimlik doğrulama"]'::jsonb,
    2
),
(
    'Full-Stack Otomasyon Sistemleri & Gösterge Panelleri',
    'full-stack-automation',
    'Next.js 16.4 ve Tailwind CSS v4 ile işletmeler için özel otomasyon botları, CRM entegrasyonları ve canlı izleme panelleri.',
    'Layers',
    '["Next.js 16 + React 19 kontrol panelleri", "Tailwind CSS v4 & Motion interaktivitesi", "Zamanlanmış cron görevleri", "Telegram/E-Posta bot bildirimleri"]'::jsonb,
    3
)
ON CONFLICT (slug) DO NOTHING;
