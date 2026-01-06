/// <reference types="bun-types" />

// Function to get build configuration based on current environment
function getBuildConfig(): Bun.BuildConfig {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const isProduction = process.env.NODE_ENV === 'production';

  // Base build configuration
  const baseBuildConfig: Bun.BuildConfig = {
    entrypoints: ['./main.tsx'],
    outdir: './dist',
    target: 'browser',
    format: 'esm',
    splitting: true,
    sourcemap: 'external',
    minify: isProduction,
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    },
    external: [
      // External CDN dependencies that should not be bundled
      'three',
    ],
  };

  if (isDevelopment) {
    // Development-specific configuration
    return {
      ...baseBuildConfig,
      minify: false,
      sourcemap: 'external',
      splitting: false, // Disable splitting in development for faster builds
      define: {
        ...baseBuildConfig.define,
        'process.env.NODE_ENV': '"development"',
      },
    };
  } else {
    // Production-specific configuration
    return {
      ...baseBuildConfig,
      minify: true,
      sourcemap: 'external',
      define: {
        ...baseBuildConfig.define,
        'process.env.NODE_ENV': '"production"',
      },
    };
  }
}

// Export the build configuration getter
export const buildConfig = getBuildConfig();

// Build function for programmatic usage
export async function buildApp(): Promise<void> {
  const config = getBuildConfig();
  const isDevelopment = process.env.NODE_ENV !== 'production';

  console.log(`🔨 Building One Piece World Atlas...`);
  console.log(`📍 Mode: ${isDevelopment ? 'Development' : 'Production'}`);
  console.log(`📦 Target: ${config.target}`);
  console.log(`📄 Format: ${config.format}`);
  console.log(`🗂️  Output: ${config.outdir}`);

  try {
    const result = await Bun.build(config);

    if (result.success) {
      console.log(`✅ Build completed successfully!`);
      console.log(`📊 Generated ${result.outputs.length} output files`);

      // Log output files
      result.outputs.forEach((output: any, index: number) => {
        const size = output.size
          ? `(${(output.size / 1024).toFixed(1)}KB)`
          : '';
        console.log(`   ${index + 1}. ${output.path} ${size}`);
      });
    } else {
      console.error('❌ Build failed with errors:');
      result.logs.forEach((log: any) => {
        console.error(`   ${log.level}: ${log.message}`);
      });
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Build process failed:', error);
    process.exit(1);
  }
}

// Run build if this file is executed directly
if (import.meta.main) {
  await buildApp();
}
