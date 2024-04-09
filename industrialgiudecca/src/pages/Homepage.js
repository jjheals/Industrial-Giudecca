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

    // useEffect ==> blurb/title fade in and out logic
    useEffect(() => {
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // Blurb fade in/out logic
            const blurbElement = document.getElementById('blurb');
            if (blurbElement) {
                const blurbHeight = blurbElement.offsetHeight;  // Get the blurb height offset
                const scrollThreshold = blurbHeight * 3;      // Threshold to start fade

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
        <div className="homepage">

            <head>
                <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no"/>
                <meta charSet="utf-8"/>
                <title>Industrial Giudecca</title>
            </head>
            {/* Sidebar div */}
            <div><Sidebar /></div>

            {/* Title div ('blurb') */}
            <div id="blurb" style={{ opacity: blurbOpacity, backgroundImage: 'url("front-image.jpeg")', backgroundSize: '100vw 100vh', backgroundAttachment: 'fixed' }} className={blurbOpacity <= 0 ? 'fade-out' : '' }>
                {/* Contains the logos on the top of the screen */}
                <div id='logos-container'>
                    <img id='main-logo' class='logo' src='logo.png' />
                    <img id='wpi-logo' class='logo' src='wpi-logo.png' />
                    <img id='sdpt-logo' class='logo' src='sdpt-logo.png' />
                </div>

                {/* Overlay to darken the homepage front image; also contains the text for the landing screen */}
                <div className='bg-overlay'>    
                    <div className="blurbRow" id="blurbTop">
                        <p className="blurbElm" id="blurbTitle">Industrial Giudecca</p>
                    </div>
                    
                    <div className="blurbRow" id="blurbBottom">
                        <p className="blurbElm" id="blurbSubtitle">"A history without memory."</p>
                        <p className="blurbElm" id="blurbCredits">- Mario Isnenghi</p>
                    </div>

                    <div className="blurbRow" id="blurbScroll">
                    <p className="blurbElm" id="scrollText">This platform tells the story of industry on Giudecca.</p>
                        <div className={`scrollArrow ${showScrollArrow ? 'show' : ''}`}></div>
                    </div>
                </div>
            </div>
            
            {/* Timeline container */}
            <div id="homepage-timeline" ><MapTimeline factories={ factories }/></div>

            {/* Container for the section header container */}
            <div id='section-header-container' style={{ backgroundImage: 'url("header-bg-image.jpg"', backgroundSize: '100% 100%', backgroundAttachment: 'fixed' }}>
                <div className='section-header-overlay' id='section-header-overlay'/>
                <div className='sb-divider' >
                    <p className='section-header'>Let's take a deeper dive</p>
                    <p className='section-header'>into the industrial history of Giudecca ...</p>
                </div>
            </div>
            
            {/* Storyboard iframe from ArcGIS */}
            <iframe 
                className="storyboard-iframe" 
                src="https://storymaps.arcgis.com/stories/d6072e65094c49269316d897de0cb258" 
                width="100%" 
                frameborder="0" 
            />
        </div>
    );
}

export default Homepage;