import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const app = new Hono();

// Environment detection functions (read dynamically)
const isDevelopment = () => process.env.NODE_ENV !== 'production';
const getPort = () => parseInt(process.env.PORT || '3000');

// Static file serving for built assets
app.use(
  '/dist/*',
  serveStatic({
    root: './',
    rewriteRequestPath: path => path.replace(/^\/dist/, '/dist'),
  })
);

// Serve static assets (CSS, images, etc.)
app.use(
  '/assets/*',
  serveStatic({
    root: './',
    rewriteRequestPath: path => path.replace(/^\/assets/, '/assets'),
  })
);

// Development mode: serve source files directly
app.get('/', c => {
  if (isDevelopment()) {
    try {
      const hasBuiltBundle = existsSync('./dist/main.js');
      if (hasBuiltBundle) {
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>One Piece World Atlas</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; }
    </style>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/dist/main.js"></script>
</body>
</html>`;
        return c.html(html);
      }

      // Fallback message if bundle is missing
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>One Piece World Atlas</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #e2e8f0; }
        code { background: rgba(0,0,0,0.4); padding: 0.4rem 0.8rem; border-radius: 0.4rem; display: inline-block; }
    </style>
</head>
<body>
    <div style="padding: 3rem; max-width: 720px; margin: 0 auto; text-align: center;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: #f87171;">🏴‍☠️ One Piece World Atlas</h1>
        <p style="margin-bottom: 1rem; opacity: 0.85;">Development bundle not found.</p>
        <p style="margin-bottom: 0.5rem;">To see the full app in dev:</p>
        <p><code>NODE_ENV=development bun run build.ts</code></p>
        <p style="margin: 0.5rem 0;">then run</p>
        <p><code>bun run --hot server.ts</code></p>
        <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.75;">Or build for production: <code>bun run build && bun run start</code></p>
    </div>
</body>
</html>`;
      return c.html(html);
    } catch (error) {
      console.error('Error serving development page:', error);
      return c.text('Development server error', 500);
    }
  } else {
    try {
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>One Piece World Atlas</title>
    <meta name="description" content="Explore the One Piece world: interactive globe with islands, arcs, episode mapping, and lore." />
    <meta name="keywords" content="One Piece, map, islands, anime, globe, Grand Line, Laugh Tale, Straw Hat" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="One Piece World Atlas" />
    <meta property="og:description" content="Interactive globe and dataset for One Piece — explore islands, episodes, and voyages." />
    <meta property="og:image" content="/assets/preview.svg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="One Piece World Atlas" />
    <meta name="twitter:description" content="Interactive globe and dataset for One Piece — explore islands, episodes, and voyages." />
    <meta name="twitter:image" content="/assets/preview.svg" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; }
    </style>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/dist/main.js"></script>
</body>
</html>`;
      return c.html(html);
    } catch (error) {
      console.error('Error serving production page:', error);
      return c.text('Production server error', 500);
    }
  }
});

// Serve TypeScript files for development (with proper MIME type)
app.get('/main.tsx', async c => {
  try {
    const content = readFileSync('./main.tsx', 'utf-8');
    c.header('Content-Type', 'text/typescript');
    return c.text(content);
  } catch (error) {
    console.error('Error serving main.tsx:', error);
    return c.text('File not found', 404);
  }
});

// Health check endpoint
app.get('/health', c => {
  return c.json({
    status: 'ok',
    mode: isDevelopment() ? 'development' : 'production',
    timestamp: new Date().toISOString(),
  });
});

// Catch-all route for SPA routing
app.get('*', c => {
  // Redirect all other routes to the main app
  return c.redirect('/');
});

// Error handling
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.text('Internal Server Error', 500);
});

// Start server
console.log(`🚀 One Piece World Atlas server starting...`);
console.log(`📍 Mode: ${isDevelopment() ? 'Development' : 'Production'}`);
console.log(`🌊 Port: ${getPort()}`);

export default {
  get port() {
    return getPort();
  },
  fetch: app.fetch,
};
