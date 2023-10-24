import React, { useState } from 'react';
import Teacher from './teacher';
import Student from './student';
import '../styles/dashboard.css';
function MenuAndContent() {
    const [activePage, setActivePage] = useState('teacher'); 

    const handleMenuClick = (page) => {
        setActivePage(page);
    };

    return (
        <div className="menu-and-content">
            <div className="menu">
                <div className="menu-content">
                    <div className="menu-item">
                        <a href="#teacher" onClick={() => handleMenuClick('teacher')}>Teacher</a>
                    </div>
                    <div className="menu-item">
                        <a href="#student" onClick={() => handleMenuClick('student')}>Student</a>
                    </div>
                </div>
            </div>
            <div id="content" style={{ flex: 1, paddingLeft: '20px' }}>
                {activePage === 'teacher' && <Teacher />}
                {activePage === 'student' && <Student />}
            </div>
        </div>
    );
}

export default MenuAndContent;
