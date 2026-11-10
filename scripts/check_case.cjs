const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

const allFiles = getFiles('src');
let issues = [];

allFiles.forEach(filePath => {
  if (!/\.(astro|ts|tsx|js|mjs|mdx)$/.test(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex = /(?:import|from)\s+['"](\.[^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const relPath = match[1];
    const baseDir = path.dirname(filePath);
    const target = path.resolve(baseDir, relPath);
    
    const candidates = [
      target,
      target + '.ts',
      target + '.tsx',
      target + '.js',
      target + '.mjs',
      target + '.astro',
      target + '.json',
      path.join(target, 'index.ts'),
      path.join(target, 'index.js'),
      path.join(target, 'index.astro')
    ];
    
    let resolved = null;
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        const dir = path.dirname(c);
        const base = path.basename(c);
        if (fs.existsSync(dir)) {
          const filesInDir = fs.readdirSync(dir);
          if (filesInDir.includes(base)) {
            resolved = c;
            break;
          } else {
            const caseMismatch = filesInDir.find(f => f.toLowerCase() === base.toLowerCase());
            if (caseMismatch) {
              issues.push({ file: filePath, import: relPath, actual: caseMismatch, expected: base });
              resolved = c;
              break;
            }
          }
        }
      }
    }
    if (!resolved) {
      issues.push({ file: filePath, import: relPath, error: 'NOT FOUND' });
    }
  }
});

console.log('Issues found:', JSON.stringify(issues, null, 2));
