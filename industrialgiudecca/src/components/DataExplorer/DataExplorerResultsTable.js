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

    useEffect(() => { 
        setQueryResults(d);
    }, {});
    
    return (
        <div className='de-results-table-container'>
            <table className='de-results-table'>
                <thead>
                    {
                        queryResults.keys.map(k => { 
                            return <th>{ k }</th>
                        })
                    }
                </thead>
                <tbody> 
                    { 
                        queryResults.rows.map(r => {
                            return (
                                <tr>
                                    {
                                        r.map(c => { 
                                            return <td>{ c }</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default DataExplorerResultsTable;
