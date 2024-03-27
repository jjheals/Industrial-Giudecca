// TimelineGrid.js
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
// TimelineGrid.js
import React, { useState, useEffect, useRef } from 'react';
import { useLockScroll } from './ScrollHandler'; // Make sure to adjust the path based on your file structure
import '../css/TimelineGridB.css';
import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import { sDPTFactoriesTableURL } from '../GlobalConstants.js';

const TimelineGrid = () => {
    const [factories, setFactories] = useState([]);
    const [filteredFactories, setFilteredFactories] = useState([]);
    const [year, setYear] = useState(1730);
    const pageRef = useRef(null);

    useLockScroll(pageRef, 1730, new Date().getFullYear(), setYear, year);

    useEffect(() => {
        const filterFactories = (year) => {
            const filtered = factories.filter(factory => factory && factory.Opening_Year <= year && (!factory.Closing_Year || factory.Closing_Year >= year));
            setFilteredFactories(filtered);
        };

        filterFactories(year);
    }, [year, factories]);

    useEffect(() => {
        // Fetch factories FL when component mounts
        sDPTFetchFactoriesFL(sDPTFactoriesTableURL)
            .then(factories => {
                factories.forEach(factory => { 
                    // Set random opening years and random closing years if they are NULL
                    if(!factory.Opening_Year) { factory.Opening_Year = Math.floor(Math.random() * (1900 - 1730 + 1)) + 1730; }
                    if(!factory.Closing_Year) { factory.Closing_Year = Math.floor(Math.random() * (1900 - 1730 + 1)) + 1730; }

                    // Get the cover image for this factory
                    factory.getCoverImageURL(); 
                });
                setFactories(factories);
            })
            // Handle errors
            .catch(error => {
                console.error('Error fetching factories:', error);
            });
    }, []); // Empty dependency array

    return (
        <div ref={pageRef} className='page-container'>
            <div className='info-container'>
                <div className='i' id='i1'><h3>In the year</h3></div>
                <div className='i' id='i2'><h1>{year}</h1></div>
                <div className='i' id='i3'><h3>There were</h3></div>
                <div className='i' id='i4'><h1>{filteredFactories.length} factories</h1></div>
                <div className='i' id='i5'><h3>on Giudecca.</h3></div>
            </div>

            <div className='grid-container'>
                {filteredFactories.map(factory => (
                    <div className="grid-item" key={factory.Factory_ID}>
                        <img id={factory.Factory_ID} src={factory.coverPicURL} alt={factory.Factory_ID}
                             className="factory-img"/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelineGrid;
