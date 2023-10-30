import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/course.css';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState({
    languageTitle: '',
    level: 'A1',
    nbofsession: '10',
    duration: '8',
    zoomLink: 'WERFGDTHJKUYTRES',
  });
  const [search, setSearch] = useState({
    searchBy: 'level',
    searchTerm: '',
  });

  useEffect(() => {
    // Fetch courses from the "http://localhost:8000/user/getCourseLan" API
    axios
      .get('http://localhost:8000/user/getCourseLan')
      .then((response) => {
        const courseData = response.data.data;
        if (Array.isArray(courseData)) {
          const extractedCourses = courseData.map((course) => ({
            duration: course.duration,
            level: course.level,
            nbofsession: course.nbofsession,
            zoom_link: course.zoom_link,
            title: course.title,
          }));
          setCourses(extractedCourses);
        } else {
          setCourses([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });

    // Fetch languages from the "http://localhost:8000/user/getAllLanguage" API
    axios
      .get('http://localhost:8000/user/getAllLanguage')
      .then((response) => {
        setLanguages(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching languages:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedLanguage = languages.find((language) => language.title === formData.languageTitle);
    if (!selectedLanguage) {
      alert('The selected language is not available.');
      return;
    }
    const newCourse = {
      taken_language_id: selectedLanguage.taken_language_id,
      level: formData.level,
      nbofsession: formData.nbofsession,
      duration: formData.duration,
      zoom_link: formData.zoomLink,
    };
    axios
      .post('http://localhost:8000/user/postCourse', newCourse)
      .then(() => {
        alert('New course added successfully');
        setFormData({
          languageTitle: '',
          level: 'A1',
          nbofsession: '10',
          duration: '8',
          zoomLink: 'WERFGDTHJKUYTRES',
        });
      })
      .catch((error) => {
        console.error('Error adding the course:', error);
      });
  };

  const handleSearch = () => {
    if (search.searchBy === 'level') {
      const filteredCourses = courses.filter((course) => course.level === search.searchTerm);
      setCourses(filteredCourses);
    } else if (search.searchBy === 'title') {
      const filteredCourses = courses.filter((course) => course.title.includes(search.searchTerm));
      setCourses(filteredCourses);
    }
  };

  const resetSearch = () => {
    setSearch({
      searchBy: 'level',
      searchTerm: '',
    });
    axios
      .get('http://localhost:8000/user/getCourseLan')
      .then((response) => {
        const courseData = response.data.data;
        if (Array.isArray(courseData)) {
          const extractedCourses = courseData.map((course) => ({
            duration: course.duration,
            level: course.level,
            nbofsession: course.nbofsession,
            zoom_link: course.zoom_link,
            title: course.title,
          }));
          setCourses(extractedCourses);
        } else {
          setCourses([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  };

  return (
    <div className="course-container">
      <h1 className="course-title">Course Data</h1>
      <div className="search-container">
        <label className="search-label">Search by:</label>
        <select
          className="search-select"
          name="searchBy"
          onChange={handleSearchChange}
          value={search.searchBy}
        >
          <option value="level">Level</option>
          <option value="title">Language</option>
        </select>
        <input
          className="search-input"
          type="text"
          placeholder='input language/level'
          name="searchTerm"
          value={search.searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
        <button className="reset-button" onClick={resetSearch}>
          Reset
        </button>
      </div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <ul>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <li key={index} className="course-item">
                <strong>Duration:</strong> {course.duration} weeks<br />
                <strong>Level:</strong> {course.level}<br />
                <strong>Number of Sessions:</strong> {course.nbofsession}<br />
                <a className='zoom-a' href={course.zoom_link} target="_blank" rel="noopener noreferrer">
                  Zoom Link
                </a>
                <br />
                <strong>Title:</strong> {course.title}
              </li>
            ))
          ) : (
            <p className="error">No courses available.</p>
          )}
        </ul>
      )}
      <div className="add-course-container">
        <h1 className="course-title">Add a New Course</h1>
        <form onSubmit={handleSubmit} className="add-course-form">
          <div>
            <label className="form-label">Select a Language:</label>
            <select
              className="form-select"
              name="languageTitle"
              onChange={handleInputChange}
              value={formData.languageTitle}
            >
              <option value="">Select a language</option>
              {languages.map((language) => (
                <option key={language.taken_language_id} value={language.title}>
                  {language.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Level:</label>
            <input
              className="form-input"
              type="text"
              name="level"
              onChange={handleInputChange}
              value={formData.level}
            />
          </div>
          <div>
            <label className="form-label">Number of Sessions:</label>
            <input
              className="form-input"
              type="text"
              name="nbofsession"
              onChange={handleInputChange}
              value={formData.nbofsession}
            />
          </div>
          <div>
            <label className="form-label">Duration (in weeks):</label>
            <input
              className="form-input"
              type="text"
              name="duration"
              onChange={handleInputChange}
              value={formData.duration}
            />
          </div>
          <div>
            <label className="form-label">Zoom Link:</label>
            <input
              className="form-input"
              type="text"
              name="zoomLink"
              onChange={handleInputChange}
              value={formData.zoomLink}
            />
          </div>
          <button type="submit" className="form-button">Add Course</button>
        </form>
      </div>
    </div>

  );
};

export default Course;
