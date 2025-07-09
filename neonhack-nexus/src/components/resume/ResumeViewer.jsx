import React, { useState, useEffect, useRef } from 'react';
import './ResumeViewer.scss';
import { profile } from '../../data';

const MORPHEUS_DIALOGUE = {
  INITIAL: "You've come seeking knowledge of the ROOT. The choice before you will determine how deep into the system you go.",
  WARNING: "Are you sure you want to intrude into the ROOT's whereabouts? After this, there is no turning back.",
  ACCEPTED: "Follow me into the depths of the system...",
  REJECTED: "Perhaps you're not ready for the truth. The system remains sealed."
};

const ResumeSection = ({ title, content }) => {
  if (!content) return null;

  const renderContent = () => {
    if (Array.isArray(content)) {
      return (
        <ul className="section-list">
          {content.map((item, index) => (
            <li key={index} className="section-item">
              {typeof item === 'string' ? item : renderComplexItem(item)}
            </li>
          ))}
        </ul>
      );
    }
    if (typeof content === 'object') {
      return Object.entries(content).map(([key, value]) => (
        <div key={key} className="subsection">
          <h3 className="subsection-title">{key}</h3>
          {Array.isArray(value) ? (
            <ul className="subsection-list">
              {value.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{value}</p>
          )}
        </div>
      ));
    }
    return <p>{content}</p>;
  };

  const renderComplexItem = (item) => {
    if (!item) return null;
    
    return (
      <div className="complex-item">
        {item.role && <h4 className="item-title">{item.role}</h4>}
        {item.company && <p className="item-subtitle">{item.company}</p>}
        {item.organization && <p className="item-subtitle">{item.organization}</p>}
        {item.period && <p className="item-period">{item.period}</p>}
        {item.location && <p className="item-location">{item.location}</p>}
        {item.description && Array.isArray(item.description) && (
          <ul className="item-description">
            {item.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        )}
        {item.name && (
          <>
            <h4 className="project-name">
              {item.name}
              {item.status && <span className="project-status">[{item.status}]</span>}
            </h4>
            <p className="project-description">{item.description}</p>
            {item.tech && (
              <div className="project-tech">
                {item.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="resume-section">
      <h2 className="section-header">{title}</h2>
      <div className="section-content">{renderContent()}</div>
    </div>
  );
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

  const renderResumeContent = () => (
    <div className="resume-content">
      <div className="resume-header">
        <h1>{profile.name}</h1>
        <h2>{profile.title}</h2>
        <p className="tagline">{profile.tagline}</p>
        <div className="contact-info">
          {Object.entries(profile.contact).map(([key, value]) => (
            <a key={key} href={key === 'email' ? `mailto:${value}` : value} target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          ))}
        </div>
      </div>

      <ResumeSection title="SUMMARY" content={profile.summary} />
      <ResumeSection title="EXPERIENCE" content={profile.experience} />
      <ResumeSection title="EDUCATION" content={profile.education} />
      <ResumeSection title="PROJECTS" content={profile.projects} />
      <ResumeSection title="SKILLS" content={profile.skills} />
      <ResumeSection title="VOLUNTEERING" content={profile.volunteering} />
      <ResumeSection title="ACHIEVEMENTS" content={profile.achievements} />
      <ResumeSection title="CERTIFICATIONS" content={profile.certifications} />

      <div className="resume-footer">
        <div className="stats-grid">
          {Object.entries(profile.stats).map(([key, value]) => (
            <div key={key} className="stat-item">
              <div className="stat-value">{value}</div>
              <div className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
            
            {renderResumeContent()}

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