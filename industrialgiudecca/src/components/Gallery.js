// Gallery.js
import React, { useEffect, useState } from 'react';
import '../css/Photos.css';

const Gallery = ({ Factory_ID, Factory_Name, allImgURLsPromise }) => {
    const [allImgURLs, setAllImgURLs] = useState([]);

    // Get this factory's info
    useState(() => { 

        if (allImgURLsPromise) { 
            // Load image URLs when the component mounts
            allImgURLsPromise.then(urls => {
                setAllImgURLs(urls);
            });
        }

    }, [allImgURLsPromise]);

    // When the DOM is loaded, set the background colors for the galleries
    useEffect(() => {
        const allGalleryDivs = Array.from(document.querySelectorAll('.gallery-container'));  // Array of all gallery divs
        const colors = ['#f7cac9', '#a7c7e7', '#f7e3b5', '#c1e1c1', '#d8bfd8'];              // Array of color codes 

        const p = colors.length;            // Number of colors in colors array (modulus)
        const n = allGalleryDivs.length;    // Number of divs to iterate through
        let i = 0;                          // Counter for index of allGalleryDivs

        for(i; i < n; i++) { 
            const thisDiv = allGalleryDivs[i];
            const thisColor = colors[i % p];
            thisDiv.style.backgroundColor = thisColor;
        }
    });

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
                                style={{}}
                            />
                        ))}
                    </div>
                </div>
                
            </div>
    );
};

export default Gallery;