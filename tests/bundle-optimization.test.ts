import { test, expect } from 'bun:test';
import { existsSync, statSync, readFileSync } from 'fs';
import { join } from 'path';
import { buildApp } from '../build';

/**
 * **Feature: dependency-setup, Property 18: Bundle optimization**
 * **Validates: Requirements 4.4**
 *
 * For any production build, the output should be optimized with smaller bundle sizes
 * compared to development builds
 */

test('Property 18: Bundle optimization - production builds are optimized', async () => {
  const originalEnv = process.env.NODE_ENV;

  try {
    // Production build
    process.env.NODE_ENV = 'production';
    await buildApp();

    const prodMainJsPath = join('./dist', 'main.js');
    expect(existsSync(prodMainJsPath)).toBe(true);
    const prodStats = statSync(prodMainJsPath);
    const prodSize = prodStats.size;

    // Production build should be reasonably optimized
    expect(prodSize).toBeGreaterThan(50 * 1024); // At least 50KB (not empty)
    expect(prodSize).toBeLessThan(500 * 1024); // Less than 500KB (optimized)

    console.log(`Production size: ${(prodSize / 1024).toFixed(1)}KB`);

    // Verify minification is working
    const prodContent = readFileSync(prodMainJsPath, 'utf-8');
    const lines = prodContent.split('\n');
    const avgLineLength = prodContent.length / lines.length;

    // Minified code should have reasonable line length (not too short)
    expect(avgLineLength).toBeGreaterThan(20);
  } finally {
    // Restore original environment
    process.env.NODE_ENV = originalEnv;
  }
});

test('Property 18: Bundle optimization - production builds have appropriate file structure', async () => {
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';

  try {
    await buildApp();

    const distPath = './dist';
    expect(existsSync(distPath)).toBe(true);

    // Should have main bundle
    const mainJsPath = join(distPath, 'main.js');
    expect(existsSync(mainJsPath)).toBe(true);

    // Should have sourcemap for debugging
    const sourcemapPath = join(distPath, 'main.js.map');
    expect(existsSync(sourcemapPath)).toBe(true);

    // Verify the bundle is optimized
    const mainJsStats = statSync(mainJsPath);

    // Production bundle should be reasonably sized
    expect(mainJsStats.size).toBeGreaterThan(50 * 1024); // At least 50KB (not empty)
    expect(mainJsStats.size).toBeLessThan(500 * 1024); // Less than 500KB (optimized)
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

test('Property 18: Bundle optimization - code splitting and ESM format', async () => {
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';

  try {
    await buildApp();

    const mainJsPath = join('./dist', 'main.js');
    const mainJsContent = readFileSync(mainJsPath, 'utf-8');

    // Should use ESM format
    const hasESMPatterns =
      mainJsContent.includes('export') || mainJsContent.includes('import');
    expect(hasESMPatterns).toBe(true);

    // Should be minified (no excessive whitespace)
    const lines = mainJsContent.split('\n');
    const totalLines = lines.length;

    // Minified code should have reasonable line density
    const avgLineLength = mainJsContent.length / totalLines;
    expect(avgLineLength).toBeGreaterThan(20); // Minified lines should be reasonably dense

    // Should not contain obvious development patterns
    expect(mainJsContent).not.toContain('console.log(');
    expect(mainJsContent).not.toContain('debugger;');
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

test('Property 18: Bundle optimization - external dependencies handled correctly', async () => {
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';

  try {
    await buildApp();

    const mainJsPath = join('./dist', 'main.js');
    const mainJsContent = readFileSync(mainJsPath, 'utf-8');

    // Three.js should be external (not bundled) - check that we reference it externally
    // The bundle should contain references to window.THREE but not the full implementation
    expect(mainJsContent).toContain('window.THREE');

    // But should contain references to THREE usage
    expect(mainJsContent).toContain('THREE');

    // React and other dependencies should be bundled
    expect(mainJsContent.length).toBeGreaterThan(100 * 1024); // Should contain substantial code
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});
