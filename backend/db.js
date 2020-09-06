const mongoose = require('mongoose');

// const uri = process.env.NODE_ENV == 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV

const db = mongoose.connect(process.env.MONGO_URI_PROD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = db;