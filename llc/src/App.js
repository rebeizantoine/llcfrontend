import React, { useEffect } from "react";
import "./Component/styles/App.css";
import About from "./Component/comp/About";
import Header from "./Component/comp/header";
import { Helmet } from 'react-helmet';
import Testimonial from "./Component/comp/Testimonial";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./Component/comp/login";
import Footer from "./Component/comp/footer";
import Popular from "./Component/comp/popular";
import Contact from "./Component/comp/Contactus";
import AllCourses from "./Component/comp/view-all-courses";
import Dashboard from "./Component/comp/Dashboard";
import Register from "./Component/comp/register";
import Section from "./Component/comp/section";
import Hero from "./Component/comp/hero";
import DashboardStudent from "./Component/comp/Dashboardstudent";
import DashboardTeacher from "./Component/comp/Dashboardteacher";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Component/comp/ProtectedRoute";
import MainDash from "./Component/comp/maindashboard";
import image1 from './Component/images/imagehero1.png';
function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Language Learning Center</title>
        <link rel="icon" href="https://i.ibb.co/gVRfV8S/imagehero1.png" type="image/x-icon" />
      </Helmet>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <Section />
                <About />
                <Popular />
                <Testimonial />
                <ToastContainer />
                <Footer />
              </>
            }
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AllCourses" element={<AllCourses />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dash/*"
            element={
              <ProtectedRoute>
                <MainDash />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
