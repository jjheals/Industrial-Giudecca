// src/pages/FactoryHomepage.js
import { React, useState, useEffect } from 'react';
import '../css/FactoryHomepage.css';
import Factory from '../Factory.js';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

import fetchFactoriesFL from '../ArcGIS.js';


function FactoryHomepage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [factories, setFactories] = useState([]);

    const apiKey = '3NKHt6i2urmWtqOuugvr9UORX5H_n9tw1Y1cFzHbykS1c3JjRavkrcTw_1Y2smEaR9EdgTsKLwWrViMjE-qkeBqxPD2k_nefsniHqeqIbfEcQOEMEav7Sj3_zeRGRFWa';

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
                                <img id={factory.Factory_ID} src={factory.coverPicURL} class="landscape-placeholder factory-image"></img>
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