import React, { useState, useEffect } from 'react';

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
    <div>
      <h1>Schedule</h1>
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
          {scheduleData.map((item) => (
            <tr key={item.course_id}>
              <td>{item.hours}</td>
              <td>
                {item.day === "Monday" && (
                  <p>
                    Title: {item.title}, Level: {item.level}, Zoom Link: {item.zoom_link}
                  </p>
                )}
              </td>
              <td>
                {item.day === "Tuesday" && (
                  <p>
                    Title: {item.title}, Level: {item.level}, Zoom Link: {item.zoom_link}
                  </p>
                )}
              </td>
              <td>
                {item.day === "Wednesday" && (
                  <p>
                    Title: {item.title}, Level: {item.level}, Zoom Link: {item.zoom_link}
                  </p>
                )}
              </td>
              <td>
                {item.day === "Thursday" && (
                  <p>
                    Title: {item.title}, Level: {item.level}, Zoom Link: {item.zoom_link}
                  </p>
                )}
              </td>
              <td>
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
      <div>
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
        <button onClick={handleAddToSchedule}>Add to Schedule</button>
      </div>
    </div>
  );
}

export default ScheduleTable;