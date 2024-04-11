/** src/pages/BasicFactoryTemplate.js
 * 
 * @abstract
 * 
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar.js';
import Title from '../components/Title.js';

import '../css/components/Gallery.css';
import '../css/components/Photo.css';
import '../css/BasicFactoryTemplate.css';

function StoryPage() {
    const { Story_ID } = useParams();
    const [coverPicURL, setCoverPicURL] = useState('');
    const [imgURLs, setAllImgURLs] = useState([]);
    const [storymapURL, setStorymapURL] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);
    const [title, setTitle] = useState('');

    return (
        <div className="story-page">
            <div><Sidebar isOpen={showSidebar}/></div>
            <div><Title title={ 'Redentorre Festival' } imgSrc={ 'Stucky.jpeg' }/></div>

        </div>
    );
}

export default StoryPage;