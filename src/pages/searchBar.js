import React, { useState } from 'react';
import styles from './searchBar.module.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.input}
            />
            <button type="submit" className={styles.button}>
                Search
            </button>
        </form>
    );
}

export default SearchBar;
