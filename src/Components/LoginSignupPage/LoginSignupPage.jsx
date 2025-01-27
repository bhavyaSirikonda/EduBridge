import React, { useState } from 'react'
import "./LoginSignupPage.css"
import home_icon from '../Assets/home.png'

export const LoginSignupPage = () => {

    const[action,setAction] = useState("Sign Up")


  return (
    <div>
    <div className="container">
        
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Login"?<div></div>:<div className="input">
            <img src="" alt="" />
            <input type="name" placeholder="Name"/>
        </div>}

        
        <div className="input">
            <img src="" alt="" />
            <input type="email" placeholder="Email"/>
        </div>
        <div className="input">
            <img src="" alt="" />
            <input type="password" placeholder="Password"/>

        </div>
            {action==="Sign Up"?<div></div>:<div className="forgotPassword">Forgot Password?<span>Click Here</span></div>}
            

        <div className="submitContainer">

            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={() => {setAction("Login")}}>Login</div>

        </div>
        </div>
    </div>
        <p> <a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a></p>
    
        </div>     
  )
}

export default LoginSignupPage
