// src/components/Sidebar.js

/** { Component } Sidebar
 *
 * @abstract The SideBar is the primary sidebar menu that appears on every page in the top left corner. It can be toggled and contains links
 * to the other pages.
 *
 */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/components/Sidebar.css';
import LanguageSelector from '../components/LanguageSelector';
import { LanguageContext } from '../context/LanguageContext.js';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, language } = useContext(LanguageContext);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="sidebar-container">
            <button className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>

            </button>


            <div className={`sidebar ${isOpen ? 'open' : ''}`}>

                <nav>
                    <ul>
                        <li className="sidebar-element">
                            <Link class="sidebar-link" to="/" onClick={toggleSidebar}>{t("sideBarHome")}</Link>
                        </li>

                        <li className="sidebar-element">
                            <Link class="sidebar-link" to="/industrial-sites" onClick={toggleSidebar}>{t("sideBarIndustrial")}</Link>
                        </li>

                        <li className="sidebar-element">
                            <Link class="sidebar-link" to="/data-explorer" onClick={toggleSidebar}>{t("sideBarDataExplorer")}</Link>
                        </li>

                        <li className="sidebar-element">
                            <Link class="sidebar-link" to="/industrial-stories" onClick={toggleSidebar}>{t("sideBarHistoricalStories")}</Link>
                        </li>

                        <li className="sidebar-element">
                            <Link class="sidebar-link" to="/map" onClick={toggleSidebar}>{t("sideBarInteractiveMap")}</Link>
                        </li>

                        <li className="sidebar-element">
                            <Link class="sidebar-link" to="/About" onClick={toggleSidebar}>{t("sideBarAbout")}</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;