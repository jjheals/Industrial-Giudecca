// src/components/DataExplorer/DataExplorerResultsTable.js

import React, { useState, useEffect } from 'react';
import '../../css/DataExplorer.css';

const DataExplorerResultsTable = ({ d }) => {
    const [queryResults, setQueryResults] = useState({ keys: [], rows: [] });
    const [noResultsMsgDisplay, setNoResultsMsg] = useState('none');
    const [tableBodyHeight, displayTableBody] = useState(0);

    console.log(d.rows);

    useEffect(() => {
        if (!d.rows[0] || d.rows[0].length === 0) {
            setNoResultsMsg('block');
            displayTableBody('0');
        } else {
            setQueryResults(d);
        }
    }, [d]);

    const downloadCSV = () => {
        // ... (code remains the same)
    };

    // Filter out entries without English_Name or Italian_Name
    const filteredRows = queryResults.rows.filter(row => {
        const englishNameIndex = queryResults.keys.indexOf('English_Name');
        const italianNameIndex = queryResults.keys.indexOf('Italian_Name');
        return row[englishNameIndex] && row[italianNameIndex];
    });

    return (
        <div className="de-results-table-container">
            <table className="de-results-table">
                <thead className="de-results-table-thead">
                <tr>
                    {queryResults.keys.map(k => (
                        <th key={k}>{k}</th>
                    ))}
                </tr>
                </thead>
                <tbody style={{ height: tableBodyHeight }}>
                {filteredRows.map((r, index) => (
                    <tr key={index} className="de-results-table-row">
                        {r.map((c, idx) => (
                            <td key={idx}>{c}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <div id="no-results-found-msg" style={{ display: noResultsMsgDisplay }}>
                <p>No results found.</p>
            </div>

            <button onClick={downloadCSV} disabled={filteredRows.length === 0}>
                Download CSV
            </button>
        </div>
    );
};

export default DataExplorerResultsTable;