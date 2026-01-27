import React from 'react';
import { useTranslation } from 'react-i18next';
import { HistoryEntry } from '../types/viewport';

interface ViewportHistoryProps {
  history: HistoryEntry[];
  onClearHistory: () => void;
}

const ViewportHistory: React.FC<ViewportHistoryProps> = ({ history, onClearHistory }) => {
  const { t } = useTranslation();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="viewport-history">
      <div className="history-header">
        <h3>{t('history.title')}</h3>
        <button onClick={onClearHistory} className="clear-btn">
          {t('history.clear')}
        </button>
      </div>
      {history.length === 0 ? (
        <p className="empty-history">{t('history.empty')}</p>
      ) : (
        <div className="history-list">
          {history.map((entry) => (
            <div key={entry.id} className="history-item">
              <div className="history-time">{formatTime(entry.timestamp)}</div>
              <div className="history-details">
                {entry.width} × {entry.height} ({entry.orientation})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewportHistory;