const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Playlist = require('./Playlist');

const courseSchema = new Schema({
  name: String,
  section: String,
  subject: String,
  grade: Number,
  description: String,
  startDate: Date,
  endDate: Date,
  playlists: [
    {
      type: mongoose.ObjectId,
      ref: Playlist,
    }
  ],
})

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;