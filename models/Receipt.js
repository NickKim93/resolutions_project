const mongoose = require('mongoose');
const { Schema } = mongoose;

const receiptSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  uploadDate: { type: Date, default: Date.now },
  fileUrl: { type: String, required: true } // URL to the file stored elsewhere
});

module.exports = mongoose.model('Receipt', receiptSchema);