"use client";

import { useLanguage } from "./LanguageContext";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const nextLanguage = language === "en" ? "de" : "en";

  return (
    <button
      type="button"
      className={`languageToggle ${className}`.trim()}
      aria-label={language === "en" ? "Switch language to German" : "Sprache auf Englisch umstellen"}
      onClick={() => setLanguage(nextLanguage)}
    >
      {nextLanguage.toUpperCase()}
    </button>
  );
}
