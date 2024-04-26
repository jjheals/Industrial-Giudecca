// src/pages/MapPage.js

import React, { useState } from 'react';

import Sidebar from '../components/Sidebar.js';
import { mapInstantAppURL } from '../GlobalConstants.js';

/** MapPage
 * @abstract Renders the fullscreen interactive ArcGIS map at the relative path "/map". Takes no parameters. Note that the map is 
 * intentionally not ~completely~ fullscreen so that the sidebar has room at the top of the screen. The URL for the ArcGIS instant  
 * app service is defined in src/GlobalConstants.js => mapInstantAppURL 
 */
function MapPage() {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <div className="map-page" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <div><Sidebar selected='sideBarMap'/></div>
            <iframe src={ mapInstantAppURL }
                    frameborder="0" 
                    style={{ width: '100%', height: '90vh', marginTop: '9vh' }}
                    allowfullscreen
            >iFrames are not supported on this page.</iframe>

        </div>
    );
}

export default MapPage;