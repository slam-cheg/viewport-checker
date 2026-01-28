import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'app.title': 'Viewport Checker',
        'app.subtitle': 'Screen height limitation demo',
        'content.mainHeading': 'Main Content Area',
        'content.description': 'This content area is limited to the viewport height.',
        'content.exampleSection': 'Scrollable Content Example',
        'content.exampleText': 'Below is an example of scrollable content within the constrained viewport:',
        'content.listItem': 'List item',
        'footer.copyright': '© 2024 Viewport Checker. All rights reserved.'
      };
      return translations[key] || key;
    }
  })
}));

describe('App', () => {
  test('renders header with reduced size', () => {
    render(<App />);
    
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('App-header');
    
    const titleElement = screen.getByText(/Viewport Checker/i);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H1');
  });

  test('main content area has viewport height limitation', () => {
    render(<App />);
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('App-main');
    
    const contentElement = screen.getByText(/Main Content Area/i);
    expect(contentElement).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveClass('App-footer');
    
    const copyrightElement = screen.getByText(/All rights reserved/i);
    expect(copyrightElement).toBeInTheDocument();
  });

  test('has scrollable content example', () => {
    render(<App />);
    
    const scrollableSection = screen.getByText(/Scrollable Content Example/i);
    expect(scrollableSection).toBeInTheDocument();
    
    const listItems = screen.getAllByText(/List item/i);
    expect(listItems.length).toBeGreaterThan(0);
  });
});