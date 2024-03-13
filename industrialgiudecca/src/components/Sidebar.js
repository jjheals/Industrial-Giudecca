// Sidebar.js
import React, { useState } from 'react';
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
                        <li className="sidebar-element">Factories</li>
                        <li className="sidebar-element">Ports</li>
                        <li className="sidebar-element">Photo Gallery</li>
                        <li className="sidebar-element">Data Sheets</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;