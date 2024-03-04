const Receipt = require('../models/receipt');
const fs = require('fs');
const path = require('path');
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

const downloadFileFromLocalStorage = async (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, '../uploads', fileName);

  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName, (err) => {
      if (err) {
        res.status(500).send('Error downloading file')
      }
    })
  } else {
    res.status(404).send("file not found.");
  }
}

const deleteFile = async (req, res) => {
  const fileName = req.body.fileName;
  const employeeId = req.body.employeeId;

  if (!fileName) {
    return res.status(400).json({ "message": "Filename parameter is required" });
  }

  const filePath = path.join(__dirname, '../uploads', fileName);

  try {
    const fileRecord = await Receipt.findOne({ where: { fileName, employeeId } }) ||
      await SpendingResolution.findOne({ where: { fileName, employeeId } });
    if (!fileRecord) {
      return res.status(404).json({ "message": "file not found in database" });
    }
    const fileUpdatedAt = new Date(fileRecord.updatedAt);
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 2, 1);

    if (fileUpdatedAt < startOfMonth || fileUpdatedAt > endOfMonth) {
      return res.status(403).json({ "message": "Files can only be deleted within current month" });
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      console.warn("file not found in the file system, proceeding to remove database record.");
    }

    await fileRecord.destroy();
    res.status(200).json({ "message": "File and its record successfully deleted" });
  } catch (err) {
    res.status(500).json({ "message": err });
  }

}

module.exports = { uploadFileToLocalStorage, downloadFileFromLocalStorage, deleteFile };
