// src/pages/HistoricalStoriesPage.js

import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar.js';
import { factoryStoryMapURLs, featureLayerServiceURLs } from '../GlobalConstants.js';
import LanguageSelector from '../components/LanguageSelector.js';
import { LanguageContext } from '../context/LanguageContext.js';
import Title from '../components/Title.js';
import '../css/IndustrialStories.css';
import { fetchFL } from '../ArcGIS.js';

/** IndustrialStoriesPage
 * @abstract Renders the page containing outlinks to all the historical storymaps at the relative path "/industrial-stories". Takes no parameters.
 * This page serves as a jump-off point for the other historical stories. The content is minimal and intentionally simplistic. 
 */
function IndustrialStoriesPage() {
    const [allStorymaps, setAllStoryMaps] = useState({});
    const {t, language} = useContext(LanguageContext);
    const [selectedStorymap, setSelectedStorymap] = useState('');

    // Set viewport to the top of the page since React is sus
    useEffect(() => { 
        window.scrollTo({ 
            top: 0
        })
    }, []);

    function changeSelectedStorymap(id) { 
        console.log(`changing to storymap ${id}`);
        setSelectedStorymap(allStorymaps[id]['Storymap_URL']);
    }

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
                        'Cover_Image_URL': factory.attributes.Cover_Image_ArcGIS_URL 
                    }
                    storymaps[factory.attributes['Factory_ID']] = thisDict;
                });
    
                console.log(storymaps);

                setAllStoryMaps(storymaps);

                console.log(storymaps[Object.keys(storymaps)[0]]['Storymap_URL']);
                setSelectedStorymap(storymaps[Object.keys(storymaps)[0]]['Storymap_URL']);
            }
        };
    
        fetchData();
    
        return () => { isMounted = false; };
    }, [language]); 
    
    

    return (
        <div className="industrial-stories-page">
            {localStorage.getItem('hasSelectedLanguage') == 'false' ? <LanguageSelector /> : ''}

            <div><Sidebar /></div>
            <div><Title title={ 'Industrial Stories' } titleColor={ 'rgba(0,0,0,0.3' } imgSrc={ 'stories-page-head.jpeg' } /></div>       

            <div className='stories-container'>
                <div className='stories-side-container'>
                    {
                        Object.entries(allStorymaps).map(([factoryID, d]) => {
                            return(
                                <div className='stories-side-component' onClick={() => changeSelectedStorymap(factoryID)}>
                                    <div className='stories-side-img' 
                                         style={
                                            { 
                                                backgroundImage: `url("${d['Cover_Image_URL']}")`, 
                                                backgroundSize: '100% 100%' 
                                            }
                                        }
                                    />
                                    <h1 className='story-side-component-title'>{d['Factory_Name']}</h1>
                                </div>
                            )
                        })
                    }

                </div>

                <div className='storymap-container'>
                    <iframe src={ selectedStorymap } className='stories-storymap-iframe'/>
                </div>
            </div>
            
        </div>
    );
}

export default IndustrialStoriesPage;