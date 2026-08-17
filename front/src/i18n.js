import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import el from "./locales/el.json";
import en from "./locales/en.json";

export const SUPPORTED_LANGUAGES = ["el", "en"];
export const DEFAULT_LANGUAGE = "el";

i18n
  .use(LanguageDetector) // reads the saved choice from localStorage
  .use(initReactI18next) // wires i18next into React
  .init({
    resources: {
      el: { translation: el },
      en: { translation: en },
    },
    fallbackLng: DEFAULT_LANGUAGE, // no saved choice -> Greek
    supportedLngs: SUPPORTED_LANGUAGES,
    detection: {
      // Only trust the saved choice. We deliberately do NOT sniff the
      // browser language, so first-time visitors always start in Greek.
      order: ["localStorage"],
      lookupLocalStorage: "language",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false }, // React already escapes output
  });

// Keep the <html lang="..."> attribute in sync (accessibility / SEO).
const setHtmlLang = (lng) => {
  document.documentElement.lang = lng;
};
setHtmlLang(i18n.resolvedLanguage || DEFAULT_LANGUAGE);
i18n.on("languageChanged", setHtmlLang);

export default i18n;
