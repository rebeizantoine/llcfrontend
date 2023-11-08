import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboardteacher.css'
import logout1 from '../images/logout1.png';

function TeacherDashboard() {
    const [userData, setUserData] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [courseDetails, setCourseDetails] = useState([]);
    const [courseSchedules, setCourseSchedules] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            const user_id = localStorage.getItem("user_id");
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/user/getEnrolled/${user_id}`
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
                        `${process.env.REACT_APP_API_URL}/user/getCourseLanWhere/${courseId}`
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
                        `${process.env.REACT_APP_API_URL}/user/getscheduleWhere/${course.course_id}`
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
            fetch(`${process.env.REACT_APP_API_URL}/user/getEnrolled/${user_id}`)
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
    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/');
    };
    const [showZoomLink, setShowZoomLink] = useState(false);
    const [expandedCourseId, setExpandedCourseId] = useState(null);

    useEffect(() => {
        if (courseId) {
            fetch(`${process.env.REACT_APP_API_URL}/user/getStudentEnrolled/${courseId}`)
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
            <div className="teacher-container123">
                <div className="teacher-dashboard">
                    <h1 className='h1-llc-teacher'><a href='/'>LLC</a></h1>
                    <h1 className="dashboard-title">Course Schedule</h1>
                    <img className='logout-image2' onClick={handleLogout} src={logout1} />
                </div>
                <table className="course-schedule-table">
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
                                <td className="time123">{hours}</td>
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                                    (day) => (
                                        <td key={day}>
                                            {groupedSchedules[hours].map(
                                                (schedule) =>
                                                    schedule.day === day && (
                                                        <div key={schedule.course_id} className="course-schedule-container">
                                                            <p className="course-info">
                                                                Title: {schedule.title}, Level: {schedule.level}<br />
                                                                {showZoomLink && (
                                                                    <span>Zoom Link: {schedule.zoom_link}</span>
                                                                )}
                                                            </p>
                                                            <div>
                                                                <label className="label-zoom">Show Zoom Link</label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={showZoomLink}
                                                                    onChange={() => setShowZoomLink(!showZoomLink)}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                            )}
                                        </td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="user-profile-container">
                    {userData ? (
                        <div>
                            {courseData ? (
                                <div className="container122">
                                    <h2 className="course-data-title">Students Enrolled:</h2>
                                    {courseData.data.map((student, index) => (
                                        <div key={index} className="user-info-container">
                                            <p className="user-info"> {student.email}</p>
                                            <p className="user-info"> {student.course_id}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="loading-message">Loading course data...</p>
                            )}
                        </div>
                    ) : (
                        <p className="loading-message">Loading user data...</p>
                    )}
                </div>
            </div>
        </>
    );
}
export default TeacherDashboard;