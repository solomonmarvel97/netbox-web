#!/usr/bin/env python3
"""Write public/downloads/manifest.json from packaged desktop artifacts."""

from __future__ import annotations

import json
import re
import sys
from datetime import UTC, datetime
from pathlib import Path

WEB_ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS_DIR = WEB_ROOT / "public" / "downloads"
PACKAGE_JSON = WEB_ROOT / "package.json"
WEB_CONFIG = WEB_ROOT / "config" / "web.json"

INSTALLER_SUFFIXES = {".dmg", ".zip", ".exe", ".appimage", ".deb"}


def load_product_meta() -> tuple[str, str]:
    version = "0.0.0"
    product_name = "Netbox"

    if PACKAGE_JSON.is_file():
        payload = json.loads(PACKAGE_JSON.read_text(encoding="utf-8"))
        version = payload.get("version", version)

    if WEB_CONFIG.is_file():
        payload = json.loads(WEB_CONFIG.read_text(encoding="utf-8"))
        product_name = payload.get("app", {}).get("name", product_name)

    return product_name, version


def classify_artifact(filename: str) -> dict[str, str]:
    lowered = filename.lower()

    if lowered.endswith(".dmg"):
        platform = "macOS"
        format_label = "DMG"
        arch = "Apple Silicon" if "arm64" in lowered else "Intel" if "x64" in lowered else "macOS"
        return {
            "platform": platform,
            "format": format_label,
            "arch": arch,
            "label": f"{platform} ({arch})",
            "sort": "1",
        }

    if lowered.endswith("-mac.zip") or (lowered.endswith(".zip") and "mac" in lowered):
        platform = "macOS"
        arch = "Apple Silicon" if "arm64" in lowered else "macOS"
        return {
            "platform": platform,
            "format": "ZIP",
            "arch": arch,
            "label": f"{platform} ({arch}) ZIP",
            "sort": "2",
        }

    if lowered.endswith(".exe"):
        arch = "x64" if "x64" in lowered or "64" in lowered else "Windows"
        return {
            "platform": "Windows",
            "format": "Installer",
            "arch": arch,
            "label": "Windows",
            "sort": "3",
        }

    if lowered.endswith(".appimage"):
        arch = "x64" if "x64" in lowered else "Linux"
        return {
            "platform": "Linux",
            "format": "AppImage",
            "arch": arch,
            "label": "Linux AppImage",
            "sort": "4",
        }

    if lowered.endswith(".deb"):
        arch = "amd64" if "amd64" in lowered else "Linux"
        return {
            "platform": "Linux",
            "format": "deb",
            "arch": arch,
            "label": "Linux deb",
            "sort": "5",
        }

    return {
        "platform": "Desktop",
        "format": Path(filename).suffix.lstrip(".").upper() or "File",
        "arch": "",
        "label": filename,
        "sort": "9",
    }


def build_manifest() -> dict[str, object]:
    product_name, version = load_product_meta()
    artifacts: list[dict[str, object]] = []

    for path in sorted(DOWNLOADS_DIR.iterdir()):
        if not path.is_file():
            continue
        if path.suffix.lower() not in INSTALLER_SUFFIXES:
            continue

        meta = classify_artifact(path.name)
        artifact_id = re.sub(r"[^a-z0-9]+", "-", path.stem.lower()).strip("-")
        artifacts.append(
            {
                "id": artifact_id,
                "platform": meta["platform"],
                "arch": meta["arch"],
                "format": meta["format"],
                "label": meta["label"],
                "filename": path.name,
                "href": f"/downloads/{path.name}",
                "sizeBytes": path.stat().st_size,
                "sort": meta["sort"],
            }
        )

    artifacts.sort(key=lambda item: (item["sort"], item["filename"]))

    return {
        "productName": product_name,
        "version": version,
        "generatedAt": datetime.now(UTC).isoformat(),
        "artifacts": artifacts,
    }


def main() -> int:
    DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)
    manifest_path = DOWNLOADS_DIR / "manifest.json"
    manifest = build_manifest()
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    count = len(manifest["artifacts"])
    print(f"Wrote {manifest_path} ({count} artifact{'s' if count != 1 else ''})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
