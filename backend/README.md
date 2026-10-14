# Ahmet Şafak Şenel Portfolio - Python 3.14 & Django 6.1 Backend API

Production-grade, asynchronous serverless REST API built with **Python 3.14**, **Django 6.1**, **Django Ninja 1.7+** (Pydantic v2), and **Psycopg 3**, ready for **Supabase PostgreSQL 17** and **Vercel Serverless Functions**.

---

## ⚡ Tech Stack & Architecture

- **Runtime:** Python 3.14 (`.python-version` & `pyproject.toml` configured)
- **Framework:** Django 6.1.2 + Django Ninja 1.7.1
- **Driver:** Psycopg 3 (`psycopg[binary,pool]>=3.2.0`) - *zero psycopg2*
- **Database:** Supabase PostgreSQL 17 (Supavisor Transaction Pooler on Port 6543) with SQLite fallback
- **Static Assets:** Whitenoise 6.12 (`CompressedStaticFilesStorage`)
- **CORS:** `django-cors-headers` restricted to frontend domains and localhost

---

## 🔌 API Endpoints

- **`GET /api/health`** — Python 3.14 version, Django version, and DB connection diagnostics.
- **`GET /api/projects`** — List projects with optional category filter (`?category=scraping|backend|data|fullstack`) and featured filter (`?featured=true`).
- **`GET /api/projects/{slug}`** — Single project deep-dive (architecture, problem statement, tech stack, metrics).
- **`GET /api/services`** — Professional automation & engineering services.
- **`POST /api/contact`** — Pydantic v2-validated inquiry submission with Honeypot anti-spam protection.
- **`GET /api/docs`** — Interactive Swagger/OpenAPI UI.

---

## 🚀 Local Development

```bash
# 1. Run migrations
py -3.14 manage.py migrate

# 2. Seed initial data
py -3.14 manage.py seed_portfolio

# 3. Run test suite
py -3.14 manage.py test

# 4. Start development server
py -3.14 manage.py runserver 8000
```
