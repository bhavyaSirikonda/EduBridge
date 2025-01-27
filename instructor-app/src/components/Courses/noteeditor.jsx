import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteEditor = ({ onSave }) => {
  const handleChange = (content, delta, source, editor) => {
    // Handle the change in content
    onSave(content);
  };

  return (
    <div>
      <label>Add Note:</label>
      <ReactQuill onChange={handleChange} />
    </div>
  );
};

export default NoteEditor;