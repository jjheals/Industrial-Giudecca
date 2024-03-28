// src/components/Title.js

/**  { Component } Title
 *
 * @abstract
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
