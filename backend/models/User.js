const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('./Course');
const Playlist = require('./Playlist');

const userSchema = new Schema({
  name: String,
  firstName: String,
  lastName: String,
  picture: String,
  googleId: String,
  email: String,
  permissions: {
    type: String,
    enum: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'],
    default: 'STUDENT'
  },
  enrolledCourses: [
    {
      type: mongoose.ObjectId,
      ref: Course,
    }
  ],
  instructingCourses: [
    {
      type: mongoose.ObjectId,
      ref: Course,
    }
  ],
  instructingPlaylists: [
    {
      type: mongoose.ObjectId,
      ref: Playlist,
    }
  ],
})

const User = mongoose.model('User', userSchema);
module.exports = User;