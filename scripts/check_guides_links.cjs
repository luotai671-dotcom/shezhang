const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src', 'content', 'guides');
const files = fs.readdirSync(dir);
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const mdLinks = content.match(/\[[^\]]+\]\([^)]+\)/g) || [];
  mdLinks.forEach(l => {
    if (l.includes('http://') || l.includes('https://') || l.includes('/go')) {
      console.log(`${f}: ${l}`);
    }
  });
});

