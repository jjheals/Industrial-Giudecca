// src/components/SearchBar.js

/** { Component } SearchBar 
 * 
 * @abstract The SearchBar searches the content on the page and filters the results on the page to match the search. It appears on FactoryHomepage 
 * and the Photo Gallery.
 * 
 * @param { function } onSearch - Callback function for when a search is submitted 
 */

import React, { useState } from 'react';
import '../css/components/Searchbar.css'; 

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Call the onSearch function passed as a prop with the current value
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search for factories..."
                value={searchTerm}
                onChange={handleInputChange}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;