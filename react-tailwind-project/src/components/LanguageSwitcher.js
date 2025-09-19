import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Language switcher component using i18next
 */
const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = useCallback((language) => {
    console.log(`🌐 Changing language to: ${language}`);
    i18n.changeLanguage(language);
  }, [i18n]);

  const currentLanguage = i18n.language;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {t('i18n.title')}
      </h2>
      
      <p className="text-gray-600 mb-4">
        {t('i18n.description')}
      </p>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          {t('currentLanguage', { language: currentLanguage.toUpperCase() })}
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={() => changeLanguage('en')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentLanguage === 'en'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('es')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentLanguage === 'es'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Español
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">
          {t('i18n.features.languageDetection')}
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• {t('i18n.features.languageDetection')}</li>
          <li>• {t('i18n.features.fallback')}</li>
          <li>• {t('i18n.features.interpolation')}</li>
          <li>• {t('i18n.features.pluralization')}</li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
