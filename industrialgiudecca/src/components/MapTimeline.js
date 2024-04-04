// MapTimeline.js

/**  { Component } MapTimeline
 *
 * @abstract
 * The page is locked at this view. As the user scrolls down, the year will increase and the number of factories will
 * decrease. At the same time, the factory images will disappear to reflect the factories that were active in/since
 * the year currently displayed.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLockScroll } from './ScrollHandler'; 

import '../css/MapTimeline.css';

const MapTimeline = ({ factories }) => {
    let [numActive, setNumActive] = useState(0);
    const [year, setYear] = useState(1730);
    const pageRef = useRef(null);
    const mapContainerRef = useRef(null);

    // Calculate the top margin of the timeline in pixels
    // NOTE: vh in the below formula is the margin in VH
    const marginVH = 5;  // Margin in VH
    const marginPx = (marginVH * window.innerHeight) / 50; 

    // Iterate over the factories and find the minmum/maximum year, and get the cover image & coords for each
    let minYear = 9999;
    let maxYear = 0;
    factories.forEach(factory => { 

        // Set random opening years and random closing years if they are NULL
        if(!factory.Opening_Year) { factory.Opening_Year = Math.floor(Math.random() * (1900 - 1730 + 1)) + 1730; }
        if(!factory.Closing_Year) { factory.Closing_Year = Math.floor(Math.random() * (1900 - 1730 + 1)) + 1730; }

        if(factory.Opening_Year < minYear) minYear = factory.Opening_Year;  // Check for min year
        if(factory.Closing_Year > maxYear) maxYear = factory.Closing_Year;  // Check for max year
    });

    // Lock the scroll 
    useLockScroll(pageRef, minYear, new Date().getFullYear(), setYear);

    // useEffect ==> on every scroll, check and update the factories that appear on the map
    useEffect(() => {

        // Clear previous factory pins
        mapContainerRef.current.innerHTML = '';

        // Filter the factories based on the scroll position
        const filterFactories = (year) => {

            // Init the active count to 0
            let activeCount = 0;    

            // Iterate over and filter the factories
            factories.map(factory => { 

                // Check that this factory's opening/closing dates are within the current range
                if(factory && factory.Opening_Year <= year && (!factory.Closing_Year || factory.Closing_Year >= year)) { 

                    // Increment the active count to appear on the screen
                    activeCount++;                                  

                    // If this factory does not have a location, hide it from the map
                    if(!factory.x || !factory.y) return;
                    else { 
                        // Create the marker to appear on the screen & set its attributes accordingly
                        const markerWidthPx = 20;
                        const markerHeightPx = 30;
                        const marker = document.createElement('img');  

                        marker.className = 'factory-pin';      
                        marker.id = `${factory.Factory_ID}-marker`; 
                        marker.src = 'pin-icon-2.png';
                        marker.width = markerWidthPx;
                        marker.height = markerHeightPx;
                        marker.style.left = `${factory.x - (markerWidthPx)}px`;
                        marker.style.top = `${factory.y + marginPx - (markerHeightPx * 2.5)}px`;

                        // Add the marker to the map overlay
                        mapContainerRef.current.appendChild(marker);
                    }
                }
            });

            // Set the number active on the screen 
            setNumActive(activeCount);
        };

        // Call filterFactories function 
        filterFactories(year);

    }, [year, factories]);



    return (
        
        <div ref={pageRef} className='timeline-container'>

            <div class='giudecca-map-timeline' style={{ width: '100%', height: '100%' }}>
                {/* Container for map image */}
                <img src="giudecca_map.png" 
                     className='giudecca-map-img' 
                     alt="Map" 
                     style={{ height: window.innerHeight * .6 }} 
                />

                {/* Overlayed container for factory pins */}
                <div ref={ mapContainerRef } 
                     className='factory-container' 
                     style={{ height: window.innerHeight * .6 }}>
                </div>
            </div>

            <div className='info-containerb'>
                    <div className='ib' id='ib1'><h3>In the year</h3></div>
                    <div className='ib' id='ib2'><h1>{ Math.round(year) }</h1></div>
                    <div className='ib' id='ib3'><h3>There were</h3></div>
                    <div className='ib' id='ib4'><h1>{ numActive } factories</h1></div>
                    <div className='ib' id='ib5'><h3>on Giudecca.</h3></div>
            </div>

            
        </div>
    );
};

export default MapTimeline;
