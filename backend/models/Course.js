const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  grade: Number,
  subject: String,
  startDate: Date,
  endDate: Date,
  teacher: [User], //of type teacher (for future)
  enrolled: [User],
  playlists: [Playlist],
})

module.exports = mongoose.Model('Course', courseSchema);