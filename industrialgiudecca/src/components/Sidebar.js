// src/components/Sidebar.js

/** { Component } Sidebar
 * 
 * @abstract The SideBar is the primary sidebar menu that appears on every page in the top left corner. It can be toggled and contains links 
 * to the other pages. 
 * 
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/components/Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                            <Link class="sidebar-link" to="/" onClick={toggleSidebar}>Home</Link>
                        </li>

                        <li className="sidebar-element">
                            <Link class="sidebar-link" to="/industrial-sites" onClick={toggleSidebar}>Industrial Sites</Link>
                        </li>

                        <li className="sidebar-element">
                            <Link class="sidebar-link" to="/data-explorer" onClick={toggleSidebar}>Data Explorer</Link>
                        </li>

                        <li className="sidebar-element">
                            <Link class="sidebar-link" to="/historical-stories" onClick={toggleSidebar}>Historical Stories</Link>
                        </li>

                        <li className="sidebar-element">
                            <Link class="sidebar-link" to="/About" onClick={toggleSidebar}>About</Link>
                        </li>

                        
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;