const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Objective = require('./Objective');
const Resources = require('../lib/resourcesEnum');

const resourceSchema = new Schema({
  name: String,
  description: String,
  href: String,
  order: Number,
  objective: {
    type: mongoose.ObjectId,
    ref: Objective,
  },
  type: {
    type: String,
    enum: Resources,
  },
})

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;