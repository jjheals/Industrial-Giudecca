// src/components/DataExplorer/DataExplorer.js

/**  { Component } DataExplorer
 *
 * @abstract
 * 
 */
import React, { useState, useEffect } from 'react';
import '../../css/DataExplorer.css';
import DataExplorerSearchBar from './DataExplorerSearchBar';

const DataExplorer = () => {

    useEffect(() => {

    }, []); // Empty dependency array

    return (
        <div className='main-container'>
            <div id='search-bar-container'><DataExplorerSearchBar /></div>
        </div>
    );
};

export default DataExplorer;
