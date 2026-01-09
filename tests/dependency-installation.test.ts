import { test, expect } from 'bun:test';
import * as fc from 'fast-check';
import { existsSync } from 'fs';
import { join } from 'path';

/**
 * **Feature: dependency-setup, Property 1: Dependency installation success**
 * **Validates: Requirements 1.1**
 *
 * For any clean repository clone, running npm install should result in successful
 * installation of all dependencies without errors and creation of a complete node_modules directory
 */
test('Property 1: Dependency installation success', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(
        'react',
        'react-dom',
        'lucide-react',
        'framer-motion',
        'hono',
        '@types/react',
        '@types/react-dom',
        '@types/three',
        'typescript',
        'bun-types'
      ),
      dependencyName => {
        // Check that the dependency exists in node_modules
        const nodeModulesPath = join(
          process.cwd(),
          'node_modules',
          dependencyName
        );
        const packageJsonPath = join(nodeModulesPath, 'package.json');

        // The dependency should be installed (directory exists)
        expect(existsSync(nodeModulesPath)).toBe(true);

        // The dependency should have a valid package.json
        expect(existsSync(packageJsonPath)).toBe(true);

        // If it's a TypeScript types package, it should have type definitions
        if (dependencyName.startsWith('@types/')) {
          const indexDtsPath = join(nodeModulesPath, 'index.d.ts');
          const hasTypeDefinitions =
            existsSync(indexDtsPath) ||
            existsSync(join(nodeModulesPath, 'lib')) ||
            existsSync(join(nodeModulesPath, 'types'));
          expect(hasTypeDefinitions).toBe(true);
        }

        return true;
      }
    ),
    { numRuns: 100 }
  );
});

test('Dependency installation creates complete node_modules structure', () => {
  // Verify that node_modules directory exists
  const nodeModulesPath = join(process.cwd(), 'node_modules');
  expect(existsSync(nodeModulesPath)).toBe(true);

  // Verify that bun.lock exists (Bun's lockfile)
  const lockfilePath = join(process.cwd(), 'bun.lock');
  expect(existsSync(lockfilePath)).toBe(true);

  // Verify that package.json exists
  const packageJsonPath = join(process.cwd(), 'package.json');
  expect(existsSync(packageJsonPath)).toBe(true);
});
