const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Playlist = require('./Playlist');
const User = require('./User');

const classSchema = new Schema({
  name: String,
  enrollId: String,
  owner: mongoose.ObjectId,
  enrolled: [
    {
      type: mongoose.ObjectId,
      ref: User,
    }
  ],
  course: {
    type: mongoose.ObjectId,
    ref: Playlist,
  },
})

const Class = mongoose.model('Class', classSchema);
module.exports = Class;