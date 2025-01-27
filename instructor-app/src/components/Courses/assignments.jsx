import React, {useState, useEffect} from 'react';
import { getacourse,pushcourseassignment,pushcoursedetails } from './handleGetCourses';
import PDFUploader from './pdfuploader';
import axios from 'axios';
import SubmissionModal from './assignmentsubmission';



const cloudName="dr9nuaadu";
const uploadPreset="lgjta9kj";

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

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '25px', // Add rounded borders
    background: 'green', // Background color
    color: 'white', // Text color
    border: 'none',
    cursor: 'pointer',
    margin: '10px',
  };
  const buttonStyle2 = {
    padding: '10px 20px',
    borderRadius: '25px', // Add rounded borders
    background: 'white', // Background color
    color: 'green', // Text color
    border: '2px solid grey',
    cursor: 'pointer',
    margin: '10px',
  };

  const removebuttonStyle = {
    padding: '10px 20px',
    borderRadius: '25px', // Add rounded borders
    background: 'grey', // Background color
    color: 'black', // Text color
    border: 'none',
    cursor: 'pointer',
    margin: '10px',
  };

  const titleStyle = {
    fontSize: '36px', // Change the font size as desired

    color:'#1C352D',
  };

const Assignments = (props) => {

  console.log(props.course)

  const [assignments, setAssignments] = useState([
    // Initial module structure (empty)
    {
      id: 1,
      name: 'Assignment 1',
      pdfs: [],
      start: "",
      end: "",
      submissions:{},
    },
    // Add more modules as needed
  ]);

  const [selectedModule, setSelectedModule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModals, setOpenModals] = useState({});

  const openModal = (moduleId) => {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [moduleId]: true,
    }));
  };

  const closeModal = (moduleId) => {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [moduleId]: false,
    }));
  };

//     const openModal = () => {
//         setIsModalOpen(true);
//       };

//       const closeModal = () => {
//         setIsModalOpen(false);
//       };


  const [startDate, setStartDate] = useState('');

  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (Array.isArray(props.course["assignment"])) {
      const courseAssignments = props.course["assignment"];
      setAssignments(courseAssignments);

    }
  }, [props.course]);

  const handleStartDateChange = (event,moduleId) => {
    // Handle changes in start date-time
    console.log(moduleId)
    setAssignments((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId ? { ...module, start: event.target.value } : module
      )
    );
  };

  const handleEndDateChange = (event,moduleId) => {
    // Handle changes in end date-time
    setAssignments((prevModules) =>
    prevModules.map((module) =>
      module.id === moduleId ? { ...module, end: event.target.value } : module
    )
    );
  };

  const handlePdfUpload = (files, moduleId) => {

    console.log(files);

    setAssignments((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId ? { ...module, pdfs: [...module.pdfs, ...files] } : module
      )
    );
  };


  const removePdf = (moduleId, pdfIndex) => {
    setAssignments((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? { ...module, pdfs: module.pdfs.filter((_, index) => index !== pdfIndex) }
          : module
      )
    );
  };

  const saveModule = async (assignmentId) => {



    console.log(assignments[assignmentId-1]);
    var formData = new FormData();

    const pdfUploadPromises = [];

    for (let ind in assignments[assignmentId-1].pdfs){
      if (typeof assignments[assignmentId-1].pdfs[ind] != "string"){

        formData = new FormData();
        formData.append('file', assignments[assignmentId-1].pdfs[ind]);
        formData.append('upload_preset', uploadPreset);
        const uploadPromise=axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`,formData)
        .then(res => {
          console.log(typeof res.data.url)
          assignments[assignmentId-1].pdfs[ind] = res.data.url;
        })
        .catch(err => console.log(err))

        pdfUploadPromises.push(uploadPromise);

      }
    }



    Promise.all([...pdfUploadPromises])
  .then(() => {
    console.log(assignments[assignmentId-1]);
    pushcourseassignment(assignments[assignmentId-1],assignmentId-1, props.course.courseId);
  })
  .catch(err => console.log(err));



  };

  const addAssignment = () => {
    const newAssignment = {
      id: assignments.length + 1,
      name: `Assignment ${assignments.length + 1}`,
      pdfs: [],
      start: "",
      end: "",
      submissions:{},

    };
    setAssignments([...assignments, newAssignment]);
  };





  const viewerStyle = {
    width: '80%',
  }

  return (
    <div style={containerStyle}>
        <h1 style={titleStyle}>Assignments: {props.coursedetails}</h1>
        <div style={viewerStyle}>

        <div>


        <h1>Assignment Manager</h1>
        <button onClick={addAssignment} style={buttonStyle}>Add Assignment</button>

        {assignments.map((module) => (
          <div key={module.id}>
            <h2>{module.name}</h2>
            <PDFUploader onUpload={(files) => handlePdfUpload(files, module.id)} />

            <div>
                {/* Add Start Date-Time */}
                <input
                type="datetime-local"
                value={module.start}
                onChange={(event) => handleStartDateChange(event,module.id)}
                />
                {/* <button onClick={() => handleStartDateButtonClick(module.id)}>
                Set Start Date
                </button> */}

                {/* Add End Date-Time */}
                <input
                type="datetime-local"
                value={module.end}
                onChange={(event) => handleEndDateChange(event,module.id)}
                />
                {/* <button onClick={() => handleEndDateButtonClick(module.id)}>
                Set End Date
                </button> */}
            </div>

            <button style={buttonStyle2} onClick={()=>openModal(module.id)}>Check Submissions</button>
            <SubmissionModal isOpen={openModals[module.id]} onRequestClose={() => closeModal(module.id)} module={module} courseId={props.course.courseId}/>

            <button onClick={() => saveModule(module.id)} style={buttonStyle}>
                Save Assignment
              </button>


            <h3>PDFs</h3>
            {module.pdfs.map((pdf, index) => (
              <div key={index}>
                <a href={typeof pdf === 'string' ? pdf : URL.createObjectURL(pdf)} target="_blank" rel="noopener noreferrer">
                  PDF {index + 1}
                </a>
                <button onClick={() => removePdf(module.id, index)} style={removebuttonStyle}>
                    Remove
                  </button>
              </div>
            ))}

          </div>
        ))}

      </div>

        </div>
    </div>

  )
};

export default Assignments;