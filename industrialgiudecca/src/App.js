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
            <head>
                
            </head>

            <div><Sidebar isOpen={showSidebar}/></div>
            <div id="blurb"><p>History without memory</p></div>

            <img id="frontImage" src={`${process.env.PUBLIC_URL}/stuckyHome.jpg`} alt="Description"/>
            <body>
                <div class="container">
                    <div class="mapContainer">
                        <iframe
                            id="webMap"
                            class="arcgis-app"
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

export default App;