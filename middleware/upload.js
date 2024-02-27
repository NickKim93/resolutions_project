const multer = require('multer');
const path = require('path');

// Common storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // uploaded files folder
  },
  filename: function (req, file, cb) {
    cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname));
  }
});

// File filter for JPEG files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" ||
  file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
  file.mimetype === "application/vnd.ms-excel") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and Excel files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).any();

const handleFileUpload = (req, res, next) => {
  upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
          return res.status(500).json({ message: `Multer error: ${err.message}` });
      } else if (err) {
          return res.status(400).json({ message: `Upload error: ${err.message}` });
      }
      next();
  });
};


module.exports = { handleFileUpload };