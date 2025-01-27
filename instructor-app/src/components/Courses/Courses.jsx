import React, {useState, useEffect} from 'react';
import { getacourse,pushcoursedetails } from './handleGetCourses';
import DocumentEditor from './documentEditor';
import DocumentViewer from './documentviewer';

const containerStyle = {
    display: 'flex',
    background:"white",
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    justifyContent: 'flex-start', // Align content at the top
    minHeight: '100vh', // Ensure the container takes the full viewport height
    textAlign: 'center', // Center horizontally
    flex: 1,
    padding: '20px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };


  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '25px', // Add rounded borders
    background: 'green', // Background color
    color: 'white', // Text color
    border: 'none',
    cursor: 'pointer',
    margin: '10px',
  };

  const titleStyle = {
    fontSize: '36px', // Change the font size as desired

    color:'#1C352D',
  };

const Courses = (props) => {

  console.log(props)
  const [documentContent, setDocumentContent] = useState(props.course.details);
  const [isEditing, setIsEditing] = useState(false);
  const [mediafiles, setMediaFiles] = useState('');

  const toggleEditing = () => {
    setIsEditing((prevEditing) => !prevEditing);
  };

  useEffect(() => {
    if (!isEditing) {
      pushcoursedetails(documentContent, props.course.courseId)
    }
  }, [isEditing]);

  const viewerStyle = {
    width: '80%'
  }

  return (
    <div style={containerStyle}>

        <h1 style={titleStyle}>{props.coursedetails}</h1>
        {/* <div  style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={openModal}>Create Course</button>
            <CreateCourseModal isOpen={isModalOpen} onRequestClose={closeModal} />
            <button style={buttonStyle}>Remove Course</button>
        </div> */}

        <button onClick={toggleEditing} style={buttonStyle}>{isEditing ? 'Done Editing' : 'Edit Document'}</button>
        <div style={viewerStyle}>
          <DocumentEditor currentContent={documentContent} setContent={setDocumentContent} editMode={isEditing} files={setMediaFiles}/>
          <DocumentViewer content={documentContent} uploadedFiles={mediafiles} />
        </div>
    </div>
  )
};

export default Courses;