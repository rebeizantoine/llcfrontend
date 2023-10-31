import React, { useState, useEffect } from 'react';
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
import Dashboard from './Component/comp/AdminDashboardcomp/Dashboard';
import Register from './Component/comp/register';
import Section from './Component/comp/section';
import Hero from './Component/comp/hero';
import DashboardStudent from './Component/comp/Dashboardstudent';
import DashboardTeacher from './Component/comp/Dashoardteacher';
import ProtectedRoute from './Component/comp/ProtectedRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsAuthenticated(!!userId);
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Hero />
            <Section />
            <About />
            <Courses />
            <Testimonial />
            <ToastContainer />
            <Footer />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Register">
            <Register />
          </Route> 
          <Route path="/AllCourses">
            <AllCourses />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/Student">
            <DashboardStudent />
          </Route>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
          <ProtectedRoute
            path="/Dashboard"
            component={Dashboard}
            isAuthenticated={isAuthenticated}
          />
         
          <ProtectedRoute
            path="/DashboardTeacher"
            component={DashboardTeacher}
            isAuthenticated={isAuthenticated}
          />
          <ProtectedRoute
            path="/DashboardStudent"
            component={DashboardStudent}
            isAuthenticated={isAuthenticated}
          />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
