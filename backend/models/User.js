const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
})

userSchema.plugin(require('mongoose-autopopulate'));
const User = mongoose.model('User', userSchema);
module.exports = User;