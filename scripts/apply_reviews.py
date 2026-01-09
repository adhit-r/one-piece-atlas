"""
Apply reviewed CSV and produce verified additions JSON.
Reads: data/onePieceData_disambiguated_top50_review.csv
Writes: data/onePieceData_additions_verified.json
"""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IN_CSV = ROOT / 'data' / 'onePieceData_disambiguated_top50_review.csv'
OUT_JSON = ROOT / 'data' / 'onePieceData_additions_verified.json'


def normalize_row(r):
    # Build a minimal island object compatible with onePieceData schema
    id_ = r.get('id')
    name = r.get('name')
    eps = r.get('episodes')
    try:
        episodes = json.loads(eps) if eps else []
    except Exception:
        episodes = []
    lat = r.get('lat')
    lon = r.get('lon')
    try:
        lat_f = float(lat) if lat not in (None,'','null') else None
    except Exception:
        lat_f = None
    try:
        lon_f = float(lon) if lon not in (None,'','null') else None
    except Exception:
        lon_f = None

    entry = {
        'id': id_,
        'name': name,
        'sea': None,
        'lat': lat_f,
        'lon': lon_f,
        'arc': None,
        'episodes': episodes if episodes else [],
        'characters': [],
        'importance': 'Minor',
        'visual': 'island',
        'source': r.get('coord_source') or r.get('wikidata_id') or r.get('wiki_snippet'),
        'note': 'verified via review CSV',
    }
    return entry


def main():
    verified = []
    with IN_CSV.open('r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            accept = r.get('accept', '').strip().lower()
            if accept in ('1','true','yes','y'):
                verified.append(normalize_row(r))

    with OUT_JSON.open('w', encoding='utf-8') as f:
        json.dump(verified, f, ensure_ascii=False, indent=2)

    print(f'Wrote {len(verified)} verified additions to {OUT_JSON}')

if __name__ == '__main__':
    main()
