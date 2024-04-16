// src/components/DataExplorer/DataExplorerResultsTable.js

import React, { useState, useEffect } from 'react';
import '../../css/DataExplorer.css';

const DataExplorerResultsTable = ({ d }) => {
    const [queryResults, setQueryResults] = useState({ keys: [], rows: [] });

    useEffect(() => {
        if (d.rows && d.rows.length > 0) {
            setQueryResults(d);
        }
    }, [d]);

    const downloadCSV = () => {
        const csvContent = [
            queryResults.keys.join(','),
            ...queryResults.rows.map(row => row.join(',')),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'data_explorer.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className="de-download-results" onClick={downloadCSV}>
                <img id="download-icon" src={'download-icon.png'} alt="Download CSV" />
            </div>

            <div className="de-results-table-container">
                {queryResults.rows.length > 0 ? (
                    <table className="de-results-table">
                        <thead className="de-results-table-thead">
                        <tr>
                            {queryResults.keys.map(key => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {queryResults.rows.map((row, index) => (
                            <tr key={index} className="de-results-table-row">
                                {row.map((cell, idx) => (
                                    <td key={idx}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div id="no-results-found-msg">
                        <p>No results found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataExplorerResultsTable;