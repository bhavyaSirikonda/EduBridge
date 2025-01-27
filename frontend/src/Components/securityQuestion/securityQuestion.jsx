//Add Security Question to account 

import "../css/securityQuestion.css"
import React from 'react'
import Homepage from "../homepage/homepage"
import { useNavigate } from 'react-router-dom'

export const SecurityQuestion = () => {
    const navigate = useNavigate();
    return(
        <div class='container'>
            <div className="head">
                <h1>Security Questions</h1>
            </div>
            <div className="questions">
                <div className="question">
                    <select onChange={(e) => console.log(e.target.value)}>
                        <option>"What was your home town?</option> 
                        <option>"What is your favorite color?</option>
                        <option>"What was your first pet's name?</option>
                        <option>"What was the name of your Highschool?</option>
                        <option>"What is your sibling's middle name?</option>
                        <option>"What is your favorite sports team?</option>
                    </select>
                    <input type="question" placeholder="Answer" onChange={(e) => console.log(e.target.value)}/>  
                </div>
                <div className="question">
                    <select onChange={(e) => console.log(e.target.value)}>
                        <option>"What was your home town?</option> 
                        <option>"What is your favorite color?</option>
                        <option>"What was your first pet's name?</option>
                        <option>"What was the name of your Highschool?</option>
                        <option>"What is your sibling's middle name?</option>
                        <option>"What is your favorite sports team?</option>
                    </select>
                    <input type="question" placeholder="Answer" onChange={(e) => console.log(e.target.value)} />  
                </div>
                <div className="question">
                    <select onChange={(e) => console.log(e.target.value)}>
                        <option>"What was your home town?</option> 
                        <option>"What is your favorite color?</option>
                        <option>"What was your first pet's name?</option>
                        <option>"What was the name of your Highschool?</option>
                        <option>"What is your sibling's middle name?</option>
                        <option>"What is your favorite sports team?</option>
                    </select>
                    <input type="question" placeholder="Answer" onChange={(e) => console.log(e.target.value)} />  
                </div>
            </div>
            <div className="subButton">
                <button onClick={() => navigate(Homepage)} >Submit</button>
            </div>
        </div>
    )
}

export default SecurityQuestion