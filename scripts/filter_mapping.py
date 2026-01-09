"""
Filter mapping_review.csv for medium- and high-confidence matches (suggested_action == 'review' or 'update')
and output data/mapping_review_filtered.csv sorted by match_score descending.

Usage:
  /path/to/python scripts/filter_mapping.py
"""
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IN_CSV = ROOT / "data" / "mapping_review.csv"
OUT_CSV = ROOT / "data" / "mapping_review_filtered.csv"

rows = []
with IN_CSV.open('r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for r in reader:
        if r.get('suggested_action') in ('review', 'update'):
            # ensure numeric score
            try:
                r['match_score'] = float(r.get('match_score') or 0)
            except Exception:
                r['match_score'] = 0.0
            rows.append(r)

# sort by match_score desc
rows.sort(key=lambda r: r['match_score'], reverse=True)

with OUT_CSV.open('w', newline='', encoding='utf-8') as f:
    if not rows:
        print('No review/update rows found')
    else:
        fieldnames = list(rows[0].keys())
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)

print(f'Wrote {len(rows)} rows to {OUT_CSV}')
