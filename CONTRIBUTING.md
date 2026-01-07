# Contributing to One Piece World Atlas

Thank you for your interest in contributing to the One Piece World Atlas project! This guide will help you get started with the development workflow.

## Prerequisites

- [Bun](https://bun.sh/) v1.0.0 or higher
- Node.js v18+ (for tooling compatibility)
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/preettrank53/one-piece-atlas.git
cd one-piece-atlas
```

### 2. Install Dependencies

```bash
bun install
```

## Development Workflow

### Watch Mode (Recommended for Development)

The project supports automatic rebuild on file changes with hot reload:

```bash
bun run dev:watch
```

This command:
- Monitors all `.ts`, `.tsx`, `.js`, and `.jsx` files for changes
- Automatically rebuilds the bundle when files are modified
- Hot-reloads the server to reflect changes instantly
- Runs in development mode with source maps enabled

### Alternative Development Scripts

#### Build Once (Development)
```bash
bun run build:dev
```

#### Build with Watch Mode Only
```bash
bun run build:watch
```

#### Start Dev Server Only
```bash
bun run dev
```

### Production Build

```bash
bun run build
bun run start
```

## Project Structure

```
one-piece-atlas/
├── main.tsx           # Main React application
├── build.ts           # Build configuration with watch mode
├── server.ts          # Hono web server
├── dist/              # Build output directory (generated)
├── package.json       # Project dependencies and scripts
└── CONTRIBUTING.md    # This file
```

## Build System

The project uses Bun's native bundler with the following features:

### Development Mode
- Source maps enabled for easier debugging
- Unminified output for readability
- Fast incremental rebuilds
- Watch mode for automatic rebuilds

### Production Mode
- Minified output for optimal performance
- Code splitting enabled
- Tree shaking for smaller bundle size
- No source maps

## Development Best Practices

### Making Changes

1. Create a new branch from `main`:
   ```bash
   git switch main
   git pull origin main
   git switch -c feature/your-feature-name
   # OR
   git switch -c fix/your-bug-fix
   ```

2. Start the watch mode development server:
   ```bash
   bun run dev:watch
   ```

3. Make your changes to the codebase

4. The bundle will automatically rebuild and the server will hot-reload

5. Test your changes at `http://localhost:3000`

### Code Quality

Before committing, ensure your code meets quality standards:

```bash
# Type checking
bun run typecheck

# Linting
bun run lint

# Formatting
bun run format
```

### Git Hooks

The project uses Husky for git hooks:
- **pre-commit**: Automatically runs `lint-staged` to format and lint changed files

## Submitting Changes

1. Commit your changes with a descriptive message:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   # OR
   git commit -m "fix: resolve specific bug"
   ```

2. Push your branch to the remote repository:
   ```bash
   git push -u origin feature/your-feature-name
   ```

3. Create a Pull Request on GitHub

## Watch Mode Details

The watch mode implementation uses Node.js `fs.watch` API with the following characteristics:

- **Recursive monitoring**: Watches all files in the project directory
- **File type filtering**: Only rebuilds for `.ts`, `.tsx`, `.js`, and `.jsx` files
- **Debounced rebuilds**: Prevents multiple rapid rebuilds
- **Clear feedback**: Displays build status and file changes in console
- **Graceful shutdown**: Press `Ctrl+C` to stop watch mode

### Watch Mode Output

When running `bun run dev:watch`, you'll see:

```
🔨 Building One Piece World Atlas...
📍 Mode: Development
📦 Target: browser
📄 Format: esm
🗂️  Output: ./dist
👀 Watch mode enabled - monitoring for file changes...

Initial build...
✅ Build completed successfully!
📊 Generated 2 output files

/path/to/dist/main.js (1324.7KB)
/path/to/dist/main.js.map (2511.6KB)

👀 Watching for changes... (Press Ctrl+C to stop)
```

When a file changes:

```
🔄 File changed: main.tsx
🔨 Rebuilding...
✅ Build completed successfully!
```

## Troubleshooting

### Build Fails

If the build fails:
1. Check the console for error messages
2. Ensure all dependencies are installed: `bun install`
3. Verify TypeScript types: `bun run typecheck`

### Server Not Starting

If the server doesn't start:
1. Check if port 3000 is available
2. Try setting a different port: `PORT=3001 bun run dev`

### Watch Mode Not Detecting Changes

If watch mode isn't detecting file changes:
1. Ensure you're editing files with `.ts`, `.tsx`, `.js`, or `.jsx` extensions
2. Try restarting watch mode
3. Check file system permissions

## Need Help?

If you encounter issues or have questions:
- Open an issue on GitHub
- Check existing issues for similar problems
- Review the build output for error messages

## Code Style

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Configuration files:
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier configuration
- `tsconfig.json` - TypeScript configuration (if present)

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

Happy coding! 🏴‍☠️⚓
