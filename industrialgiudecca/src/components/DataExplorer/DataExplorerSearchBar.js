// src/components/DataExplorer/DataExplorerSearchBar.js

/**  { Component } DataExplorerSearchBar
 *
 * @abstract The DataExplorerSearchBar is a component that is displayed on the DataExplorer Page. The search bar provides the filters and 
 * search functions for the DataExplorer. The fields correspond to the Entities and Relationships in the ArcGIS database.  
 * 
 */
import React, { useState, useEffect } from 'react';
import '../../css/DataExplorer.css';
import HandleSearchSubmission from './HandleSearchSubmission';

const DataExplorerSearchBar = () => {
    const [ products, setProducts ] = useState([]);
    const [ purposes, setPurposes ] = useState([]);

    // Define state variables to track form data
    const [formData, setFormData] = useState({
        English_Name: '',
        Italian_Name: '',
        Product: '',
        Current_Purpose: '',
        Min_Employment: 0,
        Max_Employment: null,
        Min_Year: 0,
        Max_Year: null
    });

    /** handleInputChange = (e) => {} 
     * @constant handleInputChange
     * @abstract Event handler to update the form data when input fields change
     * @param { Event } e
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    /** handleSubmit = (e) => {}
     * @constant handleSubmit
     * @abstract Event handler to handle the submission of a form, including making the necessary API calls
     * @param { Event } e 
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can perform any validation or submission logic
        console.log('Form submitted with data:', formData);
        
    };

    useEffect(() => { 
        // DO TO: dynamically pull all possible products AND purposes from the DB to populate the options on the sheet
        // DO SOMETHING ...
        // ...
        const productsFromDB = ['Silk', 'Pasta', 'Watches', 'Fuzes', 'Radios', 'Shipyard'];
        const purposesFromDB = ['Residential', 'Abandoned', 'Municipality', 'Business'];

        setPurposes(purposesFromDB);
        setProducts(productsFromDB);
    }, []);
    
    return (
        <div className='de-search-bar'>
            <form id='de-search-form' onSubmit={handleSubmit}>

                {/* Row 1 of inputs */}
                <div className='de-search-bar-row'>
                    <div className='input-container'><input type='text' className='de-search-input' name='English_Name' placeholder='Factory Name (English)' onChange={handleInputChange}></input></div>
                    <div className='input-container'><input type='text' className='de-search-input' name='Italian_Name' placeholder='Factory Name (Italian)' onChange={handleInputChange}></input></div>
                    <div className='input-container'><input type='number' className='de-search-input' name='Min_Employment' placeholder='Minumum Employment' onChange={handleInputChange}></input></div>
                    <div className='input-container'><input type='number' className='de-search-input' name='Min_Year' placeholder='Minimum Year' onChange={handleInputChange}></input></div>
                </div>

                {/* Row 2 of inputs */}
                <div className='de-search-bar-row'>
                    <div className='input-container'>
                        <select className='de-search-input'>
                            <option className='de-select-option' value=''>Select Product</option>
                            {
                                products.map(product => { 
                                    return <option className='de-select-option' name={ product } value={ product } onChange={handleInputChange}>{ product }</option> 
                                })
                            }
                        </select>
                    </div>
                    <div className='input-container'>
                        <select className='de-search-input'>
                            <option className='de-select-option' value=''>Select Current Purpose</option>
                            {
                                purposes.map(purpose => { 
                                    return <option className='de-select-option' name={ purpose } value={ purpose } onChange={handleInputChange}>{ purpose }</option> 
                                })
                            }
                        </select>
                    </div>
                    <div className='input-container'><input type='number' className='de-search-input' name='Max_Employment' placeholder='Maximum Employment' onChange={handleInputChange}></input></div>
                    <div className='input-container'><input type='number' className='de-search-input' name='Max_Year' placeholder='Maximum Year' onChange={handleInputChange}></input></div>
                </div>

                {/* Row 3 for submit button */}
                <div className='de-search-bar-row'><button type='submit' className='de-search-submit'>Search</button></div>
            </form>
        </div>
    );
};

export default DataExplorerSearchBar;
