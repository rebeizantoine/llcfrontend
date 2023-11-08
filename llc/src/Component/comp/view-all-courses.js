import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/view-all-courses.css";
import logout1 from "../images/logout1.png";
import Happy from '../images/happy1.png'

import English from "../images/english.png";

import French from "../images/french.png";

import Dutch from "../images/dutch.png";

import Chinese from "../images/chinese.png";

import Spanish from "../images/spanish.png";

import Italian from "../images/italian.png";

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enrollId, setEnrollId] = useState(null);
    const navigate = useNavigate();

    const toggle = () => setModal(!modal);
    const handleLogout = () => {
        localStorage.removeItem("user_id");
        navigate("/");
    };
    const handleEnroll = (course) => {
        setSelectedCourse(course);
        if (localStorage.getItem("user_id")) {
            toggle();
        } else {
            navigate("/login");
        }
    };

    const enrollCourse = () => {
        const { title, level } = selectedCourse;
        const user_id = localStorage.getItem("user_id");

        axios
            .get("/user/getCourseLan")
            .then((response) => {
                const allCourses = Array.isArray(response.data.data)
                    ? response.data.data
                    : [];
                const course = allCourses.find(
                    (c) => c.title === title && c.level === level
                );
                if (course) {
                    const { course_id } = course;
                    axios
                        .post(
                            `/user/postEnrolled/${user_id}/${course_id}`
                        )
                        .then((response) => {
                            console.log(response.data);
                            axios
                                .get(
                                    `/user/getEnrolledWhere/${user_id}/${course_id}`
                                )
                                .then((response) => {
                                    const enrollData = response.data.data[0];
                                    const enroll_id = enrollData.enroll_id;
                                    setEnrollId(enroll_id);
                                    console.log("enroll_id:", enroll_id);

                                    axios
                                        .get(
                                            `/user/getscheduleWhere/${course_id}`
                                        )
                                        .then((response) => {
                                            const scheduleData = response.data.data[0];
                                            const schedule_id = scheduleData.schedule_id;
                                            console.log("schedule_id:", schedule_id);

                                            axios
                                                .post(
                                                    `/user/post/${enroll_id}/${schedule_id}`
                                                )
                                                .then((response) => {
                                                    console.log(response.data);
                                                    toast.success(
                                                        "Welcome!! You enrolled in one of our courses.",
                                                        {
                                                            onClick: () => navigate("/DashboardStudent"),
                                                        }
                                                    );
                                                })
                                                .catch((error) => {
                                                    console.error(error);
                                                });
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                        });
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        axios
            .get(" /user/getCourseLan")
            .then((response) => {
                const allCourses = Array.isArray(response.data.data)
                    ? response.data.data
                    : [];
                const uniqueCourses = allCourses.filter(
                    (course, index, self) =>
                        index ===
                        self.findIndex(
                            (c) => c.taken_language_id === course.taken_language_id
                        )
                );
                const coursesWithLevels = uniqueCourses.map((course) => ({
                    ...course,
                    levels: allCourses
                        .filter((c) => c.title === course.title)
                        .map((c) => c.level)
                        .filter((level, index, self) => self.indexOf(level) === index),
                }));
                setCourses(coursesWithLevels);
                setLoading(false);
            })
            .catch((err) => {
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
        <>
            <div id="Courses">
                <div className="popular-courses">
                    <div className="title123">
                        <h1>
                            <a className="LLCOFALL" href="/">
                                LLC
                            </a>
                        </h1>
                    </div>
                    <img
                        className="logout-image12"
                        onClick={handleLogout}
                        src={logout1}
                    />

                    <p className="roboto">Our Courses</p>
                    <div className='happy123'> <img src={Happy} alt="" /></div>
                    <Modal isOpen={modal} toggle={toggle} className="custom-modalpop">
                        <ModalHeader toggle={toggle}>Enroll in Course</ModalHeader>
                        <ModalBody>
                            <p>
                                You are about to enroll in the {selectedCourse?.title}. Please
                                select a level:
                            </p>
                            <div className='happy1234'> <img src={Happy} alt="" /></div>
                            <select>
                                {selectedCourse?.levels.map((level, index) => (
                                    <option key={index}>{level}</option>
                                ))}
                            </select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={enrollCourse}>
                                Enroll
                            </Button>
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <div className="courses123">
                        {courses.map((course) => (
                            <div className="language1" key={course.course_id}>
                                <img
                                    src={course.languageimage}
                                    alt={course.title}
                                    className="img-language"
                                />

                                <p className="name-language1">{course.title}</p>

                                <p className="descriptionf">{course.description}</p>

                                <button
                                    className="enrollf"
                                    onClick={() => handleEnroll(course)}
                                >
                                    ENROLL NOW
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllCourses;