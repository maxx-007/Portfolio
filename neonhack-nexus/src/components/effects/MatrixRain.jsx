import React, { useEffect, useRef } from 'react';
import './MatrixRain.scss';

const EVIL_CHARS = '☠︎⚠︎❌⚡︎⚔︎☣︎☢︎⚡︎卍웃유АБВГДЕЖ∀ℬℰ∃ℱℋℐℒℳ∇ℛ∑☠︎⚠︎❌⚡︎⚔︎☣︎☢︎⚡︎卍웃유АБВГДЕЖ∀ℬℰ∃ℱℋℐℒℳ∇ℛ∑';
const EVIL_MESSAGES = [
  'SYSTEM COMPROMISED',
  'ACCESS DENIED',
  'SECURITY BREACH',
  'DATA CORRUPTED',
  'VIRUS DETECTED',
  'FATAL ERROR',
  'HACK THE PLANET',
  'NO ESCAPE',
  'SYSTEM FAILURE',
  'UNAUTHORIZED ACCESS'
];

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let drops = [];
    let messages = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDrops();
    };

    const initDrops = () => {
      drops = [];
      messages = [];
      const columns = Math.floor(canvas.width / 20);
      for (let i = 0; i < columns; i++) {
        drops[i] = {
          x: i * 20,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 3,
          length: Math.floor(Math.random() * 15 + 5),
          chars: Array(Math.floor(Math.random() * 15 + 5))
            .fill()
            .map(() => EVIL_CHARS[Math.floor(Math.random() * EVIL_CHARS.length)])
        };
      }
    };

    const addMessage = () => {
      if (messages.length < 3 && Math.random() < 0.01) {
        const message = EVIL_MESSAGES[Math.floor(Math.random() * EVIL_MESSAGES.length)];
        const x = Math.random() * (canvas.width - 200);
        const y = Math.random() * (canvas.height - 50);
        messages.push({
          text: message,
          x,
          y,
          opacity: 1,
          scale: 0,
          rotation: (Math.random() - 0.5) * 0.2
        });
      }
    };

    const updateMessages = () => {
      messages = messages.filter(msg => msg.opacity > 0);
      messages.forEach(msg => {
        msg.opacity -= 0.005;
        msg.scale = Math.min(msg.scale + 0.05, 1);
      });
    };

    const drawMessages = () => {
      messages.forEach(msg => {
        ctx.save();
        ctx.translate(msg.x + 100, msg.y + 25);
        ctx.rotate(msg.rotation);
        ctx.scale(msg.scale, msg.scale);
        ctx.font = 'bold 24px monospace';
        ctx.fillStyle = `rgba(255, 0, 0, ${msg.opacity})`;
        ctx.fillText(msg.text, -100, -25);
        
        // Add glitch effect
        if (Math.random() < 0.1) {
          ctx.fillStyle = `rgba(0, 255, 255, ${msg.opacity * 0.5})`;
          ctx.fillText(msg.text, -98 + Math.random() * 4, -25 + Math.random() * 4);
        }
        ctx.restore();
      });
    };

    const draw = () => {
      // Create dark overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw evil matrix rain
      drops.forEach((drop, i) => {
        // Draw vertical line
        const gradient = ctx.createLinearGradient(0, drop.y - drop.length * 20, 0, drop.y);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0.8)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(drop.x, drop.y - drop.length * 20, 2, drop.length * 20);

        // Draw characters
        drop.chars.forEach((char, j) => {
          const y = drop.y - j * 20;
          if (y > 0 && y < canvas.height) {
            ctx.fillStyle = j === 0 ? '#ff0000' : `rgba(255, 0, 0, ${1 - j / drop.length})`;
            ctx.font = j === 0 ? 'bold 20px monospace' : '16px monospace';
            ctx.fillText(char, drop.x, y);
            
            // Add glitch effect
            if (Math.random() < 0.05) {
              ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
              ctx.fillText(char, drop.x + (Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 4);
            }
          }
        });

        // Update position
        drop.y += drop.speed;
        if (drop.y - drop.length * 20 > canvas.height) {
          drop.y = -drop.length * 20;
          drop.chars = Array(drop.length)
            .fill()
            .map(() => EVIL_CHARS[Math.floor(Math.random() * EVIL_CHARS.length)]);
        }
      });

      // Add and update evil messages
      addMessage();
      updateMessages();
      drawMessages();

      // Add scanlines
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      for (let i = 0; i < canvas.height; i += 4) {
        ctx.fillRect(0, i, canvas.width, 1);
      }

      // Add random glitch blocks
      if (Math.random() < 0.05) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const w = Math.random() * 100 + 50;
        const h = Math.random() * 30 + 10;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(x, y, w, h);
        
        // Add chromatic aberration
        ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
        ctx.fillRect(x + 2, y - 2, w, h);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" />;
};

export default MatrixRain; 