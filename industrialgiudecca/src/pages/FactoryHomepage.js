// src/pages/FactoryHomepage.js
import React from 'react';
import '../css/FactoryHomepage.css';
import { Link } from 'react-router-dom';

function FactoryHomepage() {

    /** fetchFactoriesFL(serviceURL) 
     * @abstract Fetch the "FactoriesFL" using the ArcGIS service endpoint given
     * @param {string} serviceURL 
     * @returns {dict} dictionary of the { features, attributes }
     */
    async function fetchFactoriesFL(serviceURL) { 
        try {
            // Hit arcGIS service endpoint to get the feature layer data
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy service URL
            const response = await fetch(proxyUrl + featureLayerUrl);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
        } 

        console.log(response);

        // Extract the json from the response 
        const layerJson = await response.json();

        // Validate data format 
        if (!layerJson.hasOwnProperty('fields') || !layerJson.hasOwnProperty('features')) { 
            throw new Error('Invalid FL format.');
        }

        // Extract the attribute fields
        const fields = layerJson.fields.map(field => field.name);

        // Extract the attribute data 
        const attributes = layerJson.features.map(feature => { 
            const attribute = {};
            fields.forEach(field => { 
                attribute[field] = layerJson.features.attributes[field];
            }); 
        })

        // Format and return fields and attributes
        return { fields, attributes };

        // Catch errors
        } catch(error) { 
            console.log("Error fetching FL data.", error);
            return null;
        }
    }

    

    const featureLayerUrl = 'https://services7.arcgis.com/EXxkqxLvye8SbupH/arcgis/rest/services/Factories_FL_2/FeatureServer';
    console.log("Fetching FL data")

    fetchFactoriesFL(featureLayerUrl)
    .then(data => {
        if (data) {
        console.log('Attribute fields:', data.fields);
        console.log('Attribute data:', data.attributes);
        
        // Convert to CSV format or perform other operations
        // Example: Convert to CSV
        const csv = data.fields.join(',') + '\n' +
                    data.attributes.map(attribute => data.fields.map(field => attribute[field]).join(',')).join('\n');
        console.log('CSV:', csv);
        }
    });






    const landscapeData = [
        { id: 1, name: 'Stucky Factory', link: '/stucky-factory' },
        { id: 2, name: 'Factory 2', link: '/factory2' },
        { id: 3, name: 'Factory 3', link: '/factory3' },
        { id: 4, name: 'Factory 4', link: '/factory4' },
        { id: 5, name: 'Factory 5', link: '/factory5' },
        { id: 6, name: 'Factory 6', link: '/factory6' },
        { id: 7, name: 'Factory 7', link: '/factory7' },
        { id: 8, name: 'Factory 8', link: '/factory8' },
        { id: 9, name: 'Factory 9', link: '/factory9' },
    ];

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
                    {landscapeData.map((landscape) => (
                        <div className="landscape-item" key={landscape.id}>

                            <Link to={landscape.link} className="landscape-link">
                                <div className="landscape-placeholder"></div>
                            </Link>
                            <h2>{landscape.name}</h2>
                        </div>
                    ))}
                </section>
            </main>
        </div>


    );
}

export default FactoryHomepage;