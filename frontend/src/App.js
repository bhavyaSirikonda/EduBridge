import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './Components/login/login';
import SignupPage from './Components/signup/signup';
import StudentHome from './Components/studentView/student';
import CoursesHome from './Components/studentView/Courses';
import Sidebar from './Components/studentView/sidebar';
import bg from './Components/studentView/bg.png'


function App() {

  const backgroundStyle = {
    backgroundImage: `url(${bg})`, // Replace with the correct image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '93.5vh', // Make the background cover the entire viewport height
  };

  return (

    <Router>

        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/register" element={<SignupPage/>} />
            {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
            <Route path="/studenthome" element={
              <div className="app" style={backgroundStyle}>
                <Sidebar />
                <CoursesHome/>
              </div>}/>
          </Routes>
        </div>

    </Router>


  );
}

export default App;