import time
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

sys.stdout.reconfigure(encoding="utf-8")

opts = Options()
opts.add_argument("--headless=new")
opts.set_capability("goog:loggingPrefs", {"browser": "ALL"})

driver = webdriver.Chrome(options=opts)
try:
    print("Testing Desktop View (1920x1080)...")
    driver.set_window_size(1920, 1080)
    start_t = time.time()
    driver.get("http://localhost:3005")
    load_time = time.time() - start_t
    print(f"Page loaded in {load_time:.3f}s")
    time.sleep(1)

    print("Title:", driver.title)
    assert "Şafak Şenel" in driver.title, "Title does not contain candidate name"

    # 1. Skip to Content Link
    skip_links = driver.find_elements(By.XPATH, "//a[contains(@href, '#main-content')]")
    print(f"Skip to content link found: {len(skip_links) > 0}")
    assert len(skip_links) > 0, "Missing skip-to-content link"

    # 2. Hero Section checks
    body_text = driver.find_element(By.TAG_NAME, "body").text
    assert "Şafak Şenel" in body_text, "Name missing from Hero"
    assert "İstanbul • Hibrit / Remote" in body_text, "Location missing from Hero"
    assert "CV Görüntüle" in body_text, "CV CTA button missing"

    # 3. Check Console Errors
    logs = driver.get_log("browser")
    errors = [log for log in logs if log["level"] == "SEVERE"]
    print(f"Console errors: {len(errors)}")
    for err in errors:
        print("Console SEVERE:", err)
    assert len(errors) == 0, f"Found {len(errors)} console errors"

    # 4. Check Mobile Viewport (390x844 - iPhone 14)
    print("\nTesting Mobile View (390x844 iPhone)...")
    driver.set_window_size(390, 844)
    time.sleep(1)

    # Check mobile CV button
    mobile_cv_links = driver.find_elements(By.XPATH, "//header//a[contains(@href, '.pdf')]")
    print(f"Mobile direct CV links in header: {len(mobile_cv_links)}")
    assert len(mobile_cv_links) > 0, "Mobile direct CV button missing in header"

    # 5. Check Contact Form honeypot and labels
    print("\nTesting Contact Form Accessibility...")
    honeypot = driver.find_element(By.ID, "contact-honeypot")
    rect = honeypot.rect
    print(f"Honeypot position: x={rect['x']}, y={rect['y']}, width={rect['width']}, height={rect['height']}")
    assert rect["x"] < 0 or rect["width"] <= 1, "Honeypot not properly hidden/offscreen"

    for field_id in ["contact-name", "contact-email", "contact-subject", "contact-message"]:
        label = driver.find_elements(By.XPATH, f"//label[@for='{field_id}']")
        inp = driver.find_elements(By.ID, field_id)
        assert len(label) == 1 and len(inp) == 1, f"Missing htmlFor/id pair for {field_id}"
        print(f"Field {field_id} has matching label htmlFor: OK")

    # 6. Check Project Card demo buttons
    print("\nTesting Project Card links...")
    demo_links = driver.find_elements(By.XPATH, "//a[contains(@title, 'Canlı Demo') or contains(@title, 'Live Demo')]")
    print(f"Total live demo buttons rendered: {len(demo_links)}")
    for dl in demo_links:
        href = dl.get_attribute("href")
        print(f"Live demo href: {href}")
        assert not href.endswith("github.com/safaksenel"), f"Deceptive demo link detected: {href}"
        assert "blindhire-pcym.onrender.com" not in href, f"Dead 503 Render link detected: {href}"

    print("\n✅ ALL LIVE VERIFICATION CHECKS PASSED (100% SUCCESS)!")

finally:
    driver.quit()
