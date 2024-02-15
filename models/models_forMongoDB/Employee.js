const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department', default: null },
    // Files
    receipts: [{ type: Schema.Types.ObjectId, ref: 'Receipt' }],
    spendingResolutions: [{ type: Schema.Types.ObjectId, ref: 'SpendingResolution' }]
})


module.exports = mongoose.model('Employee', employeeSchema);