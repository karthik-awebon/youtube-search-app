import React, { useState, useRef, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch, focus = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(onSearch, 3000);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current && focus) {
      searchInputRef.current.focus();
    }
  }, [focus]);

  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };
  return (
    <div className={styles.searchBar}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <circle cx='11' cy='11' r='8' />
        <line x1='21' y1='21' x2='16.65' y2='16.65' />
      </svg>
      <input
        ref={searchInputRef}
        type='text'
        className={styles.searchInput}
        placeholder='Search for videos...'
        value={searchTerm}
        onChange={onChangeHandler}
        data-testid='search-bar'
      />
    </div>
  );
}

export default SearchBar;
