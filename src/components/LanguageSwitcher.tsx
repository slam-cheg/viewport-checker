import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Note: localStorage update is handled by i18next-browser-languagedetector automatically
    // via caches: ['localStorage'] in i18n config, but we can explicitly set it if needed.
    // The detector will update 'viewport-checker-language' key as configured.
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage('en')}
        className={i18n.language === 'en' || i18n.language.startsWith('en-') ? 'active' : ''}
        title="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('ru')}
        className={i18n.language === 'ru' || i18n.language.startsWith('ru-') ? 'active' : ''}
        title="Переключить на русский"
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;
