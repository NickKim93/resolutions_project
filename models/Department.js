const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: { 
    type: String,
    required: true,
  },
  teamLeader: { type: Schema.Types.ObjectId, ref: 'Employee' }
});

module.exports = mongoose.model('Department', departmentSchema);