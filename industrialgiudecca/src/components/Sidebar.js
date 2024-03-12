import React, { useState } from 'react';
import '../css/Sidebar.css';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="hamburger" onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <nav>
                    <ul>
                        <li class="sidebarElement">Factories</li>
                        <li class="sidebarElement">Ports</li>
                        <li class="sidebarElement">Photo Gallery</li>
                        <li class="sidebarElement">Data Sheets</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;