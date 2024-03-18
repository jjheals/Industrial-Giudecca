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
                    className="factory-image-container"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/Junghas.jpg)`,
                    }}
                ></div>
            </header>
        </div>
    );
}

export default Photos;