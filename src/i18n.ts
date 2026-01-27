import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      "viewportChecker": "Проверка Viewport",
      "currentViewport": "Текущий Viewport",
      "width": "Ширина",
      "height": "Высота",
      "devicePixelRatio": "Пиксельное соотношение",
      "orientation": "Ориентация",
      "portrait": "Портретная",
      "landscape": "Альбомная",
      "checkViewport": "Проверить Viewport",
      "history": "История проверок",
      "exportResults": "Экспорт результатов",
      "clearHistory": "Очистить историю",
      "thresholdSettings": "Настройки порогов",
      "minWidth": "Минимальная ширина",
      "maxWidth": "Максимальная ширина",
      "minHeight": "Минимальная высота",
      "maxHeight": "Максимальная высота",
      "saveThresholds": "Сохранить пороги",
      "thresholdsSaved": "Пороги сохранены",
      "viewportInfo": "Информация о Viewport",
      "checkHistory": "История проверок",
      "noHistory": "История проверок пуста",
      "timestamp": "Время",
      "exportAsJSON": "Экспорт как JSON",
      "exportAsCSV": "Экспорт как CSV",
      "exportSuccess": "Данные успешно экспортированы",
      "viewportBelowMin": "Viewport ниже минимальных значений",
      "viewportAboveMax": "Viewport выше максимальных значений",
      "viewportWithinRange": "Viewport в допустимом диапазоне",
      "addToHistory": "Добавить в историю",
      "removeFromHistory": "Удалить из истории",
      "language": "Язык",
      "russian": "Русский",
      "english": "Английский"
    }
  },
  en: {
    translation: {
      "viewportChecker": "Viewport Checker",
      "currentViewport": "Current Viewport",
      "width": "Width",
      "height": "Height",
      "devicePixelRatio": "Device Pixel Ratio",
      "orientation": "Orientation",
      "portrait": "Portrait",
      "landscape": "Landscape",
      "checkViewport": "Check Viewport",
      "history": "Check History",
      "exportResults": "Export Results",
      "clearHistory": "Clear History",
      "thresholdSettings": "Threshold Settings",
      "minWidth": "Minimum Width",
      "maxWidth": "Maximum Width",
      "minHeight": "Minimum Height",
      "maxHeight": "Maximum Height",
      "saveThresholds": "Save Thresholds",
      "thresholdsSaved": "Thresholds saved",
      "viewportInfo": "Viewport Information",
      "checkHistory": "Check History",
      "noHistory": "No check history",
      "timestamp": "Timestamp",
      "exportAsJSON": "Export as JSON",
      "exportAsCSV": "Export as CSV",
      "exportSuccess": "Data exported successfully",
      "viewportBelowMin": "Viewport below minimum values",
      "viewportAboveMax": "Viewport above maximum values",
      "viewportWithinRange": "Viewport within acceptable range",
      "addToHistory": "Add to History",
      "removeFromHistory": "Remove from History",
      "language": "Language",
      "russian": "Russian",
      "english": "English"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;