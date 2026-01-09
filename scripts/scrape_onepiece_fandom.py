"""
Scrape One Piece Fandom for place pages and extract infobox fields and episode mentions.

Usage:
  /path/to/python scripts/scrape_onepiece_fandom.py --limit 50

Notes:
 - Uses the MediaWiki API at https://onepiece.fandom.com/api.php
 - Respects a short delay between requests; set --delay to adjust.
 - Outputs JSONL to `data/fandom_onepiece_places.jsonl`.
 - This script extracts infobox (portable-infobox) fields when available and searches page text for episode numbers.
 - Always respect terms of service and rate limits when scraping; this script is conservative by default.
"""

import argparse
import json
import re
import time
from pathlib import Path
from typing import Dict, Any, List

import requests
from bs4 import BeautifulSoup

API_BASE = "https://onepiece.fandom.com/api.php"
HEADERS = {"User-Agent": "GrandLineAtlas/1.0 (+https://github.com/your/repo)"}
OUT_PATH = Path("data/fandom_onepiece_places.jsonl")

EPISODE_RE = re.compile(r"episode[s]?\s*(?:#?:)?\s*(\d{1,4})", re.I)
EPISODE_NUM_RE = re.compile(r"\b(\d{1,4})\b")
COORD_RE = re.compile(r"([-+]?\d{1,3}\.\d+)[,;\s]+([-+]?\d{1,3}\.\d+)")


def mw_get(params: Dict[str, Any]) -> Dict[str, Any]:
    params = {**params, "format": "json"}
    r = requests.get(API_BASE, params=params, headers=HEADERS, timeout=20)
    r.raise_for_status()
    return r.json()


def search_pages(query: str, limit: int = 50) -> List[Dict[str, Any]]:
    pages = []
    sroffset = 0
    while len(pages) < limit:
        params = {
            "action": "query",
            "list": "search",
            "srsearch": query,
            "srlimit": min(50, limit - len(pages)),
        }
        if sroffset:
            params["sroffset"] = sroffset
        res = mw_get(params)
        sr = res.get("query", {}).get("search", [])
        if not sr:
            break
        pages.extend(sr)
        # Handle continuation if present
        cont = res.get("continue") or {}
        if "sroffset" in cont:
            sroffset = cont["sroffset"]
        else:
            break
    return pages[:limit]


def fetch_parsed_html(pageid: int) -> str:
    res = mw_get({"action": "parse", "pageid": pageid, "prop": "text"})
    return res.get("parse", {}).get("text", {}).get("*", "")


def extract_infobox(html: str) -> Dict[str, Any]:
    soup = BeautifulSoup(html, "html.parser")
    inf = {}
    pi = soup.find(class_="portable-infobox")
    if not pi:
        # Try legacy infobox
        tbl = soup.find("table", class_=lambda x: x and "infobox" in x)
        if not tbl:
            return inf
        # fall back to rows
        rows = tbl.find_all("tr")
        for r in rows:
            th = r.find("th")
            td = r.find("td")
            if th and td:
                key = th.get_text(" ", strip=True)
                val = td.get_text(" ", strip=True)
                inf[key] = val
        return inf

    # Portable infobox uses list-like items
    for li in pi.find_all("div", class_="pi-data"):
        key_el = li.find(class_="pi-data-label")
        val_el = li.find(class_="pi-data-value")
        if key_el and val_el:
            key = key_el.get_text(" ", strip=True)
            val = val_el.get_text(" ", strip=True)
            inf[key] = val
    return inf


def extract_coords_from_html(html: str) -> Dict[str, float]:
    soup = BeautifulSoup(html, "html.parser")
    # look for 'geo-dec' or 'coordinates'
    geo = soup.select_one(".geo-dec, .coordinates, .latitude, .longitude")
    if geo and geo.get_text(strip=True):
        txt = geo.get_text(" ", strip=True)
        m = COORD_RE.search(txt)
        if m:
            return {"lat": float(m.group(1)), "lon": float(m.group(2))}
    # fallback: search anywhere in text
    m = COORD_RE.search(soup.get_text(" ", strip=True))
    if m:
        return {"lat": float(m.group(1)), "lon": float(m.group(2))}
    return {}


