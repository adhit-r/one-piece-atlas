"""
Generate draft JSON additions for candidates marked 'add' in mapping_review.csv.

Outputs:
 - data/onePieceData_additions.json (array of island objects draft)
 - data/onePieceData_additions_preview.csv (quick CSV preview)

Usage:
  python scripts/generate_additions.py
"""
import csv
import json
from pathlib import Path
from typing import Dict, Any

ROOT = Path(__file__).resolve().parents[1]
MAPPING_CSV = ROOT / "data" / "mapping_review.csv"
MAPPED_JSONL = ROOT / "data" / "fandom_onepiece_mapped.jsonl"
OUT_JSON = ROOT / "data" / "onePieceData_additions.json"
OUT_CSV = ROOT / "data" / "onePieceData_additions_preview.csv"

# Helper heuristics
def guess_visual(name: str) -> str:
    n = (name or "").lower()
    if "island" in n or "jima" in n or "isle" in n:
        return "island"
    if "village" in n or "town" in n or "city" in n or "port" in n:
        return "city"
    return "island"


def extract_arc_from_infobox(infobox: Dict[str, Any]) -> str | None:
    for k, v in infobox.items():
        kl = k.lower()
        if "arc" in kl or "saga" in kl or "story" in kl or "arc/" in kl:
            return v
    return None


def load_mapped() -> Dict[str, Dict[str, Any]]:
    res = {}
    if not MAPPED_JSONL.exists():
        return res
    with MAPPED_JSONL.open('r', encoding='utf-8') as f:
        for line in f:
            try:
                obj = json.loads(line)
                if obj.get('title'):
                    slug = obj.get('title').lower().replace(' ', '-').replace('/', '-').replace("\'", '')
                else:
                    slug = obj.get('pageid')
                res[slug] = obj
            except Exception:
                continue
    return res


def main():
    mapped = load_mapped()

    additions = []
    preview_rows = []

    with MAPPING_CSV.open('r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            if r.get('suggested_action') != 'add':
                continue
            cid = r.get('candidate_id')
            name = r.get('candidate_name') or ''
            eps = []
            try:
                eps = json.loads(r.get('candidate_episodes') or '[]')
            except Exception:
                eps = []
            lat = r.get('candidate_lat')
            lon = r.get('candidate_lon')
            lat_f = float(lat) if lat and lat != '' else None
            lon_f = float(lon) if lon and lon != '' else None
            source = r.get('source')

            # Try to find infobox
            lookup_key = cid
            info = mapped.get(lookup_key)
            arc = None
            if info and isinstance(info.get('infobox'), dict):
                arc = extract_arc_from_infobox(info.get('infobox'))

            entry = {
                'id': cid,
                'name': name,
                'sea': None,
                'lat': lat_f,
                'lon': lon_f,
                'arc': arc,
                'episodes': [min(eps), max(eps)] if eps else [],
                'characters': [],
                'importance': 'Minor',
                'visual': guess_visual(name),
                'source': source,
                'note': 'auto-generated draft; verify and enrich before committing',
            }
            additions.append(entry)
            preview_rows.append({
                'id': cid,
                'name': name,
                'episodes': json.dumps(entry['episodes']),
                'lat': entry['lat'],
                'lon': entry['lon'],
                'arc': arc,
                'source': source,
            })

    # write json
    with OUT_JSON.open('w', encoding='utf-8') as f:
        json.dump(additions, f, ensure_ascii=False, indent=2)

    # write csv preview
    if preview_rows:
        with OUT_CSV.open('w', newline='', encoding='utf-8') as f:
            fieldnames = list(preview_rows[0].keys())
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for row in preview_rows:
                writer.writerow(row)

    print(f'Wrote {len(additions)} draft additions to {OUT_JSON}')
    print(f'Wrote preview CSV to {OUT_CSV}')


if __name__ == '__main__':
    main()
