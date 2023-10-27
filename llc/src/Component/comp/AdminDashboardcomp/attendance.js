import React, { useState, useEffect } from 'react';

function TeacherAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/user/getTeacherAtendance');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAttendanceData(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAttendanceChange = async (user_id, attend) => {
    const endpoint = attend === 1
      ? `http://localhost:8000/user/updateTeacherAttendance/${user_id}`
      : `http://localhost:8000/user/updateTeacherAttendanceneg/${user_id}`;

    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to update attendance. Status: ' + response.status);
      }
      // You can also update the state or perform other actions here as needed.
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
                <input
                  type="radio"
                  name={`attendance_${index}`}
                  value="1"
                  checked={item.attend === 1}
                  onChange={() => handleAttendanceChange(item.user_id, 1)}
                /> Yes
                <input
                  type="radio"
                  name={`attendance_${index}`}
                  value="0"
                  checked={item.attend === 0}
                  onChange={() => handleAttendanceChange(item.user_id, 0)}
                /> No
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
