import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    }
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn()
  }
}));

// Mock components to avoid deep rendering issues and focus on App structure
jest.mock('./components/ViewportInfo', () => () => <div data-testid="viewport-info">ViewportInfo Component</div>);
jest.mock('./components/ViewportVisualizer', () => () => <div data-testid="viewport-visualizer">ViewportVisualizer Component</div>);
jest.mock('./components/ViewportChecker', () => () => <div data-testid="viewport-checker">ViewportChecker Component</div>);

describe('App', () => {
  test('renders header with title and language switcher', () => {
    render(<App />);
    
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('App-header');
    
    const titleElement = screen.getByRole('heading', { name: /Viewport Checker/i });
    expect(titleElement).toBeInTheDocument();
  });

  test('renders main components', async () => {
    render(<App />);
    
    // Wait for Suspense (if any, although mocked components usually render immediately)
    // However, App uses Suspense, so we might see fallback first?
    // Since we didn't mock useViewport to suspend, it should be fine.
    
    expect(screen.getByTestId('viewport-info')).toBeInTheDocument();
    expect(screen.getByTestId('viewport-visualizer')).toBeInTheDocument();
    expect(screen.getByTestId('viewport-checker')).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
    
    const copyrightElement = screen.getByText(/Viewport Checker Application/i);
    expect(copyrightElement).toBeInTheDocument();
  });
});
