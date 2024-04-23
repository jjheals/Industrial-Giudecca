// src/context/LanguageContext.js

import React, { createContext, useState, useEffect } from 'react';
import translations from '../translations';
import ReactDOM from 'react-dom';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    function changeLanguage(newLanguage) {
        sessionStorage.setItem('hasSelectedLanguage', 'true');
        setLanguage(newLanguage);
        document.getElementById('language-selector-container').style.display = 'none';
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