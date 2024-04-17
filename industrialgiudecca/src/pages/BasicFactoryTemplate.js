// src/pages/BasicFactoryTemplate.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar.js';
import { featureLayerServiceURLs } from '../GlobalConstants.js';
import { fetchFactoriesFL, fetchFL } from '../ArcGIS.js';
import Title from '../components/Title.js';
import Gallery from '../components/Photo/Gallery.js';
import { factoryStoryMapURLs } from '../GlobalConstants.js';
import FactoryTimeline from '../components/FactoryTimeline.js';

import '../css/components/Gallery.css';
import '../css/components/Photo.css';
import '../css/BasicFactoryTemplate.css';


/** BasicFactoryTemplate
 * @abstract Renders the page for each individual factory. Takes one parameter in the URL, "Factory_ID", and renders at the relative
 * route "/industrial-sites/:Factory_ID". The page renders with the title and cover image, a gallery, plus EITHER: 
 *      1. If there is no storymap for this factory, the page shows a data table containing raw data on this factory. 
 *      2. If there is a storymap for this factory (defined in src/GlobalConstants.js => factoryStorymapURLs[Factory_ID]), the page 
 *         shows the storymap instead of a table of data. The storymap should include a data table.  
 * @param { int } Factory_ID 
 */
function BasicFactoryTemplate() {
    const { Factory_ID } = useParams();
    const [coverPicURL, setCoverPicURL] = useState('');
    const [allAttachments, setAllAttachments] = useState([]);
    const [storymapURL, setStorymapURL] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);
    const [title, setTitle] = useState('');

    const [timeperiods, setTimeperiods] = useState([]);
    const [factoryObj, setFactoryObj] = useState(null);

    // Set viewport to the top of the page since React is sus
    window.scrollTo({ 
        top: 0
    });

    let removeGrid = false;
    let factory = null;

    // useEffect => get the details for this factory to init the page
    useEffect(() => { 
        // Use fetchFactoriesFL with a filter to get the preliminary data for just the factory ID passed
        fetchFactoriesFL(
            `Factory_ID = ${Factory_ID}`
        )
        .then(factories => {
            
            console.log('factories');
            console.log(factories);

            // Since we used a primary key as the filter, there is only one result
            factory = factories[0];
            setTitle(factory.English_Name);       // Set the title as the english name
            setCoverPicURL(factory.coverPicURL);  // Set the cover img on the title     

            fetchFL(featureLayerServiceURLs['Photo_Sources'], `Factory_ID = ${factory.Factory_ID}`)
            .then(fl => { 
                const loa = fl.map(feature => { return feature.attributes; });
                setAllAttachments(loa);
            });
        })
        .catch(error => {
            console.error('Error fetching details for factory:', error);
        });

        // Set the storymap on the page, if it exists 
        const thisStorymapURL = factoryStoryMapURLs[Factory_ID];
        if(thisStorymapURL) { 
            removeGrid = true;
            setStorymapURL(thisStorymapURL);
        }
    }, []);

    /* useEffect => Run after DOM loads - check if there's a storyboard for this factory
          - if there is a storyboard, then remove the grid and do nothing else
          - if there is not a storyboard, then keep the grid, populate it, and remove the storyboard element
    */
    useEffect(() => {
        const timelineContainer = document.getElementById('factory-timeline-container');    // Element for the grid 
        const storyboardContainer = document.getElementById('storyboard');          // Element for the storyboard

        // Conditional: if removeGrid and gridContainer exists, remove the grid and do nothing else 
        if (timelineContainer && removeGrid) timelineContainer.remove();

        // There is no storyboard - keep the timeline, remove the storyboard, and populate the timeline
        else if (storyboardContainer && !removeGrid) { 
            storyboardContainer.remove();

            // Get all the info needed for the timeline
            const thisFactory = fetchFL(featureLayerServiceURLs['Factory'], `Factory_ID = ${Factory_ID}`);
            console.log('thisFactory');
            console.log(thisFactory);

        }

    }, []);

    return (
        <div className="main-container">
            <div><Sidebar isOpen={showSidebar}/></div>
            <div><Title title={ title } imgSrc={ coverPicURL }/></div>

            {/* Gallery container under the title */}
            <div className='f-gallery-container'>
                    <Gallery
                        key={Factory_ID}
                        Factory_ID={Factory_ID}
                        allAttachments={allAttachments}
                    />
            </div>

            {/* Grid container for basic factory details if applicable */}
            <div className='factory-timeline-container'><FactoryTimeline factory={factoryObj} timeperiods={timeperiods}/></div>

            {/* ArcGIS storyboard for this factory if available */}
            <iframe 
                id="storyboard"
                className="storyboard-iframe" 
                src={ storymapURL }
                width="100%" 
                frameborder="0" 
            />
        </div>
    );
}

export default BasicFactoryTemplate;