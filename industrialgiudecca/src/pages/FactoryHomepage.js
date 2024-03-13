// src/pages/FactoryHomepage.js
import React from 'react';
import '../css/FactoryHomepage.css';
import { Link } from 'react-router-dom';

function FactoryHomepage() {
    const landscapeData = [
        { id: 1, name: 'Factory 1', link: '/factory1' },
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