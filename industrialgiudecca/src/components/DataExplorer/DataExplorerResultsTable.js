// src/components/DataExplorer/DataExplorerResultsTable.js

/**  { Component } DataExplorerResultsTable
 *
 * @abstract The DataExplorerResultsTable is the return table containing the results of a search using the DataExplorer. DataResultsTable handles 
 * the creation and formatting of the final tables as returned by the DB. It creates entity or relationship tables based on the query and returned
 * results. 
 * 
 */
import React, { useState, useEffect } from 'react';
import '../../css/DataExplorer.css';

const DataExplorerResultsTable = ({ d }) => {
    const [queryResults, setQueryResults] = useState({'keys': [], 'rows': []});
    const [noResultsMsgDisplay, setNoResultsMsg] = useState('none');
    const [tableBodyHeight, displayTableBody] = useState(0);

    console.log(d.rows);

    useEffect(() => {
        if(!d.rows[0] || d.rows[0].length == 0) { 
            setNoResultsMsg('block');
            displayTableBody('0');
        }
        else {
            setQueryResults(d);
        }
    }, {});
    
    return (
        <div className='de-results-table-container'>
            <table className='de-results-table'>
                <thead className='de-results-table-thead'>
                    {
                        queryResults.keys.map(k => { 
                            return <th key={ k }>{ k }</th>
                        })
                    }
                </thead>
                <tbody style={{ height: tableBodyHeight }}> 
                    { 
                        queryResults.rows.map((r, index) => {
                            return (
                                <tr key={ index } className='de-results-table-row'>
                                    {
                                        r.map((c, idx) => { 
                                            return <td key={ idx }>{ c }</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div id='no-results-found-msg' style={{ display: noResultsMsgDisplay }}>
                <p>No results found.</p>
            </div>

        </div>
    );
};

export default DataExplorerResultsTable;
