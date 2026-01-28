import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';

// Initialize i18n for testing to avoid backend issues
i18n.init({
  lng: 'en',
  resources: {
    en: { translation: {} },
    ru: { translation: {} }
  },
  interpolation: {
    escapeValue: false,
  },
  react: { 
    useSuspense: false // Disable suspense for tests
  }
});

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
    localStorage.clear();
  });

  test('renders language buttons', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('RU')).toBeInTheDocument();
  });

  test('switches language to Russian', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText('RU'));
    
    expect(i18n.language).toBe('ru');
    expect(localStorage.getItem('viewport-checker-language')).toBe('ru');
  });
});
