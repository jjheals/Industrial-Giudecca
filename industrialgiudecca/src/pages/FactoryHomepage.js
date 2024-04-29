// src/pages/FactoryHomepage.js

import { React, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';

import Title from '../components/Title.js';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import { fetchFactoriesFL } from '../ArcGIS.js';
import FactoriesMap from '../components/FactoriesMap/FactoriesMap.js';
import { factoryStoryMapURLs } from '../GlobalConstants';
import Footer from '../components/Footer.js';

import LanguageSelector from '../components/LanguageSelector';
import { LanguageContext } from '../context/LanguageContext.js';

import '../css/FactoryHomepage.css';

function FactoryHomepage() {
    const { t, language } = useContext(LanguageContext);
    const [factories, setFactories] = useState([]);
    const [filteredFactories, setFilteredFactories] = useState([]);
    const [showStoriesOnly, setShowStoriesOnly] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
            
            {/* Language selector if a language has not yet been chosen this session */}
            {sessionStorage.getItem('hasSelectedLanguage') == 'false' ? <LanguageSelector /> : ''}

            {/* Title and sidebar */}
            {!isMobile && (
                <Title title={t('factoryHomepageTitle')} titleColor='rgba(0,0,0,0.4)' imgSrc='stuckyHome.jpg' />
            )}
            <Sidebar selected='sideBarIndustrial'/>

            {/* Search bar that sticks to the top of the page after scrolling past the title */}
            {/* Button to toggle showing only factories with stories */}
            <div className="search-bar-container">
                <SearchBar onSearch={handleSearch}/>
                <button className="toggle-stories-button" onClick={toggleShowStoriesOnly}>
                    {showStoriesOnly ? t('showAllFactories') : t('showFactoriesWithStories') }
                </button>
            </div>

            {/* FactoriesMap component containing the map with markers to click on */}
            <FactoriesMap
                factories={filteredFactories}
                showStoriesOnly={showStoriesOnly}
                language={language}
                t={t}
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
                            <div className='fhp-factory-details'>
                                <h1 className='fhp-factory-name'>{language == 'en' ? factory.English_Name : factory.Italian_Name}</h1>
                                <h2 className='fhp-factory-years'>{ `(${factory.Opening_Year} to ${factory.Closing_Year == 9999 ? 'Present' : factory.Closing_Year})` }</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default FactoryHomepage;