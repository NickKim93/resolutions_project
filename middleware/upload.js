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
const jpegFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG files are allowed!"), false);
  }
};

// File filter for Excel files
const excelFilter = (req, file, cb) => {
  if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype === "application/vnd.ms-excel") {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files are allowed!"), false);
  }
};

const uploadReceipts = multer({
  storage: storage,
  fileFilter: jpegFilter
}).array('receipts', 10);

const uploadSpendingResolution = multer({
  storage: storage,
  fileFilter: excelFilter
}).single('spendingResolution');

module.exports = { uploadReceipts, uploadSpendingResolution };