import React, { useState, useEffect } from 'react';
import '../styles/scheduleTable.css';

function ScheduleTable() {
  const [scheduleData, setScheduleData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [hours, setHours] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    fetchScheduleData();
    fetchCourses();
  }, []);

  const fetchScheduleData = () => {
    fetch("http://localhost:8000/user/getschedule")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.data.sort((a, b) => a.hours.localeCompare(b.hours));
        setScheduleData(sortedData);
      })
      .catch((error) => console.error("Error fetching schedule data: ", error));
  };

  const fetchCourses = () => {
    fetch("http://localhost:8000/user/getCourseLan")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.data);
      })
      .catch((error) => console.error("Error fetching course data: ", error));
  };

  const handleAddToSchedule = () => {
    const selectedCourseData = courses.find((course) => {
      return course.level === selectedCourse.level && course.title === selectedCourse.title;
    });

    if (selectedCourseData) {
      const { course_id } = selectedCourseData;

      fetch("http://localhost:8000/user/postschedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: course_id,
          hours,
          day,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          setHours('');
          setDay('');
          fetchScheduleData();
        })
        .catch((error) => console.error("Error posting schedule data: ", error));
    }
  };

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">Schedule</h1>
      <table className="schedule-table">
        <thead>
          <tr>
            <th className="schedule-th">Time</th>
            <th className="schedule-th">Monday</th>
            <th className="schedule-th">Tuesday</th>
            <th className="schedule-th">Wednesday</th>
            <th className="schedule-th">Thursday</th>
            <th className="schedule-th">Friday</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((item) => (
            <tr key={item.course_id}>
              <td className="schedule-td">{item.hours}</td>
              <td className="schedule-td">
                {item.day === "Monday" && (
                  <p>
                    Title: {item.title}, Level: {item.level}, Zoom Link: {item.zoom_link}
                  </p>
                )}
              </td>
              <td className="schedule-td">
                {item.day === "Tuesday" && (
                  <p>
                    Title: {item.title}, Level: {item.level}, Zoom Link: {item.zoom_link}
                  </p>
                )}
              </td>
              <td className="schedule-td">
                {item.day === "Wednesday" && (
                  <p>
                    Title: {item.title}, Level: {item.level}, Zoom Link: {item.zoom_link}
                  </p>
                )}
              </td>
              <td className="schedule-td">
                {item.day === "Thursday" && (
                  <p>
                    Title: {item.title}, Level: {item.level}, Zoom Link: {item.zoom_link}
                  </p>
                )}
              </td>
              <td className="schedule-td">
                {item.day === "Friday" && (
                  <p>
                    Title: {item.title}, Level: {item.level}, Zoom Link: {item.zoom_link}
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-schedule-section">
        <h2 className="add-schedule-heading">Add to Schedule</h2>
        <div>
          <label className="schedule-label" htmlFor="course">
            Course:
          </label>
          <select
            id="course"
            value={JSON.stringify(selectedCourse)}
            onChange={(e) => setSelectedCourse(JSON.parse(e.target.value))}
            className="schedule-select"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.course_id} value={JSON.stringify(course)}>
                {course.title} - {course.level}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="schedule-label" htmlFor="hours">
            Hours:
          </label>
          <input
            type="text"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="schedule-input"
          />
        </div>
        <div>
          <label className="schedule-label" htmlFor="day">
            Day:
          </label>
          <input
            type="text"
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="schedule-input"
          />
        </div>
        <button onClick={handleAddToSchedule} className="schedule-button">
          Add to Schedule
        </button>
      </div>
    </div>
  );
}

export default ScheduleTable;