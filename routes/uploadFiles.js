const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { handleFileUpload } = require('../middleware/upload');


router.post('/upload', handleFileUpload, fileController.uploadFileToLocalStorage);
router.get('/download/:fileName', fileController.downloadFileFromLocalStorage);

module.exports = router;