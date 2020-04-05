const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Playlist = require('./Playlist');
const Course = require('./Course');

const objectiveSchema = new Schema({
  name: String,
  description: String,
  subject: String,
  grade: Number,
  playlists: [
    {
      type: mongoose.ObjectId,
      ref: Playlist,
    }
  ],
  courses: [
    {
      type: mongoose.ObjectId,
      ref: Course,
    }
  ],
})

const Objective = mongoose.model('Objective', objectiveSchema);
module.exports = Objective;