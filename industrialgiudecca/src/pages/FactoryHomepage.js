// src/pages/FactoryHomepage.js
import { React, useState, useEffect } from 'react';
import '../css/FactoryHomepage.css';
import Factory from '../Factory.js';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { queryFeatures, getAttachments } from '@esri/arcgis-rest-feature-service';
import { ApiKeyManager } from '@esri/arcgis-rest-request';


/** fetchFactoriesFL(serviceURL) 
 * @abstract Fetch the "FactoriesFL" using the ArcGIS service endpoint given
 * @param {string} serviceURL 
 * @returns {dict} dictionary of the { features, attributes }
 */
async function fetchFactoriesFL(serviceURL, apiToken) { 
    try {
        
        const authentication = ApiKeyManager.fromKey(apiToken);
        const response = await queryFeatures({
            url: serviceURL,
            authentication
        });

        // Process the response and convert features into factories
        const factories = response.features.map(feature => {

            console.log(feature);

            let factory = new Factory(feature.attributes, feature.geometry);
            console.log(factory.Factory_ID);
            factory.getFactoryImage(apiToken);
            return factory;
        });
        
        // Return the list of factories
        return factories;

    } catch (error) {
        console.error('Error fetching factories:', error);
        // Return an empty array in case of error
        return [];
    }
}

function FactoryHomepage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [factories, setFactories] = useState([]);

    useEffect(() => {
        // Fetch factories when component mounts
        fetchFactoriesFL(
            'https://services7.arcgis.com/EXxkqxLvye8SbupH/arcgis/rest/services/Factories_FL_2/FeatureServer/0',
            '3NKHt6i2urmWtqOuugvr9aeK3n6iJw1W9RNI7-pibFhi8p0vzacDDnDLshWdIeWNErZtkkhC5m1WQZ2iZ0nwyk51ZX5gyW5bkiL-d7jHrGLGdoUTzvnKYk6GckbPZITI'
        )
        .then(factories => {
            setFactories(factories);
        })
        .catch(error => {
            console.error('Error fetching factories:', error);
        });
    }, []); // Empty dependency array

    return (
        <div className="factory-homepage">
            <div>
                <Sidebar isOpen={showSidebar} />
            </div>
            <main>
                <hr class="title-hr"></hr>
                <h1 id="title">La Giudecca Factories</h1>
                <hr class="title-hr"></hr>

                <section className="landscape-grid">
                    {factories.map(factory => (
                        <div className="landscape-item" key={factory.Factory_ID}>
                            <Link to={factory.link} className="landscape-link">
                                <div id={factory.Factory_ID} className="landscape-placeholder"></div>
                            </Link>
                            <h2>{factory.English_Name}</h2>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}


export default FactoryHomepage;