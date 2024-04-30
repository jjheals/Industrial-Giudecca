// src/components/DataExplorer/DataExplorer.js

/**  { Component } DataExplorer
 *
 * @abstract The DataExplorer is designed to be a comprehensive database search machine. It consists of components defined in
 * src/components/DataExplorer. The DataExplorer handles a query based on the conditions in DataExplorerSearchBar and displays the results
 * in a DataExplorerResultsTable.
 *
 * @exports 
 *      @const { Component } DataExplorer
 */
import React, { useEffect } from 'react';
import '../../css/DataExplorer.css';
import DataExplorerSearchBar from './DataExplorerSearchBar';
import DataExplorerResultsTable from './DataExplorerResultsTable';
import Footer from '../Footer';
import { LanguageProvider } from '../../context/LanguageContext';

const DataExplorer = () => {
    
    const defaultResults = {
        'keys': ['English_Name', 'Italian_Name', 'Opening_Date', 'Closing_Date', 'Max_Employment', 'Min_Employment', 'Current_Purpose'],
        'rows': [[]]
    }

    useEffect(() => {

    }, []); // Empty dependency array

    return (
        <div className='data-explorer'>
            <div id='search-bar-container'><DataExplorerSearchBar/></div>
            <div id='results-table-container'><DataExplorerResultsTable d={defaultResults}/></div>

            {/* Footer */}
            <Footer />

        </div>
    );
};

export default DataExplorer;
