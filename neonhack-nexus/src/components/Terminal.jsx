import { useState, useEffect, useRef } from 'react'
import ResumeViewer from './resume/ResumeViewer'

const commands = {
  help: 'Available commands: about, skills, projects, contact, clear, whoami, date, ls, hack, matrix, status, scan, exploit, resume',
  about: 'Display personal cyber profile',
  skills: 'Initialize skill matrix visualization',
  projects: 'Access project database',
  contact: 'Establish secure communication channels',
  clear: 'Purge terminal buffer',
  whoami: 'Identity verification protocol',
  date: 'Retrieve system timestamp',
  ls: 'List directory contents',
  hack: 'Initiate ethical hacking simulation',
  matrix: 'Activate matrix visualization mode',
  status: 'System status and statistics',
  scan: 'Network reconnaissance mode',
  exploit: 'Vulnerability assessment tools',
  resume: 'Access and download classified ROOT profile'
}

const hackingSequences = [
  'Initializing penetration testing framework...',
  'Scanning for vulnerabilities...',
  'Exploiting buffer overflow in target system...',
  'Escalating privileges...',
  'Accessing secure database...',
  'Exfiltrating encrypted data...',
  'Covering tracks...',
  'Mission accomplished. Target compromised.',
]

const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?'

export default function Terminal({ profile, activeSection, setActiveSection }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { text: '╔══════════════════════════════════════════════════════════════╗', type: 'border' },
    { text: '║                    NEONHACK NEXUS v2.0                      ║', type: 'system' },
    { text: '║                 QUANTUM CYBER SECURITY TERMINAL             ║', type: 'system' },
    { text: '╚══════════════════════════════════════════════════════════════╝', type: 'border' },
    { text: '[SYSTEM] Neural firewall: ACTIVE', type: 'system' },
    { text: '[SYSTEM] Quantum encryption: ENABLED', type: 'system' },
    { text: '[SYSTEM] Intrusion detection: MONITORING', type: 'system' },
    { text: '[INFO] Access granted to: KRISH.HADKAR', type: 'info' },
    { text: '[INFO] Security clearance: RED TEAM ANALYST', type: 'info' },
    { text: 'Type "help" for command list or "hack" for simulation mode', type: 'info' },
    { text: '', type: 'output' }
  ])
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isHacking, setIsHacking] = useState(false)
  const [matrixMode, setMatrixMode] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [cpuUsage, setCpuUsage] = useState(45)
  const [memoryUsage, setMemoryUsage] = useState(67)
  const [networkStatus, setNetworkStatus] = useState('ACTIVE')
  const [showResumeViewer, setShowResumeViewer] = useState(false)
  const inputRef = useRef(null)
  const terminalBodyRef = useRef(null)
  const matrixCanvasRef = useRef(null)

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }

  const addToHistory = (text, type = 'output') => {
    setHistory(prev => [...prev, { text, type }])
    setTimeout(scrollToBottom, 100)
  }

  const typewriterEffect = (text, type, callback) => {
    const chars = text.split('')
    let index = 0
    const interval = setInterval(() => {
      setHistory(prev => {
        const newHistory = [...prev]
        const lastIndex = newHistory.length - 1
        if (newHistory[lastIndex] && newHistory[lastIndex].type === type) {
          newHistory[lastIndex].text = text.substring(0, index + 1)
        } else {
          newHistory.push({ text: text.substring(0, index + 1), type })
        }
        return newHistory
      })
      index++
      if (index >= chars.length) {
        clearInterval(interval)
        if (callback) callback()
      }
    }, 50)
  }

  const executeCommand = (cmd) => {
    const command = cmd.toLowerCase().trim()
    addToHistory(`root@neonhack:~$ ${cmd}`, 'input')
    
    if (commandHistory[commandHistory.length - 1] !== cmd) {
      setCommandHistory(prev => [...prev, cmd])
    }
    
    switch (command) {
      case 'help':
        addToHistory('Available commands:', 'system')
        addToHistory('  about     - Display personal cyber profile', 'output')
        addToHistory('  skills    - Initialize skill matrix visualization', 'output')
        addToHistory('  projects  - Access project database', 'output')
        addToHistory('  contact   - Establish secure communication channels', 'output')
        addToHistory('  clear     - Purge terminal buffer', 'output')
        addToHistory('  hack      - Initiate ethical hacking simulation', 'output')
        addToHistory('  matrix    - Toggle matrix rain effect', 'output')
        break
        
      case 'about':
        addToHistory('═══════════════════════════════════════', 'system')
        addToHistory('PERSONAL CYBER PROFILE - CLASSIFIED', 'system')
        addToHistory('═══════════════════════════════════════', 'system')
        addToHistory(`Name: ${profile.name}`, 'output')
        addToHistory(`Title: ${profile.title}`, 'output')
        addToHistory(`Status: ${profile.tagline}`, 'output')
        addToHistory(`GPA: ${profile.education[1].gpa}/10.0 (Cyber Security)`, 'success')
        addToHistory('Profile successfully loaded from secure database.', 'info')
        setActiveSection('about')
        break
        
      case 'skills':
        addToHistory('Initializing skill matrix visualization...', 'system')
        addToHistory('Loading neural network topology...', 'system')
        setTimeout(() => {
          addToHistory('Skill matrix activated. 3D visualization enabled.', 'success')
          setActiveSection('skills')
        }, 1500)
        break
        
      case 'projects':
        addToHistory('Accessing project database...', 'system')
        addToHistory('Decrypting project files...', 'system')
        setTimeout(() => {
          addToHistory(`Found ${profile.projects.length} classified projects`, 'success')
          profile.projects.forEach(project => {
            addToHistory(`├─ ${project.name} [${project.status}]`, 'output')
          })
          setActiveSection('projects')
        }, 1000)
        break
        
      case 'contact':
        addToHistory('Establishing secure communication channels...', 'system')
        addToHistory('═══════════════════════════════════════', 'system')
        addToHistory('SECURE CONTACT PROTOCOLS', 'system')
        addToHistory('═══════════════════════════════════════', 'system')
        addToHistory(`Email: ${profile.contact.email}`, 'output')
        addToHistory(`Phone: ${profile.contact.phone}`, 'output')
        addToHistory(`LinkedIn: ${profile.contact.linkedin}`, 'output')
        addToHistory(`GitHub: ${profile.contact.github}`, 'output')
        addToHistory('All channels encrypted with quantum protocols.', 'success')
        setActiveSection('contact')
        break
        
      case 'clear':
        setHistory([])
        break
        
      case 'hack':
        setIsHacking(true)
        addToHistory('[WARN] WARNING: Entering ethical hacking simulation mode', 'warning')
        addToHistory('[SYS] Initializing penetration testing framework...', 'system')
        let progress = 0
        const interval = setInterval(() => {
          progress += 20
          setScanProgress(progress)
          if (progress >= 100) {
            clearInterval(interval)
              setIsHacking(false)
            addToHistory('[SUCCESS] Target system compromised', 'success')
            } else {
            addToHistory(`[SYS] Scanning... ${progress}% complete`, 'system')
            }
        }, 1000)
        break
        
      case 'matrix':
        setMatrixMode(!matrixMode)
        addToHistory(`Matrix rain effect ${matrixMode ? 'deactivated' : 'activated'}`, 'system')
        break
        
      case 'status':
        addToHistory('═══════════════════════════════════════', 'system')
        addToHistory('SYSTEM STATUS REPORT', 'system')
        addToHistory('═══════════════════════════════════════', 'system')
        addToHistory(`CPU Usage: ${cpuUsage}%`, cpuUsage > 80 ? 'warning' : 'success')
        addToHistory(`Memory: ${memoryUsage}%`, memoryUsage > 80 ? 'warning' : 'success')
        addToHistory(`Network: ${networkStatus}`, 'success')
        addToHistory(`Active Processes: ${Math.floor(Math.random() * 200 + 50)}`, 'output')
        addToHistory(`Firewall: ACTIVE`, 'success')
        addToHistory(`Intrusion Detection: MONITORING`, 'success')
        break
        
      case 'resume':
        addToHistory('═══════════════════════════════════════', 'system')
        addToHistory('ACCESSING CLASSIFIED ROOT PROFILE', 'system')
        addToHistory('═══════════════════════════════════════', 'system')
        addToHistory('Initializing secure document retrieval...', 'system')
        setTimeout(() => {
          setShowResumeViewer(true)
          addToHistory('ROOT profile accessed. Displaying classified information...', 'success')
          addToHistory('[WARNING] This document is classified. Handle with care.', 'warning')
        }, 1500)
        setActiveSection('resume')
        break
        
      case 'scan':
        addToHistory('Initializing network reconnaissance...', 'system')
        addToHistory('Scanning subnet 192.168.1.0/24...', 'output')
        setScanProgress(0)
        
        const scanInterval = setInterval(() => {
          setScanProgress(prev => {
            const newProgress = prev + Math.random() * 15
            if (newProgress >= 100) {
              clearInterval(scanInterval)
              addToHistory('Scan complete. 12 hosts discovered.', 'success')
              addToHistory('192.168.1.1    Router        [SECURE]', 'output')
              addToHistory('192.168.1.45   Windows 10    [VULNERABLE]', 'warning')
              addToHistory('192.168.1.67   Linux Server  [HARDENED]', 'success')
              return 100
            }
            addToHistory(`Scanning... ${Math.floor(newProgress)}%`, 'output')
            return newProgress
          })
        }, 500)
        break
        
      case 'exploit':
        addToHistory('Loading vulnerability assessment tools...', 'system')
        addToHistory('Available exploit modules:', 'output')
        addToHistory('├─ buffer_overflow.py', 'output')
        addToHistory('├─ sql_injection.py', 'output')
        addToHistory('├─ xss_scanner.py', 'output')
        addToHistory('├─ privilege_escalation.sh', 'output')
        addToHistory('└─ social_engineering.py', 'output')
        addToHistory('WARNING: For educational purposes only!', 'warning')
        break
        
      default:
        addToHistory(`Command not found: ${command}`, 'error')
    }
  }

  const startMatrixEffect = () => {
    const canvas = matrixCanvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const columns = Math.floor(canvas.width / 20)
    const drops = Array(columns).fill(1)
    
    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#00ff9d'
      ctx.font = '15px monospace'
      
      drops.forEach((drop, i) => {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ctx.fillText(text, i * 20, drop * 20)
        
        if (drop * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })
    }
    
    if (matrixMode) {
      const interval = setInterval(drawMatrix, 50)
      return () => clearInterval(interval)
    }
  }

  useEffect(() => {
    // Focus input on mount and after every command
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [history])

  useEffect(() => {
    // Add click handler to focus input when clicking anywhere in terminal
    const handleTerminalClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
    
    document.addEventListener('click', handleTerminalClick)
    return () => document.removeEventListener('click', handleTerminalClick)
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex(prev => prev + 1)
        setInput(commandHistory[commandHistory.length - 1 - historyIndex - 1])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        setHistoryIndex(prev => prev - 1)
        setInput(commandHistory[commandHistory.length - 1 - historyIndex + 1])
        } else {
          setHistoryIndex(-1)
          setInput('')
        }
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      executeCommand(input.trim())
      setInput('')
      setHistoryIndex(-1)
    }
  }

  // Simulate system stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.floor(40 + Math.random() * 20))
      setMemoryUsage(prev => Math.floor(60 + Math.random() * 15))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="terminal-container" style={{ position: 'relative', zIndex: 'var(--layer-terminal)' }}>
        <div className="terminal-header">
          <div className="terminal-controls">
            <span className="control close"></span>
            <span className="control minimize"></span>
            <span className="control maximize"></span>
          </div>
          <div className="terminal-title">NEONHACK NEXUS - QUANTUM TERMINAL</div>
        </div>
        
        <div className="terminal-body" ref={terminalBodyRef}>
          {history.map((entry, index) => (
            <div key={index} className={`terminal-line ${entry.type}`}>
              {entry.text}
            </div>
          ))}
          
          <form onSubmit={handleSubmit} className="terminal-input-line">
            <span className="prompt">root@neonhack:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              spellCheck="false"
              autoComplete="off"
            />
          </form>
        </div>
        
        {isHacking && (
          <div className="hack-overlay">
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${scanProgress}%` }}></div>
              </div>
              <div className="progress-text">{`System breach: ${scanProgress}%`}</div>
            </div>
          </div>
        )}
      </div>
      {showResumeViewer && (
        <ResumeViewer
          onClose={() => setShowResumeViewer(false)}
          resumeData={profile}
        />
      )}
    </>
  )
}