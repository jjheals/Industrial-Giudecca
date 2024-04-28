// src/components/Footer.js

/** { Component } Footer 
 * 
 * @abstract 
 * 
 */

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/components/Footer.css'; 
import { LanguageContext } from '../context/LanguageContext.js';

const Footer = () => {
    const { t, language } = useContext(LanguageContext);

   

    return (
        <div className='footer'>
            <Link to='/' className='footer-link'>
                <div className='footer-button'>{ t('goToHome') }</div>
            </Link>
            <Link to='/industrial-sites' className='footer-link'>
                <div className='footer-button'>{ t('goToIndustrialSites') }</div>
            </Link>
            <Link to='/industrial-stories' className='footer-link'>
                <div className='footer-button'>{ t('goToStories') }</div>
            </Link>
            <hr className='footer-hr'></hr>
        </div>
    );
};

export default Footer;