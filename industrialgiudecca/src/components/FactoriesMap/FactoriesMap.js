// src/components/FactoriesMap.js

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

            console.log('buildings');
            console.log(buildings);

            // If we are filtering by factories with stories, then create a 'where' filter for the fetchFL function
            let whereFilter = '';
            if (showStoriesOnly) {
                const factoriesWithStories = Object.keys(factoryStoryMapURLs);

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
                const mapHeight = '50vh';
                const buildingPos = latLongToPixel(building.Latitude_, building.Longitude_, window.innerWidth, window.innerHeight);

                // Get the factories that are at this building
                const thisBuildingID = building.Building_ID;
                let theseFactories = [];
                const theseFactoryIDs = factoryAtBuilding.filter(r => r.Building_ID === thisBuildingID);
                if (theseFactoryIDs.length > 0) {
                    
                    theseFactoryIDs.map(r => {
                        console.log('r');
                        console.log(r);

                        let thisFactory = null;
                        const thisFactoryID = r.Factory_ID;

                        if(showStoriesOnly) { 
                            thisFactory = factoriesWithStories.filter(f => f.Factory_ID === thisFactoryID)[0];
                        }
                        else thisFactory = factories.filter(f => f.Factory_ID == thisFactoryID)[0];
                        if (thisFactory) theseFactories.push(thisFactory);
                    });

                    mapBuildingsToFactories[thisBuildingID] = { x: buildingPos.x, y: buildingPos.y, lof: theseFactories };
                }
            });

            // Filter the buildings to those that have at least one factory
            // NOTE: this automatically filters by showStoriesOnly, since we already filtered the factories down to those
            // with stories if necessary (or kept all of them if not filtering)
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
                    {Object.keys(buildings).map(buildingID => (
                        <div className='pin-wrapper' id={`pin-wrapper-${buildingID}`} key={buildingID}>
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