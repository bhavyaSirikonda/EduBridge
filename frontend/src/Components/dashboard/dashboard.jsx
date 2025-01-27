import React from 'react'
import { useNavigate } from 'react-router-dom'
import Homepage from '../homepage/homepage';
import "../css/dashboard.css"
import MenuIcon from '@mui/icons-material/Menu';
import "../Footer/Footer.module.css";
import Footer from "../Footer/Footer";
import LoggedInNavbar from "../LoggedInNavbar/LoggedInNavbar";


export const Dashboard = () => {
    const navigate = useNavigate();

    window.onload=function(){
        document.querySelector('.openbtn').addEventListener('click', openNav);
        document.querySelector('.closebtn').addEventListener('click', closeNav);
    }

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    // This arrangement can be altered based on how we want the date's format to appear.
    let today = `${month}-${day}-${year}`;

    return(
        <div>
        <div>
          <span><LoggedInNavbar /></span>
        </div>
        <div className="topbar">
            
            <div className="navigation">
            <nav id="mySidenav" class="sidenav">
			<ul>
				<li><a class="closebtn">&times;</a></li>
				<li onClick={() => navigate(Homepage)}> ClassOne </li>
				<li onClick={() => navigate(Homepage)}> ClassTwo </li>
                <li onClick={() => navigate(Homepage)}> ClassThree </li>
                <li onClick={() => navigate(Homepage)}> ClassFour </li>
                <li onClick={() => navigate(Homepage)}> ClassFive </li>
			</ul>
		</nav>
		  
		<div class="openbtn">
        
            <MenuIcon></MenuIcon> 
		</div>

		<div class="all-over-bkg"></div>

        </div>
            

        </div>


        <div className="box">
        
            <div className="calender">
            <div className="calenderSection">
                <div className="date"> {today}</div>
                <div className="underSection"></div>
                <div className="assignments">
                    <div className="assignment"></div>
                    <div className="assignment"></div>
                    <div className="assignment"></div>
                </div>
            </div>
            <div className="calenderSection">
                <div className="date"> {today}</div>
                <div className="underSection"></div>
                <div className="assignments">
                    <div className="assignment"></div>
                    <div className="assignment"></div>
                    <div className="assignment"></div>
                </div>
            </div>
            <div className="calenderSection">
                <div className="date"> {today}</div>
                <div className="underSection"></div>
                <div className="assignments">
                    <div className="assignment"></div>
                    <div className="assignment"></div>
                    <div className="assignment"></div>
                </div>
            </div>
            <div className="calenderSection">
                <div className="date"> {today}</div>
                <div className="underSection"></div>
                <div className="assignments">
                    <div className="assignment"></div>
                    <div className="assignment"></div>
                    <div className="assignment"></div>
                </div>
            </div>
            <div className="calenderSection">
                <div className="date"> {today}</div>
                <div className="underSection"></div>
                <div className="assignments">
                    <div className="assignment"></div>
                    <div className="assignment"></div>
                    <div className="assignment"></div>
                </div>
            </div>
      
            


</div>
        
        </div>
        <div>
            <Footer />
        </div>
        </div>

       
    )


    


    function openNav() {
        document.querySelector('#mySidenav').style.width = "250px"; 
        document.querySelector('.all-over-bkg').classList.add('is-visible');
      }
      
      function closeNav() {
        document.querySelector('#mySidenav').style.width = "0"; 
        document.querySelector('.all-over-bkg').classList.remove('is-visible');
      }

      
    
      
}


export default Dashboard