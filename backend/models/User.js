const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uuid: String,
  name: String,
  firstName: String,
  lastName: String,
  picture: String,
  googleId: String,
  permissions: String,
  email: String,
})

const User = mongoose.model('User', userSchema);
module.exports = User;