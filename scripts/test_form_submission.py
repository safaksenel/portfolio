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
    print("Navigating to http://localhost:3000...")
    driver.get("http://localhost:3000")
    time.sleep(2)

    # Scroll to contact form
    contact = driver.find_element(By.ID, "contact")
    driver.execute_script("arguments[0].scrollIntoView(true);", contact)
    time.sleep(1)

    print("Filling form fields...")
    name_input = driver.find_element(By.ID, "contact-name")
    name_input.clear()
    name_input.send_keys("Ahmet Test")

    email_input = driver.find_element(By.ID, "contact-email")
    email_input.clear()
    email_input.send_keys("test@example.com")

    subj_input = driver.find_element(By.ID, "contact-subject")
    subj_input.clear()
    subj_input.send_keys("Teknik Mülakat Daveti")

    msg_input = driver.find_element(By.ID, "contact-message")
    msg_input.clear()
    msg_input.send_keys("Merhaba Şafak Bey, portfolyonuzu inceledik ve çok beğendik. Görüşmek isteriz.")

    print("Clicking submit button...")
    submit_btn = driver.find_element(By.XPATH, "//form//button[@type='submit']")
    submit_btn.click()

    time.sleep(2)

    # Check for success message
    body_text = driver.find_element(By.TAG_NAME, "body").text
    print("Has success text:", "Mesajınız Alındı!" in body_text or "Message Received!" in body_text)
    assert "Mesajınız Alındı!" in body_text or "Message Received!" in body_text, "Form did not submit successfully"

    # Check console logs
    print("\nBrowser console logs:")
    logs = driver.get_log("browser")
    severe_errors = [l for l in logs if l["level"] == "SEVERE"]
    for l in logs:
        print(f"[{l['level']}] {l['message']}")

    print(f"\nTotal severe errors: {len(severe_errors)}")
    assert len(severe_errors) == 0, "Console errors detected on form submission"
    print("\n✅ FORM SUBMISSION PASSED WITH ZERO CONSOLE ERRORS!")

finally:
    driver.quit()
