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
                    <img src='landoHeadshot.jpg' />
                    </div>
                    <div className='row-content-container'>
                        <h1 className='row-title'>Dr. Pietro Lando</h1>
                        <p className='about-content'>
                            Born in Lido di Venezia, where he has always lived, he graduated in Biological Sciences, in
                            Padua in 1978, and in History, in Venice in 2001.
                            Historian of industrial Venice at the turn of the 20th century, he published:
                        </p>
                        <p className='about-content'>
                            2013 Le ali di Venezia (fifty years of twentieth-century Venetian history as seen through the vicissitudes of aviation) for the publisher Il Poligrafo of Padua,

                            2023 the volume Giudecca dedicated to the history of the island in the 20th century, for the publisher Il Poligrafo of Padua,

                            2018 I primi tumultuosi anni del Lido di Venezia da Fisola a Spada (dedicated to the origin of the tourism in Venice Lido), for the publisher El Squero of Venice, and

                            2024  Ferro, Carbone e Vapore. L’antimito di Venezia industriale 1880-1917 (concerning the origins of the industrial revolution in Venice) in, edited by L. Zan, Storia, sviluppo e sostenibilità. Venezia un caso particolare, for the publisher Il Mulino of Bologna.

                        </p>

                        <p className='about-content'>
                            He collaborates with the universities of Venice and Bologna in connection with his
                            researches on Venice at the turn of the 19th and 20th centuries.
                        </p>
                    </div>
                </div>

                {/* Row 2 (left align) */}
                <div className='about-row l'>
                    <div className='row-content-container'>
                        <h1 className='row-title'>Fabio Carrera & SerenDPT</h1>
                        <p className='about-content'>
                            This project would not have been possible without the work and support of Fabio Carerra and SerenDPT.
                            Professor Carerra, the Director at WPI’s Venice Project Center and Founder of SerenDPT,
                            worked with us and the other teams throughout our experience to provide feedback and guidance on our projects.
                            We are extremely grateful for his support.

                        </p>

                        <p className='about-content'>
                            In addition to Professor Carerra, the SerenDPT staff, including Gianluca, Aurora, and Marco, were incredibly helpful throughout this journey.
                            They worked with us to accurately translate the site’s content into Italian and made sure we had a positive, memorable experience in Venice.
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
                        <h1 className='row-title'>The Industrial Giudecca Team</h1>
                        <p className='about-content'>
                            The Industrial Giudecca Team, composed of four students with diverse backgrounds: Tim is majoring in management engineering; Mary is pursuing a double major
                            in biomedical engineering and mechanical engineering; Justin and Parker are computer science majors; together, we worked with
                            Dr. Lando, our advisors Rick Vaz and Chrys Demetry, SerenDPT staff, and a variety of
                            Venetian organizations to aggregate data and tell the lost history of industry on Giudecca.
                        </p>

                        <p className='about-content'>
                            We cannot over-explain the impact of our project advisors Rick Vaz and Chrys Demetry. Throughout the semester, they guided, encouraged, and supported us in our goals; their feedback and
                            support for our work were paramount to our success.
                            We are incredibly grateful for the time and effort they put in to help us grow as students and teammates.
                        </p>

                        <p className='about-content'>
                            We would like to give a special thank you to our sponsor, Dr. Pietro Lando, for providing his book Giudecca and for sharing his passion for preserving a place with such a rich history. In addition to his passion, his knowledge and expertise was fundamental to our data collection and in telling the history of industry on Giudecca.

                            Dr. Lando went above and beyond acting as a normal sponsor; he helped us enjoy our time in Venice outside the project by recommending places to see, eat, and experience in and around the lagoon. He elevated our time here by sharing his knowledge of the area beyond Giudecca's industrial history.

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