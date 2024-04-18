// src/pages/FactoryHomepage.js

import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';

import Title from '../components/Title.js';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import { fetchFactoriesFL } from '../ArcGIS.js';
import FactoriesMap from '../components/FactoriesMap.js';
import { factoryStoryMapURLs } from '../GlobalConstants';

import '../css/FactoryHomepage.css';

function FactoryHomepage() {
    const [factories, setFactories] = useState([]);
    const [filteredFactories, setFilteredFactories] = useState([]);
    const [showStoriesOnly, setShowStoriesOnly] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0 });
        fetchFactoriesFL()
            .then(factories => {
                setFactories(factories);
                setFilteredFactories(factories);
            })
            .catch(error => {
                console.error('Error fetching factories:', error);
            });
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === '') {
            console.log('no search term');
            setFilteredFactories(factories);
        } else {
            const options = {
                includeScore: true,
                keys: ['English_Name', 'Italian_Name'],
                threshold: 0.3,
                matchAllTokens: true,
                distance: 100,
            };

            const fuse = new Fuse(factories, options);
            const result = fuse.search(searchTerm);
            const filtered = result.map(item => item.item);
            setFilteredFactories(filtered);
        }
    };

    const handleMarkerClick = (factoryId) => {
        const clickedFactory = factories.find(factory => factory.Factory_ID === factoryId);
        setFilteredFactories([clickedFactory]);
    };

    const toggleShowStoriesOnly = () => {
        setShowStoriesOnly(prevState => {
            const newState = !prevState;
            if (newState) {
                // Filter factories with stories
                const factoriesWithStories = factories.filter(factory => factory.Factory_ID in factoryStoryMapURLs);
                setFilteredFactories(factoriesWithStories);
            } else {
                // Show all factories
                setFilteredFactories(factories);
            }
            return newState;
        });
    };

    return (
        <div className="factory-homepage">
            {/* Title and sidebar */}
            <Title title='Industrial Sites' titleColor='rgb(134,134,134,0.7)' imgSrc='stuckyHome.jpg'/>
            <Sidebar/>

            {/* Search bar that sticks to the top of the page after scrolling past the title */}
            {/* Button to toggle showing only factories with stories */}
            <div className="search-bar-container">
                <SearchBar onSearch={handleSearch}/>
                <button className="toggle-stories-button" onClick={toggleShowStoriesOnly}>
                    {showStoriesOnly ? 'Show All Factories' : 'Show Factories with Stories'}
                </button>
            </div>

            {/* FactoriesMap component containing the map with markers to click on */}
            <FactoriesMap
                factories={filteredFactories}
                onMarkerClick={handleMarkerClick}
                showStoriesOnly={showStoriesOnly}
            />



            {/* Grid of factories after the map that changes when a search is conducted */}
            <div className="factory-list-container">
                <div className="factory-list">
                    {filteredFactories.map(factory => (
                        <div className="landscape-item" key={factory.Factory_ID}>
                            <Link to={factory.link} className="landscape-link">
                                <img
                                    id={factory.Factory_ID}
                                    src={factory.coverPicURL}
                                    alt={factory.English_Name}
                                    className="landscape-placeholder factory-image"
                                />
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