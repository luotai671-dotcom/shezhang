const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');

function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const allFiles = getAllFiles(srcDir);
const caseErrors = [];

allFiles.forEach(file => {
  if (!file.endsWith('.astro') && !file.endsWith('.ts') && !file.endsWith('.tsx') && !file.endsWith('.md') && !file.endsWith('.mdx')) {
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  const importRegex = /(?:import|from)\s+['"](\.[^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const relImport = match[1];
    const dir = path.dirname(file);
    const targetBase = path.resolve(dir, relImport);

    // Try extensions
    const possibleExts = ['', '.ts', '.astro', '.tsx', '.js', '.json', '.mjs', '/index.ts', '/index.astro', '/index.js'];
    let found = false;
    let actualName = null;

    for (const ext of possibleExts) {
      const candidate = targetBase + ext;
      if (fs.existsSync(candidate)) {
        // Now check exact case of each segment in candidate!
        const parsed = path.parse(candidate);
        const parentDir = parsed.dir;
        const baseName = parsed.base;
        if (fs.existsSync(parentDir)) {
          const filesInParent = fs.readdirSync(parentDir);
          if (filesInParent.includes(baseName)) {
            found = true;
            break;
          } else {
            const matchingCaseInsensitive = filesInParent.find(f => f.toLowerCase() === baseName.toLowerCase());
            if (matchingCaseInsensitive) {
              caseErrors.push({
                file: path.relative(process.cwd(), file),
                import: relImport,
                expected: matchingCaseInsensitive,
                actualInImport: baseName
              });
              found = true;
              break;
            }
          }
        }
      }
    }

    if (!found) {
      console.log(`Unresolved import in ${path.relative(process.cwd(), file)}: ${relImport}`);
    }
  }
});

console.log('Case errors found:', caseErrors.length);
caseErrors.forEach(err => {
  console.log(`  File: ${err.file}`);
  console.log(`    Imported: ${err.import}`);
  console.log(`    Disk has: ${err.expected} vs import wants ${err.actualInImport}`);
});

