// src/components/DataExplorer/DataExplorerResultsTable.js

/** { Component } DataExplorerResultsTable
 * @abstract The results table that displays on the DataExplorerPage. Called by DataExplorer. Results are set using the setResultsTable()
 * function in DataExplorerFunctions.js and rendered using renderResultsTable() function in DataExplorerFunctions.js
 * 
 * Note that all the search functions take place in DataExplorerSearchBar and all the results are retrieved and created using the above 
 * functions from DataExplorerFunctions.js 
 */
import React, { useState, useEffect } from 'react';

// Stylesheets
import '../../css/DataExplorer.css';

const DataExplorerResultsTable = ({ d }) => {
    const [queryResults, setQueryResults] = useState({ keys: [], rows: [] });

    // useEffect => clean the rows array and render the results
    useEffect(() => {
        // Check that results were given
        if (d.rows && d.rows.length > 0) {
            d.rows = d.rows.filter(r => (r));   // Filter out undefined rows for error checking 
            setQueryResults(d);                 // Set the table on the screen
        }
    }, [d]);

    /** downloadCSV - event handler for clicking the "download" icon to download the current table
     * @constant { Event } 
     */
    const downloadCSV = () => {
        // Retrieve the table from the page and create a CSV style string
        const csvContent = [
            queryResults.keys.join(','),
            ...queryResults.rows.map(row => row.join(',')),
        ].join('\n');

        // Handle downloading the CSV by simulating a "click" on a download link 
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });   // Create a blob for download 

        const link = document.createElement('a');               // Create the link element 
        link.style.visibility = 'hidden';                       // Link hidden from the screen
        link.setAttribute('href', URL.createObjectURL(blob));   // Set the href path of the link to the blob element 
        link.setAttribute('download', 'data_explorer.csv');     // Set the blob/file filename
        document.body.appendChild(link);                        // Add the hidden link to the page
        link.click();                                           // Simulate a click
        document.body.removeChild(link);                        // Remove the link from the page 
    };

    return (
        <div>
            {/* Download button */}
            <div className="de-download-results" onClick={downloadCSV}>
                <img id="download-icon" src={'download-icon.png'} alt="Download CSV" />
            </div>

            {/* Table of results */}
            <div className="de-results-table-container">
                {
                    // If there are query results, populate the table; else show "no results found" msg
                    queryResults.rows.length > 0 ? (
                        <table className="de-results-table">
                            {/* Table header/column names */}
                            <thead className="de-results-table-thead">
                                <tr>
                                    {
                                        // Use the "keys" attributes of the query results as the table headers
                                        queryResults.keys.map(key => (
                                            <th key={key}>{key}</th>
                                        ))
                                    }
                                </tr>
                            </thead>

                            {/* Table body */}
                            <tbody>
                                {
                                    // Iterate over the rows and create <tr> elements
                                    queryResults.rows.map((row, index) => (
                                        <tr key={index} className="de-results-table-row">
                                            {
                                                // Iterate over this row and display the cell <td> element
                                                row.map((cell, idx) => (
                                                    <td key={idx}>{cell}</td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : (
                        // Else clause (no results)
                        <div id="no-results-found-msg">
                            <p>No Results Found.</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default DataExplorerResultsTable;