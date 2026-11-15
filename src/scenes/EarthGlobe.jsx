import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { RocketModel } from './RocketModel';

export function EarthGlobe({ isLaunching = false, launchProgress = 0 }) {
  const earthRef = useRef();
  const cloudsRef = useRef();

  // Load realistic NASA Blue Marble texture
  const earthTexture = useLoader(THREE.TextureLoader, '/nasa/earth-map.jpg');
  earthTexture.wrapS = THREE.RepeatWrapping;
  earthTexture.wrapT = THREE.ClampToEdgeWrapping;

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.04;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.055;
    }
  });

  const rocketPos = [
    0,
    3.2 + (14.0 - 3.2) * launchProgress,
    0.5 + launchProgress * 6.0,
  ];

  return (
    <group>
      {/* 3D Realistic NASA Earth */}
      <group ref={earthRef} position={[0, -0.5, 0]}>
        <mesh receiveShadow castShadow>
          <sphereGeometry args={[3.2, 64, 64]} />
          <meshStandardMaterial
            map={earthTexture}
            roughness={0.65}
            metalness={0.15}
          />
        </mesh>

        {/* Outer Atmospheric Blue Scattering */}
        <mesh scale={[1.035, 1.035, 1.035]}>
          <sphereGeometry args={[3.2, 32, 32]} />
          <meshBasicMaterial
            color="#00A2FF"
            transparent
            opacity={0.16}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Cloud sphere */}
      <mesh ref={cloudsRef} position={[0, -0.5, 0]} scale={[1.018, 1.018, 1.018]}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbiting / Launching SLS Rocket */}
      <RocketModel
        position={rocketPos}
        rotation={[launchProgress * 0.45, 0, -launchProgress * 0.25]}
        isLaunching={isLaunching}
        scale={0.38}
      />
    </group>
  );
}
