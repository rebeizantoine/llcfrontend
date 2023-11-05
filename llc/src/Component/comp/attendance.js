import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/attendance.css'

const TeacherAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/user/getTeacherAtendance');
        setAttendanceData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAttendanceChange = async (id, newValue) => {
    const endpoint = newValue === '1'
      ? `http://localhost:8000/user/updateTeacherAttendance/${id}`
      : `http://localhost:8000/user/updateTeacherAttendanceneg/${id}`;

    try {
      await axios.put(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const updatedData = attendanceData.map(item => {
        if (item.user_id === id) {
          return { ...item, attend: newValue };
        }
        return item;
      });

      setAttendanceData(updatedData);
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="teacher-attendance-container">
      <h1 className="teacher-attendance-title">Teacher Attendance</h1>
      <table className="teacher-attendance-table">
        <thead>
          <tr>
            <th className="email-header">Email</th>
            <th className="attendance-header">Attendance</th>
            <th className="level-header">Level</th>
            <th className="title-header">Title</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item, index) => (
            <tr key={index}>
              <td className="email-data">{item.email}</td>

              <td className="attendance-data">
                <label className="attendance-label">
                  <input
                    type="radio"
                    name={`attendance_${index}`}
                    value="1"
                    checked={item.attend === '1'}
                    onChange={() => handleAttendanceChange(item.user_id, '1')}
                  /> Yes
                </label>
                <label className="attendance-label">
                  <input
                    type="radio"
                    name={`attendance_${index}`}
                    value="0"
                    checked={item.attend === '0'}
                    onChange={() => handleAttendanceChange(item.user_id, '0')}
                  /> No
                </label>
              </td>
              <td className="level-data">{item.level}</td>
              <td className="title-data">{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default TeacherAttendance;