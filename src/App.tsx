import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [isHeightLimited, setIsHeightLimited] = useState<boolean>(false);

  useEffect(() => {
    const updateViewportDimensions = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
      setIsHeightLimited(window.innerHeight < 500);
    };

    updateViewportDimensions();
    window.addEventListener('resize', updateViewportDimensions);
    window.addEventListener('orientationchange', updateViewportDimensions);

    return () => {
      window.removeEventListener('resize', updateViewportDimensions);
      window.removeEventListener('orientationchange', updateViewportDimensions);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Viewport Checker</h1>
        <p className="App-description">
          This application demonstrates viewport height limitation functionality.
          When the viewport height is less than 500px, content will be limited.
        </p>
      </header>

      <main className={`App-main ${isHeightLimited ? 'height-limited' : ''}`}>
        <div className="viewport-info">
          <h2>Current Viewport Dimensions</h2>
          <div className="dimensions">
            <div className="dimension">
              <span className="label">Height:</span>
              <span className={`value ${isHeightLimited ? 'warning' : ''}`}>
                {viewportHeight}px
                {isHeightLimited && <span className="warning-icon">⚠️</span>}
              </span>
            </div>
            <div className="dimension">
              <span className="label">Width:</span>
              <span className="value">{viewportWidth}px</span>
            </div>
          </div>
          
          <div className={`status ${isHeightLimited ? 'limited' : 'normal'}`}>
            {isHeightLimited 
              ? 'Viewport height is LIMITED (less than 500px)' 
              : 'Viewport height is NORMAL (500px or more)'}
          </div>
        </div>

        <div className="scroll-example">
          <h3>Scroll Example Section</h3>
          <p>This section demonstrates how content behaves when viewport height is limited.</p>
          <div className="scroll-content">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="scroll-item">
                Item {index + 1} - Scroll to see more content
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>Viewport Checker Application &copy; {new Date().getFullYear()}</p>
        <p className="footer-note">
          Resize your browser window to see how the viewport limitation works.
          Try making the window height less than 500px.
        </p>
      </footer>
    </div>
  );
}

export default App;