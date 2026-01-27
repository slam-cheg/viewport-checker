export interface ViewportData {
  width: number;
  height: number;
  devicePixelRatio: number;
  orientation: 'portrait' | 'landscape';
  timestamp: string;
}

export interface ThresholdSettings {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}

export interface HistoryItem extends ViewportData {
  id: string;
}