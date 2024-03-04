const express = require('express');
const router = express.Router();
const fileUploadController = require('../controllers/fileUploadController');

router.post('/spendingResolution', fileUploadController.uploadSpendingResolutionToLocalStorage);
router.post('/receipt', fileUploadController.uploadReceiptToLocalStorage);

module.exports = router;