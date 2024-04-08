import React, { useState, useEffect } from 'react';
import Fuse from "fuse.js";


import Sidebar from '../components/Sidebar.js';
import { factoriesServiceURL, sDPTFactoriesTableURL, sDPTImagesURL } from '../GlobalConstants.js';

import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import SearchBar from '../components/SearchBar.js';
import Gallery from '../components/Photo/Gallery.js';
import Title from '../components/Title.js';

import '../css/Photos.css';

function Photos() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [factories, setFactories] = useState([]);
    const [filteredFactories, setFilteredFactories] = useState([]);

    // Get all the factory IDs from ArcGIS
    useEffect(() => {
        // Use fetchFactoriesFL with a filter to get the preliminary data for just the factory ID passed
        sDPTFetchFactoriesFL(sDPTFactoriesTableURL)
            .then(factories => {
                setFactories(factories);
                setFilteredFactories(factories); // Set initial filtered factories to all factories
            })
            .catch(error => {
                console.error('Error fetching details for factory:', error);
            });
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === '') {
            // If the search term is empty, show all factories
            setFilteredFactories(factories);
        } else {
            // Setup Fuse.js options
            const options = {
                includeScore: true,
                // Specify the keys to search in
                keys: ['English_Name'],
                // Set a higher threshold for more specific matches
                threshold: 0.3,
                // Require all words in the search term to be present
                matchAllTokens: true,
                // Set a lower distance for more specific matches
                distance: 100,
                // Set a higher minimum match character length
                minMatchCharLength: 3,
            };

            // Create a new instance of Fuse.js with the factories data and options
            const fuse = new Fuse(factories, options);

            // Perform the search
            const result = fuse.search(searchTerm);

            // Map the search result back to the factories array
            const filtered = result.map(item => item.item);
            setFilteredFactories(filtered);
        }
    };

    return (
        <div className='main'>
            <div><Sidebar isOpen={showSidebar}/></div>
            <div><Title title='Photo Gallery' /></div>
            <SearchBar onSearch={handleSearch} />
            
            <div className='pspacer'></div>
            
            <div id='galleries-container'>
                {filteredFactories.map(factory => (
                    <Gallery
                        key={factory.Factory_ID}
                        Factory_ID={factory.Factory_ID}
                        Factory_Name={factory.English_Name}
                        allImgURLsPromise={factory.getAllFactoryImageURLs()}
                    />
                ))}
            </div>

        </div>
    );
}

export default Photos;