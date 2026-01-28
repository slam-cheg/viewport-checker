import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <h1>{t('app.title')}</h1>
        <p>{t('app.subtitle')}</p>
      </header>
      
      <main className="App-main">
        <div className="App-content">
          <h2>{t('content.mainHeading')}</h2>
          <p>{t('content.description')}</p>
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', maxWidth: '800px', width: '100%' }}>
            <h3>{t('content.exampleSection')}</h3>
            <p>{t('content.exampleText')}</p>
            <div style={{ height: '300px', overflow: 'auto', border: '1px solid #ddd', padding: '10px', marginTop: '10px' }}>
              {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  {t('content.listItem', { number: index + 1 })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="App-footer">
        <p>{t('footer.copyright')}</p>
      </footer>
    </div>
  );
}

export default App;