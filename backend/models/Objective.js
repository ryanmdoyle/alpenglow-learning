const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Playlist = require('./Playlist');
const subjectsEnum = require('../lib/subjectsEnum');

const objectiveSchema = new Schema({
  name: String,
  description: String,
  playlist: {
    type: mongoose.ObjectId,
    ref: 'Playlist',
  },
  order: Number,
})

const Objective = mongoose.model('Objective', objectiveSchema);
module.exports = Objective;