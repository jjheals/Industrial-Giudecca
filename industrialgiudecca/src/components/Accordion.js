// src/components/Accordion.js

/** { Component } Accordion
 * 
 * @abstract The Accordion displays the most prominant factories (i.e. those with full stories). The links in the accordion lead to the dedicated
 * page for that factory. 
 * 
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Accordion.css';

const Accordion = () => {
    const [activeTab, setActiveTab] = useState(null);

    // Define an array of factory objects, each with a name, id, and route
    const factories = [
        { id: 1, name: "Stucky", route: "/stucky" },
        { id: 2, name: "Fortuny", route: "/fortuny" },
        { id: 3, name: "Junghans", route: "/junghans" },
        { id: 4, name: "Hérion", route: "/herion" },
        { id: 5, name: "Dreher", route: "/dreher" },
    ];

    const toggleTab = (index) => {
        setActiveTab(activeTab === index ? null : index);
    };

    return (
        <div className="accordion">
            {factories.map((factory) => (
                <div
                    key={factory.id}
                    className={`accordion-tab ${activeTab === factory.id ? 'active' : ''} hoverable`}
                    onMouseEnter={() => toggleTab(factory.id)}
                    onMouseLeave={() => toggleTab(null)}
                >
                    <div className="accordion-title">{factory.name}</div>
                    <div className="accordion-content">
                        <Link
                            to={factory.route}
                            className="content-link"
                        >
                            <img
                                id="frontImage"
                                src={`${process.env.PUBLIC_URL}/${factory.name}.jpeg`} // Make sure these images are named correctly
                                alt={factory.name}
                            />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;