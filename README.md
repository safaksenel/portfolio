# ⚡ Ahmet Şafak Şenel — Developer & Automation Portfolio

Modern, high-aesthetic personal developer portfolio engineered with **Next.js 16.4**, **React 19.3**, **Python 3.14**, **Django 6.1**, **Tailwind CSS v4**, and **Supabase (PostgreSQL 17)**.

![Portfolio Banner](frontend/public/safak.jpeg)

---

## 🌟 Key Features

- 🌍 **Bilingual Support (TR & EN):** Seamless runtime language switching across all sections, projects, and metadata.
- 🌓 **Dark & Light Mode:** Theme switcher supporting deep space dark mode (`#060609`) and clean, modern light mode with glassmorphic cards.
- 💻 **Interactive Python 3.14 Terminal:** Live simulation of Crawl4AI web scrapers, high-speed asyncio bots, and Django health checks.
- 📐 **Bento Grid & Spotlight Cards:** Dynamic radial spotlight effects following mouse movement to showcase technical expertise.
- 🚀 **Filterable Engineering Projects:** Categorized showcases (Scraping, Backend, Data Science, Full-Stack) with problem & architectural solution accordion deep-dives.
- 📬 **Direct Contact & Bot Protection:** Personal contact form integrated with Django Ninja REST API and honeypot anti-spam protection.
- 📄 **Curriculum Vitae (CV):** Direct access and download for both Turkish and English resumes.

---

## 🛠️ Tech Stack & Architecture

### Frontend
- **Framework:** Next.js 16.4.1 (App Router, Turbopack, React 19.3, TypeScript 5.8)
- **Styling:** Tailwind CSS v4.3+ (CSS-first `@theme`, Oxide engine)
- **Animations:** Motion (`motion/react` v14.2), Lenis Smooth Scroll, GSAP 3.15
- **Icons:** Lucide React & Custom Brand Icons

### Backend
- **Language & Runtime:** Python 3.14.8
- **Framework:** Django 6.1.2 + Django Ninja 1.3 (Pydantic v2 validation, `/api/docs` OpenAPI/Swagger)
- **Database Driver:** Psycopg 3 (`psycopg[binary,pool]>=3.2.0`)
- **Serverless:** Vercel Python WSGI / ASGI integration

### Database & Cloud
- **Database:** Supabase PostgreSQL 17.11 (Supavisor Transaction Pooler Port 6543)
- **Security:** Row Level Security (RLS) enabled on all tables
- **Deployment:** Vercel Serverless

---

## 🚀 Local Development

### 1. Backend Setup
```bash
cd backend
py -3.14 -m venv .venv
# On Windows
.venv\Scripts\activate

pip install -r requirements.txt
python manage.py migrate
python manage.py seed_portfolio
python manage.py runserver 127.0.0.1:8000
```
Swagger UI available at `http://127.0.0.1:8000/api/docs`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Portfolio opens at `http://localhost:3000`.

---

## 📄 License & Author

Developed by **Ahmet Şafak Şenel**  
- GitHub: [@safaksenel](https://github.com/safaksenel)  
- LinkedIn: [in/safaksenel](https://linkedin.com/in/safaksenel)  
