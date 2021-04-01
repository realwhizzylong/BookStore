import React from 'react';
import '../styles/NavBar.css';

const NavBar = () => {
    return (
        <div className="ui large menu">
            <div className="ui container">
                <div className="left menu">
                    <a className="item active" href="/">Home</a>
                    <a className="item" href="/books">All Books</a>
                    <a className="item" href="/books/new">New Book</a>
                </div>
                <div className="right menu">
                    <a className="item" href="/login">Login</a>
                    <a className="item" href="/register">Register</a>
                    <a className="item" href="/logout">Logout</a>
                </div>
            </div>
        </div>
    )
};

export default NavBar;