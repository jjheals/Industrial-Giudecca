// src/pages/TimelineGridA.js
import React, { useState, useEffect, useRef } from 'react';

import Sidebar from '../components/Sidebar';
import MapTimeline from '../components/MapTimeline.js';
import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import { sDPTFactoriesTableURL } from '../GlobalConstants.js';

function TimelineGridB_page() {
    const [factories, setFactories] = useState([]);

    // useEffect ==> init page and get all the factories to pass to TimelineGrid when page loads
    useEffect(() => {
        // Fetch factories FL when component mounts
        sDPTFetchFactoriesFL(sDPTFactoriesTableURL)
        .then(factories => {       
            setFactories(factories);
        })
        // Handle errors
        .catch(error => {
            console.error('Error fetching factories:', error);
        });
    }, []); // Empty dependency array

    return (
        <div>
            <div><Sidebar /></div>
            <MapTimeline factories={ factories }/>
        </div>
    );
}

export default TimelineGridB_page;