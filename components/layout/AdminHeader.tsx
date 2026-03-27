'use client';

import { Language, useAdminI18n } from "./AdminI18nProvider";

export default function AdminHeader() {
  const { language, setLanguage, t } = useAdminI18n();

  return (
    <header className="bg-white rounded-xl shadow-sm p-2 mb-2 flex justify-between items-center">
      <div>
        <h1 className="text-medium font-bold text-gray-800 ml-4">{t("helloAdmin")}</h1>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="border border-slate-300 rounded-md px-3 py-1.5 text-sm text-slate-700 bg-white"
          aria-label="Language switcher"
        >
          <option value="en">{t("languageEnglish")}</option>
          <option value="ja">{t("languageJapanese")}</option>
        </select>

        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
            AD
          </div>
          <span className="font-medium text-gray-700">{t("admin")}</span>
        </div>
      </div>
    </header>
  );
}