import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../styles/dashboardstudent.css';
import english from '../images/english.jpg';
import spanish from '../images/spanish123.png';

function DashboardStudent() {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseSchedules, setCourseSchedules] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const user_id = localStorage.getItem('user_id');
      try {
        const response = await fetch(`http://localhost:8000/user/getEnrolled/${user_id}`);
        const data = await response.json();
        if (data.success) {
          const enrolledCourses = data.data;
          setCourses(enrolledCourses.map(course => course.course_id));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      let fetchedCourseDetails = [];
      try {
        for (const courseId of courses) {
          const response = await fetch(`http://localhost:8000/user/getCourseLanWhere/${courseId}`);
          const data = await response.json();
          if (data.success && data.data.length > 0) {
            const courseData = data.data[0];
            if (!fetchedCourseDetails.some(course => course.title === courseData.title)) {
              fetchedCourseDetails.push(courseData);
            }
          }
        }
        setCourseDetails(fetchedCourseDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseDetails();
  }, [courses]);

  useEffect(() => {
    const fetchCourseSchedules = async () => {
      let fetchedCourseSchedules = [];
      try {
        for (const course of courseDetails) {
          const response = await fetch(`http://localhost:8000/user/getscheduleWhere/${course.course_id}`);
          const data = await response.json();
          if (data.success) {
            fetchedCourseSchedules = [
              ...fetchedCourseSchedules,
              ...data.data.map(schedule => ({ ...schedule, title: course.title, level: course.level, zoom_link: course.zoom_link })),
            ];
          }
        }
        setCourseSchedules(fetchedCourseSchedules);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseSchedules();
  }, [courseDetails]);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    history.push('/');
  };

  return (
    <div className="sh1">
      <Link to="/"><h1>LLC</h1></Link>
      <h2>My courses</h2>
      <button onClick={handleLogout}>Logout</button>
      <div className="container">
        {courseDetails.map(course => (
          <div className="container1" key={course.course_id}>
            <img src={course.languageimage} alt="Image Description" />
            <div className="Engf">
              <h1>{course.title}</h1>
              <p>{course.description}</p>
            </div>
          </div>
        ))}
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            {courseSchedules.map(schedule => (
              <tr key={schedule.course_id}>
                <td>{schedule.hours}</td>
                <td>{schedule.day === "Monday" && (
                  <p>
                    Title: {schedule.title}, Level: {schedule.level}, Zoom Link: {schedule.zoom_link}
                  </p>
                )}</td>
                <td>{schedule.day === "Tuesday" && (
                  <p>
                    Title: {schedule.title}, Level: {schedule.level}, Zoom Link: {schedule.zoom_link}
                  </p>
                )}</td>
                <td>{schedule.day === "Wednesday" && (
                  <p>
                    Title: {schedule.title}, Level: {schedule.level}, Zoom Link: {schedule.zoom_link}
                  </p>
                )}</td>
                <td>{schedule.day === "Thursday" && (
                  <p>
                    Title: {schedule.title}, Level: {schedule.level}, Zoom Link: {schedule.zoom_link}
                  </p>
                )}</td>
                <td>{schedule.day === "Friday" && (
                  <p>
                    Title: {schedule.title}, Level: {schedule.level}, Zoom Link: {schedule.zoom_link}
                  </p>
                )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardStudent;
