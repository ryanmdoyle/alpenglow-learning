const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: String,
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  class: {
    type: mongoose.ObjectId,
    ref: 'Objective',
    autopopulate: { maxDepth: 1 },
  },
  playlist: {
    type: mongoose.ObjectId,
    ref: 'Playlist',
    autopopulate: { maxDepth: 1 },
  },
  type: [
    {
      type: String,
      enum: ['TODO', 'GOAL'],
      default: 'TODO'
    }
  ],
})

taskSchema.options.selectPopulatedPaths = false;
taskSchema.plugin(require('mongoose-autopopulate'));
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;