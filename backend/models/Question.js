const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  objective: {
    type: mongoose.ObjectId,
    ref: 'Objective',
  },
  text: String,
  responses: [String],
})

questionSchema.plugin(require('mongoose-autopopulate'));
questionSchema.options.selectPopulatedPaths = false;
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;