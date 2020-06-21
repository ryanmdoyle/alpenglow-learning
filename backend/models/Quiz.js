const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// A quiz is a reference to a quiz that was taken by a user.
// Quizzes are randomly generated and saved once completed.
const quizSchema = new Schema({
  playlist: {
    type: mongoose.ObjectId,
    ref: 'Playlist',
    autopopulate: { maxDepth: 1 },
  },
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
  questions: [{
    type: mongoose.ObjectId,
    ref: 'Question',
    autopopulate: { maxDepth: 2 },
  }],
  score: {
    type: mongoose.ObjectId,
    ref: 'Score',
    autopopulate: { maxDepth: 1 },
  }
})

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;