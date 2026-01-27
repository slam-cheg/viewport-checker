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