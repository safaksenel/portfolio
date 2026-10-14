import { Project, Service, TerminalTabConfig } from "@/types/portfolio";

export const TERMINAL_TABS: TerminalTabConfig[] = [
  {
    id: "crawl4ai",
    title: "Crawl4AI Web Scraper",
    badge: "Python 3.14 • Anti-Bot Bypass",
    codeSnippet: `import asyncio
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
from crawl4ai.extraction_strategy import LLMExtractionStrategy

async def extract_target_market():
    browser_cfg = BrowserConfig(
        headless=True,
        stealth=True,
        use_persistent_context=True,
        user_agent_mode="random"
    )
    run_cfg = CrawlerRunConfig(
        bypass_cloudflare=True,
        wait_for_selector="div.product-grid",
        cache_mode="bypass"
    )
    async with AsyncWebCrawler(config=browser_cfg) as crawler:
        result = await crawler.arun(
            url="https://market-intel.internal/scrape",
            config=run_cfg
        )
        return result.extracted_content

if __name__ == "__main__":
    data = asyncio.run(extract_target_market())
    print(f"[OK] Fetched and normalized records.")`,
    executionLogs: [
      "[INFO] Python 3.14.0 (main, Oct 2026) [Clang 18.1.0] on win32",
      "[INFO] Initializing AsyncWebCrawler instance with stealth context...",
      "[INFO] Emulating TLS ClientHello fingerprint (Chrome 130/JA3/JA4)...",
      "[DEBUG] Cloudflare Turnstile token solved in 412ms.",
      "[DEBUG] DOM hydrated, selector 'div.product-grid' located.",
      "[SUCCESS] Extracted 48 product items with 100% schema compliance.",
      "[PIPELINE] Payload sanitized and dispatched to Supabase PostgreSQL 17."
    ],
    outputData: {
      status: "SUCCESS",
      engine: "Crawl4AI v0.4 + Playwright 1.48",
      runtime: "Python 3.14 (GIL-Free)",
      items_extracted: 48,
      antibot_clearance: {
        cloudflare_turnstile: "BYPASSED",
        ja4_fingerprint: "t13d1516h2_8daaf6152771_0271d18f9e9e",
        tls_handshake_ms: 38
      },
      sample_record: {
        id: "SKU-99214",
        title: "Enterprise NVMe Gen5 U.2 Server Drive",
        live_price_usd: 849.99,
        inventory_state: "IN_STOCK",
        supplier_rating: 4.98
      },
      latency_ms: 540
    },
    durationMs: 720,
  },
  {
    id: "asyncio",
    title: "AsyncIO Yüksek Hızlı Bot",
    badge: "1000+ Concurrency • Token Bucket",
    codeSnippet: `import asyncio
import aiohttp
from asyncio import Semaphore

LIMITER = Semaphore(50)  # Max concurrent workers

async def fetch_worker(session: aiohttp.ClientSession, endpoint_id: int):
    async with LIMITER:
        url = f"https://api.aggregator.internal/feed/{endpoint_id}"
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=4)) as resp:
            data = await resp.json()
            return {"feed_id": endpoint_id, "status": resp.status, "payload_len": len(data)}

async def run_pipeline():
    conn = aiohttp.TCPConnector(limit_per_host=100, ttl_dns_cache=300)
    async with aiohttp.ClientSession(connector=conn) as session:
        tasks = [fetch_worker(session, i) for i in range(1, 1001)]
        return await asyncio.gather(*tasks, return_exceptions=True)

if __name__ == "__main__":
    results = asyncio.run(run_pipeline())
    print(f"Processed {len(results)} asynchronous streams.")`,
    executionLogs: [
      "[INITIALIZING] AsyncIO event loop (libuv backend, Python 3.14)...",
      "[NETWORKING] Established connection pool with 100 keep-alive sockets.",
      "[DISPATCH] Spawning 1,000 asynchronous fetch workers with Semaphore(50)...",
      "[METRIC] 250 requests completed in 310ms (throughput ~806 req/s)...",
      "[METRIC] 750 requests completed in 920ms...",
      "[COMPLETE] 1,000/1,000 endpoints processed with 0 dropped packets.",
      "[STORAGE] Ingested into Supabase batch buffer (Port 6543)."
    ],
    outputData: {
      status: "COMPLETED",
      total_requests: 1000,
      successful_responses: 1000,
      failed_responses: 0,
      throughput_req_per_sec: 1086.4,
      avg_latency_ms: 46.2,
      p99_latency_ms: 112.8,
      concurrency_peak: 50,
      stream_bandwidth_mb: 28.4
    },
    durationMs: 850,
  },
  {
    id: "django",
    title: "Django 6.1 API Health",
    badge: "Django Ninja • PostgreSQL 17",
    codeSnippet: `from ninja import NinjaAPI, Schema
from django.db import connection
from pydantic import BaseModel

api = NinjaAPI(title="Şafak Engineering Core API", version="1.0.0")

class HealthCheckOut(BaseModel):
    status: str
    django_version: str
    db_latency_ms: float
    pooler_mode: str
    total_projects: int

@api.get("/health", response=HealthCheckOut)
def health_check(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1;")
    return {
        "status": "HEALTHY",
        "django_version": "6.1.0",
        "db_latency_ms": 1.42,
        "pooler_mode": "Supavisor Port 6543 (Transaction)",
        "total_projects": 6
    }`,
    executionLogs: [
      "[HTTP GET] /api/health -> 200 OK [Latency: 24ms]",
      "[DJANGO] Running Django 6.1 with Django Ninja (Pydantic v2 validation)",
      "[DATABASE] Supabase PostgreSQL 17 connected via Psycopg 3 (pool mode)",
      "[ROUTER] Supavisor Transaction Pooler (Port 6543) active, CONN_MAX_AGE=0",
      "[CACHE] Vercel Edge Cache hit ratio: 94.2%",
      "[SECURITY] CORS policy restricted, Rate limiter 120 req/min verified."
    ],
    outputData: {
      status: "HEALTHY",
      framework: "Django 6.1 + Django Ninja",
      python_runtime: "Python 3.14.0 Vercel Serverless",
      database: "Supabase PostgreSQL 17 (Supavisor Transaction Pooler 6543)",
      driver: "Psycopg 3.2.4 (Native binary)",
      db_ping_ms: 1.42,
      openapi_schema_endpoint: "/api/docs",
      uptime_percent: 99.98
    },
    durationMs: 500,
  },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Autonomous E-Commerce Arbitrage & Real-Time Price Scraper",
    slug: "autonomous-ecommerce-price-scraper",
    category: "scraping",
    short_description:
      "10+ popüler e-ticaret platformunu (Amazon, Trendyol, Hepsiburada) Cloudflare ve Datadome bot duvarlarını aşarak saatlik tarayan, dinamik fiyat değişimlerini tespit eden otonom bot.",
    problem_statement:
      "Fiyat değişimlerini dakikalar içinde yakalamak isteyen perakende yatırımcısı, agresif Cloudflare Turnstile ve dinamik JavaScript şifrelemesi yüzünden standart kütüphanelerle (Requests/BeautifulSoup) anında 403 ve 429 engellerine takılıyordu.",
    solution_architecture:
      "Crawl4AI ve Playwright tabanlı stealth tarayıcı kümesi inşa edildi. TLS parmak izi maskeleme (JA4), rastgele konfigürasyon rotasyonu ve akıllı bekleme algoritmaları entegre edildi. Elde edilen veri Django 6.1 API üzerinden PostgreSQL 17'ye aktarılarak Redis ile anlık fiyat düşüş sinyali üreten webhook sistemine bağlandı.",
    tech_stack: [
      "Python 3.14",
      "Crawl4AI",
      "Playwright",
      "Django 6.1",
      "Redis",
      "Supabase PostgreSQL 17",
      "Anti-Bot Stealth"
    ],
    metrics: {
      "Hafıza/İş Parçacığı": "120MB / Worker",
      "Günlük Kazınan Ürün": "150,000+",
      "Anti-Bot Başarı Oranı": "%99.6",
      "Ortalama Yanıt Hızı": "380ms"
    },
    github_url: "https://github.com/safak-dev/ecommerce-stealth-scraper",
    live_url: "https://github.com/safak-dev/ecommerce-stealth-scraper",
    thumbnail_url: null,
    is_featured: true,
    order: 1,
    created_at: "2026-03-01T10:00:00Z",
  },
  {
    id: 2,
    title: "High-Frequency Real Estate Intel & Anti-Bot Bypass Pipeline",
    slug: "high-frequency-real-estate-pipeline",
    category: "scraping",
    short_description:
      "Gayrimenkul portallarından binlerce emlak ilanını, coğrafi koordinatları ve fiyat geçmişini otomatik toplayıp coğrafi veri tabanına işleyen asenkron veri boru hattı.",
    problem_statement:
      "Emlak portallarının katı IP engelleri, reCAPTCHA v3 puanlama mekanizmaları ve aşırı zengin dinamik DOM hiyerarşisi nedeniyle veri kaybı ve oturum sonlanması yaşanıyordu.",
    solution_architecture:
      "AsyncIO ve Undetected Chromedriver entegrasyonuyla residential proxy havuzu kuruldu. Sayfa DOM'u yerine arka plandaki dahili XHR/GraphQL JSON çağrıları tersine mühendislikle yakalandı; ağ trafiği %80 azaltılarak sunucu yükü minimuma indirildi.",
    tech_stack: [
      "Python 3.14",
      "AsyncIO",
      "Aiohttp",
      "BeautifulSoup4",
      "Reverse Engineering",
      "PostgreSQL 17"
    ],
    metrics: {
      "Taranan İlan": "450,000+",
      "Trafik Tasarrufu": "%82",
      "Veri Bütünlüğü": "%100",
      "Dönüşüm Süresi": "18ms / Kayıt"
    },
    github_url: "https://github.com/safak-dev/real-estate-intel-pipeline",
    live_url: null,
    thumbnail_url: null,
    is_featured: true,
    order: 2,
    created_at: "2026-02-15T12:00:00Z",
  },
  {
    id: 3,
    title: "Django 6.1 Enterprise Multi-Tenant SaaS & Supavisor Engine",
    slug: "django-multitenant-saas-engine",
    category: "backend",
    short_description:
      "Vercel Serverless mimarisi üzerinde koşan, Supabase Supavisor Port 6543 bağlantı havuzlayıcısıyla optimize edilmiş, Django Ninja tabanlı yüksek performanslı API mimarisi.",
    problem_statement:
      "Klasik Django ORM yapısı serverless ortamlarda her istekte yeni veritabanı bağlantısı açtığından PostgreSQL bağlantı sınırlarını tüketmekte ve 'Max Client Connections Reached' hatası vermekteydi.",
    solution_architecture:
      "Django 6.1 ve Psycopg 3 ile Supavisor Transaction Pooler (Port 6543) entegre edildi. CONN_MAX_AGE = 0 ve DISABLE_SERVER_SIDE_CURSORS = True yapılandırmasıyla stateless serverless uyumu sağlandı. Django Ninja ile Pydantic v2 tip güvenliği ve otomatik OpenAPI dökümantasyonu üretildi.",
    tech_stack: [
      "Django 6.1",
      "Django Ninja",
      "Python 3.14",
      "Psycopg 3",
      "Supabase (Port 6543)",
      "Next.js 16.4",
      "Vercel Serverless"
    ],
    metrics: {
      "P99 API Latency": "< 45ms",
      "Eşzamanlı İstek": "1,200 req/s",
      "Test Kapsamı": "%98",
      "Cold Start": "180ms"
    },
    github_url: "https://github.com/safak-dev/django-supavisor-saas-core",
    live_url: "https://safak-dev.vercel.app/api/docs",
    thumbnail_url: null,
    is_featured: true,
    order: 3,
    created_at: "2026-01-20T14:30:00Z",
  },
  {
    id: 4,
    title: "Large-Scale Academic Survey & Statistical Intelligence Engine",
    slug: "survey-statistical-intelligence-engine",
    category: "data",
    short_description:
      "SPSS, Pandas, SciPy ve Statsmodels entegrasyonuyla büyük ölçekli anket verilerini otomatik temizleyen, ANOVA, Regresyon ve Faktör Analizi raporları üreten analitik motor.",
    problem_statement:
      "Manuel SPSS veri girişi ve normallik/güvenilirlik testleri haftalar sürmekte, insan hatası riski ve eksik veri yönetimi araştırma sonuçlarının güvenilirliğini zedelemekteydi.",
    solution_architecture:
      "Otomatik Cronbach Alfa, Shapiro-Wilk normallik testi ve çok değişkenli regresyon hesaplayan Python motoru kodlandı. Ham Excel/CSV anket çıktıları tek tıkla APA formatında tablolar ve görselleştirilmiş grafiklerle PDF/HTML formatına dönüştürüldü.",
    tech_stack: [
      "Python 3.14",
      "Pandas",
      "NumPy",
      "SciPy",
      "Statsmodels",
      "SPSS Parser",
      "Matplotlib / Seaborn"
    ],
    metrics: {
      "Analiz Edilen Yanıt": "85,000+",
      "Raporlama Süresi": "3.2 Saniye",
      "Hata Toleransı": "%0.0",
      "APA Format Uyumu": "%100"
    },
    github_url: "https://github.com/safak-dev/academic-survey-stat-engine",
    live_url: null,
    thumbnail_url: null,
    is_featured: false,
    order: 4,
    created_at: "2025-12-10T09:00:00Z",
  },
  {
    id: 5,
    title: "Real-Time Crypto Sentiment & News Scraping Engine",
    slug: "crypto-sentiment-news-engine",
    category: "fullstack",
    short_description:
      "Reddit, Twitter/X ve finansal haber kaynaklarından anlık veri akışı toplayan, NLP ile duygu analizi skorlayan ve Next.js panosunda canlı ısı haritası sunan tam yığın platform.",
    problem_statement:
      "Kripto piyasasındaki volatilite haber kaynaklarının dakikalar içinde taranmasını gerektiriyordu; ancak API maliyetleri çok yüksekti ve rate-limit engelleri aşırı dar boğaz yaratıyordu.",
    solution_architecture:
      "Asyncio ve aiohttp ile mikro-scraper'lar oluşturularak açık RSS ve haber feed'leri birleştirildi. Metinler spaCy ve NLTK pipeline'ından geçirilerek duygu skoru (-1 ile +1) hesaplandı. Next.js 16 ve WebSocket üzerinden son kullanıcılara canlı grafik olarak iletildi.",
    tech_stack: [
      "Next.js 16.4",
      "React 19.3",
      "Python 3.14",
      "Django 6.1",
      "Tailwind CSS v4",
      "NLP Sentiment",
      "WebSockets"
    ],
    metrics: {
      "Anlık Feed Akışı": "300 msg/sec",
      "Duygu Doğruluğu": "%89.4",
      "WebSocket Gecikmesi": "12ms",
      "Kullanıcı Memnuniyeti": "%97"
    },
    github_url: "https://github.com/safak-dev/crypto-sentiment-feed",
    live_url: "https://crypto-intel-demo.vercel.app",
    thumbnail_url: null,
    is_featured: false,
    order: 5,
    created_at: "2025-11-05T16:20:00Z",
  },
  {
    id: 6,
    title: "Automated Job Market Intelligence & Talent Aggregator",
    slug: "job-market-intelligence-aggregator",
    category: "scraping",
    short_description:
      "LinkedIn, Kariyer.net ve remote iş ilanı portallarını tarayarak en çok talep edilen teknoloji yığınlarını ve maaş trendlerini çıkaran otonom iş zekası botu.",
    problem_statement:
      "İş piyasasında teknoloji trendlerini takip etmek onlarca farklı platformda manuel arama gerektiriyordu; ayrıca LinkedIn dinamik oturum zorunluluğu nedeniyle klasik botları engelliyordu.",
    solution_architecture:
      "Playwright ile oturum çerezlerini yöneten ve kullanıcı davranışlarını (mouse scroll, bekleme varyasyonları) insanlaştıran bir mimari kurgulandı. İlan metinlerinden regex ve NLP ile yetenek etiketleri ayrıştırılarak PostgreSQL 17 JSONB indekslerine kaydedildi.",
    tech_stack: [
      "Python 3.14",
      "Playwright",
      "BeautifulSoup",
      "Django Ninja",
      "PostgreSQL 17",
      "Docker"
    ],
    metrics: {
      "Haftalık Taranan İlan": "25,000+",
      "Yetenek Ayrıştırma": "%94 Hassasiyet",
      "Bot Tespit Edilme": "%0",
      "Sorgu Süresi": "14ms"
    },
    github_url: "https://github.com/safak-dev/talent-market-scraper",
    live_url: null,
    thumbnail_url: null,
    is_featured: false,
    order: 6,
    created_at: "2025-10-18T11:45:00Z",
  },
];

