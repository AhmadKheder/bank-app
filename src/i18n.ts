

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enTranslation from "@/locales/en/translation.json";
import frTranslation from "@/locales/fr/translation.json";

const resources = {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
};

i18n
    .use(initReactI18next) // Bind i18next to React
    .use(LanguageDetector) // Detect browser language
    .init({
        resources,
        fallbackLng: "en", // Set default language
        debug: true,
        interpolation: {
            escapeValue: false, // Prevents XSS
        },
        detection: {
            order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
            caches: ["cookie"],
        },
    });

export default i18n;
