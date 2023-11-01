import { useEffect, useState } from 'react';
import { Route, Outlet, useNavigate } from 'react-router-dom';

const isAuthenticated = () => {
    return localStorage.getItem("user_id") !== null;
};

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthBool, setIsAuthBool] = useState(false);

    useEffect(() => {
        const checkAuthenticated = () => {
            if (!isAuthenticated()) {
                navigate("/login");
            } else {
                setIsAuthBool(true);
            }
        };

        checkAuthenticated();
    }, [isAuthenticated, navigate]);

    if (!isAuthBool) return null;

    console.log(children);

    return children;
};

export default ProtectedRoute;
