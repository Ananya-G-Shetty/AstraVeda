import fs from 'fs';
import path from 'path';
import https from 'https';

const targetDir = path.resolve('public/nasa');

const maps = [
  {
    name: 'earth-map.jpg',
    url: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
  },
  {
    name: 'moon-map.jpg',
    url: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg'
  },
  {
    name: 'mars-map.jpg',
    url: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mars_1k_color.jpg'
  },
  {
    name: 'pioneer-probe.jpg',
    url: 'https://images-assets.nasa.gov/image/PIA01346/PIA01346~small.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return https.get(res.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => file.close(resolve));
        });
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  for (const m of maps) {
    const dest = path.join(targetDir, m.name);
    console.log(`Downloading ${m.name}...`);
    try {
      await download(m.url, dest);
      const stat = fs.statSync(dest);
      console.log(`✓ ${m.name} (${Math.round(stat.size / 1024)} KB)`);
    } catch (e) {
      console.error(`✗ Error for ${m.name}:`, e.message);
    }
  }
}

run();

