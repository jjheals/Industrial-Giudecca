// src/pages/HistoricalStoriesPage.js

import React from 'react';
import Sidebar from '../components/Sidebar.js';

import Title from '../components/Title.js';
import '../css/HistoricalStoriesPage.css';

/** HistoricalStoriesPage
 * @abstract Renders the page containing outlinks to all the historical storymaps at the relative path "/historical-stories". Takes no parameters.
 * This page serves as a jump-off point for the other historical stories. The content is minimal and intentionally simplistic. 
 */
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