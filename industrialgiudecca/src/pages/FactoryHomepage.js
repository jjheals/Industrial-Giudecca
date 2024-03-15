// src/pages/FactoryHomepage.js
import { React, useState, useEffect } from 'react';
import '../css/FactoryHomepage.css';
import '../Factory.js';

import { Link } from 'react-router-dom';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
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
        this.Max_Employmenet = attributes.Max_Employment;
        this.Factory_ID = attributes.Factory_ID;
        this.Factory_Active = attributes.Factory_Active;
        this.Building_ID = attributes.Building_ID;
        this.x_coord = geometry.x;
        this.y_coord = geometry.y;
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

        // Process the response and convert features into factories
        const factories = response.features.map(feature => {
            return new Factory(feature.attributes, feature.geometry);
        });

        // Update UI or perform other tasks with the factories data
        //document.getElementById("result").textContent = JSON.stringify(response.features, null, 2);

        // Return the list of factories
        return factories;
    } catch (error) {
        console.error('Error fetching factories:', error);
        // Return an empty array in case of error
        return [];
    }
}

function FactoryHomepage() {
    const [factories, setFactories] = useState([]);

    useEffect(() => {
        // Fetch factories when component mounts
        fetchFactoriesFL(
            'https://services7.arcgis.com/EXxkqxLvye8SbupH/arcgis/rest/services/Factories_FL_2/FeatureServer/0',
            '3NKHt6i2urmWtqOuugvr9SAg1zBYp13RdBAvh5dkZDDl6507-joZxbRSva0s4Bc-Pihv2UoIyZRJfJRbG8tWgWDt43IIhNKxz4KJKZ3ejPGE3ln6ZFCqM-VNzPcJUICU'
        )
        .then(factories => {
            setFactories(factories);
        })
        .catch(error => {
            console.error('Error fetching factories:', error);
        });
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div className="factory-homepage">
            <header>
                <h1>Welcome to the Factory Homepage</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                    </ul>
                </nav>
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