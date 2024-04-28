// src/pages/InteractiveMap.js

import React, { useState } from 'react';

import Sidebar from '../components/Sidebar.js';
import { mapInstantAppURL } from '../GlobalConstants.js';
import '../css/InteractiveMap.css'; // Import the CSS file

/** InteractiveMap
 * @abstract Renders the fullscreen interactive ArcGIS map at the relative path "/map". Takes no parameters. Note that the map is
 * intentionally not ~completely~ fullscreen so that the sidebar has room at the top of the screen. The URL for the ArcGIS instant
 * app service is defined in src/GlobalConstants.js => mapInstantAppURL
 */
function InteractiveMap() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleMapLoad = () => {
        setLoading(false);
    };

    return (
        <div className="map-page">
            <div><Sidebar selected='sideBarMap'/></div>
            {loading ? (
                <div className="loading-screen">
                    <div className="loading-screen-content">
                        <h2>Loading...</h2>
                        <div className="spinner"></div>
                    </div>
                </div>
            ) : null}
            <iframe src={ mapInstantAppURL }
                    frameBorder="0"
                    className="map-iframe"
                    style={{ display: loading ? 'none' : 'block' }}
                    allowFullScreen
                    onLoad={handleMapLoad}
            >iFrames are not supported on this page.</iframe>
        </div>
    );
}

export default InteractiveMap;