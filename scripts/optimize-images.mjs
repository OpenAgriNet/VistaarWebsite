#!/usr/bin/env node
/**
 * Converts photos in public/images/ to WebP and keeps them within the DBIM size limits.
 *
 * Runs automatically from the Husky pre-commit hook:
 *   node scripts/optimize-images.mjs --staged
 *     → converts staged .png/.jpg/.jpeg under public/images/, stages the .webp,
 *       removes the original from the commit and from disk.
 *
 * Or manually on specific files:
 *   npm run images -- public/images/hero.png
 *
 * Folder → limits (DBIM):
 *   public/images/thumbnails/**  max 640px wide,  < 100 KB
 *   public/images/hi-res/**      original size,   < 5 MB
 *   public/images/**             max 1920px wide, < 500 KB  (banners, backgrounds, cards)
 *
 * SVG icons/logos (public/icons, public/logos) are never touched.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, statSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = 'public/images/';
const CONVERTIBLE = /\.(png|jpe?g)$/i;
const QUALITY_STEPS = [80, 72, 64, 56];
const KB = 1024;

const PROFILES = [
  { match: `${IMAGES_DIR}thumbnails/`, maxWidth: 640, budget: 100 * KB, label: 'thumbnail' },
  {
    match: `${IMAGES_DIR}hi-res/`,
    maxWidth: null,
    budget: 5 * 1024 * KB,
    label: 'high-resolution',
  },
  { match: IMAGES_DIR, maxWidth: 1920, budget: 500 * KB, label: 'banner/background' },
];

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const toPosix = (p) => p.split(path.sep).join('/');
const formatKb = (bytes) => `${(bytes / KB).toFixed(0)} KB`;

function stagedImages() {
  const out = git('diff', '--cached', '--name-only', '--diff-filter=AM', '--', IMAGES_DIR);
  return out ? out.split('\n').filter((f) => CONVERTIBLE.test(f)) : [];
}

async function convert(file) {
  const posixFile = toPosix(file);
  const profile = PROFILES.find((p) => posixFile.startsWith(p.match)) ?? PROFILES.at(-1);
  const target = file.replace(CONVERTIBLE, '.webp');

  let size = Infinity;
  for (const quality of QUALITY_STEPS) {
    let pipeline = sharp(file).rotate();
    if (profile.maxWidth) {
      pipeline = pipeline.resize({ width: profile.maxWidth, withoutEnlargement: true });
    }
    await pipeline.webp({ quality, effort: 5 }).toFile(target);
    size = statSync(target).size;
    if (size <= profile.budget) break;
  }

  const status = size <= profile.budget ? '✓' : '⚠ over limit';
  console.log(
    `${status} ${posixFile} → ${toPosix(target)} (${formatKb(size)}, ${profile.label} limit ${formatKb(profile.budget)})`,
  );
  if (size > profile.budget) {
    console.warn(
      `  Reduce the image dimensions or crop it, then commit again. DBIM limit: ${formatKb(profile.budget)}.`,
    );
  }
  return target;
}

async function main() {
  const staged = process.argv.includes('--staged');
  const files = staged ? stagedImages() : process.argv.slice(2).filter((f) => CONVERTIBLE.test(f));

  if (files.length === 0) return;

  for (const file of files) {
    if (!existsSync(file)) continue;
    const webp = await convert(file);
    if (staged) {
      git('rm', '--cached', '--quiet', '--', file);
      git('add', '--', webp);
    }
    unlinkSync(file);
  }
}

main().catch((error) => {
  console.error('Image optimisation failed:', error.message);
  process.exit(1);
});
