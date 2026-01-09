import { test, expect } from 'bun:test';
import * as fc from 'fast-check';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * **Feature: dependency-setup, Property 6: TypeScript compilation accuracy**
 * **Validates: Requirements 2.1**
 *
 * For any TypeScript configuration, the compiler should be properly configured
 * with strict type checking and appropriate settings
 */
test('Property 6: TypeScript compilation accuracy', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(
        'strict',
        'noUnusedLocals',
        'noUnusedParameters',
        'noFallthroughCasesInSwitch',
        'exactOptionalPropertyTypes',
        'noImplicitReturns',
        'noUncheckedIndexedAccess'
      ),
      strictOption => {
        // Verify tsconfig.json exists
        const tsconfigPath = join(process.cwd(), 'tsconfig.json');
        expect(existsSync(tsconfigPath)).toBe(true);

        // Read and parse tsconfig.json
        const tsconfigContent = readFileSync(tsconfigPath, 'utf-8');
        const tsconfig = JSON.parse(tsconfigContent);

        // Verify strict type checking options are enabled
        expect(tsconfig.compilerOptions).toBeDefined();
        expect(tsconfig.compilerOptions[strictOption]).toBe(true);

        return true;
      }
    ),
    { numRuns: 100 }
  );
});

/**
 * **Feature: dependency-setup, Property 7: React type recognition**
 * **Validates: Requirements 2.2**
 *
 * For any React component import, TypeScript should recognize React types
 * and provide proper type checking and intellisense
 */
test('Property 7: React type recognition', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(
        'jsx-react-jsx',
        'lib-dom',
        'react-types-available',
        'module-resolution'
      ),
      configOption => {
        // Verify tsconfig.json exists and has React-specific settings
        const tsconfigPath = join(process.cwd(), 'tsconfig.json');
        expect(existsSync(tsconfigPath)).toBe(true);

        const tsconfigContent = readFileSync(tsconfigPath, 'utf-8');
        const tsconfig = JSON.parse(tsconfigContent);

        switch (configOption) {
          case 'jsx-react-jsx':
            // Verify JSX is configured for React
            expect(tsconfig.compilerOptions.jsx).toBe('react-jsx');
            break;
          case 'lib-dom':
            // Verify DOM types are included
            expect(tsconfig.compilerOptions.lib).toContain('DOM');
            break;
          case 'react-types-available':
            // Verify @types/react is installed
            const reactTypesPath = join(
              process.cwd(),
              'node_modules',
              '@types',
              'react'
            );
            expect(existsSync(reactTypesPath)).toBe(true);
            break;
          case 'module-resolution':
            // Verify module resolution is set appropriately
            expect(tsconfig.compilerOptions.moduleResolution).toBe('bundler');
            break;
        }

        return true;
      }
    ),
    { numRuns: 100 }
  );
});

/**
 * **Feature: dependency-setup, Property 8: External library type availability**
 * **Validates: Requirements 2.3**
 *
 * For any import from lucide-react or framer-motion, TypeScript should
 * have access to proper type definitions
 */
test('Property 8: External library type availability', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('lucide-react', 'framer-motion', '@types/three'),
      library => {
        // Verify external library packages are installed
        const libraryPath = join(process.cwd(), 'node_modules', library);
        expect(existsSync(libraryPath)).toBe(true);

        // Verify package.json exists for the library
        const packageJsonPath = join(libraryPath, 'package.json');
        expect(existsSync(packageJsonPath)).toBe(true);

        // For type definition packages, verify they have type files
        if (library.startsWith('@types/')) {
          const hasTypeFiles =
            existsSync(join(libraryPath, 'index.d.ts')) ||
            existsSync(join(libraryPath, 'lib')) ||
            existsSync(join(libraryPath, 'types'));
          expect(hasTypeFiles).toBe(true);
        } else {
          // For regular packages, verify they have built-in types
          const hasBuiltInTypes =
            existsSync(join(libraryPath, 'index.d.ts')) ||
            existsSync(join(libraryPath, 'dist', 'index.d.ts')) ||
            existsSync(join(libraryPath, 'dist', `${library}.d.ts`)) ||
            existsSync(join(libraryPath, 'types')) ||
            existsSync(join(libraryPath, 'dist', 'lucide-react.d.ts'));
          expect(hasBuiltInTypes).toBe(true);
        }

        return true;
      }
    ),
    { numRuns: 100 }
  );
});
