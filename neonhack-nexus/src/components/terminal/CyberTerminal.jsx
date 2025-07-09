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

const CyberTerminal = ({ onMatrixToggle, className, onShowSkills, onShowProjects, onShowResume }) => {
  const [history, setHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
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
      name: "Neural Network IDS",
      description: "Advanced Intrusion Detection System using deep learning",
      tech: ["Python", "TensorFlow", "Network Security"],
      impact: "Detected 99.9% of zero-day attacks"
    },
    {
      name: "Quantum-Safe VPN",
      description: "VPN implementation resistant to quantum computing attacks",
      tech: ["C++", "OpenSSL", "Quantum Cryptography"],
      impact: "Featured in BlackHat 2023"
    },
    {
      name: "AI Malware Hunter",
      description: "Automated malware detection and analysis platform",
      tech: ["Python", "Machine Learning", "Assembly"],
      impact: "Analyzed 1M+ malware samples"
    }
  ];

  const commands = {
    help: () => ({
      output: `Available commands:
help     - Display this help message
clear    - Clear terminal
skills   - Display technical skills
projects - List cybersecurity projects
whoami   - Display hacker profile
contact  - Show contact information
scan     - Run security scan simulation
matrix   - Toggle Matrix rain effect
hack     - Initiate system breach simulation
resume   - Show resume
`,
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
      
      const output = `${SKULL_ASCII}
UNAUTHORIZED ACCESS DETECTED
ACCESSING RESTRICTED SKILLSET DATABASE...
[██████████] 100% Complete

SKILL MATRIX EXPOSED:
${Object.entries(skillsData).map(([category, skills]) => `
[${category}]
${skills.map(skill => `  ├─ ${skill}`).join('\n')}`).join('\n')}

WARNING: Root system tracking your location...
REMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      onShowSkills(skillsData);
      return { output, type: 'warning' };
    },
    projects: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const output = `${SKULL_ASCII}
ACCESSING CLASSIFIED PROJECT DATABASE...
[██████████] 100% Complete

PROJECTS EXPOSED:
${projectsData.map((project, i) => `
[${i + 1}] ${project.name}
    ├─ ${project.description}
    ├─ Tech: ${project.tech.join(', ')}
    └─ Impact: ${project.impact}`).join('\n')}

CAUTION: System breach detected. Initiating countermeasures...
REMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      onShowProjects(projectsData);
      return { output, type: 'warning' };
    },
    whoami: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const output = `${SKULL_ASCII}
ACCESSING CLASSIFIED PERSONNEL FILE...
[██████████] 100% Complete

IDENTITY: ELITE CYBERSECURITY SPECIALIST
STATUS: HIGHLY DANGEROUS
THREAT LEVEL: MAXIMUM

SPECIALIZATIONS:
  ├─ Advanced Penetration Testing
  ├─ Zero-Day Exploit Development
  ├─ Neural Network Security
  └─ Quantum Cryptography Research

ACHIEVEMENTS:
  ├─ Multiple CVEs Discovered
  ├─ BlackHat Speaker
  ├─ DEFCON CTF Winner
  └─ Custom Exploit Framework Developer

WARNING: This information is classified. Your IP has been logged.
REMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
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
      
      output += `ACCESS GRANTED - Welcome to the mainframe
WARNING: Multiple security protocols bypassed
Quantum encryption algorithms compromised
Neural firewall disabled
System access: ROOT

${SKULL_ASCII}
REMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
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
      
      output = `RUNNING SECURITY SCAN...
[██████████] 100% Complete

CRITICAL VULNERABILITIES DETECTED:
${vulnerabilities.map((v, i) => `[!] ${v}`).join('\n')}

System security status: COMPROMISED
Recommended action: IMMEDIATE INTERVENTION

${SKULL_ASCII}
REMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      return { output, type: 'error' };
    },
    contact: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const output = `${SKULL_ASCII}
ESTABLISHING SECURE COMMUNICATION CHANNEL...
[██████████] 100% Complete

CONTACT PROTOCOLS:
  ├─ Email: [REDACTED]
  ├─ PGP Key: 0xAB54321...
  ├─ Github: github.com/[username]
  └─ LinkedIn: linkedin.com/in/[username]

WARNING: Communication channels monitored. Proceed with caution.
REMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      return { output, type: 'warning' };
    },
    resume: async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const output = `${SKULL_ASCII}
ACCESSING CLASSIFIED PERSONNEL FILE...
[██████████] 100% Complete

CAUTION: This file contains highly sensitive information.
Security clearance required for full access.
Initiating Matrix protocol...

WARNING: Root system tracking your location...
REMEMBER: MESS WITH THE BEST, DIE LIKE THE REST.`;
      
      setIsProcessing(false);
      onShowResume();
      return { output, type: 'warning' };
    },
    unknown: () => ({
      output: `Command not recognized. Type "help" for available commands.
${SKULL_ASCII}
UNAUTHORIZED COMMAND DETECTED. SYSTEM LOGGED.`,
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
      }, 300); // Wait for animation to complete
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
  );
};

export default CyberTerminal; 