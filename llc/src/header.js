import React from 'react';
import './header.css';
import Down from './download.png';
import Main from './imagehero1.png';
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
                            <p>
                                <a href="header.html">Home</a>
                            </p>
                            <p>
                                <a href="header.html">All Courses</a>
                            </p>
                            <p>
                                <a href="header.html">About</a>
                            </p>
                            <p>
                                <a href="header.html">Blog</a>
                            </p>
                            <p>
                                <a href="header.html">Contact</a>
                            </p>
                        </header>
                    </div>
                    <img className="search-llc" src={Down} />
                    <div className="login">
                        <a>
                            <p>Log in</p>
                        </a>
                    </div>
                </div>
                <div className="main">
                    <div className="right-content">
                        <hr className="orange-line" />
                        <div>
                            <p className="modern">The Modern Way to Find Your Learning Path.</p>
                        </div>
                        <div className="description">
                            <p>
                                Sed gravida ornare vestibulum turpis quam urna aliquam in feugiat lorem dolor pulvinar a,
                                scelerisque amet ultrices consectetur magna sit.
                            </p>
                        </div>
                        <div className="buttons">
                            <div className="enroll">
                                <a>
                                    <p>ENROLL TODAY</p>
                                </a>
                            </div>
                            <div className="courses">
                                <p>View Courses</p>
                            </div>
                        </div>
                    </div>
                    <div className="left-content">
                        <img className="hola" src={Main} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
