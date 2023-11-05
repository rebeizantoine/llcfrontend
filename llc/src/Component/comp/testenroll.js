import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import '../styles/view-all-courses.css';

import English from '../images/english.png';

import French from '../images/french.png';

import Dutch from '../images/dutch.png';

import Chinese from '../images/chinese.png';

import Spanish from '../images/spanish.png';

import Italian from '../images/italian.png';

 

const ViewAllCourses = () => {

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [modal, setModal] = useState(false);

    const [error, setError] = useState(null);

    const [selectedCourse, setSelectedCourse] = useState(null);

    const [enrollId, setEnrollId] = useState(null);

    const history = useHistory();

 

    const toggle = () => setModal(!modal);

 

    const handleEnroll = (course) => {

        setSelectedCourse(course);

        if (localStorage.getItem('user_id')) {

            toggle();

        } else {

            history.push('/login');

        }

    };

    const enrollCourse = () => {

        const { title, level } = selectedCourse;

        const user_id = localStorage.getItem('user_id');

 

        axios.get('http://localhost:8000/user/getCourseLan')

            .then(response => {

                const allCourses = Array.isArray(response.data.data) ? response.data.data : [];

                console.log(allCourses)

                const course = allCourses.find(c => c.title === title && c.level === level);

                console.log("cour")

                if (course) {

                    const { course_id } = course;

                    axios.post(`http://localhost:8000/user/postEnrolled/${user_id}`, { course_id })

                        .then(response => {

                            console.log(response.data);

                            axios.get(`http://localhost:8000/user/getEnrolledWhere/${user_id}/${course_id}`)

                                .then(response => {

                                    const enrollData = response.data.data[0];

                                    const enroll_id = enrollData.enroll_id;

                                    setEnrollId(enroll_id);

                                    console.log("enroll_id:", enroll_id);

 

                                    axios.get(`http://localhost:8000/user/getscheduleWhere/${course_id}`)

                                        .then(response => {

                                            const scheduleData = response.data.data[0];

                                            const schedule_id = scheduleData.schedule_id;

                                            console.log("schedule_id:", schedule_id);

 

                                            axios.post(`http://localhost:8000/user/post/${enroll_id}/${schedule_id}`)

                                                .then(response => {

                                                    console.log(response.data);

                                                    toast.success("Welcome!! You enrolled in one of our courses.", {

                                                        onClick: () => history.push('/DashboardStudent')

                                                    });

                                                })

                                                .catch(error => {

                                                    console.error(error);

                                                });

                                        })

                                        .catch(error => {

                                            console.error(error);

                                        });

                                })

                                .catch(error => {

                                    console.error(error);

                                });

                        })

                        .catch(error => {

                            console.error(error);

                        });

                }

 

            })

            .catch(error => {

                console.error(error);

            });

    };

 

    useEffect(() => {

        axios.get('http://localhost:8000/user/getCourseLan')

            .then(response => {

                const allCourses = Array.isArray(response.data.data) ? response.data.data : [];

                const uniqueCourses = allCourses.filter((course, index, self) =>

                    index === self.findIndex((c) => (

                        c.taken_language_id === course.taken_language_id

                    ))

                );

                console.log(allCourses)

 

                const coursesWithLevels = uniqueCourses.map(course => ({

                    ...course,

                    levels: allCourses

                        .filter(c => c.title === course.title)

                        .map(c => c.course)

                   

                }));

                setCourses(coursesWithLevels);

                console.log(coursesWithLevels);

                setLoading(false);

            })

            .catch(err => {

                setError(err);

                setLoading(false);

            });

    }, []);

 

    if (loading) {

        return <div>Loading...</div>;

    }

 

    if (error) {

        return <div>Error: {error.message}</div>;

    }

 

    return (

        <div id="Courses">

            <div className="popular-courses">

                <p className="roboto">Popular courses</p>

                <p className="medium">Mi mattis tortor dolor vitae congue purus mi imperdiet<br />

                    aliquam ultrices nunc.</p>

                <Link to="/AllCourses">

                    <button className="view-all-coursess">VIEW ALL COURSES</button>

                </Link>

                <div className="courses-language">

                    {courses.map((course) => (

                        <div className="language1" key={course.course_id}>

 

                            <img src={course.languageimage} alt={course.title} className='img-language' />

                            <p className="name-language">{course.title}</p>

                            <p className="descriptionf">{course.description}</p>

                            <button className="enrollf" onClick={() => handleEnroll(course)}>ENROLL NOW</button>

                        </div>

                    ))}

                </div>

            </div>

 

        </div>

 

    );

}

 

export default ViewAllCourses