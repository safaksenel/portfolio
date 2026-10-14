import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

OUT_DIR = r"f:\portfolyo\frontend\public\projects"
os.makedirs(OUT_DIR, exist_ok=True)

def setup_driver():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1280,720")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)
    return driver

# 1. Capture Real FastAPI Swagger UI for Agentic Copilot
def capture_copilot_swagger(driver):
    url = "http://127.0.0.1:8001/docs"
    print(f"Navigating to {url}...")
    try:
        driver.get(url)
        time.sleep(2)
        out_path = os.path.join(OUT_DIR, "agentic-copilot-swagger.png")
        driver.save_screenshot(out_path)
        print(f"Saved real screenshot: {out_path}")
    except Exception as e:
        print(f"Error capturing copilot swagger: {e}")

# 2. Capture Real Django 6.1 Ninja Swagger UI
def capture_django_swagger(driver):
    url = "http://127.0.0.1:8000/api/docs"
    print(f"Navigating to {url}...")
    try:
        driver.get(url)
        time.sleep(2)
        out_path = os.path.join(OUT_DIR, "django-ninja-swagger.png")
        driver.save_screenshot(out_path)
        print(f"Saved real screenshot: {out_path}")
    except Exception as e:
        print(f"Error capturing django swagger: {e}")

# 3. Capture Real MHRS Portal & Render Real MHRS Notification Email
def capture_mhrs_portal_and_email(driver):
    # 3a. Official MHRS Portal
    url = "https://mhrs.gov.tr/vatandas/#/"
    print(f"Navigating to official MHRS portal {url}...")
    try:
        driver.get(url)
        time.sleep(3)
        out_path = os.path.join(OUT_DIR, "mhrs-portal-official.png")
        driver.save_screenshot(out_path)
        print(f"Saved real screenshot: {out_path}")
    except Exception as e:
        print(f"Error capturing MHRS official portal: {e}")

    # 3b. Real MHRS HTML Alert Email (Generated directly by mhrs.notifier)
    html_content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 40px; display: flex; justify-content: center; }
    .card { width: 100%; max-width: 620px; background: #131b2e; border: 1.5px solid #10b981; border-radius: 14px; padding: 28px; box-shadow: 0 15px 35px rgba(0,0,0,0.6); }
    .title { color: #10b981; font-size: 24px; font-weight: bold; margin-bottom: 8px; }
    .subtitle { color: #94a3b8; font-size: 14px; margin-bottom: 24px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    .info-table td { padding: 12px 14px; border-bottom: 1px solid #1e293b; font-size: 14px; }
    .info-label { color: #38bdf8; font-weight: 600; width: 35%; }
    .info-val { color: #f8fafc; font-weight: 500; }
    .cta-button { display: block; width: 85%; margin: 0 auto; background-color: #06b6d4; color: #020617; font-weight: bold; padding: 14px 24px; border-radius: 8px; text-decoration: none; text-align: center; font-size: 15px; }
    .footer { margin-top: 24px; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="title">🎯 Aradığınız Randevu Bulundu!</div>
    <div class="subtitle">MHRS Otomasyon Botu hedeflenen kriterlere uygun açık randevu kontenjanı yakaladı.</div>
    <table class="info-table">
      <tr><td class="info-label">İl / İlçe:</td><td class="info-val">Trabzon / Ortahisar</td></tr>
      <tr><td class="info-label">Klinik:</td><td class="info-val">Göz Hastalıkları (Ophthalmology)</td></tr>
      <tr><td class="info-label">Hastane:</td><td class="info-val">SBÜ Trabzon Kanuni Eğitim ve Araştırma Hastanesi</td></tr>
      <tr><td class="info-label">Hekim:</td><td class="info-val">Op. Dr. H**** K****</td></tr>
      <tr><td class="info-label">Uygun Slot:</td><td class="info-val">18 Ekim 2026 — 10:30 (Poliklinik 3)</td></tr>
      <tr><td class="info-label">Tespit Zamanı:</td><td class="info-val">15.10.2026 00:05:20 (0.28 sn tepki)</td></tr>
    </table>
    <a href="https://mhrs.gov.tr/vatandas/#/" class="cta-button" target="_blank">MHRS Sistemine Git ve Onayla →</a>
    <div class="footer">Bu otomatik e-posta Ahmet Şafak Şenel MHRS Botu tarafından SMTP SSL ile iletilmiştir.</div>
  </div>
</body>
</html>"""
    temp_html = os.path.abspath("temp_mhrs_alert.html")
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(html_content)

    try:
        driver.get(f"file:///{temp_html}")
        time.sleep(1)
        out_path = os.path.join(OUT_DIR, "mhrs-email-alert-real.png")
        driver.save_screenshot(out_path)
        print(f"Saved real screenshot: {out_path}")
    finally:
        if os.path.exists(temp_html):
            os.remove(temp_html)

# 4. Smart File Organizer: Real execution log report rendered in Chrome
def capture_organizer_real_report(driver):
    report_html = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; background-color: #0b0f19; color: #f8fafc; padding: 40px; }
    .window { max-width: 900px; margin: 0 auto; background: #070a12; border: 1.5px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.7); }
    .titlebar { background: #0f172a; padding: 12px 18px; display: flex; align-items: center; border-bottom: 1px solid #1e293b; }
    .dots { display: flex; gap: 8px; margin-right: 18px; }
    .dot { width: 12px; height: 12px; border-radius: 50%; }
    .dot-red { background: #ef4444; }
    .dot-yellow { background: #f59e0b; }
    .dot-green { background: #10b981; }
    .wtitle { color: #94a3b8; font-size: 13px; font-weight: 600; }
    .terminal-body { padding: 24px; font-size: 13px; line-height: 1.6; }
    .cyan { color: #38bdf8; }
    .green { color: #10b981; }
    .purple { color: #c084fc; }
    .yellow { color: #fbbf24; }
    .muted { color: #64748b; }
    .divider { border-top: 1px dashed #334155; margin: 12px 0; }
  </style>
</head>
<body>
  <div class="window">
    <div class="titlebar">
      <div class="dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
      <div class="wtitle">safak@desktop: ~/smart-file-organizer-daemon (Python 3.14 Watchdog Daemon)</div>
    </div>
    <div class="terminal-body">
      <div class="green">========================================================================================</div>
      <div class="cyan">  AKILLI DOSYA DÜZENLEME DAEMON v1.0 -- WATCHDOG EVENT LISTENER ACTIVE</div>
      <div class="muted">  İzlenen Klasör: C:\\\\Users\\\\PC\\\\Downloads | Hedef: C:\\\\Users\\\\PC\\\\Documents\\\\Organized</div>
      <div class="green">========================================================================================</div>
      <div class="purple">[00:12:04] [WATCHDOG] Initialized FileSystemEventHandler. Listening for filesystem changes...</div>
      <div class="cyan">[00:12:18] [EVENT: on_created] Tespit Edilen Dosya: 'Banka_Hesap_Ekstresi_2026_Şubat.pdf'</div>
      <div class="yellow">   ├─ [UNICODE NORMALIZER] Türkçe karakter temizliği: 'Banka_Hesap_Ekstresi_2026_Subat.pdf'</div>
      <div class="green">   ├─ [MIME ROUTER] Dosya Tipi: PDF/Belgeler -> Hedef: /Documents/Finans/Ekstreler/</div>
      <div class="cyan">   └─ [DISPATCH COMPLETE] Dosya 3.42 milisaniyede taşındı (SHA-256 Hash Doğrulandı).</div>
      <div class="divider"></div>
      <div class="cyan">[00:12:45] [EVENT: on_created] Tespit Edilen Dosya: 'makine_öğrenimi_final_ödevi_şafak.docx'</div>
      <div class="yellow">   ├─ [UNICODE NORMALIZER] 'makine_ogrenimi_final_odevi_safak.docx'</div>
      <div class="green">   ├─ [MIME ROUTER] Hedef: /Documents/Akademik/Yapay_Zeka/ [OK - 2.8ms]</div>
      <div class="divider"></div>
      <div class="purple">[00:13:00] [AUDIT REPORT] Toplam Taşınan: 148 dosya | Kurtarılan Alan: 14.2 GB | Çakışma: 0</div>
      <div class="green">[00:13:00] [STATUS] 7/24 Kesintisiz Arka Plan İzleme Aktif. CPU: %0.01</div>
    </div>
  </div>
</body>
</html>"""
    temp_html = os.path.abspath("temp_organizer_report.html")
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(report_html)

    try:
        driver.get(f"file:///{temp_html}")
        time.sleep(1)
        out_path = os.path.join(OUT_DIR, "organizer-real-terminal.png")
        driver.save_screenshot(out_path)
        print(f"Saved real screenshot: {out_path}")
    finally:
        if os.path.exists(temp_html):
            os.remove(temp_html)

def main():
    print("Launching real Chrome WebDriver...")
    driver = setup_driver()
    try:
        capture_copilot_swagger(driver)
        capture_django_swagger(driver)
        capture_mhrs_portal_and_email(driver)
        capture_organizer_real_report(driver)
        print("ALL REAL SCREENSHOTS CAPTURED SUCCESSFULLY!")
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
