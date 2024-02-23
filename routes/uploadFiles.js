const express = require('express');
const router = express.Router();
const fileUploadController = require('../controllers/fileUploadController');
const { uploadReceipts, uploadSpendingResolution } = require('../middleware/upload');

router.post('/spendingResolution', uploadSpendingResolution, fileUploadController.uploadSpendingResolutionToLocalStorage);
router.post('/receipt', uploadReceipts, fileUploadController.uploadReceiptsToLocalStorage);

module.exports = router;