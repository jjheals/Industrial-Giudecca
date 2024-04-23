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

import '../css/IndustrialStories.css';

function IndustrialStoriesPage() {
    const [allStorymaps, setAllStoryMaps] = useState({});
    const {t, language} = useContext(LanguageContext);
    const [selectedStorymap, setSelectedStorymap] = useState('');
    const [selectedID, setSelectedID] = useState(0);

    const sideComponentBg = 'rgb(179, 179, 179)';           // Background of the side components by default
    const selectedSideComponentBg = 'rgb(255,179,255)';     // Background color of the currently selected side component

    /** changeSelectedStorymap(id) 
     * @abstract changes the currently selected storymap by updating the state variables selectedStorymap and selectedId
     * @param { int } id 
     * @returns { null }
     */
    function changeSelectedStorymap(id) { 
        if(id == selectedID) return;

        document.getElementById(`side-component-${id}`).style.backgroundColor = selectedSideComponentBg;
        document.getElementById(`side-component-${selectedID}`).style.backgroundColor = sideComponentBg;

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
                    const thisDict = { 
                        'Factory_Name': language == 'en' ? factory.attributes['English_Name'] : factory.attributes['Italian_Name'],
                        'Factory_ID': factory.attributes['Factory_ID'],
                        'Storymap_URL': factoryStoryMapURLs[factory.attributes['Factory_ID']][language],
                        'Cover_Image_URL': factory.attributes.Cover_Image_ArcGIS_URL,
                        'Years': `(${factory.attributes.Opening_Year} - ${factory.attributes.Closing_Year})`
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
    
    return (
        <div className="industrial-stories-page">
            {/* Language selector if a language has not yet been chosen this session */}
            {sessionStorage.getItem('hasSelectedLanguage') == 'false' ? <LanguageSelector /> : ''}

            {/* Title and sidebar */}
            <div><Sidebar /></div>
            <div><Title title={ t('industrialStoriesTitle') } titleColor={ 'rgba(0,0,0,0.3' } imgSrc={ 'stories-page-head.jpeg' } /></div>       

            {/* Main container for this page */}
            <div className='stories-container'>
                {/* Side container with the list of factories and a small image */}
                <div className='stories-side-container'>
                    {/* Iterate over all the storymap dictionaries and set the side components */}
                    {
                        Object.entries(allStorymaps).map(([factoryID, d]) => {
                            return(
                                <div className='stories-side-component' style={{ backgroundColor: sideComponentBg }} id={`side-component-${factoryID}`} onClick={() => changeSelectedStorymap(factoryID)}>
                                    <div className='stories-side-img' 
                                         style={
                                            { 
                                                backgroundImage: `url("${d['Cover_Image_URL']}")`, 
                                                backgroundSize: '100% 100%' 
                                            }
                                        }
                                    />
                                    <div>
                                        <h1 className='story-side-component-title'>{d['Factory_Name']}</h1>
                                        <h2 className='story-side-component-years'>{d['Years']}</h2>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                {/* Container for the storymap iframe */}
                <div className='storymap-container'>
                    <iframe src={ selectedStorymap } frameBorder={0} className='stories-storymap-iframe'/>
                </div>
            </div>
            
        </div>
    );
}

export default IndustrialStoriesPage;