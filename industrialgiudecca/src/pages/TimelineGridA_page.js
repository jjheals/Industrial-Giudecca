// src/pages/TimelineGridA.js
import React, { useState, useEffect, useRef } from 'react';

import '../css/TimelineGridA.css';

import Sidebar from '../components/Sidebar';
import TimelineGrid from '../components/TimelineGridA';


function TimelineGridA_page() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [blurbOpacity, setBlurbOpacity] = useState(1);
    const timelineRef = useRef(null);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

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
            
            <div ref={timelineRef} className="timeline-container">
                <TimelineGrid timelineRef={timelineRef}/>
            </div>

        </div>
    );
}

export default TimelineGridA_page;