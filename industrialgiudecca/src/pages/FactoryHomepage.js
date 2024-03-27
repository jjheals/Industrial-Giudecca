// src/pages/FactoryHomepage.js
import { React, useState, useEffect } from 'react';
import '../css/FactoryHomepage.css';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';

import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import { sDPTFactoriesTableURL } from '../GlobalConstants.js';

function FactoryHomepage() {
    const [factories, setFactories] = useState([]);
    const [filteredFactories, setFilteredFactories] = useState([]);

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
                minMatchCharLength: 3,  // Set a higher minimum match character length
            };

            const fuse = new Fuse(factories, options);      // Create a new instance of Fuse.js with the factories data and options
            const result = fuse.search(searchTerm);         // Perform the search
            const filtered = result.map(item => item.item); // Map the search result back to the factories array
            setFilteredFactories(filtered);
        }
    };


    return (
        <div className="factory-homepage">
            <div><Sidebar /></div>
            <main>
                <hr className="title-hr"></hr>
                <h1 id="title">Giudecca Factories</h1>
                <hr className="title-hr"></hr>

                <SearchBar onSearch={handleSearch} />
                
                <section className="landscape-grid">
                    {filteredFactories.map(factory => (
                        <div className="landscape-item" key={factory.Factory_ID}>
                            <Link to={factory.link} className="landscape-link">
                                <img id={factory.Factory_ID} src={factory.coverPicURL} className="landscape-placeholder factory-image"></img>
                            </Link>
                            <h2>{factory.English_Name}</h2>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default FactoryHomepage;