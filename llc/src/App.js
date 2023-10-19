import React from 'react';
import './Component/styles/App.css';
import About from './Component/comp/About';
import Header from './Component/comp/header';
import Testimonial from './Component/comp/Testimonial';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Component/comp/login';
import Mainn from './Component/comp/main';
import Footer from './Component/comp/footer';
import Courses from './Component/comp/popular';
import Contact from './Component/comp/Contactus';
import AllCourses from './Component/comp/view-all-courses';
import Dashboard from './Component/comp/Dashboard';
import Register from './Component/comp/Register';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <About />
            <Courses />
            <Testimonial />
            <Footer />

          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/\Register">
            <Register />
          </Route>

          <Route path="/Dashboard">
            <Dashboard />
          </Route>

          <Route path="/AllCourses">
            <AllCourses />
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
