// src/pages/About.js

/** AboutPage
 * @abstract Renders the AboutPage and all its content at the relative route "/about". Takes no parameters. 
 * 
 * NOTE: all content for this page is hardcoded for simplicity. It should not need to change frequently, if ever, since it only
 * contains factual information about the project sponsor (Dr. Lando), the sponsoring organization (SerenDPT), the project center
 * director (Fabio Carerra), and the Industrial Giudecca team (Justin, Mary, Tim, Parker) and its Sponsors (Rick Vaz & Chrys Demetry). 
 * This page does not contain any dynamic data that needs to be updated. 
 */
import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar.js';
import Footer from '../components/Footer.js';

import LanguageSelector from '../components/LanguageSelector.js';
import { LanguageContext } from '../context/LanguageContext.js';

import Title from '../components/Title.js';
import '../css/AboutPage.css';

function AboutPage() {
    const {t, language} = useContext(LanguageContext);

    const learnMoreClick = () => { 
        window.open('https://sites.google.com/view/industrialgiudecca/home', '_blank');
    }
    
    window.scrollTo({ 
        top: 0
    });
    
    return (
        <div className="about-page">

            {/* Language selector if a language has not yet been chosen this session */}
            {sessionStorage.getItem('hasSelectedLanguage') == 'false' ? <LanguageSelector /> : ''}

            <div><Sidebar selected='sideBarAbout'/></div>
            <div><Title title={ t('aboutTitle') } imgSrc={ 'about-title-img.png' } /></div>

            <div className='about-container'> 

                {/* Row 0 (project overview) */}
                <div className='about-row c'> 
                    <div className='row-content-container' id='project-overview-row'>
                        <h1 className='row-title'>Project Overview</h1>
                        <p className='about-content'>
                            Digitizing historical data is a process that has been made possible through advancements in modern technology. Digital databases 
                            allow researchers and historians to access copious amounts of information and data; moreover, the digitization of data provides 
                            easier access to a wider range of audiences. For this project, we seized an opportunity to digitize data about social, cultural, 
                            and economic history. We created a digital database and designed a digital platform to provide users with information about Giudecca’s 
                            industrial history. It is our hope that this project inspires future work to explore solutions for preserving delicate, culturally 
                            significant histories.
                        </p>
                    </div>
                </div>

                {/* Row 1 (right align) */}
                <div className='about-row r'>
                    <div className='content-img-container'>
                    <img src='lando-1.png' />
                    </div>
                    <div className='row-content-container'>
                        <h1 className='row-title'>Dr. Pietro Lando</h1>
                        <p className='about-content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p className='about-content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p className='about-content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>

                {/* Row 2 (left align) */}
                <div className='about-row l'>
                    <div className='row-content-container'>
                        <h1 className='row-title'>Fabio Carrera & SerenDPT</h1>
                        <p className='about-content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p className='about-content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p className='about-content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className='content-img-container sdpt'>

                        {/*
                        <div className='content-img-row sdpt'>
                            <img className='content-img sdpt logo' src='sdpt-logo.png' />
                        </div>
                        */}

                        <div className='content-img-row sdpt'>
                            <div className='content-img-subrow'>
                                <img className='content-img sdpt' src='fabio.jpeg' />
                                <p className='content-img-caption'>Fabio Carerra</p>
                            </div>
                            <div className='content-img-subrow'>
                                <img className='content-img sdpt' src='gianluca.jpeg' />
                                <p className='content-img-caption'>Gianluca Coró</p>
                            </div>
                            
                        </div>

                        <div className='content-img-row sdpt'>
                            <div className='content-img-subrow'>
                                <img className='content-img sdpt' src='aurora.jpeg' />
                                <p className='content-img-caption'>Aurora del Sordo</p>
                            </div>
                            <div className='content-img-subrow'>
                                <img className='content-img sdpt' src='marco.jpeg' />
                                <p className='content-img-caption'>Marco Bertoldi</p>
                            </div>
                        </div>
                        
                    </div>
                </div>

                {/* Row 3 (right align) */}
                <div className='about-row r'>
                    <div className='content-img-container'>
                        <img src='wpi-logo.png' className='content-img logo'/>
                    </div>
                    <div className='row-content-container'>
                        <h1 className='row-title'>WPI & The Industrial Giudecca Team</h1>
                        <p className='about-content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p className='about-content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <p className='about-content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className='about-page-footer'>
                <button className='about-learn-more' onClick={learnMoreClick}>
                    Click to learn more about our process and journey
                </button>
            </div>
            
            <Footer />
        </div>
    );
}

export default AboutPage;