import React from 'react';

const Register = () => {
    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="register-title">REGISTRATION FORM</h1>
                <form className="register-form">
                    <div className="name-container">
                        <label htmlFor="name" className="text-label">Name</label>
                        <input type="text" id="name" name="name" className="name-label" />

                        <label htmlFor="lastname" className="text-label">Last Name</label>
                        <input type="text" id="lastname" name="lastname" className="name-label" />
                    </div>

                    <label htmlFor="email" className="field-label">Email Address</label>
                    <input type="email" id="email" name="email" required className="field-input" />

                    <label htmlFor="password" className="field-label">Password</label>
                    <input type="password" id="password" name="password" required className="field-input" />

                    <label htmlFor="dob" className="field-label">Date of Birth</label>
                    <div className="dob-container">
                        <input type="text" id="day" name="day" className="dob-input" placeholder="DD" required />
                        <input type="text" id="month" name="month" className="dob-input" placeholder="MM" required />
                        <input type="text" id="year" name="year" className="dob-input" placeholder="YYYY" required />
                    </div>

                    <label htmlFor="gender" className="field-label">Gender</label>
                    <select id="gender" name="gender" className="gender-dropdown">
                        <option value="" disabled selected>Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <button type="submit" className="register-button">REGISTER</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
