// src/pages/FactoryHomepage.js
import React from 'react';
import '../css/FactoryHomepage.css';
import { Link } from 'react-router-dom';

/** fetchFactoriesFL(serviceURL) 
 * @abstract Fetch the "FactoriesFL" using the ArcGIS service endpoint given
 * @param {string} serviceURL 
 * @returns {dict} dictionary of the { features, attributes }
 */
async function fetchFactoriesFL(serviceURL, apiToken) { 
    const authentication = arcgisRest.ApiKeyManager.fromKey(apiToken);
    let factories = []

    // Hit ArcGIS service endpoint 
    arcgisRest.queryFeatures({
        url: serviceURL,
        authentication
    })

    // Handle response
    .then((response) => {
        console.log(response.features); // DEBUG

        // Convert the response's features into Factories
        response.features.forEach(feature => {
            console.log("Feature");
            console.log(feature);

            const factory = new Factory(feature.attributes, feature.geometry)
            factories.concat(factory);
            console.log(factory.toString());
        });
        document.getElementById("result").textContent = JSON.stringify(response.features, null, 2);
    });

    return factories;
}

function FactoryHomepage() {

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

            <head>
                <script src="Factory.js"></script>
            </head>

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