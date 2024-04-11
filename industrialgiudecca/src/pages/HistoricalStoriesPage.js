/** src/pages/HistoricalStoriesPage.js
 * 
 * @abstract
 * 
 */
import React from 'react';
import Sidebar from '../components/Sidebar.js';

import Title from '../components/Title.js';
import '../css/HistoricalStoriesPage.css';

function HistoricalStoriesPage() {
    return (
        <div className="historical-stories-page">
            <div><Sidebar /></div>
            <div><Title title={ 'Historical Stories' } titleColor={ 'grey' } imgSrc={ 'Fortuny.jpeg' } /></div>            
        </div>
    );
}

export default HistoricalStoriesPage;