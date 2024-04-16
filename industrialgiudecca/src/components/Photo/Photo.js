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