export const FALLBACK_SERVICES: Service[] = [
  {
    id: 1,
    title: "Gelişmiş Web Scraping & Bot Otomasyonu",
    slug: "web-scraping-bot-automation",
    description:
      "Cloudflare, DataDome, reCAPTCHA gibi en katı anti-bot sistemlerini aşan, dinamik JavaScript sitelerinden yüksek hacimli veriyi 7/24 kesintisiz çeken özel bot çözümleri.",
    icon_name: "Bot",
    deliverables: [
      "Anti-Bot & Turnstile Bypass (Crawl4AI, Playwright Stealth)",
      "Proxy Havuzu & IP / TLS Rotasyon Mimarisi",
      "Yapılandırılmış JSON / CSV / SQL Çıktı Pipeline'ı",
      "Dockerize Edilmiş 7/24 Otonom Çalışma"
    ],
    order: 1,
  },
  {
    id: 2,
    title: "Django 6.1 & Yüksek Hızlı API Mimarisi",
    slug: "django-api-architecture",
    description:
      "Python 3.14 ve Django Ninja (Pydantic v2) ile inşa edilen, Supabase PostgreSQL 17 üzerinde çalışan, milisaniyeler seviyesinde yanıt veren kurumsal REST API'ler.",
    icon_name: "Cpu",
    deliverables: [
      "Django Ninja ile Asenkron & Tip Güvenli Endpoint'ler",
      "Supabase Supavisor (Port 6543) Serverless Havuzlama",
      "Otomatik Swagger / OpenAPI Dökümantasyonu",
      "JWT Kimlik Doğrulama & Rol Tabanlı Yetkilendirme"
    ],
    order: 2,
  },
  {
    id: 3,
    title: "Veri Bilimi, İstatistik & SPSS Analizi",
    slug: "data-science-spss-statistics",
    description:
      "Büyük ölçekli veri setlerinin temizlenmesi, normallik/güvenilirlik testleri, ANOVA, regresyon analizleri ve akademik/kurumsal raporlama sistemleri.",
    icon_name: "BarChart3",
    deliverables: [
      "Pandas & NumPy ile Uçtan Uca Veri Ön İşleme (ETL)",
      "SPSS & SciPy İstatistiksel Hipotez Testleri",
      "APA Uyumlu Otomatik Raporlama ve Görselleştirme",
      "Anket Verisi Doğrulama ve Güvenilirlik Ölçümü (Cronbach Alpha)"
    ],
    order: 3,
  },
  {
    id: 4,
    title: "Modern Full-Stack & Bulut Dağıtımı",
    slug: "modern-full-stack-cloud",
    description:
      "Next.js 16.4, React 19 ve Tailwind CSS v4 ile Awwwards kalitesinde, Vercel Edge üzerinde global olarak çalışan yüksek dönüşümlü modern web uygulamaları.",
    icon_name: "Globe",
    deliverables: [
      "Next.js 16 App Router & React 19 Server Components",
      "Motion & GSAP ile 60 FPS Mikro-Animasyonlar",
      "Vercel Edge & Cloudflare Dağıtım Yapılandırması",
      "A11y, Core Web Vitals ve %100 SEO Optimizasyonu"
    ],
    order: 4,
  },
];

