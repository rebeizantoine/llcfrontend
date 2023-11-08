import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/popular-courses.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Popular = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enrollId, setEnrollId] = useState(null);
    const navigate = useNavigate();

    let scrollPosition = 0;

    const toggle = () => {
        if (!modal) {
            scrollPosition = window.pageYOffset;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        }
        setModal(!modal);
    };


    const handleEnroll = (course) => {
        setSelectedCourse(course);
        if (localStorage.getItem('user_id')) {
            toggle();
        } else {
            navigate('/login');
        }
    };

    const enrollCourse = () => {
        const { title, level } = selectedCourse;
        const user_id = localStorage.getItem('user_id');

        axios.get(' /user/getCourseLan')
            .then(response => {
                const allCourses = Array.isArray(response.data.data) ? response.data.data : [];
                const course = allCourses.find(c => c.title === title && c.level === level);
                if (course) {
                    const { course_id } = course;
                    axios.post(` /user/postEnrolled/${user_id}/${course_id}`)
                        .then(response => {
                            console.log(response.data);
                            axios.get(`/user/getEnrolledWhere/${user_id}/${course_id}`)
                                .then(response => {
                                    const enrollData = response.data.data[0];
                                    const enroll_id = enrollData.enroll_id;
                                    setEnrollId(enroll_id);
                                    console.log("enroll_id:", enroll_id);

                                    axios.get(`/user/getscheduleWhere/${course_id}`)
                                        .then(response => {
                                            const scheduleData = response.data.data[0];
                                            const schedule_id = scheduleData.schedule_id;
                                            console.log("schedule_id:", schedule_id);

                                            axios.post(`/user/post/${enroll_id}/${schedule_id}`)
                                                .then(response => {
                                                    console.log(response.data);
                                                    toast.success("Welcome!! You enrolled in one of our courses.", {
                                                        onClick: () => navigate('/dash')
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
        axios.get(' /user/getCourseLan')
            .then(response => {
                const allCourses = Array.isArray(response.data.data) ? response.data.data : [];
                const uniqueCourses = allCourses.filter((course, index, self) =>
                    index === self.findIndex((c) => (
                        c.taken_language_id === course.taken_language_id
                    ))
                );
                const coursesWithLevels = uniqueCourses.map(course => ({
                    ...course,
                    levels: allCourses
                        .filter(c => c.title === course.title)
                        .map(c => c.level)
                        .filter((level, index, self) => self.indexOf(level) === index)
                }));
                setCourses(coursesWithLevels.slice(0, 3));
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
            <div className='modalfpop'>
                <Modal isOpen={modal} toggle={toggle} className="custom-modalfpop centered-modal">
                    <ModalHeader toggle={toggle}>Enroll in Course</ModalHeader>
                    <ModalBody>
                        <p>You are about to enroll in the {selectedCourse?.title}. Please select a level:</p>
                        <select>
                            {selectedCourse?.levels.map((level, index) => (
                                <option key={index}>{level}</option>
                            ))}
                        </select>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={enrollCourse}>Enroll</Button>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
            <div className="popular-courses">
                <p className="roboto">Popular courses</p>
                <p className="medium">Mi mattis tortor dolor vitae congue purus mi imperdiet<br />
                    aliquam ultrices nunc.</p>
                <Link to="/AllCourses"><button className="view-all-coursess">VIEW ALL COURSES</button></Link>
                <div className="courses-language">
                    {courses.map(course => (
                        <div className="language1" key={course.course_id}>
                            <img src={course.languageimage} alt={course.title} className="img-language1" />
                            <p className="name-language1">{course.title}</p>
                            <p className="descriptionf1">{course.description}</p>
                            <button className="enrollf1" onClick={() => handleEnroll(course)}>ENROLL NOW</button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Popular;