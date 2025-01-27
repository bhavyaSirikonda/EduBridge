import React, { useState } from 'react'
import "../css/duoAuth.css"
import { useNavigate } from 'react-router-dom'

export const DuoAuth = () => {


    const navigate = useNavigate();

  return (
    <div>
        <div className="container">

            <div className="header">
                <div className="text">Duo Authorization</div>
                <div className="underline"></div>
            </div>

            <div className="send">
                <button onClick={(e) => console.log(e.target.value)}>Send me a Push</button>
            </div>

            <div className="inputs">
            <div className="input">
                <img src="" alt="" />
                <input type="code" placeholder="Code" onChange={(e) => console.log(e)}/>

            </div>
            
            </div>
        </div>
        
    </div>
  )
}

export default DuoAuth