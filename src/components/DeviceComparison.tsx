import React from 'react';
import { useTranslation } from 'react-i18next';
import { DevicePreset, ViewportData } from '../types/viewport';

interface DeviceComparisonProps {
  currentViewport: ViewportData;
  devices: DevicePreset[];
}

const DeviceComparison: React.FC<DeviceComparisonProps> = ({ currentViewport, devices }) => {
  const { t } = useTranslation();

  const getDeviceName = (deviceId: string) => {
    return t(`devices.${deviceId}`);
  };

  const calculateDifference = (device: DevicePreset) => {
    const widthDiff = Math.abs(currentViewport.width - device.width);
    const heightDiff = Math.abs(currentViewport.height - device.height);
    return Math.sqrt(widthDiff * widthDiff + heightDiff * heightDiff);
  };

  const sortedDevices = [...devices].sort((a, b) => calculateDifference(a) - calculateDifference(b));

  return (
    <div className="device-comparison">
      <h3>{t('devices.title')}</h3>
      <div className="device-list">
        {sortedDevices.map((device) => {
          const diff = calculateDifference(device);
          const similarity = Math.max(0, 100 - (diff / 100));
          
          return (
            <div key={device.id} className="device-item">
              <div className="device-name">{getDeviceName(device.id)}</div>
              <div className="device-resolution">
                {device.width} × {device.height}
              </div>
              <div className="device-type">{device.type}</div>
              <div className="device-similarity">
                <div className="similarity-bar" style={{ width: `${similarity}%` }} />
                <span>{similarity.toFixed(0)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceComparison;