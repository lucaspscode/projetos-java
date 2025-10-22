import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>My React App</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    {/* Add more navigation links here */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;