import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('viewport-checker-language', lng);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage('en')}
        className={i18n.language === 'en' ? 'active' : ''}
        title="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('ru')}
        className={i18n.language === 'ru' ? 'active' : ''}
        title="Переключить на русский"
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;