// src/components/DataExplorer/DataExplorerSearchBar.js

/**  { Component } DataExplorerSearchBar
 *
 * @abstract
 * 
 */
import React, { useState, useEffect } from 'react';
import '../../css/DataExplorer.css';

const DataExplorerSearchBar = () => {
    const [ products, setProducts ] = useState([]);
    const [ purposes, setPurposes ] = useState([]);

    useEffect(() => { 
        // DO TO: dynamically pull all possible products AND purposes from the DB to populate the options on the sheet
        const productsFromDB = ['Silk', 'Pasta', 'Watches', 'Fuzes', 'Radios', 'Shipyard'];
        const purposesFromDB = ['Residential', 'Abandoned', 'Municipality', 'Business'];

        setPurposes(purposesFromDB);
        setProducts(productsFromDB);
    }, []);
    
    return (
        <div className='de-search-bar'>
            <form id='de-search-form'>
                <div className='de-search-bar-row'>
                    <div className='input-container'>
                        <input type='text' className='de-search-input' placeholder='Factory Name (English)'></input>
                    </div>
                    <div className='input-container'>
                        <input type='text' className='de-search-input' placeholder='Factory Name (Italian)'></input>
                    </div>
                    <div className='input-container'>
                        <input type='number' className='de-search-input' placeholder='Minumum Employment'></input>
                    </div>
                    <div className='input-container'>
                        <input type='number' className='de-search-input' placeholder='Minimum Year'></input>
                    </div>
                </div>

                <div className='de-search-bar-row'>
                    <div className='input-container'>
                        <select className='de-search-input'>
                            <option className='de-select-option' value=''>Select Product</option>
                            {
                                products.map(product => { 
                                    return <option className='de-select-option' value={ product }>{ product }</option> 
                                })
                            }
                        </select>
                    </div>
                    <div className='input-container'>
                        <select className='de-search-input'>
                            <option className='de-select-option' value=''>Select New Purpose</option>
                            {
                                purposes.map(purpose => { 
                                    return <option className='de-select-option' value={ purpose }>{ purpose }</option> 
                                })
                            }
                        </select>
                    </div>
                    <div className='input-container'>
                        <input type='number' className='de-search-input' placeholder='Maximum Employment'></input>
                    </div>
                    <div className='input-container'>
                        <input type='number' className='de-search-input' placeholder='Maximum Year'></input>
                    </div>
                </div>

                <div className='de-search-bar-row'>
                    <button type='submit' className='de-search-submit'>Search</button>
                </div>
            </form>
        </div>
    );
};

export default DataExplorerSearchBar;
