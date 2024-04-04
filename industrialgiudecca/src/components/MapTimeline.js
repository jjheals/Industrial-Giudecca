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

    const element = document.getElementById('homepage-timeline');
    console.log(element);

    // Calculate the top margin of the timeline in pixels
    // NOTE: vh in the below formula is the margin in VH
    const marginVH = 5;  // Margin in VH
    const marginPx = (marginVH * window.innerHeight) / 50; 

    const mapWidth = window.innerWidth;         // Map width == screen width
    const mapHeight = window.innerHeight * .6;  // Map height is 60% of the screen 
    
    const minLat = 45.421492;                   // Bottom map limit
    const maxLat = 45.432036;                   // Top map limit
    const minLong = 12.305949;                  // Left map limit
    const maxLong = 12.349153;                  // Right map limit
    const deltaLong = maxLong - minLong;        // Map X axis distance (horiz) in DEGREES
    const deltaLat = maxLat - minLat;           // Map Y axis distance (vert) in DEGREES

    // Function to convert latitude and longitude to pixel coordinates
    function latLongToPixel(lat, long) {    
        const thisLongOffset = long - minLong;  // Offset from the left of the map in DEGREES
        const thisLatOffset = lat - minLat;     // Offset from the top of the map in DEGREES
        
        // Convert the long/lat offsets (degreees) into pixels 
        const pixelX = (thisLongOffset / deltaLong) * mapWidth;
        const pixelY = mapHeight - (thisLatOffset / deltaLat) * mapHeight;

        return { x: pixelX, y: pixelY };
    }

    // Iterate over the factories and find the minmum/maximum year, and get the cover image & coords for each
    let minYear = 9999;
    let maxYear = 0;
    factories.forEach(factory => { 

        // Get the lat/long coords for this factory
        factory.getFactoryCoords();

        // Convert the lat/long to pixel coordinates on the map
        const factoryMapPos = latLongToPixel(factory.lat, factory.long);
        factory.x = factoryMapPos.x;
        factory.y = factoryMapPos.y;

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

                    // Create the marker to appear on the screen & set its attributes accordingly
                    const markerWidthPx = 20;
                    const markerHeightPx = 30;

                    const marker = document.createElement('img');   
                    marker.className = 'factory-pin';      
                    marker.id = `${factory.Factory_ID}-marker`;         
                    marker.style.left = `${factory.x - (markerWidthPx)}px`;
                    marker.style.top = `${factory.y + marginPx - (markerHeightPx * 2.5)}px`;
                    marker.src = 'pin-icon-2.png';
                    marker.width = markerWidthPx;
                    marker.height = markerHeightPx;

                    // Add the marker to the map overlay
                    mapContainerRef.current.appendChild(marker);
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
