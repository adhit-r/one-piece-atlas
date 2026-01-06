# Contributing to One Piece World Atlas ✅

Thanks for your interest in contributing! This document outlines how to get set up locally, run tests, and contribute data or code.

## Quickstart

1. Fork the repo and clone your fork.
2. Install dependencies:
   - Bun: https://bun.sh
   - Install: `bun install`
3. Start a dev build + server:
   - `bun run build:dev && bun run dev`
4. Run tests:
   - `bun test`

## How to contribute code

- Create a branch: `git checkout -b feat/your-feature`
- Commit small, focused changes with clear messages.
- Run `bun test` and ensure everything passes.
- Open a pull request against `main` with a clear description.

### Formatting & Pre-commit
- Prettier and ESLint are used. Run `bun run format` and `bun run lint` before creating a PR.

## How to contribute data

We use a careful review pipeline for data additions:

1. Run the enrichment and disambiguation scripts in `scripts/`.
2. Generate the review CSV: `python scripts/generate_review_csv.py`
3. Manually inspect `data/onePieceData_disambiguated_top50_review.csv` and mark `accept`.
4. Apply reviews: `python scripts/apply_reviews.py` which outputs `data/onePieceData_additions_verified.json`.
5. Run the validation tests: `bun test tests/data-validation.test.ts`.
6. Prepare a PR using `scripts/prepare_pr_patch.py` (created in this repo) which will create a patch file and `DATA_CHANGELOG.md` entry.

## Issues & Labels
- Use issue templates (bug, feature) to create issues. Label your issue (bug, enhancement, documentation, seo).
- Mark beginner-friendly tasks with `good first issue` and `help wanted`.

## Code of Conduct
Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) (be respectful and constructive).

---
Thanks for helping keep the One Piece World Atlas great! ⚓️