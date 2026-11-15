import fs from 'fs';
import path from 'path';
import https from 'https';

const targetDir = path.resolve('public/nasa');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Map equipment IDs to NASA Image Library search queries
const queries = [
  { id: 'apollo11-lunar-module', q: 'Apollo 11 Lunar Module Eagle surface' },
  { id: 'lunar-roving-vehicle', q: 'Apollo 15 Lunar Roving Vehicle Hadley' },
  { id: 'alsep-package', q: 'Apollo 16 ALSEP deployment lunar' },
  { id: 'surveyor3-lander', q: 'Apollo 12 Surveyor 3' },
  { id: 'sojourner-rover', q: 'Mars Pathfinder Sojourner rover Yogi' },
  { id: 'viking-lander', q: 'Viking 1 lander Mars surface' },
  { id: 'insight-lander', q: 'InSight lander Mars SEIS' },
  { id: 'ingenuity-helicopter', q: 'Ingenuity Mars Helicopter flight' },
  { id: 'kepler-telescope', q: 'Kepler spacecraft concept' },
  { id: 'dawn-spacecraft', q: 'Dawn spacecraft Ceres' },
  { id: 'near-shoemaker', q: 'NEAR Shoemaker Eros' },
  { id: 'pioneer-probe', q: 'Pioneer 10 spacecraft Jupiter plaque' }
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return https.get(res.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => file.close(resolve));
        });
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Querying NASA Open Image API...');
  for (const item of queries) {
    try {
      const searchUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(item.q)}&media_type=image`;
      console.log(`Searching NASA API for "${item.q}"...`);
      const res = await fetchJson(searchUrl);
      const items = res?.collection?.items || [];
      if (items.length > 0) {
        const first = items[0];
        const imageUrl = first.links?.[0]?.href;
        if (imageUrl) {
          const dest = path.join(targetDir, `${item.id}.jpg`);
          console.log(`Downloading ${item.id} from ${imageUrl}...`);
          await downloadFile(imageUrl, dest);
          const stat = fs.statSync(dest);
          console.log(`✓ ${item.id}.jpg (${Math.round(stat.size / 1024)} KB)`);
        }
      }
      // Small pause to be gentle
      await new Promise(r => setTimeout(r, 400));
    } catch (e) {
      console.error(`Error for ${item.id}:`, e.message);
    }
  }
  console.log('NASA Image retrieval complete.');
}

run();

