import React from 'react';
import '../styles/login.css'

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login1">Login</h1>
                <form className="form1">
                    <label htmlFor="email" className="email1">Email Address</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password" className="password1">Password</label>
                    <input type="password" id="password" name="password" required />

                    <button type="submit" className="submit1">Login</button>
                </form>
                <div className="register-now">
                    <a href="#" className="register-link">Register Now</a>
                </div>
            </div>
        </div>
    );
};

export default Login;