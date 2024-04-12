/** src/pages/BasicFactoryTemplate.js
 * 
 * @abstract
 * 
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar.js';
import { mapInstantAppURL } from '../GlobalConstants.js';


function MapPage() {
    const { Story_ID } = useParams();
    const [coverPicURL, setCoverPicURL] = useState('');
    const [imgURLs, setAllImgURLs] = useState([]);
    const [storymapURL, setStorymapURL] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);
    const [title, setTitle] = useState('');

    return (
        <div className="map-page" style={{ width: '100vw', height: '100vh' }}>
            <div><Sidebar isOpen={showSidebar}/></div>
            <iframe src={ mapInstantAppURL }
                    frameborder="0" 
                    style={{ width: '100%', height: '93vh', marginTop: '7vh' }}
                    allowfullscreen
            >iFrames are not supported on this page.</iframe>

        </div>
    );
}

export default MapPage;