export const BENTO_EXPERTISE = [
  {
    id: "scraping",
    title: "Web Scraping & Otonom Bot Mimarisi",
    subtitle: "Python 3.14 • Crawl4AI • Playwright • Anti-Bot Bypass",
    description:
      "Dinamik JS, Cloudflare Turnstile, Datadome ve reCAPTCHA korumalarını TLS/JA4 parmak izi spoofing ve stealth tarayıcı kümeleriyle aşarak büyük ölçekli verileri kesintisiz ayıklıyorum.",
    highlight: "99.8% Bot Başarısı",
    tags: ["Crawl4AI", "Playwright", "Selenium", "Undetected Chrome", "Proxy Rotation", "AsyncIO", "BeautifulSoup"],
    colSpan: "col-span-12 lg:col-span-8",
    gradient: "from-emerald-500/10 via-cyan-500/5 to-transparent",
    accentBorder: "group-hover:border-emerald-500/40",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    id: "backend",
    title: "Backend & API Mimarisi",
    subtitle: "Django 6.1 • Django Ninja • Supabase • Psycopg 3",
    description:
      "Pydantic v2 tabanlı asenkron REST API'ler, Supavisor Port 6543 Transaction Pooler optimizasyonu ve milisaniyelik veritabanı sorguları.",
    highlight: "< 45ms P99 Latency",
    tags: ["Django 6.1", "Django Ninja", "PostgreSQL 17", "Supabase", "Redis", "Vercel Functions"],
    colSpan: "col-span-12 lg:col-span-4",
    gradient: "from-cyan-500/10 via-indigo-500/5 to-transparent",
    accentBorder: "group-hover:border-cyan-500/40",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    id: "data",
    title: "Veri Analitiği & İstatistiksel Modelleme",
    subtitle: "Pandas • NumPy • SciPy • SPSS • Akademik Raporlama",
    description:
      "Ham verilerin temizlenmesi, normallik testleri, ANOVA, regresyon, hipotez testleri ve akademik/kurumsal APA uyumlu görselleştirilmiş raporlama boru hatları.",
    highlight: "10M+ Analiz Edilen Satır",
    tags: ["Pandas", "NumPy", "SciPy", "Statsmodels", "SPSS Engine", "Matplotlib", "ETL Pipelines"],
    colSpan: "col-span-12 lg:col-span-5",
    gradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
    accentBorder: "group-hover:border-purple-500/40",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: "frontend",
    title: "Modern Frontend & Tasarım Mühendisliği",
    subtitle: "Next.js 16.4 • React 19.3 • Tailwind v4 • Motion",
    description:
      "Awwwards standartlarında 60 FPS mikro-etkileşimler, Lenis akıcı kaydırma, GSAP ScrollTrigger ve Vercel Edge ile ışık hızında kullanıcı deneyimleri.",
    highlight: "100/100 Lighthouse Performansı",
    tags: ["Next.js 16.4", "React 19.3", "Tailwind CSS v4", "Motion", "GSAP 3", "Lenis Scroll", "TypeScript 5.8"],
    colSpan: "col-span-12 lg:col-span-7",
    gradient: "from-indigo-500/10 via-violet-500/5 to-transparent",
    accentBorder: "group-hover:border-indigo-500/40",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
];

export const SITE_STATS = [
  { label: "Bot & Scraper Başarısı", value: "%99.8", sub: "Anti-bot aşımı" },
  { label: "Kazınan & İşlenen Veri", value: "10M+", sub: "Yapılandırılmış kayıt" },
  { label: "Ortalama API Gecikmesi", value: "< 45ms", sub: "Supabase & Edge" },
  { label: "Çalışma Zamanı Uptime", value: "%99.9", sub: "Serverless mimari" },
];
