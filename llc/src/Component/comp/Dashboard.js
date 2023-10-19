import React from 'react';
import Hero1 from '../images/hdlang42.png';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import '../styles/dashboard.css';


const Dashboard = () => {
    const { url } = useRouteMatch();

    return (
        <div className="dashboard">
            <div className="side-panel">
                <div className="panel-title">LLC</div>
                <div className="svg-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476 20" fill="none">
                        <rect width="100%" height="100%" fill="#5E443A" />
                    </svg>
                </div>
                <div className="panel-section">
                    <Link to={`${url}/teachers`}>TEACHERS</Link>
                </div>
                <div className="panel-section">
                    <Link to={`${url}/students`}>STUDENTS</Link>
                </div>
                <div className="panel-section">
                    <Link to={`${url}/attendance`}>ATTENDANCE</Link>
                </div>
                <div className="panel-section">
                    <Link to={`${url}/courses`}>COURSES</Link>
                </div>
                <div className="panel-section">
                    <Link to={`${url}/schedule`}>SCHEDULE</Link>
                </div>
            </div>
            <div className="dashboard-content">
                <img src={Hero1} alt="Dashboard Image" className="dashboard-image" />
                <Switch>
                    <Route path={`${url}/teachers`}>
                        <Teachers />
                    </Route>
                    <Route path={`${url}/students`}>
                        <Students />
                    </Route>
                    <Route path={`${url}/attendance`}>
                        <Attendance />
                    </Route>
                    <Route path={`${url}/courses`}>
                        <Courses />
                    </Route>
                    <Route path={`${url}/schedule`}>
                        <Schedule />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

const Teachers = () => (
    <div>
        <h2>TEACHERS</h2>
    </div>
);

const Students = () => (
    <div>
        <h2>STUDENTS</h2>
    </div>
);

const Attendance = () => (
    <div>
        <h2>ATTENDANCE</h2>
    </div>
);

const Courses = () => (
    <div>
        <h2>COURSES</h2>
    </div>
);

const Schedule = () => (
    <div>
        <h2>SCHEDULE</h2>
    </div>
);

export default Dashboard;
