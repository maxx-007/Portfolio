import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Line, Html } from '@react-three/drei';

// Radar animation component
const Radar = () => {
  const [rotation, setRotation] = useState(0);
  
  useFrame(() => {
    setRotation(prev => (prev + 0.01) % (Math.PI * 2));
  });

  return (
    <group>
      {/* Radar circle */}
      <Line
        points={[...Array(64)].map((_, i) => {
          const angle = (i / 32) * Math.PI;
          return [Math.cos(angle) * 1, Math.sin(angle) * 1, 0];
        })}
        color="#0ff"
        lineWidth={1}
      />
      
      {/* Scanning line */}
      <Line
        points={[[0, 0, 0], [Math.cos(rotation) * 1, Math.sin(rotation) * 1, 0]]}
        color="#0ff"
        lineWidth={2}
      />
      
      {/* Grid lines */}
      {[0.33, 0.66].map((radius, i) => (
        <Line
          key={i}
          points={[...Array(64)].map((_, i) => {
            const angle = (i / 32) * Math.PI;
            return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
          })}
          color="#0ff"
          lineWidth={0.5}
          opacity={0.5}
        />
      ))}
    </group>
  );
};

// Security status component
const SecurityStatus = ({ status }) => {
  const [threatLevel, setThreatLevel] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatLevel(Math.random() * 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="security-status">
      <h3>SECURITY STATUS</h3>
      <div className="status-grid">
        <div className="status-item">
          <span>FIREWALL</span>
          <div className="status-bar">
            <div 
              className="status-fill" 
              style={{ width: `${status.firewall}%`, backgroundColor: status.firewall > 70 ? '#0f0' : '#f00' }}
            />
          </div>
        </div>
        <div className="status-item">
          <span>ENCRYPTION</span>
          <div className="status-bar">
            <div 
              className="status-fill" 
              style={{ width: `${status.encryption}%`, backgroundColor: '#0ff' }}
            />
          </div>
        </div>
        <div className="status-item">
          <span>THREAT LEVEL</span>
          <div className="status-bar">
            <div 
              className="status-fill" 
              style={{ width: `${threatLevel}%`, backgroundColor: threatLevel > 50 ? '#f00' : '#0f0' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Network activity component
const NetworkActivity = () => {
  const [packets, setPackets] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPackets(prev => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          type: Math.random() > 0.5 ? 'incoming' : 'outgoing',
          size: Math.floor(Math.random() * 1000),
          protocol: ['TCP', 'UDP', 'HTTPS'][Math.floor(Math.random() * 3)]
        }
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="network-activity">
      <h3>NETWORK ACTIVITY</h3>
      <div className="packet-list">
        {packets.map(packet => (
          <div key={packet.id} className={`packet ${packet.type}`}>
            <span className="protocol">{packet.protocol}</span>
            <span className="size">{packet.size}kb</span>
            <span className="type">{packet.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main HUD component
const JarvisHUD = () => {
  const [securityStatus, setSecurityStatus] = useState({
    firewall: 85,
    encryption: 100,
    threatLevel: 15
  });

  return (
    <div className="jarvis-hud">
      {/* 3D Elements */}
      <div className="hud-3d">
        <Canvas
          camera={{ position: [0, 0, 5] }}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          {/* Left radar */}
          <group position={[-8, 3, 0]} scale={1.5}>
            <Radar />
          </group>
          
          {/* Right radar */}
          <group position={[8, 3, 0]} scale={1.5}>
            <Radar />
          </group>
        </Canvas>
      </div>

      {/* 2D Overlay Elements */}
      <div className="hud-overlay">
        <div className="top-left">
          <SecurityStatus status={securityStatus} />
        </div>
        
        <div className="top-right">
          <NetworkActivity />
        </div>
        
        <div className="bottom-center">
          <div className="system-status">
            <h3>SYSTEM STATUS</h3>
            <div className="status-text">
              <span>NEURAL INTERFACE: ACTIVE</span>
              <span>QUANTUM ENCRYPTION: ENABLED</span>
              <span>AI DEFENSE SYSTEM: MONITORING</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JarvisHUD; 