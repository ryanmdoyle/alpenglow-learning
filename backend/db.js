const mongoose = require('mongoose');

const User = require('./models/User');

const db = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = db;