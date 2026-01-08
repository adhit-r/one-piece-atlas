# One Piece World Atlas

An interactive 3D globe visualization of the One Piece world, featuring episodic navigation through islands, story arcs, crew progression, and voyage tracking.

## Features

### Core Functionality

- **Interactive 3D Globe**: Powered by Three.js with realistic ocean and atmospheric rendering
- **Episodic Navigation**: Timeline slider to explore the story from Episode 1 to the current arc (Egghead)
- **Voyage Tracking**: Follow different crews (Straw Hats, Law, Ace) on their journeys
- **Island Details**: Click on any island for detailed information including characters, arcs, and episode ranges
- **Road Poneglyph Tracker**: Visual progress indicator for the path to Laugh Tale
- **Day/Night Mode**: Toggle between lighting modes for different visual experiences
- **Search**: Quick island search with keyboard shortcut (Cmd/Ctrl + K)

### Data Included

- 18 major islands spanning East Blue to New World
- 10 Straw Hat crew members with join episode tracking
- 8 bounty milestones reflecting Luffy's journey
- 3 voyage paths (Straw Hats, Law, Ace)
- Arc information and episode ranges
- Poneglyph locations (Skypiea, Fishman Island, Zou, Wano)

## Tech Stack

| Category     | Technology            |
| ------------ | --------------------- |
| Runtime      | [Bun](https://bun.sh) |
| UI Framework | React 18              |
| 3D Rendering | Three.js r128         |
| Web Server   | Hono                  |
| Animation    | Framer Motion         |
| Icons        | Lucide React          |
| Styling      | Tailwind CSS (CDN)    |
| Validation   | Zod                   |
| Language     | TypeScript            |

## Project Structure

```
one-piece-world-atlas/
|-- main.tsx                 # Main React application entry point
|-- build.ts                 # Bun build configuration
|-- server.ts                # Hono development server
|-- components/
|   |-- EpisodeControls.tsx  # Timeline and episode navigation UI
|   |-- GlobeControls.tsx    # Zoom and reset controls
|   |-- IslandDetails.tsx    # Island information panel
|   |-- IslandTooltip.tsx    # Hover tooltip for islands
|   |-- SearchBar.tsx        # Island search component
|-- hooks/
|   |-- useThreeGlobe.ts     # Three.js globe rendering and interactions
|   |-- useEpisodeNavigation.ts  # Episode playback and arc navigation
|   |-- useIslandInteractions.ts # Island click/hover state management
|-- utils/
|   |-- episodeUtils.ts      # Episode range and arc helpers
|   |-- globeUtils.ts        # Lat/lon to 3D coordinate conversion
|   |-- islandData.ts        # Island type definitions and utilities
|   |-- validation.ts        # Zod schemas for data validation
|-- data/
|   |-- onePieceData.ts      # Main island, crew, bounty dataset
|   |-- *.jsonl, *.json, *.csv  # Enrichment and scraping output
|-- scripts/
|   |-- scrape_onepiece_fandom.py   # Fandom wiki scraper
|   |-- enrich_candidates.py        # Island data enrichment
|   |-- match_candidates.py         # Candidate matching pipeline
|   |-- disambiguate_enriched.py    # Deduplication and disambiguation
|   |-- generate_review_csv.py      # Generate review spreadsheet
|   |-- apply_reviews.py            # Apply manual review decisions
|   |-- generate_additions.py       # Generate new island additions
|   |-- prepare_pr_patch.py         # Prepare PR with changelog
|-- tests/
|   |-- data-validation.test.ts     # Island data integrity tests
|   |-- server-startup.test.ts      # Server health check tests
|   |-- typescript-compilation.test.ts  # Type check tests
|   |-- bundle-optimization.test.ts # Build output tests
|   |-- pre-commit-validation.test.ts   # Pre-commit hook tests
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (latest version)
- Python 3.8+ (for data scripts only)

### Installation

```bash
# Clone the repository
git clone https://github.com/adhit-r/one-piece-atlas.git
cd one-piece-atlas

# Install dependencies
bun install
```

### Development

```bash
# Build for development and start server
bun run dev

# Or run build and server separately
bun run build:dev
bun run start
```

The application will be available at `http://localhost:3000`.

### Production Build

```bash
# Create optimized production build
bun run build

# Start production server
bun run start
```

### Running Tests

```bash
# Run all tests
bun test

# Run specific test file
bun test tests/data-validation.test.ts
```

### Code Quality

```bash
# Type check
bun run typecheck

# Lint
bun run lint

# Format code
bun run format
```

## Keyboard Shortcuts

| Shortcut     | Action            |
| ------------ | ----------------- |
| Cmd/Ctrl + K | Toggle search     |
| Cmd/Ctrl + B | Toggle sidebar    |
| Cmd/Ctrl + M | Toggle night mode |
| Escape       | Close search      |

## Data Pipeline

The project includes a comprehensive data pipeline for enriching island information:

1. **Scraping**: `scrape_onepiece_fandom.py` fetches location data from Fandom wiki
2. **Matching**: `match_candidates.py` matches scraped data to existing islands
3. **Enrichment**: `enrich_candidates.py` adds episode numbers and details
4. **Disambiguation**: `disambiguate_enriched.py` resolves duplicates
5. **Review**: `generate_review_csv.py` creates spreadsheet for manual review
6. **Apply**: `apply_reviews.py` integrates accepted changes

See `CONTRIBUTING.md` for detailed data contribution guidelines.

## API Endpoints

| Endpoint    | Method | Description                  |
| ----------- | ------ | ---------------------------- |
| `/`         | GET    | Main application             |
| `/health`   | GET    | Server health check          |
| `/dist/*`   | GET    | Static build assets          |
| `/assets/*` | GET    | Static assets (images, etc.) |

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines, code standards, and the data review workflow.

## License

This project is for educational and fan purposes. One Piece is created by Eiichiro Oda and published by Shueisha.

## Acknowledgments

- Island and episode data sourced from [One Piece Wiki](https://onepiece.fandom.com)
- Three.js community for 3D rendering examples
- Bun team for the fast JavaScript runtime
