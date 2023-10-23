import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'password') {
            // Correct credentials; redirect to the Dashboard route
            history.push('/Dashboard');
        } else {
            // Incorrect credentials; handle error or show a message
            alert('Incorrect username or password. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
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