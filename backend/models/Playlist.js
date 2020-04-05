const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objective = require('./Objective');
const Course = require('./Course');

const playlistSchema = new Schema({
  name: String,
  subject: String,
  description: String,
  grade: Number,
  objectives: [
    {
      type: mongoose.ObjectId,
      ref: Objective,
    }
  ],
  courses: [
    {
      type: mongoose.ObjectId,
      ref: Course,
    }
  ],
})

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;