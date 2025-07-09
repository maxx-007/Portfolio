import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CyberCity from './components/3d/CyberCity';
import MatrixRain from './components/effects/MatrixRain';
import HackerInterface from './components/hud/HackerInterface';
import CyberTerminal from './components/terminal/CyberTerminal';
import ResumeViewer from './components/resume/ResumeViewer';
import TrackingSequence from './components/tracking/TrackingSequence';
import './styles/main.scss';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const bootSequence = [
      'INITIALIZING NEURAL INTERFACE...',
      'ESTABLISHING QUANTUM CONNECTION...',
      'LOADING CYBERSECURITY PROTOCOLS...',
      'WARNING: UNAUTHORIZED ACCESS DETECTED',
      'FIREWALL BREACH IN PROGRESS...',
      'SYSTEM COMPROMISED - INITIATING COUNTERMEASURES',
      'DEPLOYING QUANTUM ENCRYPTION...',
      'NEURAL DEFENSE GRID ACTIVATED',
      'SYSTEM ACCESS: RESTRICTED',
      'WELCOME TO THE DARKNET'
    ];
    
    let currentMessage = 0;
    const messageInterval = setInterval(() => {
      if (currentMessage < bootSequence.length) {
        setMessages(prev => [...prev, bootSequence[currentMessage]]);
        currentMessage++;
      } else {
        clearInterval(messageInterval);
        setTimeout(onComplete, 1000);
      }
    }, 400); // Faster boot sequence
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 25;
        return next > 100 ? 100 : next;
      });
    }, 100);
    
    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-content">
        <h1 className="glitch-text">SYSTEM BREACH DETECTED</h1>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="boot-messages">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`boot-message ${i === messages.length - 1 ? 'error' : ''}`}
            >
              {msg}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMatrix, setShowMatrix] = useState(true);
  const [showSkills, setShowSkills] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [skillsData, setSkillsData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [resumeData, setResumeData] = useState({
    "PERSONAL PROFILE": "Elite Cybersecurity Specialist with extensive experience in penetration testing, exploit development, and neural network security. Known for discovering multiple CVEs and developing custom security frameworks.",
    
    "TECHNICAL EXPERTISE": [
      "Advanced Penetration Testing & Vulnerability Assessment",
      "Zero-Day Exploit Development & Research",
      "Neural Network Security & AI-Based Threat Detection",
      "Quantum Cryptography & Post-Quantum Security",
      "Custom Security Framework Development",
      "Advanced Malware Analysis & Reverse Engineering"
    ],
    
    "NOTABLE ACHIEVEMENTS": [
      "Multiple CVEs Discovered and Published",
      "Featured Speaker at BlackHat Conference",
      "DEFCON CTF Competition Winner",
      "Developed Custom Exploit Framework",
      "Led Red Team Operations for Fortune 500 Companies",
      "Published Research on Quantum-Safe Cryptography"
    ],
    
    "CERTIFICATIONS": [
      "OSCP - Offensive Security Certified Professional",
      "CISSP - Certified Information Systems Security Professional",
      "CEH - Certified Ethical Hacker",
      "GXPN - GIAC Exploit Researcher and Advanced Penetration Tester"
    ],
    
    "CLASSIFIED OPERATIONS": [
      "Operation DarkMatrix - Led successful breach of supposedly 'unhackable' system",
      "Project Quantum Shield - Developed quantum-resistant encryption protocol",
      "Initiative NeuralBreak - Created AI-powered intrusion detection system",
      "Operation Ghost Protocol - Successfully executed stealth penetration of high-security facility"
    ]
  });
  const [isTracking, setIsTracking] = useState(false);
  
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (showSkills || showProjects) {
      setTimeout(() => {
        setIsTracking(true);
      }, 2000);
    } else {
      setIsTracking(false);
    }
  }, [showSkills, showProjects]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Alt + R shortcut for resume
      if (e.altKey && e.key.toLowerCase() === 'r') {
        setShowResume(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleShowSkills = (data) => {
    setSkillsData(data);
    setShowSkills(true);
    setShowProjects(false);
    setShowResume(false);
  };

  const handleShowProjects = (data) => {
    setProjectsData(data);
    setShowProjects(true);
    setShowSkills(false);
    setShowResume(false);
  };

  const handleShowResume = () => {
    setShowResume(true);
    setShowSkills(false);
    setShowProjects(false);
  };

  return (
    <div className="app">
      <TrackingSequence />
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      
      {/* Evil Background Effects */}
      {showMatrix && <MatrixRain />}
      <div className="cyber-grid" />
      <div className="evil-overlay" />
      <CyberCity />
      
      {/* Evil UI Elements */}
      {!isLoading && (
        <>
          <HackerInterface />
          <CyberTerminal 
            onMatrixToggle={() => setShowMatrix(prev => !prev)}
            onShowSkills={handleShowSkills}
            onShowProjects={handleShowProjects}
            onShowResume={handleShowResume}
            className="evil-terminal"
          />
          <div className="evil-scanlines" />
          <div className="evil-vignette" />
        </>
      )}

      {(showSkills || showProjects) && (
        <div className={`overlay-window ${isTracking ? 'tracking' : ''}`}>
          <div className="window-header">
            <span className="title">
              {showSkills ? 'CLASSIFIED SKILLSET' : 'PROJECT DATABASE'}
            </span>
            <button 
              className="close-btn"
              onClick={() => {
                setShowSkills(false);
                setShowProjects(false);
              }}
            >
              ×
            </button>
          </div>
          <div className="window-content">
            {showSkills && skillsData && (
              <div className="skills-grid">
                {Object.entries(skillsData).map(([category, skills]) => (
                  <div key={category} className="skill-category">
                    <h3>{category}</h3>
                    <ul>
                      {skills.map((skill, i) => (
                        <li key={i} className="skill-item">
                          <span className="skill-icon">⚡</span>
                          {skill}
                        </li>
                        ))}
                      </ul>
                  </div>
                ))}
              </div>
            )}
            
            {showProjects && projectsData && (
              <div className="projects-grid">
                {projectsData.map((project, i) => (
                  <div key={i} className="project-card">
                    <h3>{project.name}</h3>
                    <p className="description">{project.description}</p>
                    <div className="tech-stack">
                      {project.tech.map((tech, j) => (
                        <span key={j} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="impact">{project.impact}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {isTracking && (
            <div className="tracking-message">
              ROOT SYSTEM TRACKING YOUR LOCATION...
              <br />
              MESS WITH THE BEST, DIE LIKE THE REST
            </div>
          )}
        </div>
      )}

      {showResume && (
        <ResumeViewer 
          onClose={() => setShowResume(false)}
          resumeData={resumeData}
        />
      )}
    </div>
  );
};

export default App;