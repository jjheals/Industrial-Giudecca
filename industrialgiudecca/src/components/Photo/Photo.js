// src/components/Photo.js

/** { Component } Photo 
 * 
 * @abstract 
 * 
 */
import React, { useEffect, useState, useParams } from 'react';

const Photo = ({ photoID, photoSrc, photoStyles }) => {

    return (
        <div class='photo-container'> 
            <img class='info-icon' src='info-icon.png'></img>
            <img class='photo-component' photoID={{ photoID }} src={{ photoSrc }}></img>
        </div>
    );
};

export default Gallery;