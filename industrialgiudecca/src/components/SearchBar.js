import React, { useState } from 'react';
import '../css/Searchbar.css'; // Assuming you have a separate CSS file for styling

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