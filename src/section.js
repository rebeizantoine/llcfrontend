import React from 'react';
import './stat.css'
import Book from'./course.png';
import Laptop from'./project.png';
import Users from './graduated.png';
import Person from'./teacher(1).png';

function Section() {
  return (
    <div className="statics-container">
      <div  className="counter-image">
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

export default Section;
