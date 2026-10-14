# 🔌 Supabase PostgreSQL 17 + Django 6.1 Serverless Connection Guide

Bu kılavuz, Django 6.1 (Python 3.14) backend uygulamasının Vercel Serverless Function ortamında Supabase PostgreSQL 17 veritabanına **Supavisor / PgBouncer Transaction Pooler (Port 6543)** üzerinden nasıl bağlanması gerektiğini açıklar.

---

## ⚡ 1. Neden Transaction Pooler (Port 6543)?

Vercel her API isteği geldiğinde yeni bir serverless container başlatabilir veya mevcut olanı dondurabilir. Standart PostgreSQL oturum modu (Port `5432`) kullanıldığında:
- Her serverless container kalıcı bir bağlantı açmaya çalışır.
- Supabase'in maksimum bağlantı limiti (örn. 60-100 bağlantı) ani trafik dalgalanmalarında hızla tükenir (`FATAL: remaining connection slots are reserved`).
- **Supavisor Transaction Pooler (Port 6543)** ise sadece SQL sorgusu çalışırken bağlantıyı ödünç alır ve sorgu biter bitmez anında havuza iade eder. Böylece binlerce eşzamanlı serverless fonksiyon tek bir veritabanını paylaşabilir.

---

## ⚙️ 2. Django `settings.py` Konfigürasyonu (Psycopg 3 & Serverless)

Backend mimarınız (`backend-django-expert`), `core/settings.py` dosyasındaki veritabanı ayarlarını aşağıdaki gibi yapılandırmalıdır:

```python
import os
import dj_database_url
from pathlib import Path

# BASE_DIR = ...

# Veritabanı URL'si (.env'den okunur)
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    # Lokal fallback veya SQLite testi:
    "sqlite:///db.sqlite3"
)

if DATABASE_URL.startswith("sqlite"):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    # Supabase PostgreSQL 17 + Psycopg 3 (django.db.backends.postgresql)
    DATABASES = {
        "default": dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=0,  # ⚠️ SERVERLESS İÇİN ŞART: İstek bitince bağlantı serbest kalır
            ssl_require=True,
            engine="django.db.backends.postgresql",  # Psycopg 3 sürücüsü
        )
    }

    # ⚠️ KRİTİK: Supavisor / PgBouncer Transaction Modu Ayarları
    # Transaction modunda server-side named cursor'lar transaction sınırlarını aşamaz.
    # Django'nun sunucu taraflı cursor kullanımını devre dışı bırakıyoruz:
    DATABASES["default"]["DISABLE_SERVER_SIDE_CURSORS"] = True

    # SSL Güvenlik Zorunluluğu
    if "OPTIONS" not in DATABASES["default"]:
        DATABASES["default"]["OPTIONS"] = {}
    DATABASES["default"]["OPTIONS"]["sslmode"] = "require"
```

---

## 🛠️ 3. Migration (Veritabanı Göçleri) ve Port Farkı

- **Canlı Çalışma Zamanı (Runtime API):** Port `6543` kullanılır (`DATABASE_URL`).
- **Migration & DDL İşlemleri:** Supabase Transaction Pooler çoğu DDL (`CREATE TABLE`, `ALTER TABLE`) işlemini destekler. Ancak karmaşık lock gerektiren migration'larda doğrudan Port `5432` (`DIRECT_URL`) kullanılabilir:
  ```bash
  # Yerel geliştirme ortamından Supabase'e migration çalıştırmak için:
  DATABASE_URL="postgresql://postgres.[REF]:[PASS]@aws-0-[REGION].pooler.supabase.com:5432/postgres?sslmode=require" python manage.py migrate
  ```

---

## 🛡️ 4. Psycopg 3 Doğrulaması

Python 3.14 ile `psycopg2` uyumsuzluk çıkarabileceğinden, `requirements.txt` ve `pyproject.toml` içerisinde **`psycopg[binary,pool]>=3.2.0`** tanımlanmıştır. Django 6.1 ve Django 5.2, `django.db.backends.postgresql` motoru altında otomatik olarak Psycopg 3'ü algılar ve kullanır.
