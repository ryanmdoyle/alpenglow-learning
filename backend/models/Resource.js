const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Objective = require('./Objective');

const resourceSchema = new Schema({
  name: String,
  description: String,
  href: String,
  order: Number,
  objective: {
    type: mongoose.ObjectId,
    ref: Objective,
  }
})

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;