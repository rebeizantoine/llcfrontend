import React, { useState } from 'react';
import Teacher from './teacher';
import './teacher.css'
import Student from './student';
import './dashboard2.css';
import hdlang2 from './hdlang42.png';
import horizontal from './Rectangle20.png';
import Language from './takenlanguage';
import Course from './course';
import Schedule from './schedule';
import Attendance from './attendance';
function MenuAndContent() {
    const [activePage, setActivePage] = useState('teacher');

    const handleMenuClick = (page) => {
        setActivePage(page);
    };
// if role == admin show admin component 
// 
    return (
        <div className="menu-and-content">
            <div className="menu">
                <h1 className='h1-top'>LLC</h1>
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
                </div>
            </div>
            <div id="content" style={{ flex: 1, paddingLeft: '20px' }}>
                <div className='top-image'>
                    <img src={hdlang2} alt="" />
                </div>
                {activePage === 'teacher' && <Teacher />}
                {activePage === 'student' && <Student />}
                {activePage === 'language' && <Language />}
                {activePage === 'course' && <Course/>}
                {activePage === 'schedule' && <Schedule/>}
                {activePage === 'attendance' && <Attendance/>}
            </div>
        </div>
    );
}

export default MenuAndContent;