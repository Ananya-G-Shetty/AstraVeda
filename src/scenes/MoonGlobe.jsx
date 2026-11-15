import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { ArtifactMarker } from './ArtifactMarker';
import { latLonToVector3 } from '../utils/geoMath';

export function MoonGlobe({
  artifacts = [],
  onSelectArtifact,
  onHoverArtifact,
  discoveredIds = [],
  radius = 3.5,
  autoRotate = true,
}) {
  const moonRef = useRef();

  // Load official NASA LRO Clementine global lunar map
  const moonTexture = useLoader(THREE.TextureLoader, '/nasa/moon-map.jpg');
  moonTexture.wrapS = THREE.RepeatWrapping;
  moonTexture.wrapT = THREE.ClampToEdgeWrapping;

  useFrame((state, delta) => {
    if (moonRef.current && autoRotate) {
      moonRef.current.rotation.y += delta * 0.03;
    }
  });

  // Calculate exact geographical positions
  const markersWithPos = useMemo(() => {
    return artifacts.map((art) => {
      const pos = latLonToVector3(
        art.coordinates.lat,
        art.coordinates.lon,
        radius + 0.06
      );
      return {
        artifact: art,
        pos,
      };
    });
  }, [artifacts, radius]);

  return (
    <group ref={moonRef}>
      {/* 3D Moon Sphere with Official NASA Surface Map */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={moonTexture}
          roughness={0.92}
          metalness={0.05}
        />
      </mesh>

      {/* Subtle Moon Atmospheric Glow / Horizon Halo */}
      <mesh scale={[1.025, 1.025, 1.025]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#A0E0FF"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Interactive Lunar Artifact Beacons */}
      {markersWithPos.map(({ artifact, pos }) => (
        <ArtifactMarker
          key={artifact.id}
          artifact={artifact}
          position={pos}
          color="#00F0FF"
          onSelect={onSelectArtifact}
          onHoverArtifact={onHoverArtifact}
          isDiscovered={discoveredIds.includes(artifact.id)}
        />
      ))}
    </group>
  );
}
