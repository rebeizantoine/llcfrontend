import React, { useEffect, useState } from "react";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseSchedules, setCourseSchedules] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const user_id = localStorage.getItem("user_id");
      try {
        const response = await fetch(
          `http://localhost:8000/user/getEnrolled/${user_id}`
        );
        const data = await response.json();
        if (data.success) {
          const enrolledCourses = data.data;
          setCourses(enrolledCourses.map((course) => course.course_id));
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
          const response = await fetch(
            `http://localhost:8000/user/getCourseLanWhere/${courseId}`
          );
          const data = await response.json();
          if (data.success && data.data.length > 0) {
            const courseData = data.data[0];
            if (
              !fetchedCourseDetails.some(
                (course) => course.title === courseData.title
              )
            ) {
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
          const response = await fetch(
            `http://localhost:8000/user/getscheduleWhere/${course.course_id}`
          );
          const data = await response.json();
          if (data.success) {
            fetchedCourseSchedules = [
              ...fetchedCourseSchedules,
              ...data.data.map((schedule) => ({
                ...schedule,
                title: course.title,
                level: course.level,
                zoom_link: course.zoom_link,
              })),
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

  const groupedSchedules = {};

  courseSchedules.forEach((schedule) => {
    const hours = schedule.hours;
    if (!groupedSchedules[hours]) {
      groupedSchedules[hours] = [];
    }
    groupedSchedules[hours].push(schedule);
  });

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    if (user_id) {
      fetch(`http://localhost:8000/user/getEnrolled/${user_id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch user data");
          }
        })
        .then((data) => {
          data.data.forEach((enrollment) => {
            console.log("course_id:", enrollment.course_id);
            setCourseId(enrollment.course_id);
          });

          setUserData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (courseId) {
      fetch(`http://localhost:8000/user/getStudentEnrolled/${courseId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch student enrolled data");
          }
        })
        .then((courseData) => {
          console.log("Student Enrolled Data for course:", courseData);
          setCourseData(courseData); // Set the course data
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [courseId]);

  return (
    <>
      <div>
        <h1>User Profile</h1>
        {userData ? (
          <div>
            {courseData ? (
              <div>
                <h2>Course Data:</h2>
                {courseData.data.map((student, index) => (
                  <div key={index}>
                    <p>Email: {student.email}</p>
                    <p>Course ID: {student.course_id}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading course data...</p>
            )}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
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
          {Object.keys(groupedSchedules).map((hours) => (
            <tr key={hours}>
              <td>{hours}</td>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day) => (
                  <td key={day}>
                    {groupedSchedules[hours].map(
                      (schedule) =>
                        schedule.day === day && (
                          <p key={schedule.course_id}>
                            Title: {schedule.title}, Level: {schedule.level},
                            Zoom Link: {schedule.zoom_link}
                          </p>
                        )
                    )}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserProfile;
