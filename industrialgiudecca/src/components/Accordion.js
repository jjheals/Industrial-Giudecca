import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Accordion.css';

const Accordion = () => {
    const [activeTab, setActiveTab] = useState(null);

    // Define an array of factory objects, each with a name and id
    const factories = [
        { id: 1, name: "Stucky" },
        { id: 2, name: "Fortuny" },
        { id: 3, name: "Junghans" },
        { id: 4, name: "Hérion" },
        { id: 5, name: "Factory 5" },
    ];

    const toggleTab = (index) => {
        setActiveTab(activeTab === index ? null : index);
    };

    return (
        <div className="accordion">
            {factories.map((factory) => (
                <div
                    key={factory.id}
                    className={`accordion-tab ${activeTab === factory.id ? 'active' : ''}`}
                    onClick={() => toggleTab(factory.id)}
                >
                    <div className="accordion-title">{factory.name}</div>
                    <div className="accordion-content">
                        <Link
                            to={factory.id === 1 ? '/factory' : `#tab${factory.id}`}
                            className="content-link"
                        >
                            {factory.id === 1 ? (
                                <img
                                    id="frontImage"
                                    src={`${process.env.PUBLIC_URL}/Stucky.jpeg`}
                                    alt="Description"
                                />
                            ) : (
                                <div className="placeholder-box"></div>
                            )}

                            {factory.id === 2 ? (
                                <img
                                    id="frontImage"
                                    src={`${process.env.PUBLIC_URL}/Fortuny.jpeg`}
                                    alt="Description"
                                />
                            ) : (
                                <div className="placeholder-box"></div>
                            )}

                            {factory.id === 3 ? (
                                <img
                                    id="frontImage"
                                    src={`${process.env.PUBLIC_URL}/Junghas.jpg`}
                                    alt="Description"
                                />
                            ) : (
                                <div className="placeholder-box"></div>
                            )}

                            {factory.id === 4 ? (
                                <img
                                    id="frontImage"
                                    src={`${process.env.PUBLIC_URL}/Herion-advertisement.JPG`}
                                    alt="Description"
                                />
                            ) : (
                                <div className="placeholder-box"></div>
                            )}

                            {factory.id === 5 ? (
                                <img
                                    id="frontImage"
                                    src={`${process.env.PUBLIC_URL}/giudeccaHomePage.png`}
                                    alt="Description"
                                />
                            ) : (
                                <div className="placeholder-box"></div>
                            )}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;