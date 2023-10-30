import React, { useEffect, useState } from 'react';
import '../styles/dashboardstudent.css';
import english from '../images/english.jpg';
import spanish from '../images/spanish123.png';

function DashboardStudent() {
    const [courses, setCourses] = useState([]);
    const [courseDetails, setCourseDetails] = useState([]);

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

    return (
        <div className="sh1">
            <h1>LLC</h1>
            <h2>My courses</h2>
            <div className="container">
                {courseDetails.map(course => (
                    <div className="container1" key={course.course_id}>
                        <img className="Imaged"src={course.languageimage} alt="Image Description" />
                        <div className="Engf">
                            <h1>{course.title}</h1>
                            <p>{course.description}</p>
                        </div>
                    </div>
                ))}
                {/* Rest of the component */}
            </div>
        </div>
    );
}

export default DashboardStudent;
