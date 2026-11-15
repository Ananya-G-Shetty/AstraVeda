import * as THREE from 'three';

// Procedural Canvas Texture Generators (100% offline, immediate, high-fidelity)

export function createEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep ocean blue gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
  oceanGrad.addColorStop(0, '#0a254d');
  oceanGrad.addColorStop(0.5, '#0b396e');
  oceanGrad.addColorStop(1, '#0a254d');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Continents & landmasses
  ctx.fillStyle = '#2d5a27';
  
  // North & South America
  drawLandmass(ctx, 250, 180, 100, 120, '#38662e');
  drawLandmass(ctx, 320, 340, 70, 130, '#2e5828');
  
  // Africa & Europe
  drawLandmass(ctx, 520, 260, 90, 140, '#6e6338');
  drawLandmass(ctx, 510, 130, 80, 70, '#326028');

  // Asia & Australia
  drawLandmass(ctx, 720, 160, 160, 110, '#4a602c');
  drawLandmass(ctx, 840, 360, 70, 60, '#785b30');

  // Polar ice caps
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1024, 25);
  ctx.fillRect(0, 485, 1024, 27);

  // Swirling white clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  for (let i = 0; i < 40; i++) {
    const cx = (i * 27) % 1024;
    const cy = 60 + ((i * 37) % 380);
    const cr = 20 + (i % 25);
    ctx.beginPath();
    ctx.ellipse(cx, cy, cr * 2.2, cr * 0.7, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createMoonTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Lunar highland base gray
  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(0, 0, 1024, 512);

  // Dark basaltic Lunar Maria (Sea of Tranquility, Ocean of Storms, Mare Imbrium)
  ctx.fillStyle = '#5c5c60';
  ctx.beginPath();
  ctx.ellipse(320, 200, 120, 90, 0.3, 0, Math.PI * 2); // Oceanus Procellarum
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(480, 180, 80, 60, -0.2, 0, Math.PI * 2); // Mare Imbrium
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(590, 240, 90, 65, 0.1, 0, Math.PI * 2); // Mare Serenitatis / Tranquillitatis
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(680, 260, 60, 50, 0, 0, Math.PI * 2); // Mare Crisium
  ctx.fill();

  // Noise and fine crater pocks
  for (let i = 0; i < 800; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 512;
    const r = 1 + Math.random() * 5;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(40,40,40,0.3)' : 'rgba(230,230,230,0.35)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Major ray craters (Tycho, Copernicus)
  drawRayCrater(ctx, 420, 360, 12); // Tycho
  drawRayCrater(ctx, 450, 220, 9);  // Copernicus

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createMarsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Martian rust-red gradient
  const marsGrad = ctx.createLinearGradient(0, 0, 0, 512);
  marsGrad.addColorStop(0, '#a83c18');
  marsGrad.addColorStop(0.5, '#c85a2b');
  marsGrad.addColorStop(1, '#943214');
  ctx.fillStyle = marsGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Dark volcanic plains (Syrtis Major, Acidalia Planitia)
  ctx.fillStyle = '#632512';
  ctx.beginPath();
  ctx.ellipse(600, 260, 90, 60, -0.4, 0, Math.PI * 2); // Syrtis Major
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(350, 180, 120, 70, 0.1, 0, Math.PI * 2); // Acidalia
  ctx.fill();

  // Valles Marineris canyon scar
  ctx.strokeStyle = '#3d160b';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(280, 290);
  ctx.bezierCurveTo(340, 295, 420, 280, 480, 305);
  ctx.stroke();

  // Olympus Mons shield volcano
  ctx.fillStyle = '#872e12';
  ctx.beginPath();
  ctx.arc(210, 220, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#4a190a';
  ctx.beginPath();
  ctx.arc(210, 220, 8, 0, Math.PI * 2);
  ctx.fill();

  // Polar ice caps (frozen CO2 and water ice)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillRect(0, 0, 1024, 20);
  ctx.fillRect(0, 492, 1024, 20);

  // Dust ripples
  ctx.fillStyle = 'rgba(240, 160, 110, 0.15)';
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 512;
    ctx.fillRect(x, y, 4 + Math.random() * 15, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function drawLandmass(ctx, cx, cy, rx, ry, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
  ctx.fill();
}

function drawRayCrater(ctx, cx, cy, r) {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1.5;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * (r * 4.5), cy + Math.sin(a) * (r * 4.5));
    ctx.stroke();
  }
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#555555';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
  ctx.fill();
}

