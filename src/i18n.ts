import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { store } from "./store/store"; // Import Redux store

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        fallbackLng: "fr", // ✅ Provide a safe default language
        lng: "fr", // ✅ Initial language, updated dynamically later
        debug: true,
        interpolation: { escapeValue: false },
        backend: {
            loadPath: "../locales/{{lng}}/{{ns}}.json",
        },
    });

// ✅ Listen for Redux state changes and update i18n dynamically
store.subscribe(() => {
    const newLang = store.getState().language.language;
    if (i18n.language !== newLang) {
        i18n.changeLanguage(newLang);
    }
});

export default i18n;
