const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    default: 'https://art.pixilart.com/d04bd8b33083cb4.png'
  },
  name: {
    type: String,
    default: 'Project Name'
  },
  prefix: {
    type: String,
    default: 'P'
  },
  description: {
    type: String,
    default: 'Project Description'
  },
  owner: {
    type: String,
    require: true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
});

module.exports = Project = mongoose.model('project', ProjectSchema);
