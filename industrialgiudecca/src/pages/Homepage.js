// src/pages/Homepage.js

import React, { useState, useEffect } from 'react';
import '../css/Homepage.css';
import '../css/components/MapTimeline.css';

import { sDPTFetchFactoriesFL } from '../ArcGIS.js';
import { sDPTFactoriesTableURL } from '../GlobalConstants.js';

import Sidebar from '../components/Sidebar';
import MapTimeline from '../components/TimelineMap/MapTimeline.js';

function Homepage() {
    const [blurbOpacity, setBlurbOpacity] = useState(1);
    const [showScrollArrow] = useState(false);
    const [factories, setFactories] = useState([]);

    // useEffect ==> init page and get all the factories to pass to TimelineGrid when page loads
    useEffect(() => {
        // Fetch factories FL when component mounts
        sDPTFetchFactoriesFL(sDPTFactoriesTableURL)
        .then(factories => {       
            setFactories(factories);
        })
        // Handle errors
        .catch(error => {
            console.error('Error fetching factories:', error);
        });
    }, []); // Empty dependency array

    useEffect(() => {
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // Blurb fade in/out logic
            const blurbElement = document.getElementById('blurb');
            if (blurbElement) {
                const blurbHeight = blurbElement.offsetHeight;  // Get the blurb height offset
                const scrollThreshold = blurbHeight * 0.7;      // Threshold to start fade

                // Check the scroll position and update opacity as necessary
                if (scrollPosition < scrollThreshold) {
                    const opacity = 1 - scrollPosition / scrollThreshold;
                    setBlurbOpacity(opacity);
                } else {
                    setBlurbOpacity(0);
                }
            }
        };

        // Add an event handler to control the blur in/out  
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="homepage" style={{ backgroundImage: 'url("water-bg.png")', backgroundSize: '100% 100%' }}>
            <header>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Judson"/>
                <link rel="stylesheet" href="https://js.arcgis.com/4.28/esri/themes/light/main.css"/>
                <link rel="stylesheet" type="text/css" href="https://js.arcgis.com/calcite-components/1.9.2/calcite.css"/>
                <link rel="stylesheet" href="../static/index.css"/>

                <script src="https://js.arcgis.com/4.28/"></script>
                <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
                <script type="module" src="https://js.arcgis.com/calcite-components/1.9.2/calcite.esm.js"></script>
            </header>

            <head>
                <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no"/>
                <meta charSet="utf-8"/>
                <title>Industrial Giudecca</title>
            </head>

            <div id="blurb" style={{ opacity: blurbOpacity, backgroundImage: 'url("front-image.jpeg")', backgroundSize: '70vw 100vh' }} className={blurbOpacity <= 0 ? 'fade-out' : ''}>
                <div id='logos-container'>
                    <img id='main-logo' class='logo' src='logo.png' />
                    <img id='wpi-logo' class='logo' src='wpi-logo.png' />
                    <img id='sdpt-logo' class='logo' src='sdpt-logo.png' />
                </div>

                <div className='bg-overlay'>    
                    <div className="blurbRow" id="blurbTop">
                        <p className="blurbElm" id="blurbTitle">Industrial Giudecca</p>
                    </div>
                    
                    <div className="blurbRow" id="blurbBottom">
                        <p className="blurbElm" id="blurbSubtitle">"A history without memory."</p>
                        <p className="blurbElm" id="blurbCredits">- Mario Marinoni</p>
                    </div>

                    <div className="blurbRow" id="blurbScroll">
                    <p className="blurbElm" id="scrollText">This platform tells the story of industry on Giudecca.</p>
                        <div className={`scrollArrow ${showScrollArrow ? 'show' : ''}`}></div>
                    </div>
                </div>
            </div>
            
            <div><Sidebar /></div>

            <div id="homepage-timeline"><MapTimeline factories={ factories }/></div>

            <div className='section-header-container'>
                <hr className='section-hr'></hr>
                <div className='sb-divider'><p className='section-header'>Let's take a deeper dive into the history of Giudecca ...</p></div>
                <hr className='section-hr'></hr>
            </div>
            
            <iframe className="storyboard-iframe" src="https://storymaps.arcgis.com/stories/d6072e65094c49269316d897de0cb258" width="100%" height="500px" frameborder="0" allowfullscreen allow="geolocation"></iframe>
        </div>
    );
}

export default Homepage;