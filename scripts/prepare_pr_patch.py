#!/usr/bin/env python3
"""Prepare a PR-ready patch merging verified additions into the main data file.

Usage: python scripts/prepare_pr_patch.py

This script reads `data/onePieceData_additions_verified.json`, validates structure,
and writes a TypeScript patch file to `data/onePieceData_additions_patch.ts` along
with a short changelog entry.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ADD_FILE = ROOT / 'data' / 'onePieceData_additions_verified.json'
TARGET_TS = ROOT / 'data' / 'onePieceData_additions_patch.ts'

if not ADD_FILE.exists():
    print(f"Verified additions file not found: {ADD_FILE}")
    raise SystemExit(1)

with ADD_FILE.open() as f:
    additions = json.load(f)

# Basic sanity checks
if not isinstance(additions, list) or len(additions) == 0:
    print("No additions found or invalid format")
    raise SystemExit(1)

# Write a patch file that exports the additions as an array of objects
with TARGET_TS.open('w') as out:
    out.write('// Auto-generated additions patch - review before merging\n')
    out.write('export const VERIFIED_ADDITIONS = ') 
    json.dump(additions, out, indent=2)
    out.write('\n')

print(f'Wrote patch to {TARGET_TS}')
print('Next steps: review the patch, open a PR, and reference the DATA_CHANGELOG.md entry.')
