import React, { Component } from 'react';
import axios from 'axios';
import '../styles/student.css'

class Teacher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teacherData: [],
            newTeacher: {
                email: '',
                password: '',
                active: 0,
            },
        };
    }

    componentDidMount() {
        this.fetchTeacherData();
    }

    fetchTeacherData() {
        axios
            .get(`${process.env.REACT_APP_API_URL}/user/getStudent`)
            .then((response) => {
                this.setState({ teacherData: response.data.data });
            })
            .catch((error) => {
                console.error("Error fetching teacher data:", error);
            });
    }

    handleEmailChange = (user_id, emailValue) => {
        this.updateTeacherData(user_id, { email: emailValue });
    };

    handlePasswordChange = (user_id, passwordValue) => {
        this.updateTeacherData(user_id, { password: passwordValue });
    };

    handleActiveChange = (user_id, activeValue) => {
        this.updateTeacherData(user_id, { active: activeValue });
    };

    handleAddNewTeacher = () => {
        // Implement the logic to add a new teacher using the provided API endpoint
        axios
            .post(`${process.env.REACT_APP_API_URL}/user/addStudent`, this.state.newTeacher)
            .then(() => {
                console.log("New teacher added successfully.");
                // Clear the form fields
                this.setState({
                    newTeacher: {
                        email: '',
                        password: '',
                        active: 0,
                    },
                });
                // Fetch updated teacher data
                this.fetchTeacherData();
            })
            .catch((error) => {
                console.error("Error adding new teacher:", error);
            });
    };

    handleEditClick = (user_id) => {
        this.setState((prevState) => ({
            teacherData: prevState.teacherData.map((teacher) =>
                teacher.user_id === user_id ? { ...teacher, editable: true } : teacher
            ),
        }));
    };

    handleSaveClick = (user_id) => {
        // Implement your save logic here
        // You can update the values in the database using the API
        const updatedTeacher = this.state.teacherData.find((teacher) => teacher.user_id === user_id);
        axios
            .put(`${process.env.REACT_APP_API_URL}/user/updateUser/${user_id}`, updatedTeacher)
            .then(() => {
                this.setState((prevState) => ({
                    teacherData: prevState.teacherData.map((teacher) =>
                        teacher.user_id === user_id ? { ...teacher, editable: false } : teacher
                    ),
                }));
                console.log(`Teacher with ID ${user_id} has been updated.`);
            })
            .catch((error) => {
                console.error(`Error updating teacher with ID ${user_id}:`, error);
            });
    };

    updateTeacherData(user_id, updatedData) {
        this.setState((prevState) => ({
            teacherData: prevState.teacherData.map((teacher) =>
                teacher.user_id === user_id ? { ...teacher, ...updatedData } : teacher
            ),
        }));
    }

    handleNewTeacherChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            newTeacher: {
                ...prevState.newTeacher,
                [name]: value,
            },
        }));
    };

    render() {
        return (
            <div id='student'>
                <h1 className='teacher-data'>Student Data</h1>
                <table className='table21'>
                    <thead className='table2'>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teacherData.map((teacher) => (
                            <tr key={teacher.user_id}>
                                <td>{teacher.user_id}</td>
                                <td>
                                    {teacher.editable ? (
                                        <input className='edit-email'
                                            type="text"
                                            value={teacher.email}
                                            onChange={(e) => this.handleEmailChange(teacher.user_id, e.target.value)}
                                        />
                                    ) : (
                                        teacher.email
                                    )}
                                </td>
                                <td>
                                    {teacher.editable ? (
                                        <input className='edit-password'
                                            type="text"
                                            value={teacher.password}
                                            onChange={(e) => this.handlePasswordChange(teacher.user_id, e.target.value)}
                                        />
                                    ) : (
                                        teacher.password
                                    )}
                                </td>
                                <td>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`active-${teacher.user_id}`}
                                                value="1"
                                                checked={teacher.active === 1}
                                                onChange={() => this.handleActiveChange(teacher.user_id, 1)}
                                                disabled={!teacher.editable}
                                            />
                                            Active
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`active-${teacher.user_id}`}
                                                value="0"
                                                checked={teacher.active === 0}
                                                onChange={() => this.handleActiveChange(teacher.user_id, 0)}
                                                disabled={!teacher.editable}
                                            />
                                            Inactive
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    {teacher.editable ? (
                                        <button className='button-edit' onClick={() => this.handleSaveClick(teacher.user_id)}>Save</button>
                                    ) : (
                                        <button className='button-edit' onClick={() => this.handleEditClick(teacher.user_id)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2 className='student-data'>Add New Student</h2>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={this.state.newTeacher.email}
                        onChange={this.handleNewTeacherChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="text"
                        name="password"
                        value={this.state.newTeacher.password}
                        onChange={this.handleNewTeacherChange}
                    />
                </div>
                <div>
                    <label>Active:</label>
                    <input
                        type="radio"
                        name="active"
                        value="1"
                        checked={this.state.newTeacher.active === 1}
                        onChange={this.handleNewTeacherChange}
                    />
                    <label>Active</label>
                    <input
                        type="radio"
                        name="active"
                        value="0"
                        checked={this.state.newTeacher.active === 0}
                        onChange={this.handleNewTeacherChange}
                    />
                    <label>Inactive</label>
                </div>
                <button onClick={this.handleAddNewTeacher}>Add Teacher</button>
            </div>
        );
    }
}

export default Teacher;