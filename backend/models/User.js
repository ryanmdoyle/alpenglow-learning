const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('./Course');
const Playlist = require('./Playlist');
const Class = require('./Class');

const userSchema = new Schema({
  name: String,
  firstName: String,
  lastName: String,
  picture: String,
  googleId: String,
  email: String,
  roles: [
    {
      type: String,
      enum: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'],
      default: 'STUDENT'
    }
  ],
  enrolledClasses: [
    {
      type: mongoose.ObjectId,
      ref: Class,
    }
  ],
  instructingCourses: [
    {
      type: mongoose.ObjectId,
      ref: Course,
    }
  ],
})

const User = mongoose.model('User', userSchema);
module.exports = User;