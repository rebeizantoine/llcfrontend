import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import Down from '../images/download.png';

function Header() {
    return (
        <div>
            <div>
                <div className="firstrow">
                    <div className="first">
                        <div className="llc">
                            <p>LLC</p>
                        </div>
                        <header className="llc-header">
                            <a className="nav-link" href="#Home">Home</a>
                            <a className="nav-link" href="#About">About</a>
                            <a className="nav-link" href="#Courses">Courses</a>
                            <a className="nav-link" href="#Contact">Contact</a>
                        </header>
                    </div>
                    <img className="search-llc" src={Down} />
                    <div className="login">
                        <Link to="/login">
                            <p>Log in</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;