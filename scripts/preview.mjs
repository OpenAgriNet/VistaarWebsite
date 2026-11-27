#!/usr/bin/env node
/**
 * Serves `out/` the way S3 static website hosting does:
 *   /            → out/index.html
 *   /about/      → out/about/index.html
 *   missing path → out/404.html with status 404
 *
 * Usage: npm run build && npm run preview   (http://localhost:4173)
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';

const ROOT = path.resolve('out');
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const candidate = path.join(ROOT, path.normalize(decoded));
  if (!candidate.startsWith(ROOT)) return null;
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    const index = path.join(candidate, 'index.html');
    return existsSync(index) ? index : null;
  }
  return existsSync(candidate) ? candidate : null;
}

if (!existsSync(ROOT)) {
  console.error('out/ not found. Run `npm run build` first.');
  process.exit(1);
}

createServer((req, res) => {
  const file = resolveFile(req.url ?? '/');
  const target = file ?? path.join(ROOT, '404.html');
  res.writeHead(file ? 200 : 404, {
    'Content-Type': TYPES[path.extname(target)] ?? 'application/octet-stream',
  });
  createReadStream(target).pipe(res);
}).listen(PORT, () => {
  console.log(`Previewing out/ like S3 at http://localhost:${PORT}`);
});
