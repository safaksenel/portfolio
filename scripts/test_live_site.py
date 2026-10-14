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
    print("Navigating to https://portfolio-q663.vercel.app...")
    driver.get("https://portfolio-q663.vercel.app")
    time.sleep(3)

    print("Current URL:", driver.current_url)
    print("Title:", driver.title)

    buttons = driver.find_elements(By.TAG_NAME, "button")
    run_btn = None
    for b in buttons:
        if "Modeli" in b.text or "Run" in b.text:
            run_btn = b
            break

    print("Found run button:", run_btn.text if run_btn else "None")

    if run_btn:
        print("Clicking run button on LIVE site...")
        run_btn.click()
        print("Clicked!")

        for step in range(12):
            time.sleep(0.4)
            print(f"Step {step}: URL = {driver.current_url}")
            body = driver.find_elements(By.TAG_NAME, "body")
            body_text = body[0].text if body else ""
            if "This page couldn't load" in body_text:
                print(">>> CRASH SCREEN DETECTED: 'This page couldn't load'")
                print(body_text[:300])
                break
            else:
                scanlines = driver.find_elements(By.CLASS_NAME, "terminal-scanlines")
                if scanlines:
                    print(f"Step {step}: Terminal text length = {len(scanlines[0].text)}, has JSON = {'{' in scanlines[0].text}")

    print("\nBrowser console logs:")
    logs = driver.get_log("browser")
    for log in logs:
        print(log)

    driver.save_screenshot("C:/Users/PC/.gemini/antigravity/brain/5929b10c-68a5-4c60-bb88-1787c3481545/live_test_screenshot.png")
    print("Saved live screenshot.")

finally:
    driver.quit()
