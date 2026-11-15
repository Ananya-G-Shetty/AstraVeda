import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { ArtifactMarker } from './ArtifactMarker';
import { latLonToVector3 } from '../utils/geoMath';

export function MarsGlobe({
  artifacts = [],
  onSelectArtifact,
  onHoverArtifact,
  discoveredIds = [],
  radius = 3.6,
  autoRotate = true,
}) {
  const marsRef = useRef();

  // Load authentic NASA 2K Viking/MGS Mars surface map
  const marsTexture = useLoader(THREE.TextureLoader, '/nasa/mars-map.jpg');
  marsTexture.wrapS = THREE.RepeatWrapping;
  marsTexture.wrapT = THREE.ClampToEdgeWrapping;

  useFrame((state, delta) => {
    if (marsRef.current && autoRotate) {
      marsRef.current.rotation.y += delta * 0.025;
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
    <group ref={marsRef}>
      {/* 3D Mars Globe with Official NASA Surface Map */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={marsTexture}
          roughness={0.88}
          metalness={0.12}
        />
      </mesh>

      {/* Atmospheric Scattering Glow (Salmon / Amber Martian haze) */}
      <mesh scale={[1.04, 1.04, 1.04]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#FF5522"
          transparent
          opacity={0.14}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Rugged Dust Horizon Halo */}
      <mesh scale={[1.07, 1.07, 1.07]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#FF9955"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Interactive Martian Explorer Beacons */}
      {markersWithPos.map(({ artifact, pos }) => (
        <ArtifactMarker
          key={artifact.id}
          artifact={artifact}
          position={pos}
          color="#FF4D2D"
          onSelect={onSelectArtifact}
          onHoverArtifact={onHoverArtifact}
          isDiscovered={discoveredIds.includes(artifact.id)}
        />
      ))}
    </group>
  );
}
