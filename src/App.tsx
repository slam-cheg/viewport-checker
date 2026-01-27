import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface ViewportInfo {
  width: number;
  height: number;
  pixelRatio: number;
  orientation: string;
  colorDepth: number;
  viewportHeight: number;
  viewportWidth: number;
  deviceType: string;
  breakpoint: string;
}

const App: React.FC = () => {
  const [viewportInfo, setViewportInfo] = useState<ViewportInfo>({
    width: 0,
    height: 0,
    pixelRatio: 1,
    orientation: 'portrait',
    colorDepth: 24,
    viewportHeight: 0,
    viewportWidth: 0,
    deviceType: 'desktop',
    breakpoint: 'xl'
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  };

  const getBreakpoint = (width: number): string => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  const getDeviceType = (width: number): string => {
    if (width >= 1024) return 'desktop';
    if (width >= 768) return 'tablet';
    return 'mobile';
  };

  const updateViewportInfo = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio;
    const orientation = width > height ? 'landscape' : 'portrait';
    const colorDepth = window.screen.colorDepth;
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const breakpoint = getBreakpoint(width);
    const deviceType = getDeviceType(width);

    setViewportInfo({
      width,
      height,
      pixelRatio,
      orientation,
      colorDepth,
      viewportHeight,
      viewportWidth,
      deviceType,
      breakpoint
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    updateViewportInfo();
    window.addEventListener('resize', updateViewportInfo);
    window.addEventListener('orientationchange', updateViewportInfo);

    return () => {
      window.removeEventListener('resize', updateViewportInfo);
      window.removeEventListener('orientationchange', updateViewportInfo);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const infoCards = [
    {
      title: 'Screen Dimensions',
      value: `${viewportInfo.width} × ${viewportInfo.height}px`,
      description: 'Total screen size in pixels',
      icon: '📐',
      field: 'dimensions'
    },
    {
      title: 'Viewport Size',
      value: `${viewportInfo.viewportWidth} × ${viewportInfo.viewportHeight}px`,
      description: 'Available viewport area',
      icon: '🔍',
      field: 'viewport'
    },
    {
      title: 'Device Pixel Ratio',
      value: viewportInfo.pixelRatio.toFixed(2),
      description: 'Ratio of physical to CSS pixels',
      icon: '⚡',
      field: 'pixelRatio'
    },
    {
      title: 'Orientation',
      value: viewportInfo.orientation,
      description: 'Current screen orientation',
      icon: '🔄',
      field: 'orientation'
    },
    {
      title: 'Color Depth',
      value: `${viewportInfo.colorDepth}-bit`,
      description: 'Number of bits per color component',
      icon: '🎨',
      field: 'colorDepth'
    },
    {
      title: 'Current Breakpoint',
      value: viewportInfo.breakpoint.toUpperCase(),
      description: 'Active responsive breakpoint',
      icon: '📱',
      field: 'breakpoint'
    },
    {
      title: 'Device Type',
      value: viewportInfo.deviceType,
      description: 'Detected device category',
      icon: '💻',
      field: 'deviceType'
    }
  ];

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`} ref={containerRef}>
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">👁️</div>
            <h1>Viewport Inspector</h1>
            <span className="version">v0.1.0</span>
          </div>
          <div className="header-controls">
            <button 
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <a 
              href="https://github.com/slam-cheg/viewport-checker" 
              className="github-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
            >
              <svg className="github-icon" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
        <p className="app-subtitle">
          Real-time viewport analysis tool for responsive web development
        </p>
      </header>

      <main className="app-main">
        <div className="viewport-visualization">
          <div className="visualization-header">
            <h2>Viewport Visualization</h2>
            <div className="visualization-stats">
              <span className="stat-badge device">{viewportInfo.deviceType}</span>
              <span className="stat-badge orientation">{viewportInfo.orientation}</span>
              <span className="stat-badge breakpoint">{viewportInfo.breakpoint}</span>
            </div>
          </div>
          
          <div className="viewport-display">
            <div className="viewport-frame">
              <div 
                className="viewport-content"
                style={{
                  width: `${Math.min(viewportInfo.width, 400)}px`,
                  height: `${Math.min(viewportInfo.height, 300)}px`
                }}
              >
                <div className="viewport-grid">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="grid-column"></div>
                  ))}
                </div>
                <div className="viewport-dimensions">
                  <span className="dimension-width">{viewportInfo.width}px</span>
                  <span className="dimension-height">{viewportInfo.height}px</span>
                </div>
              </div>
            </div>
            
            <div className="viewport-controls">
              <div className="control-group">
                <label>Zoom:</label>
                <div className="zoom-controls">
                  <button className="zoom-btn" onClick={() => containerRef.current?.style.setProperty('--zoom', '0.8')}>-</button>
                  <span className="zoom-value">100%</span>
                  <button className="zoom-btn" onClick={() => containerRef.current?.style.setProperty('--zoom', '1.2')}>+</button>
                </div>
              </div>
              <button 
                className="refresh-btn"
                onClick={updateViewportInfo}
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="info-grid">
          {infoCards.map((card) => (
            <div 
              key={card.field} 
              className={`info-card ${copiedField === card.field ? 'copied' : ''}`}
              onClick={() => copyToClipboard(card.value, card.field)}
            >
              <div className="card-header">
                <span className="card-icon">{card.icon}</span>
                <h3>{card.title}</h3>
                <button 
                  className="copy-btn"
                  aria-label={`Copy ${card.title}`}
                >
                  {copiedField === card.field ? '✓' : '📋'}
                </button>
              </div>
              <div className="card-content">
                <p className="card-value">{card.value}</p>
                <p className="card-description">{card.description}</p>
              </div>
              <div className="copy-hint">Click to copy</div>
            </div>
          ))}
        </div>

        <div className="breakpoints-section">
          <h2>Responsive Breakpoints</h2>
          <div className="breakpoints-visual">
            <div className="breakpoints-track">
              {Object.entries(breakpoints).map(([name, value]) => (
                <div 
                  key={name}
                  className={`breakpoint-marker ${viewportInfo.breakpoint === name ? 'active' : ''}`}
                  style={{ left: `${(value / 1600) * 100}%` }}
                >
                  <div className="marker-line"></div>
                  <div className="marker-label">
                    <span className="breakpoint-name">{name}</span>
                    <span className="breakpoint-value">{value}px</span>
                  </div>
                </div>
              ))}
              <div 
                className="current-position"
                style={{ left: `${(viewportInfo.width / 1600) * 100}%` }}
              >
                <div className="position-indicator"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>Viewport Checker • Real-time responsive design tool</p>
            <p className="footer-links">
              <a href="https://github.com/slam-cheg/viewport-checker/issues" target="_blank" rel="noopener noreferrer">Report Issue</a>
              •
              <a href="https://github.com/slam-cheg/viewport-checker" target="_blank" rel="noopener noreferrer">Source Code</a>
              •
              <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer">GitHub Pages</a>
            </p>
          </div>
          <div className="footer-deploy">
            <span className="deploy-status">🚀 Deployed on GitHub Pages</span>
            <span className="deploy-url">
              <a href="https://slam-cheg.github.io/viewport-checker" target="_blank" rel="noopener noreferrer">
                slam-cheg.github.io/viewport-checker
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;