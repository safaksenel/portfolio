import os
import re
import glob
import sys
import urllib.request
import urllib.error

sys.stdout.reconfigure(encoding="utf-8")

urls = set()
for filepath in glob.glob("frontend/src/**/*.ts*", recursive=True):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        found = re.findall(r'https?://[^\s"\'`]+', content)
        for u in found:
            u = u.rstrip(".,;)]}")
            urls.add(u)

print(f"Total unique URLs found: {len(urls)}")
broken = []
for u in sorted(urls):
    if any(ignore in u for ignore in ["schema.org", "openapi.vercel.sh", "w3.org", "img.shields.io", "fonts.googleapis", "fonts.gstatic"]):
        continue
    req = urllib.request.Request(
        u,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    )
    try:
        with urllib.request.urlopen(req, timeout=7) as resp:
            print(f"[OK] {resp.status} -> {u}")
    except urllib.error.HTTPError as e:
        if e.code == 999: # LinkedIn anti-bot blocks automated scripts, which is normal
            print(f"[AUTH/BOT-999] {e.code} -> {u}")
        elif e.code in (401, 403):
            print(f"[RESTRICTED-{e.code}] -> {u}")
        else:
            broken.append((u, e.code))
            print(f"[BROKEN] {e.code} -> {u}")
    except Exception as e:
        broken.append((u, str(e)))
        print(f"[FAIL] {u} -> {e}")

print("\n=== SUMMARY OF BROKEN LINKS ===")
if not broken:
    print("0 broken links! All external resources verified.")
else:
    for b in broken:
        print(b)
