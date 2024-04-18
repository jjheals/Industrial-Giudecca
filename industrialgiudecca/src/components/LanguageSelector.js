import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const LanguageSelector = () => {
    const { language, changeLanguage } = useContext(LanguageContext);

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'it' : 'en';
        changeLanguage(newLanguage);
    };

    return (
        <button onClick={toggleLanguage}>
            {language === 'en' ? 'Italiano' : 'English'}
        </button>
    );
};

export default LanguageSelector;