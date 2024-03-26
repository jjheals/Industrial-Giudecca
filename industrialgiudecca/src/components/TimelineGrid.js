// TimelineGrid.js
import React, { useState } from 'react';
import '../css/TimelineGrid.css';

import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import { sDPTFactoriesTableURL } from '../GlobalConstants.js';

/**  { Component } TimelineGrid 
 * 
 * @abstract 
 * TimelineGrid component covers the viewable screen with an information box and a grid of factory images. The info box 
 * displays a year and number of factories that existed on Giudecca in/since that year. The grid of factory images shows
 * the images of factories that existed in/since that year. 
 *              
 * The page is locked at this view. As the user scrolls down, the year will increase and the number of factories will 
 * decrease. At the same time, the factory images will disappear to reflect the factories that were active in/since 
 * the year currently displayed. 
 */
const TimelineGrid = () => {
    const [factories, setFactories] = useState([]);
    const [year, setYear] = useState([]);
    
    useState(() => {
        
        // Fetch factories FL when component mounts
        sDPTFetchFactoriesFL(sDPTFactoriesTableURL)
        .then(factories => {

            // Iterate over the factories and get the cover image for each, while also finding the earliest year
            // that at least one factory was active
            let year = 9999;
            factories.forEach(factory => { 
                // Get the cover image
                factory.getCoverImageURL();

                // Check if this opening year is BEFORE the currently stored year and update year if necessary
                if(factory.Opening_Year && Number(factory.Opening_Year) < year) {
                    year = Number(factory.Opening_Year);
                }
            })
            setYear(year);              // Set the initial year on the page
            setFactories(factories);    // Set the initial factories on the page
        })
        // Handle errors
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