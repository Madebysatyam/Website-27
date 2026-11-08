#!/usr/bin/env python3
"""Validate the design system and copy the static preview to dist/."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parent
DIST = REPO / "dist"
FONTS = ROOT / "fonts"
CSS = ROOT / "css"

REQUIRED_FONTS = [
    "PPNeueMontrealText-Book.woff2",
    "PPNeueMontrealText-Book.otf",
    "PPNeueMontreal-Medium.woff2",
    "PPNeueMontreal-Medium.otf",
    "PPNeueMontreal-Regular.woff2",
    "PPNeueMontreal-Regular.otf",
    "PPNeueMontreal-Book.woff2",
    "PPNeueMontreal-Book.otf",
    "JetBrainsMono-Regular.woff2",
    "JetBrainsMono-OFL.txt",
    "LICENSE-NOTE",
]

REQUIRED_CSS = ["fonts.css", "tokens.css", "styles.css", "components.css", "preview.css"]


def main() -> int:
    script = Path(__file__).resolve().parent / "verify-tokens.py"
    subprocess.check_call([sys.executable, str(script)])

    missing = [name for name in REQUIRED_FONTS if not (FONTS / name).is_file()]
    missing += [name for name in REQUIRED_CSS if not (CSS / name).is_file()]
    if missing:
        raise SystemExit("missing files: " + ", ".join(missing))

    fonts_css = (CSS / "fonts.css").read_text()
    if "fonts.googleapis.com" in fonts_css or "fonts.gstatic.com" in fonts_css:
        raise SystemExit("fonts.css must self-host JetBrains Mono, not load a CDN")
    for needle in (
        "PPNeueMontrealText-Book.woff2",
        "PPNeueMontreal-Medium.woff2",
        "JetBrainsMono-Regular.woff2",
    ):
        if needle not in fonts_css:
            raise SystemExit(f"fonts.css does not reference {needle}")
    text_face = fonts_css.split('font-family: "PP Neue Montreal Text"', 1)[1].split("@font-face", 1)[0]
    if "PPNeueMontreal-Book.woff2" in text_face or "PPNeueMontrealText-Book.woff2" not in text_face:
        raise SystemExit("body face must be PP Neue Montreal Text Book")

    preview = (ROOT / "preview.html").read_text()
    for href in (
        "css/fonts.css",
        "css/tokens.css",
        "css/styles.css",
        "css/components.css",
        "css/preview.css",
    ):
        if href not in preview:
            raise SystemExit(f"preview.html missing {href}")

    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()
    for name in ("preview.html", "index.html"):
        shutil.copy2(ROOT / name, DIST / name)
    shutil.copytree(CSS, DIST / "css")
    shutil.copytree(FONTS, DIST / "fonts")
    print(f"built {DIST}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
