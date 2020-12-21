const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/itcast');

const Schema = mongoose.Schema


const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  },
  gender: {
    enum: [0, 1],
    type: String,
  },
  hobber: {
    type: String,
  }
})

module.exports = mongoose.model('Student', studentSchema)