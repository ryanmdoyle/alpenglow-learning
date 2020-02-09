const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const playlistSchema = new Schema({
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  grade: Number,
  subject: String,
  type: {
    type: String,
    required: 'Please select a playlist type.',
    enum: ['Essential', 'Standard', 'Challenge'],
  }
})

module.exports = mongoose.Model('Playlist', playlistSchema);