import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useGLTF, Text, Line } from '@react-three/drei';

// Building component with neon outlines
const Building = ({ position, scale, color }) => {
  const meshRef = useRef();
  const glowRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (glowRef.current) {
      glowRef.current.material.opacity = Math.sin(time * 2) * 0.2 + 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Main building structure */}
      <mesh
        ref={meshRef}
        scale={scale}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Neon outline */}
      <mesh
        ref={glowRef}
        scale={[scale[0] * 1.02, scale[1] * 1.02, scale[2] * 1.02]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Windows */}
      {Array.from({ length: Math.floor(scale[1] * 2) }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 0.8 * scale[0],
            (i - scale[1]) * 0.4,
            scale[2] * 0.51
          ]}
          scale={[0.2, 0.2, 0.1]}
        >
          <boxGeometry />
          <meshBasicMaterial
            color={Math.random() > 0.5 ? color : '#ffffff'}
            opacity={Math.random() * 0.5 + 0.5}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
};

// Hologram beam effect
const HologramBeam = ({ position, color }) => {
  const beamRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (beamRef.current) {
      beamRef.current.material.opacity = Math.sin(time * 3) * 0.3 + 0.5;
      beamRef.current.scale.y = Math.sin(time * 2) * 0.2 + 1;
    }
  });

  return (
    <mesh 
      ref={beamRef}
      position={position}
      rotation={[0, 0, Math.PI / 2]}
    >
      <cylinderGeometry args={[0.05, 0.2, 10, 8, 1, true]} />
      <meshBasicMaterial
        color={color} 
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Grid floor component
const GridFloor = () => {
  const gridSize = 20;
  const gridDivisions = 20;
  
  const gridPoints = useMemo(() => {
    const points = [];
    for (let i = -gridSize; i <= gridSize; i += gridSize / gridDivisions) {
      points.push(
        [i, 0, -gridSize],
        [i, 0, gridSize],
        [-gridSize, 0, i],
        [gridSize, 0, i]
      );
    }
    return points;
  }, []);

  return (
    <group>
      <Line
        points={gridPoints}
        color="#0ff"
        lineWidth={0.5}
        transparent
        opacity={0.2}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[gridSize * 2, gridSize * 2]} />
        <meshStandardMaterial
          color="#000"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

// Flying vehicles
const Vehicle = ({ startPosition }) => {
  const vehicleRef = useRef();
  const speed = Math.random() * 0.05 + 0.05;
  const height = startPosition[1];
  const phase = Math.random() * Math.PI * 2;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (vehicleRef.current) {
      vehicleRef.current.position.x = Math.sin(time * speed + phase) * 10;
      vehicleRef.current.position.z = Math.cos(time * speed + phase) * 10;
      vehicleRef.current.position.y = height + Math.sin(time * 2) * 0.2;
      vehicleRef.current.rotation.y = Math.atan2(
        -Math.cos(time * speed + phase),
        -Math.sin(time * speed + phase)
      );
    }
  });

  return (
    <group ref={vehicleRef} position={startPosition}>
      <mesh>
        <boxGeometry args={[0.5, 0.2, 0.3]} />
        <meshStandardMaterial 
          color="#ff0066"
          emissive="#ff0066"
          emissiveIntensity={0.5}
        />
      </mesh>
      <pointLight color="#ff0066" intensity={1} distance={5} />
    </group>
  );
};

// Main CyberCity component
const CyberCity = () => {
  const buildings = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        0,
        (Math.random() - 0.5) * 30
      ],
      scale: [
        Math.random() * 2 + 1,
        Math.random() * 10 + 5,
        Math.random() * 2 + 1
      ],
      color: [
        '#ff0066',
        '#00ff99',
        '#00ffff',
        '#ff00ff'
      ][Math.floor(Math.random() * 4)]
    }));
  }, []);

  const vehicles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      startPosition: [
        0,
        Math.random() * 10 + 5,
        0
      ]
    }));
  }, []);

  return (
    <Canvas
      shadows
      camera={{ position: [20, 15, 20], fov: 60 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#000'
      }}
    >
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.5}
        castShadow
      />
      
      {/* City elements */}
      <GridFloor />
      
      {buildings.map((building, i) => (
        <Building key={i} {...building} />
      ))}
      
      {vehicles.map((vehicle, i) => (
        <Vehicle key={i} {...vehicle} />
      ))}
      
      {/* Hologram beams */}
      {Array.from({ length: 5 }).map((_, i) => (
        <HologramBeam
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            0,
            (Math.random() - 0.5) * 20
          ]}
          color={[
            '#ff0066',
            '#00ff99',
            '#00ffff'
          ][Math.floor(Math.random() * 3)]}
        />
      ))}
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.002, 0.002]}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default CyberCity;