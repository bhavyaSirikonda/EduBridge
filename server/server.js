const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

app.use(fileUpload());

// Endpoint to handle file upload via HTTP
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.body.directory) {
    return res.status(400).send('No files or directory specified.');
  }

  const uploadedFile = req.files.uploadedFile;
  const directory = req.body.directory;
  const uploadPath = path.join(__dirname, 'uploads', directory, uploadedFile.name);

  // Use the mv() method to place the file somewhere on your server
  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded successfully.');
  });
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});