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
print("Built index.html, oficjalna.html, kreatywna.html and assets/ into dist/.")
