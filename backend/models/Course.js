const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectsEnum = require('../lib/subjectsEnum');

const courseSchema = new Schema({
  name: String,
  owner: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  editors: [
    {
      type: mongoose.ObjectId,
      ref: 'User',
    }
  ],
  subject: {
    type: String,
    enum: subjectsEnum,
  },
  section: String,
  grade: Number,
  description: String,
  startDate: Date,
  endDate: Date,
  essentialPlaylists: [
    {
      type: mongoose.ObjectId,
      ref: 'Playlist',
      autopopulate: { maxDepth: 1 },
    }
  ],
  corePlaylists: [
    {
      type: mongoose.ObjectId,
      ref: 'Playlist',
      autopopulate: { maxDepth: 1 },
    }
  ],
  challengePlaylists: [
    {
      type: mongoose.ObjectId,
      ref: 'Playlist',
      autopopulate: { maxDepth: 1 },
    }
  ],
  // classes: [
  //   {
  //     type: mongoose.ObjectId,
  //     ref: 'Class',
  //     autopopulate: { maxDepth: 2 },
  //   }
  // ],
})

courseSchema.plugin(require('mongoose-autopopulate'));
courseSchema.options.selectPopulatedPaths = false;
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;