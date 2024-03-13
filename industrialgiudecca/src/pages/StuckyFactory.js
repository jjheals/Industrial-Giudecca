// src/pages/StuckyFactory.js
import React from 'react';
import '../css/StuckyFactory.css';
import { Link } from 'react-router-dom';

function StuckyFactory() {
    return (
        <div className="stucky-factory">
            <header>
                <h1>Welcome to the Stucky Factory</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/factory-homepage">Factory Homepage</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section className="factory-info">
                    <div className="factory-image-container">
                        <p>Picture goes here</p>
                    </div>
                    <div className="factory-description">
                        <h2>About Stucky Factory</h2>
                        <p>
                            The Stucky Factory is cool.
                        </p>
                    </div>
                </section>



            </main>
        </div>
    );
}

export default StuckyFactory;