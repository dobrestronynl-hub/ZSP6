"""Build the same static files served from the repository root on GitHub Pages."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "dist"
OUT.mkdir(exist_ok=True)
for filename in ("index.html", "oficjalna.html", "kreatywna.html"):
    shutil.copy2(ROOT / filename, OUT / filename)
if (OUT / "assets").exists():
    shutil.rmtree(OUT / "assets")
shutil.copytree(ROOT / "assets", OUT / "assets")
if (ROOT / "dodatki").is_dir():
    if (OUT / "dodatki").exists():
        shutil.rmtree(OUT / "dodatki")
    shutil.copytree(ROOT / "dodatki", OUT / "dodatki")
print("Built the three ZSP6 pages, assets/ and published dodatki/ when present into dist/.")
