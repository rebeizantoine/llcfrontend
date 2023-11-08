import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../styles/login.css";
import Goback from "../images/goback.png";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const navigate = useNavigate();
  const captchaRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const token = captchaRef.current.getValue();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/getAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          const user = data.data.find(
            (userData) =>
              userData.email === username &&
              userData.password === password &&
              userData.active === 1
          );

          if (user) {
            localStorage.setItem("user_id", user.user_id);
            localStorage.setItem("userrole", user.role);
            navigate("/dash");
          } else {
            alert("Incorrect email or password. Please try again.");
          }
        } else {
          alert("API request failed.");
        }
      } else {
        const errorData = await response.text();
        console.error(errorData);
        alert("An error occurred while processing your request.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing your request.");
    }
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const userrole = localStorage.getItem("userrole");

    if (user_id && userrole) {
      navigate("/dash");
    }
  }, [navigate]);

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
          <label htmlFor="email" className="email1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password" className="password1">
            Password
          </label>
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
