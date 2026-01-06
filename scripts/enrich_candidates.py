"""
Enrich top-N candidate additions using Wikidata and Wikipedia to find coordinates and descriptions.

Outputs:
 - data/onePieceData_enriched_top{N}.json
 - data/onePieceData_enriched_top{N}.csv

Usage:
  python scripts/enrich_candidates.py --top 50 --delay 0.2
"""
import argparse
import json
import time
from pathlib import Path
from typing import Dict, Any, Optional

import requests
import csv

ROOT = Path(__file__).resolve().parents[1]
ADDITIONS = ROOT / "data" / "onePieceData_additions.json"
OUT_JSON = ROOT / "data" / "onePieceData_enriched_top{n}.json"
OUT_CSV = ROOT / "data" / "onePieceData_enriched_top{n}.csv"

WIKIDATA_API = "https://www.wikidata.org/w/api.php"
WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php"
HEADERS = {"User-Agent": "GrandLineAtlas/1.0 (+https://github.com/your/repo)"}


def wbsearch(name: str) -> Optional[Dict[str, Any]]:
    params = {
        "action": "wbsearchentities",
        "search": name,
        "language": "en",
        "format": "json",
        "type": "item",
        "limit": 3,
    }
    r = requests.get(WIKIDATA_API, params=params, headers=HEADERS, timeout=10)
    r.raise_for_status()
    data = r.json()
    search = data.get("search", [])
    return search[0] if search else None


def wbgetentity(qid: str) -> Optional[Dict[str, Any]]:
    params = {"action": "wbgetentities", "ids": qid, "format": "json", "props": "claims|descriptions|labels"}
    r = requests.get(WIKIDATA_API, params=params, headers=HEADERS, timeout=10)
    r.raise_for_status()
    data = r.json()
    return data.get("entities", {}).get(qid)


def extract_coords_from_wikidata(entity: Dict[str, Any]) -> Optional[Dict[str, float]]:
    claims = entity.get("claims", {})
    p625 = claims.get("P625")
    if not p625:
        return None
    # take first value
    mainsnak = p625[0].get("mainsnak", {})
    datavalue = mainsnak.get("datavalue", {})
    value = datavalue.get("value")
    if value and isinstance(value, dict):
        return {"lat": float(value.get("latitude")), "lon": float(value.get("longitude"))}
    return None


def wiki_search(name: str) -> Optional[Dict[str, Any]]:
    params = {"action": "query", "list": "search", "srsearch": name, "format": "json", "srlimit": 3}
    r = requests.get(WIKIPEDIA_API, params=params, headers=HEADERS, timeout=10)
    r.raise_for_status()
    data = r.json()
    results = data.get("query", {}).get("search", [])
    return results[0] if results else None


def wiki_coords_from_pageid(pageid: int) -> Optional[Dict[str, float]]:
    params = {"action": "query", "prop": "coordinates|info|pageprops", "pageids": pageid, "format": "json"}
    r = requests.get(WIKIPEDIA_API, params=params, headers=HEADERS, timeout=10)
    r.raise_for_status()
    data = r.json()
    pages = data.get("query", {}).get("pages", {})
    page = next(iter(pages.values())) if pages else None
    if not page:
        return None
    coords = page.get("coordinates")
    if coords and len(coords) > 0:
        c = coords[0]
        return {"lat": float(c.get("lat")), "lon": float(c.get("lon"))}
    return None


def enrich_one(item: Dict[str, Any], delay: float = 0.2) -> Dict[str, Any]:
    name = item.get("name") or ""
    enriched = dict(item)
    enriched["coord_source"] = None

    # Try Wikidata
    try:
        wd = wbsearch(name)
        if wd:
            qid = wd.get("id")
            entity = wbgetentity(qid)
            coords = extract_coords_from_wikidata(entity) if entity else None
            desc = None
            if entity:
                desc = entity.get("descriptions", {}).get("en", {}).get("value")
            if coords:
                enriched["lat"] = coords["lat"]
                enriched["lon"] = coords["lon"]
                enriched["coord_source"] = "wikidata"
                enriched["wikidata_id"] = qid
                enriched["wikidata_description"] = desc
                time.sleep(delay)
                return enriched
    except Exception:
        pass

    # Try Wikipedia
    try:
        w = wiki_search(name)
        if w:
            pageid = w.get("pageid")
            coords = wiki_coords_from_pageid(pageid)
            snippet = w.get("snippet")
            enriched.setdefault("wiki_snippet", snippet)
            if coords:
                enriched["lat"] = coords["lat"]
                enriched["lon"] = coords["lon"]
                enriched["coord_source"] = "wikipedia"
                time.sleep(delay)
                return enriched
    except Exception:
        pass

    # Not found
    time.sleep(delay)
    return enriched


def main(top: int = 50, delay: float = 0.2):
    if not ADDITIONS.exists():
        print("Additions file not found; run generate_additions.py first")
        return
    with ADDITIONS.open('r', encoding='utf-8') as f:
        additions = json.load(f)

    # rank by number of episodes span (width) or episode count if available
    def eps_span(a):
        eps = a.get('episodes') or []
        if eps and len(eps) == 2:
            return eps[1] - eps[0]
        return 0

    additions_sorted = sorted(additions, key=eps_span, reverse=True)
    top_candidates = additions_sorted[:top]

    enriched = []
    csv_rows = []
    for it in top_candidates:
        e = enrich_one(it, delay=delay)
        enriched.append(e)
        csv_rows.append({
            'id': e.get('id'),
            'name': e.get('name'),
            'lat': e.get('lat'),
            'lon': e.get('lon'),
            'coord_source': e.get('coord_source'),
            'wikidata_id': e.get('wikidata_id') if 'wikidata_id' in e else '',
            'wikidata_description': e.get('wikidata_description') if 'wikidata_description' in e else '',
            'wiki_snippet': e.get('wiki_snippet', ''),
            'episodes': json.dumps(e.get('episodes') or []),
        })

    out_json = Path(str(OUT_JSON).format(n=top))
    out_csv = Path(str(OUT_CSV).format(n=top))

    with out_json.open('w', encoding='utf-8') as f:
        json.dump(enriched, f, ensure_ascii=False, indent=2)

    with out_csv.open('w', newline='', encoding='utf-8') as f:
        if csv_rows:
            fieldnames = list(csv_rows[0].keys())
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for r in csv_rows:
                writer.writerow(r)

    print(f"Wrote enriched data for top {top} to {out_json} and {out_csv}")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--top', type=int, default=50)
    parser.add_argument('--delay', type=float, default=0.2)
    args = parser.parse_args()
    main(top=args.top, delay=args.delay)
