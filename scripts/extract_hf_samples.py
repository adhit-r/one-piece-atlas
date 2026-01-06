"""
Extract candidate One Piece place pages from Hugging Face datasets for review.

Usage:
  pip install datasets
  python scripts/extract_hf_samples.py --limit 50

This script tries two datasets:
 - polytechXhf/onepiece-dataset (small, fast)
 - RyokoAI/Fandom23K (streaming, large)

It filters by title/text keywords (island, village, town, port, sea, island names) and writes results to stdout and to `data/hf_onepiece_candidates.jsonl`.

Note: Fandom23K is large; streaming mode is used and the script stops after collecting `--limit` candidates.
"""

import argparse
import json
import re
from pathlib import Path

from datasets import load_dataset

KEYWORDS = [
    r"\bisland\b",
    r"\btown\b",
    r"\bvillage\b",
    r"\bport\b",
    r"\bharbor\b",
    r"\bsea\b",
    r"\bisle\b",
    r"\barc\b",
    r"\bmarine\b",
]
KEYWORD_RE = re.compile("|".join(KEYWORDS), re.I)

# Broader One Piece-specific terms to improve relevance filtering
ONEPIECE_TERMS = [
    r"one\s*piece",
    r"one-?piece",
    r"luffy",
    r"straw\s*hat",
    r"strawhats",
    r"grand\s*line",
    r"east\s*blue",
    r"west\s*blue",
    r"north\s*blue",
    r"south\s*blue",
    r"egghead",
    r"foosha",
    r"loguetown",
    r"arabasta",
    r"alabasta",
    r"skypiea",
    r"reverse\s*mountain",
    r"baratie",
]
ONEPIECE_RE = re.compile("|".join(ONEPIECE_TERMS), re.I)

OUT_PATH = Path("data/hf_onepiece_candidates.jsonl")


def matches_keywords(text: str) -> bool:
    if not text:
        return False
    return bool(KEYWORD_RE.search(text))


def sample_onepiece_dataset(limit: int):
    ds = load_dataset("polytechXhf/onepiece-dataset", split="train")
    results = []
    for i, row in enumerate(ds):
        title = (row.get("title") or "").strip()
        text = (row.get("text") or "").strip()
        if not title and not text:
            continue
        if matches_keywords(title) or matches_keywords(text) or ONEPIECE_RE.search(title) or ONEPIECE_RE.search(text):
            results.append({"source": "polytechXhf/onepiece-dataset", "title": title, "text": text[:200]})
            if len(results) >= limit:
                break
    return results


def sample_fandom23k(limit: int):
    # Streaming to avoid huge downloads
    ds = load_dataset("RyokoAI/Fandom23K", split="train", streaming=True)
    results = []
    for row in ds:
        title = (row.get("title") or "").strip()
        text = (row.get("text") or "").strip()
        tag = (row.get("tag") or "").strip()
        # Heuristic: prefer pages that mention One Piece or known One Piece terms in tag/title/text
        if ONEPIECE_RE.search(title) or ONEPIECE_RE.search(text) or ONEPIECE_RE.search(tag):
            results.append({"source": "RyokoAI/Fandom23K", "title": title, "text": text[:200]})
            if len(results) >= limit:
                break
        # fallback: any page that matches keywords
        if matches_keywords(title) or matches_keywords(text):
            # but only keep if we couldn't fill from One Piece matches (to keep relevance)
            if len(results) < limit:
                results.append({"source": "RyokoAI/Fandom23K", "title": title, "text": text[:200]})
                if len(results) >= limit:
                    break
    return results


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=50, help="Number of candidates to collect per dataset")
    args = parser.parse_args()

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    all_results = []

    try:
        print("Sampling polytechXhf/onepiece-dataset...")
        poly_results = sample_onepiece_dataset(args.limit)
        print(f"Found {len(poly_results)} candidates from polytechXhf/onepiece-dataset")
        all_results.extend(poly_results)
    except Exception as e:
        print("Error sampling polytechXhf dataset:", e)

    try:
        print("Streaming RyokoAI/Fandom23K (may take time)...")
        fandom_results = sample_fandom23k(args.limit)
        print(f"Found {len(fandom_results)} candidates from RyokoAI/Fandom23K")
        all_results.extend(fandom_results)
    except Exception as e:
        print("Error streaming Fandom23K:", e)

    # Deduplicate by title+source
    seen = set()
    dedup = []
    for r in all_results:
        key = (r["source"], r["title"])
        if key in seen:
            continue
        seen.add(key)
        dedup.append(r)

    # Write to file
    with OUT_PATH.open("w", encoding="utf-8") as f:
        for r in dedup:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    print(f"Wrote {len(dedup)} candidates to {OUT_PATH}")
    # Print a short preview
    print("\nPreview:\n")
    for r in dedup[:min(25, len(dedup))]:
        print(f"[{r['source']}] {r['title']}\n  {r['text']}\n")


if __name__ == "__main__":
    main()
