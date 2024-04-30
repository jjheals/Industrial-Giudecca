// src/components/FactoriesMap.js

/** { Component } FactoriesMap
 * @abstract FactoriesMap is the map that is displayed on the IndustrialSites page that contains pins for every building and a side popup
 * container that displays information about the factories that existed at a building when the pin is clicked. 
 * 
 * @param { Object } factories - feature layer of factories to show on the map
 * @param { String } searchTerm - search term to filter by 
 * @param { Boolean } showStoriesOnly - bool whether to show only factories with stories
 * @param { Function } t - translation function to retrieve the correct text
 * 
 * @exports
 *      @const { Component } FactoriesMap
 */
import React, { useRef, useEffect, useState } from 'react';
import '../../css/components/FactoriesMap.css';

import { featureLayerServiceURLs, factoryStoryMapURLs } from '../../GlobalConstants.js';
import { fetchFL, latLongToPixel } from '../../ArcGIS.js';
import { BuildingPin } from './BuildingPin.js';

const FactoriesMap = ({ factories, searchTerm, showStoriesOnly, t }) => {
    // Refs for accessing DOM elements
    const pageRef = useRef(null);
    const mapContainerRef = useRef(null);
    const clickedMarkerRef = useRef(null);
    const [buildings, setBuildings] = useState([]);         // Array of all the buildings (as dicts)
    const [hoveredPin, setHoveredPin] = useState(null);     // The currently hovered/clicked pin that displays info on the side

    // Event handler for clicking a marker on the map
    const clickMarker = (marker) => {
        
        const clickedId = marker.target.id.split('-')[1];   // Get the ID of the clicked marker
        if(clickedId == hoveredPin) return;                 // If the clicked ID is the same as the previously displayed building, do nothing

        // Get the clicked marker element
        const popupElm = document.getElementById(`bpopup-div-${clickedId}`);

        // Remove the previously hovered pin if it exists
        if(hoveredPin) document.getElementById(`bpopup-div-${hoveredPin}`).classList.remove('is-hovered');

        // Set the new hovered pin
        setHoveredPin(clickedId);
        popupElm.classList.add('is-hovered');
    };

    // useEffect => fetch buildings and factories data
    useEffect(() => {
        const fetchData = async () => {
            // Fetch the Building FL to get the building locations and IDs
            const buildings = await fetchFL(featureLayerServiceURLs['Building'])
            .then(p => {
                return p.map(d => {
                    return d.attributes;
                });
            });

            // If we are filtering by factories with stories, then create a 'where' filter for the fetchFL function
            let whereFilter = '';
            if (showStoriesOnly) {

                // Get the IDs for the factories that have stories
                const factoriesWithStories = Object.keys(factoryStoryMapURLs);

                // Construct the WHERE clause 
                factoriesWithStories.map(fid => {
                    if (parseInt(fid)) whereFilter += `Factory_ID = ${fid} OR `;
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

            // Filter the factories based on factoryStoryMapURLs
            const factoriesWithStories = factories.filter(factory => factoryStoryMapURLs[factory.Factory_ID]);

            // Create a dictionary to map Building_IDs to an array of Factory_IDs
            let mapBuildingsToFactories = {};
            buildings.map(building => {

                // Map the building's lat/long to x/y
                const buildingPos = latLongToPixel(building.Latitude_, building.Longitude_, window.innerWidth, window.innerHeight);

                // Get the factories that are at this building
                const thisBuildingID = building.Building_ID;
                let theseFactories = [];

                // Filter the factory IDs to those that are at this building
                const theseFactoryIDs = factoryAtBuilding.filter(r => r.Building_ID === thisBuildingID);
                if (theseFactoryIDs.length > 0) {
                    
                    // For each of these factory ids, add them to theseFactories according to the showStoriesOnly param
                    theseFactoryIDs.map(r => {
                        let thisFactory = null;                 // Init thisFactory as null
                        const thisFactoryID = r.Factory_ID;     // For simplicity

                        // If showStoriesOnly is True, check if this factory has a story 
                        if(showStoriesOnly) { 
                            thisFactory = factoriesWithStories.filter(f => f.Factory_ID === thisFactoryID)[0];
                        }

                        // If not showStoriesOnly, then get thisFactory's details 
                        else thisFactory = factories.filter(f => f.Factory_ID == thisFactoryID)[0];

                        // If there is a result for thisFactory, add it to the array
                        if (thisFactory) theseFactories.push(thisFactory);
                    });

                    // Add the list of factories to mapBuildingsToFactories at this building ID
                    mapBuildingsToFactories[thisBuildingID] = { x: buildingPos.x, y: buildingPos.y, lof: theseFactories };
                }
            });

            /* Filter the buildings to those that have at least one factory
             * NOTE: this automatically filters by showStoriesOnly, since we already filtered the factories down to those
             *       with stories if necessary (or kept all of them if not filtering) */
            const filteredBuildings = {};
            Object.keys(mapBuildingsToFactories).forEach(buildingID => {
                const thisBuilding = mapBuildingsToFactories[buildingID];

                if(mapBuildingsToFactories[buildingID].lof.length > 0) { 
                    filteredBuildings[buildingID] = thisBuilding;
                }
            });

            // Set the filtered buildings on the page
            setBuildings(filteredBuildings);
        };

        // Call fetchData() if factories is initialized and not empty
        if (factories && factories.length > 0) fetchData();

    }, [factories, showStoriesOnly]);

    
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
                <div className='fhp-learn-more-container'><p className='timeline-learn-more'>{t('clickToLearnMore')}</p></div>

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
                    {Object.keys(buildings).map(buildingID => (
                        <div className='pin-wrapper' id={`pin-wrapper-${buildingID}`} key={buildingID} onClick={clickMarker}>
                            <BuildingPin
                                id={buildingID}
                                factories={buildings[buildingID].lof}
                                left={buildings[buildingID].x}
                                top={buildings[buildingID].y}
                            />
                        </div>
                    ))}
                </div>
                <div className='all-popup-divs-container' id='all-popup-divs-container'>

                </div>
            </div>
        </div>
    );
};

export default FactoriesMap;