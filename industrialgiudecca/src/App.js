// src/App.js
import './App.css';
import Sidebar from './components/Sidebar';
import React, { useState } from 'react';
import './css/Sidebar.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FactoryHomepage from './pages/FactoryHomepage';
import StuckyFactory from './pages/StuckyFactory';

function App() {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <Router>
            <div className="App">
                <header>

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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
                                <div id="blurb">
                                    <div class="blurbRow" id="blurbTop"> 
                                        <hr class="blurbDivider"></hr>
                                        <p class="blurbElm" id="blurbTitle">La Giudecca</p>
                                        <p class="blurbElm" id="blurbSubtitle">History without memory.</p>
                                        <hr class="blurbDivider"></hr>
                                    </div>
                                    <div class="blurbRow" id="blurbBottom"> 
                                        <p class="blurbElm" id="blurbText">
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