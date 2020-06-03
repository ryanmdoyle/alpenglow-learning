const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  playlist: {
    type: mongoose.ObjectId,
    ref: Playlist,
  },
  score: Number,
  user: {
    type: mongoose.ObjectId,
    ref: User,
  },
})

const Score = mongoose.model('Score', scoreSchema)
module.exports = Score;