// src/pages/DataExplorerPage.js

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import '../css/DataExplorer.css';
import DataExplorer from '../components/DataExplorer/DataExplorer.js';
import Title from '../components/Title.js';

function DataExplorerPage() {
    
    useState(() => { 
        
    }, []);

    return (
        <div className="main-container">
            <div><Sidebar /></div>
            <div><Title title='Data Explorer' imgSrc='data-explorer-title.jpeg'/></div>
            <div className='data-explorer'><DataExplorer /></div>
            
        </div>
    );
}

export default DataExplorerPage;