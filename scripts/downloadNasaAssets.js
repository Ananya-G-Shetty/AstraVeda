import fs from 'fs';
import path from 'path';
import https from 'https';

const targetDir = path.resolve('public/nasa');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  // Planetary Maps
  {
    name: 'earth-map.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_2048.jpg/2048px-Land_ocean_ice_2048.jpg'
  },
  {
    name: 'moon-map.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Moon_map_merge_full.jpg/2048px-Moon_map_merge_full.jpg'
  },
  {
    name: 'mars-map.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mars_surface_map.jpg/2048px-Mars_surface_map.jpg'
  },
  // Equipment & Rover Images
  {
    name: 'sojourner-rover.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Sojourner_on_Mars_PIA01122.jpg/1280px-Sojourner_on_Mars_PIA01122.jpg'
  },
  {
    name: 'viking-lander.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Viking_lander.jpg/1280px-Viking_lander.jpg'
  },
  {
    name: 'insight-lander.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/InSight_on_Mars_PIA22329.jpg/1280px-InSight_on_Mars_PIA22329.jpg'
  },
  {
    name: 'ingenuity-helicopter.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Ingenuity_in_flight_artist_concept.jpg/1280px-Ingenuity_in_flight_artist_concept.jpg'
  },
  {
    name: 'apollo11-lunar-module.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Apollo_11_Lunar_Module_-_AS11-40-5927.jpg/1280px-Apollo_11_Lunar_Module_-_AS11-40-5927.jpg'
  },
  {
    name: 'lunar-roving-vehicle.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Apollo_15_Lunar_Rover_profile.jpg/1280px-Apollo_15_Lunar_Rover_profile.jpg'
  },
  {
    name: 'alsep-package.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Apollo_16_ALSEP_setup.jpg/1280px-Apollo_16_ALSEP_setup.jpg'
  },
  {
    name: 'surveyor3-lander.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Apollo_12_Conrad_Surveyor.jpg/1280px-Apollo_12_Conrad_Surveyor.jpg'
  },
  {
    name: 'kepler-telescope.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Kepler_spacecraft_model.png/1280px-Kepler_spacecraft_model.png'
  },
  {
    name: 'dawn-spacecraft.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Dawn_Spacecraft_concept.jpg/1280px-Dawn_Spacecraft_concept.jpg'
  },
  {
    name: 'near-shoemaker.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Near_shoemaker.jpg/1280px-Near_shoemaker.jpg'
  },
  {
    name: 'pioneer-probe.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Pioneer_10-11_spacecraft.jpg/1280px-Pioneer_10-11_spacecraft.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const getOptions = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) NASA-Space-Apps-Challenge-Agent/1.0'
      }
    };

    function requestUrl(targetUrl) {
      https.get(targetUrl, getOptions, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          return requestUrl(response.headers.location);
        }
        if (response.statusCode !== 200) {
          return reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }

    requestUrl(url);
  });
}

async function run() {
  console.log(`Downloading ${assets.length} real NASA assets...`);
  for (const asset of assets) {
    const dest = path.join(targetDir, asset.name);
    try {
      console.log(`Downloading ${asset.name}...`);
      await download(asset.url, dest);
      const stat = fs.statSync(dest);
      console.log(`✓ ${asset.name} (${Math.round(stat.size / 1024)} KB)`);
    } catch (e) {
      console.error(`✗ Error downloading ${asset.name}:`, e.message);
    }
  }
  console.log('Finished downloading NASA assets.');
}

run();

