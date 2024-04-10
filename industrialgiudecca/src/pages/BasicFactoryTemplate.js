import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar.js';
import { sDPTFactoriesTableURL } from '../GlobalConstants.js';
import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import Title from '../components/Title.js';
import Gallery from '../components/Photo/Gallery.js';

import '../css/components/Gallery.css';
import '../css/components/Photo.css';
import '../css/BasicFactoryTemplate.css';

function BasicFactoryTemplate() {
    const { Factory_ID } = useParams();
    const [coverPicURL, setCoverPicURL] = useState('');
    const [imgURLs, setAllImgURLs] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [title, setTitle] = useState('');

    console.log(`Factory_ID: ${Factory_ID}`);

    useState(() => { 
        // Use fetchFactoriesFL with a filter to get the preliminary data for just the factory ID passed
        sDPTFetchFactoriesFL(
            sDPTFactoriesTableURL,
            `Factory_ID = ${Factory_ID}`
        )
        .then(factories => {
            console.log(factories);
            
            // Since we used a primary key as the filter, there is only one result
            const factory = factories[0];
            factory.getAllFactoryImageURLs()
            .then(allImgURLs => { 
                // Set the title 
                factory.coverPicURL = allImgURLs[0];  // Cover img is the first attachment
                setCoverPicURL(factory.coverPicURL);  // Set the cover img on the title
                setTitle(factory.English_Name);       // Set the title as the english name
                setAllImgURLs(allImgURLs);
            })
        })
        .catch(error => {
            console.error('Error fetching details for factory:', error);
        });
    }, []);

    return (
        <div className="main-container">
            <div><Sidebar isOpen={showSidebar}/></div>
            <div><Title title={ title } imgSrc={ coverPicURL }/></div>
            <div className='f-gallery-container'>
                    <Gallery
                        key={Factory_ID}
                        Factory_ID={Factory_ID}
                        allImgURLsPromise={imgURLs}
                    />
            </div>
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
        </div>
    );
}

export default BasicFactoryTemplate;