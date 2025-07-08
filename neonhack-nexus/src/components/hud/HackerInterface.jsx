import React, { useState, useEffect } from 'react';
import './HackerInterface.scss';

const NetworkActivity = () => {
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    const protocols = ['TCP', 'UDP', 'HTTPS', 'SSH', 'FTP'];
    const operations = ['incoming', 'outgoing'];
    const ports = Array.from({ length: 20 }, () => Math.floor(Math.random() * 9999));
    
    const generateActivity = () => {
      const newActivity = `${protocols[Math.floor(Math.random() * protocols.length)]}${ports[Math.floor(Math.random() * ports.length)]}k${operations[Math.floor(Math.random() * operations.length)]}`;
      
      setActivities(prev => {
        const updated = [newActivity, ...prev];
        return updated.slice(0, 15); // Keep only last 15 activities
      });
    };
    
    const interval = setInterval(generateActivity, 800);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="network-activity">
      <div className="section-header">NETWORK ACTIVITY</div>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">{activity}</div>
        ))}
      </div>
    </div>
  );
};

const SecurityStatus = () => {
  const [threatLevel, setThreatLevel] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatLevel(prev => (prev + Math.random() * 2) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="security-status">
      <div className="section-header">SECURITY STATUS</div>
      <div className="status-item">FIREWALL: ACTIVE</div>
      <div className="status-item">ENCRYPTION: QUANTUM</div>
      <div className="status-item">THREAT LEVEL: {threatLevel.toFixed(2)}%</div>
    </div>
  );
};

const SystemStatus = () => {
  return (
    <div className="system-status">
      <div className="section-header">SYSTEM STATUS</div>
      <div className="status-line">NEURAL INTERFACE: ACTIVE</div>
      <div className="status-line">QUANTUM ENCRYPTION: ENABLED</div>
      <div className="status-line">AI DEFENSE SYSTEM: MONITORING</div>
    </div>
  );
};

const GridOverlay = () => {
  return <div className="grid-overlay" />;
};

const RadarCircles = () => {
  return (
    <div className="radar-circles">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="radar-circle" style={{ 
          width: `${(i + 1) * 25}%`, 
          height: `${(i + 1) * 25}%` 
        }} />
      ))}
    </div>
  );
};

const HackerInterface = () => {
  return (
    <div className="hacker-interface">
      <GridOverlay />
      <RadarCircles />
      <div className="interface-content">
        <div className="left-panel">
          <SecurityStatus />
          <NetworkActivity />
        </div>
        <div className="right-panel">
          <SystemStatus />
        </div>
      </div>
    </div>
  );
};

export default HackerInterface; 