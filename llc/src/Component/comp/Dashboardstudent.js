// Import the necessary libraries and components
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/dashboardstudent.css';
import english from '../images/english.jpg';
import spanish from '../images/spanish123.png';
import logout1 from '../images/logout1.png';

// Define a custom previous arrow component
const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                left: "5px", // Adjust the left position as needed
            }}
            onClick={onClick}
        >
            <i className="fa fa-chevron-left"></i> {/* You can use a custom icon for the previous arrow */}
        </div>
    );
};

// Define a custom next arrow component
const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                right: "5px", // Adjust the right position as needed
            }}
            onClick={onClick}
        >
            <i className="fa fa-chevron-right"></i> {/* You can use a custom icon for the next arrow */}
        </div>
    );
};

function DashboardStudent() {
    // Define state variables and initialize them
    const [courses, setCourses] = useState([]);
    const [courseDetails, setCourseDetails] = useState([]);
    const [courseSchedules, setCourseSchedules] = useState([]);
    const history = useHistory();

    // Fetch enrolled courses when the component mounts
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

    // Fetch course details when the courses change
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

    // Fetch course schedules when course details change
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

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('user_id');
        history.push('/');
    };
    const groupedSchedules = {};

    courseSchedules.forEach(schedule => {
        const hours = schedule.hours;
        if (!groupedSchedules[hours]) {
            groupedSchedules[hours] = [];
        }
        groupedSchedules[hours].push(schedule);
    });

    // Settings for the Slider component
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        appendDots: dots => (
            <div>
                <ul style={{ marginTop: "20px" }}>{dots}</ul>
            </div>
        ),
    };

    return (
        <div className="sh1">
            <h1 className='h1-llc'><a href='/'>LLC</a></h1>
            <h2>My courses</h2>
            <img className='logout-image1' onClick={handleLogout} src={logout1} />
            <div className="container6">
                <Slider {...sliderSettings}>
                    {courseDetails.map(course => (
                        <div className="container61" key={course.course_id}>
                            <img src={course.languageimage} alt="Image Description" />
                            <div className="Engf">
                                <h1>{course.title}</h1>
                                <p>{course.description}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
                <table className='student-schedule-1'>
                    <thead className='thead-1'>
                        <tr>
                            <th>Course</th>
                            <th>Day</th>
                            <th>Hour</th>
                        </tr>
                    </thead>
                    <tbody className='tbody-1'>
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