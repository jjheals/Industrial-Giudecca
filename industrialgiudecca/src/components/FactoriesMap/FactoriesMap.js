// src/components/FactoriesMap.js

/** { Component } FactoriesMap 
 * @abstract Map that renders on the FactoryHomepage (industrial sites page) with static clickable pins for each industrial site.
 * @param { Array[Factory] } factories - Array of Factory objects
 * @param { function } onMarkerClick - Function/handler for each marker click
 * @param { String } searchTerm - Search term to filter the map by
 * @param { bool } showStoriesOnly - Boolean on whether to show only industrial sites with storymaps (true) or all industrial sites (false)
 */
import React, { useRef, useEffect, useState } from 'react';
import '../../css/components/FactoriesMap.css';

import { featureLayerServiceURLs, factoryStoryMapURLs } from '../../GlobalConstants.js';
import { fetchFL, fetchFactoriesFL, latLongToPixel } from '../../ArcGIS.js';
import Factory from '../../Factory.js';
import { BuildingPin } from './BuildingPin.js';

const FactoriesMap = ({ factories, onMarkerClick, searchTerm, showStoriesOnly, language }) => {
    // Refs for accessing DOM elements
    const pageRef = useRef(null);
    const mapContainerRef = useRef(null);
    const clickedMarkerRef = useRef(null);
    const [buildings, setBuildings] = useState([]);

    /** fetchBuildings()
     * @abstract Function to fetch the buildings feature layer from ArcGIS and set the 'buildings' constant to an Array[Object]
     * @returns { null }
     */
    async function fetchBuildings() { 

        // Fetch the Building FL to get the building locations and IDs
        const buildings = await fetchFL(featureLayerServiceURLs['Building'])
        .then(p => {
            return p.map(d => { 
                return d.attributes;
            });
        });

        // If we are filtering by factories with stories, then create a 'where' filter for the fetchFL function 
        let whereFilter = '';
        if(showStoriesOnly) { 
            const factoriesWithStories = Object.keys(factoryStoryMapURLs);

            factoriesWithStories.map(fid => { 
                if(parseInt(fid)) whereFilter += `Factory_ID = ${fid} OR `;
            });

            // Remove the trailing "OR"
            whereFilter = whereFilter.slice(0, -4);
        }
        // Fetch the Factory_At_Building FL to get the factory locations 
        const factoryAtBuilding = await fetchFL(featureLayerServiceURLs['Factory_At_Building'], whereFilter)
        .then(p => { 
            return p.map(d => { 
                return d.attributes;
            });
        });

        // Create a dictionary to map Building_IDs to an array of Factory_IDs
        let mapBuildingsToFactories = {};
        buildings.map(building => { 

            // Map the building's lat/long to x/y
            const mapHeight = '50vh';
            const buildingPos = latLongToPixel(building.Latitude_, building.Longitude_, window.innerWidth, window.innerHeight);
            
            const thisBuildingID = building.Building_ID;    // Get the current building ID
            let theseFactories = [];                        // Init theseFactories as an empty array, to be populated with Factory objects 

            // Filter the factory at building FL to match factories at this building over any period of time
            const theseFactoryIDs = factoryAtBuilding.filter(r => r.Building_ID == thisBuildingID);

            if(theseFactoryIDs.length > 0) { 
                // Iterate over the matched factory IDs and get the Factory objects for each
                theseFactoryIDs.map(r => { 
                    const thisFactoryID = r.Factory_ID;
                    const thisFactory = factories.filter(f => f.Factory_ID == thisFactoryID)[0];

                    // If there was a result, push thisFactory onto theseFactories
                    if(thisFactory) theseFactories.push(thisFactory);
                })

                // Add theseFactories to mapBuildingsToFactories at thisBuildingID
                mapBuildingsToFactories[thisBuildingID] = { x: buildingPos.x, y: buildingPos.y, lof: theseFactories };
            }
            
        })

        // Set the buildings on the page
        setBuildings(mapBuildingsToFactories);
    }
    
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

    // useEffect => call fetchBuildings() to get the buildings FL
    useEffect(() => { 
        if(
            factories &&
            factories.length > 0 
        ) fetchBuildings(); 
    }, [factories, showStoriesOnly])

    // useEffect => set the filtered markers on the map
    useEffect(() => {
        if (factories.length > 0 && mapContainerRef.current) {
            // Filter the factories by the search term 
            // DO SOMETHING ...
            // ...
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
                    className='fhp-map-overlay'
                    id='fhp-map-overlay'
                    style={{ height: window.innerHeight }}
                >
                    { 
                        // Iterate over the buildings and display the pins 
                        Object.keys(buildings).map(buildingID => (
                                <div className='pin-wrapper' id={`pin-wrapper-${buildingID}`}>
                                    <BuildingPin id={buildingID} factories={buildings[buildingID].lof} left={buildings[buildingID].x} top={buildings[buildingID].y}/>
                                </div>
                            )
                        )
                    }
                </div>
                <div className='all-popup-divs-container' id='all-popup-divs-container'>

                </div>
            </div>
        </div>
    );
};

export default FactoriesMap;