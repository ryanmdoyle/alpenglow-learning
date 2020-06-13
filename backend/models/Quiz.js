const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Playlist = require('./Playlist');
const User = require('./User');
const Score = require('./Score');
const Question = require('./Question');

// A quiz is a reference to a quiz that was taken by a user.
// Quizzes are randomly generated and saved once completed.
const quizSchema = new Schema({
  playlist: {
    type: mongoose.ObjectId,
    ref: Playlist,
  },
  user: {
    type: mongoose.ObjectId,
    ref: User,
  },
  questions: [{
    type: mongoose.ObjectId,
    ref: Question,
  }],
  score: {
    type: mongoose.ObjectId,
    ref: Score,
  }
})

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;