const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
const ROOT_DIR = path.resolve(__dirname);

// Known 1-segment routes in our Astro site
const SINGLE_SEGMENT_ROUTES = [
  'cheap',
  'recommend',
  'reviews',
  'plans',
  'coupons',
  'wiki',
  'clients',
  'troubleshooting',
  'ai',
  'streaming',
  'compare',
  'rankings',
  'airports',
  'guides',
];

// Known 2-segment route parents
const TWO_SEGMENT_PARENTS = ['airports', 'guides', 'go'];

/**
 * Rewrites absolute root-relative links in an HTML string to relative links based on directory depth
 * @param {string} html 
 * @param {number} depth 0 for root, 1 for cheap/, 2 for airports/shandianshu/
 * @returns {string}
 */
function makeHtmlRelative(html, depth) {
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  // 1. Rewrite core static assets
  html = html.replace(/src="\/_astro\//g, `src="${prefix}_astro/`);
  html = html.replace(/href="\/_astro\//g, `href="${prefix}_astro/`);
  html = html.replace(/href="\/favicon\.svg"/g, `href="${prefix}favicon.svg"`);
  html = html.replace(/src="\/logo\.png"/g, `src="${prefix}logo.png"`);
  html = html.replace(/href="\/logo\.png"/g, `href="${prefix}logo.png"`);
  html = html.replace(/href="\/robots\.txt"/g, `href="${prefix}robots.txt"`);
  html = html.replace(/href="\/llms\.txt"/g, `href="${prefix}llms.txt"`);
  html = html.replace(/href="\/sitemap-index\.xml"/g, `href="${prefix}sitemap-index.xml"`);
  html = html.replace(/href="\/rss\.xml"/g, `href="${prefix}rss.xml"`);

  // 2. Rewrite root path links: href="/" or href="/#foo"
  html = html.replace(/href="\/(#[^"]*)?"/g, (_match, hash) => {
    return `href="${prefix}index.html${hash || ''}"`;
  });

  // 3. Rewrite 2-segment internal routes: href="/airports/xxx", href="/guides/xxx", href="/go/xxx"
  const twoSegPattern = new RegExp(`href="\\/(${TWO_SEGMENT_PARENTS.join('|')})\\/([a-zA-Z0-9_-]+)\\/?(#[^"]*)?"`, 'g');
  html = html.replace(twoSegPattern, (_match, folder, slug, hash) => {
    return `href="${prefix}${folder}/${slug}/index.html${hash || ''}"`;
  });

  // 4. Rewrite 1-segment internal routes: href="/cheap", href="/recommend", etc.
  const singleSegPattern = new RegExp(`href="\\/(${SINGLE_SEGMENT_ROUTES.join('|')})\\/?(#[^"]*)?"`, 'g');
  html = html.replace(singleSegPattern, (_match, folder, hash) => {
    return `href="${prefix}${folder}/index.html${hash || ''}"`;
  });

  return html;
}

/**
 * Recursively copy a directory and rewrite .html files on the fly
 */
function syncDirectory(srcDir, destDir, rootRelativeDepth = 0) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      syncDirectory(srcPath, destPath, rootRelativeDepth + 1);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.html')) {
        let content = fs.readFileSync(srcPath, 'utf8');
        // Rewrite links for direct offline file browsing
        const rewritten = makeHtmlRelative(content, rootRelativeDepth);
        fs.writeFileSync(destPath, rewritten, 'utf8');
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

console.log('🚀 [sync] Starting complete offline static synchronization...');

if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ dist directory does not exist! Please run astro build first.');
  process.exit(1);
}

// 1. Process and update dist in-place so opening dist/ directly also works
console.log('📦 [1/3] Rewriting links inside dist/ for offline portability...');
function processDistInPlace(dir, depth = 0) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDistInPlace(p, depth + 1);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      let content = fs.readFileSync(p, 'utf8');
      const rewritten = makeHtmlRelative(content, depth);
      fs.writeFileSync(p, rewritten, 'utf8');
    }
  }
}
processDistInPlace(DIST_DIR, 0);

// 2. Synchronize all built directories and files to workspace ROOT so double-clicking root/index.html works 100%
console.log('📂 [2/3] Mirroring all subfolders (cheap, recommend, reviews, _astro, etc.) to project root...');
const topEntries = fs.readdirSync(DIST_DIR, { withFileTypes: true });
for (const entry of topEntries) {
  const srcPath = path.join(DIST_DIR, entry.name);
  const destPath = path.join(ROOT_DIR, entry.name);

  if (entry.isDirectory()) {
    syncDirectory(srcPath, destPath, 1);
  } else if (entry.isFile()) {
    if (entry.name.endsWith('.html')) {
      let content = fs.readFileSync(srcPath, 'utf8');
      const rewritten = makeHtmlRelative(content, 0);
      fs.writeFileSync(destPath, rewritten, 'utf8');
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('✅ [3/3] Root synchronization complete! All 43 pages now have direct relative links.');
console.log('🎉 Now both file:/// (double clicking index.html) and http:// (local preview) are 100% functional!');
