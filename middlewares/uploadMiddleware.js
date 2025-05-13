const multer = require('multer');
const path = require('path');

// Set storage engine for multer (configure where files will be stored)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files to the 'uploads' directory
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Save the file with the original name and current timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif)'), false);
  }
};

// Initialize multer with storage and file filter options
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
});

module.exports = upload;
