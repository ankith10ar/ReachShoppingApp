import React, { useState } from 'react';
import './App.css';
import Header from './header/Header';
import Filter from './filter/Filter';
import Products from './products/Products';
import SearchBar from './search-bar/SearchBar';
import FilterConfig from './models/FilterConfig';
import useDebounce from './hooks/Debounce';

function App() {

  const [searchBarText, setSearchBarText] = useState("");
  const [filterConfig, setFilterConfig] = useState([] as FilterConfig[]);
  const [filterWindow, setFilterWindow] = useState("");


  const searchBarTextDe = useDebounce(searchBarText);

  return (

    <>
      <Header setFilterWindow={setFilterWindow}></Header>
      <div className="shopping-page">
        <div className={"filter-window "+filterWindow}>
          <Filter filterConfig={filterConfig} setFilterConfig={setFilterConfig}></Filter>
        </div>
        <div>
          <SearchBar searchBarText={searchBarText} setSearchBarText={setSearchBarText}></SearchBar>
          <Products searchBarText={searchBarTextDe} filterConfig={filterConfig}></Products>
        </div>
      </div>
    </>
  );
}

export default App;
