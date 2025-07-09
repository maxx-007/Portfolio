import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, Text3D, Box, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function HologramProject({ project, index }) {
  const group = useRef()
  const meshRef = useRef()
  const particlesRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  // Create particles for each project
  const particleCount = 50
  const particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      position: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 0.5
      ],
      speed: Math.random() * 0.02 + 0.01,
      size: Math.random() * 0.03 + 0.01
    })
  }
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Main floating animation
    if (group.current) {
      group.current.position.y = Math.sin(time * 0.5 + index) * 0.15
      group.current.rotation.y = Math.sin(time * 0.3) * 0.1
    }
    
    // Hologram flickering effect
    if (meshRef.current) {
      meshRef.current.material.opacity = 0.3 + Math.sin(time * 10) * 0.1
      if (hovered) {
        meshRef.current.scale.setScalar(1 + Math.sin(time * 5) * 0.05)
      }
    }
    
    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] += particles[i].speed
        if (positions[i3 + 1] > 2) {
          positions[i3 + 1] = -2
          positions[i3] = (Math.random() - 0.5) * 4
          positions[i3 + 2] = (Math.random() - 0.5) * 0.5
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const getProjectColor = (category) => {
    switch (category) {
      case 'AI Security': return '#ff00ff'
      case 'Network Security': return '#00ffff'
      case 'Mobile Security': return '#ffff00'
      case 'Red Team Tools': return '#ff0066'
      default: return '#00ff9d'
    }
  }

  const projectColor = getProjectColor(project.category)

  return (
    <group 
      ref={group}
      position={[0, index * -2.5, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {/* Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={new Float32Array(particles.flatMap(p => p.position))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={projectColor}
          size={0.02}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Main Hologram Panel */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <planeGeometry args={[3.5, 2]} />
          <meshStandardMaterial 
            color={projectColor}
            transparent
            opacity={0.2}
            emissive={projectColor}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Project Name */}
        <Text3D
          position={[0, 0.6, 0.02]}
          fontSize={0.25}
          maxWidth={3.2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Share_Tech_Mono_Regular.json"
        >
          {project.name.toUpperCase()}
          <meshStandardMaterial 
            color="#ffffff"
            emissive={projectColor}
            emissiveIntensity={0.5}
          />
        </Text3D>
        
        {/* Project Category */}
        <Text
          position={[0, 0.3, 0.02]}
          fontSize={0.12}
          maxWidth={3.2}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color={projectColor}
          outlineColor="#000000"
          outlineWidth={0.01}
        >
          [{project.category}]
        </Text>
        
        {/* Project Description */}
        <Text
          position={[0, -0.1, 0.02]}
          fontSize={0.08}
          maxWidth={3}
          lineHeight={1.2}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
        >
          {project.description}
        </Text>
        
        {/* Status Badge */}
        <mesh position={[1.5, 0.8, 0.02]}>
          <boxGeometry args={[0.8, 0.2, 0.02]} />
          <meshStandardMaterial 
            color={project.status.includes('Finalist') ? '#ff6600' : '#00ff9d'}
            emissive={project.status.includes('Finalist') ? '#ff6600' : '#00ff9d'}
            emissiveIntensity={0.5}
          />
        </mesh>
        
        <Text
          position={[1.5, 0.8, 0.03]}
          fontSize={0.06}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="#000000"
          font="/fonts/Share_Tech_Mono_Regular.json"
        >
          {project.status.toUpperCase()}
        </Text>
      </Float>

      {/* Expanded Details (when clicked) */}
      {clicked && (
        <group position={[0, -1.5, 0]}>
          <mesh>
            <planeGeometry args={[3.8, 1.5]} />
            <meshStandardMaterial 
              color={projectColor}
              transparent
              opacity={0.15}
              emissive={projectColor}
              emissiveIntensity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Achievements */}
          {project.achievements && project.achievements.slice(0, 3).map((achievement, i) => (
            <Text
              key={i}
              position={[0, 0.4 - i * 0.25, 0.02]}
              fontSize={0.07}
              maxWidth={3.5}
              textAlign="center"
              anchorX="center"
              anchorY="middle"
              color="#00ff9d"
            >
              ► {achievement}
            </Text>
          ))}
          
          {/* Tech Stack */}
          {project.tech && (
            <Text
              position={[0, -0.5, 0.02]}
              fontSize={0.06}
              maxWidth={3.5}
              textAlign="center"
              anchorX="center"
              anchorY="middle"
              color="#ffaa00"
            >
              TECH: {project.tech.join(' • ')}
            </Text>
          )}
        </group>
      )}

      {/* Corner Decorations */}
      {[
        [-1.7, 0.9, 0.01],
        [1.7, 0.9, 0.01],
        [-1.7, -0.9, 0.01],
        [1.7, -0.9, 0.01]
      ].map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.05, 8, 8]}>
          <meshStandardMaterial 
            color={projectColor}
            emissive={projectColor}
            emissiveIntensity={0.8}
          />
        </Sphere>
      ))}

      {/* Data Stream Lines */}
      {hovered && (
        <>
          <mesh position={[0, 0, -0.01]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[4, 0.01, 0.01]} />
            <meshStandardMaterial 
              color={projectColor}
              emissive={projectColor}
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh position={[0, 0, -0.01]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[4, 0.01, 0.01]} />
            <meshStandardMaterial 
              color={projectColor}
              emissive={projectColor}
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
        </>
      )}
    </group>
  )
}