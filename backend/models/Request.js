const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
  playlist: {
    type: mongoose.ObjectId,
    ref: 'Playlist',
    autopopulate: { maxDepth: 1 },
  },
  type: {
    type: String,
    enum: ['CREATED', 'EXTERNAL', 'PAPER'],
    default: 'EXTERNAL'
  },
  approved: Boolean,
  approvalAccepted: Boolean,
  timeRequested: Date,
  timeApproved: Date,
  timeAccepted: Date,
})

requestSchema.plugin(require('mongoose-autopopulate'));
requestSchema.options.selectPopulatedPaths = false;
const Request = mongoose.model('Request', requestSchema);
module.exports = Request;