import React, { element, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RedirectToLogin from './components/checkLogin/RedirectToLogin';
import AdminHome from './components/Admin/admin';
import Sidebar from './components/Sidebar/sidebar';
import './App.css';
import io from 'socket.io-client';
import Courses from './components/Courses/Courses';
import bg from './resources/bg.png'

const App = () => {

  const [shouldRedirect, setShouldRedirect] = useState(false);

  // console.log(location.host)
  // document.cookie = "sharedData=; Max-Age=0; path=/; domain=localhost";

  var adminlogged =document.cookie;
  adminlogged=adminlogged.split(';');
  console.log(adminlogged[1])
  // if (adminlogged){
  //   setShouldRedirect(true);
  // }

  // if (adminlogged.length < 1){
  //     window.location="http://localhost:3000/"
  // }

  // else{

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
                  <AdminHome />
                </div>


                }/>

                <Route path="/courses" element={
                    <div className="app" style={backgroundStyle}>
                      <Sidebar />
                      <Courses/>
                      </div>
} />

            </Routes>
      </Router>
    );
  }


// };

export default App;