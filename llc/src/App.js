import React from 'react';
import './Component/styles/App.css';
import About from './Component/comp/About';
import Header from './Component/comp/header';
import Testimonial from './Component/comp/Testimonial';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Component/comp/login';
import Footer from './Component/comp/footer';
import Courses from './Component/comp/popular';
import Contact from './Component/comp/Contactus';
import AllCourses from './Component/comp/view-all-courses';
import Dashboard from './Component/comp/Dashboard';
import Register from './Component/comp/register';
import Section from './Component/comp/section';


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Section />
            <About />
            <Courses />
            <Testimonial />
            <Footer />

          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>

          <Route path="/Dashboard">
            <Dashboard />
          </Route>
          <Route path="/AdminComponent">
            <Dashboard />
          </Route>
          <Route path="/AllCourses">
            <AllCourses />
          </Route>
          <Route path="/StudentComponent">
            <AllCourses />
          </Route>
          
          <Route path="/TeacherComponent">
            <Contact />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
