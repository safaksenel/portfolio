"""
Django Ninja REST API Configuration.
Provides asynchronous, Pydantic-validated endpoints for portfolio, services, inquiries, and health checks.
Auto-generates OpenAPI / Swagger UI documentation at /api/docs.
"""

import sys
import django
from datetime import datetime, timezone
from typing import List, Optional
from django.conf import settings
from django.db import connection
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async
from ninja import NinjaAPI, Schema
from ninja.errors import HttpError

from portfolio.models import Project, Service, ProjectCategory
from portfolio.schemas import ProjectListItemOut, ProjectDetailOut, ServiceOut
from inquiries.models import ContactInquiry
from inquiries.schemas import ContactInquiryIn, ContactInquiryResponse


class HealthCheckOut(Schema):
    status: str
    python_version: str
    django_version: str
    database_engine: str
    database_status: str
    serverless_mode: bool
    timestamp: str


# Initialize Django Ninja API
api = NinjaAPI(
    title="Ahmet Şafak Şenel Portfolio API",
    version="1.0.0",
    description="High-performance Serverless API built with Python 3.14 & Django 6.1 for Web Scraping, AI & Full-Stack Portfolio.",
    docs_url="/docs",
    urls_namespace="portfolio_api",
)


# ==========================================
# 1. HEALTH CHECK ENDPOINT
# ==========================================
@api.get("/health", response=HealthCheckOut, tags=["System"], summary="Sistem Sağlık ve Sürüm Kontrolü")
async def health_check(request):
    """
    Python 3.14 çalışma zamanı, Django 6.1 ve veritabanı bağlantı durumunu doğrular.
    """
    def check_database():
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1;")
                cursor.fetchone()
            return "connected"
        except Exception as exc:
            return f"degraded: {exc}"

    db_status = await sync_to_async(check_database)()
    db_engine = settings.DATABASES["default"]["ENGINE"].split(".")[-1]
    is_serverless = getattr(settings, "CONN_MAX_AGE", 1) == 0

    return {
        "status": "healthy" if "connected" in db_status else "degraded",
        "python_version": f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}",
        "django_version": django.get_version(),
        "database_engine": db_engine,
        "database_status": db_status,
        "serverless_mode": is_serverless,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


# ==========================================
# 2. PROJECTS ENDPOINTS
# ==========================================
@api.get(
    "/projects",
    response=List[ProjectListItemOut],
    tags=["Projects"],
    summary="Projeler Listesi (Kategori ve Öne Çıkan Filtreli)",
)
async def list_projects(
    request,
    category: Optional[str] = None,
    featured: Optional[bool] = None,
):
    """
    Tüm projeleri veya kategoriye (?category=scraping) / öne çıkanlara (?featured=true) göre listeler.
    """
    def query_projects():
        qs = Project.objects.all().order_by("order", "-created_at")
        if category:
            qs = qs.filter(category=category.lower())
        if featured is not None:
            qs = qs.filter(is_featured=featured)
        return list(qs)

    projects = await sync_to_async(query_projects)()
    return projects


@api.get(
    "/projects/{slug}",
    response=ProjectDetailOut,
    tags=["Projects"],
    summary="Tekil Proje Mimarisi ve Detayları",
)
async def get_project_detail(request, slug: str):
    """
    Slug değerine göre proje mimarisi, problem tanımı ve teknoloji yığınını döndürür.
    """
    def query_single_project():
        try:
            return Project.objects.get(slug=slug)
        except Project.DoesNotExist:
            return None

    project = await sync_to_async(query_single_project)()
    if not project:
        raise HttpError(404, f"Slug '{slug}' ile eşleşen proje bulunamadı.")
    return project


# ==========================================
# 3. SERVICES ENDPOINT
# ==========================================
@api.get(
    "/services",
    response=List[ServiceOut],
    tags=["Services"],
    summary="Mühendislik ve Otomasyon Hizmetleri Listesi",
)
async def list_services(request):
    """
    Sunulan web scraping, backend mimarisi, NLP/AI ve otomasyon hizmetlerini listeler.
    """
    def query_services():
        return list(Service.objects.all().order_by("order"))

    services = await sync_to_async(query_services)()
    return services


# ==========================================
# 4. CONTACT / INQUIRY ENDPOINT (WITH HONEYPOT)
# ==========================================
@api.post(
    "/contact",
    response=ContactInquiryResponse,
    tags=["Inquiries"],
    summary="İletişim ve Proje Teklif Formu Gönderimi",
)
async def submit_contact_inquiry(request, payload: ContactInquiryIn):
    """
    Kullanıcı veya müşterilerden gelen teklif taleplerini doğrular ve kaydeder.
    Honeypot bot koruması: 'honeypot' alanı doldurulmuşsa spam botu olduğu anlaşılarak veritabanına kaydedilmeden başarılı yanıt dönülür.
    """
    # 1. Honeypot check for spam bots
    if payload.honeypot and payload.honeypot.strip():
        # Silently absorb bot submissions
        return {
            "success": True,
            "message": "Talebiniz başarıyla alındı. Teşekkür ederiz.",
        }

    # 2. Asynchronous creation in database
    def create_inquiry():
        return ContactInquiry.objects.create(
            full_name=payload.full_name.strip(),
            email=str(payload.email).strip().lower(),
            service_type=payload.service_type.strip(),
            budget_range=payload.budget_range.strip(),
            message=payload.message.strip(),
        )

    await sync_to_async(create_inquiry)()

    return {
        "success": True,
        "message": "Mesajınız başarıyla iletildi. En kısa sürede geri dönüş yapılacaktır.",
    }
