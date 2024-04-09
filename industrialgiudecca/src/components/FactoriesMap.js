// src/FactoriesMap.js

/**  { Component } FactoriesMap
 *
 * @abstract
 * 
 */

import React, { useState, useEffect, useRef } from 'react';

import '../css/components/FactoriesMap.css';

const FactoriesMap = ({ factories }) => {
    const pageRef = useRef(null);
    const mapContainerRef = useRef(null);
    
    // Calculate the top margin of the timeline in pixels
    // NOTE: vh in the below formula is the margin in VH
    const marginVH = 5;  // Margin in VH
    const marginPx = (marginVH * window.innerHeight) / 50; 

    if(factories.length > 0) { 

        factories.map(factory => { 

            // If this factory does not have a location, hide it from the map
            if(!factory.x || !factory.y) return;
            else { 
                // Create the marker to appear on the screen & set its attributes accordingly
                const markerWidthPx = 20;
                const markerHeightPx = 30;
                const marker = document.createElement('img');  
    
                marker.className = 'fhp-factory-pin';      
                marker.id = `${factory.Factory_ID}-marker`; 
                marker.src = 'pin-icon-2.png';
                marker.style.left = `${factory.x - (markerWidthPx / 2)}px`;
                marker.style.top = `${factory.y + 620}px`;
    
                // Add the marker to the map overlay
                mapContainerRef.current.appendChild(marker);
            }
        })
    }

    return (
        
        <div ref={pageRef} className='fhp-map-container'>

            <div className='fhp-giudecca-map' style={{ width: '100%', height: '100%' }}>

                {/* Container for map image */}
                <img src="giudecca-map.png" 
                     className='fhp-giudecca-map-img' 
                     alt="Map" 
                     style={{ height: window.innerHeight }} 
                />

                {/* Overlayed container for factory pins */}
                <div ref={ mapContainerRef } 
                     className='fhp-map-container' 
                     style={{ height: window.innerHeight }}>
                </div>
            </div>
        </div>
    );
};

export default FactoriesMap;
