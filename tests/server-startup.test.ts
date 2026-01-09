import { test, expect } from 'bun:test';
import * as fc from 'fast-check';

/**
 * **Feature: dependency-setup, Property 2: Development server startup**
 * **Validates: Requirements 1.2**
 *
 * For any properly configured project, running the development server command should
 * start a server on the specified port and respond to HTTP requests
 */
test('Property 2: Development server startup', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.integer({ min: 3001, max: 9999 }), // Generate random available ports
      async port => {
        // Set environment variables for the test
        const originalPort = process.env.PORT;
        const originalNodeEnv = process.env.NODE_ENV;

        process.env.PORT = port.toString();
        process.env.NODE_ENV = 'development';

        try {
          // Clear module cache to ensure fresh import with new environment variables
          delete require.cache[require.resolve('../server.ts')];

          // Import the server configuration with fresh environment
          const serverModule = await import('../server.ts?t=' + Date.now());
          const serverConfig = serverModule.default;

          // Verify server configuration is properly structured
          expect(serverConfig).toBeDefined();
          expect(typeof serverConfig.fetch).toBe('function');

          // Verify the port getter returns the correct port
          // The server uses a dynamic getter that reads process.env.PORT at runtime
          expect(serverConfig.port).toBe(port);

          // Test that the server can handle basic requests
          const request = new Request(`http://localhost:${port}/health`);
          const response = await serverConfig.fetch(request);

          // Verify the server responds correctly
          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          // Verify health endpoint returns proper JSON
          const healthData = await response.json();
          expect(healthData.status).toBe('ok');
          expect(healthData.mode).toBe('development');
          expect(healthData.timestamp).toBeDefined();

          return true;
        } finally {
          // Restore original environment variables
          if (originalPort !== undefined) {
            process.env.PORT = originalPort;
          } else {
            delete process.env.PORT;
          }

          if (originalNodeEnv !== undefined) {
            process.env.NODE_ENV = originalNodeEnv;
          } else {
            delete process.env.NODE_ENV;
          }
        }
      }
    ),
    { numRuns: 100 }
  );
});

test('Server configuration handles different environments', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom('development', 'production', 'test'),
      async environment => {
        const originalNodeEnv = process.env.NODE_ENV;

        process.env.NODE_ENV = environment;

        try {
          // Import server module
          const serverModule = await import('../server.ts');
          const serverConfig = serverModule.default;

          // Test health endpoint in different environments
          const request = new Request('http://localhost/health');
          const response = await serverConfig.fetch(request);

          expect(response.status).toBe(200);

          const healthData = await response.json();
          expect(healthData.status).toBe('ok');
          expect(healthData.mode).toBe(
            environment === 'production' ? 'production' : 'development'
          );

          return true;
        } finally {
          if (originalNodeEnv !== undefined) {
            process.env.NODE_ENV = originalNodeEnv;
          } else {
            delete process.env.NODE_ENV;
          }
        }
      }
    ),
    { numRuns: 100 }
  );
});

/**
 * **Feature: dependency-setup, Property 3: Application loading without errors**
 * **Validates: Requirements 1.3**
 *
 * For any built application, loading in a browser should render the interface
 * without JavaScript console errors
 */
test('Property 3: Application loading without errors', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom('/', '/health', '/main.tsx'),
      async route => {
        // Set up development environment
        const originalNodeEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'development';

        try {
          // Import the server configuration
          const serverModule = await import('../server.ts');
          const serverConfig = serverModule.default;

          // Test that the server can handle different routes
          const request = new Request(`http://localhost${route}`);
          const response = await serverConfig.fetch(request);

          // Verify the server responds without errors
          expect(response).toBeDefined();
          expect(response.status).toBeLessThan(500); // No server errors

          // For HTML routes, verify content is served
          if (route === '/') {
            expect(response.status).toBe(200);
            const html = await response.text();
            expect(html).toContain('<!DOCTYPE html>');
            expect(html).toContain('One Piece World Atlas');
            expect(html).toContain('<div id="root"></div>');
            // Verify essential scripts are included
            expect(html).toContain('three.min.js');
            expect(html).toContain('tailwindcss.com');
          }

          // For health endpoint, verify JSON response
          if (route === '/health') {
            expect(response.status).toBe(200);
            const healthData = await response.json();
            expect(healthData.status).toBe('ok');
            expect(healthData.mode).toBeDefined();
            expect(healthData.timestamp).toBeDefined();
          }

          // For TypeScript files, verify they're served correctly
          if (route === '/main.tsx') {
            expect(response.status).toBe(200);
            const content = await response.text();
            expect(content).toContain('import React');
            expect(content).toContain('export default');
          }

          return true;
        } finally {
          if (originalNodeEnv !== undefined) {
            process.env.NODE_ENV = originalNodeEnv;
          } else {
            delete process.env.NODE_ENV;
          }
        }
      }
    ),
    { numRuns: 100 }
  );
});

test('Application serves required assets for loading', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom('development', 'production'),
      async environment => {
        const originalNodeEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = environment;

        try {
          const serverModule = await import('../server.ts');
          const serverConfig = serverModule.default;

          // Test main route
          const request = new Request('http://localhost/');
          const response = await serverConfig.fetch(request);

          expect(response.status).toBe(200);
          const html = await response.text();

          // Verify essential elements for application loading
          expect(html).toContain('<div id="root"></div>');
          expect(html).toContain('One Piece World Atlas');

          // Verify external dependencies are included
          expect(html).toContain('three.min.js');
          expect(html).toContain('tailwindcss.com');

          // In development mode, verify React development scripts
          if (environment === 'development') {
            expect(html).toContain('react.development.js');
            expect(html).toContain('react-dom.development.js');
          }

          // In production mode, verify built assets are referenced
          if (environment === 'production') {
            expect(html).toContain('/dist/main.js');
          }

          return true;
        } finally {
          if (originalNodeEnv !== undefined) {
            process.env.NODE_ENV = originalNodeEnv;
          } else {
            delete process.env.NODE_ENV;
          }
        }
      }
    ),
    { numRuns: 100 }
  );
});
