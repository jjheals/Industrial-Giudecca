// src/pages/Homepage.js

import React, {useState, useEffect, useTransition} from 'react';

import '../css/Homepage.css';
import '../css/components/MapTimeline.css';

import { fetchFactoriesFL, fetchFL } from '../ArcGIS.js';
import { featureLayerServiceURLs, factoryStoryMapURLs } from '../GlobalConstants.js';
import Sidebar from '../components/Sidebar.js';
import MapTimeline from '../components/TimelineMap/MapTimeline.js';
import { useTranslation } from "react-i18next";
import "../i18n.js";
import LanguageSelector from '../components/LanguageSelector.js'

function Homepage() {
    const [blurbOpacity, setBlurbOpacity] = useState(1);
    const [showScrollArrow] = useState(false);
    const [factories, setFactories] = useState([]);
    const [storymapURL, setStorymapURL] = useState('');
    const [timeperiodsFL, setTimeperiodsFL] = useState([]);
    const { t, i18n } = useTranslation();

    // useEffect ==> init page and get all the factories and timeperiods to pass to TimelineGrid when page loads
    useEffect(() => {
        // Fetch factories FL when component mounts
        fetchFactoriesFL(featureLayerServiceURLs['Factory'])
        .then(factories => {     
            setFactories(factories);
            setStorymapURL(factoryStoryMapURLs.g);
        })
        // Handle errors
        .catch(error => {
            console.error('Error fetching factories:', error);
        });

        // Fetch timeperiods FL when component mounts
        fetchFL(featureLayerServiceURLs['Timeperiod'])
        .then(timeperiods => { 
            // Iterate over timeperiods and pass to mapTimeline
            let timeperiodsFL = timeperiods.map(dict => { 
                return dict.attributes;
            })

            // Sort the timeperiodsFL
            timeperiodsFL = timeperiodsFL.sort((a,b) => {
                if (a['Start_Date'] < b['Start_Date']) {
                    return -1; // a should come before b
                } else if (a['Start_Date'] > b['Start_Date']) {
                    return 1; // b should come before a
                } else {
                    return 0; // a and b are equal
                }
            });
            console.log('timeperiodsFL');
            console.log(timeperiodsFL);

            setTimeperiodsFL(timeperiodsFL);
        }) 
        // Handle errors
        .catch(error => {
            console.error('Error fetching timeperiods:', error);
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
                const scrollThreshold = blurbHeight * 3;        // Threshold to start fade

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
            <LanguageSelector/>


            <head>
                <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no"/>
                <meta charSet="utf-8"/>
                <title>Industrial Giudecca</title>
            </head>
            {/* Sidebar div */}
            <div><Sidebar/></div>

            {/* Title div ('blurb') */}
            <div id="blurb" style={{
                opacity: blurbOpacity,
                backgroundImage: 'url("front-image.jpeg")',
                backgroundSize: '100vw 100vh',
                backgroundAttachment: 'fixed'
            }} className={blurbOpacity <= 0 ? 'fade-out' : ''}>
                {/* Contains the logos on the top of the screen */}
                <div id='logos-container'>
                    <img id='main-logo' class='logo' src='logo.png'/>
                    <img id='wpi-logo' class='logo' src='wpi-logo.png'/>
                    <img id='sdpt-logo' class='logo' src='sdpt-logo.png'/>
                </div>

                {/* Overlay to darken the homepage front image; also contains the text for the landing screen */}
                <div className='bg-overlay'>
                    <div className="blurbRow" id="blurbTop">
                        <p className="blurbElm" id="blurbTitle">{t('blurbElmBlurbTitle')}</p>
                    </div>

                    <div className="blurbRow" id="blurbBottom">
                        <p className="blurbElm" id="blurbSubtitle">{t('blurbElmBlurbSubTitle')}</p>
                        <p className="blurbElm" id="blurbCredits">- Mario Isnenghi</p>
                    </div>

                    <div className="blurbRow" id="blurbScroll">
                        <p className="blurbElm" id="scrollText">{t('blurbElmScrollText')}</p>
                        <div className={`scrollArrow ${showScrollArrow ? 'show' : ''}`}></div>
                    </div>
                </div>
            </div>

            {/* Timeline container */}
            <div id="homepage-timeline"><MapTimeline factories={factories} timeperiods={timeperiodsFL}/></div>

            {/* Container for the section header container */}
            <div id='section-header-container' style={{
                backgroundImage: 'url("header-bg-image.jpg"',
                backgroundSize: '100% 100%',
                backgroundAttachment: 'fixed'
            }}>
                <div className='section-header-overlay' id='section-header-overlay'/>
                <div className='sb-divider'>
                    <p className='section-header'>{t("deeperDive")}</p>
                    <p className='section-header'>{t("intoIndustrialHistory")}</p>
                </div>
            </div>

            {/* Storyboard iframe from ArcGIS */}
            <iframe src={ storymapURL } width="100%"
                    height="1050v" frameBorder="0" allowFullScreen allow="geolocation"></iframe>
        </div>
    );
}

export default Homepage;