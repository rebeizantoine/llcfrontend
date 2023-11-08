import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/register.css';
import Imagesmall from '../images/goback.png'

const Register = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const genderSelectRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the request body with email, password, and active
        const requestBody = {
            email: e.target.email.value,
            password: e.target.password.value,
            active: '1',
        };

        // Send a POST request to the API
        try {
            const response = await fetch('/user/addStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                setSuccessMessage('Registration successful!');
                e.target.reset(); // Reset the form, clearing input fields
                genderSelectRef.current.value = ''; // Reset the select to its initial state
            } else {
                setSuccessMessage('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setSuccessMessage('An error occurred during registration.');
        }
    };

    return (
        <div className="page-container">
            <div className="register-container">
                <div className="register-box">
                    <h1 className="register-title">
                        <Link to="/">
                            <img class="image-goback" src={Imagesmall} alt="Home" />
                        </Link> REGISTRATION FORM</h1>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="name-container">
                            <label htmlFor="name" className="text-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="name-label"
                                required
                            />

                            <label htmlFor="lastname" className="text-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                className="name-label"
                                required
                            />
                        </div>

                        <label htmlFor="email" className="field-label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="field-input"
                        />

                        <label htmlFor="password" className="field-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="field-input"
                        />

                        <label htmlFor="dob" className="field-label">
                            Date of Birth
                        </label>
                        <div className="dob-container">
                            <input
                                type="text"
                                id="day"
                                name="day"
                                className="dob-input"
                                placeholder="DD"
                                required
                            />
                            <input
                                type="text"
                                id="month"
                                name="month"
                                className="dob-input"
                                placeholder="MM"
                                required
                            />
                            <input
                                type="text"
                                id="year"
                                name="year"
                                className="dob-input"
                                placeholder="YYYY"
                                required
                            />
                        </div>

                        <label htmlFor="gender" className="field-label">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            className="gender-dropdown"
                            ref={genderSelectRef}
                        >
                            <option value="" defaultValue>
                                Select
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <button type="submit" className="register-button">
                            REGISTER
                        </button>
                    </form>
                </div>
                {successMessage && <p>{successMessage}</p>}
            </div>
        </div>
    );
};

export default Register;