import React, { useState,useEffect } from 'react'
import "../css/LoginSignupPage.css"
//import css from "./LoginModal.module.css";
import css from "../Footer/Footer.module.css";
import Footer from "../Footer/Footer";
import home_icon from '../Assets/home.png'
import { Link,useNavigate } from 'react-router-dom';
import { handleLogin } from './loginhandle';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { googlehandleLogin } from './googleloginhandle';

import jwtDecode from 'jwt-decode';
import io from 'socket.io-client';


export const LoginPage = () => {
    const[action,setAction] = useState("Login")
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    // const socket = io('http://localhost:4000');
    const callLoginHandler = async () => {
        try {
            const message = await handleLogin(email, password); // Use the handleLogin function
            alert(message);
            if (message == "Welcome Admin"){
                document.cookie = "sharedData=someData; path=/";
                // socket.emit('admin is here');
                window.location='http://localhost:3001/';
            }
            else if (message=="Welcome Instructor"){
                const dataToSend = {
                    key: email, // Your data to pass
                  };
                document.cookie = `sharedData=${email}; path=/`;

                window.location=`http://localhost:3002/`;
            }
            else if (message=="Login successful"){
                navigate("/studenthome");
            }
          } catch (error) {
            alert(error);
          }
      };

    const googleResponseMessage = async (response) => {

        var obj = jwtDecode(response.credential);
        const message= await googlehandleLogin(obj["email"],obj["name"]);
        alert(message);
        if (message=="Login successful"){
            navigate("/studenthome");
        }
        else if (message=="Registration successful"){
            navigate("/studenthome");
        }
    };
    const errorMessage = (error) => {
        alert("Google Authentication Failed");
    };

  return (
    <div>
        <div className="container">

            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
            <div className="input">
                <img src="" alt="" />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input">
                <img src="" alt="" />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="submitContainer">
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={callLoginHandler}>Login</div>
                </div>
            </div>
           <p>
              {action === "Sign Up" ? (
                  <div></div>
                ) : (
                   <div className="forgotPassword">
                      <span style={{ textAlign: "right" }}>Forgot Password?</span>
                      <span>Click Here</span>
                   </div>
                     )}
                    New to the site? <Link to="/register">Register here</Link>
           </p>
           <div className="submitContainer">
              <GoogleOAuthProvider clientId="433159541144-5nb1cb2l5nc9td7rsb5cbtbsititck5i.apps.googleusercontent.com">
                    <GoogleLogin onSuccess={googleResponseMessage} onError={errorMessage} />
              </GoogleOAuthProvider>
           </div>


        </div>

        <p> <a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a></p>
        <div className={css.footer} style={{ backgroundColor: 'lightgrey' }}>
            <Footer />
        </div>
    </div>
  )
}

export default LoginPage