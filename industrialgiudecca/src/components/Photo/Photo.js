import React, { useState } from 'react';
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
            <div className='info-container' id={ `info-container-${photoID}` } >
                <img
                    className='info-icon'
                    id={`info-${photoID}`}
                    src='i-icon.png'
                    onClick={() => togglePopup(photoID)}
                />
                <div className={`popup ${isPopupVisible ? 'show' : 'hide'}`} id={ `popup-${photoID}` }>
                    <p className='popup-content'>{ photoCitation }</p>
                </div>
            </div>
            
        </div>
    );
};

export default Photo;

