import { React, useState, useEffect } from 'react';
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

    useEffect(() => {
        sDPTFetchFactoriesFL(sDPTFactoriesTableURL)
            .then(factories => {
                factories.forEach(factory => {
                    factory.getCoverImageURL();
                    factory.getFactoryCoords();
                });
                setFactories(factories);
                setFilteredFactories(factories);
            })
            .catch(error => {
                console.error('Error fetching factories:', error);
            });
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === '') {
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

    return (
        <div className="factory-homepage">
            <Title title='Industrial Sites' titleColor='rgb(134,134,134,0.7)' imgSrc='stuckyHome.jpg' />
            <div>
                <Sidebar />
            </div>
            <div className="search-bar-container">
                <SearchBar onSearch={handleSearch} />
            </div>
            <FactoriesMap factories={factories} onMarkerClick={handleMarkerClick} />
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