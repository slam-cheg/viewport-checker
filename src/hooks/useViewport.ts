import { useState, useEffect, useCallback } from 'react';
import { ViewportData, HistoryEntry, DevicePreset } from '../types/viewport';

const DEVICE_PRESETS: DevicePreset[] = [
  { id: 'iphone13', name: 'iPhone 13', width: 390, height: 844, type: 'mobile' },
  { id: 'iphone13Pro', name: 'iPhone 13 Pro', width: 390, height: 844, type: 'mobile' },
  { id: 'iphoneSE', name: 'iPhone SE', width: 375, height: 667, type: 'mobile' },
  { id: 'ipadPro', name: 'iPad Pro', width: 1024, height: 1366, type: 'tablet' },
  { id: 'samsungGalaxy', name: 'Samsung Galaxy S21', width: 360, height: 800, type: 'mobile' },
  { id: 'desktopHD', name: 'Desktop HD', width: 1366, height: 768, type: 'desktop' },
  { id: 'desktopFullHD', name: 'Desktop Full HD', width: 1920, height: 1080, type: 'desktop' },
  { id: 'desktop4K', name: 'Desktop 4K', width: 3840, height: 2160, type: 'desktop' },
];

export const useViewport = () => {
  const [viewport, setViewport] = useState<ViewportData>({
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight,
    pixelDensity: window.devicePixelRatio,
    orientation: getOrientation(window.innerWidth, window.innerHeight),
    timestamp: Date.now(),
  });

  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem('viewport-history');
    return saved ? JSON.parse(saved) : [];
  });

  const updateViewport = useCallback(() => {
    const newViewport: ViewportData = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      pixelDensity: window.devicePixelRatio,
      orientation: getOrientation(window.innerWidth, window.innerHeight),
      timestamp: Date.now(),
    };

    setViewport(newViewport);

    const historyEntry: HistoryEntry = {
      ...newViewport,
      id: Date.now().toString(),
    };

    setHistory(prev => {
      const newHistory = [historyEntry, ...prev.slice(0, 49)];
      localStorage.setItem('viewport-history', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('viewport-history');
  }, []);

  const generateReport = useCallback((): string => {
    const report = {
      title: 'Viewport Report',
      generatedAt: new Date().toISOString(),
      currentViewport: viewport,
      history: history.slice(0, 10),
      userAgent: navigator.userAgent,
      devicePresets: DEVICE_PRESETS,
    };
    return JSON.stringify(report, null, 2);
  }, [viewport, history]);

  const downloadReport = useCallback(() => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viewport-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generateReport]);

  useEffect(() => {
    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, [updateViewport]);

  return {
    viewport,
    history,
    devices: DEVICE_PRESETS,
    clearHistory,
    downloadReport,
    generateReport,
  };
};

function getOrientation(width: number, height: number): 'portrait' | 'landscape' | 'square' {
  const ratio = width / height;
  if (Math.abs(ratio - 1) < 0.1) return 'square';
  return ratio > 1 ? 'landscape' : 'portrait';
}