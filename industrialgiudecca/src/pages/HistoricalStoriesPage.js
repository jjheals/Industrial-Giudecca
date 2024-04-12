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
    // Set viewport to the top of the page since React is sus
    window.scrollTo({ 
        top: 0
    });

    return (
        <div className="historical-stories-page">
            <div><Sidebar /></div>
            <div><Title title={ 'Historical Stories' } titleColor={ 'grey' } imgSrc={ 'Fortuny.jpeg' } /></div>            
        </div>
    );
}

export default HistoricalStoriesPage;