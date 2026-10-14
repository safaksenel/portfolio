# 🚀 Canlıya Alma Rehberi (Zero-Downtime Deployment Playbook)

Bu doküman; **Python 3.14 & Django 6.1** backend API'sinin, **Next.js 16.4 & React 19** frontend uygulamasının ve **Supabase PostgreSQL 17** veritabanının **Vercel** platformunda sıfır kesinti (zero-downtime) ve yüksek güvenlik standartlarıyla canlıya alınması için adım adım hazırlanmış kurumsal dağıtım rehberidir.

---

## 🏛️ Mimari Özet

```
┌─────────────────────────────────────────────────────────────┐
│                       KULLANICI                             │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS
          ┌────────────────────┴────────────────────┐
          ▼                                         ▼
┌───────────────────────────┐             ┌───────────────────────────┐
│     Next.js 16.4 UI       │             │   Django 6.1 Serverless   │
│   (Vercel Edge / Node)    │             │  (Vercel Python 3.14 API) │
│ - React 19 & Turbopack    │   REST API  │ - Django Ninja async      │
│ - Tailwind CSS v4 & Lenis │ ──────────> │ - Psycopg 3 backend       │
│ - Motion & GSAP           │             │ - WhiteNoise static files │
└───────────────────────────┘             └─────────────┬─────────────┘
                                                        │
                         Supavisor Pooler (Port 6543)   │
                         Transaction Mode & SSL         │
                                                        ▼
                                          ┌───────────────────────────┐
                                          │   Supabase PostgreSQL 17  │
                                          │ - Row Level Security (RLS)│
                                          │ - portfolio_project       │
                                          │ - portfolio_service       │
                                          │ - inquiries_contactinquiry│
                                          │ - portfolio-assets Storage│
                                          └───────────────────────────┘
```

---

## 📋 ADIM 1: Supabase PostgreSQL 17 Kurulumu & RLS Güvenliği

