const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  availableColumns: {
    type: Array,
    default: [{
      name: 'Backlog',
      state: 'backlog',
      order: 1
    }]
  },
  issues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ticket'
    }
  ],
  selectedSprint: {
    type: String,
    default: 'current'
  },
  backlog: {
    type: Array,
    default: []
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'proejct',
    required: true
  }
});

module.exports = Board = mongoose.model('board', BoardSchema);
