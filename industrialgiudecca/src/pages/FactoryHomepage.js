// src/pages/FactoryHomepage.js
import { React, useState, useEffect } from 'react';
import '../css/FactoryHomepage.css';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

import { fetchFactoriesFL } from '../ArcGIS.js';
import { apiKey, factoriesServiceURL } from '../GlobalConstants.js';

function FactoryHomepage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [factories, setFactories] = useState([]);
    
    // Main
    useEffect(() => {

        // Fetch factories FL when component mounts
        fetchFactoriesFL(
            factoriesServiceURL,
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