import { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '../constants/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = useCallback((key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
