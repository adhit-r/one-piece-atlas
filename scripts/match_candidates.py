"""
Match scraped fandom candidates to existing islands in data/onePieceData.ts and output a review CSV.

Usage:
  /path/to/python scripts/match_candidates.py

Outputs:
  data/mapping_review.csv
  data/mapping_summary.json
"""
import json
import re
import csv
from pathlib import Path
from difflib import SequenceMatcher

ROOT = Path(__file__).resolve().parents[1]
MAPPED_PATH = ROOT / "data" / "fandom_onepiece_mapped.jsonl"
TS_PATH = ROOT / "data" / "onePieceData.ts"
OUT_CSV = ROOT / "data" / "mapping_review.csv"
OUT_SUM = ROOT / "data" / "mapping_summary.json"


def parse_islands_from_ts(ts_path):
    text = ts_path.read_text(encoding='utf-8')
    # Find the islands array content
    m = re.search(r"islands\s*:\s*\[(.*?)\]\s*,\n\s*\w+\s*:", text, re.S)
    if not m:
        # fallback: try to find 'islands: [' up to '],\n    paths'
        m = re.search(r"islands\s*:\s*\[(.*?)\]\s*\n\s*\w", text, re.S)
    islands_block = m.group(1) if m else ''
    # Split top-level objects by '},' followed by newline and possibly spaces and '{'
    raw_objs = re.split(r"\},\s*\{", islands_block)
    islands = []
    for raw in raw_objs:
        r = raw
        # clean braces
        r = r.strip()
        if not r:
            continue
        r = r.strip(',\n ')
        # Add braces for easier parsing
        if not r.startswith('{'):
            r = '{' + r
        if not r.endswith('}'):
            r = r + '}'
        # Extract id, name, lat, lon, episodes
        id_m = re.search(r"id\s*:\s*['\"]([^'\"]+)['\"]", r)
        name_m = re.search(r"name\s*:\s*['\"]([^'\"]+)['\"]", r)
        lat_m = re.search(r"lat\s*:\s*([-\d\.]+)", r)
        lon_m = re.search(r"lon\s*:\s*([-\d\.]+)", r)
        ep_m = re.search(r"episodes\s*:\s*\[\s*(\d+)\s*,\s*(\d+)\s*\]", r)
        islands.append({
            'id': id_m.group(1) if id_m else None,
            'name': name_m.group(1) if name_m else None,
            'lat': float(lat_m.group(1)) if lat_m else None,
            'lon': float(lon_m.group(1)) if lon_m else None,
            'episodes': [int(ep_m.group(1)), int(ep_m.group(2))] if ep_m else None,
            'raw': r,
        })
    return islands


def similar(a, b):
    if not a or not b:
        return 0.0
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()


def load_mapped(path):
    items = []
    with path.open('r', encoding='utf-8') as f:
        for line in f:
            items.append(json.loads(line))
    return items


def best_match(candidate, islands):
    name = candidate.get('name') or ''
    best = None
    best_score = 0.0
    for isl in islands:
        score = max(similar(name, isl.get('name') or ''), similar(name, isl.get('id') or ''))
        if score > best_score:
            best_score = score
            best = isl
    return best, best_score


def main():
    islands = parse_islands_from_ts(TS_PATH)
    candidates = load_mapped(MAPPED_PATH)

    rows = []
    stats = {'total_candidates': len(candidates), 'matched_high': 0, 'matched_low': 0, 'unmatched': 0}

    for c in candidates:
        best, score = best_match(c, islands)
        cand_eps = c.get('episodes') or []
        cand_lat = c.get('lat')
        cand_lon = c.get('lon')
        existing_eps = best.get('episodes') if best else None
        action = 'add'
        if score >= 0.8:
            action = 'update'
            stats['matched_high'] += 1
        elif score >= 0.5:
            action = 'review'
            stats['matched_low'] += 1
        else:
            stats['unmatched'] += 1
        rows.append({
            'candidate_id': c.get('id'),
            'candidate_name': c.get('name'),
            'candidate_episodes': json.dumps(c.get('episodes') or []),
            'candidate_lat': cand_lat,
            'candidate_lon': cand_lon,
            'matched_id': best.get('id') if best else None,
            'matched_name': best.get('name') if best else None,
            'matched_episodes': json.dumps(existing_eps) if existing_eps else None,
            'match_score': round(score, 3),
            'suggested_action': action,
            'source': c.get('source'),
        })

    # write CSV
    with OUT_CSV.open('w', newline='', encoding='utf-8') as csvfile:
        fieldnames = list(rows[0].keys()) if rows else ['candidate_id','candidate_name']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)

    OUT_SUM.write_text(json.dumps(stats, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"Wrote {len(rows)} mapping rows to {OUT_CSV}")
    print("Summary:", stats)


if __name__ == '__main__':
    main()
