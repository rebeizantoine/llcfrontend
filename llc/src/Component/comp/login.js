import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';
import Goback from '../images/goback.png'

const Login = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Make an API request to fetch user data from "http://localhost:8000/user/getAll"
        try {
            const response = await fetch("http://localhost:8000/user/getAll");
            const data = await response.json();

            if (data.success) {
                const user = data.data.find((userData) => userData.email === username && userData.password === password && userData.active === 1);

                if (user) {
                    if (user.role === 'teacher') {
                        // Redirect to the teacher component
                        history.push('/TeacherComponent');
                    } else if (user.role === 'student') {
                        // Redirect to the student component
                        history.push('/StudentComponent');
                    } else if (user.role === 'admin') {
                        // Redirect to the admin component
                        history.push('/AdminComponent');
                    } else {
                        alert('Invalid role. Please try again.');
                    }
                } else {
                    alert('Incorrect email or password. Please try again.');
                }
            } else {
                alert('API request failed.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while processing your request.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="home-link">
                    <Link to="/">
                        <img src={Goback} alt="Home" />
                    </Link>
                </div>
                <h1 className="login1">Login</h1>
                <form className="form1">
                    <label htmlFor="email" className="email1">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password" className="password1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="button" onClick={handleLogin} className="submit1">
                        Login
                    </button>
                </form>
                <div className="register-now">
                    <Link to="/Register">Register Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
/*const userId = localStorage.getItem('userId');
if (userId !== null) {

  localStorage.removeItem('userId');
  console.log('userId has been removed from local storage');
} else {
  console.log('userId not found in local storage');
}*/