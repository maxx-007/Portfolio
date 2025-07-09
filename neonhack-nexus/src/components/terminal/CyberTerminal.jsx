import React, { useState, useRef, useEffect } from 'react';
import './CyberTerminal.scss';

const SKULL_ASCII = `
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⢀⡖⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⢦⡀⠀⠀⠀⠀
    ⠀⠀⠀⢀⣼⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣧⠀⠀⠀⠀
    ⠀⠀⠀⣾⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣧⠀⠀⠀
    ⠀⠀⣰⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣆⠀⠀
    ⠀⢠⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡄⠀
    ⢀⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⡀
    ⣸⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣇
    ⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿
    ⢿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⡿
    ⠸⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠇
    ⠀⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠀
    ⠀⢻⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡟⠀
    ⠀⠀⠻⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠟⠀⠀
    ⠀⠀⠀⠘⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠋⠀⠀⠀
`;

// Project Hacker Modal Component
const ProjectHackerModal = ({ project, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isHacking, setIsHacking] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const hackingSteps = [
    'SCANNING PROJECT ARCHITECTURE...',
    'BYPASSING REPOSITORY SECURITY...',
    'DECRYPTING SOURCE CODE...',
    'ANALYZING DEPLOYMENT PROTOCOLS...',
    'ESTABLISHING SECURE CONNECTION...',
    'ACCESS GRANTED - WELCOME TO THE MATRIX'
  ];

  const accessGrantedSound = new Audio('/public/sounds/access_granted.wav');

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsHacking(false);
      setSelectedOption(null);
    }
  }, [isOpen]);

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    setIsHacking(true);
    setCurrentStep(0);

    for (let i = 0; i < hackingSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setIsHacking(false);
    accessGrantedSound.play();
    
    // Open the link based on the selected option and project's URLs
    setTimeout(() => {
      if (option === 'github' && project.githubUrl) {
        window.open(project.githubUrl, '_blank');
      } else if (option === 'demo' && project.demoUrl) {
        window.open(project.demoUrl, '_blank');
      }
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="cyber-modal">
      <div className="cyber-modal-content">
        {/* Close button */}
        <button
          onClick={onClose}
          className="close-button"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: '#ff0000',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ×
        </button>

        {/* Terminal-style header */}
        <div style={{ borderBottom: '1px solid #ff0000', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ color: '#ff0000', marginRight: '0.5rem' }}>{'>'}</span>
            <span style={{ color: '#ff3333', fontFamily: 'Courier New, monospace' }}>ACCESSING PROJECT DATABASE...</span>
          </div>
          <div style={{ color: '#ff0000', fontFamily: 'Courier New, monospace', fontSize: '0.875rem', animation: 'pulse 1s infinite' }}>
            [██████████] 100% Complete
          </div>
        </div>

        {!isHacking ? (
          <>
            {/* Project info */}
            <div style={{ marginBottom: '1.5rem' }}>
              <pre style={{ color: '#ff0000', fontSize: '0.75rem', marginBottom: '1rem', opacity: 0.5 }}>{SKULL_ASCII}</pre>
              
              <div style={{ color: '#ff0000', fontFamily: 'Courier New, monospace', marginBottom: '0.5rem' }}>
                PROJECT ID: {project.name.toUpperCase()}
              </div>
              <div style={{ color: '#ff3333', fontFamily: 'Courier New, monospace', fontSize: '0.875rem', marginBottom: '1rem' }}>
                CLASSIFICATION: {project.description}
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#ff0000', fontFamily: 'Courier New, monospace', marginBottom: '0.5rem' }}>TECH STACK:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tech.map((tech, i) => (
                    <span key={i} style={{
                      background: '#1a0000',
                      color: '#ff3333',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      fontFamily: 'Courier New, monospace',
                      border: '1px solid #ff0000'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{ color: '#ff3333', fontFamily: 'Courier New, monospace', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                IMPACT: {project.impact}
              </div>
            </div>

            {/* Options */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: '#ff0000', fontFamily: 'Courier New, monospace', marginBottom: '1rem', textAlign: 'center' }}>
                SELECT YOUR INFILTRATION METHOD:
              </div>
              
              {project.githubUrl && (
                <button
                  onClick={() => handleOptionSelect('github')}
                  style={{
                    width: '100%',
                    background: 'black',
                    border: '1px solid #ff0000',
                    color: '#ff0000',
                    padding: '1rem',
                    fontFamily: 'Courier New, monospace',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#1a0000';
                    e.target.style.color = '#ff3333';
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'black';
                    e.target.style.color = '#ff0000';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: 'bold' }}>[1] BREACH SOURCE CODE REPOSITORY</div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.75 }}>Access classified GitHub vault</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '1.5rem' }}>{'>'}</div>
                  </div>
                </button>
              )}
              
              {project.demoUrl && (
                <button
                  onClick={() => handleOptionSelect('demo')}
                  style={{
                    width: '100%',
                    background: 'black',
                    border: '1px solid #ff0000',
                    color: '#ff0000',
                    padding: '1rem',
                    fontFamily: 'Courier New, monospace',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#1a0000';
                    e.target.style.color = '#ff3333';
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'black';
                    e.target.style.color = '#ff0000';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: 'bold' }}>[2] INFILTRATE LIVE DEPLOYMENT</div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.75 }}>Access operational system</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '1.5rem' }}>{'>'}</div>
                  </div>
                </button>
              )}
            </div>

            <div style={{ textAlign: 'center', color: '#ff0000', fontFamily: 'Courier New, monospace', fontSize: '0.875rem', opacity: 0.75 }}>
              WARNING: All activities are monitored and logged
            </div>
          </>
        ) : (
          <div className="hacking-terminal">
            <pre className="skull-ascii">{SKULL_ASCII}</pre>
            
            <div className="hacking-status">
              INITIATING {selectedOption === 'github' ? 'REPOSITORY' : 'DEPLOYMENT'} BREACH...
            </div>
            
            <div className="progress-steps">
              {hackingSteps.map((step, i) => (
                <div key={i} className={`step ${i < currentStep ? 'completed' : i === currentStep ? 'active' : 'pending'}`}>
                  {i < currentStep ? '✓' : i === currentStep ? '>' : '○'} {step}
                  {i === currentStep && (
                    <div className="progress-bar">
                      <div className="progress"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {currentStep >= hackingSteps.length - 1 && (
              <div style={{ marginTop: '1.5rem', color: '#ff0000', fontFamily: 'Courier New, monospace', animation: 'pulse 1s infinite' }}>
                REDIRECTING TO SECURE CHANNEL...
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#ff0000', fontFamily: 'Courier New, monospace', fontSize: '0.75rem', opacity: 0.5 }}>
          REMEMBER: MESS WITH THE BEST, DIE LIKE THE REST
        </div>
      </div>
    </div>
  );
};

// Projects Window Component
const ProjectsWindow = ({ projects, onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectClickSound = new Audio('/public/sounds/project_click.wav');

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    projectClickSound.play();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <div className="cyber-modal">
        <div className="cyber-modal-content">
          {/* Header */}
          <div className="cyber-modal-header">
            <h2>CLASSIFIED PROJECT DATABASE</h2>
            <button
              onClick={onClose}
              className="close-button"
            >
              ×
            </button>
          </div>

          {/* Projects Grid */}
          <div className="cyber-modal-grid">
            {projects.map((project, i) => (
              <div
                key={i}
                onClick={() => handleProjectClick(project)}
                className="project-card"
              >
                <div className="project-header">
                  <span>{'>'}</span>
                  <h3>{project.name}</h3>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="tech-stack">
                  <div className="tech-label">TECH STACK:</div>
                  <div className="tech-tags">
                    {project.tech.map((tech, j) => (
                      <span key={j}>{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="project-impact">
                  IMPACT: {project.impact}
                </div>
                
                <div className="infiltrate-text">
                  CLICK TO INFILTRATE →
                </div>
              </div>
            ))}
          </div>

          <div className="warning-text">
            WARNING: UNAUTHORIZED ACCESS DETECTED
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectHackerModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

const CyberTerminal = ({ onMatrixToggle, className, onShowSkills, onShowProjects, onShowResume }) => {
  const [history, setHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const skillsData = {
    "Penetration Testing": [
      "Network Vulnerability Assessment",
      "Web Application Security",
      "Wireless Network Testing",
      "Social Engineering"
    ],
    "Malware Analysis": [
      "Reverse Engineering",
      "Binary Analysis",
      "Exploit Development",
      "Zero-day Research"
    ],
    "Security Tools": [
      "Metasploit Framework",
      "Burp Suite Pro",
      "Wireshark",
      "Nmap",
      "Custom Tool Development"
    ],
    "Programming": [
      "Python for Security",
      "C++ for Exploit Dev",
      "JavaScript/Node.js",
      "Assembly Language"
    ],
    "Network Security": [
      "Firewall Configuration",
      "IDS/IPS Implementation",
      "VPN Setup",
      "Network Monitoring"
    ],
    "Cryptography": [
      "Encryption Protocols",
      "Key Management",
      "Blockchain Security",
      "Quantum Cryptography"
    ]
  };

  const projectsData = [
    {
      name: "CatchPhish",
      description: "Real-time phishing detection platform that flags suspicious URLs using machine learning and WHOIS data.",
      tech: ["React", "Node.js", "Firebase", "ML", "Phishing Detection"],
      impact: "Flagged 500+ phishing attempts in simulated environments; selected for Union Bank Hackathon.",
      githubUrl: "https://github.com/maxx-007/catchphish",
      demoUrl: "https://catchphish.vercel.app"
    },
    {
      name: "Web Application Firewall (WAF)",
      description: "AI-enhanced firewall for detecting and blocking malicious web traffic with real-time log monitoring.",
      tech: ["Node.js", "Express", "React", "MySQL", "MongoDB", "Cybersecurity"],
      impact: "Built a custom hybrid WAF with live dashboard; future-ready for CatchPhish integration.",
      githubUrl: "https://github.com/maxx-007/WEB-APPLICATION-FIREWALL",
      demoUrl: "https://arise-firewall.vercel.app/"
    },
    {
      name: "FloodReaper",
      description: "A powerful network stress-testing and DDoS simulation tool with IP hopping via Tor integration.",
      tech: ["Python", "RustScan", "Tor Browser", "Network Testing"],
      impact: "Simulated high-intensity DDoS scenarios in lab; used for resilience benchmarking.",
      githubUrl: "https://github.com/maxx-007/floodreaper",
      demoUrl: "https://floodreaper.your-demo-site.com"
    },
    {
      name: "Women's Safety SOS App (In Progress)",
      description: "AI/ML-based safety app that monitors daily routes and triggers alerts on deviation or emergency.",
      tech: ["Android", "Java", "Firebase", "ML", "Geolocation"],
      impact: "Implements privacy-respecting safety protocols; automatically notifies police & contacts.",
      githubUrl: "https://github.com/maxx-007/WomenSOSAPP",
      demoUrl: "https://womens-safety-app.your-demo-site.com"
    },
    {
      name: "Arduino-Based Intrusion Detection",
      description: "Home security system with motion sensors and alert triggers using Arduino microcontrollers.",
      tech: ["Arduino", "C++", "IoT", "Embedded Security"],
      impact: "Used in lab setups for remote access testing and physical intrusion simulations.",
      githubUrl: "https://github.com/maxx-007/Arduino-Based-Intrusion-Detection-System",
      demoUrl: "https://arduino-intrusion.your-demo-site.com"
    }
  ];

  const commands = {
    help: () => ({
      output: `Available commands:\nhelp     - Display this help message\nclear    - Clear terminal\nskills   - Display technical skills\nprojects - List cybersecurity projects\nwhoami   - Display hacker profile\ncontact  - Show contact information\nscan     - Run security scan simulation\nmatrix   - Toggle Matrix rain effect\nhack     - Initiate system breach simulation\nresume - Show resume\n`,
      type: 'success'
    }),
    clear: () => {
      setHistory([]);
      return { output: '', type: 'success' };
    },
    matrix: () => {
      onMatrixToggle();
      return { 
        output: 'Matrix rain effect toggled',
        type: 'success'
      };
    },
    skills: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const output = `${SKULL_ASCII}\nUNAUTHORIZED ACCESS DETECTED\nACCESSING RESTRICTED SKILLSET DATABASE...\n[██████████] 100% Complete\n\nSKILL MATRIX EXPOSED:\n${Object.entries(skillsData).map(([category, skills]) => `\n[${category}]\n${skills.map(skill => `  ├─ ${skill}`).join('\n')}`).join('\n')}\n\nWARNING: Root system tracking your location...\nREMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      onShowSkills(skillsData);
      return { output, type: 'warning' };
    },
    projects: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const output = `${SKULL_ASCII}\nACCESSING CLASSIFIED PROJECT DATABASE...\n[██████████] 100% Complete\n\nPROJECTS EXPOSED:\n${projectsData.map((project, i) => `\n[${i + 1}] ${project.name}\n    ├─ ${project.description}\n    ├─ Tech: ${project.tech.join(', ')}\n    └─ Impact: ${project.impact}`).join('\n')}\n\nCAUTION: System breach detected. Initiating countermeasures...\nREMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      // Use the hacker-themed projects modal
      setShowProjectsModal(true);
      return { output, type: 'warning' };
    },
    whoami: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const output = `${SKULL_ASCII}\nACCESSING CLASSIFIED PERSONNEL FILE...\n[██████████] 100% Complete\n\nIDENTITY: ELITE CYBERSECURITY SPECIALIST\nSTATUS: HIGHLY DANGEROUS\nTHREAT LEVEL: MAXIMUM\n\nSPECIALIZATIONS:\n  ├─ Advanced Penetration Testing\n  ├─ Zero-Day Exploit Development\n  ├─ Neural Network Security\n  └─ Quantum Cryptography Research\n\nACHIEVEMENTS:\n  ├─ Multiple CVEs Discovered\n  ├─ BlackHat Speaker\n  ├─ DEFCON CTF Winner\n  └─ Custom Exploit Framework Developer\n\nWARNING: This information is classified. Your IP has都被 logged.\nREMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      return { output, type: 'warning' };
    },
    hack: async () => {
      setIsProcessing(true);
      const steps = [
        'INITIATING SYSTEM BREACH...',
        'BYPASSING FIREWALL...',
        'EXPLOITING KERNEL VULNERABILITIES...',
        'ESCALATING PRIVILEGES...',
        'ESTABLISHING BACKDOOR...',
        'COVERING TRACKS...'
      ];
      
      let output = '';
      for (const step of steps) {
        output += `${step}\n[`;
        for (let i = 0; i < 10; i++) {
          output += '█';
          setHistory(prev => [...prev.slice(0, -1), { 
            command: currentCommand,
            output: output + ']',
            type: 'error' 
          }]);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        output += '] Complete\n\n';
      }
      
      output += `ACCESS GRANTED - Welcome to the mainframe\nWARNING: Multiple security protocols bypassed\nQuantum encryption algorithms compromised\nNeural firewall disabled\nSystem access: ROOT\n\n${SKULL_ASCII}\nREMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      return { output, type: 'error' };
    },
    scan: async () => {
      setIsProcessing(true);
      const vulnerabilities = [
        'Buffer overflow in memory sector 0x7FFF',
        'Unpatched zero-day exploit detected',
        'Weak encryption in network layer',
        'Backdoor detected in system kernel',
        'Root access compromise identified'
      ];
      
      let output = 'RUNNING SECURITY SCAN...\n';
      for (let i = 0; i <= 10; i++) {
        output = `RUNNING SECURITY SCAN...\n[${'█'.repeat(i)}${' '.repeat(10-i)}] ${i*10}%`;
        setHistory(prev => [...prev.slice(0, -1), { 
          command: currentCommand,
          output,
          type: 'error' 
        }]);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      output = `RUNNING SECURITY SCAN...\n[██████████] 100% Complete\n\nCRITICAL VULNERABILITIES DETECTED:\n${vulnerabilities.map((v, i) => `[!] ${v}`).join('\n')}\n\nSystem security status: COMPROMISED\nRecommended action: IMMEDIATE INTERVENTION\n\n${SKULL_ASCII}\nREMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      return { output, type: 'error' };
    },
    contact: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const output = `${SKULL_ASCII}\nESTABLISHING SECURE COMMUNICATION CHANNEL...\n[██████████] 100% Complete\n\nCONTACT PROTOCOLS:\n  ├─ Email: [REDACTED]\n  ├─ PGP Key: 0xAB54321...\n  ├─ Github: github.com/[username]\n  └─ LinkedIn: linkedin.com/in/[username]\n\nWARNING: Communication channels monitored. Proceed with caution.\nREMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      return { output, type: 'warning' };
    },
    resume: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const output = `${SKULL_ASCII}\nACCESSING CLASSIFIED PERSONNEL FILE...\n[██████████] 100% Complete\n\nCAUTION: This file contains highly sensitive information.\nSecurity clearance required for full access.\nInitiating Matrix protocol...\n\nWARNING: Root system tracking your location...\nREMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      onShowResume();
      return { output, type: 'warning' };
    },
    unknown: () => ({
      output: `Command not recognized. Type "help" for available commands.\n${SKULL_ASCII}\nUNAUTHORIZED COMMAND DETECTED. SYSTEM LOGGED.`,
      type: 'error'
    })
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (terminalRef.current && !terminalRef.current.contains(event.target)) {
        setIsMinimized(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTerminalClick = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    }
  };

  const handleCommand = async (cmd) => {
    if (isProcessing) return;
    
    const trimmedCmd = cmd.trim().toLowerCase();
    const command = commands[trimmedCmd] || commands.unknown;
    
    setHistory(prev => [...prev, {
      command: cmd,
      output: 'Processing command...',
      type: 'processing'
    }]);
    
    const result = await command();
    
    setHistory(prev => [...prev.slice(0, -1), {
      command: cmd,
      ...result
    }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    handleCommand('Welcome to CyberSec Terminal v2.0\nType \'help\' for available commands...');
  }, []);

  return (
    <>
      <div 
        ref={terminalRef}
        className={`cyber-terminal ${className || ''} ${isMinimized ? 'minimized' : ''}`}
        onClick={handleTerminalClick}
      >
        <div className="terminal-header">
          <div className="title">
            NEONHACK TERMINAL v1.0
          </div>
          <div className="controls">
            <div className="control"></div>
            <div className="control"></div>
            <div className="control"></div>
          </div>
        </div>
        
        <div className="terminal-content">
          {history.map((entry, index) => (
            <div key={index} className="terminal-entry">
              <div className="command-line">
                <span className="prompt">{'>'}</span>
                <span className="command">{entry.command}</span>
              </div>
              {entry.output && (
                <pre className={`output ${entry.type}`}>
                  {entry.output}
                </pre>
              )}
            </div>
          ))}
          
          <div className="input-line">
            <span className="prompt">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isProcessing}
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Hacker-themed Projects Modal */}
      {showProjectsModal && (
        <ProjectsWindow
          projects={projectsData}
          onClose={() => setShowProjectsModal(false)}
        />
      )}
    </>
  );
};

export default CyberTerminal;


