import React from 'react';
import './SearchBar.css';


function SearchBar(props: { searchBarText: any; setSearchBarText: any; }) {

    let {searchBarText, setSearchBarText} = props;

    return (
        <input 
        className="search-bar" 
        type="search" 
        placeholder="Search for item"
        value={searchBarText}
        onChange={(e) => setSearchBarText(e.target.value)}
        ></input>
    );
}


export default SearchBar;