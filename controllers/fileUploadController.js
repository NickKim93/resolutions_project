const Receipt = require('../models/receipt');
const SpendingResolution = require('../models/spendingResolution');

// Handler for uploading receipt JPEG files
const uploadReceiptsToLocalStorage = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
    }
    try {
      const employeeId = req.employeeId;
      let uploadPromises = req.files.map(file => {
        return  Receipt.create({
          fileName: file.filename,
          fileSize: file.size,
          employeeId: employeeId
        });
      });

      await Promise.all(uploadPromises);
      res.status(201).json({"message": "upload successful"});
    } catch (error) {
      console.error('Error saving record in database:', error);
      return res.status(500).json({ message: "Error saving record in database" });
    };
};

// Handler for uploading spending resolution Excel files
const uploadSpendingResolutionToLocalStorage = async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ message: "No File uploaded" });
    }
    try {
      const employeeId = req.employeeId;
      console.log(employeeId);
      await SpendingResolution.create({
        fileName: req.file.filename,
        fileSize: req.file.size,
        employeeId: employeeId
      });
      res.status(201).json({"message": "upload successful"});
    } catch (error) {
      console.error('Error saving record in database:', error);
      return res.status(500).json({ message: "Error saving record in database" });
    }
};

module.exports = { uploadReceiptsToLocalStorage, uploadSpendingResolutionToLocalStorage};
