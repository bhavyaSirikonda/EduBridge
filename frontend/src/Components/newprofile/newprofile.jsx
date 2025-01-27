import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../css/LoginSignupPage.css"
import home_icon from '../Assets/home.png'
import { handleRegister } from './signuphandle';

export const SignupPage = () => {

    const[action,setAction] = useState("New Profile");
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const callRegisterHandler = async () => {
        try {
            const message = await handleRegister(name,email, password); // Use the handleLogin function
            alert(message);

          } catch (error) {
            alert(error);
          }
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

                </div>
            </div>
            <p> <a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a></p>

        </div>
    )
    }

export default SignupPage
