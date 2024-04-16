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
        if (queryResults.rows.length === 0) {
            return; // Do nothing if there are no rows to download
        }

        const csvContent = [
            queryResults.keys.join(','),
            ...queryResults.rows.map(row => row.join(',')),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'query_results.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                {queryResults.rows.map((r, index) => (
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

            <button onClick={downloadCSV} disabled={queryResults.rows.length === 0}>
                Download CSV
            </button>
        </div>
    );
};

export default DataExplorerResultsTable;