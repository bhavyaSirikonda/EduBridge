import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../css/LoginSignupPage.css"
import home_icon from '../Assets/home.png'
import { handleRegister } from './signuphandle';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { googlehandleLogin } from '../login/googleloginhandle';
import jwtDecode from 'jwt-decode';


export const SignupPage = () => {

    const[action,setAction] = useState("Sign Up");
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const callRegisterHandler = async () => {
        try {
            const message = await handleRegister(name,email, password); // Use the handleLogin function
            alert(message);
            if (message=="Registration successful"){
                navigate("/dashboard");
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
            navigate("/dashboard");
        }
        else if (message=="Registration successful"){
            navigate("/dashboard");
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
                        <input type="name" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className="input">
                        <img src="" alt="" />
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="input">
                        <img src="" alt="" />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    {action==="Sign Up"?<div></div>:<div className="forgotPassword">Forgot Password?<span>Click Here</span></div>}
                    <p>Already a member? <Link to="/">Login here</Link></p>
                    <div className="submitContainer">
                        <div className={action==="Login"?"submit gray":"submit"} onClick={callRegisterHandler}>Sign Up</div>
                    </div>
                    <div className="submitContainer">
                       <GoogleOAuthProvider clientId="433159541144-5nb1cb2l5nc9td7rsb5cbtbsititck5i.apps.googleusercontent.com">
                           <GoogleLogin onSuccess={googleResponseMessage} onError={errorMessage} />
                       </GoogleOAuthProvider>
                     </div>

                </div>
            </div>
            <p> <a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a></p>

        </div>
    )
    }

export default SignupPage
