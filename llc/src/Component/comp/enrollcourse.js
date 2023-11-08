import React from 'react'

const EnrollCourse = () => {

    const { title, level } = selectedCourse;

    const user_id = localStorage.getItem('user_id');



    axios.get(`${process.env.REACT_APP_API_URL}/user/getCourseLan`)

        .then(response => {

            const allCourses = Array.isArray(response.data.data) ? response.data.data : [];

            console.log(allCourses)

            const course = allCourses.find(c => c.title === title && c.level === level);

            console.log("cour")

            if (course) {

                const { course_id } = course;

                axios.post(`${process.env.REACT_APP_API_URL}/user/postEnrolled/${user_id}`, { course_id })

                    .then(response => {

                        console.log(response.data);

                        axios.get(`${process.env.REACT_APP_API_URL}/user/getEnrolledWhere/${user_id}/${course_id}`)

                            .then(response => {

                                const enrollData = response.data.data[0];

                                const enroll_id = enrollData.enroll_id;

                                setEnrollId(enroll_id);

                                console.log("enroll_id:", enroll_id);



                                axios.get(`${process.env.REACT_APP_API_URL}/user/getscheduleWhere/${course_id}`)

                                    .then(response => {

                                        const scheduleData = response.data.data[0];

                                        const schedule_id = scheduleData.schedule_id;

                                        console.log("schedule_id:", schedule_id);



                                        axios.post(`${process.env.REACT_APP_API_URL}/user/post/${enroll_id}/${schedule_id}`)

                                            .then(response => {

                                                console.log(response.data);

                                                toast.success("Welcome!! You enrolled in one of our courses.", {

                                                    onClick: () => navigate('/DashboardStudent')

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
export default EnrollCourse