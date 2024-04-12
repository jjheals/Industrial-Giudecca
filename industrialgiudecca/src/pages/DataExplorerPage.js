// src/pages/DataExplorerPage.js

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import '../css/DataExplorer.css';
import DataExplorer from '../components/DataExplorer/DataExplorer.js';
import Title from '../components/Title.js';

function DataExplorerPage() {
    // Set viewport to the top of the page since React is sus
    window.scrollTo({ 
        top: 0
    });

    useState(() => { 
        
    }, []);

    return (
        <div className="main-container">
            <div><Sidebar /></div>
            <div><Title title='Data Explorer' titleColor='' imgSrc='F-1_S35_yyyy.png'/></div>
            <div className='data-explorer'><DataExplorer /></div>
            
        </div>
    );
}

export default DataExplorerPage;