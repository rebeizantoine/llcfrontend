import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/dashboardstudent.css';
import english from '../images/english.jpg';
import spanish from '../images/spanish123.png';

function DashboardStudent() {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseSchedules, setCourseSchedules] = useState([]);
  const navigate = useNavigate();

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
    navigate('/');
  };

  const groupedSchedules = {};

  courseSchedules.forEach(schedule => {
    const hours = schedule.hours;
    if (!groupedSchedules[hours]) {
      groupedSchedules[hours] = [];
    }
    groupedSchedules[hours].push(schedule);
  });

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
            {Object.keys(groupedSchedules).map(hours => (
              <tr key={hours}>
                <td>{hours}</td>
                <td>
                  {groupedSchedules[hours].map(schedule => (
                    schedule.day === 'Monday' && (
                      <p key={schedule.course_id}>
                        Title: {schedule.title}, Level: {schedule.level}, Zoom Link: {schedule.zoom_link}
                      </p>
                    )
                  ))}
                </td>
                <td>
                  {groupedSchedules[hours].map(schedule => (
                    schedule.day === 'Tuesday' && (
                      <p key={schedule.course_id}>
                        Title: {schedule.title}, Level: {schedule.level}, Zoom Link: {schedule.zoom_link}
                      </p>
                    )
                  ))}
                </td>
                <td>
                  {groupedSchedules[hours].map(schedule => (
                    schedule.day === 'Wednesday' && (
                      <p key={schedule.course_id}>
                        Title: {schedule.title}, Level: {schedule.level}, Zoom Link: {schedule.zoom_link}
                      </p>
                    )
                  ))}
                </td>
                <td>
                  {groupedSchedules[hours].map(schedule => (
                    schedule.day === 'Thursday' && (
                      <p key={schedule.course_id}>
                        Title: {schedule.title}, Level: {schedule.level}, Zoom Link: {schedule.zoom_link}
                      </p>
                    )
                  ))}
                </td>
                <td>
                  {groupedSchedules[hours].map(schedule => (
                    schedule.day === 'Friday' && (
                      <p key={schedule.course_id}>
                        Title: {schedule.title}, Level: {schedule.level}, Zoom Link: {schedule.zoom_link}
                      </p>
                    )
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardStudent;
