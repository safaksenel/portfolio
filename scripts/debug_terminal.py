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
    driver.get("http://localhost:3000")
    time.sleep(2)

    buttons = driver.find_elements(By.TAG_NAME, "button")
    run_btn = None
    for b in buttons:
        if "Modeli" in b.text or "Run" in b.text:
            run_btn = b
            break

    print("Found run button:", run_btn.text if run_btn else "None")

    if run_btn:
        run_btn.click()
        print("Clicked run button!")
        for step in range(10):
            time.sleep(0.3)
            print(f"Step {step}: URL = {driver.current_url}")
            scanlines = driver.find_elements(By.CLASS_NAME, "terminal-scanlines")
            print(f"Step {step}: scanlines count = {len(scanlines)}")
            if len(scanlines) > 0:
                print(f"Step {step}: text = {scanlines[0].text[:80]}...")
            else:
                body = driver.find_elements(By.TAG_NAME, "body")
                print(f"Step {step}: body text = {body[0].text[:100] if body else 'No body'}")

    print("\nBrowser console logs:")
    for entry in driver.get_log("browser"):
        print(entry)

finally:
    driver.quit()
