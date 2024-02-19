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
    try {
      const employeeId = req.employeeId;
      await Receipt.create({
        fileName: req.file.filename,
        employeeId: employeeId
      });
      res.json({"message": "upload successful"});
    } catch (error) {
      console.error('Error saving record in database:', error);
      return res.status(500).json({ message: "Error saving record in database" });
    }
  });
};

// Handler for uploading spending resolution Excel files
const uploadSpendingResolutionToLocalStorage = (req, res, next) => {
  const upload = uploadSpendingResolution.single('spendingResolution');
  upload(req, res, async function(err) {
    if (err) {
        console.log('err in uploadSpendingResolutions trigger');
        return res.status(500).json({ message: err.message });
    }
    try {
      const employeeId = req.employeeId;
      await SpendingResolution.create({
        fileName: req.file.filename,
        employeeId: employeeId
      });
      res.json({"message": "upload successful"});
    } catch (error) {
      console.error('Error saving record in database:', error);
      return res.status(500).json({ message: "Error saving record in database" });
    }
  });
};

module.exports = { uploadReceiptToLocalStorage, uploadSpendingResolutionToLocalStorage};
