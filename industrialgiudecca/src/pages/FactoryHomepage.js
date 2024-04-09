// src/pages/FactoryHomepage.js
import { React, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';

import '../css/FactoryHomepage.css';
import Title from '../components/Title.js';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import { sDPTFactoriesTableURL } from '../GlobalConstants.js';
import FactoriesMap from '../components/FactoriesMap.js';

function FactoryHomepage() {
    const [factories, setFactories] = useState([]);
    const [filteredFactories, setFilteredFactories] = useState([]);
    const [factoriesList, setFactoriesList] = useState([]);

    // Main
    useEffect(() => {
        // Fetch factories FL
        sDPTFetchFactoriesFL(sDPTFactoriesTableURL)
            .then(factories => {

                // For each factory, get the cover image URL
                factories.forEach(factory => {
                    factory.getCoverImageURL();
                    factory.getFactoryCoords();
                });
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

    return (
        <div className="factory-homepage">
            <Title title='Factories' imgSrc='stuckyHome.jpg'/>
            
            <div><Sidebar/></div>
            
            <div className="search-bar-container"><SearchBar onSearch={handleSearch}/></div>
            <FactoriesMap factories={ factories } />

            <div className="factory-list-container"> 
                <div className="factory-list">
                    {filteredFactories.map(factory => (
                        <div className="landscape-item" key={factory.Factory_ID}>
                            <Link to={factory.link} className="landscape-link">
                                <img id={factory.Factory_ID} src={factory.coverPicURL}
                                        alt={factory.English_Name}
                                        className="landscape-placeholder factory-image"/>
                            </Link>
                            <h2>{factory.English_Name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FactoryHomepage;