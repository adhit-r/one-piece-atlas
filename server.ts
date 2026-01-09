import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();

// Serve static files from dist directory
app.use('/dist/*', serveStatic({ root: './' }));

// Serve main HTML page
app.get('*', c => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>One Piece World Atlas - Grand Line Navigator</title>
    <meta name="description" content="Interactive 3D globe visualizing the One Piece world journey" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/dist/main.js"></script>
  </body>
</html>`);
});

const port = process.env.PORT || 3000;

console.log('🚀 One Piece World Atlas Server');
console.log(`📍 Running at http://localhost:${port}`);
console.log('🌊 Setting sail on the Grand Line...\n');

export default {
  port,
  fetch: app.fetch,
};
