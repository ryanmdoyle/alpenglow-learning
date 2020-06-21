const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objectiveSchema = new Schema({
  name: String,
  description: String,
  playlist: {
    type: mongoose.ObjectId,
    ref: 'Playlist',
    autopopulate: { maxDepth: 1 },
  },
  resources: [
    {
      type: mongoose.ObjectId,
      ref: 'Resource',
      autopopulate: true,
    }
  ],
})

objectiveSchema.plugin(require('mongoose-autopopulate'));
const Objective = mongoose.model('Objective', objectiveSchema);
module.exports = Objective;