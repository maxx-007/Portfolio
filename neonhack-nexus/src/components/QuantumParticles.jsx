import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const quantumFloat = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(20px, -20px) scale(1.2);
    opacity: 0.8;
  }
  50% {
    transform: translate(-10px, 10px) scale(0.8);
    opacity: 1;
  }
  75% {
    transform: translate(15px, 5px) scale(1.1);
    opacity: 0.6;
  }
`;

const ParticleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
`;

const Particle = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${props => props.color || '#00ff9d'};
  border-radius: 50%;
  box-shadow: 0 0 4px ${props => props.color || '#00ff9d'};
  animation: ${quantumFloat} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  opacity: 0.8;
`;

const generateRandomParticles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 3,
    color: i % 3 === 0 ? '#00ff9d' : i % 3 === 1 ? '#00b4ff' : '#ff00ff'
  }));
};

const QuantumParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(generateRandomParticles(20));
    
    // Regenerate particles periodically for more dynamic effect
    const interval = setInterval(() => {
      setParticles(prevParticles => {
        const newParticle = generateRandomParticles(1)[0];
        return [
          ...prevParticles.slice(1),
          { ...newParticle, id: prevParticles[prevParticles.length - 1].id + 1 }
        ];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ParticleContainer>
      {particles.map(particle => (
        <Particle
          key={particle.id}
          left={particle.left}
          top={particle.top}
          delay={particle.delay}
          duration={particle.duration}
          color={particle.color}
        />
      ))}
    </ParticleContainer>
  );
};

export default QuantumParticles; 