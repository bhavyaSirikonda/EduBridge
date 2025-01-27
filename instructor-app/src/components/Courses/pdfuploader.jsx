import React from 'react';
import { useDropzone } from 'react-dropzone';

const PDFUploader = ({ onUpload }) => {
  const onDrop = (acceptedFiles) => {
    // Handle the uploaded files
    onUpload(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pdf',
    onDrop,
  });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop PDF files here, or click to select files</p>
    </div>
  );
};

export default PDFUploader;
