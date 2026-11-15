import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function RocketModel({ isLaunching = false, scale = 0.5, ...props }) {
  const rocketGroup = useRef();
  const flameRef = useRef();

  useFrame((state, delta) => {
    if (flameRef.current && isLaunching) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 30) * 0.3;
      flameRef.current.scale.x = 1 + Math.cos(state.clock.elapsedTime * 25) * 0.2;
    }
    if (rocketGroup.current && !isLaunching) {
      // Gentle idle float
      rocketGroup.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.001;
    }
  });

  return (
    <group ref={rocketGroup} scale={scale} {...props}>
      {/* Main Core Stage (Orange/White NASA SLS aesthetic) */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 3.6, 32]} />
        <meshStandardMaterial color="#E86C19" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Orion Capsule / Upper Stage */}
      <mesh position={[0, 3.9, 0]}>
        <cylinderGeometry args={[0.22, 0.35, 0.8, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Nose Cone / Launch Abort System */}
      <mesh position={[0, 4.6, 0]}>
        <coneGeometry args={[0.22, 0.7, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Abort Tower Tower Pin */}
      <mesh position={[0, 5.15, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 16]} />
        <meshStandardMaterial color="#888888" metalness={0.8} />
      </mesh>

      {/* Solid Rocket Booster Left */}
      <mesh position={[-0.55, 1.2, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 3.2, 24]} />
        <meshStandardMaterial color="#F0F0F0" roughness={0.3} />
      </mesh>
      <mesh position={[-0.55, 2.9, 0]}>
        <coneGeometry args={[0.16, 0.45, 24]} />
        <meshStandardMaterial color="#E86C19" roughness={0.3} />
      </mesh>

      {/* Solid Rocket Booster Right */}
      <mesh position={[0.55, 1.2, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 3.2, 24]} />
        <meshStandardMaterial color="#F0F0F0" roughness={0.3} />
      </mesh>
      <mesh position={[0.55, 2.9, 0]}>
        <coneGeometry args={[0.16, 0.45, 24]} />
        <meshStandardMaterial color="#E86C19" roughness={0.3} />
      </mesh>

      {/* Engine Bell Nozzles */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.28, 0.38, 0.35, 24]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Thruster Flame Plume (Active during launch) */}
      {isLaunching && (
        <group ref={flameRef} position={[0, -0.6, 0]}>
          {/* Inner core bright yellow/blue fire */}
          <mesh position={[0, -0.8, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.3, 1.6, 24]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.9} />
          </mesh>
          {/* Outer orange exhaust roar */}
          <mesh position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.55, 2.4, 24]} />
            <meshBasicMaterial color="#FF5500" transparent opacity={0.65} />
          </mesh>
          <pointLight color="#FF7700" intensity={4} distance={10} />
        </group>
      )}
    </group>
  );
}

