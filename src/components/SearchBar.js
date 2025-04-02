import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(onSearch, 3000);

  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };
  return <input type='text' value={searchTerm} onChange={onChangeHandler} />;
}

export default SearchBar;
