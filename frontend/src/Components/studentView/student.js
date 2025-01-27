import React from 'react';
import bg from './bg.png'

const StudentHome = () => {

    const backgroundStyle = {

        minHeight: '93.5vh', // Make the background cover the entire viewport height
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      };

    const titleStyle = {
        fontSize: '72px', // Change the font size as desired
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
      };

    return (
        <div className="home-page" style={backgroundStyle}>
            <h1 style={titleStyle}>Welcome Admin</h1>
        </div>
    );
};

export default StudentHome;
