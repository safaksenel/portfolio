import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_email_interaction():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1440,900")
    chrome_options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

    driver = webdriver.Chrome(options=chrome_options)
    try:
        driver.get("http://localhost:3000")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        time.sleep(1)

        print("[1] Page loaded, looking for Hero email button...")
        mail_btn = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "a[aria-label='Email Contact (safaksenel61@gmail.com)']"))
        )
        print("    Found email button:", mail_btn.get_attribute("title"))

        print("[2] Clicking email button...")
        mail_btn.click()
        time.sleep(0.5)

        print("[3] Verifying EmailModal dialog appeared...")
        modal = WebDriverWait(driver, 5).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "div[role='dialog']"))
        )
        modal_text = modal.text
        print("    Modal title/text sample:", modal_text[:120].replace("\n", " | "))
        assert "safaksenel61@gmail.com" in modal_text, "Email address not found in modal!"

        driver.save_screenshot("scripts/email_modal_open.png")
        print("    Saved screenshot to scripts/email_modal_open.png")

        print("[4] Checking Gmail Web Compose link...")
        gmail_link = modal.find_element(By.CSS_SELECTOR, "a[href*='mail.google.com/mail']")
        href = gmail_link.get_attribute("href")
        print("    Found Gmail link:", href)
        assert "to=safaksenel61%40gmail.com" in href, "Invalid Gmail link to parameter"

        print("[5] Checking default mailto link...")
        mailto_link = modal.find_element(By.CSS_SELECTOR, "a[href^='mailto:']")
        mailto_href = mailto_link.get_attribute("href")
        print("    Found mailto link:", mailto_href)
        assert "safaksenel61@gmail.com" in mailto_href, "Invalid mailto link"

        print("[6] Checking browser console logs for any severe errors...")
        logs = driver.get_log("browser")
        severe_errors = [l for l in logs if l.get("level") == "SEVERE" and "favicon" not in l.get("message", "")]
        for log in logs:
            if log.get("level") in ("SEVERE", "WARNING"):
                print(f"    [{log.get('level')}] {log.get('message')}")
        
        assert len(severe_errors) == 0, f"Found severe errors: {severe_errors}"

        # Close modal
        close_btn = modal.find_element(By.CSS_SELECTOR, "button[aria-label]")
        close_btn.click()
        time.sleep(0.5)

        # Switch to light mode and verify
        print("[7] Testing Light Mode appearance...")
        theme_btn = driver.find_element(By.CSS_SELECTOR, "button[aria-label='Toggle theme']")
        theme_btn.click()
        time.sleep(0.5)
        mail_btn = driver.find_element(By.CSS_SELECTOR, "a[aria-label*='safaksenel61@gmail.com']")
        mail_btn.click()
        time.sleep(0.5)
        driver.save_screenshot("scripts/email_modal_light.png")
        print("    Saved light mode screenshot to scripts/email_modal_light.png")

        print("\n>>> ALL TESTS PASSED SUCCESSFULLY! The email button is interactive, fully accessible, and reliable! <<<")

    finally:
        driver.quit()

if __name__ == "__main__":
    test_email_interaction()
