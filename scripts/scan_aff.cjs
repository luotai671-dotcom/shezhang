const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const knownDomains = [
  'shandianshuaff.com',
  'dalaoyunaff.com',
  'liulianyunaff.com',
  'shenxingaff.com',
  'yunjiexianaff.com',
  'huanqiutiaff.com',
  'jlyvipaff.com',
  'gsyvipaff.com',
  'gntvipaff.cc',
  'edgenovaaff.com',
  'speedworldaff.cc',
];

function getAllFiles(dir, exts = ['.astro', '.html', '.md', '.ts', '.tsx', '.json', '.mjs', '.cjs']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (exts.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const allFiles = getAllFiles(rootDir);
console.log(`Total scanned files: ${allFiles.length}`);

const directAffHits = [];
const goLinkHits = [];
const externalLinkIssues = [];

const aTagRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;

allFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');

  // Check known affiliate domains
  knownDomains.forEach((domain) => {
    if (content.includes(domain)) {
      directAffHits.push({ file: relPath, domain });
    }
  });

  // Check <a> tags
  let match;
  while ((match = aTagRegex.exec(content)) !== null) {
    const fullTag = match[0];
    const href = match[1];

    const isGoLink = href.startsWith('/go/') || href.startsWith('/go.html') || href.includes('go/');
    const isDirectAff = knownDomains.some((d) => href.includes(d));

    if (isGoLink || isDirectAff) {
      const relMatch = fullTag.match(/rel=["']([^"']+)["']/i);
      const relVal = relMatch ? relMatch[1] : '';
      const tokens = relVal.toLowerCase().split(/\s+/);

      const hasNofollow = tokens.includes('nofollow');
      const hasSponsored = tokens.includes('sponsored');
      const hasNoopener = tokens.includes('noopener');
      const hasNoreferrer = tokens.includes('noreferrer');

      const isCompliant = hasNofollow && hasSponsored && hasNoopener && hasNoreferrer;

      goLinkHits.push({
        file: relPath,
        href,
        fullTag,
        relVal,
        isCompliant,
        isDirectAff,
      });

      if (!isCompliant) {
        externalLinkIssues.push({
          file: relPath,
          href,
          fullTag,
          relVal,
          missing: [
            !hasNofollow && 'nofollow',
            !hasSponsored && 'sponsored',
            !hasNoopener && 'noopener',
            !hasNoreferrer && 'noreferrer',
          ].filter(Boolean),
        });
      }
    }
  }
});

console.log(`\n--- Direct Affiliate Domain Hits: ${directAffHits.length} ---`);
directAffHits.forEach((h) => console.log(`  [${h.domain}] in ${h.file}`));

console.log(`\n--- Total /go/ or Affiliate Links in <a> tags: ${goLinkHits.length} ---`);
console.log(`--- Non-compliant <a> tags needing rel fix: ${externalLinkIssues.length} ---`);
externalLinkIssues.forEach((issue) => {
  console.log(`  File: ${issue.file}`);
  console.log(`    Href: ${issue.href}`);
  console.log(`    Current rel: "${issue.relVal}" (Missing: ${issue.missing.join(', ')})`);
});

