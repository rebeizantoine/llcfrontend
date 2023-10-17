import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';


import Down from '../images/download.png';
import Main from '../images/imagehero1.png';
function Header() {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div>
            <div>
                <div className="firstrow">
                    <div className="first">
                        <div className="llc">
                            <p>LLC</p>
                        </div>
                        <header className="llc-header">
                            <p>Home</p>
                            <p onClick={() => scrollToSection('About')}>About</p>
                            <p onClick={() => scrollToSection('Blog')}>Blog</p>
                            <p>Contact</p>
                        </header>
                    </div>
                    <img className="search-llc" src={Down} />
                    <div className="login">
                        <Link to="/login">
                            <p>Log in</p>
                        </Link>
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
        </div >
    );
}

export default Header;
