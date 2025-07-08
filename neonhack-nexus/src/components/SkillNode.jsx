import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Text3D, Sphere, Box } from '@react-three/drei'
import * as THREE from 'three'

export default function SkillNode({ skill, position, active, onClick, category, level = 1 }) {
  const ref = useRef()
  const pulseRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Floating animation
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(time * 2 + position[0]) * 0.08
      ref.current.rotation.y = time * 0.5
    }
    
    // Pulse effect for active/hovered nodes
    if (pulseRef.current) {
      const intensity = (active || hovered) ? 1 + Math.sin(time * 8) * 0.3 : 0.3
      pulseRef.current.scale.setScalar(intensity)
    }
  })

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Security': return '#ff00ff'
      case 'Languages': return '#00ffff'
      case 'Frameworks': return '#ffff00'
      case 'Security Tools': return '#ff0066'
      case 'Cloud & DevOps': return '#66ff66'
      case 'Databases': return '#ff6600'
      case 'Hardware': return '#6666ff'
      case 'AI/ML': return '#ff00aa'
      default: return '#00ff9d'
    }
  }

  const getSkillLevel = (skillName) => {
    // Advanced skills get higher levels
    const advancedSkills = ['Python', 'JavaScript', 'VAPT', 'Penetration Testing', 'React', 'OWASP']
    const expertSkills = ['Metasploit', 'Burp Suite', 'Red Teaming', 'Digital Forensics']
    
    if (expertSkills.some(s => skillName.includes(s))) return 3
    if (advancedSkills.some(s => skillName.includes(s))) return 2
    return 1
  }

  const skillLevel = getSkillLevel(skill)
  const categoryColor = getCategoryColor(category)
  const nodeSize = 0.12 + (skillLevel * 0.03)

  return (
    <group 
      ref={ref} 
      position={position}
      onClick={onClick}
      onPointerOver={() => {
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      {/* Outer Pulse Ring */}
      <mesh ref={pulseRef} position={[0, 0, 0]}>
        <ringGeometry args={[nodeSize * 1.5, nodeSize * 2, 16]} />
        <meshStandardMaterial 
          color={categoryColor}
          transparent
          opacity={active || hovered ? 0.6 : 0.2}
          emissive={categoryColor}
          emissiveIntensity={active || hovered ? 0.8 : 0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main Skill Node */}
      <Sphere args={[nodeSize, 16, 16]}>
        <meshStandardMaterial 
          color={active || hovered ? '#ffffff' : categoryColor}
          emissive={categoryColor}
          emissiveIntensity={active || hovered ? 1.2 : 0.4}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={active || hovered ? 1 : 0.8}
        />
      </Sphere>

      {/* Skill Level Indicators */}
      {Array.from({ length: skillLevel }, (_, i) => (
        <Box 
          key={i}
          position={[0, nodeSize + 0.1 + i * 0.08, 0]}
          args={[0.02, 0.06, 0.02]}
        >
          <meshStandardMaterial 
            color={categoryColor}
            emissive={categoryColor}
            emissiveIntensity={0.8}
          />
        </Box>
      ))}

      {/* Skill Name */}
      <Text3D
        position={[0, -nodeSize - 0.15, 0]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="top"
        outlineColor="#000000"
        outlineWidth={0.01}
        font="/fonts/Share_Tech_Mono_Regular.json"
      >
        {skill.toUpperCase()}
        <meshStandardMaterial 
          color={hovered ? categoryColor : "#ffffff"}
          emissive={hovered ? categoryColor : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </Text3D>

      {/* Category Label */}
      <Text
        position={[0, -nodeSize - 0.35, 0]}
        fontSize={0.05}
        textAlign="center"
        anchorX="center"
        anchorY="top"
        color={categoryColor}
        outlineColor="#000000"
        outlineWidth={0.005}
      >
        [{category}]
      </Text>

      {/* Skill Details on Hover */}
      {hovered && (
        <group position={[0, nodeSize + 0.5, 0]}>
          <mesh>
            <planeGeometry args={[1.5, 0.4]} />
            <meshStandardMaterial 
              color="#000000"
              transparent
              opacity={0.8}
              emissive={categoryColor}
              emissiveIntensity={0.1}
            />
          </mesh>
          
          <Text
            position={[0, 0.1, 0.01]}
            fontSize={0.06}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            color="#ffffff"
          >
            PROFICIENCY: {skillLevel === 3 ? 'EXPERT' : skillLevel === 2 ? 'ADVANCED' : 'PROFICIENT'}
          </Text>
          
          <Text
            position={[0, -0.1, 0.01]}
            fontSize={0.05}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            color={categoryColor}
          >
            {category.toUpperCase()} STACK
          </Text>
        </group>
      )}

      {/* Connection Lines (when active) */}
      {active && (
        <>
          {/* Vertical connection line */}
          <mesh position={[0, -1, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 2]} />
            <meshStandardMaterial 
              color={categoryColor}
              emissive={categoryColor}
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          {/* Data particles flowing */}
          {Array.from({ length: 5 }, (_, i) => (
            <Sphere 
              key={i}
              position={[
                Math.sin(Date.now() * 0.001 + i) * 0.3,
                -0.5 + Math.sin(Date.now() * 0.003 + i) * 0.5,
                Math.cos(Date.now() * 0.001 + i) * 0.3
              ]}
              args={[0.02, 8, 8]}
            >
              <meshStandardMaterial 
                color={categoryColor}
                emissive={categoryColor}
                emissiveIntensity={1}
              />
            </Sphere>
          ))}
        </>
      )}
    </group>
  )
}