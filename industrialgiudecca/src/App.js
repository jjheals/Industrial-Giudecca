import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import React, { useState } from 'react';
import './css/Sidebar.css';

function App() {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="App">
            <header>

            </header>

            {showSidebar && <Sidebar />}

            <main>
                <head>
                    <meta charSet="utf-8" />

                    <title>Industrial Giudecca</title>

                    <link rel="stylesheet" href="https://js.arcgis.com/4.28/esri/themes/light/main.css" />

                    <script src="https://js.arcgis.com/4.28/"></script>

                    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

                    <script type="module" src="https://js.arcgis.com/calcite-components/1.9.2/calcite.esm.js"></script>

                    <link rel="stylesheet" type="text/css" href="https://js.arcgis.com/calcite-components/1.9.2/calcite.css" />

                    <link rel="stylesheet" href="../static/index.css" />
                </head>

                <body>
                <div id="site-title"><h1>Industrial Giudecca</h1></div>

                <iframe
                    id="webMap"
                    src="https://w-p-i.maps.arcgis.com/apps/instant/sidebar/index.html?appid=50cfe053ec2c4890b3f44f5cef7dc327"
                    frameBorder="0"
                    style={{ border: "0" }}
                >
                    iFrames are not supported on this page.
                </iframe>

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
                </body>
            </main>
        </div>
    );
}

export default App;