"""
Django Management Command: seed_portfolio
Populates the database with real, production-grade projects and engineering services
tailored to Ahmet Şafak Şenel's experience in Python 3.14, Web Scraping, AI/NLP, and Automation.
"""

from django.core.management.base import BaseCommand
from portfolio.models import Project, Service, ProjectCategory


class Command(BaseCommand):
    help = "Populate database with initial portfolio projects and engineering services."

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Starting portfolio database seeding..."))

        # ----------------------------------------------------
        # 1. SEED SERVICES
        # ----------------------------------------------------
        services_data = [
            {
                "title": "Web Scraping & Akıllı Veri Çıkarma Hatları",
                "slug": "web-scraping-automation",
                "description": "Cloudflare, Turnstile ve Akamai korumalarını aşabilen, asenkron Playwright, Crawl4AI ve Python 3.14 tabanlı yüksek verimli, engelsiz veri toplama mimarileri.",
                "icon_name": "Terminal",
                "order": 1,
                "deliverables": [
                    "WAF & Bot Koruması Atlatma Çözümleri (Cloudflare/Turnstile)",
                    "Playwright & Crawl4AI Headless Tarayıcı Havuzları",
                    "Doğrulanmış ve Yapılandırılmış JSON / Supabase Veri Hatları",
                    "Akıllı Proxy ve Dinamik User-Agent / TLS Parmak İzi Rotasyonu",
                    "Otomatik Hata Yakalama, Yeniden Deneme ve Alerting Sistemleri",
                ],
            },
            {
                "title": "Yüksek Performanslı Python Backend & API Mimarisi",
                "slug": "high-performance-backend",
                "description": "Python 3.14 ve Django 6.1 / Django Ninja / FastAPI ile asenkron, tip güvenli (Pydantic v2), mikrosaniye yanıt sürelerine sahip ve serverless uyumlu API servisleri.",
                "icon_name": "Cpu",
                "order": 2,
                "deliverables": [
                    "Django Ninja & FastAPI Asenkron RESTful Uç Noktaları",
                    "Supabase PostgreSQL 17 & Connection Pooling (Supavisor) Entegrasyonu",
                    "Otomatik OpenAPI / Swagger Dokümantasyonu (/api/docs)",
                    "JWT / API Key Kimlik Doğrulama ve Rate-Limiting Koruması",
                    "Vercel Serverless ve Docker Container Dağıtım Desteği",
                ],
            },
            {
                "title": "Uygulamalı Yapay Zeka, NLP & Tahminleme Modelleri",
                "slug": "machine-learning-nlp",
                "description": "BERT tabanlı metin sınıflandırma, LLM destekli veri zenginleştirme, LightGBM/CatBoost ensemble tahmin sistemleri ve OpenVINO ile model çıkarım hızlandırma.",
                "icon_name": "Database",
                "order": 3,
                "deliverables": [
                    "Özel Türkçe/İngilizce BERT Metin Sınıflandırma ve NLP Çözümleri",
                    "OpenVINO ile CPU/GPU Çıkarım (Inference) Hızlandırma (%80+ Hız Artışı)",
                    "Optuna Destekli Bayesian Hiperparametre ve Stacking Ensemble Modelleri",
                    "SHAP Tabanlı Açıklanabilir Yapay Zeka (XAI) Raporlamaları",
                    "Modelin Masaüstü (.exe) veya API Olarak Ürüne Dönüştürülmesi",
                ],
            },
            {
                "title": "Süreç Otomasyonu & Entegrasyon Botları",
                "slug": "process-automation-bots",
                "description": "Tekrarlayan iş süreçlerini sıfıra indiren dosya sistemi daemon'ları, operasyonel Slack/Discord botları, webhook otomasyonları ve görev zamanlayıcılar.",
                "icon_name": "Zap",
                "order": 4,
                "deliverables": [
                    "Watchdog Tabanlı Gerçek Zamanlı Dosya Sistemi İzleyicileri",
                    "Operasyonel Slack / Discord Chatbotları (Günlük 50+ Otomatik Yanıt)",
                    "PyInstaller ile Bağımlılıksız Taşınabilir (.exe) Dağıtımlar",
                    "Excel, CSV ve Raporlama Süreçlerinin Uçtan Uca Otomasyonu",
                    "Gerçek Zamanlı Webhook Dinleyicileri ve Kuyruk Yönetimi",
                ],
            },
        ]

        for s_data in services_data:
            service, created = Service.objects.update_or_create(
                slug=s_data["slug"],
                defaults=s_data,
            )
            status_text = "Created" if created else "Updated"
            self.stdout.write(f"  [Service] {status_text}: {service.title}")

        # ----------------------------------------------------
        # 2. SEED PROJECTS
        # ----------------------------------------------------
        projects_data = [
            {
                "title": "Agentic Copilot: Çok Ajanlı Veri Bilimi & Güvenli Kod Yürütme Motoru",
                "slug": "agentic-datascience-copilot",
                "category": ProjectCategory.DATA,
                "short_description": "LangGraph durum grafiği, DuckDB bellek-içi OLAP motoru, AST-doğrulamalı güvenli Python çalıştırma ortamı ve kendi kendini onaran yansıma döngüleriyle çalışan otonom veri analisti.",
                "problem_statement": (
                    "Büyük kurumsal veri kümelerinde iş zekası sorgularını doğal dilden SQL'e çevirmek, güvenli Python kodu "
                    "koşturmak ve syntax/runtime hatalarını insan müdahalesi olmadan gidermek karmaşık bir mimari gerektiriyordu."
                ),
                "solution_architecture": (
                    "LangGraph ile Query Router, SQL Generator, DuckDB Executor, AST Kod Doğrulayıcı ve Explainer ajanları kurgulandı. "
                    "DuckDB ile sıfır disk G/Ç süresi yakalandı; AST ziyaretçisiyle tehlikeli sistem çağrıları engellendi; "
                    "hata durumunda yansıma döngüsüyle kod otomatik düzeltildi. FastAPI REST API ve Swagger UI ile sunuldu."
                ),
                "tech_stack": [
                    "Python 3.14",
                    "LangGraph",
                    "DuckDB OLAP",
                    "FastAPI",
                    "Python AST Sandbox",
                    "Pydantic v2",
                    "Streamlit",
                    "Docker Compose",
                    "Pytest",
                ],
                "metrics": {
                    "latency": "3.42ms DuckDB OLAP",
                    "security": "AST Safe Sandbox",
                    "resilience": "Self-Healing Reflection",
                    "architecture": "LangGraph Multi-Agent",
                },
                "github_url": "https://github.com/safaksenel/agentic-datascience-copilot",
                "live_url": "https://github.com/safaksenel/agentic-datascience-copilot",
                "thumbnail_url": "/projects/agentic-copilot-swagger.png",
                "is_featured": True,
                "order": 1,
            },
            {
                "title": "Edge Vision Analytics: Gerçek Zamanlı Computer Vision & Video Analitik Hattı",
                "slug": "edge-vision-analytics-pipeline",
                "category": ProjectCategory.DATA,
                "short_description": "ByteTRACK 2-aşamalı IoU nesne takibi, poligon geofencing ihlal tespiti, EMA hız analitiği ve FastAPI WebSockets ile çalışan gerçek zamanlı uç video işleme hattı.",
                "problem_statement": (
                    "Canlı kamera akışlarında düşük gecikmeyle nesneleri kimliklendirmek, çokgen koruma bölgeleri (geofence) "
                    "ihlallerini milisaniye hassasiyetinde tespit etmek ve harici GPU bağımlılığı olmadan hafif uç cihazlarda "
                    "istikrarlı telemetri yayını sağlamak gerekiyordu."
                ),
                "solution_architecture": (
                    "2-aşamalı ByteTRACK IoU eşleştirme algoritması, ışın döküm (ray-casting) poligon geofencing motoru, "
                    "EMA (Üstel Hareketli Ortalama) hız tahmincisi ve OpenCV sentetik HD video üreteci kurgulandı. "
                    "FastAPI ile 20 Hz WebSocket telemetrisi, çok parçalı MJPEG video akışı ve dark cyber-glassmorphic canlı dashboard inşa edildi."
                ),
                "tech_stack": [
                    "Python 3.14",
                    "Computer Vision",
                    "ByteTRACK Algorithm",
                    "FastAPI",
                    "WebSockets",
                    "OpenCV",
                    "Geofencing / Ray-Casting",
                    "Pydantic v2",
                    "Docker & Compose",
                    "Pytest",
                ],
                "metrics": {
                    "fps": "30+ FPS Edge Stream",
                    "latency": "<8ms Tracking Loop",
                    "tracking": "ByteTRACK 2-Stage IoU",
                    "telemetry": "20 Hz WebSockets",
                },
                "github_url": "https://github.com/safaksenel/edge-vision-analytics-pipeline",
                "live_url": "http://127.0.0.1:8002/",
                "thumbnail_url": "/projects/vision-analytics-dashboard.png",
                "is_featured": True,
                "order": 2,
            },
            {
                "title": "FLO Group: BERT Tabanlı Müşteri Geri Bildirim Sınıflandırma Sistemi",
                "slug": "bert-customer-feedback-classifier",
                "category": ProjectCategory.DATA,
                "short_description": "Aylık 10.000+ müşteri geri bildirimini OpenVINO ile optimize edilmiş 22 Türkçe BERT modeliyle otomatik sınıflandırarak süreci %85 hızlandıran NLP sistemi.",
                "problem_statement": (
                    "FLO Group bünyesinde ayda 10.000'den fazla müşteri şikayeti ve geri bildirimi müşteri deneyimi ekipleri "
                    "tarafından manuel inceleniyor, bu durum aylık 300+ adam-saat iş kaybına ve acil aksiyon gerektiren konularda "
                    "gecikmelere yol açıyordu."
                ),
                "solution_architecture": (
                    "11 ana kök neden için 22 adet iki katmanlı Türkçe BERT modeli eğitildi. OpenVINO optimizasyonu uygulanarak "
                    "CPU çıkarım süresi 4 kat hızlandırıldı. LLM destekli veri zenginleştirme (data augmentation) ve SHAP yorumlanabilirlik "
                    "analizleriyle modelin F1 skoru 0.72'den 0.89'a yükseltildi. Son kullanıcılar için bağımsız çalışan bir masaüstü "
                    "uygulaması (.exe) olarak paketlenip teslim edildi."
                ),
                "tech_stack": [
                    "Python 3.14",
                    "BERT / HuggingFace",
                    "PyTorch",
                    "OpenVINO",
                    "SHAP",
                    "Scikit-learn",
                    "PyInstaller",
                ],
                "metrics": {
                    "time_reduction": "85%",
                    "f1_score": "0.89 (0.72 -> 0.89)",
                    "monthly_volume": "10,000+ Yorum",
                    "inference_engine": "OpenVINO CPU",
                },
                "github_url": "https://github.com/safaksenel",
                "live_url": "https://github.com/safaksenel",
                "thumbnail_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                "is_featured": True,
                "order": 1,
            },
            {
                "title": "Autonomous Distributed Web Scraping & Intelligence Pipeline",
                "slug": "autonomous-web-scraping-pipeline",
                "category": ProjectCategory.SCRAPING,
                "short_description": "Cloudflare & Turnstile korumalarını aşan, Python 3.14 ve Playwright/Crawl4AI çekirdekli yüksek hızlı dağıtık veri toplama altyapısı.",
                "problem_statement": (
                    "Modern e-ticaret ve ilan platformlarının agresif WAF (Web Application Firewall), Cloudflare Turnstile "
                    "ve dinamik bot tespit sistemleri geleneksel HTTP isteklerini anında engellemekte, veri çıkarma süreçlerini "
                    "kesintiye uğratmaktaydı."
                ),
                "solution_architecture": (
                    "Python 3.14 PEP 649 ertelenmiş tip değerlendirmesi ve modern asenkron event loop mimarisiyle sıfırdan inşa edildi. "
                    "Playwright ve Crawl4AI motorları ile headless Chromium havuzu (pool) oluşturuldu; dinamik TLS parmak izi rotasyonu, "
                    "akıllı proxy yönlendirmesi ve LLM tabanlı DOM şema ayrıştırıcısı ile %99.4 başarı oranı yakalandı."
                ),
                "tech_stack": [
                    "Python 3.14",
                    "Crawl4AI",
                    "Playwright",
                    "BeautifulSoup4",
                    "FastAPI",
                    "Redis",
                    "Docker",
                ],
                "metrics": {
                    "bypass_rate": "99.4%",
                    "throughput": "1,200 req/min",
                    "latency": "450ms avg",
                    "resilience": "Auto-recovery",
                },
                "github_url": "https://github.com/safaksenel",
                "live_url": "https://github.com/safaksenel",
                "thumbnail_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
                "is_featured": True,
                "order": 2,
            },
            {
                "title": "Smart File Organizer & Daemon v2.0 (Gerçek Zamanlı Otomasyon)",
                "slug": "smart-file-organizer-daemon",
                "category": ProjectCategory.SCRAPING,
                "short_description": "Watchdog dosya izleme motoru ve Türkçe karakter temizleme ile dosya organizasyonunu sıfır iş yüküne indiren gerçek zamanlı masaüstü otomasyonu.",
                "problem_statement": (
                    "Yoğun veri alışverişi yapılan operasyonel ortamlarda plansız dosya yığılmaları, bozuk karakter kodlamaları "
                    "ve manuel arşivleme nedeniyle saatlerce süren dosya arama ve kategorizasyon kayıpları yaşanmaktaydı."
                ),
                "solution_architecture": (
                    "Watchdog kütüphanesi üzerine kurulu olay tabanlı (event-driven) gerçek zamanlı bir dosya sistemi daemon'ı geliştirildi. "
                    "Dosya MIME tipi, uzantısı ve içeriğine göre anında otomatik sınıflandırma yapıldı. Türkçe karakter bozulmalarını "
                    "düzelten temizleme filtresi, koyu temalı GUI ve ASCII tabanlı operasyonel denetim raporu ile PyInstaller ile "
                    "taşınabilir .exe olarak paketlendi."
                ),
                "tech_stack": [
                    "Python 3.14",
                    "Watchdog",
                    "CustomTkinter",
                    "PyInstaller",
                    "Threading",
                    "Regex",
                ],
                "metrics": {
                    "time_saved": "90%",
                    "processing_speed": "<10ms per file",
                    "automation": "100% Event-Driven",
                },
                "github_url": "https://github.com/safaksenel",
                "live_url": "https://github.com/safaksenel",
                "thumbnail_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
                "is_featured": True,
                "order": 3,
            },
            {
                "title": "Telco Müşteri Terk Tahmini (Churn) & Yüksek Verimli REST API",
                "slug": "telco-churn-mlops-api",
                "category": ProjectCategory.BACKEND,
                "short_description": "10 makine öğrenimi algoritmasının soft voting ensemble modeli ile 0.8422 ROC-AUC başarımı yakalayan ve Docker üzerinde koşan mikrosaniye gecikmeli API.",
                "problem_statement": (
                    "Telekom operatörlerinde müşteri kaybı riskini erken aşamada tespit edememek milyonlarca liralık gelir kaybına yol açıyor; "
                    "bunun yanında ML modellerinin CRM ve çağrı merkezi sistemlerine gerçek zamanlı entegrasyonu sağlanamıyordu."
                ),
                "solution_architecture": (
                    "10 farklı makine öğrenimi modeli karşılaştırıldı; SMOTE dengesiz veri optimizasyonu ve öznitelik mühendisliği "
                    "ile zenginleştirilen veri kümesinde Soft Voting Ensemble ile 0.8422 ROC-AUC skoruna ulaşıldı. Model, "
                    "FastAPI ve Django Ninja üzerinde tekil ve dakikada 50.000 satır işleyebilen toplu (batch) tahmin uç noktalarıyla "
                    "servis edilerek Docker konteynerine alındı."
                ),
                "tech_stack": [
                    "Python 3.14",
                    "FastAPI",
                    "Django Ninja",
                    "Scikit-learn",
                    "LightGBM",
                    "Docker",
                    "PostgreSQL",
                ],
                "metrics": {
                    "roc_auc": "0.8422",
                    "latency": "<25ms",
                    "batch_capacity": "50,000 / dk",
                    "container": "Dockerized",
                },
                "github_url": "https://github.com/safaksenel",
                "live_url": "https://github.com/safaksenel",
                "thumbnail_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
                "is_featured": True,
                "order": 4,
            },
            {
                "title": "YZTA 5.0 Datathon: Kognitif Performans Skoru Tahmini",
                "slug": "yzta-cognitive-performance-prediction",
                "category": ProjectCategory.DATA,
                "short_description": "56.000 satırlık regresyon veri setinde Optuna optimizasyonlu Stacking Ensemble ve Pseudo-Labeling ile Türkiye geneli ilk %10 derecesi.",
                "problem_statement": (
                    "Büyük ölçekli ve yüksek gürültü içeren kognitif test verilerinde bireylerin performans skorlarının güvenilir "
                    "ve kararlı bir şekilde regresyon modeliyle tahmin edilmesi hedeflendi."
                ),
                "solution_architecture": (
                    "Alan odaklı öznitelik türetimi (domain-driven feature engineering), Out-Of-Fold (OOF) target encoding ve 5-Fold "
                    "Cross Validation metodolojisi uygulandı. LightGBM, XGBoost ve CatBoost modelleri Optuna ile Bayesian hiperparametre "
                    "optimizasyonuna tabi tutuldu. En iyi modeller RidgeCV meta-modelinde Stacking Ensemble yapısı altında birleştirildi "
                    "ve test verisi üzerinde Pseudo-Labeling ile doğruluk en üst seviyeye taşındı."
                ),
                "tech_stack": [
                    "Python 3.14",
                    "LightGBM",
                    "XGBoost",
                    "CatBoost",
                    "Optuna",
                    "Pandas",
                    "NumPy",
                ],
                "metrics": {
                    "standing": "Top %10 (Datathon)",
                    "cv_score": "0.142 RMSE",
                    "dataset_size": "56,000 rows",
                },
                "github_url": "https://github.com/safaksenel",
                "live_url": "https://github.com/safaksenel",
                "thumbnail_url": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
                "is_featured": False,
                "order": 5,
            },
            {
                "title": "Kurumsal E-Ticaret Satış Tahmini & Analitik Hub",
                "slug": "ecommerce-sales-forecasting-hub",
                "category": ProjectCategory.FULLSTACK,
                "short_description": "Facebook Prophet ile 90 günlük ciro/stok tahmini yapan yapay zeka hattı ve dinamik KPI takibi sunan analitik platformu.",
                "problem_statement": (
                    "E-ticaret yöneticilerinin geçmiş trendlere bakarak gelecekteki 90 günlük ciro ve kategori bazlı stok taleplerini "
                    "hızlıca görselleştirip öngörebilecekleri interaktif bir karar destek sistemine ihtiyaç duyuluyordu."
                ),
                "solution_architecture": (
                    "Facebook Prophet algoritmasıyla mevsimsellik ve özel gün etkilerini ayrıştıran bir tahmin motoru geliştirildi. "
                    "Radar ve baloncuk grafikleriyle kategori kırılımları zenginleştirildi; Streamlit ve Next.js tabanlı arayüzle "
                    "yöneticilerin canlı senaryolar test edebileceği modern bir dashboard inşa edildi."
                ),
                "tech_stack": [
                    "Python 3.14",
                    "Prophet",
                    "Streamlit",
                    "Next.js",
                    "PostgreSQL",
                    "Plotly",
                ],
                "metrics": {
                    "forecast_window": "90 Günlük Tahmin",
                    "delivery_time": "72 Saat Sprint",
                    "kpi_refresh": "Gerçek Zamanlı",
                },
                "github_url": "https://github.com/safaksenel",
                "live_url": "https://github.com/safaksenel",
                "thumbnail_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
                "is_featured": False,
                "order": 6,
            },
        ]

        for p_data in projects_data:
            project, created = Project.objects.update_or_create(
                slug=p_data["slug"],
                defaults=p_data,
            )
            status_text = "Created" if created else "Updated"
            self.stdout.write(f"  [Project] {status_text}: {project.title}")

        self.stdout.write(self.style.SUCCESS("Portfolio database successfully seeded with 4 services and 6 projects!"))
