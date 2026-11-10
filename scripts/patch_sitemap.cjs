const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'node_modules', '@astrojs', 'sitemap', 'dist', 'index.js');

try {
  if (fs.existsSync(targetPath)) {
    let content = fs.readFileSync(targetPath, 'utf8');
    if (content.includes('_routes.reduce')) {
      content = content.replace('_routes.reduce', '(_routes ?? []).reduce');
      fs.writeFileSync(targetPath, content, 'utf8');
      console.log('✅ Successfully applied patch to @astrojs/sitemap: (_routes ?? []).reduce');
    } else if (content.includes('(_routes ?? []).reduce')) {
      console.log('ℹ️ @astrojs/sitemap is already patched.');
    }
  } else {
    console.log('⚠️ @astrojs/sitemap not found at:', targetPath);
  }
} catch (err) {
  console.error('Error applying @astrojs/sitemap patch:', err);
}
