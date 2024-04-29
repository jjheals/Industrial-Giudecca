// src/pages/IndustrialStoriesPage.js

/** IndustrialStoriesPage
 * @abstract Renders the page containing outlinks to all the historical storymaps at the relative path "/industrial-stories". Takes no parameters.
 * This page serves as a jump-off point for the other historical stories. The content is minimal and intentionally simplistic. 
 */
import React, { useState, useEffect, useContext } from 'react';

import Sidebar from '../components/Sidebar.js';
import { factoryStoryMapURLs, featureLayerServiceURLs } from '../GlobalConstants.js';
import LanguageSelector from '../components/LanguageSelector.js';
import { LanguageContext } from '../context/LanguageContext.js';
import Title from '../components/Title.js';
import { fetchFL } from '../ArcGIS.js';
import Footer from '../components/Footer.js';

import '../css/IndustrialStories.css';

function IndustrialStoriesPage() {
    const [allStorymaps, setAllStoryMaps] = useState({});
    const {t, language} = useContext(LanguageContext);
    const [selectedStorymap, setSelectedStorymap] = useState('');
    const [selectedID, setSelectedID] = useState(0);

    const sideComponentBg = 'var(--obsidian-color)';           // Background of the side components by default
    const selectedSideComponentBg = 'var(--obsidian-accent-color)';     // Background color of the currently selected side component

    /** changeSelectedStorymap(id) 
     * @abstract changes the currently selected storymap by updating the state variables selectedStorymap and selectedId
     * @param { int } id 
     * @returns { null }
     */
    function changeSelectedStorymap(id) { 
        if(id == selectedID) return;

        document.getElementById(`top-component-${id}`).style.backgroundColor = selectedSideComponentBg;
        document.getElementById(`top-component-${selectedID}`).style.backgroundColor = sideComponentBg;

        setSelectedStorymap(allStorymaps[id]['Storymap_URL']);
        setSelectedID(id);
    }

    // Set viewport to the top of the page since React is sus
    useEffect(() => { 
        window.scrollTo({ 
            top: 0
        })
    }, []);

    // usEffect => fetch the storymap and factory data when the page loads
    useEffect(() => {
        let isMounted = true;
    
        const fetchData = async () => {
            let storymaps = {};
    
            // Construct the where filter for fetchFL 
            let s = '';
            Object.keys(factoryStoryMapURLs).forEach(factoryID => { 
                if(parseInt(factoryID)) s += `Factory_ID = ${factoryID} OR `;
            })
            
            // Remove the extra OR
            s = s.slice(0, -3);
    
            // Fetch the feature layer
            const factories = await fetchFL(featureLayerServiceURLs['Factory'], s);
            
            // Check that DOM is mounted 
            if (isMounted) {
                // Iterate over the factories and add to storymaps 
                factories.forEach(factory => { 
                    const closingYear = factory.attributes.Closing_Year === 9999 ? 'Present' : factory.attributes.Closing_Year;

                    const thisDict = { 
                        'Factory_Name': language == 'en' ? factory.attributes['English_Name'] : factory.attributes['Italian_Name'],
                        'Factory_ID': factory.attributes['Factory_ID'],
                        'Storymap_URL': factoryStoryMapURLs[factory.attributes['Factory_ID']][language],
                        'Cover_Image_URL': factory.attributes.Cover_Image_ArcGIS_URL,
                        'Years': `(${factory.attributes.Opening_Year} - ${closingYear})`,
                        'Desc': factory.attributes.Factory_Description
                    }
                    storymaps[factory.attributes['Factory_ID']] = thisDict;
                });
    
                setSelectedID(storymaps[Object.keys(storymaps)[0]]['Factory_ID']);
                setAllStoryMaps(storymaps);

                setSelectedStorymap(storymaps[Object.keys(storymaps)[0]]['Storymap_URL']);
            }
        };
    
        fetchData();
    
        return () => { isMounted = false; };
    }, [language]); 
    
    useEffect(() => { 
        const scrollAmount = 450;
        const rightScrollArrow = document.getElementById('stories-scroll-right-arrow');
        const leftScrollArrow = document.getElementById('stories-scroll-left-arrow');
        const container = document.querySelector('.stories-top-container');
    
        // Add event listener to the right scroll arrow
        rightScrollArrow.addEventListener('click', function() {
            // Scroll the container to the right
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Add event listener to the left scroll arrow
        leftScrollArrow.addEventListener('click', function() {
            // Scroll the container to the right
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth' // Add smooth scrolling effect
            });
        });
    }, [])
    

    return (
        <div className="industrial-stories-page">
            {/* Language selector if a language has not yet been chosen this session */}
            {sessionStorage.getItem('hasSelectedLanguage') == 'false' ? <LanguageSelector /> : ''}

            {/* Title and sidebar */}
            <div><Sidebar selected='sideBarHistoricalStories'/></div>
            <div><Title title={ t('industrialStoriesTitle') } titleColor={ 'rgba(0,0,0,0.3' } imgSrc={ 'stories-page-head.jpeg' } /></div>       

            {/* Side container with the list of factories and a small image */}
            <div className='stories-top-container'>
                {/* Iterate over all the storymap dictionaries and set the top components */}
                {
                    Object.entries(allStorymaps).map(([factoryID, d]) => {
                        return(
                            <div className='stories-top-component' style={{ backgroundColor: sideComponentBg }} id={`top-component-${factoryID}`} onClick={() => changeSelectedStorymap(factoryID)}>
                                <div className='stories-top-img' 
                                        style={
                                        { 
                                            backgroundImage: `url("${d['Cover_Image_URL']}")`, 
                                            backgroundSize: '100% 100%' 
                                        }
                                    }
                                />
                                <div className='stories-top-component-text'>
                                    <h1 className='stories-top-component-title'>{d['Factory_Name']}</h1>
                                    <h2 className='stories-top-component-years'>{d['Years']}</h2>
                                    <p className='stories-top-desc'>{d['Desc']}</p>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
            <div className='stories-scroll-arrow' id='stories-scroll-right-arrow'></div>
            <div className='stories-scroll-arrow' id='stories-scroll-left-arrow'></div>

            {/* Container for the storymap iframe */}
            <div className='storymap-container'>
                <iframe src={ selectedStorymap } frameBorder={0} className='stories-storymap-iframe'/>
            </div>
            
            <Footer />
        </div>
    );
}

export default IndustrialStoriesPage;