const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Playlist = require('./Playlist');
const subjectsEnum = require('../lib/subjectsEnum');

const objectiveSchema = new Schema({
  name: String,
  description: String,
  subject: {
    type: String,
    enum: subjectsEnum,
  },
  grade: Number,
  playlist: {
    type: mongoose.ObjectId,
    ref: 'Playlist',
  },
})

const Objective = mongoose.model('Objective', objectiveSchema);
module.exports = Objective;