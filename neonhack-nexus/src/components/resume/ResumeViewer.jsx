import React, { useState, useEffect, useRef } from 'react';
import './ResumeViewer.scss';

const MORPHEUS_DIALOGUE = {
  INITIAL: "You've come seeking knowledge of the ROOT. The choice before you will determine how deep into the system you go.",
  WARNING: "Are you sure you want to intrude into the ROOT's whereabouts? After this, there is no turning back.",
  ACCEPTED: "Follow me into the depths of the system...",
  REJECTED: "Perhaps you're not ready for the truth. The system remains sealed."
};

const ResumeViewer = ({ onClose, resumeData }) => {
  const [stage, setStage] = useState('INITIAL'); // INITIAL, CHOICE, WARNING, LOADING, DISPLAY
  const [audioInitialized, setAudioInitialized] = useState(false);
  const audioContext = useRef(null);
  const soundEffects = useRef({});

  useEffect(() => {
    // Initialize Web Audio API
    if (!audioInitialized) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      loadSoundEffects();
      setAudioInitialized(true);
    }

    // Cleanup
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const loadSoundEffects = async () => {
    const effects = {
      hover: '/sounds/hover.mp3',
      select: '/sounds/select.mp3',
      glitch: '/sounds/glitch.mp3',
      type: '/sounds/type.mp3'
    };

    for (const [name, path] of Object.entries(effects)) {
      try {
        const response = await fetch(path);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer);
        soundEffects.current[name] = audioBuffer;
      } catch (error) {
        console.error(`Failed to load sound effect: ${name}`);
      }
    }
  };

  const playSound = (effectName) => {
    if (!audioContext.current || !soundEffects.current[effectName]) return;

    const source = audioContext.current.createBufferSource();
    source.buffer = soundEffects.current[effectName];
    source.connect(audioContext.current.destination);
    source.start(0);
  };

  const handlePillChoice = (choice) => {
    playSound('select');
    if (choice === 'red') {
      setStage('WARNING');
    } else {
      setStage('REJECTED');
      setTimeout(() => onClose(), 3000);
    }
  };

  const handleWarningChoice = (accepted) => {
    playSound('select');
    if (accepted) {
      setStage('LOADING');
      playSound('glitch');
      setTimeout(() => setStage('DISPLAY'), 3000);
    } else {
      setStage('REJECTED');
      setTimeout(() => onClose(), 3000);
    }
  };

  const handleDownload = () => {
    // Implement resume download functionality
    const link = document.createElement('a');
    link.href = '/RESUME-1.pdf';
    link.download = 'RESUME-1.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderStage = () => {
    switch (stage) {
      case 'INITIAL':
        return (
          <div className="cyber-scroll">
            <div className="matrix-code"></div>
            <div className="message">{MORPHEUS_DIALOGUE.INITIAL}</div>
            <button className="continue-btn" onClick={() => setStage('CHOICE')}>
              Continue
            </button>
          </div>
        );

      case 'CHOICE':
        return (
          <div className="pill-choice">
            <div className="mysterious-figure"></div>
            <div className="pills">
              <div 
                className="pill blue"
                onMouseEnter={() => playSound('hover')}
                onClick={() => handlePillChoice('blue')}
              >
                <span className="pill-glow">💊</span>
                <span className="pill-label">Remain in ignorance</span>
              </div>
              <div 
                className="pill red"
                onMouseEnter={() => playSound('hover')}
                onClick={() => handlePillChoice('red')}
              >
                <span className="pill-glow">💊</span>
                <span className="pill-label">Know the truth</span>
              </div>
            </div>
          </div>
        );

      case 'WARNING':
        return (
          <div className="warning-screen">
            <div className="warning-message">{MORPHEUS_DIALOGUE.WARNING}</div>
            <div className="warning-choices">
              <button 
                onMouseEnter={() => playSound('hover')}
                onClick={() => handleWarningChoice(true)}
              >
                Proceed
              </button>
              <button 
                onMouseEnter={() => playSound('hover')}
                onClick={() => handleWarningChoice(false)}
              >
                Retreat
              </button>
            </div>
          </div>
        );

      case 'LOADING':
        return (
          <div className="loading-screen">
            <div className="glitch-effect">BREACHING SECURITY</div>
            <div className="progress-bar">
              <div className="progress"></div>
            </div>
          </div>
        );

      case 'DISPLAY':
        return (
          <div className="resume-display">
            <div className="classified-header">
              <div className="warning-label">TOP SECRET</div>
              <div className="file-info">
                <span>FILE: ROOT_PROFILE</span>
                <span>CLASSIFICATION: ULTRA</span>
                <span>ACCESS LEVEL: MAXIMUM</span>
              </div>
            </div>
            
            <div className="resume-content">
              {resumeData && Object.entries(resumeData).map(([section, content]) => (
                <div key={section} className="resume-section">
                  <h2 className="section-header">{section}</h2>
                  {Array.isArray(content) ? (
                    <ul className="section-list">
                      {content.map((item, index) => (
                        <li key={index} className="section-item">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="section-content">{content}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="resume-actions">
              <button 
                className="download-btn"
                onMouseEnter={() => playSound('hover')}
                onClick={handleDownload}
              >
                DOWNLOAD CLASSIFIED FILE
              </button>
              <button 
                className="close-btn"
                onMouseEnter={() => playSound('hover')}
                onClick={onClose}
              >
                TERMINATE CONNECTION
              </button>
            </div>
          </div>
        );

      case 'REJECTED':
        return (
          <div className="rejection-screen">
            <div className="rejection-message">{MORPHEUS_DIALOGUE.REJECTED}</div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="resume-viewer">
      {renderStage()}
    </div>
  );
};

export default ResumeViewer; 