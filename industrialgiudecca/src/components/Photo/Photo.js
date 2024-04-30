// src/components/Photo/Photo.js

/** { Component } Photo
 * @abstract the Photo component is displayed in the Gallery. It contains the image src and citation information.
 * 
 * @param { String } photoClass - the class for this photo object
 * @param { String } photoID - the ID for this photo object
 * @param { String } photoAlt - the alt text for this photo 
 * @param { String } photoSrc - the SRC link
 * @param { String } photoCitation - the citation info for this photo 
 * 
 * @exports 
 *      @const { Component } Photo 
 * 
 */
import React, { useState } from 'react';

// Stylesheets
import '../../css/components/Photo.css';

const Photo = ({ photoClass, photoID, photoAlt, photoKey, photoSrc, photoCitation }) => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <div className='photo-container'> 
            <img 
                className={photoClass}
                id={`photo-${photoID}`}
                key={photoKey}
                alt={photoAlt}
                src={photoSrc}
            />
            <img
                    className='info-icon'
                    id={`info-${photoID}`}
                    src={`/info-icon.jpeg`}
                    onClick={() => togglePopup(photoID)}
                    style={{ 
                        left: '1vw',
                        top: '1vh'
                    }}
            />
            
            <div className={`popup ${isPopupVisible ? 'show' : 'hide'}`} id={ `popup-${photoID}` } style={{  }}>
                <p className='popup-content'>{ photoCitation }</p>
            </div>
            
        </div>
    );
};

export default Photo;

