"""
Generate interactive review CSV prefilled with accept flags for high-confidence decisions.
Reads: data/onePieceData_disambiguated_top50.csv
Writes: data/onePieceData_disambiguated_top50_review.csv
"""
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IN_CSV = ROOT / "data" / "onePieceData_disambiguated_top50.csv"
OUT_CSV = ROOT / "data" / "onePieceData_disambiguated_top50_review.csv"

with IN_CSV.open('r', encoding='utf-8') as f_in:
    reader = csv.DictReader(f_in)
    rows = list(reader)

fieldnames = list(rows[0].keys()) + ['accept', 'reviewer_notes']

with OUT_CSV.open('w', newline='', encoding='utf-8') as f_out:
    writer = csv.DictWriter(f_out, fieldnames=fieldnames)
    writer.writeheader()
    for r in rows:
        # Prefill accept true for 'accept' decision with high or medium confidence
        decision = r.get('decision', '').lower()
        confidence = r.get('confidence', '').lower()
        accept = 'true' if decision == 'accept' and confidence in ('high','medium') else 'false'
        r['accept'] = accept
        r['reviewer_notes'] = ''
        writer.writerow(r)

print(f'Wrote review CSV to {OUT_CSV} (prefilled accept flags for accept/medium/high)')