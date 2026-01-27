import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewportData, ThresholdSettings, HistoryItem } from '../types/viewport';

const ViewportChecker: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [viewport, setViewport] = useState<ViewportData>({
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
    timestamp: new Date().toLocaleString()
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
      devicePixelRatio: window.devicePixelRatio,
      orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
      timestamp: new Date().toLocaleString()
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
      item.timestamp,
      item.width,
      item.height,
      item.devicePixelRatio,
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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{t('viewportChecker')}</h1>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
          <h2>{t('viewportInfo')}</h2>
          <div style={{ marginBottom: '15px' }}>
            <p><strong>{t('width')}:</strong> {viewport.width}px</p>
            <p><strong>{t('height')}:</strong> {viewport.height}px</p>
            <p><strong>{t('devicePixelRatio')}:</strong> {viewport.devicePixelRatio}</p>
            <p><strong>{t('orientation')}:</strong> {t(viewport.orientation)}</p>
            <p><strong>{t('timestamp')}:</strong> {viewport.timestamp}</p>
          </div>
          
          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <strong>Статус:</strong> {checkViewportStatus()}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button 
              onClick={() => {
                const data = checkViewport();
                addToHistory(data);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {t('checkViewport')}
            </button>
            <button 
              onClick={() => addToHistory(viewport)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {t('addToHistory')}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={exportAsJSON}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {t('exportAsJSON')}
            </button>
            <button 
              onClick={exportAsCSV}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {t('exportAsCSV')}
            </button>
          </div>
        </div>

        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
          <h2>{t('thresholdSettings')}</h2>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>{t('minWidth')}:</label>
              <input
                type="number"
                value={thresholdInput.minWidth}
                onChange={(e) => setThresholdInput(prev => ({ ...prev, minWidth: parseInt(e.target.value) || 0 }))}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>{t('maxWidth')}:</label>
              <input
                type="number"
                value={thresholdInput.maxWidth}
                onChange={(e) => setThresholdInput(prev => ({ ...prev, maxWidth: parseInt(e.target.value) || 0 }))}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>{t('minHeight')}:</label>
              <input
                type="number"
                value={thresholdInput.minHeight}
                onChange={(e) => setThresholdInput(prev => ({ ...prev, minHeight: parseInt(e.target.value) || 0 }))}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>{t('maxHeight')}:</label>
              <input
                type="number"
                value={thresholdInput.maxHeight}
                onChange={(e) => setThresholdInput(prev => ({ ...prev, maxHeight: parseInt(e.target.value) || 0 }))}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <button 
              onClick={saveThresholds}
              style={{
                padding: '10px 20px',
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',