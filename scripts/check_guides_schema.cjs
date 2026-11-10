const fs = require('fs');
const path = require('path');

const guidesDir = path.join(process.cwd(), 'src', 'content', 'guides');
const validCategories = ['beginner', 'protocol', 'client', 'troubleshoot', 'ranking'];
const files = fs.readdirSync(guidesDir);

files.forEach(f => {
  const content = fs.readFileSync(path.join(guidesDir, f), 'utf8');
  const catMatch = content.match(/category:\s*["']?([^"'\r\n]+)["']?/);
  if (!catMatch) {
    console.log(`Missing category in ${f}`);
  } else {
    const cat = catMatch[1].trim();
    if (!validCategories.includes(cat)) {
      console.log(`INVALID category in ${f}: "${cat}" (Allowed: ${validCategories.join(', ')})`);
    }
  }
});
console.log('Finished checking guides categories.');
