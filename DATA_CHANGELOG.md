# Data Changelog

All data changes are tracked here for auditability.

## 2026-01-02 — Verified additions (36 islands)
- Source: Fandom/Wikidata/Wikipedia enrichment
- Files: `data/onePieceData_additions_verified.json`
- Notes: Entries validated with Zod schema; `scripts/generate_review_csv.py` and `scripts/apply_reviews.py` were used to produce verified JSON.

## How to add entries
1. Generate review CSV (`scripts/generate_review_csv.py`)
2. Review and set `accept=true` for trusted rows
3. Apply reviews (`scripts/apply_reviews.py`) -> verifies JSON
4. Run `bun test tests/data-validation.test.ts` and ensure validation passes
5. Use `scripts/prepare_pr_patch.py` to create a patch and update this changelog
