import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enHP from "./locals/en/Homepage.json";
import itHP from "./locals/it/Homepage.json";

i18n

    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        lng: "en",
        fallbackLng: "en",
        resources: {
            en: {
                translation: enHP
            },
            it: {
                translation: itHP
            }
        },
        returnObjects: true,
        debug: true
    });
export default i18n;

