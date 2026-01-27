export interface ViewportData {
  width: number;
  height: number;
  aspectRatio: number;
  pixelDensity: number;
  orientation: 'portrait' | 'landscape' | 'square';
  timestamp: number;
}

export interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  type: 'mobile' | 'tablet' | 'desktop';
}

export interface HistoryEntry extends ViewportData {
  id: string;
}

export interface ViewportReport {
  title: string;
  generatedAt: string;
  currentViewport: ViewportData;
  history: HistoryEntry[];
  userAgent: string;
  devicePresets: DevicePreset[];
}