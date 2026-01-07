import { watch } from 'fs';
import { resolve, dirname } from 'path';
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

async function build() {
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
      process.exit(1);
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
    process.exit(1);
  }
}

async function watchBuild() {
  console.log('Initial build...');
  await build();

  const watcher = watch(
    __dirname,
    { recursive: true },
    async (eventType, filename) => {
      if (
        filename &&
        (filename.endsWith('.tsx') ||
          filename.endsWith('.ts') ||
          filename.endsWith('.jsx') ||
          filename.endsWith('.js'))
      ) {
        console.log(`\n🔄 File changed: ${filename}`);
        console.log('🔨 Rebuilding...');
        await build();
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
