// src/pages/FactoryHomepage.js
import { React, useState, useEffect } from 'react';
import '../css/FactoryHomepage.css';
import '../Factory.js';
import Sidebar from '../components/Sidebar';

import { Link } from 'react-router-dom';
import { queryFeatures, getAttachments } from '@esri/arcgis-rest-feature-service';
import { ApiKeyManager } from '@esri/arcgis-rest-request';

class Factory { 

    /** Factory(attributes, geometry)
     * @abstract 
     * @param {dict} attributes 
     * @param {dict} geometry 
     */
    constructor(attributes, geometry) { 
        this.OBJECTID = attributes.OBJECTID;
        this.Opening_Date = attributes.Opening_Date;
        this.Closing_Date = attributes.Closing_Date;
        this.English_Name = attributes.English_Name;
        this.Italian_Name = attributes.Italian_Name;
        this.Factory_Description = attributes.Factory_Description;
        this.Max_Employment = attributes.Max_Employment;
        this.Factory_ID = attributes.Factory_ID;
        this.Factory_Active = attributes.Factory_Active;
        this.Building_ID = attributes.Building_ID;
        this.x_coord = geometry.x;
        this.y_coord = geometry.y;

        const name = attributes.English_Name;
        if(name == null) { 
            this.link = `/id-${attributes.Factory_ID}`;
        } else { 
            this.link = `/${name.toLowerCase().replace(/ /g, '-')}`;
        }
    }

    toString() { 
        let s = `Factory: ${this.English_Name} (${this.Factory_ID})\n`;
        s += `\tOpening Date: ${this.Opening_Date}\n`;
        s += `\tClosing Date: ${this.Closing_Date}\n`;
        s += `\tEnglish Name: ${this.English_Name}\n`;
        s += `\tItalian Name: ${this.Italian_Name}\n`;
        s += `\tFactory Description: ${this.Factory_Description}\n`;
        s += `\tMax Employment: ${this.Max_Employment}\n`;
        s += `\tFactory ID: ${this.Factory_ID}\n`;
        s += `\tFactory Active: ${this.Factory_Active}\n`;
        s += `\tBuilding ID: ${this.Building_ID}\n`;
        s += `X Coord: ${this.x_coord}\n`;
        s += `Y Coord: ${this.y_coord}\n`;
        return s;
    }
}

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