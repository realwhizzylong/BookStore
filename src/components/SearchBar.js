import React from 'react';
import "../styles/SearchBar.css";

const SearchBar = ({ onTermSubmit }) => {

    return (
        <div className="ui search">
            <form className="ui icon input">
                <input
                    className="prompt"
                    type="text"
                    placeholder="Enter a book name"
                />
                <i className="search icon"></i>
            </form>
        </div>
    )
};

export default SearchBar;