// src/components/Title.js

/**  { Component } Title
 *
 * @abstract Title is a component to standardize the titles as they display on each page. 
 * @param {str} title - the title to display (verbatim)
 * 
 */
import React, { useEffect, useState, useContext } from 'react';
import '../css/components/Title.css';

import { LanguageContext } from '../context/LanguageContext.js';

const Title = (title) => {
    const [titleOpacity, setTitleOpacity] = useState(1);
    const { t, language } = useContext(LanguageContext);  

    // useEffect ==> title fade in and out logic
    useEffect(() => {
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // Blurb fade in/out logic
            const titleElm = document.getElementById('title-container');
            if (titleElm) {
                const titleHeight = titleElm.offsetHeight;  // Get the blurb height offset
                const scrollThreshold = titleHeight * 1.2;      // Threshold to start fade

                // Check the scroll position and update opacity as necessary
                if (scrollPosition < scrollThreshold) {
                    const opacity = 1 - scrollPosition / scrollThreshold;
                    setTitleOpacity(opacity);
                } else {
                    setTitleOpacity(0);
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
        <div id='title-container' className={titleOpacity <= 0 ? 'fade-out' : ''} style={{ opacity: titleOpacity, backgroundImage: `url("${title.imgSrc}")`, backgroundSize: "100% 100%", backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
            <div class="title-inner" style={{ backgroundColor: title.titleColor }}> 
                <h1 className="title" id="title">{ title.title }</h1>
            </div>
            <div className="title-footer">
                <p>{ t('scrollToLearnMore') }</p>
            </div>
        </div>
    );
};

export default Title;
