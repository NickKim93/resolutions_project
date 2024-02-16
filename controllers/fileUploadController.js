const Receipt = require('../models/receipt');
const SpendingResolution = require('../models/spendingResolution');

const { uploadReceipt, uploadSpendingResolution } = require('../middleware/upload');

// Handler for uploading receipt JPEG files
const uploadReceiptToLocalStorage = (req, res, next) => {
  const upload = uploadReceipt.single('receipt');
  upload(req, res, async function(err) {
    if (err) {
        console.log('err in uploadreceipt trigger');
        return res.status(500).json({ message: err.message });
    }
    res.json({"message": "upload successful"});
    // if (req.file) {
    //   try {
    //     const newReceipt = await Receipt.create({
    //       fileName: req.file.fileName,
    //       employeeId: req.file.employeeId
    //     });
    //     res.json({message: "upload successful", receipt: newReceipt});
    //   } catch (dbError) {
    //     console.log('Database error:', dbError);
    //     return res.status(500).json({ message: dbError.message });
    //   }
    // } else {
    //   res.status(400).json({ message: "No file uploaded." });
    // }
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
