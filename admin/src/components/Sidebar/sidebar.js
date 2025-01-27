import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupIcon from '@mui/icons-material/Group';
import { Link,useNavigate } from 'react-router-dom';


const Sidebar = () => {

    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarStyle = {
    width: isSidebarOpen ? '100px' : '60px', // Adjust the width as needed
    height: '30vh', // Set the desired height for the sidebar
    transition: 'width 0.3s ease',
    background: 'white',
    color: 'green',
    position: 'fixed', // Keep the sidebar fixed
    top: '35vh', // Align it with the top of the viewport
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
          <span style={textStyle}>Users </span>
        </div>
        </>
      ) : (
        <>
          <LibraryBooksIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
          <GroupIcon style={iconStyle}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}/>
        </>
      )}
    </div>
  );
};

export default Sidebar;