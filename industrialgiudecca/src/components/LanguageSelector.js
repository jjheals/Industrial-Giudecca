// src/components/LanguageSelector.js

import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import '../css/components/LanguageSelector.css';

const LanguageSelector = () => {
    const { language, changeLanguage } = useContext(LanguageContext);
    
    return (
        <div id='language-selector-container' className='language-selector-container' style={{ top: window.scrollY }}>
            <h1 className='language-selector-title'>Select a Language/Seleziona una lingua:</h1>
            <div className='language-buttons-container'>
                <button className='language-selector' onClick={() => changeLanguage('en')}>English/Inglese</button>
                <button className='language-selector' onClick={() => changeLanguage('it')}>Italian/Italiano</button>
            </div>
        </div>
    );
};

export default LanguageSelector;



