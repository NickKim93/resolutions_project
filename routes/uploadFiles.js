const express = require('express');
const router = express.Router();
const fileUploadController = require('../controllers/fileUploadController');
const { handleFileUpload } = require('../middleware/upload');


router.post('/', handleFileUpload, fileUploadController.uploadFileToLocalStorage);

module.exports = router;