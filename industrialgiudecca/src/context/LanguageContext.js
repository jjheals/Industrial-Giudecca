// src/context/LanguageContext.js

import React, { createContext, useState, useEffect } from 'react';
import translations from '../translations';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(
        localStorage.getItem('language') || 'en'
    );

    const changeLanguage = (newLanguage) => {
        localStorage.setItem('language', newLanguage);
        setLanguage(newLanguage);
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};