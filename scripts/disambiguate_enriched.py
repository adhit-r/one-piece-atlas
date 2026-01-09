"""
Disambiguate and score enriched candidate coordinates using simple heuristics.

Reads: data/onePieceData_enriched_top50.json
Writes: data/onePieceData_disambiguated_top50.csv and data/onePieceData_disambiguated_top50.json
"""
import json
import re
from pathlib import Path
import csv

ROOT = Path(__file__).resolve().parents[1]
IN_JSON = ROOT / "data" / "onePieceData_enriched_top50.json"
OUT_CSV = ROOT / "data" / "onePieceData_disambiguated_top50.csv"
OUT_JSON = ROOT / "data" / "onePieceData_disambiguated_top50.json"

KEYWORDS = ["one piece", "island", "village", "town", "port", "kingdom", "arc", "saga", "fictional", "location"]
KW_RE = re.compile("|".join([re.escape(k) for k in KEYWORDS]), re.I)


def decision_for(entry):
    lat = entry.get('lat')
    lon = entry.get('lon')
    src = entry.get('coord_source') or ''
    wd_desc = (entry.get('wikidata_description') or '')
    wiki_snip = (entry.get('wiki_snippet') or '')

    notes = []

    # check coords validity
    coords_valid = False
    if lat is not None and lon is not None:
        try:
            lf = float(lat)
            lo = float(lon)
            if -90 <= lf <= 90 and -180 <= lo <= 180:
                coords_valid = True
            else:
                notes.append('coords-out-of-range')
        except Exception:
            notes.append('coords-not-numeric')
    else:
        notes.append('no-coords')

    # keyword matching
    kw_matches = 0
    if KW_RE.search(wd_desc):
        kw_matches += 2
    if KW_RE.search(wiki_snip):
        kw_matches += 1

    # scoring
    score = 0
    if coords_valid:
        score += 50
    if src == 'wikidata':
        score += 20
    if 'One Piece' in wd_desc or 'One Piece' in wiki_snip or 'one piece' in wd_desc.lower() or 'one piece' in wiki_snip.lower():
        score += 30
    score += kw_matches * 10

    # decision thresholds
    if score >= 80:
        decision = 'accept'
        confidence = 'high'
    elif score >= 60:
        decision = 'accept'
        confidence = 'medium'
    elif score >= 40:
        decision = 'review'
        confidence = 'low'
    else:
        decision = 'reject'
        confidence = 'low'

    return {
        'id': entry.get('id'),
        'name': entry.get('name'),
        'lat': entry.get('lat'),
        'lon': entry.get('lon'),
        'coord_source': entry.get('coord_source'),
        'wikidata_id': entry.get('wikidata_id', ''),
        'wikidata_description': entry.get('wikidata_description', ''),
        'wiki_snippet': entry.get('wiki_snippet', ''),
        'episodes': entry.get('episodes', []),
        'score': score,
        'decision': decision,
        'confidence': confidence,
        'notes': ';'.join(notes) if notes else '',
    }


def main():
    if not IN_JSON.exists():
        print('Enriched file not found; run enrich_candidates.py first')
        return
    with IN_JSON.open('r', encoding='utf-8') as f:
        items = json.load(f)

    results = [decision_for(it) for it in items]

    # write CSV
    fieldnames = ['id','name','lat','lon','coord_source','wikidata_id','score','decision','confidence','notes','wikidata_description','wiki_snippet','episodes']
    with OUT_CSV.open('w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in results:
            r2 = dict(r)
            r2['wikidata_description'] = (r2.get('wikidata_description') or '').replace('\n',' ')[:200]
            r2['wiki_snippet'] = (r2.get('wiki_snippet') or '').replace('\n',' ')[:200]
            r2['episodes'] = json.dumps(r2.get('episodes') or [])
            writer.writerow(r2)

    with OUT_JSON.open('w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f'Wrote {len(results)} disambiguation results to {OUT_CSV} and {OUT_JSON}')

if __name__ == '__main__':
    main()
