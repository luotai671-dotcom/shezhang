const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');

const domainToSlug = {
  'shandianshuaff.com': 'shandianshu',
  'dalaoyunaff.com': 'dalaoyun',
  'liulianyunaff.com': 'liulianyun',
  'shenxingaff.com': 'shenxing',
  'yunjiexianaff.com': 'yunjiexian',
  'huanqiutiaff.com': 'huanqiuti',
  'jlyvipaff.com': 'jilianyun',
  'gsyvipaff.com': 'guangshuyun',
  'gntvipaff.cc': 'guangnianti',
  'edgenovaaff.com': 'edgenova',
  'speedworldaff.cc': 'sujie',
};

function getAllFiles(dir, exts = ['.astro', '.html', '.md', '.mdx', '.ts', '.tsx']) {
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

const files = getAllFiles(srcDir);
let totalTagsUpdated = 0;
let filesModified = 0;

files.forEach(file => {
  // Exclude utils/affiliate.ts from rewriting target URLs so the mapping stays intact
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  if (relPath === 'src/utils/affiliate.ts') return;
  // Also keep directAffiliateUrl in frontmatter of src/content/airports/*.md intact as database definition
  const isAirportContent = relPath.startsWith('src/content/airports/');

  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  let fileChanges = 0;

  // 1. Replace any direct raw affiliate domain hrefs inside <a> tags or markdown links with /go/${slug}
  if (!isAirportContent) {
    Object.keys(domainToSlug).forEach(domain => {
      const slug = domainToSlug[domain];
      // Regex for href="https://...domain.../..."
      const hrefRegex = new RegExp(`href=["']https?://[^"']*${domain}[^"']*["']`, 'gi');
      if (hrefRegex.test(content)) {
        content = content.replace(hrefRegex, `href="/go/${slug}"`);
        fileChanges++;
      }
      // Regex for Markdown links [text](https://...domain...)
      const mdRegex = new RegExp(`\\]\\(https?://[^)]*${domain}[^)]*\\)`, 'gi');
      if (mdRegex.test(content)) {
        content = content.replace(mdRegex, `](/go/${slug})`);
        fileChanges++;
      }
    });
  }

  // 2. Scan all <a> tags that point to /go/ or /go.html
  // Replace rel="..." with rel="nofollow sponsored noopener noreferrer"
  // Or add rel="nofollow sponsored noopener noreferrer" if missing
  const aTagRegex = /<a\b([^>]*?)>/gi;
  content = content.replace(aTagRegex, (fullTag, attrs) => {
    // Check if this tag has href pointing to /go/ or /go.html or external link
    const hrefMatch = attrs.match(/\bhref=(["'])(.*?)\1/i) || attrs.match(/\bhref=\{`(.*?)\`\}/i);
    if (!hrefMatch) return fullTag;

    const hrefVal = hrefMatch[2] || hrefMatch[1] || '';
    const isAffLink = hrefVal.includes('/go/') || hrefVal.includes('/go.html') || hrefVal.includes('/go/${');

    if (!isAffLink) return fullTag;

    totalTagsUpdated++;
    fileChanges++;

    // Check if rel exists
    if (/rel=["'][^"']*["']/i.test(attrs)) {
      return fullTag.replace(/rel=["'][^"']*["']/i, 'rel="nofollow sponsored noopener noreferrer"');
    } else {
      // Add rel attribute
      return `<a rel="nofollow sponsored noopener noreferrer"${attrs}>`;
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    filesModified++;
    console.log(`Updated: ${relPath} (${fileChanges} changes)`);
  }
});

console.log(`\nCompleted! Total modified files: ${filesModified}, total <a> tags updated: ${totalTagsUpdated}`);

