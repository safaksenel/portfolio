from django.db import models


class ProjectCategory(models.TextChoices):
    SCRAPING = "scraping", "Web Scraping & Otomasyon"
    BACKEND = "backend", "Backend & API Mimarisi"
    DATA = "data", "Veri Bilimi & NLP"
    FULLSTACK = "fullstack", "Full-Stack Web"


class Project(models.Model):
    """
    Represents an engineering, scraping, or machine learning project in the portfolio.
    """
    title = models.CharField(max_length=200, help_text="Proje Başlığı")
    slug = models.SlugField(max_length=220, unique=True, db_index=True, help_text="URL Slug")
    category = models.CharField(
        max_length=50,
        choices=ProjectCategory.choices,
        default=ProjectCategory.SCRAPING,
        db_index=True,
        help_text="Proje Kategorisi",
    )
    short_description = models.CharField(
        max_length=350,
        help_text="Kartlarda ve özet alanlarında gösterilecek kısa açıklama",
    )
    problem_statement = models.TextField(
        help_text="Projenin çözdüğü problem ve iş gereksinimi",
    )
    solution_architecture = models.TextField(
        help_text="Uygulanan mimari yaklaşım, algoritmalar ve teknik detaylar",
    )
    tech_stack = models.JSONField(
        default=list,
        help_text="Kullanılan teknolojiler listesi (Örn: ['Python 3.14', 'Crawl4AI', 'FastAPI'])",
    )
    metrics = models.JSONField(
        default=dict,
        blank=True,
        help_text="Ölçülebilir başarı metrikleri (Örn: {'throughput': '1200 req/min', 'accuracy': '0.89'})",
    )
    github_url = models.URLField(
        blank=True,
        null=True,
        help_text="GitHub repository adresi",
    )
    live_url = models.URLField(
        blank=True,
        null=True,
        help_text="Canlı demo / üretim adresi",
    )
    thumbnail_url = models.URLField(
        blank=True,
        null=True,
        help_text="Görsel veya Supabase Storage CDN URL",
    )
    is_featured = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Hero / Ana sayfada öne çıkarılsın mı?",
    )
    order = models.PositiveIntegerField(
        default=0,
        db_index=True,
        help_text="Görüntülenme sıralaması (küçükten büyüğe)",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Kayıt oluşturulma tarihi",
    )

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self) -> str:
        return f"{self.title} ({self.get_category_display()})"


class Service(models.Model):
    """
    Represents an engineering service or solution offering.
    """
    title = models.CharField(max_length=200, help_text="Hizmet Başlığı")
    slug = models.SlugField(max_length=220, unique=True, db_index=True, help_text="URL Slug")
    description = models.TextField(help_text="Hizmet açıklaması ve kapsamı")
    icon_name = models.CharField(
        max_length=100,
        default="Terminal",
        help_text="Frontend Lucide ikon adı (örn: Bot, Cpu, Database, Terminal, Zap)",
    )
    deliverables = models.JSONField(
        default=list,
        help_text="Müşteriye sunulacak somut çıktılar listesi",
    )
    order = models.PositiveIntegerField(
        default=0,
        db_index=True,
        help_text="Görüntülenme sıralaması",
    )

    class Meta:
        ordering = ["order", "title"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self) -> str:
        return self.title
