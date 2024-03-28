import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import '../css/BasicFactoryTemplate.css';

import { useParams } from 'react-router-dom';
import { sDPTFactoriesTableURL } from '../GlobalConstants.js';
import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import Title from '../components/Title.js';

function BasicFactoryTemplate() {

    const { Factory_ID } = useParams();
    const [showSidebar, setShowSidebar] = useState(false);
    let imgUrl = '';
    let factoryName = '';

    useState(() => { 
        // Use fetchFactoriesFL with a filter to get the preliminary data for just the factory ID passed
        sDPTFetchFactoriesFL(
            sDPTFactoriesTableURL,
            `Factory_ID = ${Factory_ID}`
        )
        .then(factories => {
            // Since we used a primary key as the filter, there is only one result
            const factory = factories[0];
            
            // Get the factory english name 
            factoryName = factory.English_Name;
            document.getElementById('title').innerHTML = factoryName;

            // Get all the images for this factory and then use the cover img (index 0) as the image on the page
            factory.getAllFactoryImageURLs()
            .then(allImgURLs => { 
                imgUrl = allImgURLs[0];
                document.getElementById('factory-image').src = imgUrl;
            });
        })
        .catch(error => {
            console.error('Error fetching details for factory:', error);
        });
    }, []);

    return (
        <div className="main-container">
            <div><Sidebar isOpen={showSidebar}/></div>
            <div><Title title={ factoryName }/></div>

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