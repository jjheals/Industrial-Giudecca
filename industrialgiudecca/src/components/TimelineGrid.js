// Sidebar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/TimelineGrid.css';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

import { fetchFactoriesFL, sDPTFetchFactoriesFL } from '../ArcGIS.js';
import { apiKey, factoriesServiceURL, sDPTFactoriesTable, sDPTImagesURL } from '../GlobalConstants.js';

const TimelineGrid = () => {

    const [factories, setFactories] = useState([]);
    const [year, setYear] = useState([]);
    
    // Main
    useState(() => {
        
        // Fetch factories FL when component mounts
        sDPTFetchFactoriesFL(
            sDPTFactoriesTable,
        )
        .then(factories => {
            console.log(`Factories length: ${factories.length}`);

            // Set the factories on the page
            let year = 9999;
            factories.forEach(factory => { 
                factory.getCoverImageURL();

                if(factory.Opening_Year && Number(factory.Opening_Year) < year) {
                    year = Number(factory.Opening_Year);
                }
            })
            setYear(year);
            setFactories(factories);
        })
        .catch(error => {
            console.error('Error fetching factories:', error);
        });
    }, []); // Empty dependency array

    return (
        <div class='page-container'>
            
            <div class='info-container'>
                <div class='i' id='i1'><h3>In the year</h3></div>
                <div class='i' id='i2'><h1>{ year }</h1></div>
                <div class='i' id='i3'><h3>There were</h3></div>
                <div class='i' id='i4'><h1>{factories.length} factories</h1></div>
                <div class='i' id='i5'><h3>on Giudecca.</h3></div>
            </div>

            <div class='grid-container'>
                {factories.map(factory => (
                    <div className="grid-item" key={factory.Factory_ID}>
                        <img id={factory.Factory_ID} src={factory.coverPicURL} class="factory-img"></img>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelineGrid;