// src/pages/TimelineGridB.js
import React, { useState, useEffect, useRef } from 'react';

import '../css/Homepage.css';
import '../css/TimelineGridB.css';

import Sidebar from '../components/Sidebar';
import Accordion from '../components/Accordion';

import TimelineGrid from '../components/TimelineGridB';


function TimelineGridA_page() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [blurbOpacity, setBlurbOpacity] = useState(1);
    const [showScrollArrow, setShowScrollArrow] = useState(false);
    const timelineRef = useRef(null);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const blurbElement = document.getElementById('blurb');
            if (blurbElement) {
                const blurbHeight = blurbElement.offsetHeight;
                const scrollThreshold = blurbHeight * 0.7;

                if (scrollPosition < scrollThreshold) {
                    const opacity = 1 - scrollPosition / scrollThreshold;
                    setBlurbOpacity(opacity);
                } else {
                    setBlurbOpacity(0);
                }
            }

            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercentage = scrollPosition / (documentHeight - windowHeight);

            const fibonacciSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
            const fibonacciIndex = Math.floor(scrollPercentage * fibonacciSequence.length);
            const fibonacciNumber = fibonacciSequence[fibonacciIndex];
            const imageWidth = 100 - (fibonacciNumber / 89) * 50;

            const frontImage = document.getElementById('frontImage');
            if (frontImage) {
                frontImage.style.width = `${imageWidth}%`;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="homepage">
            <header>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Judson"/>

                <link rel="stylesheet" href="https://js.arcgis.com/4.28/esri/themes/light/main.css"/>
                <script src="https://js.arcgis.com/4.28/"></script>
                <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
                <script type="module" src="https://js.arcgis.com/calcite-components/1.9.2/calcite.esm.js"></script>
                <link rel="stylesheet" type="text/css"
                      href="https://js.arcgis.com/calcite-components/1.9.2/calcite.css"/>
                <link rel="stylesheet" href="../static/index.css"/>
            </header>

            <head>
                <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no"/>
                <meta charSet="utf-8"/>
                <title>Industrial Giudecca</title>
            </head>

            <div>
                <Sidebar isOpen={showSidebar}/>
            </div>

            <div id='logos-container'>
                <img id='main-logo' class='logo' src='logo.png' />
                <img id='wpi-logo' class='logo' src='wpi-logo.png' />
                <img id='sdpt-logo' class='logo' src='sdpt-logo.png' />
            </div>
            
            <div id="blurb" style={{opacity: blurbOpacity}} className={blurbOpacity <= 0 ? 'fade-out' : ''}>
                <div className="blurbRow" id="blurbTop">
                    <hr className="blurbDivider"></hr>
                    <p className="blurbElm" id="blurbTitle">Industrial Giudecca</p>
                    <p className="blurbElm" id="blurbSubtitle">"A history without memory."</p>
                    <p className="blurbElm" id="blurbCredits">- Mario Marinoni</p>
                    <hr className="blurbDivider"></hr>
                </div>
                <div className="blurbRow" id="blurbBottom">
                    <p className="blurbElm" id="blurbText">
                        This website tells the story of industry on Giudecca.
                    </p>
                </div>
                <div className="blurbRow" id="blurbScroll">
                    <p className="blurbElm" id="blurbScrollText">Scroll to Learn More</p>
                    <div className={`scrollArrow ${showScrollArrow ? 'show' : ''}`}></div>
                </div>
            </div>


            <div ref={timelineRef} className="timeline-container">
                <TimelineGrid timelineRef={timelineRef}/>
            </div>

            <div className="accordion-container">
                <Accordion/>
            </div>

            <body>
            <div className="container">
                <div className="mapContainer">
                    <iframe
                        id="webMap"
                        className="arcgis-app"
                        src="https://w-p-i.maps.arcgis.com/apps/instant/sidebar/index.html?appid=50cfe053ec2c4890b3f44f5cef7dc327"
                        frameBorder="0"
                        style={{border: "0"}}
                    >
                        iFrames are not supported on this page.
                    </iframe>
                </div>

                <div className="appsContainer">
                    <iframe
                        id="employmentTimeline"
                        className="arcgis-app"
                        src="https://w-p-i.maps.arcgis.com/apps/instant/slider/index.html?appid=38a761e7a47c4d67ae22ce2976531b4c"
                        frameBorder="0"
                        style={{border: "0"}}
                    >
                        iFrames are not supported on this page.
                    </iframe>
                </div>
            </div>
            </body>
        </div>
    );
}

export default TimelineGridA_page;