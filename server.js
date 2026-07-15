const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const { extname, join, normalize, relative } = require('node:path');

const publicDir = __dirname;
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';
const publicFiles = new Set([
  '/index.html',
  '/styles.css',
  '/assets/portfolio-preview.svg',
  '/assets/portfolio-preview.generated.svg',
  '/favicon.svg',
]);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
};

function resolvePublicPath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;

  if (!publicFiles.has(requested)) {
    return requested.includes('.') ? null : join(publicDir, 'index.html');
  }

  const filePath = normalize(join(publicDir, requested));
  const relativePath = relative(publicDir, filePath);
  return relativePath.startsWith('..') || relativePath.startsWith('/') ? null : filePath;
}

createServer(async (req, res) => {
  if ((req.url || '').split('?')[0] === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ status: 'ok', service: 'portfolio-black-dark' }));
    return;
  }

  const filePath = resolvePublicPath(req.url || '/');

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  try {
    const body = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': types[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': filePath.endsWith('index.html') ? 'no-store' : 'public, max-age=3600',
    });
    res.end(body);
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Unable to load portfolio');
  }
}).listen(port, host, () => {
  console.log(`Portfolio running at http://${host}:${port}`);
});
