// src/pages/DataExplorerPage.js

/** DataExplorerPage
 * @abstract Renders the Data Explorer page at the relative route "/data-explorer". Takes no parameters, but uses the DataExplorer component
 * defined in src/components/DataExplorer/DataExplorer.js to dynamically render content and handle queries. The DataExplorerPage is merely a 
 * container for the DataExplorer component, the title component, and sidebar component. See src/components/DataExplorer/DataExplorer.js for 
 * more details on the Data Explorer. 
 */
import React, { useState, useContext } from 'react';

import Sidebar from '../components/Sidebar.js';
import DataExplorer from '../components/DataExplorer/DataExplorer.js';
import Title from '../components/Title.js';

import LanguageSelector from '../components/LanguageSelector';
import { LanguageContext } from '../context/LanguageContext.js';

import '../css/DataExplorer.css';


function DataExplorerPage() {
    const { t, language } = useContext(LanguageContext);  

    console.log(`Data explorer PAGE language: ${language}`);

    // Set viewport to the top of the page since React is sus
    window.scrollTo({ 
        top: 0
    });

    useState(() => { 
        
    }, []);

    return (
        <div className="main-container">
            <div><Sidebar /></div>
            <div><Title title={ t('dataExplorerTitle') } titleColor='' imgSrc='F-1_S35_yyyy.png'/></div>
            
            {/* Language selector if a language has not yet been chosen this session */}
            {localStorage.getItem('hasSelectedLanguage') == 'false' ? <LanguageSelector /> : <div className='data-explorer'><DataExplorer /></div>}
 
        </div>
    );
}

export default DataExplorerPage;