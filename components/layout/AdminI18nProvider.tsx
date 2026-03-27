"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import enTranslations from "@/locales/admin/en.json";
import jaTranslations from "@/locales/admin/ja.json";

export type Language = "en" | "ja";

export type TranslationKey = keyof typeof enTranslations;

type AdminI18nContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: enTranslations,
  ja: jaTranslations,
};

const AdminI18nContext = createContext<AdminI18nContextType | null>(null);

export function AdminI18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("admin_language");
    if (savedLanguage === "en" || savedLanguage === "ja") {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    localStorage.setItem("admin_language", nextLanguage);
  };

  const value = useMemo<AdminI18nContextType>(
    () => ({
      language,
      setLanguage: handleSetLanguage,
      t: (key) => translations[language][key] ?? translations.en[key],
    }),
    [language]
  );

  return (
    <AdminI18nContext.Provider value={value}>
      {children}
    </AdminI18nContext.Provider>
  );
}

export function useAdminI18n() {
  const context = useContext(AdminI18nContext);
  if (!context) {
    throw new Error("useAdminI18n must be used within AdminI18nProvider.");
  }
  return context;
}
