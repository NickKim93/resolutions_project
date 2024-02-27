const Receipt = require('../models/receipt');
const SpendingResolution = require('../models/spendingResolution');

// Handler for uploading receipt JPEG files
const uploadFileToLocalStorage = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  try {

    const employeeId = req.employeeId;
    const files = req.files ? req.files : [req.file]; //Single file or not

    let invalidFiles = files.filter(file =>
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      file.mimetype !== "application/vnd.ms-excel"
    );

    if (invalidFiles.length > 0) {
      // If there are any invalid files, send an error response.
      return res.status(400).json({ message: "Invalid file type. Only JPEG and Excel files are allowed." });
    }

    let uploadPromises = files.map(file => {
      if (file.mimetype === "image/jpeg") {
        return Receipt.create({
          fileName: file.filename,
          fileSize: file.size,
          employeeId: employeeId
        });
      } else {
        // Since we already filtered out invalid files, this else block will only process Excel files.
        return SpendingResolution.create({
          fileName: file.filename,
          fileSize: file.size,
          employeeId: employeeId
        });
      }
    });

    await Promise.all(uploadPromises);
    res.status(201).json({ "message": "upload successful" });
  } catch (error) {
    console.error('Error saving record in database:', error);
    return res.status(500).json({ message: "Error saving record in database" });
  };
};

module.exports = { uploadFileToLocalStorage };
