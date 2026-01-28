import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import ViewportInfo from '../components/ViewportInfo';
import { ViewportData } from '../types/viewport';

// Initialize i18n with resources for testing
i18n.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        'viewport.width': 'Width',
        'viewport.height': 'Height',
        'viewport.aspectRatio': 'Aspect Ratio',
        'viewport.pixelDensity': 'Pixel Density',
        'viewport.orientation': 'Orientation',
        'viewport.landscape': 'Landscape',
        'app.title': 'Viewport Info'
      }
    },
    ru: {
      translation: {
        'viewport.width': 'Ширина',
        'viewport.height': 'Высота',
        'viewport.aspectRatio': 'Соотношение сторон',
        'viewport.orientation': 'Ориентация',
        'viewport.landscape': 'Альбомная'
      }
    }
  }
});

const mockViewport: ViewportData = {
  width: 1920,
  height: 1080,
  aspectRatio: 1.78,
  pixelDensity: 1,
  orientation: 'landscape',
  timestamp: Date.now(),
};

describe('ViewportInfo', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  test('renders viewport information correctly', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ViewportInfo viewport={mockViewport} />
      </I18nextProvider>
    );

    expect(screen.getByText('Width:')).toBeInTheDocument();
    expect(screen.getByText('1920px')).toBeInTheDocument();
    expect(screen.getByText('Height:')).toBeInTheDocument();
    expect(screen.getByText('1080px')).toBeInTheDocument();
    expect(screen.getByText('Aspect Ratio:')).toBeInTheDocument();
    expect(screen.getByText('1.78')).toBeInTheDocument();
    expect(screen.getByText('Orientation:')).toBeInTheDocument();
    expect(screen.getByText('Landscape')).toBeInTheDocument();
  });

  test('renders in Russian correctly', () => {
    i18n.changeLanguage('ru');
    
    render(
      <I18nextProvider i18n={i18n}>
        <ViewportInfo viewport={mockViewport} />
      </I18nextProvider>
    );

    expect(screen.getByText('Ширина:')).toBeInTheDocument();
    expect(screen.getByText('1920px')).toBeInTheDocument();
    expect(screen.getByText('Высота:')).toBeInTheDocument();
    expect(screen.getByText('1080px')).toBeInTheDocument();
    expect(screen.getByText('Соотношение сторон:')).toBeInTheDocument();
    expect(screen.getByText('1.78')).toBeInTheDocument();
    expect(screen.getByText('Ориентация:')).toBeInTheDocument();
    expect(screen.getByText('Альбомная')).toBeInTheDocument();
  });
});
