// src/pages/FactoryHomepage.js
import { React, useState, useEffect, useRef } from 'react';
import '../css/FactoryHomepage.css';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import Title from '../components/Title.js';
import SplitPane, { Pane } from 'react-split-pane';

import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import { sDPTFactoriesTableURL } from '../GlobalConstants.js';

function FactoryHomepage() {
    const [factories, setFactories] = useState([]);
    const [filteredFactories, setFilteredFactories] = useState([]);
    const [mapClicked, setMapClicked] = useState(false);
    const [resizerClicked, setResizerClicked] = useState(false);
    const iframeRef = useRef(null);

    // Main
    useEffect(() => {
        // Fetch factories FL
        sDPTFetchFactoriesFL(sDPTFactoriesTableURL)
            .then(factories => {
                // For each factory, get the cover image URL
                factories.forEach(factory => {
                    factory.getCoverImageURL();
                });
                // Set the factories on the page
                setFactories(factories);
                setFilteredFactories(factories);
            })
            // Handle errors
            .catch(error => {
                console.error('Error fetching factories:', error);
            });
    }, []); // Empty dependency array

    const handleSearch = (searchTerm) => {
        // If the search term is empty, show all factories
        if (searchTerm.trim() === '') setFilteredFactories(factories);

        // Else conduct the search
        else {
            // Setup Fuse.js options
            const options = {
                includeScore: true,
                keys: ['English_Name'], // Specify the keys to search in
                threshold: 0.3,         // Set a higher threshold for more specific matches
                matchAllTokens: true,   // Require all words in the search term to be present
                distance: 100,          // Set a lower distance for more specific matches
            };

            const fuse = new Fuse(factories, options);      // Create a new instance of Fuse.js with the factories data and options
            const result = fuse.search(searchTerm);         // Perform the search
            const filtered = result.map(item => item.item); // Map the search result back to the factories array
            setFilteredFactories(filtered);
        }
    };

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (iframeRef.current && !iframeRef.current.contains(event.target)) {
                setMapClicked(false);
            }
        };

        if (mapClicked) {
            document.addEventListener('click', handleDocumentClick);
        }

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [mapClicked]);

    const handleMapClick = () => {
        setMapClicked(true);
    };

    const handleResizerMouseDown = () => {
        setResizerClicked(true);
    };

    const handleResizerMouseUp = () => {
        setResizerClicked(false);
    };

    return (
        <div className={`factory-homepage ${resizerClicked ? 'resizer-clicked' : ''}`}>
            <div><Sidebar/></div>
            <div><Title title='Factories'/></div>
            <div><SearchBar onSearch={handleSearch}/></div>

            <SplitPane
                split="vertical"
                minSize={0}
                defaultSize={1000}
                resizerClassName="custom-resizer"
                onResizerMouseDown={handleResizerMouseDown}
                onResizerMouseUp={handleResizerMouseUp}
            >
                <Pane>
                    <div className="map-container">
                        <iframe
                            ref={iframeRef}
                            id="webMap"
                            title="ArcGIS Map"
                            className={`arcgis-app ${mapClicked ? '' : 'no-pointer-events'}`}
                            src="https://w-p-i.maps.arcgis.com/apps/instant/sidebar/index.html?appid=50cfe053ec2c4890b3f44f5cef7dc327"
                            frameBorder="0"
                            style={{ border: "0" }}
                            onMouseDown={handleMapClick}
                        >
                            iFrames are not supported on this page.
                        </iframe>
                    </div>
                </Pane>
                <Pane>
                    <div className="factory-list-container">
                        <div className="factory-list">
                            {filteredFactories.map(factory => (
                                <div className="landscape-item" key={factory.Factory_ID}>
                                    <Link to={factory.link} className="landscape-link">
                                        <img id={factory.Factory_ID} src={factory.coverPicURL}
                                             alt={factory.English_Name} className="landscape-placeholder factory-image"/>
                                    </Link>
                                    <h2>{factory.English_Name}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </Pane>
            </SplitPane>
        </div>
    );
}

export default FactoryHomepage;