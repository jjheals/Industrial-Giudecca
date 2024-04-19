// MapTimeline.js

/** { Component } MapTimeline 
 * @abstract Component rendered on the Homepage that contains the clickable markers on the map for each industrial site, 
 * and allows the user to scroll through the timeline
 * 
 * @param { Array[Factory] } factories - Array of factories as Factory objects 
 * @param { Arraoy[Object] } timeperiods - Array of timeperiods as Dictionaries (Objects)
 * @param { Object } minMaxYear - Object (Dictionary) in the format [ key : val ] => [ min: [int], max: [int] ] 
 *                                for the min and max year on the timeline
 */
import React, { useState, useEffect, useRef } from 'react';
import { formatTimeperiodString } from '../../ArcGIS.js';

import '../../css/components/MapTimeline.css';
import { useTranslation } from "react-i18next";


let currTimeperiodIndex = 0;
 
const MapTimeline = ({ factories, timeperiods, minMaxYear, language }) => {
    const pageRef = useRef(null);           // Page ref
    const mapContainerRef = useRef(null);   // Ref for map container element
    const markerRefs = useRef({});          // Refs for marker elements
    const { t } = useTranslation();         // Translation component
    const [year, setYear] = useState(0);    // The year that appears as the timeline scrolls

    const [activeAdv, setActiveAdv] = useState('');          // Dependent on the num factories (e.g. "There was 1 factory" vs "There were 2 factories")
    const [activeLabel, setActiveLabel] = useState('');      // Dependent on the num factories (e.g. "There is 2 factories" vs "There are 2 factories")
    const [currTimeperiodStr, setTimeperiod] = useState(''); // String representing the current timeperiod that appears on screen
    const [skipTimeline, setSkipTimeline] = useState(false); // State of whether the skipTimeline button is pressed

    const timelineTop = window.innerHeight;         // Position of the top of the MapTimeline on the page
    const currentYear = new Date().getFullYear();   // Current year for scrolling timeline
    const minYear = minMaxYear.minYear;             // Min year as passed to MapTimeline
    const maxYear = minMaxYear.maxYear;             // Max year as passed to MapTimeline
    
    // Calculate the top margin of the timeline in pixels
    // NOTE: vh in the below formula is the margin in VH
    const marginVH = 5;  // Margin in VH
    const marginPx = (marginVH * window.innerHeight) / 50;

    // useEffect => Init the year as minYear
    useEffect(() => { setYear(minYear); }, [minMaxYear, language]);

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
                            setTimeperiod(`(${currentYear}) Modern day.`);
                            window.removeEventListener('wheel', handleWheel);
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

    }, [skipTimeline, minYear, maxYear, language]); // Note dependency array contains skipTimeline

    // Iterate over the factories and find the minimum/maximum year, and get the cover image & coords for each
    factories.forEach(factory => {

        // Set random opening years and random closing years if they are NULL
        if(!factory.Opening_Year) { factory.Opening_Year = Math.floor(Math.random() * (2000 - minYear + 30 + 1)) + minYear + 30; }
        if(!factory.Closing_Year) { factory.Closing_Year = Math.floor(Math.random() * (2000 - minYear + 30 + 1)) + minYear + 30; }
    });

    // useEffect ==> on every scroll, check and update the factories that appear on the map
    useEffect(() => {
        // Clear previous factory pins
        mapContainerRef.current.innerHTML = '';

        // Create the tooltip element
        const tooltip = document.createElement('div');  // Create element 
        tooltip.className = 'factory-tooltip';          // Set class name
        tooltip.style.display = 'none';                 // IMPORTANT: hide by default
        mapContainerRef.current.appendChild(tooltip);   // Add as a child to the map container

        // Filter the factories based on the scroll position
        const filterFactories = (year) => {

            // Init the active count to 0
            let activeCount = 0;

            // Set the time period according to the year
            if(timeperiods.length > 0) {
                try {
                    // Track the previous end year to move the timeline backwards
                    let prevTimeperiodEndYear = -1;
                    let nextTimeperiodStartYear = -1;
                    let currTimeperiodStartYear = -1;

                    try { prevTimeperiodEndYear = timeperiods[currTimeperiodIndex - 1]['End_Date']; } catch { }
                    try { nextTimeperiodStartYear = timeperiods[currTimeperiodIndex + 1]['Start_Date']; } catch { }
                    try { currTimeperiodStartYear = timeperiods[currTimeperiodIndex]['Start_Date']; } catch { }

                    // Check if we've reached modern day
                    if(year == currentYear) {
                        setTimeperiod(`(${currentYear}) Modern day.`);
                    }
                    // Check if moving on to the next time period
                    else if(nextTimeperiodStartYear < year) {
                        currTimeperiodIndex = currTimeperiodIndex + 1;
                        setTimeperiod(formatTimeperiodString(timeperiods[currTimeperiodIndex], language));
                    }
                    // Check if moving back to the previous time period
                    else if(prevTimeperiodEndYear > 0 && prevTimeperiodEndYear < year || currTimeperiodStartYear > year) {
                        currTimeperiodIndex = currTimeperiodIndex - 1;
                    }

                    // Set the time period on the screen
                    else if(currTimeperiodStartYear > year) {
                        setTimeperiod(formatTimeperiodString(timeperiods[currTimeperiodIndex], language));
                    }
                } catch {
                    setTimeperiod('');
                }
            }

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
                        // Show the factory name tooltip on mouseover
                        marker.addEventListener('mouseover', () => {
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

                        // Hide the factory name tooltip on mouseout
                        marker.addEventListener('mouseout', () => { tooltip.style.display = 'none'; });

                        markerRefs.current[factory.Factory_ID] = marker;    // Store the marker element in the markerRefs object
                        mapContainerRef.current.appendChild(marker);        // Add the marker to the map overlay
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
    }, [year, factories, language]);

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

                {/* Container for the info, including the "In xxxx there was X industrial site" and the context blurb below that */}
                <div className='info-containerb' style={{ height: window.innerHeight * 0.38 }}>
                    <div className='map-row'>
                        <div className='ib' id='ib1'><h3>In {Math.round(year)}, there {activeAdv} {activeLabel} {t("onGiudecca")}.</h3></div>
                    </div>
                    <div className='map-row'>
                        <div className='context-blurb'>
                            <h4>{ currTimeperiodStr }</h4>
                        </div>
                    </div>
        
                    <button className='skip-button' onClick={handleSkipClick}>Skip Timeline</button>        {/* Bottom left button */}
                    <button className='reset-button' onClick={handleResetClick}>Reset Timeline</button>     {/* Bottom right button */}
                </div>
            </div>
        </div>
    );
};

export default MapTimeline;