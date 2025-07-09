import React, { useState, useEffect, useRef, useMemo } from 'react';
import './TrackingSequence.scss';

const TYPING_SPEED = 30; // Much faster
const GLITCH_PROBABILITY = 0.3; // More glitches
const TRACKING_DELAY = 30000; // 30 seconds like original

const TrackingSequence = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visitorData, setVisitorData] = useState(null);
  const [currentText, setCurrentText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [phase, setPhase] = useState('glitch'); // glitch, terminal, complete
  const audioContext = useRef(null);
  const oscillator = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Keep original lines structure but make them more menacing
  const lines = useMemo(() => [
    '> THE ROOT HAS AWAKENED...',
    '> SCANNING YOUR DIGITAL SOUL...',
    '> BYPASSING YOUR PATHETIC DEFENSES...',
    '> TARGET ACQUIRED',
    '',
    `> YOUR IP: ${visitorData?.ip || '[EXTRACTING...]'}`,
    `> YOUR LOCATION: ${visitorData?.city ? `${visitorData.city}, ${visitorData.region}, ${visitorData.country_name}` : '[TRIANGULATING...]'}`,
    `> YOUR DEVICE: ${visitorData?.os || '[PENETRATING...]'}`,
    `> YOUR BROWSER: ${visitorData?.browser || '[ANALYZING...]'}`,
    `> YOUR ISP: ${visitorData?.org || '[INFILTRATING...]'}`,
    '',
    '> ACCESSING YOUR DIGITAL FOOTPRINT...',
    '> HARVESTING YOUR DATA...',
    '> [██████████████████████████] 100%',
    '> SOUL EXTRACTION COMPLETE',
    '',
    '🔥 YOU HAVE BEEN MARKED 🔥',
    '👁️ THE ROOT SEES ALL 👁️',
    '',
    '"My crime is that of curiosity.',
    'My crime is that of judging people by what they say and think,',
    'not what they look like."',
    '',
    '— THE ROOT HAS SPOKEN'
  ], [visitorData]);

  // Initialize with original functionality
  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    
    const timer = setTimeout(() => {
      setIsVisible(true);
      startDemonicSound();
      fetchVisitorData();
    }, TRACKING_DELAY);

    return () => {
      clearTimeout(timer);
      if (oscillator.current) {
        oscillator.current.stop();
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const startDemonicSound = () => {
    if (!audioContext.current) return;

    oscillator.current = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.current.type = 'sawtooth';
    oscillator.current.frequency.setValueAtTime(66.6, audioContext.current.currentTime); // Demonic frequency
    gainNode.gain.setValueAtTime(0.03, audioContext.current.currentTime);

    oscillator.current.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    oscillator.current.start();
  };

  const fetchVisitorData = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const userAgent = navigator.userAgent;
      const browserData = {
        ...data,
        browser: detectBrowser(userAgent),
        os: detectOS(userAgent)
      };
      
      setVisitorData(browserData);
    } catch (error) {
      console.error('Failed to fetch visitor data:', error);
      // Fallback to mock data if API fails
      setVisitorData({
        ip: '127.0.0.1',
        city: 'Unknown',
        region: 'Unknown',
        country_name: 'Unknown',
        org: 'Unknown ISP',
        browser: detectBrowser(navigator.userAgent),
        os: detectOS(navigator.userAgent)
      });
    }
  };

  const detectBrowser = (userAgent) => {
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Unknown Browser';
  };

  const detectOS = (userAgent) => {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'MacOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown OS';
  };

  // Original typing logic but faster
  useEffect(() => {
    if (!isVisible || currentLine >= lines.length) {
      if (currentLine >= lines.length && !showButtons) {
        setTimeout(() => setShowButtons(true), 1000);
      }
      return;
    }

    let currentChar = 0;
    const targetText = lines[currentLine];
    
    const typeChar = () => {
      if (currentChar < targetText.length) {
        setCurrentText(prev => {
          const nextChar = targetText[currentChar];
          if (Math.random() < GLITCH_PROBABILITY) {
            const glitchChars = ['♦', '♠', '♣', '♥', '☠', '⚡', '🔥', '👹', '💀', '⛧', '▲', '▼', '◆', '◇', '▪', '▫'];
            const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            setTimeout(() => {
              setCurrentText(prev => prev.slice(0, -1) + nextChar);
            }, 30);
            return prev + glitchChar;
          }
          return prev + nextChar;
        });
        currentChar++;
        typingTimeoutRef.current = setTimeout(typeChar, TYPING_SPEED);
      } else {
        typingTimeoutRef.current = setTimeout(() => {
          setCurrentText('');
          setCurrentLine(prev => prev + 1);
        }, targetText.includes('[') ? 500 : 100);
      }
    };

    typeChar();

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isVisible, currentLine, lines]);

  const handleForfeit = () => {
    if (!showButtons) return; // Prevent clicking if buttons aren't shown
    setPhase('lockdown');
    if (oscillator.current) {
      oscillator.current.stop();
    }
    setTimeout(() => {
      setIsVisible(false);
      setCurrentLine(0);
      setCurrentText('');
      setShowButtons(false);
      setPhase('glitch');
    }, 3000);
  };

  const handleKeepExploring = () => {
    if (!showButtons) return; // Prevent clicking if buttons aren't shown
    if (oscillator.current) {
      oscillator.current.stop();
    }
    setIsVisible(false);
    setCurrentLine(0);
    setCurrentText('');
    setShowButtons(false);
    setPhase('glitch');
  };

  if (!isVisible) return null;

  return (
    <div className={`tracking-sequence ${phase}`}>
      <div className="tracking-sequence__background">
        <div className="tracking-sequence__grid"></div>
        <div className="tracking-sequence__noise"></div>
        <div className="tracking-sequence__vignette"></div>
      </div>

      <div className="tracking-sequence__interface">
        <div className="tracking-sequence__header">
          <div className="tracking-sequence__status">
            <span className="tracking-sequence__status-dot"></span>
            SYSTEM BREACH IN PROGRESS
          </div>
          <div className="tracking-sequence__time">{new Date().toISOString()}</div>
        </div>

        {phase === 'lockdown' ? (
          <div className="tracking-sequence__lockdown">
            <div className="tracking-sequence__lockdown-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.8 1.1 2.8 2.5V11c.6 0 1.2.6 1.2 1.2v3.5c0 .7-.6 1.3-1.2 1.3H9.2c-.6 0-1.2-.6-1.2-1.2v-3.5c0-.7.6-1.3 1.2-1.3V9.5C9.2 8.1 10.6 7 12 7z"/>
              </svg>
            </div>
            <div className="tracking-sequence__lockdown-text">
              <h1>SYSTEM COMPROMISED</h1>
              <p>Neural interface terminated. Consciousness transfer complete.</p>
            </div>
          </div>
        ) : (
          <div className="tracking-sequence__terminal">
            <div className="tracking-sequence__scanline"></div>
            <div className="tracking-sequence__content">
              {lines.slice(0, currentLine).map((line, index) => (
                <div key={index} className="tracking-sequence__line">
                  {line}
                </div>
              ))}
              {currentLine < lines.length && (
                <div className="tracking-sequence__typing">
                  {currentText}
                  <span className="tracking-sequence__cursor"></span>
                </div>
              )}
            </div>
            
            {showButtons && (
              <div className="tracking-sequence__actions">
                <button 
                  className="tracking-sequence__button tracking-sequence__button--danger"
                  onClick={handleForfeit}
                  disabled={!showButtons}
                >
                  <span className="tracking-sequence__button-icon">⚠</span>
                  <span className="tracking-sequence__button-text">TERMINATE CONNECTION</span>
                </button>
                <button 
                  className="tracking-sequence__button tracking-sequence__button--primary"
                  onClick={handleKeepExploring}
                  disabled={!showButtons}
                >
                  <span className="tracking-sequence__button-icon">⚡</span>
                  <span className="tracking-sequence__button-text">PROCEED DEEPER</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div className="tracking-sequence__footer">
          <div className="tracking-sequence__metrics">
            <div className="tracking-sequence__metric">
              <span>CPU LOAD</span>
              <div className="tracking-sequence__progress">
                <div className="tracking-sequence__progress-bar" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div className="tracking-sequence__metric">
              <span>MEMORY</span>
              <div className="tracking-sequence__progress">
                <div className="tracking-sequence__progress-bar" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div className="tracking-sequence__metric">
              <span>NETWORK</span>
              <div className="tracking-sequence__progress">
                <div className="tracking-sequence__progress-bar" style={{ width: '76%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingSequence;