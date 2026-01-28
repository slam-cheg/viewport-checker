import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">{t('title')}</h1>
      </header>
      <main className="App-main">
        <section className="content-section">
          <h2>{t('content.exampleSection')}</h2>
          <p>{t('content.exampleText')}</p>
          <ul className="content-list">
            {Array.from({ length: 20 }, (_, i) => (
              <li key={i}>{t('content.listItem', { number: i + 1 })}</li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="App-footer">
        <p>{t('footer.text')}</p>
      </footer>
    </div>
  );
}

export default App;

/* FILE: src/App.css */
.App {
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
}

.App-title {
  font-size: 1.5rem;
  margin: 0;
}

.App-main {
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 140px);
  padding: 20px;
  background-color: #f5f5f5;
}

.content-section {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content-section h2 {
  color: #333;
  margin-bottom: 20px;
}

.content-section p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.content-list {
  list-style-type: none;
  padding: 0;
  text-align: left;
}

.content-list li {
  padding: 10px 15px;
  margin: 5px 0;
  background-color: #f8f9fa;
  border-left: 4px solid #007bff;
  border-radius: 4px;
}

.App-footer {
  background-color: #282c34;
  padding: 15px;
  color: white;
  font-size: 0.9rem;
}

.App-footer p {
  margin: 0;
}