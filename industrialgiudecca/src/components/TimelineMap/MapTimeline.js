// MapTimeline.js

import React, { useState, useEffect, useRef } from 'react';
import { formatTimeperiodString } from '../../ArcGIS.js';

import '../../css/components/MapTimeline.css';
import { useTranslation } from "react-i18next";
import "../../i18n.js";
import "../../locals/en/Homepage.json";
import "../../locals/it/Homepage.json";

let currTimeperiodIndex = 0;
 
const MapTimeline = ({ factories, timeperiods }) => {
    const pageRef = useRef(null);           // Page ref
    const mapContainerRef = useRef(null);   // Ref for map container element
    const markerRefs = useRef({});          // Refs for marker elements
    const { t } = useTranslation();         // Translation component

    const [activeAdv, setActiveAdv] = useState('');          // Dependent on the num factories (e.g. "There was 1 factory" vs "There were 2 factories")
    const [activeLabel, setActiveLabel] = useState('');      // Dependent on the num factories (e.g. "There is 2 factories" vs "There are 2 factories")
    const [currTimeperiodStr, setTimeperiod] = useState(''); // String representing the current timeperiod that appears on screen
    const [skipTimeline, setSkipTimeline] = useState(false); // State of whether the skipTimeline button is pressed
    const [minYear, setMinYear] = useState(9999);            // Min year for opening dates of factories
    const [maxYear, setMaxYear] = useState(0);               // Max year for closing dates of factories
    const timelineTop = window.innerHeight;                  // Position of the top of the MapTimeline on the page
    const currentYear = new Date().getFullYear();            // Current year for scrolling timeline

    /* NOTE: do not hardcode "1800" for the year. Get the minimum year from the DB before loading the map, and then calculate the random
     * opening and closing years based on that instead. Hardcoding the minimum year (1800) risks breaking the map if the minimum year is
     * raised in the DB */
    const [year, setYear] = useState(1800);

    // Event handler for the reset button
    const handleResetClick = () => {
        setYear(minYear);
        setSkipTimeline(false);
        setTimeperiod('');
        window.scrollTo({ 
            top: timelineTop,
            behavior: 'smooth'
        });
        currTimeperiodIndex = 0;
    };

    // Event handler for the skip timeline button
    const handleSkipClick = () => {
        setYear(currentYear);
        pageRef.current.scrollTop = pageRef.current.scrollHeight;
        setSkipTimeline(true);
        setTimeperiod(`(${currentYear}) Modern day.`);
        currTimeperiodIndex = timeperiods.length - 1;

        window.scrollTo({
            top: window.innerHeight * 2,
            behavior: 'smooth'
        });
    };

    // Calculate the top margin of the timeline in pixels
    // NOTE: vh in the below formula is the margin in VH
    const marginVH = 5;  // Margin in VH
    const marginPx = (marginVH * window.innerHeight) / 50;

    // Iterate over the factories and find the minimum/maximum year, and get the cover image & coords for each
    factories.forEach(factory => {

        // Set random opening years and random closing years if they are NULL
        if(!factory.Opening_Year) { factory.Opening_Year = Math.floor(Math.random() * (2000 - 1830 + 1)) + 1830; }
        if(!factory.Closing_Year) { factory.Closing_Year = Math.floor(Math.random() * (2000 - 1830 + 1)) + 1830; }

        if(factory.Opening_Year < minYear) setMinYear(factory.Opening_Year);  // Check for min year
        if(factory.Closing_Year > maxYear) setMaxYear(factory.Closing_Year);  // Check for max year
    });

    // useEffect => logic for an event handler to lock the scroll while the timeline is active
    useEffect(() => {
        const handleWheel = (e) => {
            if (pageRef.current && !skipTimeline) {
                const top = pageRef.current.getBoundingClientRect().top; // Current top of the screen
                const margin = 50;                                       // margin is +/- amount from the top of the timeline to lock scroll

                // Check if the position is within the margin for locking the screen
                // NOTE: <= 0 assumes the timeline top is at pos y = 0
                if(top - margin <= 0) {
                    if(!skipTimeline) window.scrollTo(0, timelineTop);
                    e.preventDefault();

                    // Control the scroll speed in both directions
                    const scrollFactor = 0.7;                                       // DECREASE => SLOWER
                    const direction = e.deltaY > 0 ? scrollFactor : -scrollFactor;  // Set the scroll speed

                    // Calculate the year
                    setYear((prevYear) => {
                        const newYear = prevYear + direction;

                        // Scroll is "down" (increase year)
                        if (newYear >= minYear && newYear <= currentYear) return newYear;

                        // We are at the end (current year), so remove the event listener to unlock scroll
                        else if (newYear >= currentYear) {
                            window.removeEventListener('wheel', handleWheel);
                            setTimeperiod(`(${currentYear}) Modern day.`);
                            return currentYear;
                        }

                        // Scroll is "up" (decrease year)
                        else return prevYear;
                    });
                }
            }
        };
        window.addEventListener('wheel', handleWheel, { passive: false });  // Add event handler by default
        return () => {
            window.removeEventListener('wheel', handleWheel);
        }; // Remove event handler on end

    }, [skipTimeline, minYear, maxYear]); // Note dependency array contains skipTimeline

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

            // Set the time period according to the year
            if(timeperiods.length > 0) {
                try {
                    // Track the previous end year to move the timeline backwards
                    let prevTimeperiodEndYear = -1;
                    try {  prevTimeperiodEndYear = timeperiods[currTimeperiodIndex - 1]['End_Date']; } catch { }

                    let nextTimeperiodStartYear = -1;
                    let currTimeperiodStartYear = -1;

                    try { nextTimeperiodStartYear = timeperiods[currTimeperiodIndex + 1]['Start_Date']; } catch { }
                    try { currTimeperiodStartYear = timeperiods[currTimeperiodIndex]['Start_Date']; } catch { }

                    // Check if moving on to the next time period
                    if(nextTimeperiodStartYear < year) {
                        currTimeperiodIndex = currTimeperiodIndex + 1;
                        setTimeperiod(formatTimeperiodString(timeperiods[currTimeperiodIndex]));
                    }
                    // Check if moving back to the previous time period
                    else if(prevTimeperiodEndYear > 0 && prevTimeperiodEndYear < year || currTimeperiodStartYear > year) {
                        currTimeperiodIndex = currTimeperiodIndex - 1;
                    }

                    // Set the time period on the screen
                    else if(currTimeperiodStartYear > year) {
                        setTimeperiod(formatTimeperiodString(timeperiods[currTimeperiodIndex]));
                    }
                } catch {
                    setTimeperiod('');
                }
            }

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
                        marker.style.top = `calc(${factory.y}px + ${marginPx}px - ${markerHeightPx * 4}px)`;

                        // Event listener to redirect to another page on marker click
                        marker.addEventListener('click', () => {
                            window.location.href = `/industrial-sites/${factory.Factory_ID}`;
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
            });

            // Set the number active on the screen
            if(activeCount === 1) {
                if(year >= currentYear) {
                    setActiveAdv('is');
                    setTimeperiod(`(${currentYear}) Modern day.`);
                }
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
            <div className='learn-more-container'><p className='timeline-learn-more'>Click on a pin to learn more</p></div>
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
                            <h4>{ currTimeperiodStr }</h4>
                        </div>
                    </div>
                    <button className='skip-button' onClick={handleSkipClick}>Skip Timeline</button>
                    <button className='reset-button' onClick={handleResetClick}>Reset Timeline</button>
                </div>
            </div>
        </div>
    );
};

export default MapTimeline;