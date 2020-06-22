const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
  possibleScore: Number,
  score: Number,
  playlist: {
    type: mongoose.ObjectId,
    ref: 'Playlist',
  },
})

scoreSchema.plugin(require('mongoose-autopopulate'));
const Score = mongoose.model('Score', scoreSchema)
module.exports = Score;