import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { SITE_TEXT, type Language, type SiteText } from "./site";

const LANGUAGE_KEY = "nagpurland_lang";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: SiteText;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function savedLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_KEY);
    return saved === "hi" || saved === "mr" ? saved : "en";
  } catch {
    return "en";
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(savedLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(LANGUAGE_KEY, lang);
    } catch {
      // Private windows can block storage. The choice still works until the page closes.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: SITE_TEXT[language] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useTranslation() {
  return useI18n().t;
}
