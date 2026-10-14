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
  isFeatured: boolean;
  order: number;
}

export const localizedProjects: LocalizedProject[] = [
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
    isFeatured: true,
    order: 1,
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
    thumbnailUrl: "/projects/yolunda-fleet.jpg",
    isFeatured: true,
    order: 2,
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
    thumbnailUrl: "/projects/telco-confusion-matrix.png",
    isFeatured: true,
    order: 3,
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
    isFeatured: true,
    order: 4,
  },
  {
    id: "5",
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
    thumbnailUrl: "/projects/blindhire-avatar.png",
    isFeatured: true,
    order: 5,
  },
  {
    id: "6",
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
    isFeatured: false,
    order: 6,
  },
];
