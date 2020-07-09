const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  playlist: {
    type: mongoose.ObjectId,
    ref: 'Playlist',
  },
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
  possibleScore: Number,
  score: Number,
})

scoreSchema.plugin(require('mongoose-autopopulate'));
scoreSchema.options.selectPopulatedPaths = false;
const Score = mongoose.model('Score', scoreSchema)
module.exports = Score;