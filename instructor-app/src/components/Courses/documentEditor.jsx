import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone'
const DocumentEditor = ({ currentContent,setContent, editMode}) => {
    console.log(currentContent)
  const [content, setEditorContent] = useState(currentContent);

  const handleEditorChange = (value) => {
    setContent(value);
    setEditorContent(value);
  };

  return (
    <div>
      <ReactQuill value={content} onChange={editMode ? handleEditorChange : undefined} readOnly={!editMode} />

    </div>
  );
};

export default DocumentEditor;