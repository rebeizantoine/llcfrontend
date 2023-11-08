import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Teacher from './teacher';
import '../styles/teacher.css'
import Student from './student';
import LanguageTaken from './takenlanguage';
import Course from './course';
import ScheduleTable from './schedule';
import TeacherAttendance from './attendance';
import '../styles/dashboard2.css';
import hdlang2 from '../images/hdlang42.png'
import horizontal from '../images/Rectangle20.png'
import logoutIcon from '../images/exit1.png';
function Dashboard() {
    const [activePage, setActivePage] = useState('teacher');

    const handleMenuClick = (page) => {
        setActivePage(page);
    };
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/');
    }


    return (
        <div className="menu-and-content">

            <div className="menu">
                <h1 className='h1-top'>  <a href="/">LLC</a></h1>
                <div className="menu-content">
                    <div className='llctop'>

                        <img className='svg-1' src={horizontal} alt="" />
                    </div>
                    <div className="menu-item">
                        <a href="#teacher" onClick={() => handleMenuClick('teacher')}>Teacher</a>
                    </div>
                    <div className="menu-item">
                        <a href="#student" onClick={() => handleMenuClick('student')}>Student</a>
                    </div>
                    <div className="menu-item">
                        <a href="#language" onClick={() => handleMenuClick('language')}>Language</a>
                    </div>
                    <div className="menu-item">
                        <a href="#course" onClick={() => handleMenuClick('course')}>Course</a>
                    </div>
                    <div className="menu-item">
                        <a href="#schedule" onClick={() => handleMenuClick('schedule')}>Schedule</a>
                    </div>
                    <div className="menu-item">
                        <a href="#attendance" onClick={() => handleMenuClick('attendance')}>Attendance</a>
                    </div>
                    <div className="button-logout-31">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <div id="content" style={{ flex: 1, paddingLeft: '20px' }}>
                <div className='top-image'>
                    <img src={hdlang2} alt="" />
                </div>
                {activePage === 'teacher' && <Teacher />}
                {activePage === 'student' && <Student />}
                {activePage === 'language' && <LanguageTaken />}
                {activePage === 'course' && <Course />}
                {activePage === 'schedule' && <ScheduleTable />}
                {activePage === 'attendance' && <TeacherAttendance />}
            </div>
        </div>
    );
}

export default Dashboard;