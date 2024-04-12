/** src/pages/BasicFactoryTemplate.js
 * 
 * @abstract
 * 
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar.js';
import { featureLayerServiceURLs } from '../GlobalConstants.js';
import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import Title from '../components/Title.js';
import Gallery from '../components/Photo/Gallery.js';
import { factoryStoryMapURLs } from '../GlobalConstants.js';

import '../css/components/Gallery.css';
import '../css/components/Photo.css';
import '../css/BasicFactoryTemplate.css';

function BasicFactoryTemplate() {
    const { Factory_ID } = useParams();
    const [coverPicURL, setCoverPicURL] = useState('');
    const [imgURLs, setAllImgURLs] = useState([]);
    const [storymapURL, setStorymapURL] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);
    const [title, setTitle] = useState('');

    // Set viewport to the top of the page since React is sus
    window.scrollTo({ 
        top: 0
    });

    let removeGrid = false;
    let factory = null;

    // useEffect => get the details for this factory to init the page
    useEffect(() => { 
        // Use fetchFactoriesFL with a filter to get the preliminary data for just the factory ID passed
        sDPTFetchFactoriesFL(
            featureLayerServiceURLs['Factory'],
            `Factory_ID = ${Factory_ID}`
        )
        .then(factories => {
            
            // Since we used a primary key as the filter, there is only one result
            factory = factories[0];
            factory.getAllFactoryImageURLs()
            .then(allImgURLs => { 
                factory.coverPicURL = allImgURLs[0];  // Cover img is the first attachment
                setCoverPicURL(factory.coverPicURL);  // Set the cover img on the title
                setTitle(factory.English_Name);       // Set the title as the english name
                setAllImgURLs(allImgURLs);            // Set the gallery images
            })
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
        const gridContainer = document.getElementById('grid-container');    // Element for the grid 
        const storyboardContainer = document.getElementById('storyboard');  // Element for the storyboard

        // Conditional: if removeGrid and gridContainer exists, remove the grid and do nothing else 
        if (gridContainer && removeGrid) gridContainer.remove();
        else if (storyboardContainer && !removeGrid) { 
            // There is no storyboard - keep the grid, remove the storyboard, and populate the grid
            storyboardContainer.remove();

            // Populate the grid 
            // DO SOMETHING ... 
            // ... 
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
                        allImgURLsPromise={imgURLs}
                    />
            </div>

            {/* Grid container for basic factory details if applicable */}
            <div id='grid-container'>
                <div class='grid-item' id='image-panel'> 
                    <img id='factory-image' />
                </div>

                <div class='grid-item' id='table-panel'> 
                    <table id='factory-table'>

                    </table>
                </div>

                <div class='grid-item' id='description-panel'> 
                </div>
            </div>

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