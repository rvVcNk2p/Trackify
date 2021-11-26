const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  title: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  category: {
    type: String,
    default: null
  },
  priority: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  // TODO - Authentication
  created: {
    type: Object,
    default: null
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  updated: {
    type: Object,
    default: null
  },
  estimation: {
    type: String,
    default: null
  },
  spentTime: {
    type: String,
    default: null
  },
  sprint: {
    type: String,
    default: null
  },
  originalEstimation: {
    type: String,
    default: null
  },
  order: {
    type: Number,
    default: null
  },
  dueDate: {
    type: Date,
    default: null
  },
  ticketNumber: {
    type: Number
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'board',
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true
  }
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);