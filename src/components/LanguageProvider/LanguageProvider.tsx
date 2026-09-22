import { useEffect, useState, type ReactNode } from 'react';
import { LanguageContext, getNestedValue } from '../../hooks/useLanguage';
import type { Language, Translations } from '../../types';
import translationsData from '../../data/translations.json';

interface LanguageProviderProps {
  children: ReactNode;
}

const translations: Translations = translationsData;

const getInitialLanguage = (): Language => {
  try {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage === 'en' || savedLanguage === 'pl') {
      return savedLanguage;
    }
  } catch {
    // Language selection still works when browser storage is unavailable.
  }
  return navigator.language.toLowerCase().startsWith('pl') ? 'pl' : 'en';
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    // Save language preference
    try {
      localStorage.setItem('preferred-language', language);
    } catch {
      // Keep the selected language for this session when storage is unavailable.
    }

    // Update document language
    document.documentElement.lang = language;
    document.title =
      language === 'pl'
        ? 'Bartosz Litwa — Twórca firmy AI-native'
        : 'Bartosz Litwa — AI-Native Company Builder';
  }, [language]);

  const t = (key: string): string => {
    const value = get<string>(key, key);
    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" resolved to non-string value`);
      return key;
    }
    return value;
  };

  const get = <T = unknown,>(key: string, fallback?: T): T => {
    const currentTranslations = translations[language];
    if (!currentTranslations) {
      console.warn(`Language "${language}" not found in translations`);
      return fallback ?? (key as unknown as T);
    }

    const value = getNestedValue(currentTranslations, key);
    if (value === key) {
      console.warn(`Translation key "${key}" not found for language "${language}"`);
      return fallback ?? (key as unknown as T);
    }

    return value as T;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const contextValue = {
    language,
    setLanguage: handleSetLanguage,
    t,
    get
  };

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};
