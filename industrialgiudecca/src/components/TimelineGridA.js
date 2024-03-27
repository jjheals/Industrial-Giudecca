// TimelineGridA.js

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
import React, { useState, useEffect, useRef } from 'react';
import { useLockScroll } from './ScrollHandler'; 

import '../css/TimelineGridA.css';

import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import { sDPTFactoriesTableURL } from '../GlobalConstants.js';

const TimelineGridA = () => {
    const [factories, setFactories] = useState([]);
    const [filteredFactories, setFilteredFactories] = useState([]);
    let [numActive, setNumActive] = useState(0);
    const [year, setYear] = useState(1730);
    const pageRef = useRef(null);

    // Iterate over the factories and find the minmum/maximum year, and get the cover image for each
    let minYear = 9999;
    let maxYear = 0;
    factories.forEach(factory => { 

        // Get the cover image for this factory
        factory.getCoverImageURL(); 
        factory.show = 'show';

        // Set random opening years and random closing years if they are NULL
        if(!factory.Opening_Year) { factory.Opening_Year = Math.floor(Math.random() * (1900 - 1730 + 1)) + 1730; }
        if(!factory.Closing_Year) { factory.Closing_Year = Math.floor(Math.random() * (1900 - 1730 + 1)) + 1730; }

        if(factory.Opening_Year < minYear) minYear = factory.Opening_Year;  // Check for min year
        if(factory.Closing_Year > maxYear) maxYear = factory.Closing_Year;  // Check for max year
    });

    useLockScroll(pageRef, minYear, new Date().getFullYear(), setYear);

    useEffect(() => {

        // Filter the factories based on the scroll position
        const filterFactories = (year) => {
            numActive = 0;
            const filtered = factories.map(factory => { 
                const isVisible = factory && 
                                 factory.Opening_Year <= year && 
                                 (!factory.Closing_Year || factory.Closing_Year >= year);
                
                if(isVisible) numActive += 1;

                // Return factory object with updated opacity
                return { ...factory, isVisible };
            });
            setNumActive(numActive);
            setFilteredFactories(filtered);
        };

        filterFactories(year);
    }, [year, factories]);

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
        <div ref={pageRef} className='page-container'>
            <div className='info-container'>
                <div className='i' id='i1'><h3>In the year</h3></div>
                <div className='i' id='i2'><h1>{Math.round(year)}</h1></div>
                <div className='i' id='i3'><h3>There were</h3></div>
                <div className='i' id='i4'><h1>{numActive} factories</h1></div>
                <div className='i' id='i5'><h3>on Giudecca.</h3></div>
            </div>

            <div class='grid-container'>
                {filteredFactories.map(factory => (
                    <div className='grid-item' key={factory.Factory_ID}>
                        <img
                            style={{ opacity: factory.isVisible ? 1 : 0 }}
                            id={factory.Factory_ID}
                            src={factory.coverPicURL}
                            alt={factory.English_Name}
                            className="factory-img"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelineGridA;
