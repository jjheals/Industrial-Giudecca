// src/components/Title.js

/**  { Component } Title
 *
 * @abstract Title is a component to standardize the titles as they display on each page. 
 * @param {str} title - the title to display (verbatim)
 * 
 */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Title.css';

const Title = (title) => {
    return (
        <div className='title-container'>
            <hr class="title-hr"></hr>
            <h1 id="title">{ title.title }</h1>
            <hr class="title-hr"></hr>
        </div>
    );
};

export default Title;
