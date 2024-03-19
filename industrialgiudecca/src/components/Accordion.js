import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Accordion.css';

const Accordion = () => {
    const [activeTab, setActiveTab] = useState(null);

    const toggleTab = (index) => {
        setActiveTab(activeTab === index ? null : index);
    };

    return (
        <div className="accordion">
            {[1, 2, 3, 4, 5].map((tabNumber) => (
                <div
                    key={tabNumber}
                    className={`accordion-tab ${activeTab === tabNumber ? 'active' : ''}`}
                    onClick={() => toggleTab(tabNumber)}
                >
                    <div className="accordion-title">Factory {tabNumber}</div>
                    <div className="accordion-content">
                        <Link
                            to={tabNumber === 1 ? '/factory' : `#tab${tabNumber}`}
                            className="content-link"
                        >
                            {tabNumber === 1 ? (
                                <img
                                    id="frontImage"
                                    src={`${process.env.PUBLIC_URL}/Stucky.jpeg`}
                                    alt="Description"
                                />
                            ) : (
                                <div className="placeholder-box"></div>
                            )}

                            {tabNumber === 2 ? (
                                <img
                                    id="frontImage"
                                    src={`${process.env.PUBLIC_URL}/Fortuny.jpeg`}
                                    alt="Description"
                                />
                            ) : (
                                <div className="placeholder-box"></div>
                            )}

                            {tabNumber === 3 ? (
                                <img
                                    id="frontImage"
                                    src={`${process.env.PUBLIC_URL}/Junghas.jpg`}
                                    alt="Description"
                                />
                            ) : (
                                <div className="placeholder-box"></div>
                            )}

                            {tabNumber === 4 ? (
                                <img
                                    id="frontImage"
                                    src={`${process.env.PUBLIC_URL}/giudeccaHomePage.png`}
                                    alt="Description"
                                />
                            ) : (
                                <div className="placeholder-box"></div>
                            )}

                            {tabNumber === 5 ? (
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