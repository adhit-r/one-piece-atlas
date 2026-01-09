import { watch } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';
const isWatch = process.argv.includes('--watch');

console.log('🔨 Building One Piece World Atlas...');
console.log(`📍 Mode: ${isDev ? 'Development' : 'Production'}`);
console.log(`📦 Target: browser`);
console.log(`📄 Format: esm`);
console.log(`🗂️  Output: ./dist`);

if (isWatch) {
  console.log('👀 Watch mode enabled - monitoring for file changes...\n');
}

// Build state tracking
let isBuilding = false;
let pendingBuild = false;

async function build(isWatchMode = false) {
  try {
    const result = await Bun.build({
      entrypoints: ['./main.tsx'],
      outdir: './dist',
      target: 'browser',
      format: 'esm',
      minify: !isDev,
      sourcemap: isDev ? 'external' : 'none',
      splitting: true,
      naming: {
        entry: '[dir]/[name].[ext]',
        chunk: '[name]-[hash].[ext]',
        asset: '[name]-[hash].[ext]',
      },
    });

    if (!result.success) {
      console.error('❌ Build failed:');
      for (const log of result.logs) {
        console.error(log);
      }
      // Don't exit in watch mode, allow developer to fix errors
      if (!isWatchMode) {
        process.exit(1);
      }
      return null;
    }

    console.log('✅ Build completed successfully!');
    console.log(`📊 Generated ${result.outputs.length} output files\n`);

    result.outputs.forEach(output => {
      const size = (output.size / 1024).toFixed(1);
      console.log(`${output.path} (${size}KB)`);
    });

    return result;
  } catch (error) {
    console.error('❌ Build error:', error);
    // Don't exit in watch mode, allow developer to fix errors
    if (!isWatchMode) {
      process.exit(1);
    }
    return null;
  }
}

async function debouncedBuild() {
  // If build is in progress, mark that another build is needed
  if (isBuilding) {
    pendingBuild = true;
    return;
  }

  isBuilding = true;
  await build(true);
  isBuilding = false;

  // If another build was requested while we were building, run it now
  if (pendingBuild) {
    pendingBuild = false;
    debouncedBuild();
  }
}

async function watchBuild() {
  console.log('Initial build...');
  await build(true);

  let debounceTimer;

  const watcher = watch(
    __dirname,
    { recursive: true },
    async (eventType, filename) => {
      if (
        filename &&
        // Ignore dist directory and node_modules
        !filename.includes('dist') &&
        !filename.includes('node_modules') &&
        !filename.includes('.git') &&
        (filename.endsWith('.tsx') ||
          filename.endsWith('.ts') ||
          filename.endsWith('.jsx') ||
          filename.endsWith('.js'))
      ) {
        // Debounce rapid file changes
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          console.log(`\n🔄 File changed: ${filename}`);
          console.log('🔨 Rebuilding...');
          debouncedBuild();
        }, 100);
      }
    }
  );

  console.log('\n👀 Watching for changes... (Press Ctrl+C to stop)');

  // Keep process alive
  process.on('SIGINT', () => {
    console.log('\n\n👋 Stopping watch mode...');
    watcher.close();
    process.exit(0);
  });
}

// Execute build
if (isWatch) {
  watchBuild();
} else {
  build();
}
