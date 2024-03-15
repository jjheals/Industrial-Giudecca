// src/pages/StuckyFactory.js
import React, { useEffect } from 'react';
import '../css/StuckyFactory.css';
import { Link } from 'react-router-dom';

function StuckyFactory() {
    useEffect(() => {
        const handleScroll = () => {
            const imageContainer = document.querySelector('.factory-image-container');
            const scrollPosition = window.pageYOffset;
            const translateY = scrollPosition * 0.5; // Adjust the parallax speed here
            imageContainer.style.backgroundPositionY = `${translateY}px`;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="stucky-factory">
            <header>
                <h1>Welcome to the Stucky Factory</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/factory">Factory Homepage</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section className="factory-info">
                    <div
                        className="factory-image-container"
                        style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL}/stucky12.jpg)`,
                        }}
                    ></div>
                    <div className="factory-description">
                        <h2>About Stucky Factory</h2>
                        <p>
                            The Stucky Factory is cool.
                        </p>
                    </div>
                </section>

                <section className="white-space"></section>
            </main>
        </div>
    );
}

export default StuckyFactory;