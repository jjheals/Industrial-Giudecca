// src/components/LanguageSelector.js

import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import '../css/components/LanguageSelector.css';

const LanguageSelector = () => {
    const { language, changeLanguage } = useContext(LanguageContext);

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'it' : 'en';
        changeLanguage(newLanguage);
    };

    return (
        <div className='language-selector-container'>
            <h1 className='language-selector-title'>Select a Language/Seleziona una lingua:</h1>
            <div className='language-buttons-container'>
                <button className='language-selector' onClick={toggleLanguage}>English/Inglese</button>
                <button className='language-selector' onClick={toggleLanguage}>Italian/Italiano</button>
            </div>
        </div>
        
    );
};

export default LanguageSelector;



