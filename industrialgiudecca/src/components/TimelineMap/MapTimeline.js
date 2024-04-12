// MapTimeline.js

import React, { useState, useEffect, useRef } from 'react';
import { MapTimelineLockScroll } from './MapTimelineLockScroll';

import '../../css/components/MapTimeline.css';
import { useTranslation } from "react-i18next";
import "../../i18n.js";
import "../../locals/en/Homepage.json";
import "../../locals/it/Homepage.json";

const MapTimeline = ({ factories }) => {
    const [activeAdv, setActiveAdv] = useState('');
    const [activeLabel, setActiveLabel] = useState('');
    const pageRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markerRefs = useRef({});
    const { t } = useTranslation();

    /* NOTE: do not hardcode "1800" for the year. Get the minimum year from the DB before loading the map, and then calculate the random
     * opening and closing years based on that instead. Hardcoding the minimum year (1800) risks breaking the map if the minimum year is 
     * raised in the DB */
    const [year, setYear] = useState(1800);
    
    // Event handler for the skip timeline button
    const handleSkipClick = () => {
        setYear(new Date().getFullYear());
        pageRef.current.scrollTop = pageRef.current.scrollHeight;
        window.scrollTo({
            top: window.innerHeight * 2  
        });
    };

    // Calculate the top margin of the timeline in pixels
    // NOTE: vh in the below formula is the margin in VH
    const marginVH = 5;  // Margin in VH
    const marginPx = (marginVH * window.innerHeight) / 50;

    // Iterate over the factories and find the minimum/maximum year, and get the cover image & coords for each
    let minYear = 9999;
    let maxYear = 0;
    factories.forEach(factory => {

        // Set random opening years and random closing years if they are NULL
        if(!factory.Opening_Year) { factory.Opening_Year = Math.floor(Math.random() * (2000 - 1830 + 1)) + 1830; }
        if(!factory.Closing_Year) { factory.Closing_Year = Math.floor(Math.random() * (2000 - 1830 + 1)) + 1830; }

        if(factory.Opening_Year < minYear) minYear = factory.Opening_Year;  // Check for min year
        if(factory.Closing_Year > maxYear) maxYear = factory.Closing_Year;  // Check for max year
    });

    const thresh = 0;

    // Lock the scroll
    const timelineTop = window.innerHeight;
    MapTimelineLockScroll(pageRef, thresh, minYear, new Date().getFullYear(), setYear, timelineTop);

    // useEffect ==> on every scroll, check and update the factories that appear on the map
    useEffect(() => {                
        // Clear previous factory pins
        mapContainerRef.current.innerHTML = '';

        // Create the tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'factory-tooltip';
        mapContainerRef.current.appendChild(tooltip);

        // Filter the factories based on the scroll position
        const filterFactories = (year) => {
            // Init the active count to 0
            let activeCount = 0;

            // Iterate over and filter the factories
            factories.map(factory => {

                console.log(`(${factory.Factory_ID}) factory.Opening_Year: ${factory.Opening_Year} | factory.Closing_Year: ${factory.Closing_Year} | year: ${year}`);

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
                        marker.style.left = `${factory.x - (markerWidthPx / 2)}px`;
                        marker.style.top = `calc(${factory.y}px + ${marginPx}px - ${markerHeightPx * 4}px)`;

                        // Event listener to redirect to another page on marker click
                        marker.addEventListener('click', () => { 
                            window.location.href = `/factory/${factory.Factory_ID}`;
                        })

                        // Event listeners to show/hide popups on hover
                        marker.addEventListener('mouseover', () => {
                            // Show the factory name tooltip
                            tooltip.textContent = factory.English_Name;
                            tooltip.style.display = 'block';

                            // Calculate the tooltip position
                            const tooltipWidth = tooltip.offsetWidth;
                            const tooltipHeight = tooltip.offsetHeight;
                            const tooltipLeft = factory.x - (tooltipWidth / 2) + (markerWidthPx / 2);
                            const tooltipTop = factory.y - tooltipHeight - 10; // Adjust the vertical position as needed

                            tooltip.style.left = `${tooltipLeft}px`;
                            tooltip.style.top = `calc(${tooltipTop}px + ${marginPx}px - ${markerHeightPx * 4}px)`;
                        });

                        marker.addEventListener('mouseout', () => {
                            // Hide the factory name tooltip
                            tooltip.style.display = 'none';
                        });

                        // Hide tooltip by default 
                        tooltip.style.display = 'none';

                        // Store the marker element in the markerRefs object
                        markerRefs.current[factory.Factory_ID] = marker;

                        // Add the marker to the map overlay
                        mapContainerRef.current.appendChild(marker);
                    }
                }
                console.log(activeCount);
            });

            // Set the number active on the screen
            if(activeCount === 1) {
                if(year >= new Date().getFullYear()) setActiveAdv('is');
                else setActiveAdv('was');
                setActiveLabel(`${activeCount} ${t("activeLabel")}`);
            }
            else {
                setActiveAdv('were');
                setActiveLabel(`${activeCount} ${t("activeLabelPlural")}`);
            }
        };

        // Call filterFactories function
        filterFactories(year);
    }, [year, factories]);

    return (
        <div ref={pageRef} className='timeline-container'>
            <div className='giudecca-map-timeline' style={{ width: '100%', height: '100%' }}>
                {/* Container for map image */}
                <img src="giudecca-map.png"
                     className='giudecca-map-img'
                     alt="Map"
                     style={{ height: window.innerHeight }}
                />

                {/* Overlayed container for factory pins */}
                <div ref={mapContainerRef}
                     className='factory-container'
                     style={{ height: window.innerHeight }}>
                </div>

                <div className='info-containerb' style={{ height: window.innerHeight * 0.38 }}>
                    <div className='map-row'>
                        <div className='ib' id='ib1'><h3>In {Math.round(year)}, there {activeAdv} {activeLabel} {t("onGiudecca")}.</h3></div>
                    </div>
                    <div className='map-row'>
                        <div className='context-blurb'>
                            {/*<h4>Napoleon arrives in Italy, causing most factories to become Churches.</h4>*/}
                        </div>
                    </div>
                    <button className='skip-button' onClick={handleSkipClick}>Skip Timeline</button>
                </div>
            </div>
        </div>
    );
};

export default MapTimeline;