const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectsEnum = require('../lib/subjectsEnum');

const courseSchema = new Schema({
  name: String,
  owner: mongoose.ObjectId,
  subject: {
    type: String,
    enum: subjectsEnum,
  },
  section: String,
  grade: Number,
  description: String,
  startDate: Date,
  endDate: Date,
  playlists: [
    {
      type: mongoose.ObjectId,
      ref: 'Playlist',
      autopopulate: { maxDepth: 1 },
    }
  ],
  classes: [
    {
      type: mongoose.ObjectId,
      ref: 'Class',
      autopopulate: { maxDepth: 1 },
    }
  ],
})

courseSchema.plugin(require('mongoose-autopopulate'));
courseSchema.options.selectPopulatedPaths = false;
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;