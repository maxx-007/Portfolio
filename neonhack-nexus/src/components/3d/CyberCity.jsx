import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useGLTF, Text, Line } from '@react-three/drei';

// Device detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Building component with neon outlines
const Building = ({ position, scale, color, isMobile }) => {
  const meshRef = useRef();
  const glowRef = useRef();
  
  useFrame((state) => {
    if (!isMobile) {
      const time = state.clock.getElapsedTime();
      if (glowRef.current) {
        glowRef.current.material.opacity = Math.sin(time * 2) * 0.2 + 0.5;
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={scale}
        castShadow={!isMobile}
        receiveShadow={!isMobile}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={isMobile ? 0.5 : 0.8}
          roughness={isMobile ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* Neon outline - only on desktop */}
      {!isMobile && (
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
      )}
      
      {/* Reduced windows on mobile */}
      {Array.from({ length: isMobile ? Math.floor(scale[1]) : Math.floor(scale[1] * 2) }).map((_, i) => (
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

// Hologram beam effect - disabled on mobile
const HologramBeam = ({ position, color, isMobile }) => {
  if (isMobile) return null;
  
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
const GridFloor = ({ isMobile }) => {
  const gridSize = isMobile ? 10 : 20;
  const gridDivisions = isMobile ? 10 : 20;
  
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
  }, [gridSize, gridDivisions]);

  return (
    <group>
      <Line
        points={gridPoints}
        color="#0ff"
        lineWidth={0.5}
        transparent
        opacity={0.2}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[gridSize * 2, gridSize * 2]} />
        <meshStandardMaterial
          color="#000"
          metalness={isMobile ? 0.5 : 0.8}
          roughness={isMobile ? 0.5 : 0.3}
        />
      </mesh>
    </group>
  );
};

// Flying vehicles - reduced on mobile
const Vehicle = ({ startPosition, isMobile }) => {
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
          emissiveIntensity={isMobile ? 0.3 : 0.5}
        />
      </mesh>
      {!isMobile && <pointLight color="#ff0066" intensity={1} distance={5} />}
    </group>
  );
};

// Main CyberCity component
const CyberCity = () => {
  const isMobile = useIsMobile();
  
  const buildings = useMemo(() => {
    const count = isMobile ? 15 : 30;
    return Array.from({ length: count }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * (isMobile ? 20 : 30),
        0,
        (Math.random() - 0.5) * (isMobile ? 20 : 30)
      ],
      scale: [
        Math.random() * 2 + 1,
        Math.random() * (isMobile ? 5 : 10) + 5,
        Math.random() * 2 + 1
      ],
      color: [
        '#ff0066',
        '#00ff99',
        '#00ffff',
        '#ff00ff'
      ][Math.floor(Math.random() * 4)]
    }));
  }, [isMobile]);

  const vehicles = useMemo(() => {
    const count = isMobile ? 5 : 10;
    return Array.from({ length: count }).map((_, i) => ({
      startPosition: [
        0,
        Math.random() * (isMobile ? 5 : 10) + 5,
        0
      ]
    }));
  }, [isMobile]);

  return (
    <Canvas
      shadows={!isMobile}
      camera={{ 
        position: isMobile ? [15, 10, 15] : [20, 15, 20], 
        fov: isMobile ? 70 : 60 
      }}
      dpr={isMobile ? 1 : window.devicePixelRatio}
      performance={{ min: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#000'
      }}
    >
      <ambientLight intensity={isMobile ? 0.3 : 0.2} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={isMobile ? 0.7 : 0.5}
        castShadow={!isMobile}
      />
      
      <GridFloor isMobile={isMobile} />
      
      {buildings.map((building, i) => (
        <Building key={i} {...building} isMobile={isMobile} />
      ))}
      
      {vehicles.map((vehicle, i) => (
        <Vehicle key={i} {...vehicle} isMobile={isMobile} />
      ))}
      
      {!isMobile && Array.from({ length: 5 }).map((_, i) => (
        <HologramBeam
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            0,
            (Math.random() - 0.5) * 20
          ]}
          color={['#00ff99', '#00ffff', '#ff00ff'][Math.floor(Math.random() * 3)]}
          isMobile={isMobile}
        />
      ))}

      {/* Post-processing effects - reduced on mobile */}
      <EffectComposer multisampling={isMobile ? 0 : 4}>
        <Bloom
          intensity={isMobile ? 0.5 : 1}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        {!isMobile && (
          <ChromaticAberration
            offset={[0.002, 0.002]}
            blendFunction={BlendFunction.NORMAL}
          />
        )}
      </EffectComposer>
    </Canvas>
  );
};

export default CyberCity;