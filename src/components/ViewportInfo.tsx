import React from 'react';
import { useTranslation } from 'react-i18next';
import { ViewportData } from '../types/viewport';

interface ViewportInfoProps {
  viewport: ViewportData;
}

const ViewportInfo: React.FC<ViewportInfoProps> = ({ viewport }) => {
  const { t } = useTranslation();

  const getOrientationText = (orientation: string) => {
    switch (orientation) {
      case 'portrait':
        return t('viewport.portrait');
      case 'landscape':
        return t('viewport.landscape');
      case 'square':
        return t('viewport.square');
      default:
        return orientation;
    }
  };

  return (
    <div className="viewport-info">
      <h3>{t('app.title')}</h3>
      <div className="info-grid">
        <div className="info-item">
          <span className="label">{t('viewport.width')}:</span>
          <span className="value">{viewport.width}px</span>
        </div>
        <div className="info-item">
          <span className="label">{t('viewport.height')}:</span>
          <span className="value">{viewport.height}px</span>
        </div>
        <div className="info-item">
          <span className="label">{t('viewport.aspectRatio')}:</span>
          <span className="value">{viewport.aspectRatio.toFixed(2)}</span>
        </div>
        <div className="info-item">
          <span className="label">{t('viewport.pixelDensity')}:</span>
          <span className="value">{viewport.pixelDensity.toFixed(1)}</span>
        </div>
        <div className="info-item">
          <span className="label">{t('viewport.orientation')}:</span>
          <span className="value">{getOrientationText(viewport.orientation)}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewportInfo;