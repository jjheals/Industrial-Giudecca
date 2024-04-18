// src/pages/Homepage.js

import React, {useState, useEffect, useContext} from 'react';

import '../css/Homepage.css';
import '../css/components/MapTimeline.css';

import { fetchFactoriesFL, fetchFL } from '../ArcGIS.js';
import { featureLayerServiceURLs, factoryStoryMapURLs } from '../GlobalConstants.js';
import Sidebar from '../components/Sidebar.js';
import MapTimeline from '../components/TimelineMap/MapTimeline.js';
import LanguageSelector from '../components/LanguageSelector';
import { LanguageContext } from '../context/LanguageContext.js';

import { Link } from 'react-router-dom';

 
/** Homepage 
 * @abstract Renders the homepage at the relative route "/". Takes no parameters. Contains: 
 * - The site title, i.e. "blurb", which includes the subtitle, background img, etc
 * - A MapTimeline component that scrolls with the user's scroll. MapTimeline component is defined in src/components/MapTimeline/
 * - Header to break up the space between the MapTimeline and the historical storymap
 * - A storymap of the history of Giudecca. The URL for this storymap is defined in src/GlobalConstants.js => factoryStoryMapURLs[g]
 */
function Homepage() {
    const [blurbOpacity, setBlurbOpacity] = useState(1);        // For title fade in/out
    const [showScrollArrow] = useState(false);                  // "Scroll to learn more" title animation
    const [factories, setFactories] = useState([]);             // Factories that appear on the MapTimeline 
    const [storymapURL, setStorymapURL] = useState('');         // URL for the storymap at the bottom of the page
    const [timeperiodsFL, setTimeperiodsFL] = useState([]);     // FL for timeperiods that appear on the MapTimeline
    const [minMaxYear, setMinMaxYear] = useState({});           // Min and max year to pass to MapTimeline
    const { t, language } = useContext(LanguageContext);                   // For translation

    // useEffect ==> init page and get all the buildings, factories, and timeperiods to pass to MapTimeline when the page loads
    useEffect(() => {
        // Fetch factories FL when component mounts
        fetchFactoriesFL('')
        .then(factories => {     

            // Get the min and max year from the factories and pass it to MapTimeline
            let minYear = 9999;
            let maxYear = 0;
            factories.forEach(factory => {                 
                if(factory.Opening_Year < minYear) minYear = factory.Opening_Year;  // Check for min year
                if(factory.Closing_Year > maxYear) maxYear = factory.Closing_Year;  // Check for max year
            });
            setFactories(factories);
            setStorymapURL(factoryStoryMapURLs.g[language]);
            setMinMaxYear({ 'minYear': minYear, 'maxYear': maxYear });
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

    useEffect(() => {
        setStorymapURL(factoryStoryMapURLs.g[language]); // Update the storymapURL when the language changes
    }, [language]);

    console.log('localStorage.getItem("language")');
    console.log(localStorage.getItem('language'));
    return (
        <div className="homepage">

            <head>
                <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no"/>
                <meta charSet="utf-8"/>
                <title>Industrial Giudecca</title>
            </head>

            {localStorage.getItem('hasSelectedLanguage') == 'false' ? <LanguageSelector /> : ''}

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
                    <img id='main-logo' className='logo' src='logo.png' alt='Main Logo'/>
                    <img id='wpi-logo' className='logo' src='wpi-logo.png' alt='WPI Logo'/>
                    <img id='sdpt-logo' className='logo' src='sdpt-logo.png' alt='SDPT Logo'/>
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
            <div id="homepage-timeline"><MapTimeline factories={factories} timeperiods={timeperiodsFL}
                                                     minMaxYear={minMaxYear}/></div>

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
            <iframe src={storymapURL} width="100%"
                    height="1050v" frameBorder="0" allowFullScreen allow="geolocation"></iframe>
            <div className="factory-homepage-button-container">
                <Link to="/industrial-sites">
                    <button className="factory-homepage-button">{t("travelToIndustrialSitesButton")}</button>
                </Link>
            </div>


        </div>
    );
}

export default Homepage;