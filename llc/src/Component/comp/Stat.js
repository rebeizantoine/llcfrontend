import React from 'react';
import '../styles/style.css'
import Book from '../images/book-open-reader-solid.svg';
import Laptop from '../images/laptop-code-solid.svg';
import Users from '../images/user-graduate-solid.svg';
import Person from '../images/person-chalkboard-solid.svg';

function Stat() {
    return (
        <div className="statics-container">
            <div className="counter-image">
                <div className="sub-stat-container">
                    <div>
                        <section className="image-section"> <img src={Person} className="icon_stat" alt="book icon" /></section>

                        <p>230</p>
                        <button>Trainer</button>
                    </div>
                    <div>
                        <section className="image-section"> <img src={Users} className="icon_stat" alt="book icon" /></section>
                        <p>230</p>
                        <button>Student</button>
                    </div>
                </div>

                <div className="sub-stat-container">
                    <div>
                        <section className="image-section"> <img src={Book} className="icon_stat" alt="book icon" /></section>
                        <p>230</p>
                        <button>Courses</button>
                    </div>
                    <div>
                        <section className="image-section"> <img src={Laptop} className="icon_stat" alt="book icon" /></section>
                        <p>230</p>
                        <button>Projects</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stat;