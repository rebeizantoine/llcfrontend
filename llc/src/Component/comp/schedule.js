import React, { useState, useEffect } from 'react';
import '../styles/scheduleTable.css'; // Import a separate CSS file

function ScheduleTable() {
  const [scheduleData, setScheduleData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [hours, setHours] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    fetchScheduleData(); // Fetch schedule data when the page loads
    fetchCourses(); // Fetch course data when the page loads
  }, []);

  const fetchScheduleData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user/getschedule`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.data.sort((a, b) => a.hours.localeCompare(b.hours));
        setScheduleData(sortedData);
      })
      .catch((error) => console.error("Error fetching schedule data: ", error));
  };

  const fetchCourses = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user/getCourseLan`)
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

      fetch(`${process.env.REACT_APP_API_URL}/user/postschedule`, {
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
          // After successfully posting data, re-fetch the schedule data
          fetchScheduleData();
        })
        .catch((error) => console.error("Error posting schedule data: ", error));
    }
  };

  // Group the scheduleData by hour
  const groupedScheduleData = scheduleData.reduce((grouped, item) => {
    if (!grouped[item.hours]) {
      grouped[item.hours] = [];
    }
    grouped[item.hours].push(item);
    return grouped;
  }, {});
  return (
    <div className="schedule-container">
      <h1>Schedule</h1>
      <div className="add-to-schedule-box">
        <h2>Add to Schedule</h2>
        <div>
          <label htmlFor="course">Course:</label>
          <select
            id="course"
            value={JSON.stringify(selectedCourse)}
            onChange={(e) => setSelectedCourse(JSON.parse(e.target.value))}
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
          <label htmlFor="hours">Hours:</label>
          <input
            type="text"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="day">Day:</label>
          <input
            type="text"
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <button className='add-to-schedule-button' onClick={handleAddToSchedule}>Add to Schedule</button>
      </div>
      <h2 className='schedule-table'>Schedule Table</h2>
      <table className='table123'>
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
          {Object.keys(groupedScheduleData).map((hour) => (
            <tr key={hour}>
              <td>{hour}</td>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <td key={day}>
                  {groupedScheduleData[hour].map((item) => (
                    item.day === day && (
                      <p key={item.course_id}>
                        Title: {item.title}, Level: {item.level}, Zoom Link: {item.zoom_link}
                      </p>
                    )
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable;
