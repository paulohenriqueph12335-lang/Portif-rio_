const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const { extname, join, normalize } = require('node:path');

const publicDir = __dirname;
const port = process.env.PORT || 3000;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml; charset=utf-8', '.json': 'application/json; charset=utf-8' };

function safePath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const filePath = normalize(join(publicDir, requested));
  return filePath.startsWith(publicDir) ? filePath : join(publicDir, 'index.html');
}

createServer(async (req, res) => {
  try {
    const filePath = safePath(req.url || '/');
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': types[extname(filePath)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    const body = await readFile(join(publicDir, 'index.html'));
    res.writeHead(200, { 'Content-Type': types['.html'] });
    res.end(body);
  }
}).listen(port, () => {
  console.log(`Portfolio running on port ${port}`);
});
