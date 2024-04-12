import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'
import enHP from './locals/en/Homepage.json';
import itHP from './locals/it/Homepage.json';

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    lng: "en",
    resources: {
        en: {
            translation: enHP
        },
        it: {
            translation: itHP
        }
    },
    returnObjects: true
});