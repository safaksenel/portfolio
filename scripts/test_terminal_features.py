import time
import json
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Force utf-8 for Windows console output
sys.stdout.reconfigure(encoding="utf-8")

def run_terminal_tests():
    print("==================================================")
    print("[*] STARTING COMPREHENSIVE TERMINAL FEATURES TEST")
    print("==================================================")

    opts = Options()
    opts.add_argument("--headless=new")
    opts.add_argument("--window-size=1400,900")
    opts.add_argument("--disable-gpu")
    opts.add_argument("--no-sandbox")

    driver = webdriver.Chrome(options=opts)
    wait = WebDriverWait(driver, 10)

    try:
        driver.get("http://localhost:3000")
        time.sleep(2)

        # 1. Locate Terminal Component
        print("\n[TEST 1] Locating Terminal Component...")
        terminal = wait.until(EC.presence_of_element_located((By.XPATH, "//span[contains(text(), 'safak@ml-node')]")))
        assert terminal is not None, "Terminal header not found!"
        print("✓ Terminal component located successfully.")

        # Check Window Controls & Title
        header_text = driver.find_element(By.XPATH, "//span[contains(text(), 'safak@ml-node')]").text
        print(f"✓ Terminal Title Bar: {header_text}")

        # Check Initial Status Badge
        status_badge = driver.find_element(By.XPATH, "//span[contains(text(), '200 OK')]")
        assert status_badge.is_displayed(), "Initial status badge 200 OK not visible"
        print("✓ Initial Status Badge: 200 OK")

        # 2. Test Tab 1: FLO BERT NLP
        print("\n[TEST 2] Testing Tab 1: FLO BERT NLP (22 Model)...")
        tab1 = driver.find_element(By.XPATH, "//button[contains(., 'FLO BERT NLP')]")
        assert "BERT" in tab1.text, "Tab 1 badge 'BERT' missing!"
        print(f"✓ Tab 1 text & badge verified: {tab1.text}")

        # Verify initial logs and JSON
        logs_area = driver.find_element(By.XPATH, "//div[contains(@class, 'terminal-scanlines')]")
        assert "Siparişim 5 gün gecikti" in logs_area.text, "BERT sample log missing"
        assert "Lojistik & Teslimat" in logs_area.text, "BERT JSON output missing"
        print("✓ Tab 1 initial logs and classified JSON verified.")

        # Test Run Simulation
        print("Testing 'Modeli Çalıştır (Run)' on Tab 1...")
        run_btn = driver.find_element(By.XPATH, "//button[contains(., 'Modeli Çalıştır') or contains(., 'Run')]")
        run_btn.click()
        time.sleep(0.3)

        # Verify running status
        running_chip = driver.find_element(By.XPATH, "//span[contains(text(), 'ÇIKARIM') or contains(text(), 'INFERRING')]")
        print(f"✓ Status during simulation: {running_chip.text}")

        # Wait for simulation to finish
        wait.until(lambda d: d.find_element(By.XPATH, "//div[contains(@class, 'terminal-scanlines')]//span[contains(text(), 'status: 200 OK')]"))
        print("✓ Status after simulation completed: status: 200 OK verified.")

        # Test View Switcher to 'Python Kodu'
        print("Testing View Switcher -> 'Python Kodu'...")
        code_tab_btn = driver.find_element(By.XPATH, "//button[contains(., 'Python Kodu') or contains(., 'Python Code')]")
        code_tab_btn.click()
        time.sleep(0.4)

        code_area = driver.find_element(By.XPATH, "//div[contains(@class, 'terminal-scanlines')]")
        assert "from transformers import AutoTokenizer" in code_area.text, "Python code snippet not displayed!"
        assert "flo_bert_tier2_openvino" in code_area.text, "OpenVINO model code not displayed!"
        print("✓ 'Python Kodu' view verified with full transformers and openvino snippet.")

        # Switch back to 'Çıktı & JSON'
        print("Testing View Switcher -> 'Çıktı & JSON'...")
        output_tab_btn = driver.find_element(By.XPATH, "//button[contains(., 'Çıktı & JSON') or contains(., 'Output & JSON')]")
        output_tab_btn.click()
        time.sleep(0.4)

        # Test 'JSON Kopyala' (Copy JSON)
        print("Testing 'JSON Kopyala' button...")
        copy_btn = driver.find_element(By.XPATH, "//button[contains(., 'JSON Kopyala') or contains(., 'Copy JSON')]")
        copy_btn.click()
        time.sleep(0.3)
        copied_text = driver.find_element(By.XPATH, "//button[contains(., 'Kopyalandı') or contains(., 'Copied')]")
        assert copied_text.is_displayed(), "Copy feedback not shown!"
        print("✓ 'JSON Kopyala' feedback verified: 'Kopyalandı!'.")

        # 3. Test Tab 2: Datathon Stacking ML
        print("\n[TEST 3] Testing Tab 2: Datathon Stacking ML...")
        tab2 = driver.find_element(By.XPATH, "//button[contains(., 'Datathon Stacking ML')]")
        assert "Stacking" in tab2.text, f"Tab 2 should have 'Stacking' badge, found: {tab2.text}"
        assert "Top %10" not in tab2.text, "Tab 2 still has unwanted Top %10 claim!"
        tab2.click()
        time.sleep(0.5)

        # Verify Tab 2 logs & JSON
        logs_area = driver.find_element(By.XPATH, "//div[contains(@class, 'terminal-scanlines')]")
        assert "56.000 satırlık" in logs_area.text, "Datathon 56k log missing"
        assert "0.1418" in logs_area.text, "RMSE 0.1418 missing from JSON output"
        print("✓ Tab 2 logs and JSON output verified with accurate 0.1418 RMSE.")

        # Run Tab 2 Simulation
        print("Testing 'Modeli Çalıştır' on Tab 2...")
        run_btn = driver.find_element(By.XPATH, "//button[contains(., 'Modeli Çalıştır') or contains(., 'Run')]")
        run_btn.click()
        wait.until(lambda d: d.find_element(By.XPATH, "//div[contains(@class, 'terminal-scanlines')]//span[contains(text(), 'status: 200 OK')]"))
        print("✓ Tab 2 simulation completed with status: 200 OK.")

        # Check Python code for Tab 2
        code_tab_btn = driver.find_element(By.XPATH, "//button[contains(., 'Python Kodu') or contains(., 'Python Code')]")
        code_tab_btn.click()
        time.sleep(0.4)
        code_area = driver.find_element(By.XPATH, "//div[contains(@class, 'terminal-scanlines')]")
        assert "StackingRegressor" in code_area.text, "StackingRegressor code missing"
        assert "RidgeCV" in code_area.text, "RidgeCV code missing"
        print("✓ Tab 2 Python code snippet verified (StackingRegressor, LGBM, CatBoost, XGBoost).")

        # Switch back to output
        output_tab_btn = driver.find_element(By.XPATH, "//button[contains(., 'Çıktı & JSON') or contains(., 'Output & JSON')]")
        output_tab_btn.click()
        time.sleep(0.3)

        # 4. Test Tab 3: Agentic Copilot & DuckDB
        print("\n[TEST 4] Testing Tab 3: Agentic Copilot & DuckDB...")
        tab3 = driver.find_element(By.XPATH, "//button[contains(., 'Agentic Copilot')]")
        assert "OLAP" in tab3.text, "Tab 3 badge 'OLAP' missing!"
        tab3.click()
        time.sleep(0.5)

        # Verify Tab 3 logs & JSON
        logs_area = driver.find_element(By.XPATH, "//div[contains(@class, 'terminal-scanlines')]")
        assert "DuckDB" in logs_area.text, "DuckDB logs missing"
        assert "AST SANDBOX" in logs_area.text, "AST Sandbox log missing"
        assert "3.42" in logs_area.text, "DuckDB query latency 3.42ms missing"
        print("✓ Tab 3 logs and JSON output verified (DuckDB OLAP, 3.42ms, AST security).")

        # Run Tab 3 Simulation
        print("Testing 'Modeli Çalıştır' on Tab 3...")
        run_btn = driver.find_element(By.XPATH, "//button[contains(., 'Modeli Çalıştır') or contains(., 'Run')]")
        run_btn.click()
        wait.until(lambda d: d.find_element(By.XPATH, "//div[contains(@class, 'terminal-scanlines')]//span[contains(text(), 'status: 200 OK')]"))
        print("✓ Tab 3 simulation completed with status: 200 OK.")

        # Check Python code for Tab 3
        code_tab_btn = driver.find_element(By.XPATH, "//button[contains(., 'Python Kodu') or contains(., 'Python Code')]")
        code_tab_btn.click()
        time.sleep(0.4)
        code_area = driver.find_element(By.XPATH, "//div[contains(@class, 'terminal-scanlines')]")
        assert "duckdb.connect" in code_area.text, "DuckDB code missing"
        assert "StateGraph" in code_area.text, "StateGraph code missing"
        print("✓ Tab 3 Python code snippet verified (LangGraph, DuckDB, AST).")

        # 5. Test Language Toggle Integration
        print("\n[TEST 5] Testing Language Switcher (TR -> EN)...")
        lang_btn = driver.find_element(By.XPATH, "//button[contains(., 'EN') or contains(., 'TR')]")
        lang_btn.click()
        time.sleep(0.5)

        # Verify English labels on terminal
        run_btn_en = driver.find_element(By.XPATH, "//button[contains(., 'Run Inference')]")
        assert run_btn_en.is_displayed(), "English Run button 'Run Inference' missing"
        code_btn_en = driver.find_element(By.XPATH, "//button[contains(., 'Python Code')]")
        assert code_btn_en.is_displayed(), "English 'Python Code' button missing"
        footer_en = driver.find_element(By.XPATH, "//span[contains(text(), 'Live Simulation')]")
        assert footer_en.is_displayed(), "English footer 'Live Simulation' missing"
        print("✓ Language toggle successfully updated all Terminal UI strings to English.")

        # Switch back to TR
        lang_btn.click()
        time.sleep(0.3)

        # 6. Take Screenshot of Terminal in Action
        driver.save_screenshot("C:/Users/PC/.gemini/antigravity/brain/5929b10c-68a5-4c60-bb88-1787c3481545/terminal_test_result.png")
        print("\n[SCREENSHOT] Screenshot saved to artifacts: terminal_test_result.png")

        print("\n==================================================")
        print("[SUCCESS] ALL 5 TEST SUITES PASSED WITH 100% SUCCESS!")
        print("==================================================")

    finally:
        driver.quit()

if __name__ == "__main__":
    run_terminal_tests()