1. **Supabase Projesi Oluşturun:**
   - [supabase.com](https://supabase.com) adresine gidin ve yeni bir PostgreSQL 17 projesi başlatın.
   - Bölge olarak Vercel deployment bölgenize en yakın konumu (örn. Frankfurt - `eu-central-1`) seçin.

2. **Veritabanı Şemasını ve Tabloları Yükleyin:**
   - Supabase Dashboard -> **SQL Editor** sekmesini açın.
   - [`supabase/schema.sql`](file:///f:/portfolyo/supabase/schema.sql) dosyasının içeriğini yapıştırın ve **Run** butonuna tıklayın.
   - `portfolio_project`, `portfolio_service` ve `inquiries_contactinquiry` tabloları, indeksleri ve ilk seed verileri oluşacaktır.

3. **Row Level Security (RLS) ve Storage Ayarlarını Etkinleştirin:**
   - Supabase SQL Editor'de yeni bir sekme açın.
   - [`supabase/init_rls.sql`](file:///f:/portfolyo/supabase/init_rls.sql) dosyasının içeriğini yapıştırın ve **Run** butonuna tıklayın.
   - Bu adım:
     - `portfolio_project` ve `portfolio_service` tablolarına herkese açık `SELECT` izni verir.
     - `inquiries_contactinquiry` tablosuna yalnızca anonim `INSERT` verir, verilerin okunmasını sadece `service_role` ile sınırlar.
     - `portfolio-assets` adında public bir depolama alanı (bucket) oluşturur.

4. **Bağlantı Bilgilerini Not Edin:**
   - Supabase Dashboard -> **Project Settings** -> **Database** -> **Connection string** alanına gidin.
   - **Mode: Transaction** ve **Port: 6543** seçeneğini işaretleyip bağlantı dizesini kopyalayın.
     Örnek: `postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require`

---

## 🐍 ADIM 2: Backend (Django 6.1 & Python 3.14) Vercel Dağıtımı

1. **Vercel Projesi Oluşturma:**
   - [vercel.com](https://vercel.com) -> **Add New...** -> **Project** seçeneğine tıklayın.
   - Git deponuzu bağlayın.
   - **Root Directory:** `backend` olarak seçin.
   - **Framework Preset:** `Other` (veya Vercel otomatik algılayacaktır).

2. **Ortam Değişkenleri (Environment Variables):**
   Vercel Dashboard -> Proje Ayarları -> **Environment Variables** bölümüne gidin ve şunları ekleyin:

   | Değişken Adı | Örnek / Değer | Açıklama |
   |---|---|---|
   | `DATABASE_URL` | `postgresql://postgres.[REF]:[PASS]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require` | Supabase Port 6543 Transaction Pooler URL |
   | `DJANGO_SECRET_KEY` | `güçlü_uzun_rastgele_metin_64_karakter` | Django gizli güvenlik anahtarı |
   | `DJANGO_DEBUG` | `False` | Canlıda mutlaka False olmalı |
   | `DJANGO_ALLOWED_HOSTS` | `.vercel.app,localhost,127.0.0.1` | Vercel domainleri |
   | `CORS_ALLOWED_ORIGINS` | `http://localhost:3000,https://your-frontend.vercel.app` | Frontend'e izin verilen adres |
   | `SUPABASE_URL` | `https://[REF].supabase.co` | Supabase API adresi |
   | `SUPABASE_ANON_KEY` | `eyJhbGci...` | Supabase Anon Key |

3. **Python 3.14 Doğrulaması:**
   - Vercel, `/backend/pyproject.toml` içerisindeki `requires-python = "~=3.14.0"` ve `/backend/.python-version` dosyasındaki `3.14` tanımlamasını okuyarak otomatik olarak **Python 3.14 Serverless Runtime** ortamını ayağa kaldıracaktır.

4. **İlk Veritabanı Migration & Seed Komutları:**
   Yerel bilgisayarınızda veya CI/CD boru hattında:
   ```bash
   cd backend
   # Port 6543 veya direct port 5432 ile migration çalıştırın:
   python manage.py migrate
   # Örnek profesyonel portfolyo projelerini yükleyin:
   python manage.py seed_portfolio
   ```

5. **Uç Nokta Doğrulaması (Smoke Test):**
   - Tarayıcıda `https://[backend-adresiniz].vercel.app/api/health` adresini açın:
     ```json
     {
       "status": "ok",
       "python_version": "3.14.x",
       "database": "connected"
     }
     ```
   - OpenAPI/Swagger dökümantasyonu için `https://[backend-adresiniz].vercel.app/api/docs` adresini ziyaret edin.

---

## ⚡ ADIM 3: Frontend (Next.js 16.4 & React 19) Vercel Dağıtımı

1. **Vercel Projesi Oluşturma:**
   - Vercel Dashboard -> **Add New...** -> **Project**.
   - Git deponuzu tekrar seçin.
   - **Root Directory:** `frontend` olarak belirleyin.
   - **Framework Preset:** `Next.js` (Otomatik algılanır).

2. **Ortam Değişkenleri (Frontend):**

   | Değişken Adı | Değer |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | `https://[backend-adresiniz].vercel.app/api` |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://[REF].supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` |
   | `NEXT_PUBLIC_SITE_URL` | `https://[frontend-adresiniz].vercel.app` |

3. **Deploy & Build:**
   - **Deploy** butonuna tıklayın.
   - Next.js 16.4, Turbopack ile derlenecek ve Vercel Edge Network üzerinde anında yayınlanacaktır.

4. **Backend CORS Güncellemesi:**
   - Frontend canlı URL'si oluştuktan sonra Backend Vercel projesindeki `CORS_ALLOWED_ORIGINS` değişkenine frontend adresinizi ekleyin ve Backend'i yeniden deploy edin (Redeploy).

---

## 🛡️ Canlıya Alma Doğrulama Listesi (Production Checklist)

- [ ] Supabase RLS kuralları aktif: `inquiries_contactinquiry` tablosundan doğrudan SELECT yapılamadığı doğrulandı.
- [ ] Supabase Port 6543 (Transaction Pooler) kullanılıyor ve `CONN_MAX_AGE = 0`, `DISABLE_SERVER_SIDE_CURSORS = True` devrede.
- [ ] Vercel Backend `/api/health` 200 OK yanıtı veriyor ve `python_version` 3.14 gösteriyor.
- [ ] Frontend'deki "Canlı Python Scraper Simülasyon Terminali" sorunsuz çalışıyor.
- [ ] İletişim formu doldurulduğunda backend üzerinden `inquiries_contactinquiry` tablosuna veri güvenle düşüyor.
- [ ] Responsive tasarım ve 60 FPS Lenis/GSAP akıcılığı kontrol edildi.
