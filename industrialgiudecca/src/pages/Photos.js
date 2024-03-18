import React, { useEffect, useState, useRef } from 'react';

import { Link } from 'react-router-dom';

function Photos() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(true);


    return (
        <div className="photos">
            <header className={headerVisible ? '' : 'hidden'}>
                <h1>Photos</h1>
                <div
                    className="photo-container"
                    style={{
                        backgroundImage: `url(https://www.industrialgiudecca.com/static/images/industrial-giudecca-1.jpg)`
                    }}
                ></div>
            </header>
        </div>
    );
}

export default Photos;