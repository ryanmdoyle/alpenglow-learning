const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Playlist = require('./Playlist');
const User = require('./User');

const quizSchema = new Schema({
  playlist: {
    type: mongoose.ObjectId,
    ref: Playlist,
  },
  user: {
    type: mongoose.ObjectId,
    ref: User,
  },
  score: Number,
})

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;