"""
Django settings for core project.
Optimized for Python 3.14, Django 6.1, Supabase PostgreSQL 17 (Supavisor Pooler Port 6543),
and Vercel Serverless Functions.
"""

from pathlib import Path
import os
from urllib.parse import urlparse, unquote
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env file if available
load_dotenv(BASE_DIR / ".env")

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/6.1/howto/deployment/checklist/

SECRET_KEY = os.getenv(
    "DJANGO_SECRET_KEY",
    "django-insecure-314-portfolio-core-architecture-key-change-in-prod"
)

DEBUG = os.getenv("DJANGO_DEBUG", "True").lower() in ("true", "1", "yes")

# Allowed Hosts
ALLOWED_HOSTS = ["*"]
allowed_hosts_env = os.getenv("DJANGO_ALLOWED_HOSTS")
if allowed_hosts_env:
    ALLOWED_HOSTS = [h.strip() for h in allowed_hosts_env.split(",") if h.strip()]
    if "testserver" not in ALLOWED_HOSTS:
        ALLOWED_HOSTS.append("testserver")

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "whitenoise.runserver_nostatic",
    "django.contrib.staticfiles",
    # Third-party
    "corsheaders",
    "ninja",
    # Local Apps
    "portfolio.apps.PortfolioConfig",
    "inquiries.apps.InquiriesConfig",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"
ASGI_APPLICATION = "core.asgi.application"

# Database Configuration
# Supabase PostgreSQL 17 (Supavisor Transaction Pooler Port 6543)
# Rule: CONN_MAX_AGE = 0 for serverless; DISABLE_SERVER_SIDE_CURSORS = True for Supavisor Port 6543.
DATABASE_URL = os.getenv("DATABASE_URL", "").strip()

if DATABASE_URL:
    url = urlparse(DATABASE_URL)
    db_engine = "django.db.backends.postgresql"
    
    # Extract port or default to 6543 for Supabase Transaction Pooler
    db_port = url.port or 6543
    db_name = url.path.lstrip("/") or "postgres"
    db_user = unquote(url.username or "postgres")
    db_password = unquote(url.password or "")
    db_host = url.hostname or "localhost"

    DATABASES = {
        "default": {
            "ENGINE": db_engine,
            "NAME": db_name,
            "USER": db_user,
            "PASSWORD": db_password,
            "HOST": db_host,
            "PORT": str(db_port),
            # Serverless & Transaction Pooler configuration
            "CONN_MAX_AGE": 0,
            "DISABLE_SERVER_SIDE_CURSORS": True,
            "OPTIONS": {
                "sslmode": "require",
            },
        }
    }
else:
    # Graceful fallback to SQLite for local development or when Supabase credentials are pending
    # On Vercel Serverless, root is read-only, while /tmp is writable
    sqlite_path = Path("/tmp/db.sqlite3") if os.getenv("VERCEL") else (BASE_DIR / "db.sqlite3")
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": sqlite_path,
        }
    }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}
WHITENOISE_MANIFEST_STRICT = False

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# CORS Configuration
CORS_ALLOW_ALL_ORIGINS = False
cors_origins_env = os.getenv(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001"
)
CORS_ALLOWED_ORIGINS = [
    origin.strip() for origin in cors_origins_env.split(",") if origin.strip()
]
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https:\/\/.*\.vercel\.app$",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]
