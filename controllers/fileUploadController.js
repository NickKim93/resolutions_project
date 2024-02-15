// const Receipt = require('../models/Receipt');
// const SpendingResolution = require('../models/SpendingResolution');

const { uploadReceipt, uploadSpendingResolution } = require('../middleware/upload');

// Handler for uploading receipt JPEG files
const uploadReceiptToLocalStorage = (req, res, next) => {
  const upload = uploadReceipt.single('receipt');
  upload(req, res, function(err) {
    if (err) {
        console.log('err in uploadreceipt trigger');
        return res.status(500).json({ message: err.message });
    }
    res.json({"message": "upload successful"});
    // Proceed with database saving logic here...
  });
};

// Handler for uploading spending resolution Excel files
const uploadSpendingResolutionToLocalStorage = (req, res, next) => {
  const upload = uploadSpendingResolution.single('spendingResolution');
  upload(req, res, function(err) {
    if (err) {
        console.log('err in uploadSpendingResolutions trigger');
        return res.status(500).json({ message: err.message });
    }
    res.json({"message": "upload successful"});
    // Proceed with database saving logic here...
  });
};

module.exports = { uploadReceiptToLocalStorage, uploadSpendingResolutionToLocalStorage};
