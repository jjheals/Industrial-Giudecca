// src/pages/About.js

/** AboutPage
 * @abstract Renders the AboutPage and all its content at the relative route "/about". Takes no parameters. 
 * 
 * NOTE: all content for this page is hardcoded for simplicity. It should not need to change frequently, if ever, since it only
 * contains factual information about the project sponsor (Dr. Lando), the sponsoring organization (SerenDPT), the project center
 * director (Fabio Carerra), and the Industrial Giudecca team (Justin, Mary, Tim, Parker). This page does not contain any dynamic
 * data that needs to be updated. 
 */
import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar.js';

import LanguageSelector from '../components/LanguageSelector.js';
import { LanguageContext } from '../context/LanguageContext.js';

import Title from '../components/Title.js';
import '../css/AboutPage.css';

function AboutPage() {
    const {t, language} = useContext(LanguageContext);

    console.log(t);

    window.scrollTo({ 
        top: 0
    });
    
    return (
        <div className="about-page">

            {/* Language selector if a language has not yet been chosen this session */}
            {sessionStorage.getItem('hasSelectedLanguage') == 'false' ? <LanguageSelector /> : ''}

            <div><Sidebar /></div>
            <div><Title title={ t('aboutTitle') } imgSrc={ 'about-title-img.png' } /></div>

            <div class='about-container'> 

                {/* Row 1 (right align) */}
                <div class='about-row r'>
                    <div className='content-img-container'>
                    <img src='lando-1.png' />
                    </div>
                    <div class='row-content-container'>
                        <h1 class='row-title'>Dr. Pietro Lando</h1>
                        <p class='content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p class='content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p class='content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>

                {/* Row 2 (left align) */}
                <div class='about-row l'>
                    <div class='row-content-container'>
                        <h1 class='row-title'>SerenDPT & Fabio Carrera</h1>
                        <p class='content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p class='content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p class='content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className='content-img-container'>
                        <img className='content-img' src='fabio_carrera.jpeg' />
                        <img className='content-img' src='sdpt-logo.png' />
                    </div>
                </div>

                {/* Row 3 (right align) */}
                <div className='about-row r'>
                    <div className='content-img-container'>
                        <img src='wpi-logo.png' />
                    </div>
                    <div class='row-content-container'>
                        <h1 class='row-title'>WPI & The Industrial Giudecca Team</h1>
                        <p class='content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p class='content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p class='content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default AboutPage;