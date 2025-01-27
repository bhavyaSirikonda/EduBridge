import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupIcon from '@mui/icons-material/Group';
import { Link,useNavigate } from 'react-router-dom';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import ChatIcon from '@mui/icons-material/Chat';



const Sidebar = (props) => {

    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarStyle = {
    width: isSidebarOpen ? '150px' : '60px', // Adjust the width as needed
    height: '70vh', // Set the desired height for the sidebar
    transition: 'width 0.3s ease',
    background: 'white',
    color: 'green',
    position: 'fixed', // Keep the sidebar fixed
    top: '17vh', // Align it with the top of the viewport
    left: '0', // Align it with the left side of the viewport
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center items vertically
    alignItems: 'center',
  };

  const buttonStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    margin: '5px',
    color: 'green',
    marginTop: '-25px'
  };

  const iconStyle = {
    fontSize: '24px',
    margin: '15px',
    color: 'green',
    cursor: 'pointer',
    transition: 'color 0.1s',
  };

  const textStyle = {
    fontSize: '15px',
    color: 'green',
    marginRight:"10px"

  };

  const textIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center items vertically

  };


  const handleIconHover = (event) => {
    event.target.style.color = 'grey'; // Change the color to grey on hover
  };

  const handleIconLeave = (event) => {
    event.target.style.color = 'green'; // Change the color back to white on leave
  };

  return (

    <div style={sidebarStyle}>
      <button style={buttonStyle} onClick={toggleSidebar}>
            {isSidebarOpen ? (
            <CloseIcon style={iconStyle}
            onMouseEnter={handleIconHover}
            onMouseLeave={handleIconLeave} />
            ) : (
            <MenuIcon style={iconStyle}
            onMouseEnter={handleIconHover}
            onMouseLeave={handleIconLeave}/>
            )}
      </button>
      {isSidebarOpen ? (
        <>

        <div style={textIconStyle} onClick={() => navigate('/courses')}>
          <LibraryBooksIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
          <span style={textStyle}>Course</span>
        </div>
        <div style={textIconStyle} onClick={() => navigate('/courses')}>
          <GroupIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
          <span style={textStyle}>People </span>
        </div>

        <div style={textIconStyle} onClick={() => navigate('/modules')}>
          <ViewModuleIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
          <span style={textStyle}>Modules</span>
        </div>
        <div style={textIconStyle} onClick={() => navigate('/courses')}>
          <AssignmentIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
          <span style={textStyle}>Assignments</span>
        </div>
        <div style={textIconStyle} onClick={() => navigate('/courses')}>
          <QuizIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
          <span style={textStyle}>Quizzes</span>
        </div>
        <div style={textIconStyle} onClick={() => navigate('/courses')}>
          <ChatIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
          <span style={textStyle}>chat</span>
        </div>
        </>
      ) : (
        <>
          <LibraryBooksIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}
          onClick={() => navigate('/courses')}/>
          <GroupIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
          <ViewModuleIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}
          onClick={() => navigate('/modules')}/>
          <AssignmentIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
          <QuizIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
          <ChatIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
        </>
      )}
    </div>
  );
};

export default Sidebar;