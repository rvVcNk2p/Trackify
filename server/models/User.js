const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // TODO - Make it required
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default: 'https://lh3.googleusercontent.com/a-/AOh14Gi_cp1hFDmmXecjoUXvSq-zPc2I8VnZpI4HKKoXaw=s576-p-rw-no',
  },
  date: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = User = mongoose.model('user', UserSchema);
