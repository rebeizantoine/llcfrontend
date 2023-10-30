import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      ? `http://localhost:8000/user/updateActivationforuser/${id}`
      : `http://localhost:8000/user/updateActivationforuserneg/${id}`;

    try {
      await axios.put(endpoint, null, {
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
    <div>
      <h1>Teacher Attendance</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Attendance</th>
            <th>Level</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item, index) => (
            <tr key={index}>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                <label>
                  <input
                    type="radio"
                    name={`attendance_${index}`}
                    value="1"
                    checked={item.attend === '1'}
                    onChange={() => handleAttendanceChange(item.user_id, '1')}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`attendance_${index}`}
                    value="0"
                    checked={item.attend === '0'}
                    onChange={() => handleAttendanceChange(item.user_id, '0')}
                  /> No
                </label>
              </td>
              <td>{item.level}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherAttendance;
