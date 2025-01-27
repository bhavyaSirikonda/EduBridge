import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Link,useNavigate } from 'react-router-dom';

const CourseCard = ({ id, name }) => {
  const cardStyle = {
    background:"grey",
    border: '1px solid #ccc',
    borderRadius: '3px',
    padding: '10px',
    marginBottom: '10px',
    width: '300px',
    color:"white",
  };
  const penIconStyle = {
    top: "-5px",
    cursor: "pointer",
    right: "-130px",
    position: "relative",
    marginBottom:"-10px",
    color:"black",
  };

  return (
    <div style={cardStyle}>
      <CreateIcon style={penIconStyle} />
      <h3>{name}</h3>
      <p>Course ID: {id}</p>
      {/* Add any additional course details here */}
    </div>
  );
};

export default CourseCard;