const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images')); // Ensure this matches your image storage path
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Prepend timestamp to avoid filename collisions
  },
});

// Create the multer instance
const upload = multer({ storage });

module.exports = upload;
