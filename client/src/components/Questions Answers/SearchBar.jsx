/* eslint-disable react/prop-types */

import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div>
    Hello from SearchBar
    <form>
      <input type="text" value={searchQuery || ''} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={setSearchQuery} />
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default SearchBar;
