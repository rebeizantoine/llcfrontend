import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseManagement = () => {
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
    searchBy: 'level', // Default to search by level
    searchTerm: '',
  });

  useEffect(() => {
    // Fetch courses from the "http://localhost:8000/user/getCourseLan" API
    axios
      .get('http://localhost:8000/user/getCourseLan')
      .then((response) => {
        const courseData = response.data.data;

        if (Array.isArray(courseData)) {
          // Extract only the required fields: duration, level, nbofsession, zoom_link, title
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
    // Check if the selected language is present in the languages list
    const selectedLanguage = languages.find((language) => language.title === formData.languageTitle);

    if (!selectedLanguage) {
      alert('The selected language is not available.');
      return;
    }

    // Language is found, obtain its ID and post the course
    const newCourse = {
      taken_language_id: selectedLanguage.taken_language_id,
      level: formData.level,
      nbofsession: formData.nbofsession,
      duration: formData.duration,
      zoom_link: formData.zoomLink,
    };

    axios
      .post('http://localhost:8000/user/postCourse', newCourse)
      .then((response) => {
        alert('New course added successfully');
        // Clear the form
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
    <div>
      <h1>Course List</h1>
      <div>
        <label>Search by:</label>
        <select name="searchBy" onChange={handleSearchChange} value={search.searchBy}>
          <option value="level">Level</option>
          <option value="title">Language</option>
        </select>
        <input
          type="text"
          name="searchTerm"
          value={search.searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={resetSearch}>Reset</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <li key={index}>
                <strong>Duration:</strong> {course.duration} weeks<br />
                <strong>Level:</strong> {course.level}<br />
                <strong>Number of Sessions:</strong> {course.nbofsession}<br />
                <a href={course.zoom_link} target="_blank" rel="noopener noreferrer">
                  Zoom Link
                </a>
                <br />
                <strong>Title:</strong> {course.title}
              </li>
            ))
          ) : (
            <p>No courses available.</p>
          )}
        </ul>
      )}

      <h1>Add a New Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select a Language:</label>
          <select name="languageTitle" onChange={handleInputChange} value={formData.languageTitle}>
            <option value="">Select a language</option>
            {languages.map((language) => (
              <option key={language.taken_language_id} value={language.title}>
                {language.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Level:</label>
          <input type="text" name="level" onChange={handleInputChange} value={formData.level} />
        </div>
        <div>
          <label>Number of Sessions:</label>
          <input
            type="text"
            name="nbofsession"
            onChange={handleInputChange}
            value={formData.nbofsession}
          />
        </div>
        <div>
          <label>Duration (in weeks):</label>
          <input type="text" name="duration" onChange={handleInputChange} value={formData.duration} />
        </div>
        <div>
          <label>Zoom Link:</label>
          <input type="text" name="zoomLink" onChange={handleInputChange} value={formData.zoomLink} />
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default CourseManagement;