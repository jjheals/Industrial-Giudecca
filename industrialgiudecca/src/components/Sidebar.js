// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';

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
                            <Link class="sidebar-link" to="/factory" onClick={toggleSidebar}>Factories</Link>
                        </li>

                        <li className="sidebar-element">
                            <Link class="sidebar-link" to="/photos" onClick={toggleSidebar}>Photos</Link>
                        </li>
                        <li className="sidebar-element">Data Sheets</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;