def extract_episode_mentions(text: str) -> List[int]:
    found = set()
    for m in EPISODE_RE.finditer(text):
        try:
            ep = int(m.group(1))
            if 1 <= ep <= 10000:
                found.add(ep)
        except Exception:
            continue
    # fallback: look for 'Episode X' patterns
    if not found:
        for m in EPISODE_NUM_RE.finditer(text):
            n = int(m.group(1))
            if 1 <= n <= 2000:
                found.add(n)
    return sorted(found)


def page_url_from_title(title: str) -> str:
    return f"https://onepiece.fandom.com/wiki/{title.replace(' ', '_')}"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--query", type=str, default="island|village|port|town|isle|island", help="Search query for MediaWiki search")
    parser.add_argument("--limit", type=int, default=50, help="Max pages to fetch")
    parser.add_argument("--delay", type=float, default=0.6, help="Delay between page requests (s)")
    args = parser.parse_args()

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    pages = search_pages(args.query, limit=args.limit)
    print(f"Found {len(pages)} search hits for query '{args.query}'")

    results = []
    for i, p in enumerate(pages, 1):
        pageid = p.get("pageid") or p.get("id")
        title = p.get("title")
        snippet = p.get("snippet", "")
        print(f"[{i}/{len(pages)}] Fetching {title} ({pageid})")
        try:
            html = fetch_parsed_html(pageid)
            infobox = extract_infobox(html)
            coords = extract_coords_from_html(html)
            ep_mentions = extract_episode_mentions(html + "\n" + snippet)

            item = {
                "pageid": pageid,
                "title": title,
                "url": page_url_from_title(title),
                "infobox": infobox,
                "coords": coords,
                "episode_mentions": ep_mentions,
                "snippet": snippet,
            }
            results.append(item)
        except Exception as e:
            print("  Error fetching or parsing:", e)
        time.sleep(args.delay)

    # Write raw scraped entries
    with OUT_PATH.open("w", encoding="utf-8") as f:
        for r in results:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    print(f"Wrote {len(results)} entries to {OUT_PATH}")

    # --- Map to preliminary island model and deduplicate ---
    mapped_path = OUT_PATH.parent / "fandom_onepiece_mapped.jsonl"
    seen = {}

    def slugify(t: str) -> str:
        return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")

    def map_item(it: Dict[str, Any]) -> Dict[str, Any]:
        title = it.get("title") or ""
        inf = it.get("infobox") or {}
        eps = it.get("episode_mentions") or []
        coords = it.get("coords") or {}
        # find arc-like field
        arc = None
        for k in inf.keys():
            if "arc" in k.lower():
                arc = inf.get(k)
                break
        episodes = []
        if eps:
            episodes = [min(eps), max(eps)]
        mapped = {
            "id": slugify(title),
            "name": title,
            "arc": arc,
            "episodes": episodes,
            "lat": coords.get("lat"),
            "lon": coords.get("lon"),
            "source": it.get("url"),
            "infobox": inf,
        }
        return mapped

    for item in results:
        m = map_item(item)
        if not m["id"]:
            # fallback to title-based id
            m["id"] = slugify(item.get("title") or "unknown")
        if m["id"] in seen:
            # merge episodes and coords when possible
            existing = seen[m["id"]]
            if m.get("episodes") and existing.get("episodes"):
                existing_eps = existing.get("episodes")
                existing["episodes"] = [min(existing_eps[0], m["episodes"][0]), max(existing_eps[1], m["episodes"][1])]
            elif m.get("episodes"):
                existing["episodes"] = m["episodes"]
            if not existing.get("lat") and m.get("lat"):
                existing["lat"] = m.get("lat")
                existing["lon"] = m.get("lon")
            # keep arcs and infobox from existing if present
            if not existing.get("arc") and m.get("arc"):
                existing["arc"] = m.get("arc")
        else:
            seen[m["id"]] = m

    mapped_list = list(seen.values())
    with mapped_path.open("w", encoding="utf-8") as f:
        for m in mapped_list:
            f.write(json.dumps(m, ensure_ascii=False) + "\n")

    print(f"Wrote {len(mapped_list)} mapped entries to {mapped_path}")


if __name__ == "__main__":
    main()
