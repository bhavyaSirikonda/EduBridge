import React, { element, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RedirectToLogin from './components/checkLogin/RedirectToLogin';
import AdminHome from './components/Admin/admin';
import Sidebar from './components/Sidebar/sidebar';
import './App.css';
import io from 'socket.io-client';
import Courses from './components/Courses/Courses';
import bg from './resources/bg.png'
import { getIntructor } from './components/Courses/getInstructor';
import { getacourse } from './components/Courses/handleGetCourses';
import Modules from './components/Courses/modules';
import Assignments from './components/Courses/assignments';
import Quizes from './components/Courses/quiz';

const App = () => {

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [instructor, setInstructor] = useState(null);

  const [course,setCourse] = useState(null);

  // console.log(location.host)
  // document.cookie = "sharedData=; Max-Age=0; path=/; domain=localhost";

  var adminlogged =document.cookie;
  adminlogged=adminlogged.split(';');

  const instructor_email = adminlogged[0].split("=")[1];

  // if (adminlogged){
  //   setShouldRedirect(true);
  // }

  useEffect(() => {
    const callLoginHandler = async () => {
      try {
        const fetchedInstructor = await getIntructor(instructor_email);
        setInstructor(fetchedInstructor[0]);
      } catch (e) {
        console.log(e);
      }
    };
    callLoginHandler();
  }, [instructor_email]);

  useEffect(() => {
    const callCourseHandler = async () => {
      try {
        const fetchedCourse = await getacourse(instructor.faculty);
        setCourse(fetchedCourse[0]);
      } catch (e) {
        console.log(e);
      }
    };
    callCourseHandler();
  }, [instructor]);

  // console.log(instructor)
  // console.log(course)

  if (adminlogged.length < 1){
      window.location="http://localhost:3000/"
  }
  else if (instructor){

    const backgroundStyle = {
      backgroundImage: `url(${bg})`, // Replace with the correct image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '93.5vh', // Make the background cover the entire viewport height
    };
    return (
      <Router>
            <Routes>
                <Route path="/" element={

                <div className="app" style={backgroundStyle}>
                  <Sidebar />
                  <AdminHome name={instructor.username} />
                </div>


                }/>

                <Route path="/courses" element={
                    <div className="app" style={backgroundStyle}>
                      <Sidebar />
                      <Courses coursedetails={instructor.faculty} course={course}/>
                      </div>
                } />
                <Route path="/modules" element={
                    <div className="app" style={backgroundStyle}>
                      <Sidebar />
                      <Modules  coursedetails={instructor.faculty} course={course}/>
                      </div>
                } />
                <Route path="/assignments" element={
                    <div className="app" style={backgroundStyle}>
                      <Sidebar />
                      <Assignments  coursedetails={instructor.faculty} course={course}/>
                      </div>
                } />
                <Route path="/quizes" element={
                    <div className="app" style={backgroundStyle}>
                      <Sidebar />
                      <Quizes  coursedetails={instructor.faculty} course={course}/>
                      </div>
                } />

            </Routes>
      </Router>
    );
  }


};

export default App;