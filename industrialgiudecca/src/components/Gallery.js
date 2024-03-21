// Gallery.js
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../css/Photos.css';

const Gallery = ({ Factory_ID, Factory_Name, allImgURLsPromise }) => {
    const [allImgURLs, setAllImgURLs] = useState([]);
    console.log(`Gallery for ${Factory_Name}`);
    console.log(allImgURLsPromise);
    
    // Get this factory's info
    useState(() => { 

        if (allImgURLsPromise) { 

            console.log(allImgURLsPromise);
            // Load image URLs when the component mounts
            allImgURLsPromise.then(urls => {
                console.log(urls);
                setAllImgURLs(urls);
            });
        }
    }, [allImgURLsPromise]);

    return (
        <div class='gallery-container'> 
                <div class='gallery-title-div'>
                    <h2 class='gallery-title'>{Factory_Name}</h2>
                </div>

                <div class='gallery-inner'>
                    <div class='gallery' id={`gallery-${Factory_ID}`}> 
                        {allImgURLs.map((url, index) => (
                            <img
                                class='gallery-image'
                                key={index}
                                src={url}
                                alt={`Image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
                
            </div>
    );
};

export default Gallery;