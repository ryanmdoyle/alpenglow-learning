const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  course: {
    type: mongoose.ObjectId,
    ref: 'Course',
  },
  objectives: [
    {
      type: mongoose.ObjectId,
      ref: 'Objective',
      autopopulate: true,
    }
  ],
})

playlistSchema.plugin(require('mongoose-autopopulate'));
playlistSchema.options.selectPopulatedPaths = false;
const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;