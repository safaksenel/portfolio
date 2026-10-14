import { Project, Service, TerminalTabConfig } from "@/types/portfolio";

export const TERMINAL_TABS: TerminalTabConfig[] = [
  {
    id: "bert_nlp",
    title: "FLO BERT NLP (22 Modeller)",
    badge: "PyTorch • OpenVINO • F1: 0.892",
    codeSnippet: `from transformers import AutoTokenizer
import openvino as ov
import numpy as np

# FLO Group 2-Kademeli 22 Türkçe BERT Mimarisi
core = ov.Core()
model_ir = core.read_model("models/flo_bert_tier2_openvino.xml")
compiled_model = core.compile_model(model_ir, "CPU")
tokenizer = AutoTokenizer.from_pretrained("dbmdz/bert-base-turkish-cased")

def classify_customer_feedback(text: str):
    tokens = tokenizer(text, padding=True, truncation=True, max_length=128, return_tensors="np")
    logits = compiled_model(dict(tokens))[0]
    pred_idx = np.argmax(logits, axis=-1)
    confidence = float(np.max(softmax(logits)))
    return {
        "root_cause": CATEGORIES[pred_idx],
        "confidence": round(confidence, 4),
        "latency_ms": 14.2
    }

if __name__ == "__main__":
    sample = "Siparişim 5 gün gecikti, kargo paketlemesi hasarlıydı."
    result = classify_customer_feedback(sample)
    print(f"[PREDICTION] {result['root_cause']} ({result['confidence']*100:.1f}%)")`,
    executionLogs: [
      "[INFERENCE] Gelen müşteri yorumu: 'Siparişim 5 gün gecikti, kargo paketlemesi hasarlıydı.'",
      "[TOKENIZER] Türkçe BERT WordPiece sözlüğü ile 18 token ayrıştırıldı.",
      "[OPENVINO] INT8 optimize edilmiş model CPU'da yürütülüyor (AVX-512 aktif)...",
      "[TIER-1 MODEL] Ana kök neden: 'Lojistik & Teslimat' (Güven: 0.984)",
      "[TIER-2 MODEL] Alt kategori: 'Hasarlı Paket & Gecikme' (Güven: 0.941)",
      "[SHAP] En etkili öznitelikler: ['gecikti', 'kargo', 'hasarlı', 'paketleme']",
      "[METRICS] Çıkarım süresi: 14.2ms (%80 hız artışı) | F1 Skoru: 0.892",
      "[DATABASE] Sınıflandırma sonucu Supabase PostgreSQL 17'ye kaydedildi."
    ],
    outputData: {
      status: "CLASSIFIED",
      root_cause: "Lojistik & Teslimat",
      sub_category: "Hasarlı Paket & Gecikme",
      confidence: 0.984,
      model_architecture: "İki Kademeli 22 Türkçe BERT Modeli",
      inference_engine: "Intel OpenVINO 2026 (CPU Optimizasyonu)",
      cpu_latency_ms: 14.2,
      f1_score: 0.892,
      monthly_volume: "10,000+ Müşteri Yorumu",
      operational_time_saved: "85%"
    },
    durationMs: 700,
  },
  {
    id: "datathon_ml",
    title: "Datathon Stacking ML (Optuna)",
    badge: "LightGBM • CatBoost • Optuna",
    codeSnippet: `from sklearn.ensemble import StackingRegressor
from lightgbm import LGBMRegressor
from catboost import CatBoostRegressor
from xgboost import XGBRegressor
from sklearn.linear_model import RidgeCV
import optuna

# 56.000 Satırlık Regresyon & 5-Fold OOF CV
estimators = [
    ('lgb', LGBMRegressor(**best_lgb_params, random_state=42)),
    ('cat', CatBoostRegressor(**best_cat_params, verbose=0, random_state=42)),
    ('xgb', XGBRegressor(**best_xgb_params, random_state=42))
]

stacking_model = StackingRegressor(
    estimators=estimators,
    final_estimator=RidgeCV(alphas=[0.01, 0.1, 1.0, 10.0]),
    cv=5,
    n_jobs=-1
)
stacking_model.fit(X_train_oof, y_train)
test_preds = stacking_model.predict(X_test)`,
    executionLogs: [
      "[DATASET] 56.000 satırlık kognitif performans veri kümesi yüklendi.",
      "[FEATURE ENG] 38 etkileşimli öznitelik türetildi, OOF target encoding uygulandı.",
      "[OPTUNA] 100 iterasyonluk Bayesian hiperparametre optimizasyonu tamamlandı.",
      "[5-FOLD CV] LightGBM RMSE: 0.148 | CatBoost RMSE: 0.145 | XGBoost RMSE: 0.149",
      "[STACKING] RidgeCV meta-model ağırlıkları: CatBoost=0.48, LightGBM=0.34, XGB=0.18",
      "[PSEUDO-LABEL] Yüksek güvenli test tahminleriyle model genelleştirmesi artırıldı.",
      "[SONUÇ] Nihai Doğrulama RMSE: 0.1418 — 5-Fold Stacking Regresyon Başarıyla Tamamlandı!"
    ],
    outputData: {
      competition: "YZTA 5.0 Datathon 2026",
      standing: "0.1418 RMSE (56K Satır)",
      ensemble_architecture: "5-Fold Stacking (LGBM + CatBoost + XGBoost + RidgeCV)",
      dataset_rows: 56000,
      engineered_features: 38,
      hyperparameter_tuning: "Optuna Bayesian (100 Trials)",
      cv_rmse: 0.1418,
      validation_strategy: "5-Fold Out-Of-Fold (OOF) Target Encoding"
    },
    durationMs: 750,
  },
  {
    id: "copilot_duckdb",
    title: "Agentic Copilot & DuckDB OLAP",
    badge: "LangGraph • DuckDB • 3.4ms",
    codeSnippet: `from langgraph.graph import StateGraph
import duckdb
import ast

# 500.000 Satırlık Bellek-İçi DuckDB OLAP Analitiği
con = duckdb.connect(database=':memory:')
con.execute("CREATE TABLE analytics AS SELECT * FROM read_parquet('data/telecom_500k.parquet')")

def run_agentic_pipeline(user_query: str):
    # LangGraph: Router -> SQL Synthesizer -> DuckDB -> AST Verifier -> Explainer
    graph = build_copilot_state_graph(con)
    state = graph.invoke({"query": user_query})
    return state["insights"]

if __name__ == "__main__":
    result = run_agentic_pipeline("Son çeyrek müşteri kaybı (churn) ve ARPU korelasyonu nedir?")
    print(result)`,
    executionLogs: [
      "[ROUTER] Doğal dil sorgusu alındı: 'Müşteri kaybı ve ARPU korelasyonu'",
      "[SQL SYNTHESIZER] 18ms içinde vektör hızlandırmalı DuckDB OLAP SQL üretildi.",
      "[DUCKDB ENGINE] 500.000 satır 3.42ms içinde tarandı (Sıfır disk G/Ç süresi).",
      "[AST SANDBOX] Python görselleştirme kodu AST ile denetlendi (Güvenli doğrulandı).",
      "[EXPLAINER AGENT] İstatistiksel anlamlılık (p < 0.001) ile korelasyon raporlandı.",
      "[STREAM] Canlı telemetri ve analitik grafiği FastAPI WebSocket üzerinden iletildi."
    ],
    outputData: {
      status: "COMPLETED",
      runtime: "Python 3.14 + LangGraph",
      olap_engine: "DuckDB In-Memory (Columnar)",
      scanned_rows: 500000,
      query_latency_ms: 3.42,
      security_sandbox: "Python AST NodeVisitor (Güvenli)",
      correlation: -0.684,
      statistical_significance: "p < 0.001",
      self_healing_retries: 0
    },
    durationMs: 650,
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
    github_url: "https://github.com/safaksenel/ecommerce-stealth-scraper",
    live_url: "https://github.com/safaksenel/ecommerce-stealth-scraper",
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
    github_url: "https://github.com/safaksenel/real-estate-intel-pipeline",
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
    github_url: "https://github.com/safaksenel/django-supavisor-saas-core",
    live_url: "https://safaksenel.vercel.app/api/docs",
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
    github_url: "https://github.com/safaksenel/academic-survey-stat-engine",
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
    github_url: "https://github.com/safaksenel/crypto-sentiment-feed",
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
    github_url: "https://github.com/safaksenel/talent-market-scraper",
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
