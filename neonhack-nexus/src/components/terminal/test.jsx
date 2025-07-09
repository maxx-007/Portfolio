import React, { useState, useEffect } from 'react';

// Add this to your CyberTerminal.jsx file
const ProjectHackerModal = ({ project, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isHacking, setIsHacking] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const SKULL_ASCII = `
    ⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⣠⣶⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀
    ⠀⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀
    ⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷
    ⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`;

  const hackingSteps = [
    'SCANNING PROJECT ARCHITECTURE...',
    'BYPASSING REPOSITORY SECURITY...',
    'DECRYPTING SOURCE CODE...',
    'ANALYZING DEPLOYMENT PROTOCOLS...',
    'ESTABLISHING SECURE CONNECTION...',
    'ACCESS GRANTED - WELCOME TO THE MATRIX'
  ];

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
    
    // Simulate opening the link
    setTimeout(() => {
      if (option === 'github') {
        // Replace with actual GitHub URL
        window.open(`https://github.com/yourusername/${project.name.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
      } else if (option === 'demo') {
        // Replace with actual demo URL
        window.open(`https://your-demo-site.com/${project.name.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
      }
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-red-500 rounded-lg p-6 max-w-2xl w-full max-h-screen overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-300 text-xl font-bold"
        >
          ×
        </button>

        {/* Terminal-style header */}
        <div className="border-b border-red-500 pb-4 mb-6">
          <div className="flex items-center mb-2">
            <span className="text-red-500 mr-2">{'>'}</span>
            <span className="text-red-300 font-mono">ACCESSING PROJECT DATABASE...</span>
          </div>
          <div className="text-red-500 font-mono text-sm animate-pulse">
            [██████████] 100% Complete
          </div>
        </div>

        {!isHacking ? (
          <>
            {/* Project info */}
            <div className="mb-6">
              <pre className="text-red-500 text-xs mb-4 opacity-50">{SKULL_ASCII}</pre>
              
              <div className="text-red-500 font-mono mb-2">
                PROJECT ID: {project.name.toUpperCase()}
              </div>
              <div className="text-red-300 font-mono text-sm mb-4">
                CLASSIFICATION: {project.description}
              </div>
              
              <div className="mb-4">
                <div className="text-red-500 font-mono mb-2">TECH STACK:</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="bg-red-900 text-red-300 px-2 py-1 text-xs font-mono border border-red-500">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-red-300 font-mono text-sm mb-6">
                IMPACT: {project.impact}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div className="text-red-500 font-mono mb-4 text-center">
                SELECT YOUR INFILTRATION METHOD:
              </div>
              
              <button
                onClick={() => handleOptionSelect('github')}
                className="w-full bg-black border border-red-500 text-red-500 p-4 font-mono hover:bg-red-900 hover:text-red-300 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-left">
                      <div className="font-bold">[1] BREACH SOURCE CODE REPOSITORY</div>
                      <div className="text-sm opacity-75">Access classified GitHub vault</div>
                    </div>
                  </div>
                  <div className="text-2xl">{'>'}</div>
                </div>
              </button>
              
              <button
                onClick={() => handleOptionSelect('demo')}
                className="w-full bg-black border border-red-500 text-red-500 p-4 font-mono hover:bg-red-900 hover:text-red-300 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-left">
                      <div className="font-bold">[2] INFILTRATE LIVE DEPLOYMENT</div>
                      <div className="text-sm opacity-75">Access operational system</div>
                    </div>
                  </div>
                  <div className="text-2xl">{'>'}</div>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center text-red-500 font-mono text-sm opacity-75">
              WARNING: All activities are monitored and logged
            </div>
          </>
        ) : (
          <div className="text-center">
            <pre className="text-red-500 text-xs mb-6 opacity-50">{SKULL_ASCII}</pre>
            
            <div className="text-red-500 font-mono mb-6">
              INITIATING {selectedOption === 'github' ? 'REPOSITORY' : 'DEPLOYMENT'} BREACH...
            </div>
            
            <div className="space-y-4">
              {hackingSteps.map((step, i) => (
                <div key={i} className={`font-mono text-sm ${i <= currentStep ? 'text-red-500' : 'text-gray-600'}`}>
                  {i < currentStep ? '✓' : i === currentStep ? '>' : '○'} {step}
                  {i === currentStep && (
                    <div className="w-full bg-gray-800 border border-red-500 mt-2">
                      <div className="bg-red-500 h-2 animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {currentStep >= hackingSteps.length - 1 && (
              <div className="mt-6 text-red-500 font-mono animate-pulse">
                REDIRECTING TO SECURE CHANNEL...
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-center text-red-500 font-mono text-xs opacity-50">
          REMEMBER: MESS WITH THE BEST, DIE LIKE THE REST
        </div>
      </div>
    </div>
  );
};

  ProjectHackerModal = ({ project, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isHacking, setIsHacking] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const SKULL_ASCII = `
    ⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⣠⣶⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀
    ⠀⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀
    ⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷
    ⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`;

  const hackingSteps = [
    'SCANNING PROJECT ARCHITECTURE...',
    'BYPASSING REPOSITORY SECURITY...',
    'DECRYPTING SOURCE CODE...',
    'ANALYZING DEPLOYMENT PROTOCOLS...',
    'ESTABLISHING SECURE CONNECTION...',
    'ACCESS GRANTED - WELCOME TO THE MATRIX'
  ];

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
    
    // Simulate opening the link
    setTimeout(() => {
      if (option === 'github') {
        // Replace with actual GitHub URL
        window.open(`https://github.com/yourusername/${project.name.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
      } else if (option === 'demo') {
        // Replace with actual demo URL
        window.open(`https://your-demo-site.com/${project.name.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
      }
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-red-500 rounded-lg p-6 max-w-2xl w-full max-h-screen overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-300 text-xl font-bold"
        >
          ×
        </button>

        {/* Terminal-style header */}
        <div className="border-b border-red-500 pb-4 mb-6">
          <div className="flex items-center mb-2">
            <span className="text-red-500 mr-2">{'>'}</span>
            <span className="text-red-300 font-mono">ACCESSING PROJECT DATABASE...</span>
          </div>
          <div className="text-red-500 font-mono text-sm animate-pulse">
            [██████████] 100% Complete
          </div>
        </div>

        {!isHacking ? (
          <>
            {/* Project info */}
            <div className="mb-6">
              <pre className="text-red-500 text-xs mb-4 opacity-50">{SKULL_ASCII}</pre>
              
              <div className="text-red-500 font-mono mb-2">
                PROJECT ID: {project.name.toUpperCase()}
              </div>
              <div className="text-red-300 font-mono text-sm mb-4">
                CLASSIFICATION: {project.description}
              </div>
              
              <div className="mb-4">
                <div className="text-red-500 font-mono mb-2">TECH STACK:</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="bg-red-900 text-red-300 px-2 py-1 text-xs font-mono border border-red-500">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-red-300 font-mono text-sm mb-6">
                IMPACT: {project.impact}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div className="text-red-500 font-mono mb-4 text-center">
                SELECT YOUR INFILTRATION METHOD:
              </div>
              
              <button
                onClick={() => handleOptionSelect('github')}
                className="w-full bg-black border border-red-500 text-red-500 p-4 font-mono hover:bg-red-900 hover:text-red-300 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-left">
                      <div className="font-bold">[1] BREACH SOURCE CODE REPOSITORY</div>
                      <div className="text-sm opacity-75">Access classified GitHub vault</div>
                    </div>
                  </div>
                  <div className="text-2xl">{'>'}</div>
                </div>
              </button>
              
              <button
                onClick={() => handleOptionSelect('demo')}
                className="w-full bg-black border border-red-500 text-red-500 p-4 font-mono hover:bg-red-900 hover:text-red-300 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-left">
                      <div className="font-bold">[2] INFILTRATE LIVE DEPLOYMENT</div>
                      <div className="text-sm opacity-75">Access operational system</div>
                    </div>
                  </div>
                  <div className="text-2xl">{'>'}</div>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center text-red-500 font-mono text-sm opacity-75">
              WARNING: All activities are monitored and logged
            </div>
          </>
        ) : (
          <div className="text-center">
            <pre className="text-red-500 text-xs mb-6 opacity-50">{SKULL_ASCII}</pre>
            
            <div className="text-red-500 font-mono mb-6">
              INITIATING {selectedOption === 'github' ? 'REPOSITORY' : 'DEPLOYMENT'} BREACH...
            </div>
            
            <div className="space-y-4">
              {hackingSteps.map((step, i) => (
                <div key={i} className={`font-mono text-sm ${i <= currentStep ? 'text-red-500' : 'text-gray-600'}`}>
                  {i < currentStep ? '✓' : i === currentStep ? '>' : '○'} {step}
                  {i === currentStep && (
                    <div className="w-full bg-gray-800 border border-red-500 mt-2">
                      <div className="bg-red-500 h-2 animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {currentStep >= hackingSteps.length - 1 && (
              <div className="mt-6 text-red-500 font-mono animate-pulse">
                REDIRECTING TO SECURE CHANNEL...
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-center text-red-500 font-mono text-xs opacity-50">
          REMEMBER: MESS WITH THE BEST, DIE LIKE THE REST
        </div>
      </div>
    </div>
  );
};

// Updated Projects Component with Modal Integration
const ProjectsWindow = ({ projects, onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40 p-4">
        <div className="bg-black border-2 border-red-500 rounded-lg p-6 max-w-4xl w-full max-h-screen overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b border-red-500 pb-4">
            <h2 className="text-2xl font-mono text-red-500">CLASSIFIED PROJECT DATABASE</h2>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-300 text-xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, i) => (
              <div
                key={i}
                onClick={() => handleProjectClick(project)}
                className="bg-black border border-red-500 p-4 rounded cursor-pointer hover:bg-red-900 hover:border-red-300 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center mb-2">
                  <span className="text-red-500 mr-2">{'>'}</span>
                  <h3 className="text-red-300 font-mono font-bold">{project.name}</h3>
                </div>
                
                <p className="text-red-500 font-mono text-sm mb-3">{project.description}</p>
                
                <div className="mb-3">
                  <div className="text-red-500 font-mono text-xs mb-1">TECH STACK:</div>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, j) => (
                      <span key={j} className="bg-red-900 text-red-300 px-2 py-1 text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-red-300 font-mono text-xs opacity-75">
                  IMPACT: {project.impact}
                </div>
                
                <div className="text-red-500 font-mono text-xs mt-2 opacity-50">
                  CLICK TO INFILTRATE →
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-red-500 font-mono text-xs opacity-50">
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

// Demo Component
const App = () => {
  const [showProjects, setShowProjects] = useState(false);

  const sampleProjects = [
    {
      name: "CatchPhish",
      description: "Real-time phishing detection platform that flags suspicious URLs using machine learning and WHOIS data.",
      tech: ["React", "Node.js", "Firebase", "ML", "Phishing Detection"],
      impact: "Flagged 500+ phishing attempts in simulated environments; selected for Union Bank Hackathon."
    },
    {
      name: "Web Application Firewall (WAF)",
      description: "AI-enhanced firewall for detecting and blocking malicious web traffic with real-time log monitoring.",
      tech: ["Node.js", "Express", "React", "MySQL", "MongoDB", "Cybersecurity"],
      impact: "Built a custom hybrid WAF with live dashboard; future-ready for CatchPhish integration."
    },
    {
      name: "FloodReaper",
      description: "A powerful network stress-testing and DDoS simulation tool with IP hopping via Tor integration.",
      tech: ["Python", "RustScan", "Tor Browser", "Network Testing"],
      impact: "Simulated high-intensity DDoS scenarios in lab; used for resilience benchmarking."
    }
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="text-center">
        <h1 className="text-4xl font-mono text-red-500 mb-8">CYBERSEC PORTFOLIO</h1>
        <button
          onClick={() => setShowProjects(true)}
          className="bg-black border border-red-500 text-red-500 px-6 py-3 font-mono hover:bg-red-900 hover:text-red-300 transition-all duration-300"
        >
          ACCESS PROJECT DATABASE
        </button>
      </div>

      {showProjects && (
        <ProjectsWindow
          projects={sampleProjects}
          onClose={() => setShowProjects(false)}
        />
      )}
    </div>
  );
};
export { ProjectHackerModal, ProjectsWindow };
export default App;