const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  bday: {
    type: Date,
  },
  occupation: {
    type: String,
    trim: true,
  },
  introduction: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: Buffer,
  },
});

module.exports = mongoose.model('Profile', profileSchema);
