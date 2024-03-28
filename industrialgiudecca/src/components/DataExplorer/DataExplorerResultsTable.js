// src/components/DataExplorer/DataExplorerResultsTable.js

/**  { Component } DataExplorerResultsTable
 *
 * @abstract
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
