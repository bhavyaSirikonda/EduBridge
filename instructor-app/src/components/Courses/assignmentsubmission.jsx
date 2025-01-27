import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { savegrades } from './handleGetCourses';
Modal.setAppElement('#root'); // Set the root element for accessibility

function SubmissionModal({ isOpen, onRequestClose, module, courseId }) {


  const inputStyle = {
    padding: '10px',
    borderRadius: '25px', // Add rounded borders
    border: '2px solid grey',
    margin: '0 auto',
    marginTop: '10px',
    width: '500px',
    marginBottom: '20px',
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


  const [grades, setGrades] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const initialGrades = {};
    for(let key in module.submissions){
      initialGrades[key] = module.submissions[key].grade || '';
    }
    setGrades(initialGrades);
  }, [module.submissions]);

  console.log(grades)

  const handleGradeChange = (index, event) => {
    const newGrades = {...grades};
    newGrades[index] = event.target.value;
    setGrades(newGrades);
  };

  const filteredKeys = Object.keys(module.submissions).filter((key) =>
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) {
    return null;
  }

  console.log(courseId)
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Student Submissions">

      <div style={{textAlign: 'center'}}>
        <h2>Student submissions</h2>
        <button onClick={() => savegrades(grades,module.id-1,courseId)} style={buttonStyle}>Save Grades</button>
      </div>
      <div style={{alignItems: 'center',
      display: 'flex', // Center horizontally
    justifyContent: 'flex-start'}}>
      <input
        type="text"
        placeholder="Search by Student ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={inputStyle}
      />

      </div>


      <table style={{ marginTop: '40px', marginLeft: '60px'}}>
          <thead>
            <tr>
              <th style={{ width: '250px', textAlign: 'left'}} >Student ID</th>
              <th style={{ width: '300px', textAlign: 'left' }}>Submission</th>
              <th style={{ width: '300px', textAlign: 'left' }}>Submission Time</th>
              <th style={{ width: '300px', textAlign: 'left' }}>Late Submission</th>
              <th style={{ width: '300px', textAlign: 'left' }}>Grades</th>
            </tr>
          </thead>
          <tbody >
          {filteredKeys.map((key) => (

            <tr key={key} style={{ height: '40px'}} >
              <td>{key}</td>
              <td>
              <a href={module.submissions[key].submission} target="_blank" rel="noopener noreferrer">
                  View Submission
                </a>
              </td>
              <td>{module.submissions[key].submission_time}</td>
              <td>{new Date(module.submissions[key].submission_time) > new Date(module.end) ? 'Yes' : 'No'}</td>
              <td>
                <input
                  type="text"
                  value={grades[key]}
                  onChange={(event) => handleGradeChange(key, event)}
                />
              </td>


            </tr>
          ))}
          </tbody>
        </table>
    </Modal>
  );
}

export default SubmissionModal;