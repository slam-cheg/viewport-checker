import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewportData, ThresholdSettings, HistoryItem } from '../types/viewport';

const ViewportChecker: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [viewport, setViewport] = useState<ViewportData>({
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight,
    pixelDensity: window.devicePixelRatio,
    orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
    timestamp: Date.now()
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('viewportHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [thresholds, setThresholds] = useState<ThresholdSettings>(() => {
    const saved = localStorage.getItem('viewportThresholds');
    return saved ? JSON.parse(saved) : {
      minWidth: 320,
      maxWidth: 1920,
      minHeight: 480,
      maxHeight: 1080
    };
  });

  const [thresholdInput, setThresholdInput] = useState<ThresholdSettings>(thresholds);

  const checkViewport = useCallback(() => {
    const newViewport: ViewportData = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      pixelDensity: window.devicePixelRatio,
      orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
      timestamp: Date.now()
    };
    setViewport(newViewport);
    return newViewport;
  }, []);

  const addToHistory = useCallback((data: ViewportData) => {
    const newItem: HistoryItem = {
      ...data,
      id: Date.now().toString()
    };
    const newHistory = [newItem, ...history.slice(0, 9)];
    setHistory(newHistory);
    localStorage.setItem('viewportHistory', JSON.stringify(newHistory));
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('viewportHistory');
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('viewportHistory', JSON.stringify(newHistory));
  }, [history]);

  const saveThresholds = useCallback(() => {
    setThresholds(thresholdInput);
    localStorage.setItem('viewportThresholds', JSON.stringify(thresholdInput));
    alert(t('thresholdsSaved'));
  }, [thresholdInput, t]);

  const exportAsJSON = useCallback(() => {
    const data = {
      currentViewport: viewport,
      history: history,
      thresholds: thresholds,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viewport-checker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(t('exportSuccess'));
  }, [viewport, history, thresholds, t]);

  const exportAsCSV = useCallback(() => {
    const headers = ['Timestamp', 'Width', 'Height', 'Device Pixel Ratio', 'Orientation'];
    const rows = history.map(item => [
      new Date(item.timestamp).toLocaleString(),
      item.width,
      item.height,
      item.pixelDensity,
      item.orientation
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viewport-history-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(t('exportSuccess'));
  }, [history, t]);

  const checkViewportStatus = useCallback(() => {
    const { width, height } = viewport;
    const { minWidth, maxWidth, minHeight, maxHeight } = thresholds;
    
    if (width < minWidth || height < minHeight) {
      return t('viewportBelowMin');
    } else if (width > maxWidth || height > maxHeight) {
      return t('viewportAboveMax');
    } else {
      return t('viewportWithinRange');
    }
  }, [viewport, thresholds, t]);

  useEffect(() => {
    const handleResize = () => {
      checkViewport();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkViewport]);

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  return (
    <div className="viewport-checker">
      <div className="checker-header">
        <h2>{t('viewportChecker')}</h2>
        <div>
          <select 
            value={i18n.language} 
            onChange={(e) => changeLanguage(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px' }}
          >
            <option value="ru">{t('russian')}</option>
            <option value="en">{t('english')}</option>
          </select>
        </div>
      </div>

      <div className="checker-grid">
        <div className="checker-card">
          <h3>{t('viewportInfo')}</h3>
          <div style={{ marginBottom: '15px' }}>
            <p className="checker-info-row"><strong>{t('width')}:</strong> {viewport.width}px</p>
            <p className="checker-info-row"><strong>{t('height')}:</strong> {viewport.height}px</p>
            <p className="checker-info-row"><strong>{t('devicePixelRatio')}:</strong> {viewport.pixelDensity}</p>
            <p className="checker-info-row"><strong>{t('orientation')}:</strong> {t(viewport.orientation)}</p>
            <p className="checker-info-row"><strong>{t('timestamp')}:</strong> {new Date(viewport.timestamp).toLocaleString()}</p>
          </div>
          
          <div className="checker-status">
            <strong>Статус:</strong> {checkViewportStatus()}
          </div>

          <div className="checker-controls">
            <button 
              className="btn btn-primary"
              onClick={() => {
                const data = checkViewport();
                addToHistory(data);
              }}
            >
              {t('checkViewport')}
            </button>
            <button 
              className="btn btn-success"
              onClick={() => addToHistory(viewport)}
            >
              {t('addToHistory')}
            </button>
          </div>

          <div className="checker-controls">
            <button 
              className="btn btn-secondary"
              onClick={exportAsJSON}
            >
              {t('exportAsJSON')}
            </button>
            <button 
              className="btn btn-secondary"
              onClick={exportAsCSV}
            >
              {t('exportAsCSV')}
            </button>
          </div>
        </div>

        <div className="checker-card">
          <h3>{t('thresholdSettings')}</h3>
          <div className="threshold-form">
            <div className="form-group">
              <label>{t('minWidth')}:</label>
              <input
                type="number"
                value={thresholdInput.minWidth}
                onChange={(e) => setThresholdInput(prev => ({ ...prev, minWidth: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="form-group">
              <label>{t('maxWidth')}:</label>
              <input
                type="number"
                value={thresholdInput.maxWidth}
                onChange={(e) => setThresholdInput(prev => ({ ...prev, maxWidth: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="form-group">
              <label>{t('minHeight')}:</label>
              <input
                type="number"
                value={thresholdInput.minHeight}
                onChange={(e) => setThresholdInput(prev => ({ ...prev, minHeight: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="form-group">
              <label>{t('maxHeight')}:</label>
              <input
                type="number"
                value={thresholdInput.maxHeight}
                onChange={(e) => setThresholdInput(prev => ({ ...prev, maxHeight: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <button 
              className="btn btn-info"
              onClick={saveThresholds}
            >
              {t('saveThresholds')}
            </button>
          </div>
        </div>

        <div className="checker-card" style={{ gridColumn: 'span 2' }}>
          <h3>{t('history')}</h3>
          {history.length === 0 ? (
            <p>{t('noHistory')}</p>
          ) : (
            <div>
              <button 
                className="btn btn-danger btn-sm"
                onClick={clearHistory}
                style={{ marginBottom: '15px' }}
              >
                {t('clearHistory')}
              </button>
              <div className="history-list">
                {history.map((item) => (
                  <div key={item.id} className="history-item">
                    <div className="history-details">
                      <p><strong>{t('timestamp')}:</strong> {new Date(item.timestamp).toLocaleString()}</p>
                      <p><strong>{t('width')}:</strong> {item.width}px, <strong>{t('height')}:</strong> {item.height}px</p>
                      <p><strong>{t('orientation')}:</strong> {t(item.orientation)}</p>
                    </div>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromHistory(item.id)}
                    >
                      {t('removeFromHistory')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewportChecker;
