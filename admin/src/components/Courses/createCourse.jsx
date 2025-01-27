import React, { useState } from 'react';
import Modal from 'react-modal';
import * as Papa from 'papaparse';
import { addCourses } from './handleGetCourses';

Modal.setAppElement('#root'); // Set the root element for accessibility

function CreateCourseModal({ isOpen, onRequestClose }) {
  const [courseData, setCourseData] = useState({
    name: '',
    subject: '',
    level: '',
    attributes: '',
    faculty: '',
    students: '',
  });

  const [student, setStudent] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  const [csvFile, setCsvFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to the server)
    setCourseData({ ...courseData, students: studentsList })
    console.log(courseData); // Logging the data for demonstration
    const message = addCourses(courseData);
    alert(message);
    onRequestClose(); // Close the modal after submission
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
      parseCSVFile(file);
    }
  };

  const parseCSVFile = (file) => {
    Papa.parse(file, {
      complete: function (results) {
        console.log(results.data);
        const extractedStudents = results.data
          .map((row) => row['students']);
        console.log(extractedStudents);
        setStudentsList([...studentsList, ...extractedStudents]);
      },
      header: true,
      skipEmptyLines: true,
    });
  };


  const handleStudentInput = (e) => {
    setStudent(e.target.value);
  };

  const addStudent = () => {
    if (student.trim() !== '') {
      setStudentsList([...studentsList, student]);
      setStudent('');
    }
  };

  const removeStudent = (index) => {
    const updatedStudentsList = studentsList.filter((_, i) => i !== index);
    setStudentsList(updatedStudentsList);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Create Course">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={courseData.name}
            onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject: </label>
          <input
            type="text"
            id="subject"
            value={courseData.subject}
            onChange={(e) => setCourseData({ ...courseData, subject: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="level">Level: </label>
          <input
            type="text"
            id="level"
            value={courseData.level}
            onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="attributes">Attributes: </label>
          <input
            type="text"
            id="attributes"
            value={courseData.attributes}
            onChange={(e) => setCourseData({ ...courseData, attributes: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="faculty">Faculty: </label>
          <input
            type="text"
            id="faculty"
            value={courseData.faculty}
            onChange={(e) => setCourseData({ ...courseData, faculty: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="students">Students:</label>
          <input
            type="text"
            id="students"
            value={student}
            onChange={handleStudentInput}
          />
          <button type="button" onClick={addStudent}>
            Add Student
          </button>
        </div>
        <ul>
          {studentsList.map((studentName, index) => (
            <li key={index}>{studentName}
                 <button type="button" onClick={() => removeStudent(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div>
          <label htmlFor="csvFile">Upload CSV File:</label>
          <input
            type="file"
            id="csvFile"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </Modal>
  );
}

export default CreateCourseModal;