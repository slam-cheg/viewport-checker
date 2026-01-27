import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [viewportInfo, setViewportInfo] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    orientation: window.screen.orientation?.type || 'unknown',
    touchSupport: 'ontouchstart' in window,
  });

  const updateViewportInfo = useCallback(() => {
    setViewportInfo({
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      orientation: window.screen.orientation?.type || 'unknown',
      touchSupport: 'ontouchstart' in window,
    });
  }, []);

  useEffect(() => {
    updateViewportInfo();
    
    const handleResize = () => {
      updateViewportInfo();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [updateViewportInfo]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Viewport Checker</h1>
        <div className="viewport-info">
          <div className="info-item">
            <span className="label">Width:</span>
            <span className="value">{viewportInfo.width}px</span>
          </div>
          <div className="info-item">
            <span className="label">Height:</span>
            <span className="value">{viewportInfo.height}px</span>
          </div>
          <div className="info-item">
            <span className="label">Device Pixel Ratio:</span>
            <span className="value">{viewportInfo.devicePixelRatio}</span>
          </div>
          <div className="info-item">
            <span className="label">Orientation:</span>
            <span className="value">{viewportInfo.orientation}</span>
          </div>
          <div className="info-item">
            <span className="label">Touch Support:</span>
            <span className="value">{viewportInfo.touchSupport ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;