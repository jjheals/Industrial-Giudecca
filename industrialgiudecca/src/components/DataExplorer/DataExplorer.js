// src/components/DataExplorer/DataExplorer.js

/**  { Component } DataExplorer
 *
 * @abstract The DataExplorer is designed to be a comprehensive database search machine. It consists of components defined in 
 * src/components/DataExplorer. The DataExplorer handles a query based on the conditions in DataExplorerSearchBar and displays the results
 * in a DataExplorerResultsTable. 
 * 
 */
import React, { useState, useEffect } from 'react';
import '../../css/DataExplorer.css';
import DataExplorerSearchBar from './DataExplorerSearchBar';
import DataExplorerResultsTable from './DataExplorerResultsTable';

const DataExplorer = () => {
    
    const queryResults = { 
        'keys': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        'rows': [
            ['R1 C1', 'R1 C2', 'R1 C3', 'R1 C4', 'R1 C5', 'R1 C6', 'R1 C7'],
            ['R2 C1', 'R2 C2', 'R2 C3', 'R2 C4', 'R2 C5', 'R2 C6', 'R2 C7'],
            ['R3 C1', 'R3 C2', 'R3 C3', 'R3 C4', 'R3 C5', 'R3 C6', 'R3 C7'],
            ['R4 C1', 'R4 C2', 'R4 C3', 'R4 C4', 'R4 C5', 'R4 C6', 'R4 C7'],
            ['R5 C1', 'R5 C2', 'R5 C3', 'R5 C4', 'R5 C5', 'R5 C6', 'R5 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],
            ['R6 C1', 'R6 C2', 'R6 C3', 'R6 C4', 'R6 C5', 'R6 C6', 'R6 C7'],

        ]
    }
    useEffect(() => {

    }, []); // Empty dependency array

    return (
        <div className='main-container'>
            <div id='search-bar-container'><DataExplorerSearchBar /></div>
            <button type='download' className='de-download-results'><img id='download-icon' src='download-icon.png' /></button>
            <div id='results-table-container'><DataExplorerResultsTable d ={ queryResults}/></div>
        </div>
    );
};

export default DataExplorer;
