import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Line, Text, Trail, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export default function NeuralNetwork({ skills }) {
  const group = useRef()
  const [hoveredNode, setHoveredNode] = useState(null)
  const [pulsePhase, setPulsePhase] = useState(0)
  const particleSystem = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.003
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
    setPulsePhase(state.clock.elapsedTime)
  })

  // Enhanced skills data structure
  const enhancedSkills = useMemo(() => ({
    "CYBERSECURITY": ["Python", "Kali Linux", "Wireshark", "Nmap", "Metasploit", "Burp Suite"],
    "PENETRATION TESTING": ["OWASP", "Social Engineering", "Network Security", "Web App Security"],
    "PROGRAMMING": ["JavaScript", "React", "Node.js", "Python", "C++", "SQL"],
    "CLOUD & DEVOPS": ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux Administration"],
    "FORENSICS": ["Digital Forensics", "Incident Response", "Malware Analysis", "SIEM"],
    ...skills
  }), [skills])

  // Convert skills data to nodes and connections with enhanced positioning
  const { nodes, connections } = useMemo(() => {
    const skillCategories = Object.keys(enhancedSkills)
    const nodes = []
    const connections = []

    // Create category nodes in a dynamic helix pattern
    skillCategories.forEach((category, i) => {
      const angle = (i / skillCategories.length) * Math.PI * 2
      const helixHeight = Math.sin(angle * 2) * 1.5
      const radius = 3 + Math.cos(angle) * 0.5
      
      const categoryNode = {
        id: `category-${i}`,
        position: [Math.cos(angle) * radius, helixHeight, Math.sin(angle) * radius],
        name: category,
        type: 'category',
        categoryIndex: i,
        size: 0.2 + Math.sin(pulsePhase + i) * 0.05
      }
      nodes.push(categoryNode)
      
      // Create skill nodes in orbital patterns around each category
      enhancedSkills[category].forEach((skill, j) => {
        const orbitAngle = (j / enhancedSkills[category].length) * Math.PI * 2
        const orbitRadius = 0.8 + Math.sin(pulsePhase * 0.5 + j) * 0.1
        const localX = Math.cos(orbitAngle) * orbitRadius
        const localZ = Math.sin(orbitAngle) * orbitRadius
        const localY = Math.sin(pulsePhase + j * 0.5) * 0.2
        
        // Transform to world coordinates
        const worldX = categoryNode.position[0] + localX * Math.cos(angle) - localZ * Math.sin(angle)
        const worldY = categoryNode.position[1] + localY
        const worldZ = categoryNode.position[2] + localX * Math.sin(angle) + localZ * Math.cos(angle)
        
        const skillNode = {
          id: `skill-${i}-${j}`,
          position: [worldX, worldY, worldZ],
          name: skill,
          type: 'skill',
          category: category,
          categoryIndex: i,
          size: 0.05 + Math.sin(pulsePhase * 2 + j) * 0.01
        }
        nodes.push(skillNode)
        
        // Create animated connection from category to skill
        connections.push({
          from: categoryNode.position,
          to: skillNode.position,
          active: hoveredNode === categoryNode.id || hoveredNode === skillNode.id,
          type: 'skill-link',
          intensity: Math.sin(pulsePhase + j) * 0.5 + 0.5
        })
      })
    })

    // Create neural network connections between related categories
    const categoryConnections = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], // Pentagon base
      [0, 2], [1, 3], [2, 4], [3, 0], [4, 1]  // Internal connections
    ]
    
    categoryConnections.forEach(([i, j]) => {
      if (i < skillCategories.length && j < skillCategories.length) {
        const fromNode = nodes.find(n => n.id === `category-${i}`)
        const toNode = nodes.find(n => n.id === `category-${j}`)
        
        if (fromNode && toNode) {
          connections.push({
            from: fromNode.position,
            to: toNode.position,
            active: hoveredNode === fromNode.id || hoveredNode === toNode.id,
            type: 'neural-link',
            intensity: Math.sin(pulsePhase * 0.8 + i + j) * 0.3 + 0.7
          })
        }
      }
    })

    return { nodes, connections }
  }, [enhancedSkills, hoveredNode, pulsePhase])

  // Particle system for enhanced visual effects
  const particles = useMemo(() => {
    const particleCount = 50
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 20
        ],
        velocity: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.02
        ],
        size: Math.random() * 0.05 + 0.02
      })
    }
    return particles
  }, [])

  return (
    <group ref={group} position={[0, 2, 0]} scale={[0.8, 0.8, 0.8]}>
      {/* Animated particle field */}
      <Sparkles 
        count={100} 
        scale={[10, 8, 10]} 
        size={1.5} 
        speed={0.3}
        opacity={0.4}
        color="#00ff9d"
      />

      {/* Enhanced connections with trails */}
      {connections.map((conn, i) => {
        const color = conn.type === 'neural-link' ? '#ff00ff' : '#00ff9d'
        const opacity = conn.active ? 1 : (0.3 + conn.intensity * 0.4)
        
        return (
          <group key={i}>
            <Line
              points={[conn.from, conn.to]}
              color={color}
              lineWidth={conn.active ? 3 : (conn.type === 'neural-link' ? 1.5 : 1)}
              transparent
              opacity={opacity}
            />
            {conn.active && (
              <Sphere
                args={[0.03, 8, 8]}
                position={[
                  conn.from[0] + (conn.to[0] - conn.from[0]) * ((Math.sin(pulsePhase * 3) + 1) / 2),
                  conn.from[1] + (conn.to[1] - conn.from[1]) * ((Math.sin(pulsePhase * 3) + 1) / 2),
                  conn.from[2] + (conn.to[2] - conn.from[2]) * ((Math.sin(pulsePhase * 3) + 1) / 2)
                ]}
              >
                <meshStandardMaterial 
                  color={color}
                  emissive={color}
                  emissiveIntensity={2}
                  transparent
                  opacity={0.8}
                />
              </Sphere>
            )}
          </group>
        )
      })}

      {/* Enhanced nodes with dynamic effects */}
      {nodes.map((node) => {
        const isCategory = node.type === 'category'
        const baseColor = isCategory ? '#00b4ff' : '#00ff9d'
        const hoverIntensity = hoveredNode === node.id ? 2 : 0.5
        const pulseIntensity = Math.sin(pulsePhase * 2 + node.categoryIndex) * 0.3 + 0.7
        
        return (
          <group key={node.id} position={node.position}>
            <Sphere
              args={[node.size, 16, 16]}
              onPointerOver={() => setHoveredNode(node.id)}
              onPointerOut={() => setHoveredNode(null)}
            >
              <meshStandardMaterial 
                color={baseColor}
                emissive={baseColor}
                emissiveIntensity={hoverIntensity * pulseIntensity}
                metalness={0.8}
                roughness={0.2}
              />
            </Sphere>
            
            {(hoveredNode === node.id || (isCategory && !hoveredNode)) && (
              <Text
                position={[0, node.size * 2, 0]}
                fontSize={isCategory ? 0.15 : 0.1}
                  color={baseColor}
              anchorX="center"
              anchorY="middle"
                outlineWidth={0.01}
              outlineColor="#000000"
            >
                {node.name}
            </Text>
            )}
            
            {hoveredNode === node.id && (
              <Trail
                width={0.1}
                length={8}
                color={new THREE.Color(baseColor)}
                attenuation={(t) => t * t}
              >
                <Sphere args={[node.size * 0.8, 8, 8]}>
                  <meshBasicMaterial color={baseColor} transparent opacity={0.2} />
                  </Sphere>
              </Trail>
            )}
          </group>
        )
      })}
    </group>
  )
}