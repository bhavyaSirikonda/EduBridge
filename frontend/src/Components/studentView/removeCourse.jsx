import React, { useState } from 'react';
import Modal from 'react-modal';
import * as Papa from 'papaparse';
import { addCourses } from './handleGetCourses';

Modal.setAppElement('#root'); // Set the root element for accessibility

function RemoveCourseModal({ isOpen, onRequestClose }) {
  const [courseData, setCourseData] = useState({
    code: '',
  });

  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
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


        <button type="submit">Create</button>
      </form>
    </Modal>
  );
}

export default CreateCourseModal;