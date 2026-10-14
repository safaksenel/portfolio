export interface LocalizedProject {
  id: string;
  slug: string;
  category: "scraping" | "backend" | "data" | "fullstack";
  title: {
    tr: string;
    en: string;
  };
  shortDescription: {
    tr: string;
    en: string;
  };
  problemStatement: {
    tr: string;
    en: string;
  };
  solutionArchitecture: {
    tr: string;
    en: string;
  };
  techStack: string[];
  metrics: Record<string, string>;
  githubUrl: string;
  liveUrl: string;
  thumbnailUrl: string;
  images: string[];
  isFeatured: boolean;
  order: number;
}

export const localizedProjects: LocalizedProject[] = [
  {
    id: "copilot",
    slug: "agentic-datascience-copilot",
    category: "data",
    title: {
      tr: "Agentic Copilot: Çok Ajanlı Veri Bilimi & Güvenli Kod Yürütme Motoru",
      en: "Agentic Copilot: Multi-Agent Data Science & Sandboxed Code Interpreter",
    },
    shortDescription: {
      tr: "LangGraph durum grafiği, DuckDB bellek-içi OLAP motoru, AST-doğrulamalı güvenli Python çalıştırma ortamı ve kendi kendini onaran yansıma döngüleriyle çalışan otonom veri analisti.",
      en: "Autonomous data science copilot powered by LangGraph state graphs, DuckDB in-memory OLAP analytics, AST-verified sandboxed Python code execution, and self-healing reflection loops.",
    },
    problemStatement: {
      tr: "Büyük kurumsal veri kümelerinde iş zekası sorgularını doğal dilden SQL'e çevirmek, güvenli Python kodu koşturmak ve syntax/runtime hatalarını insan müdahalesi olmadan gidermek karmaşık bir mimari gerektiriyordu.",
      en: "Translating natural language queries into accurate OLAP SQL, running untrusted Python data analytics securely, and recovering from syntax/runtime errors without human intervention required a stateful, resilient multi-agent architecture.",
    },
    solutionArchitecture: {
      tr: "LangGraph ile Query Router, SQL Generator, DuckDB Executor, AST Kod Doğrulayıcı ve Explainer ajanları kurgulandı. DuckDB ile sıfır disk G/Ç süresi yakalandı; AST ziyaretçisiyle tehlikeli sistem çağrıları engellendi; hata durumunda yansıma (reflection) döngüsüyle kod otomatik düzeltildi. FastAPI REST API ve karanlık temalı Streamlit arayüzü ile sunuldu.",
      en: "Engineered a stateful LangGraph multi-agent graph with Query Router, SQL Synthesizer, DuckDB OLAP engine, AST Node Visitor security sandbox, and Explainer Agent. Implemented self-healing reflection loops that autonomously debug Python/SQL errors, served via FastAPI REST endpoints and dark-mode Streamlit dashboard.",
    },
    techStack: [
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
    metrics: {
      latency: "3.42ms DuckDB OLAP",
      security: "AST Safe Sandbox",
      resilience: "Self-Healing Reflection",
      architecture: "LangGraph Multi-Agent",
    },
    githubUrl: "https://github.com/safaksenel/agentic-datascience-copilot",
    liveUrl: "https://github.com/safaksenel/agentic-datascience-copilot",
    thumbnailUrl: "/projects/agentic-copilot.svg",
    images: [
      "/projects/agentic-copilot.svg",
      "/projects/agentic-copilot-chart.png",
    ],
    isFeatured: true,
    order: 1,
  },
  {
    id: "1",
    slug: "yolunda-fleet-management-platform",
    category: "fullstack",
    title: {
      tr: "Yolunda: Akıllı Okul Servisi & Canlı Filo Takip Platformu",
      en: "Yolunda: Smart Fleet Tracking & School Bus Platform",
    },
    shortDescription: {
      tr: "Harita tabanlı canlı GPS telemetrisi, dinamik rota optimizasyonu, veli ve sürücü mobil modülleriyle uçtan uca çalışan kurumsal filo yönetim platformu.",
      en: "Enterprise fleet management platform featuring real-time map GPS telemetry, dynamic route optimization, guardian tracking, and driver mobile apps.",
    },
    problemStatement: {
      tr: "Okul servis operasyonlarında araç konumlarının anlık takip edilememesi, velilere güvenilir bildirim gitmemesi ve sürücü rota değişikliklerinin manuel yapılması ciddi zaman ve güvenlik kaybı oluşturuyordu.",
      en: "Lack of real-time vehicle GPS tracking, absence of transparent guardian alerts, and inefficient manual route planning caused severe operational friction in school bus fleets.",
    },
    solutionArchitecture: {
      tr: "Next.js, TypeScript ve Leaflet/Mapbox ile interaktif canlı harita paneli inşa edildi. WebSockets ile sub-second araç konumu akışı, veliler için anlık servis yaklaştı bildirimleri ve sürücüler için dinamik durak navigasyonu geliştirildi.",
      en: "Engineered an interactive live telemetry dashboard with Next.js, TypeScript, and Leaflet/Mapbox. Sub-second vehicle telemetry via WebSockets, automated guardian geofence proximity alerts, and turn-by-turn driver navigation.",
    },
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Leaflet / Mapbox",
      "WebSockets",
      "Tailwind CSS",
      "PostgreSQL",
      "Docker",
    ],
    metrics: {
      activeStudents: "500+ Öğrenci / Students",
      telemetry: "<500ms Canlı Konum / Live GPS",
      uptime: "%99.8 Güvenilirlik / Uptime",
      multiTenant: "4 Rol / Multi-Tenant",
    },
    githubUrl: "https://github.com/safaksenel",
    liveUrl: "https://github.com/safaksenel",
    thumbnailUrl: "/projects/yolunda-dashboard.jpg",
    images: [
      "/projects/yolunda-dashboard.jpg",
      "/projects/yolunda-fleet.jpg",
      "/projects/yolunda-driver.jpg",
      "/projects/yolunda-guardian.jpg",
    ],
    isFeatured: true,
    order: 2,
  },
  {
    id: "2",
    slug: "mhrs-appointment-automation",
    category: "scraping",
    title: {
      tr: "MHRS Randevu Tespit & Gerçek Zamanlı Bildirim Otomasyonu",
      en: "MHRS Appointment Finder & Real-Time Alert Daemon",
    },
    shortDescription: {
      tr: "e-Devlet kapısı üzerinden güvenli oturum açıp istenen il, hastane ve hekim için boşalan kontenjanları anında yakalayarak HTML e-posta bildiren otonom bot.",
      en: "Autonomous daemon authenticating through e-Devlet to detect opened hospital appointment slots in real-time, delivering instant rich HTML email notifications.",
    },
    problemStatement: {
      tr: "Yoğun branşlarda (Göz, Cildiye, Diş vb.) randevu kontenjanları dakikalar içinde tükeniyor ve vatandaşların MHRS ekranını gün boyu manuel yenilemesi gerekiyordu.",
      en: "Hospital appointment slots in high-demand departments vanish within minutes, forcing patients into tedious, full-day manual page refreshes.",
    },
    solutionArchitecture: {
      tr: "Selenium 4 ve Python mimarisiyle geliştirildi. e-Devlet 2FA/login akışları, sanal DOM kaydırma mekanizmaları, modal yönetimi ve 7/24 çalışan kesintisiz daemon döngüsü eklendi. Kontenjan açıldığında SSL SMTP ile anlık HTML e-posta fırlatır.",
      en: "Built with Selenium 4 and Python. Features automated e-Devlet gateway login, dynamic virtual DOM scrolling, modal handling, and persistent background daemon scheduler with SSL SMTP HTML email alerting.",
    },
    techStack: [
      "Python 3.14",
      "Selenium 4",
      "e-Devlet Gateway",
      "SMTP / HTML Mail",
      "Docker",
      "Rich CLI",
      "python-dotenv",
    ],
    metrics: {
      status: "7/24 Kesintisiz / Daemon",
      latency: "<300ms Slot Tespiti",
      delivery: "Anlık E-Posta / Instant Alert",
      runtime: "Headless Chromium",
    },
    githubUrl: "https://github.com/safaksenel/mhrs-appointment-automation",
    liveUrl: "https://github.com/safaksenel/mhrs-appointment-automation",
    thumbnailUrl: "/projects/mhrs-terminal.png",
    images: [
      "/projects/mhrs-terminal.png",
      "/projects/mhrs-email-alert.png",
    ],
    isFeatured: true,
    order: 3,
  },
  {
    id: "3",
    slug: "bert-customer-feedback-classifier",
    category: "data",
    title: {
      tr: "FLO Group: İki Katmanlı Türkçe BERT Müşteri Geri Bildirim Sınıflandırıcısı",
      en: "FLO Group: Enterprise Dual-Layer Turkish BERT Classifier",
    },
    shortDescription: {
      tr: "Aylık 10.000+ müşteri yorumunu OpenVINO ile 4x optimize edilmiş 22 Türkçe BERT modeliyle kök nedenlerine göre sınıflandıran kurumsal NLP sistemi.",
      en: "Automated NLP system classifying 10,000+ monthly customer reviews across 22 Turkish BERT models accelerated 4x with Intel OpenVINO.",
    },
    problemStatement: {
      tr: "FLO Group bünyesinde ayda 10.000'den fazla müşteri şikayeti ve geri bildirimi ekipler tarafından manuel inceleniyor, bu durum aylık 300+ adam-saat iş kaybına yol açıyordu.",
      en: "Over 10,000 monthly customer complaints and reviews required manual triaging, causing 300+ man-hours of operational delay each month.",
    },
    solutionArchitecture: {
      tr: "11 ana sebep için 22 adet iki katmanlı Türkçe BERT modeli eğitildi. OpenVINO optimizasyonuyla CPU çıkarım süresi 4 kat hızlandırıldı. SHAP yorumlanabilirlik analizleriyle modelin F1 skoru 0.892'ye ulaştı ve operasyon ekipleri için Tkinter masaüstü GUI (.exe) olarak paketlendi.",
      en: "Trained 22 dual-layer Turkish BERT models for 11 root causes. Accelerated CPU inference 4x using OpenVINO. Boosted weighted F1 score to 0.892 with SHAP explainability and delivered as a standalone desktop GUI (.exe).",
    },
    techStack: [
      "Python 3.14",
      "BERT / HuggingFace",
      "PyTorch",
      "Intel OpenVINO",
      "Tkinter GUI",
      "SHAP",
      "Scikit-learn",
      "PyInstaller",
    ],
    metrics: {
      timeReduction: "%85 Zaman Tasarrufu",
      f1Score: "0.892 F1 Skoru",
      monthlyVolume: "10,000+ Yorum / Ay",
      engine: "OpenVINO 4x Hızlanma",
    },
    githubUrl: "https://github.com/safaksenel/NLP-BERT",
    liveUrl: "https://github.com/safaksenel/NLP-BERT",
    thumbnailUrl: "/projects/flo-bert-confusion-matrix.png",
    images: [
      "/projects/flo-bert-confusion-matrix.png",
      "/projects/flo-bert-benchmarks.png",
    ],
    isFeatured: true,
    order: 4,
  },
  {
    id: "4",
    slug: "telco-churn-mlops-api",
    category: "backend",
    title: {
      tr: "Telco Müşteri Terk Tahmini (Churn), MLOps & REST API",
      en: "Telco Customer Churn Prediction MLOps & REST API",
    },
    shortDescription: {
      tr: "10 makine öğrenimi modelinin Soft Voting Ensemble kombinasyonuyla 0.8422 ROC-AUC başarımı yakalayan ve Docker üzerinde koşan mikrosaniye gecikmeli API.",
      en: "Production MLOps pipeline serving an Optuna-tuned Soft Voting Ensemble (0.8422 ROC-AUC) with sub-millisecond FastAPI endpoints deployed on Docker.",
    },
    problemStatement: {
      tr: "Telekom operatörlerinde müşteri kaybı riskini erken aşamada tespit edememek büyük gelir kaybına yol açıyor, ML modellerinin gerçek zamanlı servis edilmesi zorluk yaratıyordu.",
      en: "Inability to predict customer churn early resulted in revenue loss, and deploying ML models for live real-time CRM ingestion was challenging.",
    },
    solutionArchitecture: {
      tr: "10 model kıyaslandı; SMOTE ile dengesiz veri çözüldü. LightGBM, CatBoost ve XGBoost modelleri Soft Voting Ensemble ile birleştirilerek 0.8422 ROC-AUC skoruna ulaşıldı. FastAPI üzerinde dakikada 50.000 kayıt işleyebilen API olarak Docker konteynerine alındı.",
      en: "Benchmarked 10 ML models, balanced data via SMOTE, reached 0.8422 ROC-AUC using Soft Voting Ensemble. Containerized on Docker with FastAPI handling 50k batch records/min.",
    },
    techStack: [
      "Python 3.14",
      "FastAPI",
      "Scikit-learn",
      "LightGBM",
      "CatBoost",
      "XGBoost",
      "Docker",
      "PostgreSQL",
    ],
    metrics: {
      rocAuc: "0.8422 ROC-AUC",
      latency: "<25ms Latency",
      throughput: "50,000/dk Batch",
      models: "10 Model Ensemble",
    },
    githubUrl: "https://github.com/safaksenel/Telco-Customer-Churn",
    liveUrl: "https://github.com/safaksenel/Telco-Customer-Churn",
    thumbnailUrl: "/projects/telco-roc-curves.png",
    images: [
      "/projects/telco-roc-curves.png",
      "/projects/telco-confusion-matrix.png",
    ],
    isFeatured: true,
    order: 5,
  },
  {
    id: "5",
    slug: "datathon-career-success-prediction",
    category: "data",
    title: {
      tr: "Google & BTK Akademi Datathon 2026: Kariyer Başarı Skoru Tahmini",
      en: "Google & BTK Akademi Datathon 2026: Career Success Prediction",
    },
    shortDescription: {
      tr: "Öğrenci profilleri ve mentor değerlendirme metinlerini işleyen çok modlu Stacking Regresyon mimarisiyle Türkiye geneli ilk %10 derecesi.",
      en: "Top 10% nationwide ranking in Google & BTK Akademi Datathon with multi-modal tabular and NLP mentor text Stacking Regression.",
    },
    problemStatement: {
      tr: "Öğrencilerin akademik, teknik, staj ve serbest metin formatındaki mentor değerlendirmelerini birlikte analiz ederek sürekli kariyer başarı skorunun en düşük hata (MSE) ile tahmin edilmesi gerekiyordu.",
      en: "Predicting continuous career performance metrics with minimum MSE by extracting signals from disparate tabular and free-form mentor feedback text.",
    },
    solutionArchitecture: {
      tr: "TF-IDF ve SVD ile metin öznitelikleri çıkarıldı; OOF target encoding ve 5-Fold Cross Validation uygulandı. LightGBM ve CatBoost modelleri Optuna ile optimize edilerek Seviye-2 RidgeCV Stacking Ensemble ile birleştirildi.",
      en: "Extracted NLP features via TF-IDF and SVD, engineered cross-domain ratios, optimized LightGBM and CatBoost via Optuna, and blended predictions using RidgeCV Stacking Ensemble.",
    },
    techStack: [
      "Python 3.14",
      "LightGBM",
      "CatBoost",
      "Scikit-learn",
      "Optuna",
      "TF-IDF / NLP",
      "Pandas",
    ],
    metrics: {
      standing: "Top %10 Derecesi",
      validation: "5-Fold Stacking CV",
      objective: "Minimum MSE",
      multiModal: "Tabular + Metin",
    },
    githubUrl: "https://github.com/safaksenel/datathon-career-success-prediction",
    liveUrl: "https://github.com/safaksenel/datathon-career-success-prediction",
    thumbnailUrl: "/projects/datathon-feature-importance.png",
    images: [
      "/projects/datathon-feature-importance.png",
      "/projects/datathon-stacking-residuals.png",
    ],
    isFeatured: true,
    order: 6,
  },
  {
    id: "6",
    slug: "smart-file-organizer-daemon",
    category: "scraping",
    title: {
      tr: "Akıllı Dosya Düzenleyici & Olay Güdümlü Daemon",
      en: "Smart File Organizer & Event-Driven Daemon",
    },
    shortDescription: {
      tr: "Watchdog dosya sistemi dinleyicisi ve Türkçe karakter temizleme filtresi ile plansız dosya yığılmalarını sıfıra indiren gerçek zamanlı masaüstü otomasyonu.",
      en: "Real-time desktop daemon with Watchdog filesystem monitoring and unicode character sanitization, eliminating file disorder autonomously.",
    },
    problemStatement: {
      tr: "Operasyonel iş akışlarında indirilen dosyaların düzensiz dağılması, Türkçe karakter uyumsuzlukları ve manuel arşivleme süreçleri ciddi zaman kaybına yol açmaktaydı.",
      en: "Unorganized directory clutter, encoding conflicts, and manual archiving created significant productivity bottlenecks in daily operations.",
    },
    solutionArchitecture: {
      tr: "Watchdog FileSystemEventHandler üzerine kurulu olay tabanlı gerçek zamanlı daemon geliştirildi. MIME tipi ve uzantıya göre sınıflandırma, Unicode normalizasyonu, dosya çakışma önleyici ve detaylı denetim raporlama eklendi.",
      en: "Engineered an event-driven filesystem daemon with Watchdog. Automatic classification by MIME extension, unicode sanitization, collision-free renaming, and structured audit logs.",
    },
    techStack: [
      "Python 3.14",
      "Watchdog",
      "Unicode Normalization",
      "JSON Config",
      "Logging",
      "Pytest",
    ],
    metrics: {
      latency: "<10ms Olay Tepkisi",
      zeroLoss: "Çakışma Önleyici",
      autoAudit: "JSON & Text Log",
    },
    githubUrl: "https://github.com/safaksenel/smart-file-organizer-daemon",
    liveUrl: "https://github.com/safaksenel/smart-file-organizer-daemon",
    thumbnailUrl: "/projects/file-organizer-daemon-cli.png",
    images: [
      "/projects/file-organizer-daemon-cli.png",
      "/projects/file-organizer-stats.png",
    ],
    isFeatured: true,
    order: 7,
  },
  {
    id: "7",
    slug: "blindhire-ai-interviewer",
    category: "fullstack",
    title: {
      tr: "BlindHire: Yapay Zeka Destekli Teknik Mülakat & Değerlendirme Sistemi",
      en: "BlindHire: AI-Powered Technical Interviewer & Assessment Agent",
    },
    shortDescription: {
      tr: "Önyargısız teknik değerlendirme sağlayan, ses ve görüntü destekli yapay zeka mülakat ajanı ve kurumsal aday takip paneli.",
      en: "Unbiased technical interview evaluation platform featuring interactive voice AI agents, dynamic coding challenges, and corporate candidate tracking.",
    },
    problemStatement: {
      tr: "Teknik işe alımlarda insan kaynakları uzmanlarının teknik bilgi eksikliği veya bilinçsiz önyargıları yetenekli adayların elenmesine ve şirketlerin yanlış kararlar almasına yol açmaktaydı.",
      en: "Unconscious bias and lack of deep domain expertise in initial screening stages often filtered out high-potential engineering talent and delayed hiring pipelines.",
    },
    solutionArchitecture: {
      tr: "LLM tabanlı dinamik soru üretim motoru, aday cevaplarını anlık değerlendiren NLP mimarisi ve adayların sesli/görüntülü yanıtlarını analiz eden yapay zeka arayüzü TypeScript, Next.js ve Python ile inşa edildi.",
      en: "Architected dynamic LLM question generators and real-time response assessment pipelines with TypeScript, Next.js, and Python backend services with audio/video feedback loops.",
    },
    techStack: [
      "TypeScript",
      "Next.js",
      "Python / FastAPI",
      "OpenAI GPT-4",
      "Tailwind CSS",
      "PostgreSQL",
      "Docker",
    ],
    metrics: {
      biasFree: "%100 Objektif / Bias-free",
      consistency: "%95 Tutarlılık / Consistency",
      voiceInteraction: "Canlı Ses / Real-time Voice",
    },
    githubUrl: "https://github.com/safaksenel/BlindHire",
    liveUrl: "https://github.com/safaksenel/BlindHire",
    thumbnailUrl: "/projects/blindhire-interface.png",
    images: [
      "/projects/blindhire-interface.png",
      "/projects/blindhire-avatar.png",
    ],
    isFeatured: false,
    order: 8,
  },
  {
    id: "8",
    slug: "flight-deals-tracker",
    category: "scraping",
    title: {
      tr: "Flight Deals & Twilio Anlık SMS Bildirim Botu",
      en: "Flight Deals Tracker & Real-Time Twilio SMS Alert Bot",
    },
    shortDescription: {
      tr: "Amadeus API ve web scraping ile uçak bilet fiyatlarını takip eden, hedef bütçe altına indiğinde anında SMS bildirimi fırlatan otomasyon motoru.",
      en: "Automated flight ticket price monitoring engine integrating Amadeus API and scraping, instantly triggering mobile SMS alerts via Twilio when bargains emerge.",
    },
    problemStatement: {
      tr: "Uçak bileti fiyatlarındaki ani dalgalanmaları manuel takip etmek imkansıza yakın olup kullanıcıların indirimli koltukları kaçırmasına neden oluyordu.",
      en: "High volatility in airline ticket fares made manual monitoring impractical, causing travelers to consistently miss flash sales and bargain prices.",
    },
    solutionArchitecture: {
      tr: "Python 3.14 ile IATA kod çözücü, Sheety Google Sheets entegrasyonu ve Amadeus Flight Search API üzerinde çalışan periyodik izleme servisi kuruldu. Eşik fiyatın altına inildiğinde Twilio SMS REST API üzerinden kullanıcı telefonuna anlık uyarı iletilir.",
      en: "Developed an event-driven monitoring daemon using Python 3.14, IATA city resolvers, Google Sheets Sheety sync, and Amadeus API with automated Twilio SMS triggers.",
    },
    techStack: [
      "Python 3.14",
      "Amadeus API",
      "Twilio SMS",
      "Google Sheets / Sheety",
      "Requests",
      "python-dotenv",
    ],
    metrics: {
      savings: "%40'a Varan Tasarruf",
      smsAlert: "<5 sn Bildirim Hızı",
      tracking: "Global Uçuş Ağı",
    },
    githubUrl: "https://github.com/safaksenel/flight-deals",
    liveUrl: "https://github.com/safaksenel/flight-deals",
    thumbnailUrl: "/projects/flight-deals.jpeg",
    images: [
      "/projects/flight-deals.jpeg",
      "/projects/flight-deals-matrix.png",
    ],
    isFeatured: false,
    order: 9,
  },
  {
    id: "9",
    slug: "retro-snake-arcade",
    category: "backend",
    title: {
      tr: "Retro Snake Arcade: Cyberpunk Edition & Yüksek Hızlı Motor",
      en: "Retro Snake Arcade: Cyberpunk Edition & High-Speed Engine",
    },
    shortDescription: {
      tr: "Kalıcı rekor skoru, dinamik hız eğrisi, süreli Altın Elma güçlendirmeleri ve WASD kontrolleriyle modernize edilmiş karanlık temalı atari oyunu.",
      en: "Modern dark-themed Snake arcade with persistent high scores, dynamic speed scaling, timed Golden Apple power-ups, and WASD/Arrow bindings.",
    },
    problemStatement: {
      tr: "Klasik konsol oyunlarının modern UI, esnek olay döngüsü, temiz OOP mimarisi ve test edilebilirlik standartlarına taşınması gerekiyordu.",
      en: "Translating classic arcade loop fundamentals into modern modular OOP design, event-driven tick handling, and automated pytest coverage.",
    },
    solutionArchitecture: {
      tr: "Python OOP (Snake, Food, Scoreboard modülleri) ile geliştirildi. Altın Elma ile +5 çarpanlı süreli ödüller, dosya tabanlı kalıcı yüksek skor yönetimi ve otomatik hızlanma algoritmaları entegre edildi.",
      en: "Built with modular Python OOP architecture. Added timed golden food multipliers, local file persistent high-score ledger, and dynamic tick-rate difficulty scaling.",
    },
    techStack: [
      "Python 3.14",
      "Turtle Graphics",
      "OOP Architecture",
      "Event-Driven",
      "Pytest",
    ],
    metrics: {
      fps: "60 FPS Akıcı Oynanış",
      powerups: "Süreli Altın Elma",
      persistence: "Kalıcı En Yüksek Skor",
    },
    githubUrl: "https://github.com/safaksenel/retro-snake-arcade",
    liveUrl: "https://github.com/safaksenel/retro-snake-arcade",
    thumbnailUrl: "/projects/snake-arcade-cyberpunk.png",
    images: [
      "/projects/snake-arcade-cyberpunk.png",
    ],
    isFeatured: false,
    order: 10,
  },
];
