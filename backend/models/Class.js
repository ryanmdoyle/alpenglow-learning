const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: String,
  enrollId: String,
  course: {
    type: mongoose.ObjectId,
    ref: 'Course',
  },
  primaryInstructor: {
    type: mongoose.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
  secondaryInstructors: [
    {
      type: mongoose.ObjectId,
      ref: 'User',
      autopopulate: true,
    }
  ],
  enrolled: [
    {
      type: mongoose.ObjectId,
      ref: 'User',
      autopopulate: true,
    }
  ],
})

classSchema.plugin(require('mongoose-autopopulate'));
classSchema.options.selectPopulatedPaths = false;
const Class = mongoose.model('Class', classSchema);
module.exports = Class;