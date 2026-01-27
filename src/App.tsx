import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useViewport } from './hooks/useViewport';
import ViewportInfo from './components/ViewportInfo';
import ViewportHistory from './components/ViewportHistory';
import DeviceComparison from './components/DeviceComparison';
import ViewportVisualizer from './components/ViewportVisualizer';
import LanguageSwitcher from './components/LanguageSwitcher';
import './App.css';

const App: React.FC = () => {
  const { t } = useTranslation();
  const {
    viewport,
    history,
    devices,
    clearHistory,
    downloadReport,
  } = useViewport();

  const [showHistory, setShowHistory] = useState(true);
  const [showDevices, setShowDevices] = useState(true);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>{t('app.title')}</h1>
          <p className="app-description">{t('app.description')}</p>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="app-main">
        <div className="controls">
          <button onClick={downloadReport} className="control-btn" title={t('actions.downloadReport')}>
            📥 {t('actions.downloadReport')}
          </button>
          <button onClick={() => setShowHistory(!showHistory)} className="control-btn" title={t('actions.toggleHistory')}>
            {showHistory ? '📕' : '📖'} {t('actions.toggleHistory')}
          </button>
          <button onClick={() => setShowDevices(!showDevices)} className="control-btn" title={t('actions.toggleDevices')}>
            {showDevices ? '📱' : '📲'} {t('actions.toggleDevices')}
          </button>
        </div>

        <div className="content-grid">
          <div className="main-section">
            <ViewportInfo viewport={viewport} />
            <ViewportVisualizer viewport={viewport} history={history} />
          </div>

          {showHistory && (
            <div className="sidebar-section">
              <ViewportHistory history={history} onClearHistory={clearHistory} />
            </div>
          )}

          {showDevices && (
            <div className="sidebar-section">
              <DeviceComparison currentViewport={viewport} devices={devices} />
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Viewport Checker v0.1.0</p>
        <p>Resize your browser window to see changes</p>
      </footer>
    </div>
  );
};

export default App;

/* FILE: src/App.css */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.app-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.app-description {
  margin: 0 0 1rem 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.language-switcher {
  display: inline-flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 8px;
}

.language-switcher button {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.language-switcher button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.language-switcher button.active {
  background: white;
  color: #667eea;
  border-color: white;
}

.app-main {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.control-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.control-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 2fr 1fr 1fr;
  }
}

.main-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.viewport-info {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.viewport-info h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.info-item .label {
  font-weight: 600;
  color: #555;
}

.info-item .value {
  font-weight: bold;
  color: #667eea;
}

.viewport-history {
  height: 100%;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.history-header h3 {
  margin: 0;
  color: #333;
}

.clear-btn {
  background: #e53e3e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.clear-btn:hover {
  background: #c53030;
}

.empty-history {
  text-align: center;
  color: #718096;
  font-style: italic;
  padding: 2rem;
}

.history-list {
  max-height: 400px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  transition: background 0.2s;
}

.history-item:hover {
  background: #edf2f7;
}

.history-time {
  font-size: 0.9rem;
  color: #718096;
}

.history-details {
  font-weight: 500;
  color: #2d3748;
}

.device-comparison h3 {
  margin-top: 0;
  color: #333;
  margin-bottom: 1rem;
}

.device-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.device-item {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.device-name {
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.device-resolution {
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 0.5rem;
}

.device-type {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #e2e8f0;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.device-similarity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.similarity-bar {
  height: 6px;
  background: linear-gradient(90deg, #48bb78, #38a169);
  border-radius: 3px;
  flex: 1;
}

.device-similarity span {
  font-size: 0.9rem;
  font-weight: bold;
  color: #2d3748;
  min-width: 40px;
}

.viewport-visualizer {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.viewport-visualizer h3 {
  margin-top: 0;
  color: #333;
  margin-bottom: 1rem;
}

.visualization-canvas {
  width: 100%;
  height: 300px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8f9fa;
}

.app-footer {
  background: #2d3748;
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
}

.app-footer p {
  margin: 0.25rem 0;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }
  
  .controls {
    flex-direction: column;
  }
  
  .control-btn {
    width: 100%;
    justify-content: center;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}