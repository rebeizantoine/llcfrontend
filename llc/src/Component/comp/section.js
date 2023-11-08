import React, { useEffect } from 'react';
import '../styles/stat.css';
import Book from '../images/course.png';
import Laptop from '../images/project.png';
import Users from '../images/graduated.png';
import Person from '../images/teacher(1).png';

function Section() {
  // Function to start the counting animation
  function startCountAnimation(targetId, targetValue, duration) {
    const targetElement = document.getElementById(targetId);
    const increment = targetValue / (duration * 1000); // Calculate increment per millisecond

    let currentValue = 0;

    const intervalId = setInterval(function () {
      if (currentValue < targetValue) {
        currentValue += increment;
        targetElement.textContent = Math.round(currentValue);
      } else {
        targetElement.textContent = targetValue;
        clearInterval(intervalId);
      }
    }, 1); // Update every millisecond
  }

  useEffect(() => {
    // Start counting animations when the component mounts
    startCountAnimation("trainerCount", 15, 1); // 1 seconds duration
    startCountAnimation("studentCount", 55, 1); // 1 seconds duration
    startCountAnimation("coursesCount", 16, 1); // 1 seconds duration
    startCountAnimation("projectsCount", 65, 1); // 1 seconds duration
    // Repeat this for other statistics as needed
  }, []);

  return (
    <div className="statics-container">
      <div className="counter-image">
        <div className="sub-stat-container">
          <div>
            <section className="image-section">
              <img src={Person} className="icon_stat" alt="book icon" />
            </section>
            <p>
              <span id="trainerCount">0</span>
            </p>
            <button>Trainer</button>
          </div>
          <div>
            <section className="image-section">
              <img src={Users} className="icon_stat" alt="book icon" />
            </section>
            <p>
              <span id="studentCount">0</span>
            </p>
            <button>Student</button>
          </div>
        </div>

        <div className="sub-stat-container">
          <div>
            <section className="image-section">
              <img src={Book} className="icon_stat" alt="book icon" />
            </section>
            <p>
              <span id="coursesCount">0</span>
            </p>
            <button>Courses</button>
          </div>
          <div>
            <section className="image-section">
              <img src={Laptop} className="icon_stat" alt="book icon" />
            </section>
            <p>
              <span id="projectsCount">0</span>
            </p>
            <button>Projects</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
