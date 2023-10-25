import React from 'react';
import '../styles/header.css';
import image1 from '../images/imagehero1.png';

function Main() {
    return (
        <div className="main1">
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
                        <a href="/enroll">
                            <p>ENROLL TODAY</p>
                        </a>
                    </div>
                    <div className="courses">
                        <p>View Courses</p>
                    </div>
                </div>
            </div>
            <div className="left-content">
                <img className="hola" src={image1} />
            </div>
        </div>
    );
}

export default Main;
