const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User');
const Playlist = require('./Playlist');

const requestSchema = new Schema({
  user: {
    type: mongoose.ObjectId,
    ref: User,
  },
  playlist: {
    type: mongoose.ObjectId,
    ref: Playlist,
  }
})

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;