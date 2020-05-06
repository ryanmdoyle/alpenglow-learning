const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Objective = require('./Objective');
const Course = require('./Course');
const subjectsEnum = require('../lib/subjectsEnum');

const playlistSchema = new Schema({
  name: String,
  subject: {
    type: String,
    enum: subjectsEnum,
  },
  description: String,
  grade: Number,
  type: {
    type: String,
    enum: ['ESSENTIAL', 'CORE', 'CHALLENGE'],
  },
  course: mongoose.ObjectId,
  objectives: [
    {
      type: mongoose.ObjectId,
      ref: Objective,
    }
  ],
})

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;