import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export function SolarTravelScene({
  hoveredDestination,
  onSelectDestination,
  onHoverDestination,
}) {
  const moonRef = useRef();
  const marsRef = useRef();
  const shipRef = useRef();

  // Load official NASA surface textures
  const moonTexture = useLoader(THREE.TextureLoader, '/nasa/moon-map.jpg');
  const marsTexture = useLoader(THREE.TextureLoader, '/nasa/mars-map.jpg');

  useFrame((state, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.05;
    }
    if (marsRef.current) {
      marsRef.current.rotation.y += delta * 0.04;
    }
    if (shipRef.current) {
      shipRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.08;
    }
  });

  return (
    <group>
      {/* Central Star Sun Glow in the deep distance */}
      <mesh position={[0, 15, -60]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial color="#FFF5D6" />
      </mesh>
      <pointLight position={[0, 15, -50]} intensity={2.5} color="#FFF2CC" />

      {/* LEFT: THE MOON (Cyan Glow) */}
      <group
        position={[-6.5, 0.5, -4]}
        onPointerOver={() => onHoverDestination && onHoverDestination('moon')}
        onPointerOut={() => onHoverDestination && onHoverDestination(null)}
        onClick={() => onSelectDestination && onSelectDestination('moon')}
        className="cursor-pointer"
      >
        <mesh
          ref={moonRef}
          scale={hoveredDestination === 'moon' ? [1.15, 1.15, 1.15] : [1, 1, 1]}
        >
          <sphereGeometry args={[2.5, 48, 48]} />
          <meshStandardMaterial map={moonTexture} roughness={0.9} />
        </mesh>

        {/* Cyan Atmosphere & Targeting Reticle Ring */}
        <mesh
          scale={hoveredDestination === 'moon' ? [1.25, 1.25, 1.25] : [1.08, 1.08, 1.08]}
        >
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={hoveredDestination === 'moon' ? 0.35 : 0.15}
            side={THREE.BackSide}
          />
        </mesh>


      </group>

      {/* RIGHT: MARS (Amber / Red Glow) */}
      <group
        position={[6.5, 0.5, -4]}
        onPointerOver={() => onHoverDestination && onHoverDestination('mars')}
        onPointerOut={() => onHoverDestination && onHoverDestination(null)}
        onClick={() => onSelectDestination && onSelectDestination('mars')}
        className="cursor-pointer"
      >
        <mesh
          ref={marsRef}
          scale={hoveredDestination === 'mars' ? [1.15, 1.15, 1.15] : [1, 1, 1]}
        >
          <sphereGeometry args={[2.8, 48, 48]} />
          <meshStandardMaterial map={marsTexture} roughness={0.88} />
        </mesh>

        {/* Amber / Red Atmosphere */}
        <mesh
          scale={hoveredDestination === 'mars' ? [1.25, 1.25, 1.25] : [1.08, 1.08, 1.08]}
        >
          <sphereGeometry args={[2.8, 32, 32]} />
          <meshBasicMaterial
            color="#FF4D2D"
            transparent
            opacity={hoveredDestination === 'mars' ? 0.4 : 0.18}
            side={THREE.BackSide}
          />
        </mesh>


      </group>

      {/* CENTER: Authentic NASA SLS Rocket Cruising */}
      <group ref={shipRef} position={[0, -2.2, 2]}>
        {/* Orange Core Stage */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.45, 3.4, 32]} />
          <meshStandardMaterial color="#E86C1F" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* White Orion Capsule & Nosecone */}
        <mesh position={[0, 2.1, 0]}>
          <coneGeometry args={[0.44, 0.9, 32]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh position={[0, 2.7, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>

        {/* Left Solid Rocket Booster (SRB) */}
        <group position={[-0.72, -0.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.22, 3.2, 24]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.3} metalness={0.2} />
          </mesh>
          <mesh position={[0, 1.8, 0]}>
            <coneGeometry args={[0.22, 0.5, 24]} />
            <meshStandardMaterial color="#E86C1F" />
          </mesh>
          <mesh position={[0, -1.8, 0]}>
            <cylinderGeometry args={[0.16, 0.22, 0.35, 16]} />
            <meshBasicMaterial color="#00F0FF" />
          </mesh>
        </group>

        {/* Right Solid Rocket Booster (SRB) */}
        <group position={[0.72, -0.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.22, 3.2, 24]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.3} metalness={0.2} />
          </mesh>
          <mesh position={[0, 1.8, 0]}>
            <coneGeometry args={[0.22, 0.5, 24]} />
            <meshStandardMaterial color="#E86C1F" />
          </mesh>
          <mesh position={[0, -1.8, 0]}>
            <cylinderGeometry args={[0.16, 0.22, 0.35, 16]} />
            <meshBasicMaterial color="#00F0FF" />
          </mesh>
        </group>

        {/* Main Engines Blue Plasma Glow */}
        <mesh position={[0, -1.9, 0]}>
          <cylinderGeometry args={[0.25, 0.38, 0.45, 16]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
        <pointLight position={[0, -2.4, 0]} color="#00F0FF" intensity={4} distance={8} />
      </group>
    </group>
  );
}
