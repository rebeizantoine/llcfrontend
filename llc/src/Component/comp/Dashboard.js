import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import Hero1 from '../images/hdlang42.png';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { url } = useRouteMatch();
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);
  const [newUser, setNewUser] = useState({ email: '', password: '', active: false });
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/user/getTeacher')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const updateUserActivation = (userId, isActive) => {
    const apiUrl = isActive
      ? `http://localhost:8000/user/updateActivationforuser/${userId}`
      : `http://localhost:8000/user/updateActivationforuserneg/${userId}`;

    axios.put(apiUrl, { isActive })
      .then(response => {
        setUsers(prevUsers => prevUsers.map(user => {
          if (user.user_id === userId) {
            user.active = isActive;
          }
          return user;
        }));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const editUser = (user) => {
    setEditedUser(user);
  };
  
  const saveEditedUser = (userId, updatedUserData) => {
    const apiUrl = `http://localhost:8000/user/updateUser/${userId}`;

    axios.put(apiUrl, updatedUserData)
      .then(response => {
        setUsers(prevUsers => prevUsers.map(user => {
          if (user.user_id === userId) {
            return { ...user, ...updatedUserData };
          }
          return user;
        }));
        setEditedUser(null);
      })
      .catch(error => {
        console.error('Error updating user details:', error);
      });
  };

  const addUser = () => {
    setIsAddingUser(true);
  };

  const handleNewUserChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewUser(prevNewUser => ({
      ...prevNewUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const saveNewUser = () => {
    axios.post('http://localhost:8000/user/addTeacher', newUser)
      .then(response => {
        setUsers(prevUsers => [...prevUsers, response.data]);
        setIsAddingUser(false);
        setNewUser({ email: '', password: '', active: false });
      })
      .catch(error => {
        console.error('Error adding a new user:', error);
      });
  };

  const handleCancel = () => {
    setIsAddingUser(false);
    setNewUser({ email: '', password: '', active: false });
  };

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
            <Teachers
              users={users}
              updateUserActivation={updateUserActivation}
              editUser={editUser}
              saveEditedUser={saveEditedUser}
              addUser={addUser}
              isAddingUser={isAddingUser}
              newUserData={newUser}
              handleNewUserChange={handleNewUserChange}
              saveNewUser={saveNewUser}
              handleCancel={handleCancel}
            />
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
};

const Teachers = ({ users, updateUserActivation, editUser, saveEditedUser, addUser, isAddingUser, newUserData, handleNewUserChange, saveNewUser, handleCancel }) => (
  <div>
    <h1>Teachers</h1>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Password</th>
          <th>Active</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <UserRow
            key={user.user_id}
            user={user}
            updateUserActivation={updateUserActivation}
            editUser={editUser}
            saveEditedUser={saveEditedUser}
          />
        ))}
      </tbody>
    </table>
    {isAddingUser ? (
      <div>
        <h2>Add Teacher</h2>
        <form>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={newUserData.email}
              onChange={handleNewUserChange}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={newUserData.password}
              onChange={handleNewUserChange}
            />
          </label>
          <label>
            Active:
            <input
              type="checkbox"
              name="active"
              checked={newUserData.active}
              onChange={handleNewUserChange}
            />
          </label>
          <button onClick={saveNewUser}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    ) : (
      <button onClick={addUser}>Add Teacher</button>
    )}
  </div>
);

const UserRow = ({ user, updateUserActivation, editUser, saveEditedUser,handleCancel }) => {
  const isEditing = editUser && editUser.user_id === user.user_id;
  const [editedUserData, setEditedUserData] = useState({ ...user });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleEdit = () => {
    editUser(user);
  };

  const handleSave = () => {
    saveEditedUser(user.user_id, editedUserData);
  };

  return (
    <tr>
      <td>{user.user_id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="email"
            value={editedUserData.email}
            onChange={handleInputChange}
          />
        ) : (
          user.email
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="password"
            value={editedUserData.password}
            onChange={handleInputChange}
          />
        ) : (
          user.password
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <label>
            <input
              type="radio"
              name={`activation-${user.user_id}`}
              value="Yes"
              checked={user.active}
              onChange={() => updateUserActivation(user.user_id, true)}
            />
            Yes
          </label>
        )}
        {isEditing ? (
          <button onClick={handleCancel}>Cancel</button>
        ) : (
          <label>
            <input
              type="radio"
              name={`activation-${user.user_id}`}
              value="No"
              checked={!user.active}
              onChange={() => updateUserActivation(user.user_id, false)}
            />
            No
          </label>
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </td>
    </tr>
  );
};

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
