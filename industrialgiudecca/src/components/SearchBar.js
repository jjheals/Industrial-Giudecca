// src/components/SearchBar.js

/** { Component } SearchBar 
 * 
 * @abstract The SearchBar searches the content on the page and filters the results on the page to match the search. It appears on FactoryHomepage 
 * and the Photo Gallery.
 * 
 */

import React, { useState } from 'react';
import '../css/Searchbar.css'; 

const SearchBar = () => {
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