const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Objective = require('./Objective');

const questionSchema = new Schema({
  objective: {
    type: mongoose.ObjectId,
    ref: Objective,
  },
  text: String,
  responses: [
    String
  ],
})

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;