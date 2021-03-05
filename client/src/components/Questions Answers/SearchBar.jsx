/* eslint-disable react/prop-types */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const element = <FontAwesomeIcon icon={faSearch} />;

const SearchBar = ({ searchQuery, setSearchQuery, resetSearchQuery }) => (
  <div className="searchbar-wrapper">
    <form className="searchbar-form">
      <div id="icon">{element}</div>
      <input id="search-field" type="text" value={searchQuery || ''} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={setSearchQuery} />
      <span
        className="search-reset"
        role="button"
        tabIndex={0}
        onClick={resetSearchQuery}
        onKeyDown={resetSearchQuery}
      >
        &times;
      </span>
    </form>
  </div>
);

export default SearchBar;
