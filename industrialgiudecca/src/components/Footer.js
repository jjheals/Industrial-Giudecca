// src/components/Footer.js

/** { Component } Footer 
 * 
 * @abstract 
 * 
 */

import React, { useState, useContext } from 'react';
import '../css/components/Footer.css'; 
import { LanguageContext } from '../context/LanguageContext.js';

const Footer = () => {
    const { t, language } = useContext(LanguageContext);

   

    return (
        <div className='footer'>
            <button className='footer-button' onClick={() => window.location.href = '/'}>{ t('goToHome') }</button>
            <button className='footer-button' onClick={() => window.location.href = '/'}>{ t('goToIndustrialSites') }</button>
            <button className='footer-button' onClick={() => window.location.href = '/'}>{ t('goToStories') }</button>
            <hr className='footer-hr'></hr>
        </div>
    );
};

export default Footer;