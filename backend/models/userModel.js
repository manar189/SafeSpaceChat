const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userSchema = new Schema({
  UserId: String,
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  conversations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
