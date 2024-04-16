// src/components/Gallery.js

/** { Component } Gallery 
 * 
 * @abstract The Gallery provides a scrollable gallery for a particular given factory. 
 * @param { int } Factory_ID - The factory ID to make API calls with and define the IDs for the images 
 * @param { str } Factory_Name - The factory name to display at the top of the gallery
 * @param { Promise } allImgsURLsPromise - A promise for the URLs for the images for this factory
 * 
 */
import React, { useEffect, useState } from 'react';
import Photo from './Photo.js';

const Gallery = ({ Factory_ID, allImgURLsPromise }) => {
    const [allImgURLs, setAllImgURLs] = useState([]);

    useEffect(() => { 
        setAllImgURLs(allImgURLsPromise);
    });

    return (
        <div class='gallery-container'> 

                <div class='gallery-inner'>
                    <div class='gallery' id={`gallery-${Factory_ID}`}> 
                        {allImgURLs.map((url, index) => (
                            <Photo
                                photoClass='gallery-image'
                                photoID={ `${Factory_ID}-${index}` }
                                photoKey={index}
                                photoSrc={url}
                                photoAlt={`Image ${index + 1}`}
                                photoStyles={{}}
                                photoCitation=''
                            />
                        ))}
                    </div>
                </div>
                
            </div>
    );
};

export default Gallery;