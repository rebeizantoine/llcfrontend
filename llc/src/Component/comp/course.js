import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../styles/course.css";
const Course = () => {
  const [modal, setModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState({
    languageTitle: "",
    level: "A1",
    nbofsession: "10",
    duration: "8",
    zoomLink: "WERFGDTHJKUYTRES",
  });
  const [search, setSearch] = useState({
    searchBy: "level",
    searchTerm: "",
  });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/getCourseLan")
      .then((response) => {
        const courseData = response.data.data;

        if (Array.isArray(courseData)) {
          const extractedCourses = courseData.map((course) => ({
            duration: course.duration,
            level: course.level,
            nbofsession: course.nbofsession,
            zoom_link: course.zoom_link,
            title: course.title,
            course_id: course.course_id,
            taken_language_id: course.taken_language_id,
          }));
          setCourses(extractedCourses);
        } else {
          setCourses([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });

    axios
      .get("http://localhost:8000/user/getActiveTeacher")
      .then((response) => {
        const teacherData = response.data.data;

        if (Array.isArray(teacherData)) {
          const extractedTeachers = teacherData.map((teacher) => ({
            user_id: teacher.user_id,
            email: teacher.email,
          }));
          setTeachers(extractedTeachers);
        } else {
          setTeachers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });

    axios
      .get("http://localhost:8000/user/getAllLanguage")
      .then((response) => {
        setLanguages(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  }, []);

  const toggle = () => {
    setModal(!modal);
    setSelectedCourse("");
    setSelectedTeacher("");

    // Prevent scrolling when the modal is open
    if (setModal) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    console.log("Selected Course ID:", e.target.value);
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
    console.log("Selected Teacher ID: ", e.target.value);
  };

  const handleEnroll = async () => {
    try {
      const postUrl = `http://localhost:8000/user/postEnrolled/${selectedTeacher}/${selectedCourse}`;
      const enrollResponse = await axios.post(postUrl);
      console.log(enrollResponse.data);

      const getUrl = `http://localhost:8000/user/getEnrolledWhere/${selectedTeacher}/${selectedCourse}`;
      const enrollCheckResponse = await axios.get(getUrl);

      if (
        enrollCheckResponse.data.success &&
        enrollCheckResponse.data.data.length > 0
      ) {
        console.log("Enroll ID:", enrollCheckResponse.data.data[0].enroll_id);

        const scheduleUrl = `http://localhost:8000/user/getscheduleWhere/${selectedCourse}`;
        console.log("Schedule URL:", scheduleUrl);

        const scheduleResponse = await axios.get(scheduleUrl);
        console.log("Schedule Response:", scheduleResponse);

        if (scheduleResponse.data && scheduleResponse.data.data.length > 0) {
          console.log(
            "Schedule ID:",
            scheduleResponse.data.data[0].schedule_id
          );

          const enrollId = enrollCheckResponse.data.data[0].enroll_id;
          const scheduleId = scheduleResponse.data.data[0].schedule_id;
          const postEnrollAndScheduleUrl = `http://localhost:8000/user/post/${enrollId}/${scheduleId}`;
          const postResponse = await axios.post(postEnrollAndScheduleUrl);
          console.log("Post Response:", postResponse.data);
        } else {
          console.error("Error getting schedule ID: No data returned.");
        }
      } else {
        console.error(
          "Error getting enroll ID: No data returned or",
          enrollCheckResponse.data.message
        );
      }
    } catch (error) {
      console.error(
        "Error enrolling the teacher to the course or getting enroll/schedule ID:",
        error
      );
    }
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
    const selectedLanguage = languages.find(
      (language) => language.title === formData.languageTitle
    );

    const newCourse = {
      taken_language_id: selectedLanguage.taken_language_id,
      level: formData.level,
      nbofsession: formData.nbofsession,
      duration: formData.duration,
      zoom_link: formData.zoomLink,
      teacher_id: selectedTeacher,
    };

    axios
      .post("http://localhost:8000/user/postCourse", newCourse)
      .then((response) => {
        alert("New course added successfully");
      })
      .catch((error) => {
        console.error("Error adding the course:", error);
      });
  };

  const handleSearch = () => {
    if (search.searchBy === "level") {
      const filteredCourses = courses.filter(
        (course) => course.level === search.searchTerm
      );
      setCourses(filteredCourses);
    } else if (search.searchBy === "title") {
      const filteredCourses = courses.filter((course) =>
        course.title.includes(search.searchTerm)
      );
      setCourses(filteredCourses);
    }
  };

  const resetSearch = () => {
    setSearch({
      searchBy: "level",
      searchTerm: "",
    });

    axios
      .get("http://localhost:8000/user/getCourseLan")
      .then((response) => {
        const courseData = response.data.data;
        if (Array.isArray(courseData)) {
          const extractedCourses = courseData.map((course) => ({
            duration: course.duration,
            level: course.level,
            nbofsession: course.nbofsession,
            zoom_link: course.zoom_link,
            title: course.title,
            course_id: course.course_id,
            taken_language_id: course.taken_language_id,
          }));
          setCourses(extractedCourses);
        } else {
          setCourses([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  return (
    <div>
      <div className="modal-container">
        <Modal className="modal1" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            <h2 className="h2-modal1">Assign the Course To a Teacher</h2>
          </ModalHeader>
          <ModalBody className="modal1-body">
            <p>
              <h3 className="h3-modal1">Select a Course:</h3>
            </p>
            <select
              className="select-dropdown"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {`${course.level} - ${course.title}`}
                </option>
              ))}
            </select>

            <p>
              <h3 className="h3-modal1">Select a Teacher:</h3>
            </p>
            <select
              className="select-dropdown"
              value={selectedTeacher}
              onChange={handleTeacherChange}
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.user_id} value={teacher.user_id}>
                  {teacher.email}
                </option>
              ))}
            </select>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              className="cancel-button"
              onClick={toggle}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              className="save-button"
              onClick={handleEnroll}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <h1 className="course-list">Course List</h1>

      <div className="seaching">
        <label>Search by:</label>
        <select
          name="searchBy"
          onChange={handleSearchChange}
          value={search.searchBy}
        >
          <option value="level">Level</option>
          <option value="title">Language</option>
        </select>
        <input
          className="searching-text"
          type="text"
          name="searchTerm"
          value={search.searchTerm}
          onChange={handleSearchChange}
        />
        <button className="searching-button-search" onClick={handleSearch}>
          Search
        </button>
        <button className="searching-button-reset" onClick={resetSearch}>
          Reset
        </button>
      </div>
      <Button color="primary" onClick={toggle}>
        Assign the Course To a Teacher
      </Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="ul-course">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <li className="li-course" key={index}>
                <strong>Duration:</strong> {course.duration} weeks
                <br />
                <strong>Level:</strong> {course.level}
                <br />
                <strong>Number of Sessions:</strong> {course.nbofsession}
                <br />
                <a
                  href={course.zoom_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

      <form className="form-course" onSubmit={handleSubmit}>
        <div>
          <h1>Add a New Course</h1>
          <label>Select a Language:</label>
          <select
            name="languageTitle"
            onChange={handleInputChange}
            value={formData.languageTitle}
          >
            <option value="">Select a language</option>
            {languages.map((language) => (
              <option
                key={language.taken_language_id}
                value={language.taken_language_id}
              >
                {language.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Level:</label>
          <input
            type="text"
            name="level"
            onChange={handleInputChange}
            value={formData.level}
          />
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
          <input
            type="text"
            name="duration"
            onChange={handleInputChange}
            value={formData.duration}
          />
        </div>
        <div>
          <label>Zoom Link:</label>
          <input
            type="text"
            name="zoomLink"
            onChange={handleInputChange}
            value={formData.zoomLink}
          />
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default Course;
