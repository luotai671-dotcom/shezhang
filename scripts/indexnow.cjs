const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'jichangshezhang.com';
const API_KEY = '043d7afeca775d14886bd94042d652b7';
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

/**
 * Extract URLs from a sitemap XML file
 */
function extractUrlsFromSitemap(sitemapPath) {
  if (!fs.existsSync(sitemapPath)) {
    return [];
  }
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const matches = content.match(/<loc>(.*?)<\/loc>/g) || [];
  return matches
    .map(m => m.replace(/<\/?loc>/g, '').trim())
    .filter(url => url.startsWith('http') && !url.includes('.xml'));
}

/**
 * Send POST request to IndexNow API
 */
function submitToIndexNow(urlList) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: HOST,
      key: API_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList,
    });

    const parsedUrl = new URL(INDEXNOW_ENDPOINT);
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          body: data,
        });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log(`\n======================================================`);
  console.log(`🚀 IndexNow Protocol Auto-Submitter for ${HOST}`);
  console.log(`🔑 Key: ${API_KEY}`);
  console.log(`📍 Key Location: ${KEY_LOCATION}`);
  console.log(`======================================================\n`);

  // Support single URL test via argument: node scripts/indexnow.cjs --url https://...
  const urlArgIndex = process.argv.indexOf('--url');
  let urls = [];

  if (urlArgIndex !== -1 && process.argv[urlArgIndex + 1]) {
    urls = [process.argv[urlArgIndex + 1]];
    console.log(`🎯 Single URL test mode: ${urls[0]}`);
  } else {
    // 1. Locate sitemap in dist or root
    const possiblePaths = [
      path.join(process.cwd(), 'dist', 'sitemap-0.xml'),
      path.join(process.cwd(), 'dist', 'sitemap.xml'),
      path.join(process.cwd(), 'sitemap-0.xml'),
      path.join(process.cwd(), 'sitemap.xml'),
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        console.log(`📖 Reading sitemap: ${p}`);
        urls = extractUrlsFromSitemap(p);
        if (urls.length > 0) break;
      }
    }

    if (urls.length === 0) {
      console.warn('⚠️ No URLs extracted from sitemap. Falling back to homepage.');
      urls = [`https://${HOST}/`];
    }
  }

  // Deduplicate and filter out any redirect endpoints
  urls = [...new Set(urls)].filter(u => !u.includes('/go/') && !u.includes('/go.html'));
  console.log(`📦 Prepared ${urls.length} canonical URLs for IndexNow submission.`);

  try {
    const res = await submitToIndexNow(urls);
    console.log(`\n📡 Response Status: ${res.statusCode} ${res.statusMessage}`);
    if (res.statusCode === 200) {
      console.log(`✅ Success (200 OK): All URLs successfully submitted and validated by IndexNow!`);
    } else if (res.statusCode === 202) {
      console.log(`✅ Accepted (202 Accepted): URLs received by IndexNow, key will be verified asynchronously.`);
    } else {
      console.warn(`⚠️ Warning: Received status ${res.statusCode}.`);
      if (res.body) console.log(`Response Body: ${res.body}`);
    }
  } catch (err) {
    console.error(`❌ Failed to send request to IndexNow:`, err.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = { submitToIndexNow, API_KEY, HOST, KEY_LOCATION };

