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
import { formatImageSource } from '../../ArcGIS.js';

const Gallery = ({ Factory_ID, allAttachments }) => {
    const [allAttachmentDicts, setAllImgURLs] = useState([]);

    useEffect(() => { 
        setAllImgURLs(allAttachments);
    });

    return (
        <div class='gallery-container'> 

                <div class='gallery-inner'>
                    <div class='gallery' id={`gallery-${Factory_ID}`}> 
                        {allAttachmentDicts.map(d => (
                            <Photo
                                photoClass='gallery-image'
                                photoID={ `F${Factory_ID}-S${d['Source_ID']}` }
                                photoKey={d['Source_ID']}
                                photoSrc={d['ArcGIS_Link']}
                                photoAlt={`Image ${d['Photo_Description']}`}
                                photoStyles={{}}
                                photoCitation={formatImageSource(d)}
                            />
                        ))}
                    </div>
                </div>
                
            </div>
    );
};

export default Gallery;