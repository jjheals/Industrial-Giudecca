// src/components/FactoriesMap.js

/** { Component } FactoriesMap 
 * @abstract Map that renders on the FactoryHomepage (industrial sites page) with static clickable pins for each industrial site.
 * @param { Array[Factory] } factories - Array of Factory objects
 * @param { function } onMarkerClick - Function/handler for each marker click
 * @param { String } searchTerm - Search term to filter the map by
 * @param { bool } showStoriesOnly - Boolean on whether to show only industrial sites with storymaps (true) or all industrial sites (false)
 */
import React, { useRef, useEffect } from 'react';
import '../css/components/FactoriesMap.css';
import { factoryStoryMapURLs } from '../GlobalConstants';

const FactoriesMap = ({ factories, onMarkerClick, searchTerm, showStoriesOnly, language }) => {
    // Refs for accessing DOM elements
    const pageRef = useRef(null);
    const mapContainerRef = useRef(null);
    const clickedMarkerRef = useRef(null);

    // Event handler for highlighting markers on the map
    const highlightMarker = (marker) => {
        marker.classList.add('highlighted');
        marker.style.zIndex = '1';
    };

    // Event handler for unhighlighting markers on the map
    const unhighlightMarker = (marker) => {
        if (marker !== clickedMarkerRef.current) {
            marker.classList.remove('highlighted');
            marker.style.zIndex = '0';
        }
    };

    // Event handler for clicking a marker on the map
    const clickMarker = (marker) => {
        if (clickedMarkerRef.current) {
            clickedMarkerRef.current.classList.remove('clicked');
            clickedMarkerRef.current.style.zIndex = '0';
        }

        marker.classList.add('clicked');
        marker.style.zIndex = '2';
        clickedMarkerRef.current = marker;
    };

    // useEffect => set the filtered markers on the map
    useEffect(() => {
        if (factories.length > 0 && mapContainerRef.current) {
            mapContainerRef.current.innerHTML = ''; // Clear previous markers

            // Create the tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'fhp-factory-tooltip';
            mapContainerRef.current.appendChild(tooltip);

            // Filter factories based on showStoriesOnly
            const factoriesToShow = showStoriesOnly
                ? factories.filter(factory => factory.Factory_ID in factoryStoryMapURLs)
                : factories;

            factoriesToShow.map(factory => {
                // If this factory does not have a location, hide it from the map
                if (!factory['x'] || !factory['y']) return;

                // Otherwise create the marker and display it
                else {
                    // Create the marker element and set its attributes
                    const markerWidthPx = 20;
                    const markerHeightPx = 30;
                    const marker = document.createElement('img');

                    marker.className = 'fhp-factory-pin';
                    marker.id = `${factory.Factory_ID}-marker`;
                    marker.src = 'pin-icon-2.png';
                    marker.style.left = `${factory.x - (markerWidthPx / 2)}px`;
                    marker.style.top = `calc(${factory.y}px + 97vh)`;
                    marker.style.zIndex = '0.5';

                    // Event listeners for marker interactions
                    // Add handler for clicking the marker 
                    marker.addEventListener('click', () => {
                        onMarkerClick(factory.Factory_ID);
                        clickMarker(marker);
                    });

                    // Add handler for hovering over the marker
                    marker.addEventListener('mouseover', () => {
                        highlightMarker(marker);
                        // Show the factory name tooltip
                        tooltip.textContent = language == 'en' ? factory.English_Name: factory.Italian_Name;
                        tooltip.style.display = 'block';
                        tooltip.style.left = `${factory.x + (markerWidthPx / 2)}px`;
                        tooltip.style.top = `calc(${factory.y}px + 105vh - ${markerHeightPx}px)`;
                    });

                    // Add handler for stop hovering over the marker
                    marker.addEventListener('mouseout', () => {
                        unhighlightMarker(marker);
                        // Hide the factory name tooltip
                        tooltip.style.display = 'none';
                    });

                    // Hide tooltip by default
                    tooltip.style.display = 'none';

                    // Add the marker to the map overlay
                    mapContainerRef.current.appendChild(marker);
                }
            });
        }
    }, [factories, onMarkerClick, searchTerm, showStoriesOnly]);

    // useEffect => update the map if a search term is entered 
    useEffect(() => {
        if (searchTerm) {
            if (clickedMarkerRef.current) {
                clickedMarkerRef.current.classList.remove('clicked');
                clickedMarkerRef.current.style.zIndex = '0';
                clickedMarkerRef.current = null;
            }
        }
    }, [searchTerm]);

    return (
        <div ref={pageRef} className='fhp-map-container'>
            <div className='fhp-giudecca-map' style={{ width: '100%', height: '100%' }}>
                {/* Container for map image */}
                <img
                    src="giudecca-map.png"
                    className='fhp-giudecca-map-img'
                    alt="Map"
                    style={{ height: window.innerHeight }}
                />

                {/* Overlayed container for factory pins */}
                <div
                    ref={mapContainerRef}
                    className='fhp-map-container'
                    style={{ height: window.innerHeight }}
                ></div>
            </div>
        </div>
    );
};

export default FactoriesMap;