import React from 'react';
import { useDropzone } from 'react-dropzone';

const VideoUploader = ({ onUpload }) => {
  const onDrop = (acceptedFiles) => {
    // Handle the uploaded files
    onUpload(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*',
    onDrop,
  });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop video files here, or click to select files</p>
    </div>
  );
};

export default VideoUploader;
