import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { sound } from '../utils/soundEngine';

export function ArtifactMarker({
  artifact,
  position,
  color = '#00F0FF',
  onSelect,
  onHoverArtifact,
  isDiscovered = false,
}) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();
  const pulseRef = useRef();

  // Calculate surface normal and quaternion to align ground rings flat against the sphere
  const { normal, quaternion } = useMemo(() => {
    const norm = new THREE.Vector3(...position).normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      norm
    );
    return { normal: norm, quaternion: quat };
  }, [position]);

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.2;
    }
    if (pulseRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3.5) * 0.14;
      pulseRef.current.scale.set(s, s, 1);
    }
  });

  const handleClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    sound.playClick('decision');
    if (onSelect) {
      onSelect(artifact);
    }
  };

  return (
    <group position={position} quaternion={quaternion}>
      {/* 3D Realistic Landing Footprint on Planet Surface */}
      <group
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          sound.playRadarPing();
          if (onHoverArtifact) onHoverArtifact(artifact);
        }}
        onPointerOut={() => {
          setHovered(false);
          if (onHoverArtifact) onHoverArtifact(null);
        }}
        className="cursor-pointer"
      >
        {/* Ground Target Ring Flat on Surface */}
        <mesh ref={ringRef} position={[0, 0, 0.02]}>
          <ringGeometry args={[0.22, 0.32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered ? 0.95 : 0.65}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Pulsing Landing Radar Beacon */}
        <mesh ref={pulseRef} position={[0, 0, 0.015]}>
          <ringGeometry args={[0.36, 0.42, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered ? 0.7 : 0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Surface Point Light */}
        <pointLight
          color={color}
          intensity={hovered ? 2.0 : 0.9}
          distance={1.6}
          decay={2}
          position={[0, 0, 0.12]}
        />
      </group>

      {/* Surface Anchored Real Animated Equipment Badge with Real NASA Photo & Name */}
      <Html
        position={[0, 0, 0.15]}
        center
        distanceFactor={8.2}
        occlude
        zIndexRange={[100, 0]}
      >
        <div
          onClick={handleClick}
          onMouseEnter={() => {
            setHovered(true);
            sound.playRadarPing();
            if (onHoverArtifact) onHoverArtifact(artifact);
          }}
          onMouseLeave={() => {
            setHovered(false);
            if (onHoverArtifact) onHoverArtifact(null);
          }}
          className={`flex flex-col items-center cursor-pointer transition-all duration-300 pointer-events-auto select-none ${
            hovered ? 'scale-115 z-50' : 'scale-100 opacity-95'
          }`}
          style={{ transformOrigin: 'bottom center' }}
        >
          {/* Equipment Name Plate Displayed Above */}
          <div
            className="mb-1 px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow-lg flex items-center space-x-1.5 transition-all duration-300"
            style={{
              backgroundColor: hovered ? 'rgba(3, 7, 18, 0.95)' : 'rgba(10, 15, 30, 0.85)',
              borderColor: hovered ? color : `${color}88`,
              boxShadow: hovered ? `0 0 18px ${color}88` : `0 0 10px ${color}44`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-ping"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase text-white whitespace-nowrap">
              {artifact.shortName || artifact.name}
            </span>
            {isDiscovered && (
              <span className="text-[8px] px-1 py-0.2 rounded bg-emerald-500/25 text-emerald-300 font-mono border border-emerald-500/50">
                LOGGED
              </span>
            )}
          </div>

          {/* Real NASA Photo of Rover / Lander resting on surface */}
          <div className="relative group">
            <div
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-black/80 flex items-center justify-center"
              style={{
                borderColor: hovered ? color : `${color}aa`,
                boxShadow: hovered
                  ? `0 0 25px ${color}, 0 8px 20px rgba(0,0,0,0.9)`
                  : `0 0 14px ${color}55, 0 4px 12px rgba(0,0,0,0.8)`,
              }}
            >
              <img
                src={artifact.image}
                alt={artifact.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* Scanline & Hologram Overlay on Photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Speaking / Click indicator badge */}
              <div
                className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-[8px] font-mono font-extrabold tracking-wider bg-black/80 text-white border"
                style={{ borderColor: color }}
              >
                💬 TALK
              </div>
            </div>

            {/* Glowing Ground Shadow / Thruster Beacon */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full blur-[3px] opacity-80 transition-all duration-300"
              style={{ backgroundColor: color }}
            />
          </div>

          {/* Quick Hover Tooltip */}
          {hovered && (
            <div
              className="mt-1.5 px-2.5 py-0.5 rounded-md bg-black/90 border text-[10px] font-mono text-cyan-200 tracking-wider whitespace-nowrap animate-in fade-in duration-150"
              style={{ borderColor: color }}
            >
              ✦ CLICK TO TALK &amp; EXPLORE
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
