const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Playlist = require('./Playlist');
const User = require('./User');
const Course = require('./Course');

const classSchema = new Schema({
  name: String,
  enrollId: String,
  primaryInstructor: mongoose.ObjectId,
  course: {
    type: mongoose.ObjectId,
    ref: 'Course',
  },
  secondaryInstructors: [
    {
      type: mongoose.ObjectId,
      ref: User,
    }
  ],
  enrolled: [
    {
      type: mongoose.ObjectId,
      ref: User,
    }
  ],
})

const Class = mongoose.model('Class', classSchema);
module.exports = Class;