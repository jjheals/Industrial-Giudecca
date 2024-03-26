import React, { useState } from 'react';

import '../css/Photos.css';
import Sidebar from '../components/Sidebar.js';
import { factoriesServiceURL, sDPTFactoriesTableURL, sDPTImagesURL } from '../GlobalConstants.js';
import Gallery from '../components/Gallery.js';
import { sDPTFetchFactoriesFL } from '../ArcGIS';

function Photos() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [factories, setFactories] = useState([]);

    // Get all the factory IDs from ArcGIS
    useState(() => { 
        // Use fetchFactoriesFL with a filter to get the preliminary data for just the factory ID passed
        sDPTFetchFactoriesFL(sDPTFactoriesTableURL)
        .then(factories => {
            setFactories(factories);
        })
        .catch(error => {
            console.error('Error fetching details for factory:', error);
        });
    }, []);
    
    return (
        <div className='main'>
            <div><Sidebar isOpen={showSidebar}/></div>

            <hr class="title-hr"></hr>
            <h1 id="title">Photo Gallery</h1>
            <hr class="title-hr"></hr>
            <div class='spacer'></div>

            <div id='galleries-container'>
            {factories.map(factory => (
                <Gallery
                    key={factory.Factory_ID}
                    Factory_ID={factory.Factory_ID}
                    Factory_Name={factory.English_Name}
                    allImgURLsPromise={factory.getAllFactoryImageURLs()}
                />
            ))}
            </div>

        </div>
    );
}

export default Photos;