// src/pages/FactoryHomepage.js
import { React, useState, useEffect } from 'react';
import '../css/FactoryHomepage.css';
import Factory from '../Factory.js';
import Sidebar from '../components/Sidebar';
import { queryFeatures, getAttachments } from '@esri/arcgis-rest-feature-service';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { Link } from 'react-router-dom';

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

        // Use the function to get attachments for a feature
        getAttachments({
            url: "https://services7.arcgis.com/EXxkqxLvye8SbupH/arcgis/rest/services/Factories_FL_2/FeatureServer/0/2/attachments/1",
            objectId: 2, // Object ID of the feature you want to get attachments for
            params: {
                'token': "3NKHt6i2urmWtqOuugvr9VxQpnif6HTJRmHhwCX_kP7VKDCEgQQ1OPVC2doqDjIeHRharUDgPYk9SUdXbJBZAiOgjW1EmgXCAjRbmIqJ2xa4xTchDjz9_LUD0cztUh4Q"
            }
        })
        .then(response => {
            // Handle the response, which contains the attachments
            console.log(response);
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error fetching attachments:', error);
        });

        // Process the response and convert features into factories
        const factories = response.features.map(feature => {
            return new Factory(feature.attributes, feature.geometry);
        });

        // Return the list of factories
        console.log(factories);
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
            '3NKHt6i2urmWtqOuugvr9VxQpnif6HTJRmHhwCX_kP7VKDCEgQQ1OPVC2doqDjIeHRharUDgPYk9SUdXbJBZAiOgjW1EmgXCAjRbmIqJ2xa4xTchDjz9_LUD0cztUh4Q'
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
            <header>
                <h1>La Giudecca Factories</h1>
            </header>
            <main>
                <section className="landscape-grid">
                    {factories.map(factory => (
                        <div className="landscape-item" key={factory.Factory_ID}>
                            <Link to={factory.link} className="landscape-link">
                                <div className="landscape-placeholder"></div>
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