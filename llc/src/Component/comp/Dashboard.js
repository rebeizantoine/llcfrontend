import React, { useState } from 'react';
import Teacher from './teacher';
import '../styles/teacher.css'
import Student from './student';
import '../styles/dashboard2.css';
import hdlang2 from '../images/hdlang42.png'
import horizontal from '../images/Rectangle20.png'
function MenuAndContent() {
    const [activePage, setActivePage] = useState('teacher');

    const handleMenuClick = (page) => {
        setActivePage(page);
    };

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
                </div>
            </div>
            <div id="content" style={{ flex: 1, paddingLeft: '20px' }}>
                <div className='top-image'>
                    <img src={hdlang2} alt="" />
                </div>
                {activePage === 'teacher' && <Teacher />}
                {activePage === 'student' && <Student />}
            </div>
        </div>
    );
}

export default MenuAndContent;