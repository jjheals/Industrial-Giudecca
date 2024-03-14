// src/App.js
import './App.css';
import Sidebar from './components/Sidebar';
import React, { useState, useEffect } from 'react';
import './css/Sidebar.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FactoryHomepage from './pages/FactoryHomepage';
import StuckyFactory from './pages/StuckyFactory';

function App() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [blurbOpacity, setBlurbOpacity] = useState(1);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const blurbElement = document.getElementById('blurb');
            const blurbHeight = blurbElement.offsetHeight;
            const scrollThreshold = blurbHeight * 0.1; // Adjust the threshold as needed

            if (scrollPosition < scrollThreshold) {
                const opacity = 1 - scrollPosition / scrollThreshold;
                setBlurbOpacity(opacity);
            } else {
                setBlurbOpacity(0);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Router>
            <div className="App">
                <header>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Judson" />

                    <link rel="stylesheet" href="https://js.arcgis.com/4.28/esri/themes/light/main.css" />
                    <script src="https://js.arcgis.com/4.28/"></script>
                    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
                    <script type="module" src="https://js.arcgis.com/calcite-components/1.9.2/calcite.esm.js"></script>
                    <link rel="stylesheet" type="text/css" href="https://js.arcgis.com/calcite-components/1.9.2/calcite.css" />
                    <link rel="stylesheet" href="../static/index.css" />
                </header>

                <head>
                    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
                    <meta charSet="utf-8" />
                    <title>Industrial Giudecca</title>
                </head>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <div><Sidebar isOpen={showSidebar} /></div>
                                <div id="blurb" style={{ opacity: blurbOpacity }} className={blurbOpacity <= 0 ? 'fade-out' : ''}>
                                <div className="blurbRow" id="blurbTop">
                                        <hr className="blurbDivider"></hr>
                                        <p className="blurbElm" id="blurbTitle">La Giudecca</p>
                                        <p className="blurbElm" id="blurbSubtitle">History without memory.</p>
                                        <hr className="blurbDivider"></hr>
                                    </div>
                                    <div className="blurbRow" id="blurbBottom">
                                        <p className="blurbElm" id="blurbText">
                                            Giudecca was once the home to over 45 different factories. Despite having an amazing story,
                                            the industrial history of Giudecca is not widely known. With the help of Dr. Pietro Lando,
                                            Fabio Carrera, and SerenDPT, this website intends to enrich the story of the industrial
                                            Giudecca.
                                        </p>
                                    </div>
                                </div>
                                <Link to="/factory">
                                    <img id="frontImage" src={`${process.env.PUBLIC_URL}/stuckyHome.jpg`} alt="Description" />
                                </Link>

                                <body>
                                <div className="container">
                                    <div className="mapContainer">
                                        <iframe
                                            id="webMap"
                                            className="arcgis-app"
                                            src="https://w-p-i.maps.arcgis.com/apps/instant/sidebar/index.html?appid=50cfe053ec2c4890b3f44f5cef7dc327"
                                            frameBorder="0"
                                            style={{ border: "0" }}
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
                                            style={{ border: "0" }}
                                        >
                                            iFrames are not supported on this page.
                                        </iframe>
                                    </div>
                                </div>
                                </body>
                            </>
                        }
                    />
                    <Route path="/factory" element={<FactoryHomepage />} />
                    <Route path="/stucky-factory" element={<StuckyFactory />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;