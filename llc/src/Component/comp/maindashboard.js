import React, { useReducer } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";

import StudentComponent from "./Dashboardstudent";
import TeacherComponent from "./Dashboardteacher";
import Dashboard from "./Dashboard";

const Dash = () => {
    const userRole = localStorage.getItem("userrole");
    const navigate = useNavigate();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    userRole === "admin" ? (
                        <Dashboard />
                    ) : userRole === "teacher" ? (
                        <TeacherComponent />
                    ) : userRole === "student" ? (
                        <StudentComponent />
                    ) : (
                        <navigate to="/login" />
                    )
                }
            />
        </Routes>
    );
};

export default Dash;