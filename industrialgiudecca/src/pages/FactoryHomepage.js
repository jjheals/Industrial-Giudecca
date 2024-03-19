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
        // Authentication for ArcGIS API
        const authentication = ApiKeyManager.fromKey(apiToken);
        const response = await queryFeatures({
            url: serviceURL,
            authentication
        });

        // Process the response and convert features into factories
        const factories = response.features.map(feature => {
            let factory = new Factory(feature.attributes, feature.geometry);
            factory.getFactoryImage(apiToken);
            return factory;
        });
        
        // Return the list of factories
        return factories;

    } catch (error) {
        console.error('Error fetching factories:', error);
        return [];  // Return an empty array in case of error
    }
}

function FactoryHomepage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [factories, setFactories] = useState([]);

    const apiKey = '3NKHt6i2urmWtqOuugvr9XXpmJaJ2RIkDkWhTqUtRJ5eb3vxJXVbeDs_5N6Iquttxd2prsMurr8vzphx--41FWENCL5fNhJUY-J3o968IgTa_jWTuws4jC5SFVrwVC-A';

    useEffect(() => {
        // Fetch factories FL when component mounts
        fetchFactoriesFL(
            'https://services7.arcgis.com/EXxkqxLvye8SbupH/arcgis/rest/services/Factories_FL_2/FeatureServer/0',
            apiKey
        )
        .then(factories => {
            // Set the factories on the page
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
                <h1 id="title">Giudecca Factories</h1>
                <hr class="title-hr"></hr>

                <section className="landscape-grid">
                    {factories.map(factory => (
                        <div className="landscape-item" key={factory.Factory_ID}>
                            <Link to={factory.link} className="landscape-link">
                                <img id={factory.Factory_ID} class="landscape-placeholder factory-image"></img>
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