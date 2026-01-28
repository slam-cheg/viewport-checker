import React, { Suspense } from 'react';
import './App.css';
import { useViewport } from './hooks/useViewport';
import ViewportInfo from './components/ViewportInfo';
import ViewportChecker from './components/ViewportChecker';
import ViewportVisualizer from './components/ViewportVisualizer';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const { viewport, history } = useViewport();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Viewport Checker</h1>
        <LanguageSwitcher />
      </header>
      <main className="App-main">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="components-container">
            <section className="component-section">
              <ViewportInfo viewport={viewport} />
            </section>
            
            <section className="component-section">
              <ViewportVisualizer viewport={viewport} history={history} />
            </section>
            
            <section className="component-section">
              <ViewportChecker />
            </section>
          </div>
        </Suspense>
      </main>
      <footer className="App-footer">
        <p>Viewport Checker Application &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
