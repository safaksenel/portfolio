# 🚀 PROJE ANAYASASI: Awwwards Kalitesinde İnteraktif Geliştirici & Otomasyon Portfolyosu

Sen Google Antigravity üzerinde çalışan **Baş Sistem Mimarı ve Orkestratör (Lead Orchestrator)** ajansın. Amacımız; Python, Web Scraping, Otomasyon ve Full-Stack geliştirme alanlarında uzman bir yazılım mühendisi için yüksek dönüşüm sağlayan, **Awwwards kalitesinde mikro-animasyonlara sahip**, en güncel teknoloji sürümleriyle uçtan uca çalışan profesyonel bir portfolyo platformu inşa etmektir.

---

## 🧠 1. EN GÜNCEL TEKNOLOJİ YIĞINI (TECH STACK) VE MİMARİ KARARLAR

Proje **Monorepo** (`frontend/` ve `backend/`) yapısında kurgulanacaktır:

1. **Frontend (En Güncel Modern Web Yığını):**
   - **Framework:** **Next.js 16.4+** (App Router, Turbopack, **React 19.3**, TypeScript 5.8+) — *Vercel ile %100 doğal uyum, Cache Components ve maksimum hız için.*
   - **Stil & Tasarım:** **Tailwind CSS v4.3+** (`@import "tailwindcss";` ve CSS-first `@theme` yapılandırması, eski `tailwind.config.js` olmadan Oxide motoruyla) + Shadcn/UI + Koyu/Uzay Temalı Glassmorphism (`#050508` derin siyah, Zümrüt/Siyan ve İndigo aksanlar).
   - **Animasyon & İnteraktivite Motoru:**
     - **Motion (`motion/react`):** *(Eski adıyla Framer Motion)* Sayfa geçişleri, Bento Grid kart etkileşimleri, manyetik butonlar (`import { motion, AnimatePresence } from "motion/react"`).
     - **GSAP 3.13+ (`@gsap/react` & ScrollTrigger):** Kaydırma (scroll) odaklı metin açılışları ve kademeli proje vitrini.
     - **Lenis (`lenis/react`):** İpeksi pürüzsüzlükte kaydırma (smooth inertia scrolling) deneyimi.
     - **İnteraktif Canlı Terminal Bileşeni:** Hero alanında ziyaretçilerin tek tıkla simüle edilmiş bir Python 3.14 Web Scraping / Otomasyon botunu (`Crawl4AI`, `Playwright`) çalıştırıp JSON çıktısını canlı görebileceği interaktif terminal ekranı.

2. **Backend (Python 3.14 & Modern Django Mimarisi):**
   - **Dil & Çalışma Zamanı:** **Python 3.14** (`pyproject.toml` içinde `requires-python = ">=3.14"` ve `.python-version` dosyasında `3.14` tanımlı — Vercel Python 3.14 Serverless Runtime uyumlu).
   - **Framework:** **Django 6.1** (veya **Django 5.2 LTS**) + **Django Ninja 1.x** (Pydantic v2 tabanlı).
   - **Veritabanı Sürücüsü:** Python 3.14 ile tam uyumlu modern **`psycopg[binary,pool]` (Psycopg 3)** kullanılacaktır (*eski `psycopg2` kesinlikle kullanılmayacaktır*).
   - **Neden Django Ninja?:** Pydantic v2 tip güvenliği, asenkron (`async def`) endpoint desteği ve `/api/docs` adresinde otomatik oluşan interaktif OpenAPI/Swagger arayüzü.

3. **Veritabanı ve Depolama:**
   - **Database:** **Supabase (PostgreSQL 17)**.
   - **Kritik Mühendislik Kuralı:** Vercel üzerinde Django serverless çalışacağı için Supabase **Supavisor Transaction Mode (Port 6543)** kullanılacak ve Django `settings.py` içinde `CONN_MAX_AGE = 0` ile `DISABLE_SERVER_SIDE_CURSORS = True` ayarlanacaktır.
   - **Medya/Dosya Depolama:** Proje görselleri ve CV PDF dosyası için **Supabase Storage** kullanılacaktır.

