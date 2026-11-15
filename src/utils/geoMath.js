/**
 * Geographic Coordinate Conversion for Three.js Spherical Planetary Globes
 * Accurately aligns latitude/longitude degrees with NASA equirectangular maps.
 */

export function latLonToVector3(lat, lon, radius) {
  // Polar angle from positive Y-axis (0 at North Pole, PI/2 at Equator, PI at South Pole)
  const phi = (90 - lat) * (Math.PI / 180);
  
  // Azimuthal angle around Y-axis (aligned with standard Three.js texture prime meridian)
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

