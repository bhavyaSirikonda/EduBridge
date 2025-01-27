import React from 'react';

const DocumentViewer = ({ content}) => {

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />

    </div>
  );
};

export default DocumentViewer;