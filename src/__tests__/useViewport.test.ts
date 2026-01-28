import { renderHook, act } from '@testing-library/react';
import { useViewport } from '../hooks/useViewport';

describe('useViewport', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('initial viewport values are correct', () => {
    const { result } = renderHook(() => useViewport());
    
    expect(result.current.viewport.width).toBe(window.innerWidth);
    expect(result.current.viewport.height).toBe(window.innerHeight);
    expect(result.current.viewport.pixelDensity).toBe(window.devicePixelRatio);
    expect(result.current.history).toHaveLength(1);
    expect(result.current.devices).toHaveLength(8);
  });

  test('clearHistory removes all history', () => {
    const { result } = renderHook(() => useViewport());
    
    act(() => {
      result.current.clearHistory();
    });
    
    expect(result.current.history).toHaveLength(0);
    expect(localStorage.getItem('viewport-history')).toBeNull();
  });

  test('generateReport returns valid JSON', () => {
    const { result } = renderHook(() => useViewport());
    
    const report = result.current.generateReport();
    const parsedReport = JSON.parse(report);
    
    expect(parsedReport).toHaveProperty('title');
    expect(parsedReport).toHaveProperty('currentViewport');
    expect(parsedReport).toHaveProperty('history');
    expect(parsedReport).toHaveProperty('userAgent');
    expect(parsedReport).toHaveProperty('devicePresets');
  });
});