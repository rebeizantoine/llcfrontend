import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Assuming you're using react-router for navigation
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
                            ...data.data.map(schedule => ({ ...schedule, title: course.title })),
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
            <h1>LLC</h1>
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
                            <th>Course</th>
                            <th>Day</th>
                            <th>Hour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseSchedules.map((schedule, index) => (
                            <tr key={index}>
                                <td>{schedule.title}</td>
                                <td>{schedule.day}</td>
                                <td>{schedule.hours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardStudent;