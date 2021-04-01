import React, { useState } from 'react';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';

const App = () => {
    const search = null;

    return (
        <div>
            <NavBar />
            <SearchBar onTermSubmit={search} />
        </div>
    )
};

export default App;