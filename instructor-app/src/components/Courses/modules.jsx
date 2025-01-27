import React, {useState, useEffect} from 'react';
import { getacourse,pushcoursedetails } from './handleGetCourses';
import PDFUploader from './pdfuploader';
import VideoUploader from './videouploader';
import NoteEditor from './noteeditor';
import axios from 'axios';
import { pushcoursemodule } from './handleGetCourses';


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

const Modules = (props) => {

  console.log(props.course)




  const [modules, setModules] = useState([
    // Initial module structure (empty)
    {
      id: 1,
      name: 'Module 1',
      pdfs: [],
      videos: [],
      notes: [],
    },
    // Add more modules as needed
  ]);

  const [pdfs, setPdfs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [notes, setNotes] = useState([]);


  useEffect(() => {
    if (Array.isArray(props.course["modules"])) {
      // Check if props.course.modules is an object
      const courseModules = props.course["modules"];
      setModules(courseModules);

    }
  }, [props.course]);


  const handlePdfUpload = (files, moduleId) => {

    console.log(files);

    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId ? { ...module, pdfs: [...module.pdfs, ...files] } : module
      )
    );
  };

  const handleVideoUpload = (files, moduleId) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId ? { ...module, videos: [...module.videos, ...files] } : module
      )
    );
  };

  const handleNoteSave = (note, moduleId) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId ? { ...module, notes: [note] } : module
      )
    );
  };

  const removePdf = (moduleId, pdfIndex) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? { ...module, pdfs: module.pdfs.filter((_, index) => index !== pdfIndex) }
          : module
      )
    );
  };

  const removeVideo = (moduleId, videoIndex) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? { ...module, videos: module.videos.filter((_, index) => index !== videoIndex) }
          : module
      )
    );
  };

  const saveModule = async (moduleId) => {

    console.log(modules[moduleId-1]);
    var formData = new FormData();

    const pdfUploadPromises = [];
    const videoUploadPromises = [];

    for (let ind in modules[moduleId-1].pdfs){
      if (typeof modules[moduleId-1].pdfs[ind] != "string"){

        formData = new FormData();
        formData.append('file', modules[moduleId-1].pdfs[ind]);
        formData.append('upload_preset', uploadPreset);
        const uploadPromise=axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`,formData)
        .then(res => {
          console.log(typeof res.data.url)
          modules[moduleId-1].pdfs[ind] = res.data.url;
        })
        .catch(err => console.log(err))

        pdfUploadPromises.push(uploadPromise);

      }
    }

    for (let ind in modules[moduleId-1].videos){
      if (typeof modules[moduleId-1].videos[ind] != "string"){

        formData = new FormData();
        formData.append('file', modules[moduleId-1].videos[ind]);
        formData.append('upload_preset', uploadPreset);
        const uploadPromise=axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`,formData)
        .then(res => {
          console.log(typeof res.data.url)
          modules[moduleId-1].videos[ind] = res.data.url;
        })
        .catch(err => console.log(err))

        videoUploadPromises.push(uploadPromise);

      }
    }


    Promise.all([...pdfUploadPromises, ...videoUploadPromises])
  .then(() => {
    console.log(modules[moduleId - 1]);
    pushcoursemodule(modules[moduleId - 1],moduleId - 1, props.course.courseId);
  })
  .catch(err => console.log(err));



  };

  const addModule = () => {
    const newModule = {
      id: modules.length + 1,
      name: `Module ${modules.length + 1}`,
      pdfs: [],
      videos: [],
      notes: [],
    };
    setModules([...modules, newModule]);
  };

  const viewerStyle = {
    width: '80%',
  }

  return (
    <div style={containerStyle}>
        <h1 style={titleStyle}>Modules: {props.coursedetails}</h1>
        <div style={viewerStyle}>

        <div>

        <button onClick={addModule} style={buttonStyle}>Add Module</button>

        <h1>Module Manager</h1>
        {modules.map((module) => (
          <div key={module.id}>
            <h2>{module.name}</h2>
            <PDFUploader onUpload={(files) => handlePdfUpload(files, module.id)} />
            <VideoUploader onUpload={(files) => handleVideoUpload(files, module.id)} />
            <NoteEditor onSave={(note) => handleNoteSave(note, module.id)} />

            <button onClick={() => saveModule(module.id)} style={buttonStyle}>
                Save Module
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

            <h3>Videos</h3>
            {module.videos.map((video, index) => (
              <div key={index}>
                <video width="320" height="240" controls>
                  <source src={typeof video === 'string' ? video : URL.createObjectURL(video)} />
                  Your browser does not support the video tag.
                </video>
                <button onClick={() => removeVideo(module.id, index)} style={removebuttonStyle}>
                    Remove
                  </button>
              </div>
            ))}

            <h3>Notes</h3>
            {module.notes.map((note, index) => (
              <div key={index}>
                <p dangerouslySetInnerHTML={{ __html: note }} />
              </div>
            ))}
          </div>
        ))}
      </div>

        </div>
    </div>

  )
};

export default Modules;