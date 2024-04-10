// MapTimeline.js

import React, { useState, useEffect, useRef } from 'react';
import { MapTimelineLockScroll } from './MapTimelineLockScroll';

import '../../css/components/MapTimeline.css';

const MapTimeline = ({ factories }) => {
    const [activeAdv, setActiveAdv] = useState('');
    const [activeLabel, setActiveLabel] = useState('');
    const [year, setYear] = useState(1730);
    const [hoveredFactoryName, setHoveredFactoryName] = useState('');
    const pageRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markerRefs = useRef({});

    const handleSkipClick = () => {
        setYear(new Date().getFullYear());
        pageRef.current.scrollTop = pageRef.current.scrollHeight;
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
        if(!factory.Opening_Year) { factory.Opening_Year = Math.floor(Math.random() * (1900 - 1730 + 1)) + 1730; }
        if(!factory.Closing_Year) { factory.Closing_Year = Math.floor(Math.random() * (1900 - 1730 + 1)) + 1730; }

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
                        marker.style.left = `${factory.x - (markerWidthPx / 2)}px`;
                        marker.style.top = `${factory.y + marginPx - (markerHeightPx * 4)}px`;

                        // Add event listeners for mouseover and mouseout events
                        marker.addEventListener('mouseover', () => {
                            setHoveredFactoryName(factory.Factory_ID);
                        });

                        marker.addEventListener('mouseout', () => {
                            setHoveredFactoryName('');
                        });

                        // Store the marker element in the markerRefs object
                        markerRefs.current[factory.Factory_ID] = marker;

                        // Add the marker to the map overlay
                        mapContainerRef.current.appendChild(marker);
                    }
                }
            });

            // Set the number active on the screen
            if(activeCount === 1) {
                if(year >= new Date().getFullYear()) setActiveAdv('is');
                else setActiveAdv('was');
                setActiveLabel(`${activeCount} factory`);
            }
            else {
                setActiveAdv('were');
                setActiveLabel(`${activeCount} factories`);
            }
        };

        // Call filterFactories function
        filterFactories(year);
    }, [year, factories]);

    const getTooltipPosition = (factoryId) => {
        const marker = markerRefs.current[factoryId];
        if (marker) {
            const markerRect = marker.getBoundingClientRect();
            return {
                left: markerRect.left + markerRect.width / 2,
                top: markerRect.top - 20, // Adjust the top position to bring the tooltip closer to the pin
            };
        }
        return { left: 0, top: 0 };
    };

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
                        <div className='ib' id='ib1'><h3>In the year</h3></div>
                        <div className='ib' id='ib2'><h1>{Math.round(year)}</h1></div>
                    </div>
                    <div className='map-row'>
                        <div className='ib' id='ib3'><h3>There {activeAdv}</h3></div>
                        <div className='ib' id='ib4'><h1>{activeLabel}</h1></div>
                        <div className='ib' id='ib5'><h3>on Giudecca.</h3></div>
                    </div>
                    <button onClick={handleSkipClick}>Skip</button>
                </div>
            </div>

            {/* Factory name tooltip */}
            <div
                className='factory-tooltip'
                style={{
                    display: hoveredFactoryName ? 'block' : 'none',
                    ...getTooltipPosition(hoveredFactoryName),
                    transform: 'translate(-50%, -100%)',
                }}
            >
                {factories.find(factory => factory.Factory_ID === hoveredFactoryName)?.English_Name}
            </div>
        </div>
    );
};

export default MapTimeline;