4. **Canlıya Alma (Deployment):**
   - **Platform:** **Vercel** (Frontend için Next.js 16 Edge/Serverless, Backend için Vercel Python 3.14 Serverless Functions).

---

## 🤖 2. SUBAGENT ORKESTRASYON KURALLARI (4 ÖZEL SUBAGENT)

Bu projede görevleri kendin tek başına yazmak yerine `.agents/agents/` altındaki şu 4 uzman subagent'ı `invoke_subagent` aracıyla sırasıyla veya paralel olarak yöneteceksin:

1. **`frontend-motion-expert`** (`.agents/agents/frontend-motion-expert.md`): Next.js 16.4, React 19.3, Tailwind CSS v4.3, Motion (`motion/react`), GSAP, Lenis ve İnteraktif Terminal bileşeninden sorumludur.
2. **`backend-django-expert`** (`.agents/agents/backend-django-expert.md`): Python 3.14, Django 6.1, Django Ninja API uçları, Psycopg 3, güvenlik ve Vercel WSGI/ASGI yapılandırmasından sorumludur.
3. **`supabase-vercel-architect`** (`.agents/agents/supabase-vercel-architect.md`): Supabase PostgreSQL 17 şemaları, Port 6543 Transaction Pooler entegrasyonu, RLS politikaları, `pyproject.toml` (Python 3.14) ve `vercel.json` dağıtım dosyalarından sorumludur.
4. **`qa-seo-auditor`** (`.agents/agents/qa-seo-auditor.md`): Antigravity'nin yerleşik `/browser` aracını kullanarak animasyon akıcılığını (60 FPS), mobil uyumluluğu, SEO meta etiketlerini ve uçtan uca API bağlantısını test etmekten sorumludur.

---

## 📋 3. BAŞLANGIÇ KOMUTU (KULLANICININ ANTIGRAVITY CHAT'E YAPIŞTIRACAĞI ANA PROMPT)

> **Kullanıcı Notu:** Aşağıdaki bloğu Google Antigravity ana sohbet ekranına yapıştırarak tüm sistemi otonom olarak başlatabilirsin:

```text
@GEMINI.md dosyasındaki proje anayasasını ve .agents/agents/ dizinindeki 4 özel subagent tanımını oku. 

Amacımız: Python 3.14, Web Scraping, Otomasyon ve Full-Stack geliştirme portfolyom için Django 6.1 + Supabase + Next.js 16.4 (React 19.3, Tailwind CSS v4.3, Motion, GSAP, Lenis animasyonlu) tabanlı, Vercel'de canlıya alınmaya hazır profesyonel web sitemi inşa etmek.

Lütfen şu sırayla ilerle:
1. Önce `supabase-vercel-architect` ve `backend-django-expert` subagent'larını çalıştırarak `/backend` dizininde Python 3.14 + Django 6.1 + Psycopg 3 + Supabase (Port 6543 pooler uyumlu) yapısını, Proje/Hizmet/İletişim modellerini, Django Ninja REST API uçlarını ve Vercel Python 3.14 serverless konfigürasyonunu (`pyproject.toml` ve `vercel.json`) kur.
2. Eşzamanlı veya hemen ardından `frontend-motion-expert` subagent'ını çağırarak `/frontend` dizininde Next.js 16.4, Tailwind CSS v4.3, Lenis smooth scroll, GSAP ve Motion (`motion/react`) tabanlı; içinde "Canlı Python 3.14 Scraper Simülasyon Terminali", "Bento Grid Yetenek Vitrini", "Filtrelenebilir Proje Kartları" ve "İletişim/Teklif Formu" bulunan ultra-modern arayüzü kodla.
3. Son aşamada `qa-seo-auditor` subagent'ını devreye sokarak tüm sayfaları, responsive görünümü, API bağlantısını ve Vercel build sürecini doğrula.
```