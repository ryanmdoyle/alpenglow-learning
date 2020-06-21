const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Resources = require('../lib/resourcesEnum');

const resourceSchema = new Schema({
  name: String,
  description: String,
  href: String,
  order: Number,
  objective: {
    type: mongoose.ObjectId,
    ref: 'Objective',
    autopopulate: { maxDepth: 1 },
  },
  type: {
    type: String,
    enum: Resources,
  },
})

resourceSchema.plugin(require('mongoose-autopopulate'));
const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;