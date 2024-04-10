/**  { Component } FactoriesMap
 *
 * @abstract
 *
 */

import React, { useRef, useEffect } from 'react';
import '../css/components/FactoriesMap.css';

const FactoriesMap = ({ factories, onMarkerClick, searchTerm }) => {
    const pageRef = useRef(null);
    const mapContainerRef = useRef(null);
    const clickedMarkerRef = useRef(null);

    // Calculate the top margin of the timeline in pixels
    // NOTE: vh in the below formula is the margin in VH
    const marginVH = 5;  // Margin in VH
    const marginPx = (marginVH * window.innerHeight) / 50;

    const highlightMarker = (marker) => {
        marker.classList.add('highlighted');
        marker.style.zIndex = '1';
    };

    const unhighlightMarker = (marker) => {
        if (marker !== clickedMarkerRef.current) {
            marker.classList.remove('highlighted');
            marker.style.zIndex = '0';
        }
    };

    const clickMarker = (marker) => {
        if (clickedMarkerRef.current) {
            clickedMarkerRef.current.classList.remove('clicked');
            clickedMarkerRef.current.style.zIndex = '0';
        }

        marker.classList.add('clicked');
        marker.style.zIndex = '2';
        clickedMarkerRef.current = marker;
    };

    useEffect(() => {
        if (factories.length > 0 && mapContainerRef.current) {
            mapContainerRef.current.innerHTML = ''; // Clear previous markers

            factories.map(factory => {
                // If this factory does not have a location, hide it from the map
                if (!factory.x || !factory.y) return;
                else {
                    // Create the marker to appear on the screen & set its attributes accordingly
                    const markerWidthPx = 20;
                    const markerHeightPx = 30;
                    const marker = document.createElement('img');

                    marker.className = 'fhp-factory-pin';
                    marker.id = `${factory.Factory_ID}-marker`;
                    marker.src = 'pin-icon-2.png';
                    marker.style.left = `${factory.x - (markerWidthPx / 2)}px`;
                    marker.style.top = `calc(${factory.y}px + 65vh)`;
                    marker.style.zIndex = '0';

                    marker.addEventListener('click', () => {
                        onMarkerClick(factory.Factory_ID);
                        clickMarker(marker);
                    });

                    marker.addEventListener('mouseover', () => {
                        highlightMarker(marker);
                    });

                    marker.addEventListener('mouseout', () => {
                        unhighlightMarker(marker);
                    });

                    // Add the marker to the map overlay
                    mapContainerRef.current.appendChild(marker);
                }
            });
        }
    }, [factories, onMarkerClick, searchTerm]);

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